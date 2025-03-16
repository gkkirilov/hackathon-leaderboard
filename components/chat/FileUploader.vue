<script setup>
const props = defineProps({
  bucketName: {
    type: String,
    default: 'chat-files'
  }
})

const emit = defineEmits(['upload-complete', 'upload-error'])

const uploading = ref(false)
const uploadProgress = ref(0)
const file = ref(null)
const filePreview = ref(null)
const error = ref(null)
const uploadResult = ref(null)

const handleFileSelect = (event) => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return
  
  file.value = selectedFile
  
  // Create preview for images
  if (selectedFile.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      filePreview.value = e.target.result
    }
    reader.readAsDataURL(selectedFile)
  } else {
    filePreview.value = null
  }
}

const uploadFile = async () => {
  if (!file.value) {
    error.value = 'No file selected'
    emit('upload-error', 'No file selected')
    return
  }
  
  try {
    uploading.value = true
    uploadProgress.value = 0
    error.value = null
    
    console.log('Starting file upload via server API:', {
      bucket: props.bucketName,
      fileName: file.value.name,
      fileType: file.value.type,
      fileSize: file.value.size
    })
    
    // Create form data for the API request
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('bucketName', props.bucketName)
    
    // Send request to server-side API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed')
    }
    
    console.log('Upload successful via server API:', result)
    
    uploadResult.value = {
      path: result.body.path,
      fileUrl: result.body.fileUrl,
      fileType: file.value.type,
      fileName: file.value.name,
      fileSize: file.value.size
    }
    
    console.log('File URL:', result.body.fileUrl)
    
    // Emit success event with file data
    emit('upload-complete', uploadResult.value)
    
    // Clear file input
    file.value = null
    filePreview.value = null
    
  } catch (err) {
    console.error('Upload exception:', err)
    error.value = err.message
    emit('upload-error', err.message)
  } finally {
    uploading.value = false
  }
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

const clearFile = () => {
  file.value = null
  filePreview.value = null
  error.value = null
  uploadResult.value = null
}
</script>

<template>
  <div class="file-uploader">
    <!-- File Preview -->
    <div v-if="filePreview" class="preview-container mb-3">
      <img 
        :src="filePreview" 
        alt="File preview" 
        class="preview-image rounded-lg max-h-48 object-contain"
      />
    </div>
    
    <!-- File Info -->
    <div v-if="file" class="file-info mb-3 p-2 bg-gray-900/30 rounded-lg border border-green-900/30 flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-lg bg-black/50 flex items-center justify-center mr-2 overflow-hidden">
          <Icon :name="file.type.startsWith('image/') ? 'lucide:image' : 'lucide:file'" class="h-4 w-4 text-green-400" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-300 truncate">{{ file.name }}</div>
          <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
        </div>
      </div>
      
      <button 
        type="button" 
        @click="clearFile"
        class="p-1 text-gray-500 hover:text-red-400 transition-colors"
        title="Remove file"
      >
        <Icon name="lucide:x" class="h-4 w-4" />
      </button>
    </div>
    
    <!-- Upload Progress -->
    <div v-if="uploading" class="upload-progress mb-3 p-2 bg-gray-900/30 rounded-lg border border-green-900/30">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs text-gray-400">Uploading file...</span>
      </div>
      <div class="w-full bg-gray-900 rounded-full h-1.5">
        <div class="bg-green-500 h-1.5 rounded-full animate-pulse" style="width: 100%"></div>
      </div>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="error-message mb-3 p-2 bg-red-900/20 rounded-lg border border-red-900/30 text-red-400 text-sm">
      <Icon name="lucide:alert-circle" class="h-4 w-4 inline-block mr-1" />
      {{ error }}
    </div>
    
    <!-- Upload Controls -->
    <div class="upload-controls flex gap-2">
      <label 
        class="flex-1 px-4 py-2 bg-gray-900/70 hover:bg-gray-800/70 text-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer flex items-center justify-center"
        :class="{ 'opacity-50 cursor-not-allowed': uploading }"
      >
        <Icon name="lucide:file-plus" class="h-5 w-5 mr-2" />
        {{ file ? 'Change File' : 'Select File' }}
        <input
          type="file"
          class="hidden"
          @change="handleFileSelect"
          :disabled="uploading"
          accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
        />
      </label>
      
      <button
        @click="uploadFile"
        class="px-4 py-2 bg-green-900/80 hover:bg-green-800/80 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:bg-gray-800/50 backdrop-blur-sm transition-colors flex items-center justify-center"
        :disabled="!file || uploading"
      >
        <Icon name="lucide:upload" class="h-5 w-5 mr-2" />
        {{ uploading ? 'Uploading...' : 'Upload' }}
      </button>
    </div>
  </div>
</template> 