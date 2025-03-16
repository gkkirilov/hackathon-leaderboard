<script setup>
const { teamColors, getTeamColor, getTeamName } = useTeams()
const { submissions, categories, fetchSubmissions, voteForSubmission, votingEnabled, checkUserVotes } = useSubmissions()
const { profile } = useUserProfile()
const user = useSupabaseUser()

// Fetch submissions on load and when user changes
onMounted(async () => {
  await fetchSubmissions()
  
  if (user.value) {
    await checkUserVotes(user.value.id)
  }
})

watch(user, async (newUser) => {
  if (newUser) {
    await checkUserVotes(newUser.id)
  }
}, { immediate: true })

// Check for new submissions periodically
onMounted(() => {
  const interval = setInterval(() => {
    fetchSubmissions()
  }, 30000) // every 30 seconds
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})

const handleVote = async (submissionId, category) => {
  if (!user.value || !votingEnabled.value) return
  
  await voteForSubmission(submissionId, category, user.value.id)
}

// Count the votes for a submission in a specific category
const getVoteCount = (submission, category) => {
  if (!submission.votes) return 0
  return submission.votes.filter(vote => vote.category === category).length
}

// Check if the current user has voted for this submission in this category
const hasVoted = (category) => {
  if (!user.value) return false
  return !!userHasVoted.value?.[`${user.value.id}-${category}`]
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="votingEnabled" class="bg-green-900/20 border border-green-900 p-4 rounded-md">
      <div class="flex items-center">
        <Icon name="lucide:vote" class="h-5 w-5 text-green-400 mr-2" />
        <p class="text-green-400">Voting is now open! You can vote for one submission in each category.</p>
      </div>
    </div>
    
    <div v-if="submissions.length === 0" class="text-center py-8">
      <p class="text-gray-500">No submissions yet. Be the first to submit your idea!</p>
    </div>
    
    <div v-else class="space-y-6">
      <div 
        v-for="submission in submissions" 
        :key="submission.id"
        class="bg-gray-900 border border-green-900/30 rounded-lg overflow-hidden hover:border-green-900/50 transition-colors"
      >
        <div class="p-4 border-b border-green-900/30 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div 
              class="w-10 h-10 rounded-md flex items-center justify-center text-white shadow-inner shadow-black/50"
              :class="getTeamColor(submission.team_id)"
            >
              <span class="font-bold">{{ getTeamName(submission.team_id).charAt(0) }}</span>
            </div>
            <div>
              <h3 class="font-bold text-lg text-gray-200">{{ submission.title }}</h3>
              <p class="text-sm text-gray-400">Team {{ getTeamName(submission.team_id) }}</p>
            </div>
          </div>
          <span class="text-xs text-gray-500 font-mono">
            {{ new Date(submission.created_at).toLocaleDateString() }}
          </span>
        </div>
        
        <div class="p-4">
          <p class="text-gray-300 whitespace-pre-line">{{ submission.description }}</p>
          
          <div class="mt-4 bg-black/30 p-3 rounded-md border border-green-900/20">
            <h4 class="text-sm font-medium text-gray-400 mb-1">TECH STACK:</h4>
            <p class="text-sm text-gray-500 font-mono">{{ submission.tech_stack }}</p>
          </div>
          
          <div v-if="votingEnabled" class="mt-6 border-t border-green-900/30 pt-4">
            <h4 class="text-sm font-medium text-gray-400 mb-3">VOTE FOR THIS SUBMISSION:</h4>
            
            <div class="flex flex-wrap gap-3">
              <div 
                v-for="category in categories" 
                :key="category.id"
                class="flex flex-col items-center border border-green-900/30 rounded-md p-3 bg-black/30"
              >
                <div class="flex items-center justify-between w-full mb-2">
                  <span class="text-xs font-medium text-gray-300">{{ category.name }}</span>
                  <span class="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-blue-400 font-mono">{{ getVoteCount(submission, category.id) }}</span>
                </div>
                
                <button
                  @click="handleVote(submission.id, category.id)"
                  class="text-xs px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors w-full"
                  :class="hasVoted(category.id) 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-800 hover:bg-green-700 text-white'"
                  :disabled="hasVoted(category.id) || !profile"
                >
                  <span v-if="hasVoted(category.id)" class="flex items-center justify-center">
                    <Icon name="lucide:check" class="h-3 w-3 mr-1" />
                    Voted
                  </span>
                  <span v-else>Vote</span>
                </button>
              </div>
            </div>
            
            <p v-if="!profile" class="text-xs text-orange-400 mt-3">
              <Icon name="lucide:alert-triangle" class="h-3 w-3 inline-block mr-1" />
              Please set up your profile to vote
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>