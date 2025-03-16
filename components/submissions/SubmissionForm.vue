<script setup>
const { profile } = useUserProfile()
const { isLoading, error, submitIdea } = useSubmissions()

const title = ref('')
const description = ref('')
const techStack = ref('')
const showForm = ref(false)
const submitSuccess = ref(false)

const toggleForm = () => {
  showForm.value = !showForm.value
  submitSuccess.value = false
  
  if (!showForm.value) {
    resetForm()
  }
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  techStack.value = ''
}

const handleSubmit = async () => {
  if (!title.value.trim() || !description.value.trim() || !techStack.value.trim() || !profile.value?.team_id) return
  
  const result = await submitIdea(
    profile.value.team_id,
    title.value.trim(),
    description.value.trim(),
    techStack.value.trim()
  )
  
  if (result) {
    resetForm()
    submitSuccess.value = true
    setTimeout(() => {
      showForm.value = false
      submitSuccess.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="bg-black border border-green-900/30 shadow-lg shadow-green-900/5 rounded-lg overflow-hidden">
    <div class="border-b border-green-900/30 bg-gray-900 px-6 py-4 flex items-center justify-between">
      <h3 class="font-bold text-lg text-green-400">SUBMIT YOUR IDEA</h3>
      <button 
        v-if="!showForm && profile?.team_id"
        @click="toggleForm"
        class="px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
      >
        <Icon name="lucide:plus" class="h-4 w-4 inline-block mr-1" />
        New Submission
      </button>
    </div>
    
    <div class="p-6">
      <p v-if="!profile?.team_id && !showForm" class="text-orange-400 text-sm">
        <Icon name="lucide:alert-triangle" class="h-4 w-4 inline-block mr-1" />
        Please set up your profile first to submit an idea
      </p>
      
      <div v-if="submitSuccess" class="p-4 bg-green-900/30 border border-green-900 rounded-md text-center">
        <Icon name="lucide:check-circle" class="h-6 w-6 text-green-400 mx-auto mb-2" />
        <p class="text-green-400">Your idea has been submitted successfully!</p>
      </div>
      
      <div v-if="showForm" class="mt-4">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="Your idea's title"
              class="block w-full px-3 py-2 bg-gray-900 border border-green-900/30 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-300 placeholder-gray-600"
              required
            />
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium text-gray-400 mb-1">Description</label>
            <textarea
              id="description"
              v-model="description"
              rows="4"
              placeholder="Describe your idea in detail"
              class="block w-full px-3 py-2 bg-gray-900 border border-green-900/30 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-300 placeholder-gray-600 resize-none"
              required
            ></textarea>
          </div>
          
          <div>
            <label for="tech-stack" class="block text-sm font-medium text-gray-400 mb-1">Technology Stack</label>
            <input
              id="tech-stack"
              v-model="techStack"
              type="text"
              placeholder="e.g., Vue, Nuxt, Supabase, etc."
              class="block w-full px-3 py-2 bg-gray-900 border border-green-900/30 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-300 placeholder-gray-600"
              required
            />
          </div>
          
          <div class="flex gap-2">
            <button
              type="submit"
              class="px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-green-800"
              :disabled="isLoading || !title.trim() || !description.trim() || !techStack.trim()"
            >
              <span v-if="isLoading" class="flex items-center">
                <span class="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </span>
              <span v-else>Submit Idea</span>
            </button>
            <button
              type="button"
              @click="toggleForm"
              class="px-4 py-2 border border-green-900/30 rounded-md text-sm font-medium text-gray-400 bg-gray-900 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
          </div>
          
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>