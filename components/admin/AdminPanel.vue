<script setup>
import { ref, onMounted } from 'vue'
const { profile, isAdmin } = useUserProfile()
const { 
  votingEnabled, 
  setVotingEnabled, 
  checkVotingStatus,
  submissionsEnabled,
  setSubmissionsEnabled,
  checkSubmissionsStatus,
  initStatuses
} = useSubmissions()

const isUpdatingVoting = ref(false)
const isUpdatingSubmissions = ref(false)

const toggleVoting = async () => {
  if (isUpdatingVoting.value) return
  isUpdatingVoting.value = true
  
  try {
    await setVotingEnabled(!votingEnabled.value)
  } catch (err) {
    console.error('Error toggling voting status:', err)
  } finally {
    isUpdatingVoting.value = false
  }
}

const toggleSubmissions = async () => {
  if (isUpdatingSubmissions.value) return
  isUpdatingSubmissions.value = true
  
  try {
    await setSubmissionsEnabled(!submissionsEnabled.value)
  } catch (err) {
    console.error('Error toggling submissions status:', err)
  } finally {
    isUpdatingSubmissions.value = false
  }
}

onMounted(async () => {
  console.log('[AdminPanel] Initializing statuses')
  await initStatuses()
  console.log('[AdminPanel] Status check complete - submissions:', submissionsEnabled.value, 'voting:', votingEnabled.value)
})
</script>

<template>
  <div v-if="isAdmin" class="bg-gray-900/80 backdrop-blur-lg border border-green-500/40 rounded-lg p-5 shadow-lg shadow-green-500/10 ring-1 ring-green-500/20">
    <header class="border-b border-green-500/40 mb-5 pb-3">
      <h2 class="text-xl font-bold text-green-400 flex items-center">
        <Icon name="lucide:shield" class="mr-2 h-5 w-5" />
        ADMIN PANEL
      </h2>
    </header>
    
    <div class="space-y-6">
      <!-- Submissions Controls -->
      <div class="space-y-3 bg-black/50 p-4 rounded-lg border border-green-900/30">
        <h3 class="text-green-400 font-semibold flex items-center">
          <Icon name="lucide:file-plus" class="mr-2 h-4 w-4" />
          Submission Status
        </h3>
        <p class="text-gray-400 text-sm mb-3">
          Enable submissions to allow teams to submit their projects.
        </p>
        
        <div class="flex items-center space-x-3">
          <div class="relative inline-block w-14 align-middle select-none">
            <input 
              type="checkbox" 
              :checked="submissionsEnabled" 
              @change="toggleSubmissions" 
              :disabled="isUpdatingSubmissions"
              class="sr-only peer"
              id="toggle-submissions"
            />
            <label 
              for="toggle-submissions"
              class="block h-7 overflow-hidden bg-gray-800 rounded-full cursor-pointer peer-checked:bg-green-800 transition-colors duration-300 peer-hover:bg-gray-700 peer-checked:peer-hover:bg-green-700 shadow-inner shadow-black/50 border border-black"
            >
              <span 
                class="absolute inset-y-0.5 left-0.5 block w-6 h-6 rounded-full bg-gray-600 peer-checked:bg-green-400 shadow transform transition-transform duration-300 peer-checked:translate-x-7"
              ></span>
            </label>
          </div>
          <span class="text-gray-300">Status: <span class="font-bold" :class="{'text-green-400': submissionsEnabled, 'text-red-400': !submissionsEnabled}">{{ submissionsEnabled ? 'OPEN' : 'CLOSED' }}</span></span>
        </div>
      </div>
      
      <!-- Voting Controls -->
      <div class="space-y-3 bg-black/50 p-4 rounded-lg border border-green-900/30">
        <h3 class="text-green-400 font-semibold flex items-center">
          <Icon name="lucide:vote" class="mr-2 h-4 w-4" />
          Voting Status
        </h3>
        <p class="text-gray-400 text-sm mb-3">
          Enable voting to allow users to vote for submissions.
        </p>
        
        <div class="flex items-center space-x-3">
          <div class="relative inline-block w-14 align-middle select-none">
            <input 
              type="checkbox" 
              :checked="votingEnabled" 
              @change="toggleVoting" 
              :disabled="isUpdatingVoting"
              class="sr-only peer"
              id="toggle-voting"
            />
            <label 
              for="toggle-voting"
              class="block h-7 overflow-hidden bg-gray-800 rounded-full cursor-pointer peer-checked:bg-green-800 transition-colors duration-300 peer-hover:bg-gray-700 peer-checked:peer-hover:bg-green-700 shadow-inner shadow-black/50 border border-black"
            >
              <span 
                class="absolute inset-y-0.5 left-0.5 block w-6 h-6 rounded-full bg-gray-600 peer-checked:bg-green-400 shadow transform transition-transform duration-300 peer-checked:translate-x-7"
              ></span>
            </label>
          </div>
          <span class="text-gray-300">Status: <span class="font-bold" :class="{'text-green-400': votingEnabled, 'text-red-400': !votingEnabled}">{{ votingEnabled ? 'ACTIVE' : 'INACTIVE' }}</span></span>
        </div>
      </div>
      
      <!-- Instructions -->
      <div class="text-sm text-gray-400 mt-5 border-t border-green-500/30 pt-4 flex items-center">
        <Icon name="lucide:info" class="text-green-500 mr-2 h-4 w-4 shrink-0" />
        <p>Changes to these settings take effect immediately for all users.</p>
      </div>
    </div>
  </div>
  <div v-else class="bg-gray-900/80 backdrop-blur-lg border border-red-500/40 rounded-lg p-5 shadow-lg shadow-red-500/10">
    <div class="flex items-center justify-center text-red-400 space-x-2">
      <Icon name="lucide:shield-alert" class="h-5 w-5" />
      <p class="font-medium">Admin access required</p>
    </div>
  </div>
</template>