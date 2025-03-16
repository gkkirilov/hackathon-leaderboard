<script setup>
const router = useRouter()
const { teamColors } = useTeams()
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
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Set Up Your Profile</h2>
        <p class="mt-2 text-sm text-gray-600">
          Welcome to the AI Hackathon! Let's set up your profile before you get started.
        </p>
      </div>
      
      <div v-if="setupComplete" class="bg-green-100 p-4 rounded-md text-center text-green-800">
        <Icon name="lucide:check-circle" class="h-8 w-8 mx-auto mb-2" />
        <p>Profile setup complete! Redirecting to the hackathon...</p>
      </div>
      
      <div v-else>
        <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                id="name"
                v-model="userName"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label for="team" class="block text-sm font-medium text-gray-700">Select Your Team</label>
              <select
                id="team"
                v-model="selectedTeamId"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>Choose your team</option>
                <option 
                  v-for="team in teamColors" 
                  :key="team.id" 
                  :value="team.id"
                >
                  {{ team.name }}
                </option>
              </select>
            </div>
            
            <div v-if="selectedTeamId" class="flex justify-center">
              <div 
                class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
                :class="teamColors.find(t => t.id === selectedTeamId)?.color"
              >
                {{ userName ? userName.charAt(0).toUpperCase() : '?' }}
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              :disabled="isLoading || !userName.trim() || !selectedTeamId"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span v-if="isLoading">Setting up...</span>
              <span v-else>Complete Setup</span>
            </button>
          </div>
          
          <p v-if="error" class="mt-2 text-center text-sm text-red-600">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template> 