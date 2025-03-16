<script setup>
import { ref } from 'vue'

const uploading = ref(false)
const file = ref(null)
const filePreview = ref(null)
const error = ref(null)
const uploadResult = ref(null)
const bucketName = ref('chat-files')

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
    return
  }
  
  try {
    uploading.value = true
    error.value = null
    
    // Create form data for the API request
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('bucketName', bucketName.value)
    
    console.log('Starting server-side upload:', {
      fileName: file.value.name,
      fileType: file.value.type,
      fileSize: file.value.size,
      bucket: bucketName.value
    })
    
    // Send request to server-side API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed')
    }
    
    console.log('Upload successful:', result)
    
    uploadResult.value = {
      path: result.body.path,
      fileUrl: result.body.fileUrl,
      fileName: result.body.fileName,
      fileType: result.body.fileType,
      fileSize: result.body.fileSize
    }
    
    // Clear file input
    file.value = null
    filePreview.value = null
    
  } catch (err) {
    console.error('Upload exception:', err)
    error.value = err.message
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
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Server-Side Upload</h2>
    <p class="mb-4 text-gray-600">Upload files using a server-side API endpoint with service role key</p>
    
    <!-- File Preview -->
    <div v-if="filePreview" class="mb-4">
      <img 
        :src="filePreview" 
        alt="File preview" 
        class="max-w-full h-auto max-h-48 rounded-lg object-contain"
      />
    </div>
    
    <!-- File Info -->
    <div v-if="file" class="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
          <Icon :name="file.type.startsWith('image/') ? 'lucide:image' : 'lucide:file'" class="h-5 w-5 text-gray-500" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-700 truncate">{{ file.name }}</div>
          <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
        </div>
      </div>
      
      <button 
        type="button" 
        @click="clearFile"
        class="p-1 text-gray-500 hover:text-red-500 transition-colors"
        title="Remove file"
      >
        <Icon name="lucide:x" class="h-4 w-4" />
      </button>
    </div>
    
    <!-- Bucket Name Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Bucket Name</label>
      <input 
        v-model="bucketName"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        placeholder="Enter bucket name"
      />
    </div>
    
    <!-- Upload Controls -->
    <div class="flex flex-wrap gap-4 mb-6">
      <label 
        class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer flex items-center justify-center"
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
      
      <Button 
        @click="uploadFile" 
        :disabled="!file || uploading"
        class="flex-1"
      >
        <Icon name="lucide:upload-cloud" class="mr-2" />
        {{ uploading ? 'Uploading...' : 'Upload to Server' }}
      </Button>
    </div>
    
    <!-- Upload Progress -->
    <div v-if="uploading" class="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md">
      <div class="flex items-center">
        <div class="mr-2 animate-spin">
          <Icon name="lucide:loader" class="h-5 w-5" />
        </div>
        <span>Uploading file to server...</span>
      </div>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
      <h3 class="font-semibold mb-1">Error</h3>
      <p>{{ error }}</p>
    </div>
    
    <!-- Upload Result -->
    <div v-if="uploadResult" class="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
      <h3 class="font-semibold mb-2">Upload Result</h3>
      <div class="space-y-2">
        <p><span class="font-medium">File Name:</span> {{ uploadResult.fileName }}</p>
        <p><span class="font-medium">File Type:</span> {{ uploadResult.fileType }}</p>
        <p><span class="font-medium">File Size:</span> {{ formatFileSize(uploadResult.fileSize) }}</p>
        <p><span class="font-medium">Path:</span> {{ uploadResult.path }}</p>
        <p class="break-all"><span class="font-medium">Public URL:</span> {{ uploadResult.fileUrl }}</p>
      </div>
      
      <div v-if="uploadResult.fileUrl" class="mt-4">
        <a 
          :href="uploadResult.fileUrl" 
          target="_blank" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Icon name="lucide:external-link" class="mr-2" />
          Open File
        </a>
      </div>
    </div>
    
    <div class="mt-6 p-4 border rounded-md bg-gray-50">
      <h3 class="font-semibold mb-2">How It Works</h3>
      <p class="text-sm text-gray-700">
        This component uploads files to a server-side API endpoint, which uses the Supabase service role key to bypass RLS policies. This is a more secure approach than using the service role key directly in the browser.
      </p>
    </div>
  </div>
</template> 