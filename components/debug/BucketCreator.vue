<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const bucketName = ref('chat-files')
const status = ref('')
const error = ref(null)
const isLoading = ref(false)
const sqlResult = ref(null)

const createBucket = async () => {
  if (!bucketName.value) {
    status.value = 'Please enter a bucket name'
    return
  }
  
  isLoading.value = true
  status.value = 'Creating bucket...'
  error.value = null
  sqlResult.value = null
  
  try {
    // Create bucket using Supabase Storage API
    const { data, error: bucketError } = await supabase
      .storage
      .createBucket(bucketName.value, {
        public: true
      })
    
    if (bucketError) {
      console.error('Bucket creation error:', bucketError)
      status.value = 'Bucket creation failed'
      error.value = bucketError.message
      return
    }
    
    status.value = 'Bucket created successfully'
    console.log('Bucket created:', data)
    
    // Now set up policies
    await setupBucketPolicies()
  } catch (err) {
    console.error('Bucket creation exception:', err)
    status.value = 'Bucket creation failed'
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const setupBucketPolicies = async () => {
  status.value = 'Setting up bucket policies...'
  
  try {
    // SQL to set up policies
    const sql = `
      -- Enable RLS
      ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
      
      -- Create policies for the bucket
      DO $$
      BEGIN
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Allow public read for ${bucketName.value}" ON storage.objects;
        DROP POLICY IF EXISTS "Allow public uploads to ${bucketName.value}" ON storage.objects;
        
        -- Create policy to allow public reads
        CREATE POLICY "Allow public read for ${bucketName.value}"
          ON storage.objects FOR SELECT
          USING (bucket_id = '${bucketName.value}');
          
        -- Create policy to allow public uploads
        CREATE POLICY "Allow public uploads to ${bucketName.value}"
          ON storage.objects FOR INSERT
          WITH CHECK (bucket_id = '${bucketName.value}');
      END
      $$;
    `
    
    // Execute SQL
    const { data, error: sqlError } = await supabase.rpc('execute_sql', {
      sql_command: sql
    })
    
    if (sqlError) {
      console.error('Policy setup error:', sqlError)
      status.value = 'Bucket created but policy setup failed'
      error.value = sqlError.message
      return
    }
    
    status.value = 'Bucket and policies created successfully'
    sqlResult.value = 'Policies applied successfully'
  } catch (err) {
    console.error('Policy setup exception:', err)
    status.value = 'Bucket created but policy setup failed'
    error.value = err.message
  }
}

const createBucketWithSQL = async () => {
  if (!bucketName.value) {
    status.value = 'Please enter a bucket name'
    return
  }
  
  isLoading.value = true
  status.value = 'Creating bucket with SQL...'
  error.value = null
  sqlResult.value = null
  
  try {
    // SQL to create bucket and set up policies in one go
    const sql = `
      -- Create bucket if it doesn't exist
      INSERT INTO storage.buckets (id, name, public)
      VALUES ('${bucketName.value}', '${bucketName.value}', true)
      ON CONFLICT (id) DO NOTHING;
      
      -- Enable RLS
      ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
      
      -- Create policies for the bucket
      DO $$
      BEGIN
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Allow public read for ${bucketName.value}" ON storage.objects;
        DROP POLICY IF EXISTS "Allow public uploads to ${bucketName.value}" ON storage.objects;
        
        -- Create policy to allow public reads
        CREATE POLICY "Allow public read for ${bucketName.value}"
          ON storage.objects FOR SELECT
          USING (bucket_id = '${bucketName.value}');
          
        -- Create policy to allow public uploads
        CREATE POLICY "Allow public uploads to ${bucketName.value}"
          ON storage.objects FOR INSERT
          WITH CHECK (bucket_id = '${bucketName.value}');
      END
      $$;
    `
    
    // Execute SQL
    const { data, error: sqlError } = await supabase.rpc('execute_sql', {
      sql_command: sql
    })
    
    if (sqlError) {
      console.error('SQL execution error:', sqlError)
      status.value = 'Bucket creation failed'
      error.value = sqlError.message
      return
    }
    
    status.value = 'Bucket and policies created successfully'
    sqlResult.value = 'SQL executed successfully'
  } catch (err) {
    console.error('SQL execution exception:', err)
    status.value = 'Bucket creation failed'
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Bucket Creator</h2>
    <p class="mb-4 text-gray-600">Create a bucket with the right permissions for file uploads</p>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Bucket Name</label>
      <input 
        v-model="bucketName"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        placeholder="Enter bucket name"
      />
    </div>
    
    <div class="flex flex-wrap gap-4 mb-6">
      <Button 
        @click="createBucket" 
        :disabled="isLoading"
        variant="outline"
        class="flex-1"
      >
        <Icon name="lucide:folder-plus" class="mr-2" />
        Create with API
      </Button>
      
      <Button 
        @click="createBucketWithSQL" 
        :disabled="isLoading"
        class="flex-1"
      >
        <Icon name="lucide:database" class="mr-2" />
        Create with SQL
      </Button>
    </div>
    
    <div v-if="status" class="mb-4 p-3 rounded-md" :class="{
      'bg-green-50 text-green-700': status.includes('successfully'),
      'bg-yellow-50 text-yellow-700': status.includes('Creating'),
      'bg-red-50 text-red-700': status.includes('failed')
    }">
      <p class="font-medium">Status:</p>
      <p>{{ status }}</p>
    </div>
    
    <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
      <p class="font-medium">Error:</p>
      <p>{{ error }}</p>
    </div>
    
    <div v-if="sqlResult" class="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
      <p class="font-medium">SQL Result:</p>
      <p>{{ sqlResult }}</p>
    </div>
    
    <div class="mt-6 p-4 border rounded-md bg-gray-50">
      <h3 class="font-semibold mb-2">SQL Used for Bucket Creation</h3>
      <pre class="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('${bucketName}', '${bucketName}', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for the bucket
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow public read for ${bucketName}" ON storage.objects;
  DROP POLICY IF EXISTS "Allow public uploads to ${bucketName}" ON storage.objects;
  
  -- Create policy to allow public reads
  CREATE POLICY "Allow public read for ${bucketName}"
    ON storage.objects FOR SELECT
    USING (bucket_id = '${bucketName}');
    
  -- Create policy to allow public uploads
  CREATE POLICY "Allow public uploads to ${bucketName}"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = '${bucketName}');
END
$$;
      </pre>
    </div>
  </div>
</template> 