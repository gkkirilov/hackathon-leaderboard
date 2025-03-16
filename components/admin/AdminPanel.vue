<script setup>
const { isAdmin } = useUserProfile()
const { votingEnabled, setVotingEnabled, checkVotingStatus } = useSubmissions()

// Check voting status on mount
onMounted(() => {
  checkVotingStatus()
})

// Toggle voting status
const toggleVoting = async () => {
  await setVotingEnabled(!votingEnabled.value)
}
</script>

<template>
  <div v-if="isAdmin" class="bg-black border border-green-900/30 shadow-lg shadow-green-900/5 rounded-lg overflow-hidden">
    <div class="border-b border-green-900/30 bg-gray-900 px-6 py-4">
      <h3 class="font-bold text-lg text-green-400">ADMIN CONTROLS</h3>
    </div>
    
    <div class="p-6 space-y-4">
      <div class="flex flex-col space-y-3">
        <h4 class="text-sm font-medium text-gray-400">VOTING STATUS</h4>
        <div class="flex items-center space-x-3 bg-gray-900 p-3 rounded-md border border-green-900/30">
          <div class="flex items-center space-x-2">
            <div class="relative inline-block w-10 mr-2 align-middle select-none">
              <input 
                id="voting-toggle" 
                type="checkbox" 
                :checked="votingEnabled"
                @change="toggleVoting"
                class="sr-only peer"
              />
              <div class="block w-10 h-6 bg-gray-700 rounded-full"></div>
              <div class="absolute w-4 h-4 left-1 top-1 bg-white rounded-full transition-transform peer-checked:translate-x-4 peer-checked:bg-green-400"></div>
            </div>
            <label for="voting-toggle" class="text-sm text-gray-400">
              Enable Voting
            </label>
          </div>
          <span 
            class="text-xs px-2 py-0.5 rounded-full font-mono"
            :class="votingEnabled ? 'bg-green-900/50 text-green-400' : 'bg-red-900/30 text-red-400'"
          >
            {{ votingEnabled ? 'ACTIVE' : 'INACTIVE' }}
          </span>
        </div>
        <p class="text-xs text-gray-500">
          {{ votingEnabled 
            ? 'Voting is currently enabled. Users can vote for submissions.' 
            : 'Voting is currently disabled. Enable it to allow users to vote.' 
          }}
        </p>
      </div>
      
      <div class="pt-4 border-t border-green-900/30">
        <h4 class="text-sm font-medium text-gray-400 mb-2">INSTRUCTIONS</h4>
        <ul class="text-xs text-gray-500 space-y-1 list-disc pl-4">
          <li>Enable voting when you want participants to start voting on submissions</li>
          <li>The leaderboard will automatically update as votes come in</li>
          <li>Each user can vote once per category</li>
          <li>You can disable voting at any time to pause the process</li>
        </ul>
      </div>
    </div>
  </div>
</template>