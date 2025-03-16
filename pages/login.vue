<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 relative overflow-hidden">
    <!-- Matrix code animation -->
    <div class="matrix-code absolute inset-0 opacity-30 pointer-events-none"></div>
    
    <div class="max-w-md w-full space-y-8 bg-black/60 backdrop-blur-lg border border-green-900/30 p-8 rounded-xl shadow-lg shadow-green-900/10 relative z-10">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-green-400 tracking-wide">AI HACKATHON</h2>
        <p class="mt-2 text-sm text-gray-400">
          Sign in to participate in the hackathon
        </p>
      </div>
      
      <div class="space-y-6" v-if="!checkEmail">
        <form @submit.prevent="signInWithOtp" class="mt-8 space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">Email address</label>
            <div class="mt-1">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                v-model="email" 
                required
                :disabled="isLoading"
                class="block w-full rounded-md border-0 py-1.5 px-3 bg-gray-900/70 backdrop-blur-sm text-gray-300 shadow-sm ring-1 ring-inset ring-green-900/50 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" 
              />
            </div>
            <p v-if="error" class="mt-2 text-sm text-red-400">{{ error }}</p>
          </div>

          <div>
            <button 
              type="submit"
              :disabled="isLoading || !email || !isValidEmail"
              class="flex w-full justify-center rounded-md bg-green-900/80 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50 transition-colors"
            >
              <span v-if="isLoading" class="flex items-center">
                <span class="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending link...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>
      </div>
      
      <div v-else class="mt-8 text-center">
        <Icon name="lucide:mail" class="h-12 w-12 mx-auto mb-4 text-green-400" />
        <h3 class="text-lg font-medium text-gray-200">Check your email</h3>
        <p class="mt-2 text-sm text-gray-400">
          We've sent a magic link to <strong>{{ email }}</strong>
        </p>
        <p class="mt-1 text-sm text-gray-500">
          Click the link in the email to sign in to the hackathon
        </p>
        
        <button 
          @click="reset"
          class="mt-4 text-sm text-green-400 hover:text-green-300 focus:outline-none transition-colors"
        >
          Use a different email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const checkEmail = ref(false)
const isLoading = ref(false)
const error = ref('')

// Email validation
const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

const signInWithOtp = async () => {
  if (!email.value || !isValidEmail.value) return
  
  error.value = ''
  isLoading.value = true
  
  try {
    // Get the origin for the redirect URL
    const origin = window.location.origin
    
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${origin}/confirm`,
      }
    })
    
    if (authError) throw authError
    
    checkEmail.value = true
  } catch (err) {
    console.error('Error sending magic link:', err)
    error.value = err.message || 'Failed to send login link. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Reset the form to try a different email
const reset = () => {
  checkEmail.value = false
  email.value = ''
  error.value = ''
}
</script>

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