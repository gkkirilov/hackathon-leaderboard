<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

// Standard client
const supabase = useSupabaseClient()

// Service role client
const serviceClient = useSupabaseClient({ 
  options: { 
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  }
})

const status = ref('')
const error = ref(null)
const isLoading = ref(false)
const testResults = ref({
  standard: null,
  service: null
})

// Test standard client
const testStandardClient = async () => {
  isLoading.value = true
  status.value = 'Testing standard client...'
  error.value = null
  testResults.value.standard = null
  
  try {
    // Test bucket listing
    const { data, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      console.error('Standard client error:', bucketError)
      testResults.value.standard = {
        success: false,
        error: bucketError.message,
        code: bucketError.code,
        details: bucketError.details
      }
      return
    }
    
    testResults.value.standard = {
      success: true,
      buckets: data?.length || 0,
      bucketNames: data?.map(b => b.name) || []
    }
    
    status.value = 'Standard client test completed'
  } catch (err) {
    console.error('Standard client exception:', err)
    testResults.value.standard = {
      success: false,
      error: err.message
    }
  } finally {
    isLoading.value = false
  }
}

// Test service role client
const testServiceClient = async () => {
  isLoading.value = true
  status.value = 'Testing service role client...'
  error.value = null
  testResults.value.service = null
  
  try {
    // Test bucket listing
    const { data, error: bucketError } = await serviceClient.storage.listBuckets()
    
    if (bucketError) {
      console.error('Service client error:', bucketError)
      testResults.value.service = {
        success: false,
        error: bucketError.message,
        code: bucketError.code,
        details: bucketError.details
      }
      return
    }
    
    testResults.value.service = {
      success: true,
      buckets: data?.length || 0,
      bucketNames: data?.map(b => b.name) || []
    }
    
    status.value = 'Service client test completed'
  } catch (err) {
    console.error('Service client exception:', err)
    testResults.value.service = {
      success: false,
      error: err.message
    }
  } finally {
    isLoading.value = false
  }
}

// Run both tests
const runAllTests = async () => {
  isLoading.value = true
  status.value = 'Running all tests...'
  error.value = null
  
  try {
    await Promise.all([
      testStandardClient(),
      testServiceClient()
    ])
    
    status.value = 'All tests completed'
  } catch (err) {
    console.error('Test error:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Service Role Client Test</h2>
    <p class="mb-4 text-gray-600">Test the difference between standard and service role clients</p>
    
    <div class="flex flex-wrap gap-4 mb-6">
      <Button 
        @click="testStandardClient" 
        :disabled="isLoading"
        variant="outline"
        class="flex-1"
      >
        <Icon name="lucide:user" class="mr-2" />
        Test Standard Client
      </Button>
      
      <Button 
        @click="testServiceClient" 
        :disabled="isLoading"
        variant="outline"
        class="flex-1"
      >
        <Icon name="lucide:shield" class="mr-2" />
        Test Service Role Client
      </Button>
      
      <Button 
        @click="runAllTests" 
        :disabled="isLoading"
        class="flex-1"
      >
        <Icon name="lucide:play" class="mr-2" />
        Run All Tests
      </Button>
    </div>
    
    <div v-if="status" class="mb-4 p-3 rounded-md bg-blue-50 text-blue-700">
      <p class="font-medium">Status:</p>
      <p>{{ status }}</p>
    </div>
    
    <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
      <p class="font-medium">Error:</p>
      <p>{{ error }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Standard Client Results -->
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2 flex items-center">
          <Icon name="lucide:user" class="mr-2" />
          Standard Client
        </h3>
        
        <div v-if="!testResults.standard" class="text-gray-500 italic">
          No test results yet
        </div>
        
        <div v-else-if="testResults.standard.success" class="space-y-2">
          <div class="flex items-center text-green-600">
            <Icon name="lucide:check-circle" class="mr-2" />
            <span class="font-medium">Success</span>
          </div>
          
          <div>
            <p><span class="font-medium">Buckets found:</span> {{ testResults.standard.buckets }}</p>
            <div v-if="testResults.standard.bucketNames?.length">
              <p class="font-medium mt-2">Bucket names:</p>
              <ul class="list-disc list-inside ml-2">
                <li v-for="name in testResults.standard.bucketNames" :key="name" class="text-sm">
                  {{ name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div v-else class="space-y-2 text-red-600">
          <div class="flex items-center">
            <Icon name="lucide:x-circle" class="mr-2" />
            <span class="font-medium">Failed</span>
          </div>
          
          <p>{{ testResults.standard.error }}</p>
          
          <div v-if="testResults.standard.code || testResults.standard.details" class="text-sm">
            <p v-if="testResults.standard.code"><span class="font-medium">Code:</span> {{ testResults.standard.code }}</p>
            <p v-if="testResults.standard.details"><span class="font-medium">Details:</span> {{ testResults.standard.details }}</p>
          </div>
        </div>
      </div>
      
      <!-- Service Role Client Results -->
      <div class="p-4 border rounded-md">
        <h3 class="font-semibold mb-2 flex items-center">
          <Icon name="lucide:shield" class="mr-2" />
          Service Role Client
        </h3>
        
        <div v-if="!testResults.service" class="text-gray-500 italic">
          No test results yet
        </div>
        
        <div v-else-if="testResults.service.success" class="space-y-2">
          <div class="flex items-center text-green-600">
            <Icon name="lucide:check-circle" class="mr-2" />
            <span class="font-medium">Success</span>
          </div>
          
          <div>
            <p><span class="font-medium">Buckets found:</span> {{ testResults.service.buckets }}</p>
            <div v-if="testResults.service.bucketNames?.length">
              <p class="font-medium mt-2">Bucket names:</p>
              <ul class="list-disc list-inside ml-2">
                <li v-for="name in testResults.service.bucketNames" :key="name" class="text-sm">
                  {{ name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div v-else class="space-y-2 text-red-600">
          <div class="flex items-center">
            <Icon name="lucide:x-circle" class="mr-2" />
            <span class="font-medium">Failed</span>
          </div>
          
          <p>{{ testResults.service.error }}</p>
          
          <div v-if="testResults.service.code || testResults.service.details" class="text-sm">
            <p v-if="testResults.service.code"><span class="font-medium">Code:</span> {{ testResults.service.code }}</p>
            <p v-if="testResults.service.details"><span class="font-medium">Details:</span> {{ testResults.service.details }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 p-4 border rounded-md bg-gray-50">
      <h3 class="font-semibold mb-2">How It Works</h3>
      <p class="text-sm text-gray-700">
        The service role client uses admin privileges to bypass RLS policies. This is useful for operations that require elevated permissions, like file uploads when bucket policies are not properly configured.
      </p>
      <p class="text-sm text-gray-700 mt-2">
        <span class="font-medium">Note:</span> The service role client should be used carefully as it has full access to your Supabase project.
      </p>
    </div>
  </div>
</template> 