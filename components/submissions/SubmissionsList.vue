<script setup>
import { onMounted, watch, ref, onBeforeUnmount } from 'vue'

const { teamColors, getTeamColor, getTeamName } = useTeams()
const { 
  submissions, 
  fetchSubmissions, 
  voteForSubmission, 
  categories, 
  checkUserVotes, 
  votingEnabled, 
  submissionsEnabled, 
  checkVotingStatus,
  checkSubmissionsStatus,
  userHasVoted
} = useSubmissions()
const { profile } = useUserProfile()
const user = useSupabaseUser()

const refreshTimer = ref(null)

// Load submissions on mount
onMounted(async () => {
  await Promise.all([
    fetchSubmissions(),
    checkVotingStatus(),
    checkSubmissionsStatus()
  ])
  
  // Set up periodic refresh
  refreshTimer.value = setInterval(() => {
    fetchSubmissions()
  }, 30000) // Check for new submissions every 30 seconds
})

// Clean up timer when component is destroyed
onBeforeUnmount(() => {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value)
  }
})

// Watch for user profile changes to check votes
watch(() => profile.value?.id, (newId) => {
  if (newId) {
    checkUserVotes(newId)
  }
}, { immediate: true })

// Handle voting for a submission
const handleVote = async (submissionId, category) => {
  if (profile.value?.id) {
    await voteForSubmission(submissionId, category, profile.value.id)
  }
}

// Get vote count for a specific submission in a specific category
const getVoteCount = (submission, category) => {
  if (!submission.votes) return 0
  return submission.votes.filter(vote => vote.category === category).length
}

// Check if the current user has voted for this submission in this category
const hasVoted = (category) => {
  if (!profile.value) return false
  return !!userHasVoted.value?.[`${profile.value.id}-${category}`]
}
</script>

<template>
  <div class="space-y-4">
    <!-- Voting Status Message -->
    <div v-if="votingEnabled" class="mb-6 p-3 bg-green-900/20 border border-green-900/30 rounded-lg text-center">
      <Icon name="lucide:vote" class="inline-block mr-2 text-green-500" />
      <span class="text-green-400">Voting is now open! You can vote for your favorite projects.</span>
    </div>
    
    <div v-else class="mb-6 p-3 bg-amber-900/20 border border-amber-900/30 rounded-lg text-center">
      <Icon name="lucide:hourglass" class="inline-block mr-2 text-amber-500" />
      <span class="text-amber-400">Voting is not yet open. Check back later!</span>
    </div>
    
    <!-- No Submissions Message -->
    <div v-if="submissions.length === 0" class="p-6 bg-gray-900 border border-green-900/30 rounded-lg text-center">
      <div v-if="submissionsEnabled">
        <Icon name="lucide:clipboard-list" class="inline-block mb-2 text-gray-500 w-10 h-10" />
        <p class="text-gray-400">No submissions yet. Be the first to submit a project!</p>
      </div>
      <div v-else>
        <Icon name="lucide:calendar-clock" class="inline-block mb-2 text-gray-500 w-10 h-10" />
        <p class="text-gray-400">Submissions are currently closed.</p>
        <p class="text-gray-500 text-sm mt-2">Check back later when the submission period begins.</p>
      </div>
    </div>
    
    <!-- Submissions List -->
    <div v-else class="space-y-6">
      <div 
        v-for="submission in submissions" 
        :key="submission.id" 
        class="bg-gray-900 border border-green-900/30 rounded-lg overflow-hidden shadow-lg hover:shadow-green-900/10 transition-shadow"
      >
        <div class="p-5">
          <!-- Title and Team Color -->
          <div class="flex items-center gap-2 mb-3">
            <div 
              class="h-4 w-4 rounded-full shrink-0" 
              :style="{ backgroundColor: getTeamColor(submission.team_id) }"
            ></div>
            <h3 class="text-gray-200 font-semibold text-lg leading-tight">{{ submission.title }}</h3>
          </div>
          
          <!-- Description -->
          <p class="text-gray-400 mb-3">{{ submission.description }}</p>
          
          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-3">
            <span 
              v-for="tech in submission.tech_stack.split(',')" 
              :key="tech" 
              class="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full"
            >
              {{ tech.trim() }}
            </span>
          </div>
          
          <!-- Team Name & Timestamp -->
          <div class="text-sm text-gray-500 flex items-center gap-2">
            <Icon name="lucide:users" class="h-4 w-4" />
            Team {{ submission.team_id }}
            <span class="mx-2">•</span>
            <Icon name="lucide:clock" class="h-4 w-4" />
            {{ new Date(submission.created_at).toLocaleDateString() }}
          </div>
        </div>
        
        <!-- Voting Section -->
        <div 
          v-if="votingEnabled" 
          class="border-t border-green-900/30 bg-gray-800/50 p-4"
        >
          <div class="text-sm font-medium text-gray-400 mb-2">Vote for this project:</div>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="handleVote(submission.id, category.id)"
              :disabled="userHasVoted[`${profile?.id}-${category.id}`]"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              :class="[
                userHasVoted[`${profile?.id}-${category.id}`] 
                  ? 'bg-green-900/50 text-green-400 border border-green-500/30' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-green-900/20'
              ]"
            >
              <Icon 
                :name="userHasVoted[`${profile?.id}-${category.id}`] ? 'lucide:check' : 'lucide:thumbs-up'" 
                class="h-4 w-4" 
              />
              {{ category.name }}
              <span class="bg-gray-800/80 px-1.5 rounded-full text-xs ml-1">
                {{ getVoteCount(submission, category.id) }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>