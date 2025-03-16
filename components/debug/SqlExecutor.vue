<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const sqlCommand = ref(`-- Example: Create a test function
CREATE OR REPLACE FUNCTION test_connection()
RETURNS TEXT AS $$
BEGIN
  RETURN 'Connection successful';
END;
$$ LANGUAGE plpgsql;`)
const status = ref('')
const result = ref(null)
const error = ref(null)
const isLoading = ref(false)

const executeSql = async () => {
  if (!sqlCommand.value) {
    status.value = 'Please enter SQL command'
    return
  }
  
  isLoading.value = true
  status.value = 'Executing SQL...'
  result.value = null
  error.value = null
  
  try {
    // Execute SQL via RPC
    const { data, error: sqlError } = await supabase.rpc('execute_sql', {
      sql_command: sqlCommand.value
    })
    
    if (sqlError) {
      console.error('SQL execution error:', sqlError)
      status.value = 'SQL execution failed'
      error.value = sqlError.message
      return
    }
    
    status.value = 'SQL executed successfully'
    result.value = data || 'Command executed (no data returned)'
    console.log('SQL result:', data)
  } catch (err) {
    console.error('SQL execution exception:', err)
    status.value = 'SQL execution failed'
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const testRpcFunction = async () => {
  isLoading.value = true
  status.value = 'Testing RPC function...'
  result.value = null
  error.value = null
  
  try {
    // Test if the execute_sql RPC function exists
    const { data, error: rpcError } = await supabase.rpc('execute_sql', {
      sql_command: 'SELECT 1 as test'
    })
    
    if (rpcError) {
      if (rpcError.message.includes('function') && rpcError.message.includes('does not exist')) {
        status.value = 'RPC function does not exist'
        error.value = 'The execute_sql function is not available. You need to create it in your Supabase project.'
        
        // Show SQL to create the function
        result.value = `-- SQL to create the execute_sql function:
CREATE OR REPLACE FUNCTION execute_sql(sql_command text)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_command;
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'detail', SQLSTATE
    );
END;
$$;`
      } else {
        status.value = 'RPC test failed'
        error.value = rpcError.message
      }
      return
    }
    
    status.value = 'RPC function exists and works'
    result.value = data
  } catch (err) {
    console.error('RPC test exception:', err)
    status.value = 'RPC test failed'
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Common SQL examples
const sqlExamples = [
  {
    name: 'Create execute_sql function',
    sql: `CREATE OR REPLACE FUNCTION execute_sql(sql_command text)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_command;
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'detail', SQLSTATE
    );
END;
$$;`
  },
  {
    name: 'Create chat-files bucket',
    sql: `-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-files', 'chat-files', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for the bucket
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Allow public read for chat-files" ON storage.objects;
  DROP POLICY IF EXISTS "Allow public uploads to chat-files" ON storage.objects;
  
  -- Create policy to allow public reads
  CREATE POLICY "Allow public read for chat-files"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'chat-files');
    
  -- Create policy to allow public uploads
  CREATE POLICY "Allow public uploads to chat-files"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'chat-files');
END
$$;`
  },
  {
    name: 'List storage buckets',
    sql: `SELECT * FROM storage.buckets;`
  },
  {
    name: 'List storage policies',
    sql: `SELECT * FROM pg_policies WHERE tablename = 'objects';`
  }
]

const loadExample = (example) => {
  sqlCommand.value = example.sql
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">SQL Executor</h2>
    <p class="mb-4 text-gray-600">Execute SQL commands via RPC</p>
    
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <label class="block text-sm font-medium text-gray-700">SQL Command</label>
        <Button @click="testRpcFunction" variant="outline" size="sm">
          <Icon name="lucide:check-circle" class="mr-1" />
          Test RPC Function
        </Button>
      </div>
      <textarea
        v-model="sqlCommand"
        rows="8"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
        placeholder="Enter SQL command"
      ></textarea>
    </div>
    
    <div class="mb-6">
      <Button 
        @click="executeSql" 
        :disabled="isLoading || !sqlCommand"
      >
        <Icon name="lucide:play" class="mr-2" />
        {{ isLoading ? 'Executing...' : 'Execute SQL' }}
      </Button>
    </div>
    
    <div v-if="status" class="mb-4 p-3 rounded-md" :class="{
      'bg-green-50 text-green-700': status.includes('successfully') || status.includes('exists and works'),
      'bg-yellow-50 text-yellow-700': status.includes('Executing'),
      'bg-red-50 text-red-700': status.includes('failed') || status.includes('does not exist')
    }">
      <p class="font-medium">Status:</p>
      <p>{{ status }}</p>
    </div>
    
    <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
      <p class="font-medium">Error:</p>
      <p>{{ error }}</p>
    </div>
    
    <div v-if="result" class="mb-4">
      <h3 class="font-semibold mb-2">Result:</h3>
      <pre class="p-3 bg-gray-50 rounded-md overflow-x-auto text-sm">{{ typeof result === 'object' ? JSON.stringify(result, null, 2) : result }}</pre>
    </div>
    
    <div class="mt-6">
      <h3 class="font-semibold mb-2">SQL Examples</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button 
          v-for="example in sqlExamples" 
          :key="example.name"
          variant="outline"
          @click="loadExample(example)"
          class="justify-start"
        >
          <Icon name="lucide:code" class="mr-2" />
          {{ example.name }}
        </Button>
      </div>
    </div>
  </div>
</template> 