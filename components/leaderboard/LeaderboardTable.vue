<script setup>
import { onMounted, computed } from 'vue'
import { useTeams } from '@/composables/useTeams'
import { useSubmissions } from '@/composables/useSubmissions'

const { teamColors, getTeamColor, getTeamName } = useTeams()
const { submissions, categories, fetchSubmissions, votingEnabled } = useSubmissions()

// Fetch data on mount
onMounted(() => {
  fetchSubmissions()
})

// Compute leaderboard rankings by category
const leaderboardsByCategory = computed(() => {
  if (!submissions.value?.length) return {}
  
  const result = {}
  
  // Initialize with all categories
  categories.forEach(category => {
    result[category.id] = computeLeaderboardForCategory(category.id)
  })
  
  return result
})

// Compute leaderboard for a specific category
const computeLeaderboardForCategory = (categoryId) => {
  // Create a map of submissions by team
  const teamSubmissions = {}
  
  // Group submissions by team and count votes
  submissions.value.forEach(submission => {
    const teamId = submission.team_id
    const voteCount = countVotesForCategory(submission, categoryId)
    
    if (!teamSubmissions[teamId] || teamSubmissions[teamId].votes < voteCount) {
      teamSubmissions[teamId] = { 
        teamId,
        submissionId: submission.id,
        title: submission.title,
        votes: voteCount 
      }
    }
  })
  
  // Convert to array and sort by votes (descending)
  const leaderboard = Object.values(teamSubmissions)
    .sort((a, b) => b.votes - a.votes)
  
  // Add rank to each team
  let currentRank = 1
  let previousVotes = -1
  
  leaderboard.forEach((entry, index) => {
    if (entry.votes !== previousVotes) {
      currentRank = index + 1
      previousVotes = entry.votes
    }
    entry.rank = currentRank
  })
  
  return leaderboard
}

// Count votes for a submission in a specific category
const countVotesForCategory = (submission, categoryId) => {
  if (!submission.votes) return 0
  return submission.votes.filter(vote => vote.category === categoryId).length
}

// Get top 3 teams for featured display
const getTopTeams = computed(() => {
  const allEntries = []
  
  Object.values(leaderboardsByCategory.value).forEach(categoryLeaderboard => {
    categoryLeaderboard.forEach(entry => {
      const existingEntry = allEntries.find(e => e.teamId === entry.teamId)
      if (existingEntry) {
        existingEntry.totalVotes += entry.votes
      } else {
        allEntries.push({
          ...entry,
          totalVotes: entry.votes
        })
      }
    })
  })
  
  return allEntries
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 3)
})
</script>

<template>
  <div v-if="votingEnabled" class="space-y-8 bg-black/70 backdrop-blur-lg text-white p-8 rounded-xl border border-green-900/20 shadow-xl shadow-green-900/10">
    <!-- Leaderboard Header -->
    <div class="text-center space-y-2">
      <h2 class="text-4xl font-bold tracking-wider text-green-400">LEADERBOARD</h2>
      <p class="text-gray-400 text-sm max-w-2xl mx-auto">
        Provide your ideas for the AI Hackathon and earn votes from the community.
        Rise to the top with the most innovative solutions.
      </p>
    </div>
    
    <!-- Featured Top Players -->
    <div v-if="submissions.length > 0" class="relative py-16">
      <!-- 3D Grid Background -->
      <div class="absolute inset-0 grid grid-cols-6 grid-rows-6">
        <div v-for="i in 36" :key="i" class="border-b border-r border-green-900/20"></div>
      </div>
      
      <!-- Top 3 Players Display -->
      <div class="relative flex justify-center items-end h-64">
        <!-- 2nd Place -->
        <div v-if="getTopTeams[1]" class="relative mx-4 -mb-2 z-10 flex flex-col items-center">
          <div class="absolute -top-12 text-xl font-bold text-gray-400">[2]</div>
          <div 
            class="w-24 h-24 border-2 border-green-400/50 rounded-xl overflow-hidden flex items-center justify-center backdrop-blur-sm shadow-lg shadow-green-900/20"
            :class="getTeamColor(getTopTeams[1].teamId)"
          >
            <span class="text-4xl font-bold">{{ getTeamName(getTopTeams[1].teamId).charAt(0) }}</span>
          </div>
          <div class="mt-3 text-gray-400 text-sm text-center">{{ getTeamName(getTopTeams[1].teamId) }}</div>
          <div class="flex items-center mt-1">
            <Icon name="lucide:vote" class="text-blue-400 h-4 w-4 mr-1" />
            <span class="text-blue-400 font-mono">{{ getTopTeams[1].totalVotes.toLocaleString() }}</span>
          </div>
          <div class="text-xs text-gray-500 font-mono mt-1">VOLUME</div>
        </div>
        
        <!-- 1st Place -->
        <div v-if="getTopTeams[0]" class="relative mx-4 z-20 flex flex-col items-center">
          <div class="absolute -top-16 text-2xl font-bold text-green-400">[1]</div>
          <div 
            class="w-32 h-32 border-4 border-green-400 rounded-xl overflow-hidden flex items-center justify-center shadow-xl shadow-green-400/30 backdrop-blur-md"
            :class="getTeamColor(getTopTeams[0].teamId)"
          >
            <span class="text-5xl font-bold">{{ getTeamName(getTopTeams[0].teamId).charAt(0) }}</span>
          </div>
          <div class="mt-3 text-white text-base font-medium text-center">{{ getTeamName(getTopTeams[0].teamId) }}</div>
          <div class="flex items-center mt-1">
            <Icon name="lucide:vote" class="text-blue-400 h-5 w-5 mr-1" />
            <span class="text-blue-400 font-mono font-bold text-lg">{{ getTopTeams[0].totalVotes.toLocaleString() }}</span>
          </div>
          <div class="text-xs text-gray-500 font-mono mt-1">VOLUME</div>
        </div>
        
        <!-- 3rd Place -->
        <div v-if="getTopTeams[2]" class="relative mx-4 -mb-4 z-10 flex flex-col items-center">
          <div class="absolute -top-10 text-xl font-bold text-gray-400">[3]</div>
          <div 
            class="w-24 h-24 border-2 border-green-400/50 rounded-xl overflow-hidden flex items-center justify-center backdrop-blur-sm shadow-lg shadow-green-900/20"
            :class="getTeamColor(getTopTeams[2].teamId)"
          >
            <span class="text-4xl font-bold">{{ getTeamName(getTopTeams[2].teamId).charAt(0) }}</span>
          </div>
          <div class="mt-3 text-gray-400 text-sm text-center">{{ getTeamName(getTopTeams[2].teamId) }}</div>
          <div class="flex items-center mt-1">
            <Icon name="lucide:vote" class="text-blue-400 h-4 w-4 mr-1" />
            <span class="text-blue-400 font-mono">{{ getTopTeams[2].totalVotes.toLocaleString() }}</span>
          </div>
          <div class="text-xs text-gray-500 font-mono mt-1">VOLUME</div>
        </div>
      </div>
    </div>
    
    <div v-else-if="!submissions.length" class="text-center py-8">
      <p class="text-gray-500">No submissions yet. The leaderboard will appear once teams start submitting.</p>
    </div>
    
    <!-- Leaderboard Table -->
    <div v-else class="space-y-10">
      <div v-for="category in categories" :key="category.id" class="space-y-3">
        <h3 class="text-xl font-semibold border-b border-green-900 pb-2 text-green-400">{{ category.name }}</h3>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-800">
            <thead class="bg-gray-900/70 backdrop-blur-sm">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider rounded-tl-lg">RANK</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">PLAYER</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">SUBMISSION</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider rounded-tr-lg">VOTES</th>
              </tr>
            </thead>
            <tbody class="bg-gray-900/50 backdrop-blur-sm divide-y divide-gray-800/50">
              <tr v-for="entry in leaderboardsByCategory[category.id]" :key="entry.teamId" class="hover:bg-gray-800/70 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap text-sm font-mono">
                  <div class="flex items-center">
                    <span 
                      v-if="entry.rank <= 3" 
                      class="w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs font-bold"
                      :class="{
                        'bg-green-500/80 backdrop-blur-sm text-black': entry.rank === 1,
                        'bg-gray-500/80 backdrop-blur-sm text-black': entry.rank === 2,
                        'bg-amber-700/80 backdrop-blur-sm text-black': entry.rank === 3
                      }"
                    >
                      {{ entry.rank }}
                    </span>
                    <span v-else class="text-gray-500">[{{ entry.rank }}]</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg shadow-black/30"
                      :class="getTeamColor(entry.teamId)"
                    >
                      <span class="font-bold">{{ getTeamName(entry.teamId).charAt(0) }}</span>
                    </div>
                    <span class="text-gray-300">{{ getTeamName(entry.teamId) }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{{ entry.title }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">
                  <div class="flex items-center">
                    <Icon name="lucide:vote" class="text-blue-400 h-4 w-4 mr-1" />
                    <span class="text-blue-400 font-mono font-medium">{{ entry.votes.toLocaleString() }}</span>
                  </div>
                </td>
              </tr>
              
              <tr v-if="leaderboardsByCategory[category.id].length === 0">
                <td colspan="4" class="px-4 py-3 text-center text-sm text-gray-500 rounded-b-lg">
                  No votes in this category yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>