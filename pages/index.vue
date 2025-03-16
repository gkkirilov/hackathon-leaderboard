<script setup>
const { fetchProfile, profile } = useUserProfile()
const { teamColors, getTeamColor } = useTeams()
const { votingEnabled, checkVotingStatus } = useSubmissions()
const user = useSupabaseUser()

// Initialize user profile on page load
onMounted(async () => {
  if (user.value) {
    await fetchProfile()
  }
  
  // Check if voting is enabled
  await checkVotingStatus()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 relative overflow-hidden">
    <!-- Matrix code animation -->
    <div class="matrix-code absolute inset-0 opacity-30 pointer-events-none"></div>
    
    <header class="bg-black/60 backdrop-blur-lg border-b border-green-900/30 shadow-lg shadow-green-900/10 relative z-10">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-green-400 tracking-wide">AI HACKATHON LEADERBOARD</h1>
        
        <div v-if="profile" class="flex items-center space-x-4">
          <div class="hidden md:block">
            <div class="bg-gray-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-green-900/50 text-xs">
              <span class="text-gray-500">STATUS:</span>
              <span class="text-green-400 ml-1">ONLINE</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-md p-1 pl-3 rounded-full border border-green-800/20">
            <span class="text-sm text-gray-400">{{ profile.name }}</span>
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-inner shadow-black/50"
              :class="getTeamColor(profile.team_id)"
            >
              {{ profile.name ? profile.name.charAt(0).toUpperCase() : '?' }}
            </div>
          </div>
          
          <NuxtLink 
            to="/profile"
            class="p-2 text-gray-500 hover:text-green-400 transition-colors bg-gray-900/60 backdrop-blur-md rounded-full border border-green-900/30"
            title="Edit Profile"
          >
            <Icon name="lucide:user-cog" class="h-5 w-5" />
          </NuxtLink>
          
          <button 
            @click="async () => { await useSupabaseClient().auth.signOut(); navigateTo('/login') }"
            class="p-2 text-gray-500 hover:text-green-400 transition-colors bg-gray-900/60 backdrop-blur-md rounded-full border border-green-900/30"
          >
            <Icon name="lucide:log-out" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
    
    <main class="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <!-- Left sidebar: Submission Form and Admin Panel -->
        <div class="space-y-6 xl:col-span-2">
          <SubmissionForm />
          <AdminPanel />
        </div>
        
        <!-- Main content: Submissions and Leaderboard -->
        <div class="xl:col-span-6 space-y-8">
          <!-- Only show LeaderboardTable when voting is enabled -->
          <LeaderboardTable v-if="votingEnabled" />
          
          <div class="bg-black/60 backdrop-blur-lg border border-green-900/30 shadow-lg shadow-green-900/5 rounded-xl overflow-hidden">
            <div class="border-b border-green-900/30 bg-gray-900/60 backdrop-blur-md px-6 py-4">
              <h2 class="text-lg font-bold text-green-400">SUBMISSIONS</h2>
            </div>
            <div class="p-6">
              <SubmissionsList />
            </div>
          </div>
        </div>
        
        <!-- Global Chat on right side (wider) -->
        <div class="xl:col-span-4 h-full">
          <ChatBox class="max-h-[calc(100vh-10rem)]" />
        </div>
      </div>
    </main>
    
    <!-- <footer class="bg-black/60 backdrop-blur-lg border-t border-green-900/30 mt-12">
      <div class="w-full px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-gray-600 text-sm font-mono">
          AI HACKATHON LEADERBOARD © {{ new Date().getFullYear() }}
        </p>
      </div>
    </footer> -->
  </div>
</template>

<style scoped>
.matrix-code {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cfilter id='a' x='0' y='0'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3Cg filter='url(%23a)'%3E%3Cg fill-opacity='.5'%3E%3Ccircle r='3' cx='0' cy='0' fill='%2369f723'/%3E%3Ccircle r='3' cx='0' cy='0' fill='%2369f723'/%3E%3Ccircle r='3' cx='0' cy='0' fill='%2369f723'/%3E%3Ccircle r='3' cx='0' cy='0' fill='%2369f723'/%3E%3Ccircle r='3' cx='0' cy='0' fill='%2369f723'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
  animation: matrix-animation 20s linear infinite;
  z-index: 1;
}

@keyframes matrix-animation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
}

/* Animated code rain effect */
.matrix-code::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    180deg,
    transparent 0,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
  background-size: 100% 3rem;
  animation: code-rain 2s linear infinite;
}

@keyframes code-rain {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 3rem;
  }
}
</style>