<script setup>
import { ref, watch } from 'vue'
import { useTeams } from '../composables/useTeams'
import { useUserProfile } from '../composables/useUserProfile'

const { teamColors } = useTeams()
const { profile, isLoading, error, updateProfile } = useUserProfile()

const userName = ref('')
const selectedTeamId = ref('')
const showForm = ref(false)

// When profile changes, update form values
watch(profile, (newProfile) => {
  if (newProfile) {
    userName.value = newProfile.name || ''
    selectedTeamId.value = newProfile.team_id || ''
  }
}, { immediate: true })

// Toggle form visibility
const toggleForm = () => {
  showForm.value = !showForm.value
  
  if (showForm.value && profile.value) {
    userName.value = profile.value.name || ''
    selectedTeamId.value = profile.value.team_id || ''
  }
}

// Submit profile update
const handleSubmit = async () => {
  if (!userName.value.trim() || !selectedTeamId.value) return
  
  await updateProfile(userName.value.trim(), selectedTeamId.value)
  showForm.value = false
}
</script>

<template>
  <div class="bg-white rounded-lg border shadow-sm p-4">
    <div class="flex items-center justify-between">
      <h3 class="font-bold text-lg">Your Profile</h3>
      <button 
        @click="toggleForm"
        class="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        {{ profile && !showForm ? 'Edit Profile' : showForm ? 'Cancel' : 'Set Up Profile' }}
      </button>
    </div>
    
    <div v-if="showForm" class="mt-4">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="userName"
            type="text"
            placeholder="Your name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label for="team" class="block text-sm font-medium text-gray-700">Select Your Team</label>
          <select
            id="team"
            v-model="selectedTeamId"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>Choose a team</option>
            <option 
              v-for="team in teamColors" 
              :key="team.id" 
              :value="team.id"
            >
              {{ team.name }}
            </option>
          </select>
        </div>
        
        <div class="flex gap-2">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            :disabled="isLoading || !userName.trim() || !selectedTeamId"
          >
            <span v-if="isLoading">Saving...</span>
            <span v-else>Save Profile</span>
          </button>
          <button
            type="button"
            @click="toggleForm"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
        
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </form>
    </div>
    
    <div v-else-if="profile" class="mt-4">
      <div class="flex items-center space-x-4">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
          :class="teamColors.find(t => t.id === profile.team_id)?.color || 'bg-gray-500'"
        >
          {{ profile.name ? profile.name.charAt(0).toUpperCase() : '?' }}
        </div>
        
        <div>
          <h4 class="font-medium">{{ profile.name }}</h4>
          <p class="text-sm text-gray-600">Team: {{ teamColors.find(t => t.id === profile.team_id)?.name || 'Unknown' }}</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="!profile && !showForm" class="mt-4">
      <p class="text-gray-600">Please set up your profile to participate in the hackathon</p>
      <button
        @click="toggleForm"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Set Up Profile
      </button>
    </div>
  </div>
</template>