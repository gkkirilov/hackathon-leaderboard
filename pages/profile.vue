<script setup>
const router = useRouter()
const { teamColors } = useTeams()
const { profile, isLoading, error, updateProfile, fetchProfile } = useUserProfile()
const user = useSupabaseUser()

const userName = ref('')
const selectedTeamId = ref('')
const updateSuccess = ref(false)

// Check if the user is logged in
onMounted(async () => {
  if (!user.value) {
    return router.push('/login')
  }
  
  // Fetch current profile and populate form
  await fetchProfile()
  if (profile.value) {
    userName.value = profile.value.name || ''
    selectedTeamId.value = profile.value.team_id || ''
  } else {
    // No profile yet, redirect to setup
    return router.push('/profile-setup')
  }
})

// Submit profile update
const handleSubmit = async () => {
  if (!userName.value.trim() || !selectedTeamId.value) return
  
  const result = await updateProfile(userName.value.trim(), selectedTeamId.value)
  
  if (result) {
    updateSuccess.value = true
    // Reset success message after a delay
    setTimeout(() => {
      updateSuccess.value = false
    }, 3000)
  }
}

// Go back to homepage
const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-black/60 p-8 rounded-lg shadow-lg border border-green-900/30 backdrop-blur-sm">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="p-2 text-green-400 hover:text-green-300 rounded-full hover:bg-green-900/20 transition-colors">
          <Icon name="lucide:arrow-left" class="h-5 w-5" />
        </button>
        <h2 class="text-3xl font-bold text-green-400">Edit Profile</h2>
        <div class="w-8"></div> <!-- Spacer for alignment -->
      </div>
      
      <div v-if="updateSuccess" class="bg-green-900/30 border border-green-500/30 p-4 rounded-md text-center text-green-400 animate-pulse">
        <Icon name="lucide:check-circle" class="h-6 w-6 mx-auto mb-2" />
        <p>Profile updated successfully!</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-green-400 mb-1">Your Name</label>
            <input
              id="name"
              v-model="userName"
              type="text"
              required
              class="block w-full px-3 py-2 bg-gray-900/60 border border-green-900/50 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-300 placeholder-gray-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label for="team" class="block text-sm font-medium text-green-400 mb-1">Select Your Team</label>
            <select
              id="team"
              v-model="selectedTeamId"
              required
              class="block w-full px-3 py-2 bg-gray-900/60 border border-green-900/50 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-300"
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
              class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-md shadow-green-500/10"
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
            class="w-full flex justify-center py-2 px-4 border border-green-500/30 rounded-md shadow-sm text-sm font-medium text-white bg-green-900/40 hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
          >
            <Icon v-if="isLoading" name="lucide:loader" class="h-5 w-5 mr-2 animate-spin" />
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update Profile</span>
          </button>
        </div>
        
        <p v-if="error" class="mt-2 text-center text-sm text-red-400">{{ error }}</p>
      </form>
    </div>
  </div>
</template> 