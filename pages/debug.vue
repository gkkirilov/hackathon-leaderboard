<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { profile, fetchProfile, updateProfile } = useUserProfile()
const { teamColors } = useTeams()

const loading = ref(false)
const error = ref(null)
const rawProfile = ref(null)
const diagnosisMessage = ref('')

// Force profile refresh
const refreshProfile = async () => {
  loading.value = true
  error.value = null
  diagnosisMessage.value = 'Fetching profile data...'
  
  try {
    const result = await fetchProfile()
    if (result) {
      diagnosisMessage.value = 'Profile found and loaded successfully.'
    } else {
      diagnosisMessage.value = 'No profile found for this user.'
    }
  } catch (err) {
    error.value = err.message
    diagnosisMessage.value = 'Error loading profile data.'
  } finally {
    loading.value = false
  }
}

// Get raw profile data directly from Supabase
const getRawProfile = async () => {
  if (!user.value) return
  
  loading.value = true
  error.value = null
  
  try {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
    
    if (profileError) throw profileError
    
    rawProfile.value = data?.[0] || null
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Fix missing profile
const fixProfile = async () => {
  if (!user.value) return
  
  loading.value = true
  error.value = null
  
  try {
    // Attempt to fix profile with default values
    const result = await updateProfile('User-' + user.value.id.substring(0, 4), 'green')
    
    if (result) {
      diagnosisMessage.value = 'Profile has been created with default values.'
      await getRawProfile()
    } else {
      diagnosisMessage.value = 'Failed to create default profile.'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Load data on mount
onMounted(async () => {
  if (user.value) {
    await Promise.all([
      refreshProfile(),
      getRawProfile()
    ])
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-6">Profile Debug Page</h1>
      
      <div v-if="!user" class="p-4 bg-yellow-100 rounded-md text-yellow-800">
        Not logged in. Please <NuxtLink to="/login" class="text-blue-600 underline">log in</NuxtLink> first.
      </div>
      
      <template v-else>
        <div class="space-y-6">
          <!-- User Information -->
          <div class="border rounded-md p-4">
            <h2 class="text-lg font-semibold mb-2">User Information</h2>
            <div class="grid grid-cols-2 gap-2">
              <div class="text-sm font-medium">User ID:</div>
              <div class="text-sm">{{ user.id }}</div>
              
              <div class="text-sm font-medium">Email:</div>
              <div class="text-sm">{{ user.email }}</div>
            </div>
          </div>
          
          <!-- Profile Information -->
          <div class="border rounded-md p-4">
            <h2 class="text-lg font-semibold mb-2">Profile Information</h2>
            
            <div v-if="profile" class="bg-green-50 p-3 rounded-md mb-4">
              <p class="text-green-800 text-sm">Profile loaded in application state!</p>
            </div>
            <div v-else class="bg-red-50 p-3 rounded-md mb-4">
              <p class="text-red-800 text-sm">No profile in application state</p>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <div class="text-sm font-medium">Name:</div>
              <div class="text-sm">{{ profile?.name || 'Not set' }}</div>
              
              <div class="text-sm font-medium">Team:</div>
              <div class="text-sm">
                <span 
                  v-if="profile?.team_id" 
                  class="px-2 py-1 rounded-full text-white text-xs"
                  :class="teamColors.find(t => t.id === profile.team_id)?.color"
                >
                  {{ teamColors.find(t => t.id === profile.team_id)?.name || profile.team_id }}
                </span>
                <span v-else>Not set</span>
              </div>
              
              <div class="text-sm font-medium">Is Admin:</div>
              <div class="text-sm">{{ profile?.is_admin ? 'Yes' : 'No' }}</div>
            </div>
          </div>
          
          <!-- Raw Profile Data -->
          <div class="border rounded-md p-4">
            <h2 class="text-lg font-semibold mb-2">Raw Database Profile</h2>
            
            <div v-if="rawProfile" class="bg-green-50 p-3 rounded-md mb-4">
              <p class="text-green-800 text-sm">Profile exists in the database!</p>
            </div>
            <div v-else class="bg-red-50 p-3 rounded-md mb-4">
              <p class="text-red-800 text-sm">No profile found in the database</p>
            </div>
            
            <pre v-if="rawProfile" class="bg-gray-100 p-3 rounded-md text-xs overflow-auto">{{ JSON.stringify(rawProfile, null, 2) }}</pre>
            <p v-else class="text-gray-500 text-sm">No raw profile data available.</p>
          </div>
          
          <!-- Diagnosis -->
          <div class="border rounded-md p-4">
            <h2 class="text-lg font-semibold mb-2">Diagnosis</h2>
            <p class="text-sm" :class="{'text-red-600': error, 'text-blue-600': !error && diagnosisMessage}">
              {{ diagnosisMessage || 'No diagnosis available.' }}
            </p>
            <p v-if="error" class="text-sm text-red-600 mt-2">Error: {{ error }}</p>
          </div>
          
          <!-- Actions -->
          <div class="flex flex-wrap gap-3">
            <button 
              @click="refreshProfile"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              :disabled="loading"
            >
              Refresh Profile
            </button>
            
            <button 
              @click="getRawProfile"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
              :disabled="loading"
            >
              Get Raw Profile
            </button>
            
            <button 
              @click="fixProfile"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
              :disabled="loading"
            >
              Fix Missing Profile
            </button>
            
            <NuxtLink 
              to="/profile-setup"
              class="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Go to Profile Setup
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template> 