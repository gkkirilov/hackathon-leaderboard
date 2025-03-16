<script setup>
import { ref, onMounted } from 'vue'
const { userProfile, isAdmin } = useUserProfile()
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
  await initStatuses()
})
</script>

<template>
  <div v-if="isAdmin" class="bg-black border border-green-900/30 rounded-lg p-4 shadow-lg">
    <header class="border-b border-green-900/30 mb-4 pb-2">
      <h2 class="text-xl font-bold text-green-500">Admin Control Panel</h2>
    </header>
    
    <div class="space-y-6">
      <!-- Voting Controls -->
      <div class="space-y-2">
        <h3 class="text-gray-400 font-semibold">Voting Status</h3>
        <p class="text-gray-500 text-sm mb-2">
          Enable voting to allow users to vote for submissions. Disable voting when you want to pause or end the voting period.
        </p>
        
        <div class="flex items-center space-x-3">
          <div class="relative inline-block w-12 align-middle select-none">
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
              class="block h-6 overflow-hidden bg-gray-700 rounded-full cursor-pointer peer-checked:bg-green-900 transition-colors duration-300 peer-hover:bg-gray-600 peer-checked:peer-hover:bg-green-800"
            >
              <span 
                class="absolute inset-y-0 left-0 block w-6 h-6 rounded-full bg-gray-900 border border-green-700 shadow transform transition-transform duration-300 peer-checked:translate-x-6"
              ></span>
            </label>
          </div>
          <span class="text-gray-400">Voting is currently <span class="font-semibold" :class="{'text-green-500': votingEnabled, 'text-red-500': !votingEnabled}">{{ votingEnabled ? 'ACTIVE' : 'INACTIVE' }}</span></span>
        </div>
      </div>
      
      <!-- Submissions Controls -->
      <div class="space-y-2">
        <h3 class="text-gray-400 font-semibold">Submissions Status</h3>
        <p class="text-gray-500 text-sm mb-2">
          Enable submissions to allow teams to submit their projects. Disable submissions when the submission period is over.
        </p>
        
        <div class="flex items-center space-x-3">
          <div class="relative inline-block w-12 align-middle select-none">
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
              class="block h-6 overflow-hidden bg-gray-700 rounded-full cursor-pointer peer-checked:bg-green-900 transition-colors duration-300 peer-hover:bg-gray-600 peer-checked:peer-hover:bg-green-800"
            >
              <span 
                class="absolute inset-y-0 left-0 block w-6 h-6 rounded-full bg-gray-900 border border-green-700 shadow transform transition-transform duration-300 peer-checked:translate-x-6"
              ></span>
            </label>
          </div>
          <span class="text-gray-400">Submissions are currently <span class="font-semibold" :class="{'text-green-500': submissionsEnabled, 'text-red-500': !submissionsEnabled}">{{ submissionsEnabled ? 'OPEN' : 'CLOSED' }}</span></span>
        </div>
      </div>
      
      <!-- Instructions -->
      <div class="text-sm text-gray-500 mt-4 border-t border-green-900/30 pt-4">
        <p><span class="text-green-500">Note:</span> Changes to these settings take effect immediately for all users.</p>
      </div>
    </div>
  </div>
  <div v-else class="bg-black border border-red-900/30 rounded-lg p-4 shadow-lg text-center">
    <p class="text-red-500">Admin access required</p>
  </div>
</template>