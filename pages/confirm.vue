<script setup>
const router = useRouter()
const isLoading = ref(true)
const error = ref(null)

// On page load, handle the OAuth confirmation
onMounted(async () => {
  try {
    // Check if we're being redirected from a successful auth event
    // This page should automatically handle the redirect from email login
    const { error: authError } = await useSupabaseClient().auth.getSession()
    
    if (authError) {
      throw authError
    }
    
    // Check if the user needs to set up their profile
    const { profile, fetchProfile } = useUserProfile()
    await fetchProfile()
    
    // Redirect to profile setup or home page
    setTimeout(() => {
      if (!profile.value) {
        router.push('/profile-setup')
      } else {
        router.push('/')
      }
    }, 1000)
  } catch (err) {
    console.error('Error during confirmation:', err)
    error.value = err.message || 'Authentication failed'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
      <div v-if="isLoading">
        <h2 class="text-2xl font-bold">Confirming your login...</h2>
        <div class="mt-4 flex justify-center">
          <div class="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-600">
        <Icon name="lucide:alert-circle" class="h-12 w-12 mx-auto mb-4" />
        <h2 class="text-2xl font-bold mb-2">Authentication Error</h2>
        <p>{{ error }}</p>
        <button 
          @click="router.push('/login')"
          class="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Login
        </button>
      </div>
      
      <div v-else>
        <Icon name="lucide:check-circle" class="h-12 w-12 mx-auto mb-4 text-green-600" />
        <h2 class="text-2xl font-bold text-green-700">Login Successful!</h2>
        <p class="mt-2">Redirecting you to the hackathon...</p>
      </div>
    </div>
  </div>
</template> 