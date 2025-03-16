<script setup>
const props = defineProps(['path'])
const { path } = toRefs(props)

const emit = defineEmits(['update:path', 'upload'])

// Standard client
const supabase = useSupabaseClient()

// Service role client for admin operations
const serviceClient = useSupabaseClient({ 
  options: { 
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  }
})

const uploading = ref(false)
const src = ref('')
const files = ref()
const error = ref(null)
const bucketName = ref('chat-files')

const downloadImage = async () => {
  if (!path.value) return
  
  try {
    const { data, error: downloadError } = await serviceClient.storage
      .from(bucketName.value)
      .download(path.value)
      
    if (downloadError) throw downloadError
    src.value = URL.createObjectURL(data)
  } catch (err) {
    console.error('Error downloading image: ', err.message)
    error.value = err.message
  }
}

const uploadFile = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true
    error.value = null

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = fileName

    console.log('Starting file upload:', {
      bucket: bucketName.value,
      fileName,
      fileType: file.type,
      fileSize: file.size
    })

    // Upload using service role client
    const { data, error: uploadError } = await serviceClient.storage
      .from(bucketName.value)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      error.value = uploadError.message
      throw uploadError
    }

    console.log('Upload successful:', data)
    
    // Get public URL
    const { data: urlData } = serviceClient.storage
      .from(bucketName.value)
      .getPublicUrl(data.path)
    
    console.log('File URL:', urlData.publicUrl)

    // Update path and emit events
    emit('update:path', filePath)
    emit('upload')
    
    // Download the image to display it
    await downloadImage()
  } catch (err) {
    console.error('Upload exception:', err)
    error.value = err.message
  } finally {
    uploading.value = false
  }
}

// Watch for path changes
watch(path, () => {
  if (path.value) {
    downloadImage()
  }
})

// Initialize on mount
onMounted(() => {
  if (path.value) {
    downloadImage()
  }
})
</script>

<template>
  <div class="simple-uploader p-4 bg-gray-900/60 backdrop-blur-lg border border-green-900/20 rounded-lg">
    <h3 class="text-lg font-bold text-green-400 mb-4">Simple File Uploader</h3>
    
    <!-- Image Preview -->
    <div class="mb-4">
      <img
        v-if="src"
        :src="src"
        alt="Uploaded file"
        class="max-w-full h-auto max-h-48 rounded-lg object-contain bg-black/40"
      />
      <div 
        v-else 
        class="w-full h-32 bg-gray-900/60 rounded-lg flex items-center justify-center border border-green-900/30"
      >
        <span class="text-gray-500">No image uploaded</span>
      </div>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-3 bg-red-900/20 rounded-lg border border-red-900/30 text-red-400 text-sm">
      <Icon name="lucide:alert-circle" class="h-4 w-4 inline-block mr-1" />
      {{ error }}
    </div>
    
    <!-- Upload Controls -->
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <label 
          class="w-full px-4 py-2 bg-gray-900/80 hover:bg-gray-800/80 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer flex items-center justify-center"
          :class="{ 'opacity-50 cursor-not-allowed': uploading }"
        >
          <Icon name="lucide:upload" class="h-5 w-5 mr-2" />
          {{ uploading ? 'Uploading...' : 'Upload File' }}
          <input
            type="file"
            id="single"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            @change="uploadFile"
            :disabled="uploading"
          />
        </label>
      </div>
    </div>
    
    <!-- Bucket Info -->
    <div class="mt-4 text-xs text-gray-500">
      <p>Bucket: {{ bucketName }}</p>
      <p v-if="path">Current path: {{ path }}</p>
    </div>
  </div>
</template> 