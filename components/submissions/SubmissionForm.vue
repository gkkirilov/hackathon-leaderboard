<script setup>
import { ref, computed, onMounted } from 'vue'

const { profile } = useUserProfile()
const { submitIdea, isLoading, error, submissionsEnabled, checkSubmissionsStatus } = useSubmissions()

const title = ref('')
const description = ref('')
const techStack = ref('')
const showForm = ref(false)
const submissionSuccess = ref(false)

// Check if submissions are enabled on component mount
onMounted(async () => {
  await checkSubmissionsStatus()
})

const canSubmit = computed(() => {
  return profile.value?.team_id && submissionsEnabled.value
})

const toggleForm = () => {
  if (!canSubmit.value) {
    return
  }
  
  showForm.value = !showForm.value
  
  if (showForm.value) {
    resetForm()
  }
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  techStack.value = ''
  submissionSuccess.value = false
}

const handleSubmit = async () => {
  if (!profile.value?.team_id) {
    return
  }
  
  if (!submissionsEnabled.value) {
    return
  }
  
  const result = await submitIdea(
    profile.value.team_id,
    title.value,
    description.value,
    techStack.value
  )
  
  if (result) {
    submissionSuccess.value = true
    showForm.value = false
  }
}
</script>

<template>
  <div class="bg-black border border-green-900/30 rounded-lg p-4 shadow-lg">
    <div class="border-b border-green-900/30 pb-3 mb-4">
      <h2 class="text-lg font-bold text-green-400">SUBMIT PROJECT</h2>
    </div>
    
    <!-- Submission Status Message -->
    <div v-if="!submissionsEnabled" class="mb-4 p-4 bg-red-900/20 border border-red-900/30 rounded-lg text-center">
      <Icon name="lucide:alert-circle" class="inline-block mr-2 text-red-500" />
      <span class="text-red-400">Submissions are currently closed</span>
    </div>
    
    <!-- No Profile Message -->
    <div v-else-if="!profile?.team_id" class="mb-4 p-4 bg-amber-900/20 border border-amber-900/30 rounded-lg text-center">
      <Icon name="lucide:alert-triangle" class="inline-block mr-2 text-amber-500" />
      <span class="text-amber-400">You need to select a team in your profile before submitting</span>
      <div class="mt-2">
        <NuxtLink to="/profile" class="text-green-400 hover:text-green-300 underline">
          Go to profile settings
        </NuxtLink>
      </div>
    </div>
    
    <!-- Success Message -->
    <div v-else-if="submissionSuccess" class="mb-4 p-4 bg-green-900/20 border border-green-900/30 rounded-lg text-center">
      <Icon name="lucide:check-circle" class="inline-block mr-2 text-green-500" />
      <span class="text-green-400">Your idea has been submitted successfully!</span>
    </div>
    
    <!-- Form Toggle Button -->
    <div v-if="!showForm && !submissionSuccess" class="flex justify-center">
      <button 
        @click="toggleForm" 
        class="bg-gradient-to-b from-green-600 to-green-800 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-green-900/30 hover:from-green-500 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center w-full"
        :disabled="!canSubmit"
      >
        <Icon name="lucide:plus-circle" class="mr-2 h-5 w-5" />
        <span class="font-bold">Submit Your Project</span>
      </button>
    </div>
    
    <!-- Disabled Button with Reason -->
    <div v-if="!showForm && !canSubmit && !submissionSuccess && submissionsEnabled" class="mt-3 text-center">
      <p v-if="!profile?.team_id" class="text-amber-400 text-sm">
        <Icon name="lucide:info" class="inline-block mr-1 h-4 w-4" />
        Set up your profile first to enable submissions
      </p>
    </div>
    
    <!-- Submission Form -->
    <form v-if="showForm" @submit.prevent="handleSubmit" class="space-y-4">
      <h3 class="text-lg font-semibold text-green-500 border-b border-green-900/30 pb-2">Submit Your Project</h3>
      
      <!-- Error message -->
      <div v-if="error" class="p-3 bg-red-900/20 border border-red-900/30 rounded-md text-red-400 text-sm">
        <Icon name="lucide:alert-circle" class="inline-block mr-1.5" />
        {{ error }}
      </div>
      
      <!-- Title field -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-400 mb-1">Project Title <span class="text-red-500">*</span></label>
        <input
          id="title"
          v-model="title"
          type="text"
          required
          class="w-full bg-gray-900/40 border border-green-900/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          placeholder="Enter a catchy title"
        />
      </div>
      
      <!-- Description field -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-400 mb-1">Description <span class="text-red-500">*</span></label>
        <textarea
          id="description"
          v-model="description"
          required
          rows="4"
          class="w-full bg-gray-900/40 border border-green-900/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          placeholder="Describe your project idea in detail"
        ></textarea>
      </div>
      
      <!-- Tech Stack field -->
      <div>
        <label for="tech-stack" class="block text-sm font-medium text-gray-400 mb-1">Technologies Used <span class="text-red-500">*</span></label>
        <input
          id="tech-stack"
          v-model="techStack"
          type="text"
          required
          class="w-full bg-gray-900/40 border border-green-900/20 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g. Vue, Firebase, TailwindCSS"
        />
      </div>
      
      <!-- Form buttons -->
      <div class="flex space-x-3 pt-2">
        <button
          type="submit"
          class="bg-gradient-to-b from-green-600 to-green-800 text-white font-medium py-2 px-4 rounded-md shadow-md shadow-green-900/30 hover:from-green-500 hover:to-green-700 transition-all duration-200 flex items-center"
          :disabled="isLoading"
        >
          <Icon v-if="isLoading" name="lucide:loader-2" class="mr-2 animate-spin" />
          <Icon v-else name="lucide:send" class="mr-2" />
          Submit
        </button>
        
        <button
          type="button"
          @click="toggleForm"
          class="border border-green-900/30 text-gray-400 font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>