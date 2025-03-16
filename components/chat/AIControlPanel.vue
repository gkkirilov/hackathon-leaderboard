<script setup>
const { 
  startLocalAI, 
  stopLocalAI, 
  updateEndpoint, 
  localAIActive, 
  localAIError, 
  aiName, 
  aiTeamId
} = useLocalAI()

const { teamColors } = useTeams()
const isPanelOpen = ref(false)
const endpointInput = ref('http://localhost:1234/v1')

// Initialize with saved values or defaults
onMounted(() => {
  // Set endpoint from saved value if available
  if (localStorage.getItem('lmStudioEndpoint')) {
    endpointInput.value = localStorage.getItem('lmStudioEndpoint')
    updateEndpoint(endpointInput.value)
  }
  
  // Update name if saved
  if (localStorage.getItem('aiName')) {
    aiName.value = localStorage.getItem('aiName')
  }
  
  // Update team if saved
  if (localStorage.getItem('aiTeamId')) {
    aiTeamId.value = localStorage.getItem('aiTeamId')
  }
})

// Toggle AI on/off
const toggleAI = () => {
  if (localAIActive.value) {
    stopLocalAI()
  } else {
    // Save settings
    localStorage.setItem('lmStudioEndpoint', endpointInput.value)
    localStorage.setItem('aiName', aiName.value)
    localStorage.setItem('aiTeamId', aiTeamId.value)
    
    // Update endpoint
    updateEndpoint(endpointInput.value)
    
    // Start the AI
    startLocalAI(aiName.value, aiTeamId.value)
  }
}

// Toggle panel visibility
const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value
}
</script>

<template>
  <div class="relative">
    <!-- AI Status Button -->
    <button 
      @click="togglePanel"
      class="fixed top-28 right-8 p-3 rounded-full bg-green-900/70 hover:bg-green-800 transition-colors z-50 shadow-lg shadow-black/30 border border-green-500/30"
      :class="localAIActive ? 'text-green-300 animate-pulse' : 'text-gray-300'"
      :title="localAIActive ? 'AI Assistant Active' : 'AI Assistant Inactive'"
    >
      <Icon 
        :name="localAIActive ? 'lucide:bot' : 'lucide:bot-offline'" 
        class="h-6 w-6"
      />
      <span v-if="localAIActive" class="absolute -top-1 -right-1 flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </button>
    
    <!-- Settings Panel -->
    <div 
      v-if="isPanelOpen"
      class="fixed top-44 right-8 w-80 bg-black/90 backdrop-blur-lg border border-green-500/30 rounded-xl shadow-lg shadow-green-900/20 p-4 z-50"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-sm font-bold text-green-400">AI ASSISTANT SETTINGS</h3>
        <button @click="togglePanel" class="text-gray-500 hover:text-gray-300">
          <Icon name="lucide:x" class="h-4 w-4" />
        </button>
      </div>
      
      <!-- Error Message -->
      <div v-if="localAIError" class="mb-4 p-2 bg-red-900/30 border border-red-900/50 rounded-md text-xs text-red-400">
        {{ localAIError }}
      </div>
      
      <!-- Settings Form -->
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-400 mb-1">LM Studio API Endpoint</label>
          <input 
            v-model="endpointInput"
            type="text"
            :disabled="localAIActive"
            class="w-full text-xs bg-gray-900/70 backdrop-blur-sm text-gray-300 border border-green-900/30 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="http://localhost:1234/v1"
          />
        </div>
        
        <div>
          <label class="block text-xs text-gray-400 mb-1">AI Assistant Name</label>
          <input 
            v-model="aiName"
            type="text"
            :disabled="localAIActive"
            class="w-full text-xs bg-gray-900/70 backdrop-blur-sm text-gray-300 border border-green-900/30 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="AI Assistant"
          />
        </div>
        
        <div>
          <label class="block text-xs text-gray-400 mb-1">AI Assistant Team</label>
          <select
            v-model="aiTeamId"
            :disabled="localAIActive"
            class="w-full text-xs bg-gray-900/70 backdrop-blur-sm text-gray-300 border border-green-900/30 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            <option 
              v-for="team in teamColors" 
              :key="team.id" 
              :value="team.id"
              class="bg-gray-900"
            >
              {{ team.name }}
            </option>
          </select>
        </div>
        
        <button 
          @click="toggleAI" 
          class="w-full px-3 py-2 text-center text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
          :class="localAIActive 
            ? 'bg-red-900/60 hover:bg-red-800/60 text-white border border-red-900/30' 
            : 'bg-green-900/60 hover:bg-green-800/60 text-white border border-green-900/30'"
        >
          {{ localAIActive ? 'Stop AI Assistant' : 'Start AI Assistant' }}
        </button>
      </div>
      
      <div class="mt-4 text-xs text-gray-500">
        <p>The AI will send messages every 20 seconds and answer questions found in the last 5 messages.</p>
        <p v-if="localAIActive" class="mt-2 text-green-500">
          AI Assistant is active and monitoring the chat
        </p>
      </div>
    </div>
  </div>
</template> 