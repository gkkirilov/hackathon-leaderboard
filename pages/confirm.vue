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
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 relative overflow-hidden">
    <!-- Matrix code animation -->
    <div class="matrix-code absolute inset-0 opacity-30 pointer-events-none"></div>
    
    <div class="max-w-md w-full space-y-8 bg-black/60 backdrop-blur-lg border border-green-900/30 p-8 rounded-xl shadow-lg shadow-green-900/10 text-center relative z-10">
      <div v-if="isLoading">
        <h2 class="text-2xl font-bold text-green-400 tracking-wide">CONFIRMING YOUR LOGIN...</h2>
        <div class="mt-6 flex justify-center">
          <div class="animate-spin h-10 w-10 border-4 border-green-500 rounded-full border-t-transparent"></div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-400">
        <Icon name="lucide:alert-circle" class="h-16 w-16 mx-auto mb-4 text-red-500" />
        <h2 class="text-2xl font-bold mb-3 text-red-400">AUTHENTICATION ERROR</h2>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button 
          @click="router.push('/login')"
          class="mt-4 px-5 py-2 border border-red-900/30 rounded-md shadow-sm text-sm font-medium text-white bg-red-900/60 hover:bg-red-800/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 backdrop-blur-sm transition-colors"
        >
          Return to Login
        </button>
      </div>
      
      <div v-else>
        <Icon name="lucide:check-circle" class="h-16 w-16 mx-auto mb-4 text-green-400" />
        <h2 class="text-2xl font-bold text-green-400 tracking-wide">LOGIN SUCCESSFUL!</h2>
        <p class="mt-4 text-gray-400">Redirecting you to the hackathon...</p>
        <div class="w-24 h-1 bg-green-900/60 mt-4 mx-auto rounded-full"></div>
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