<script setup>
const props = defineProps({
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  }
})

const { getFileCategory, formatFileSize } = useFileUpload()

const fileCategory = computed(() => getFileCategory(props.fileType))
const formattedSize = computed(() => formatFileSize(props.fileSize))

// Determine if the file is previewable
const isPreviewable = computed(() => {
  return fileCategory.value === 'image' || 
         fileCategory.value === 'video' || 
         fileCategory.value === 'audio' || 
         fileCategory.value === 'pdf'
})

// Handle preview expansion
const isExpanded = ref(false)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// Get appropriate icon based on file type
const fileIcon = computed(() => {
  switch (fileCategory.value) {
    case 'image': return 'lucide:image'
    case 'video': return 'lucide:video'
    case 'audio': return 'lucide:music'
    case 'pdf': return 'lucide:file-text'
    case 'document': return 'lucide:file-text'
    case 'spreadsheet': return 'lucide:table'
    case 'presentation': return 'lucide:presentation'
    case 'text': return 'lucide:file-text'
    default: return 'lucide:file'
  }
})
</script>

<template>
  <div class="file-attachment">
    <!-- File Preview (if applicable) -->
    <div v-if="isPreviewable" class="preview-container mb-2">
      <!-- Image Preview -->
      <div v-if="fileCategory === 'image'" class="relative">
        <img 
          :src="fileUrl" 
          :alt="fileName" 
          class="rounded-lg max-h-48 object-contain bg-black/40 cursor-pointer hover:opacity-90 transition-opacity"
          :class="{ 'max-h-96': isExpanded }"
          @click="toggleExpand"
        />
        <button 
          @click="toggleExpand" 
          class="absolute bottom-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
          :title="isExpanded ? 'Collapse' : 'Expand'"
        >
          <Icon :name="isExpanded ? 'lucide:minimize-2' : 'lucide:maximize-2'" class="h-4 w-4" />
        </button>
      </div>
      
      <!-- Video Preview -->
      <div v-else-if="fileCategory === 'video'" class="rounded-lg overflow-hidden bg-black/40">
        <video 
          controls 
          class="max-h-48 w-full" 
          :class="{ 'max-h-96': isExpanded }"
        >
          <source :src="fileUrl" :type="fileType">
          Your browser does not support the video tag.
        </video>
        <button 
          @click="toggleExpand" 
          class="absolute bottom-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
          :title="isExpanded ? 'Collapse' : 'Expand'"
        >
          <Icon :name="isExpanded ? 'lucide:minimize-2' : 'lucide:maximize-2'" class="h-4 w-4" />
        </button>
      </div>
      
      <!-- Audio Preview -->
      <div v-else-if="fileCategory === 'audio'" class="rounded-lg overflow-hidden bg-black/40 p-2">
        <audio controls class="w-full">
          <source :src="fileUrl" :type="fileType">
          Your browser does not support the audio tag.
        </audio>
      </div>
      
      <!-- PDF Preview (link only, could add iframe for actual preview) -->
      <div v-else-if="fileCategory === 'pdf'" class="rounded-lg overflow-hidden bg-black/40 p-2">
        <a 
          :href="fileUrl" 
          target="_blank" 
          class="text-green-400 hover:text-green-300 flex items-center"
        >
          <Icon name="lucide:external-link" class="h-4 w-4 mr-1" />
          View PDF
        </a>
      </div>
    </div>
    
    <!-- File Info -->
    <div class="file-info flex items-center p-2 bg-black/30 rounded-lg border border-green-900/20 hover:bg-black/40 transition-colors">
      <div class="file-icon mr-3 p-2 bg-gray-800 rounded-lg">
        <Icon :name="fileIcon" class="h-6 w-6 text-green-400" />
      </div>
      
      <div class="file-details flex-1 min-w-0">
        <div class="file-name text-sm font-medium text-gray-200 truncate">
          {{ fileName }}
        </div>
        <div class="file-meta text-xs text-gray-400">
          {{ formattedSize }}
        </div>
      </div>
      
      <div class="file-actions flex space-x-1">
        <a 
          :href="fileUrl" 
          target="_blank" 
          class="p-1 text-gray-400 hover:text-green-400 transition-colors"
          title="Open in new tab"
        >
          <Icon name="lucide:external-link" class="h-4 w-4" />
        </a>
        
        <a 
          :href="fileUrl" 
          download
          class="p-1 text-gray-400 hover:text-green-400 transition-colors"
          title="Download"
        >
          <Icon name="lucide:download" class="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
</template> 