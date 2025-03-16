<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
// Create a service role client for admin operations
const serviceClient = useSupabaseClient({ 
  options: { 
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  }
})
const file = ref(null)
const uploadStatus = ref('')
const uploadResult = ref(null)
const uploadError = ref(null)
const isUploading = ref(false)
const bucketName = ref('chat-files')
const useServiceRole = ref(true)

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    uploadStatus.value = `File selected: ${selectedFile.name} (${formatFileSize(selectedFile.size)})`
  }
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

const uploadFile = async () => {
  if (!file.value) {
    uploadStatus.value = 'No file selected'
    return
  }
  
  isUploading.value = true
  uploadStatus.value = 'Uploading...'
  uploadResult.value = null
  uploadError.value = null
  
  try {
    // Generate a unique filename
    const fileExt = file.value.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    
    console.log('Starting direct upload test:', {
      bucket: bucketName.value,
      fileName,
      fileType: file.value.type,
      fileSize: file.value.size,
      useServiceRole: useServiceRole.value
    })
    
    // Choose client based on service role toggle
    const client = useServiceRole.value ? serviceClient : supabase
    console.log('Using client:', useServiceRole.value ? 'Service Role' : 'Standard')
    
    // Direct upload to Supabase Storage
    const { data, error } = await client
      .storage
      .from(bucketName.value)
      .upload(fileName, file.value, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) {
      console.error('Upload error:', error)
      uploadStatus.value = 'Upload failed'
      uploadError.value = error.message
      return
    }
    
    console.log('Upload successful:', data)
    uploadStatus.value = 'Upload successful'
    
    // Get public URL
    const { data: urlData } = client
      .storage
      .from(bucketName.value)
      .getPublicUrl(data.path)
    
    uploadResult.value = {
      path: data.path,
      publicUrl: urlData.publicUrl,
      fileName: file.value.name,
      fileType: file.value.type,
      fileSize: file.value.size
    }
    
    console.log('File URL:', urlData.publicUrl)
  } catch (err) {
    console.error('Upload exception:', err)
    uploadStatus.value = 'Upload failed'
    uploadError.value = err.message
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Direct File Upload Test</h2>
    <p class="mb-4 text-gray-600">Simple direct upload to Supabase Storage</p>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Bucket Name</label>
      <input 
        v-model="bucketName"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        placeholder="Enter bucket name"
      />
    </div>
    
    <div class="mb-4">
      <div class="flex items-center">
        <input 
          id="service-role-toggle" 
          v-model="useServiceRole" 
          type="checkbox" 
          class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        >
        <label for="service-role-toggle" class="ml-2 block text-sm text-gray-700">
          Use Service Role Client (admin privileges)
        </label>
      </div>
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1">Select File</label>
      <input 
        type="file" 
        @change="handleFileChange"
        class="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-primary-50 file:text-primary-700
          hover:file:bg-primary-100"
      />
      <p v-if="uploadStatus" class="mt-2 text-sm" :class="{'text-green-600': uploadStatus.includes('selected') || uploadStatus.includes('successful'), 'text-red-600': uploadStatus.includes('failed')}">
        {{ uploadStatus }}
      </p>
    </div>
    
    <div class="flex space-x-4 mb-6">
      <Button 
        @click="uploadFile" 
        :disabled="!file || isUploading"
        :variant="file ? 'default' : 'outline'"
      >
        <Icon name="lucide:upload" class="mr-2" />
        {{ isUploading ? 'Uploading...' : 'Upload File' }}
      </Button>
    </div>
    
    <div v-if="uploadError" class="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
      <h3 class="font-semibold mb-2">Error</h3>
      <p>{{ uploadError }}</p>
    </div>
    
    <div v-if="uploadResult" class="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
      <h3 class="font-semibold mb-2">Upload Result</h3>
      <div class="space-y-2">
        <p><span class="font-medium">File Name:</span> {{ uploadResult.fileName }}</p>
        <p><span class="font-medium">File Type:</span> {{ uploadResult.fileType }}</p>
        <p><span class="font-medium">File Size:</span> {{ formatFileSize(uploadResult.fileSize) }}</p>
        <p><span class="font-medium">Path:</span> {{ uploadResult.path }}</p>
        <p class="break-all"><span class="font-medium">Public URL:</span> {{ uploadResult.publicUrl }}</p>
      </div>
      
      <div v-if="uploadResult.publicUrl" class="mt-4">
        <a 
          :href="uploadResult.publicUrl" 
          target="_blank" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Icon name="lucide:external-link" class="mr-2" />
          Open File
        </a>
      </div>
    </div>
  </div>
</template> 