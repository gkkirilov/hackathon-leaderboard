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
  <div v-if="isAdmin" class="bg-black/60 backdrop-blur-lg border border-green-900/30 shadow-lg shadow-green-900/5 rounded-xl overflow-hidden">
    <div class="border-b border-green-900/30 bg-gray-900/60 backdrop-blur-md px-6 py-4">
      <h3 class="font-bold text-lg text-green-400">ADMIN CONTROLS</h3>
    </div>
    
    <div class="p-6 space-y-4">
      <div class="space-y-2">
        <h4 class="text-sm font-semibold text-gray-400">Voting Status</h4>
        <div class="flex items-center justify-between bg-gray-900/40 backdrop-blur-sm p-4 rounded-xl border border-green-900/20">
          <div>
            <p class="text-gray-300 font-medium">{{ votingEnabled ? 'Voting is enabled' : 'Voting is disabled' }}</p>
            <p class="text-xs text-gray-500 mt-1">
              {{ votingEnabled ? 'Users can vote for submissions' : 'Users cannot vote yet' }}
            </p>
          </div>
          
          <label class="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              :checked="votingEnabled" 
              @change="toggleVoting" 
              class="sr-only peer"
            >
            <div class="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 shadow-inner shadow-black/50"></div>
          </label>
        </div>
      </div>
      
      <div class="space-y-2">
        <h4 class="text-sm font-semibold text-gray-400">Instructions</h4>
        <div class="bg-gray-900/40 backdrop-blur-sm p-4 rounded-xl border border-green-900/20">
          <ul class="text-sm text-gray-400 space-y-2">
            <li class="flex items-start">
              <Icon name="lucide:check-circle" class="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Enable voting when your hackathon is ready for participants to vote</span>
            </li>
            <li class="flex items-start">
              <Icon name="lucide:check-circle" class="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>The leaderboard will automatically appear once voting is enabled</span>
            </li>
            <li class="flex items-start">
              <Icon name="lucide:check-circle" class="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>You can toggle voting on/off at any time</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>