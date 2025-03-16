<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">AI Hackathon</h2>
        <p class="mt-2 text-sm text-gray-600">
          Sign in to participate in the hackathon
        </p>
      </div>
      
      <div class="space-y-6" v-if="!checkEmail">
        <form @submit.prevent="signInWithOtp" class="mt-8 space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                v-model="email" 
                required
                :disabled="isLoading"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              />
            </div>
            <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
          </div>

          <div>
            <button 
              type="submit"
              :disabled="isLoading || !email || !isValidEmail"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
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
        <Icon name="lucide:mail" class="h-12 w-12 mx-auto mb-4 text-indigo-600" />
        <h3 class="text-lg font-medium text-gray-900">Check your email</h3>
        <p class="mt-2 text-sm text-gray-600">
          We've sent a magic link to <strong>{{ email }}</strong>
        </p>
        <p class="mt-1 text-sm text-gray-500">
          Click the link in the email to sign in to the hackathon
        </p>
        
        <button 
          @click="reset"
          class="mt-4 text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
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