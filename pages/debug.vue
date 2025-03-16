<script setup>
import FileUploadTest from '~/components/debug/FileUploadTest.vue'
import SupabaseConnectionTest from '~/components/debug/SupabaseConnectionTest.vue'
import DirectFileUploadTest from '~/components/debug/DirectFileUploadTest.vue'
import BucketCreator from '~/components/debug/BucketCreator.vue'
import SqlExecutor from '~/components/debug/SqlExecutor.vue'
import ServiceRoleTest from '~/components/debug/ServiceRoleTest.vue'
import SimpleUploader from '~/components/debug/SimpleUploader.vue'
import ServerUploader from '~/components/debug/ServerUploader.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { profile, fetchProfile, updateProfile } = useUserProfile()
const { teamColors } = useTeams()

const loading = ref(false)
const error = ref(null)
const rawProfile = ref(null)
const diagnosisMessage = ref('')

// For SimpleUploader
const filePath = ref('')
const handleFileUploaded = () => {
  console.log('File uploaded successfully, path:', filePath.value)
}

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
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Debug Tools</h1>
      
      <div class="space-y-8">
        <!-- Supabase Connection Test -->
        <div class="mb-8">
          <SupabaseConnectionTest />
        </div>
        
        <!-- Server Uploader (Recommended) -->
        <div class="mb-8">
          <ServerUploader />
        </div>
        
        <!-- Simple Uploader -->
        <div class="mb-8">
          <SimpleUploader 
            v-model:path="filePath" 
            @upload="handleFileUploaded"
          />
        </div>
        
        <!-- Service Role Test -->
        <div class="mb-8">
          <ServiceRoleTest />
        </div>
        
        <!-- SQL Executor -->
        <div class="mb-8">
          <SqlExecutor />
        </div>
        
        <!-- Bucket Creator -->
        <div class="mb-8">
          <BucketCreator />
        </div>
        
        <!-- Direct File Upload Test -->
        <div class="mb-8">
          <DirectFileUploadTest />
        </div>
        
        <!-- File Upload Test -->
        <div>
          <FileUploadTest />
        </div>
      </div>
    </div>
  </div>
</template> 