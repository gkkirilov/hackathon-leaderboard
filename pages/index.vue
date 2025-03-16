<script setup>
import MatrixBackground from '~/components/stunning/MatrixBackground.vue'

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
    <!-- Interactive Matrix code animation -->
    <MatrixBackground />
    
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
/* Matrix background styling */
.matrix-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  overflow: hidden;
}

.matrix-background::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8ZmlsdGVyIGlkPSJibHVyIiB4PSIwIiB5PSIwIj4KICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjAuOCIgLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIvPgogIDxnIGZpbHRlcj0idXJsKCNibHVyKSIgZmlsbD0ibm9uZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNCIgZmlsbC1vcGFjaXR5PSIwLjgiPgogICAgPHRleHQgeD0iMCIgeT0iMTAwIiBmaWxsPSIjMDBmZjAwIj4xMDExMDAwMTAxMTEwMTAwMDExMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjEyMCIgZmlsbD0iIzAwZmYwMCI+MDEwMDExMTAxMDAxMTAwMTEwMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjE0MCIgZmlsbD0iIzAwZmYwMCI+MDAxMTAxMDEwMDExMDAxMDAwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjE2MCIgZmlsbD0iIzAwZmYwMCI+MTAwMDEwMTAxMDAxMDExMTAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjE4MCIgZmlsbD0iIzAwZmYwMCI+MDExMTAwMDEwMTAxMDAwMTAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjIwMCIgZmlsbD0iIzAwZmYwMCI+MTAxMDAxMTEwMTAwMDExMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjIyMCIgZmlsbD0iIzAwZmYwMCI+MDAxMTAxMDEwMDExMDAxMDAwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjI0MCIgZmlsbD0iIzAwZmYwMCI+MTAxMDAxMTEwMTAwMDExMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjI2MCIgZmlsbD0iIzAwZmYwMCI+MDEwMDExMTAxMDAxMTAwMTEwMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjI4MCIgZmlsbD0iIzAwZmYwMCI+MDAxMDAwMTEwMTAwMTAxMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjMwMCIgZmlsbD0iIzAwZmYwMCI+MTAxMDAxMTEwMTAwMDExMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjMyMCIgZmlsbD0iIzAwZmYwMCI+MDAxMTAxMDEwMDExMDAxMDAwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjM0MCIgZmlsbD0iIzAwZmYwMCI+MTAxMDAxMTEwMTAwMDExMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjM2MCIgZmlsbD0iIzAwZmYwMCI+MDAxMTAxMDEwMDExMDAxMDAwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjM4MCIgZmlsbD0iIzAwZmYwMCI+MDEwMDExMTAxMDAxMTAwMTEwMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjQwMCIgZmlsbD0iIzAwZmYwMCI+MDAxMDAwMTEwMTAwMTAxMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjQyMCIgZmlsbD0iIzAwZmYwMCI+MTAxMDAxMTEwMTAwMDExMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjQ0MCIgZmlsbD0iIzAwZmYwMCI+MDAxMTAxMDEwMDExMDAxMDAwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjQ2MCIgZmlsbD0iIzAwZmYwMCI+MDEwMDExMTAxMDAxMTAwMTEwMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjQ4MCIgZmlsbD0iIzAwZmYwMCI+MDAxMDAwMTEwMTAwMTAxMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjAiIHk9IjUwMCIgZmlsbD0iIzAwZmYwMCI+MTAxMDAxMTEwMTAwMDExMDAxMDwvdGV4dD4KICA8L2c+Cjwvc3ZnPg==");
  background-repeat: repeat-y;
  background-size: 500px auto;
  animation: matrixRain 10s linear infinite;
  opacity: 0.8;
}

.matrix-background::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 255, 0, 0.1) 0%,
    transparent 20%,
    transparent 80%,
    rgba(0, 255, 0, 0.1) 100%
  );
  pointer-events: none;
}

@keyframes matrixRain {
  0% {
    transform: translateY(0);
    background-position: 0 0;
  }
  100% {
    transform: translateY(100%);
    background-position: 100px 2000px;
  }
}

/* Add a glowing effect to the matrix code */
.matrix-background {
  box-shadow: inset 0 0 80px rgba(0, 255, 0, 0.2);
}

/* Additional column effect with different speeds */
.matrix-background::before {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );
}

/* Create three more matrix code columns with different positions and speeds */
.matrix-background::after {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjIwMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8ZmlsdGVyIGlkPSJibHVyIiB4PSIwIiB5PSIwIj4KICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPSJTb3VyY2VHcmFwaGljIiBzdGREZXZpYXRpb249IjAuOCIgLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIvPgogIDxnIGZpbHRlcj0idXJsKCNibHVyKSIgZmlsbD0ibm9uZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCIgZmlsbC1vcGFjaXR5PSIwLjgiPgogICAgPHRleHQgeD0iNTAiIHk9IjEwMCIgZmlsbD0iIzAwZmYwMCI+MDExMTAwMDEwMTAxMDAwMTAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSIxMjAiIGZpbGw9IiMwMGZmMDAiPjExMTAxMDAxMDExMDExMDAxMDA8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iMTQwIiBmaWxsPSIjMDBmZjAwIj4xMTAwMTAxMTAxMTAxMDAwMTAxPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjE2MCIgZmlsbD0iIzAwZmYwMCI+MDAxMDExMDExMDEwMTAwMDAwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSIxODAiIGZpbGw9IiMwMGZmMDAiPjEwMTAwMTEwMDExMDExMDAxMDA8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iMjAwIiBmaWxsPSIjMDBmZjAwIj4xMTAxMDAwMTAxMTAxMDExMDExPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjIyMCIgZmlsbD0iIzAwZmYwMCI+MDAxMDExMDAxMDAxMDExMDEwMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSIyNDAiIGZpbGw9IiMwMGZmMDAiPjAxMTAxMDAxMDExMDEwMDEwMTA8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iMjYwIiBmaWxsPSIjMDBmZjAwIj4xMDExMDEwMDEwMDExMDExMDEwPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjI4MCIgZmlsbD0iIzAwZmYwMCI+MTEwMTEwMDAxMDExMDEwMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSIzMDAiIGZpbGw9IiMwMGZmMDAiPjAwMTEwMTAxMDAxMTAwMTAxMDE8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iMzIwIiBmaWxsPSIjMDBmZjAwIj4wMTEwMTAxMTAxMDAxMTAwMTAwPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjM0MCIgZmlsbD0iIzAwZmYwMCI+MTEwMDExMDAxMDEwMTEwMDEwMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSIzNjAiIGZpbGw9IiMwMGZmMDAiPjExMDExMDExMDAwMTAwMTEwMTA8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iMzgwIiBmaWxsPSIjMDBmZjAwIj4wMDAxMTAxMDEwMDExMDAxMDEwPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjQwMCIgZmlsbD0iIzAwZmYwMCI+MDEwMTEwMTAxMTAwMTAwMTEwMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSI0MjAiIGZpbGw9IiMwMGZmMDAiPjExMTAwMTAxMDAxMTAwMTAwMDE8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iNDQwIiBmaWxsPSIjMDBmZjAwIj4wMDEwMTAxMDExMDAxMDAxMTAwPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjQ2MCIgZmlsbD0iIzAwZmYwMCI+MTAwMTAxMTAxMTAwMTEwMDAxMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSI0ODAiIGZpbGw9IiMwMGZmMDAiPjExMDAxMDEwMTAwMTExMDAxMDk8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iNTAwIiBmaWxsPSIjMDBmZjAwIj4wMTEwMTAwMTEwMDEwMTEwMDEwPC90ZXh0PgogIDwvZz4KPC9zdmc+");
  background-repeat: repeat-y;
  background-size: 100% auto;
  animation: matrixRain2 15s linear infinite;
  opacity: 0.6;
}

@keyframes matrixRain2 {
  0% {
    transform: translateY(0);
    background-position: 100px 0;
  }
  100% {
    transform: translateY(100%);
    background-position: 0 2000px;
  }
}

/* Matrix animated code floating */
@keyframes floatingChars {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(700px);
  }
}
</style>