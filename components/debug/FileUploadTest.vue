<script setup>
import { ref, onMounted } from 'vue'
import { useFileUpload } from '~/composables/useFileUpload'
import { useSupabaseClient } from '#imports'

const { uploadFile, isUploading, uploadProgress, uploadError } = useFileUpload()
const supabase = useSupabaseClient()
const selectedFile = ref(null)
const fileInputRef = ref(null)
const uploadResult = ref(null)
const buckets = ref([])
const bucketContents = ref([])
const selectedBucket = ref('chat-files')

// Fetch available buckets on mount
onMounted(async () => {
  await fetchBuckets()
})

// Fetch available buckets
const fetchBuckets = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets()
    
    if (error) {
      console.error('Error listing buckets:', error)
      return
    }
    
    buckets.value = data || []
    console.log('Available buckets:', buckets.value)
    
    // If we have buckets, fetch contents of the first one
    if (buckets.value.length > 0) {
      selectedBucket.value = buckets.value[0].name
      await fetchBucketContents(selectedBucket.value)
    }
  } catch (error) {
    console.error('Error fetching buckets:', error)
  }
}

// Fetch contents of a bucket
const fetchBucketContents = async (bucketName) => {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list()
    
    if (error) {
      console.error(`Error listing contents of bucket ${bucketName}:`, error)
      return
    }
    
    bucketContents.value = data || []
    console.log(`Contents of bucket ${bucketName}:`, bucketContents.value)
  } catch (error) {
    console.error(`Error fetching contents of bucket ${bucketName}:`, error)
  }
}

// Handle file selection
const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
  console.log('File selected:', selectedFile.value)
}

// Create a bucket using the Storage API
const createBucket = async () => {
  try {
    const bucketName = prompt('Enter bucket name:')
    if (!bucketName) return
    
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true
    })
    
    if (error) {
      console.error('Error creating bucket:', error)
      alert(`Error creating bucket: ${error.message}`)
      return
    }
    
    console.log('Bucket created:', data)
    alert(`Bucket ${bucketName} created successfully`)
    await fetchBuckets()
  } catch (error) {
    console.error('Error creating bucket:', error)
    alert(`Error creating bucket: ${error.message}`)
  }
}

// Create bucket and policies with direct SQL
const createBucketWithSQL = async () => {
  try {
    const bucketName = prompt('Enter bucket name (default: chat-files):', 'chat-files')
    if (!bucketName) return
    
    // Execute SQL to create bucket and policies
    const { error: sqlError } = await supabase.rpc('execute_sql', {
      sql_query: `
        -- Create the bucket if it doesn't exist
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('${bucketName}', '${bucketName}', true)
        ON CONFLICT (id) DO NOTHING;
        
        -- Make sure RLS is enabled
        ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Allow public uploads to ${bucketName}" ON storage.objects;
        DROP POLICY IF EXISTS "Allow public reads from ${bucketName}" ON storage.objects;
        
        -- Create a policy that allows public uploads to the bucket
        CREATE POLICY "Allow public uploads to ${bucketName}"
        ON storage.objects FOR INSERT
        TO public
        WITH CHECK (bucket_id = '${bucketName}');
        
        -- Create a policy that allows public reads from the bucket
        CREATE POLICY "Allow public reads from ${bucketName}"
        ON storage.objects FOR SELECT
        TO public
        USING (bucket_id = '${bucketName}');
      `
    })
    
    if (sqlError) {
      console.error('Error executing SQL:', sqlError)
      alert(`Error executing SQL: ${sqlError.message}`)
      return
    }
    
    console.log(`Bucket ${bucketName} and policies created successfully via SQL`)
    alert(`Bucket ${bucketName} and policies created successfully via SQL`)
    await fetchBuckets()
  } catch (error) {
    console.error('Error creating bucket with SQL:', error)
    alert(`Error creating bucket with SQL: ${error.message}`)
  }
}

// Execute custom SQL
const executeCustomSQL = async () => {
  try {
    const sql = prompt('Enter SQL to execute:')
    if (!sql) return
    
    const { error } = await supabase.rpc('execute_sql', {
      sql_query: sql
    })
    
    if (error) {
      console.error('Error executing SQL:', error)
      alert(`Error executing SQL: ${error.message}`)
      return
    }
    
    console.log('SQL executed successfully')
    alert('SQL executed successfully')
    await fetchBuckets()
  } catch (error) {
    console.error('Error executing SQL:', error)
    alert(`Error executing SQL: ${error.message}`)
  }
}

// Create bucket with full permissions
const createBucketWithFullPermissions = async () => {
  try {
    const bucketName = prompt('Enter bucket name (default: chat-files):', 'chat-files')
    if (!bucketName) return
    
    // Execute SQL to create bucket and policies with full permissions
    const { error: sqlError } = await supabase.rpc('execute_sql', {
      sql_query: `
        -- Create the bucket if it doesn't exist
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('${bucketName}', '${bucketName}', true)
        ON CONFLICT (id) DO NOTHING;
        
        -- Make sure RLS is enabled
        ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Allow public uploads to ${bucketName}" ON storage.objects;
        DROP POLICY IF EXISTS "Allow public reads from ${bucketName}" ON storage.objects;
        DROP POLICY IF EXISTS "Allow public updates to ${bucketName}" ON storage.objects;
        DROP POLICY IF EXISTS "Allow public deletes from ${bucketName}" ON storage.objects;
        
        -- Create a policy that allows public uploads to the bucket
        CREATE POLICY "Allow public uploads to ${bucketName}"
        ON storage.objects FOR INSERT
        TO public
        WITH CHECK (bucket_id = '${bucketName}');
        
        -- Create a policy that allows public reads from the bucket
        CREATE POLICY "Allow public reads from ${bucketName}"
        ON storage.objects FOR SELECT
        TO public
        USING (bucket_id = '${bucketName}');
        
        -- Create a policy that allows public updates to the bucket
        CREATE POLICY "Allow public updates to ${bucketName}"
        ON storage.objects FOR UPDATE
        TO public
        USING (bucket_id = '${bucketName}');
        
        -- Create a policy that allows public deletes from the bucket
        CREATE POLICY "Allow public deletes from ${bucketName}"
        ON storage.objects FOR DELETE
        TO public
        USING (bucket_id = '${bucketName}');
        
        -- Grant all privileges on the bucket to public
        GRANT ALL PRIVILEGES ON SCHEMA storage TO public;
        GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA storage TO public;
        GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA storage TO public;
      `
    })
    
    if (sqlError) {
      console.error('Error executing SQL:', sqlError)
      alert(`Error executing SQL: ${sqlError.message}`)
      return
    }
    
    console.log(`Bucket ${bucketName} created with full permissions`)
    alert(`Bucket ${bucketName} created with full permissions`)
    await fetchBuckets()
  } catch (error) {
    console.error('Error creating bucket with full permissions:', error)
    alert(`Error creating bucket with full permissions: ${error.message}`)
  }
}

// Upload the selected file
const handleUpload = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first')
    return
  }
  
  try {
    console.log('Starting upload test...')
    uploadResult.value = null
    
    const result = await uploadFile(selectedFile.value, selectedBucket.value)
    
    if (result) {
      console.log('Upload test successful:', result)
      uploadResult.value = result
      await fetchBucketContents(selectedBucket.value)
    } else {
      console.error('Upload test failed, no result returned')
    }
  } catch (error) {
    console.error('Error in upload test:', error)
  }
}

// Change selected bucket
const changeBucket = async (event) => {
  selectedBucket.value = event.target.value
  await fetchBucketContents(selectedBucket.value)
}
</script>

<template>
  <div class="p-6 bg-black/60 backdrop-blur-lg border border-green-900/30 rounded-xl">
    <h2 class="text-xl font-bold text-green-400 mb-4">File Upload Debug Tool</h2>
    
    <!-- Bucket Selection -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-green-300 mb-2">Storage Buckets</h3>
      
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <select 
          v-model="selectedBucket" 
          @change="changeBucket"
          class="bg-gray-900/70 border border-green-900/30 rounded-md px-3 py-2 text-white"
        >
          <option v-for="bucket in buckets" :key="bucket.id" :value="bucket.name">
            {{ bucket.name }} {{ bucket.public ? '(public)' : '(private)' }}
          </option>
        </select>
        
        <button 
          @click="fetchBuckets"
          class="px-3 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-white rounded-md"
        >
          Refresh
        </button>
      </div>
      
      <!-- Bucket Management -->
      <div class="flex flex-wrap gap-2 mb-4">
        <button 
          @click="createBucket"
          class="px-3 py-2 bg-green-900/60 hover:bg-green-800/60 text-white rounded-md"
        >
          Create Bucket
        </button>
        
        <button 
          @click="createBucketWithSQL"
          class="px-3 py-2 bg-green-900/60 hover:bg-green-800/60 text-white rounded-md"
        >
          Create Bucket with SQL
        </button>
        
        <button 
          @click="executeCustomSQL"
          class="px-3 py-2 bg-purple-900/60 hover:bg-purple-800/60 text-white rounded-md"
        >
          Execute Custom SQL
        </button>
        
        <button 
          @click="createBucketWithFullPermissions"
          class="px-3 py-2 bg-blue-900/60 hover:bg-blue-800/60 text-white rounded-md"
        >
          Create Bucket with Full Permissions
        </button>
      </div>
      
      <!-- Bucket Contents -->
      <div class="bg-gray-900/40 rounded-md p-3 max-h-40 overflow-y-auto mb-4">
        <h4 class="text-sm font-medium text-green-300 mb-2">Bucket Contents:</h4>
        <div v-if="bucketContents.length === 0" class="text-gray-500 text-sm">
          No files in this bucket
        </div>
        <ul v-else class="space-y-1">
          <li v-for="item in bucketContents" :key="item.name" class="text-sm text-gray-300">
            {{ item.name }} ({{ item.metadata?.size ? (item.metadata.size / 1024).toFixed(1) + ' KB' : 'unknown size' }})
          </li>
        </ul>
      </div>
    </div>
    
    <!-- SQL Helper -->
    <div class="mb-4 p-3 bg-gray-900/40 rounded-md">
      <h3 class="text-lg font-semibold text-green-300 mb-2">SQL Helper</h3>
      <div class="text-xs font-mono bg-black/40 p-3 rounded-md overflow-x-auto whitespace-pre">
-- Create the chat-files bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-files', 'Chat Files', true)
ON CONFLICT (id) DO NOTHING;

-- Make sure RLS is enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public uploads to chat-files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads from chat-files" ON storage.objects;

-- Create upload policy
CREATE POLICY "Allow public uploads to chat-files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'chat-files');

-- Create read policy
CREATE POLICY "Allow public reads from chat-files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'chat-files');
      </div>
    </div>
    
    <!-- File Upload Test -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-green-300 mb-2">Upload Test</h3>
      
      <div class="flex items-center gap-2 mb-4">
        <input 
          ref="fileInputRef"
          type="file" 
          @change="handleFileSelect"
          class="hidden"
        />
        
        <button 
          @click="fileInputRef.click()"
          class="px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 text-white rounded-md flex items-center"
        >
          <span class="mr-2">Select File</span>
          <span v-if="selectedFile">{{ selectedFile.name }}</span>
        </button>
        
        <button 
          @click="handleUpload"
          class="px-4 py-2 bg-green-900/60 hover:bg-green-800/60 text-white rounded-md"
          :disabled="!selectedFile || isUploading"
        >
          <span v-if="isUploading">Uploading... {{ uploadProgress }}%</span>
          <span v-else>Upload File</span>
        </button>
      </div>
      
      <!-- Upload Error -->
      <div v-if="uploadError" class="bg-red-900/20 p-3 rounded-md border border-red-900/30 text-red-400 mb-4">
        <h4 class="font-medium mb-1">Upload Error:</h4>
        <p>{{ uploadError }}</p>
      </div>
      
      <!-- Upload Result -->
      <div v-if="uploadResult" class="bg-green-900/20 p-3 rounded-md border border-green-900/30 text-green-300 mb-4">
        <h4 class="font-medium mb-1">Upload Success:</h4>
        <div class="text-sm space-y-1">
          <p><strong>Path:</strong> {{ uploadResult.path }}</p>
          <p><strong>File Name:</strong> {{ uploadResult.fileName }}</p>
          <p><strong>File Type:</strong> {{ uploadResult.fileType }}</p>
          <p><strong>File Size:</strong> {{ (uploadResult.fileSize / 1024).toFixed(1) }} KB</p>
          <p class="break-all"><strong>URL:</strong> <a :href="uploadResult.fileUrl" target="_blank" class="text-blue-400 hover:underline">{{ uploadResult.fileUrl }}</a></p>
        </div>
      </div>
    </div>
    
    <!-- Supabase Client Info -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-green-300 mb-2">Supabase Client Info</h3>
      <div class="bg-gray-900/40 rounded-md p-3">
        <p class="text-sm text-gray-300">
          <strong>Client Available:</strong> {{ supabase ? 'Yes' : 'No' }}
        </p>
        <p class="text-sm text-gray-300">
          <strong>Storage Available:</strong> {{ supabase?.storage ? 'Yes' : 'No' }}
        </p>
        <p class="text-sm text-gray-300">
          <strong>Auth Available:</strong> {{ supabase?.auth ? 'Yes' : 'No' }}
        </p>
      </div>
    </div>
  </div>
</template> 