<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const connectionStatus = ref('Checking...')
const authStatus = ref('Checking...')
const storageStatus = ref('Checking...')
const bucketStatus = ref('Checking...')
const userStatus = ref('Checking...')
const detailedInfo = ref({})
const isLoading = ref(true)
const error = ref(null)

const checkConnection = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Check if Supabase client exists
    if (!supabase) {
      connectionStatus.value = 'Failed'
      error.value = 'Supabase client is not available'
      return
    }
    
    connectionStatus.value = 'Connected'
    detailedInfo.value.supabaseUrl = supabase.supabaseUrl || 'Not available'
    
    // Check auth
    if (supabase.auth) {
      authStatus.value = 'Available'
      
      // Check current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        userStatus.value = 'Error'
        error.value = `Auth error: ${userError.message}`
      } else if (user) {
        userStatus.value = 'Logged in'
        detailedInfo.value.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          lastSignIn: user.last_sign_in_at
        }
      } else {
        userStatus.value = 'Not logged in'
      }
    } else {
      authStatus.value = 'Not available'
    }
    
    // Check storage
    if (supabase.storage) {
      storageStatus.value = 'Available'
      
      // Check buckets
      try {
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
        
        if (bucketsError) {
          bucketStatus.value = 'Error'
          error.value = `Bucket error: ${bucketsError.message}`
        } else {
          bucketStatus.value = `${buckets.length} buckets found`
          detailedInfo.value.buckets = buckets.map(b => ({
            id: b.id,
            name: b.name,
            public: b.public
          }))
        }
      } catch (e) {
        bucketStatus.value = 'Error'
        error.value = `Bucket check error: ${e.message}`
      }
    } else {
      storageStatus.value = 'Not available'
    }
  } catch (e) {
    error.value = `Connection test error: ${e.message}`
  } finally {
    isLoading.value = false
  }
}

const testDirectSQL = async () => {
  try {
    // Test direct SQL query to check permissions
    const { data, error: sqlError } = await supabase
      .rpc('test_connection')
    
    if (sqlError) {
      return { success: false, error: sqlError.message }
    }
    
    return { success: true, data }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

const createTestFunction = async () => {
  try {
    // Create a test SQL function to check permissions
    const { data, error: sqlError } = await supabase.rpc('execute_sql', {
      sql_command: `
        CREATE OR REPLACE FUNCTION test_connection()
        RETURNS TEXT AS $$
        BEGIN
          RETURN 'Connection successful';
        END;
        $$ LANGUAGE plpgsql;
      `
    })
    
    if (sqlError) {
      return { success: false, error: sqlError.message }
    }
    
    return { success: true, message: 'Test function created' }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

onMounted(() => {
  checkConnection()
})
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Supabase Connection Test</h2>
    
    <div class="mb-6">
      <Button @click="checkConnection" :disabled="isLoading" variant="outline" class="mr-2">
        <Icon name="lucide:refresh-cw" class="mr-2" />
        Refresh Connection Status
      </Button>
    </div>
    
    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
      <p class="font-medium">Error:</p>
      <p>{{ error }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2">Connection Status</h3>
        <div class="flex items-center">
          <div :class="{
            'bg-green-500': connectionStatus === 'Connected',
            'bg-red-500': connectionStatus === 'Failed',
            'bg-yellow-500': connectionStatus === 'Checking...'
          }" class="w-3 h-3 rounded-full mr-2"></div>
          <span>{{ connectionStatus }}</span>
        </div>
      </div>
      
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2">Auth Status</h3>
        <div class="flex items-center">
          <div :class="{
            'bg-green-500': authStatus === 'Available',
            'bg-red-500': authStatus === 'Not available',
            'bg-yellow-500': authStatus === 'Checking...'
          }" class="w-3 h-3 rounded-full mr-2"></div>
          <span>{{ authStatus }}</span>
        </div>
      </div>
      
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2">User Status</h3>
        <div class="flex items-center">
          <div :class="{
            'bg-green-500': userStatus === 'Logged in',
            'bg-red-500': userStatus === 'Error',
            'bg-yellow-500': userStatus === 'Checking...' || userStatus === 'Not logged in'
          }" class="w-3 h-3 rounded-full mr-2"></div>
          <span>{{ userStatus }}</span>
        </div>
      </div>
      
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2">Storage Status</h3>
        <div class="flex items-center">
          <div :class="{
            'bg-green-500': storageStatus === 'Available',
            'bg-red-500': storageStatus === 'Not available',
            'bg-yellow-500': storageStatus === 'Checking...'
          }" class="w-3 h-3 rounded-full mr-2"></div>
          <span>{{ storageStatus }}</span>
        </div>
      </div>
      
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2">Bucket Status</h3>
        <div class="flex items-center">
          <div :class="{
            'bg-green-500': bucketStatus.includes('buckets found'),
            'bg-red-500': bucketStatus === 'Error',
            'bg-yellow-500': bucketStatus === 'Checking...'
          }" class="w-3 h-3 rounded-full mr-2"></div>
          <span>{{ bucketStatus }}</span>
        </div>
      </div>
    </div>
    
    <div v-if="detailedInfo.buckets && detailedInfo.buckets.length > 0" class="mb-6">
      <h3 class="font-semibold mb-2">Available Buckets</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2 text-left">ID</th>
              <th class="border p-2 text-left">Name</th>
              <th class="border p-2 text-left">Public</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bucket in detailedInfo.buckets" :key="bucket.id" class="border-b">
              <td class="border p-2">{{ bucket.id }}</td>
              <td class="border p-2">{{ bucket.name }}</td>
              <td class="border p-2">{{ bucket.public ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div v-if="detailedInfo.user" class="mb-6">
      <h3 class="font-semibold mb-2">User Details</h3>
      <div class="p-3 bg-gray-50 rounded-md">
        <p><span class="font-medium">ID:</span> {{ detailedInfo.user.id }}</p>
        <p><span class="font-medium">Email:</span> {{ detailedInfo.user.email }}</p>
        <p><span class="font-medium">Role:</span> {{ detailedInfo.user.role }}</p>
        <p><span class="font-medium">Last Sign In:</span> {{ detailedInfo.user.lastSignIn }}</p>
      </div>
    </div>
    
    <div class="mt-6 p-4 border rounded-md bg-gray-50">
      <h3 class="font-semibold mb-2">Supabase URL</h3>
      <p class="font-mono text-sm break-all">{{ detailedInfo.supabaseUrl }}</p>
    </div>
  </div>
</template> 