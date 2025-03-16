<script setup>
const router = useRouter()
const { teamColors, getTeamColor } = useTeams()
const { profile, isLoading, error, updateProfile, fetchProfile } = useUserProfile()
const user = useSupabaseUser()

const userName = ref('')
const selectedTeamId = ref('')
const setupComplete = ref(false)

// Check if the user already has a profile
onMounted(async () => {
  if (!user.value) {
    return router.push('/login')
  }
  
  const existingProfile = await fetchProfile()
  if (existingProfile) {
    // User already has a profile, redirect to home
    return router.push('/')
  }
})

// Submit profile update
const handleSubmit = async () => {
  if (!userName.value.trim() || !selectedTeamId.value) return
  
  const result = await updateProfile(userName.value.trim(), selectedTeamId.value)
  
  if (result) {
    setupComplete.value = true
    // Redirect to home after a short delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 relative overflow-hidden">
    <!-- Matrix code animation -->
    <div class="matrix-code absolute inset-0 opacity-30 pointer-events-none"></div>
    
    <div class="max-w-md w-full space-y-8 bg-black/60 backdrop-blur-lg border border-green-900/30 p-8 rounded-xl shadow-lg shadow-green-900/10 relative z-10">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-green-400 tracking-wide">SET UP YOUR PROFILE</h2>
        <p class="mt-2 text-sm text-gray-400">
          Welcome to the AI Hackathon! Let's set up your profile before you get started.
        </p>
      </div>
      
      <div v-if="setupComplete" class="bg-green-900/30 border border-green-900/50 p-6 rounded-xl text-center backdrop-blur-sm">
        <Icon name="lucide:check-circle" class="h-12 w-12 mx-auto mb-3 text-green-400" />
        <p class="text-green-300">Profile setup complete! Redirecting to the hackathon...</p>
      </div>
      
      <div v-else>
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <div class="space-y-5">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300">Your Name</label>
              <input
                id="name"
                v-model="userName"
                type="text"
                required
                class="mt-2 block w-full px-4 py-2 bg-gray-900/70 backdrop-blur-sm text-gray-300 border border-green-900/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-600"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label for="team" class="block text-sm font-medium text-gray-300">Select Your Team</label>
              <select
                id="team"
                v-model="selectedTeamId"
                required
                class="mt-2 block w-full px-4 py-2 bg-gray-900/70 backdrop-blur-sm text-gray-300 border border-green-900/30 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="" disabled class="bg-gray-900">Choose your team</option>
                <option 
                  v-for="team in teamColors" 
                  :key="team.id" 
                  :value="team.id"
                  class="bg-gray-900"
                >
                  {{ team.name }}
                </option>
              </select>
            </div>
            
            <div v-if="selectedTeamId" class="flex justify-center pt-2">
              <div 
                class="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl shadow-lg shadow-black/40"
                :class="teamColors.find(t => t.id === selectedTeamId)?.color"
              >
                {{ userName ? userName.charAt(0).toUpperCase() : '?' }}
              </div>
            </div>
          </div>
          
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isLoading || !userName.trim() || !selectedTeamId"
              class="w-full flex justify-center py-3 px-4 border border-green-900/30 rounded-md shadow-sm text-sm font-medium text-white bg-green-900/80 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 backdrop-blur-sm transition-colors"
            >
              <span v-if="isLoading" class="flex items-center">
                <span class="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Setting up...
              </span>
              <span v-else>COMPLETE SETUP</span>
            </button>
          </div>
          
          <p v-if="error" class="mt-2 text-center text-sm text-red-400">{{ error }}</p>
        </form>
      </div>
    </div>
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