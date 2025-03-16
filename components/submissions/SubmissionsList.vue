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
  <div>
    <!-- Voting status message -->
    <div 
      v-if="votingEnabled" 
      class="bg-green-900/30 backdrop-blur-sm text-green-400 px-4 py-3 rounded-xl mb-6 border border-green-900/30 flex items-center"
    >
      <Icon name="lucide:vote" class="h-5 w-5 mr-2" />
      <span>Voting is now open! You can vote for your favorite submissions.</span>
    </div>
    
    <div v-if="submissions.length === 0" class="text-center py-8">
      <Icon name="lucide:file-question" class="h-12 w-12 text-gray-700 mx-auto mb-3" />
      <p class="text-gray-500">No submissions yet. Be the first to submit your idea!</p>
    </div>
    
    <div v-else class="space-y-6">
      <div 
        v-for="submission in submissions" 
        :key="submission.id"
        class="bg-gray-900/40 backdrop-blur-sm border border-green-900/20 rounded-xl overflow-hidden shadow-lg shadow-black/10 hover:shadow-green-900/5 transition-shadow"
      >
        <div class="p-4 border-b border-green-900/20 flex justify-between items-center">
          <div class="flex items-center">
            <div 
              class="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md shadow-black/30 mr-3" 
              :class="getTeamColor(submission.team_id)"
            >
              <span class="font-bold">{{ getTeamName(submission.team_id).charAt(0) }}</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-200">{{ submission.title }}</h3>
              <p class="text-xs text-gray-400">{{ getTeamName(submission.team_id) }}</p>
            </div>
          </div>
          <div class="text-xs text-gray-500 font-mono">
            {{ new Date(submission.created_at).toLocaleDateString() }}
          </div>
        </div>
        
        <div class="p-5 bg-black/20 backdrop-blur-sm">
          <p class="text-gray-300 text-sm mb-3">{{ submission.description }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span 
              v-for="tech in submission.tech_stack.split(',')" 
              :key="tech"
              class="px-2 py-1 bg-gray-800/70 backdrop-blur-sm text-xs rounded-full text-gray-400 border border-gray-700/50"
            >
              {{ tech.trim() }}
            </span>
          </div>
          
          <!-- Voting controls -->
          <div v-if="votingEnabled && user" class="mt-4 pt-4 border-t border-green-900/20">
            <h4 class="text-sm font-medium text-gray-400 mb-3">Vote for this submission:</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="handleVote(submission.id, category.id)"
                class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed"
                :class="[
                  userHasVoted[`${user.id}-${category.id}`]
                    ? 'bg-green-900/60 backdrop-blur-sm text-green-400 border border-green-900/50'
                    : 'bg-gray-800/60 hover:bg-gray-700/60 backdrop-blur-sm text-gray-300 border border-gray-700/50'
                ]"
                :disabled="userHasVoted[`${user.id}-${category.id}`]"
              >
                <span v-if="userHasVoted[`${user.id}-${category.id}`]">
                  <Icon name="lucide:check" class="h-3 w-3 inline-block mr-1" />
                  Voted
                </span>
                <span v-else>
                  {{ category.name }}
                </span>
                <span v-if="getVoteCount(submission, category.id) > 0" class="ml-1.5 bg-blue-900/40 text-blue-400 px-1.5 rounded-full">
                  {{ getVoteCount(submission, category.id) }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>