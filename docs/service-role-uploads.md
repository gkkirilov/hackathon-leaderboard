# Using Service Role Client for File Uploads

This document explains how to use the service role client for file uploads in the Hackathon Leaderboard application.

## Overview

When uploading files to Supabase Storage, you might encounter permission issues if the bucket policies are not properly configured. To bypass these permission issues, we can use the service role client, which has admin privileges.

## Implementation Options

### Option 1: Using the useFileUpload Composable

We've implemented the service role client in the `useFileUpload` composable:

```js
// Create a service role client for admin operations
const serviceClient = useSupabaseClient({ 
  options: { 
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  }
})
```

This client is then used for all storage operations:

```js
// Upload the file to Supabase Storage using service role client
const { data, error } = await serviceClient
  .storage
  .from(bucketName)
  .upload(filePath, fileBody, uploadOptions)
```

### Option 2: Direct Upload Approach

For a simpler approach, you can use the service role client directly in your component:

```js
<script setup>
// Service role client for admin operations
const serviceClient = useSupabaseClient({ 
  options: { 
    global: {
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  }
})

const uploadFile = async (evt) => {
  const file = evt.target.files[0]
  if (!file) return
  
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = fileName
    
    // Upload using service role client
    const { data, error: uploadError } = await serviceClient.storage
      .from('chat-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (uploadError) throw uploadError
    
    // Get public URL
    const { data: urlData } = serviceClient.storage
      .from('chat-files')
      .getPublicUrl(data.path)
    
    console.log('File URL:', urlData.publicUrl)
    
    // Do something with the file URL
    
  } catch (err) {
    console.error('Upload error:', err)
  }
}
</script>

<template>
  <div>
    <input
      type="file"
      accept="image/*"
      @change="uploadFile"
    />
  </div>
</template>
```

### Option 3: Server-Side API Approach (Recommended)

The most secure approach is to use a server-side API endpoint that handles the file upload using the service role key:

1. Create a server-side API endpoint using Nuxt's built-in `serverSupabaseServiceRole`:

```js
// server/api/upload.post.js
import { v4 as uuidv4 } from 'uuid'
import { defineEventHandler, readMultipartFormData } from 'h3'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    // Parse multipart form data
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      return {
        statusCode: 400,
        body: { error: 'No file provided' }
      }
    }

    // Find the file part
    const filePart = formData.find(part => part.name === 'file')
    if (!filePart) {
      return {
        statusCode: 400,
        body: { error: 'No file part found in form data' }
      }
    }
    
    // Get bucket name from form data or use default
    const bucketNamePart = formData.find(part => part.name === 'bucketName')
    const bucketName = bucketNamePart ? bucketNamePart.data.toString() : 'chat-files'

    // Get Supabase service role client from Nuxt
    const supabase = serverSupabaseServiceRole(event)

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uuidv4(), filePart.data, {
        contentType: filePart.type
      })

    if (error) {
      return {
        statusCode: error.statusCode || 500,
        body: { error: error.message }
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path)

    // Return success response
    return {
      statusCode: 200,
      body: {
        success: true,
        path: data.path,
        fileUrl: urlData.publicUrl
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: { error: err.message }
    }
  }
})
```

2. Use the API endpoint in your component:

```js
<script setup>
const uploadFile = async (evt) => {
  const file = evt.target.files[0]
  if (!file) return
  
  try {
    // Create form data for the API request
    const formData = new FormData()
    formData.append('file', file)
    
    // Send request to server-side API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed')
    }
    
    console.log('File URL:', result.body.fileUrl)
    
    // Do something with the file URL
    
  } catch (err) {
    console.error('Upload error:', err)
  }
}
</script>

<template>
  <div>
    <input
      type="file"
      accept="image/*"
      @change="uploadFile"
    />
  </div>
</template>
```

## Components

We've created several components to handle file uploads:

1. **FileUploader.vue**: A reusable component that handles file selection, preview, and upload using the service role client.
2. **SimpleUploader.vue**: A minimal example component that demonstrates the direct upload approach.
3. **ServerUploader.vue**: A component that uses the server-side API endpoint for file uploads.

## How It Works

The service role client bypasses Row Level Security (RLS) policies and has full access to your Supabase project. This is useful for operations that require elevated permissions, like file uploads when bucket policies are not properly configured.

## Testing

You can test the service role client using the following debug tools:

1. **Service Role Test**: Tests the difference between standard and service role clients
2. **Direct File Upload Test**: Allows you to toggle between standard and service role clients
3. **File Upload Test**: Uses the service role client via the `useFileUpload` composable
4. **Simple Uploader**: Demonstrates the direct upload approach
5. **Server Uploader**: Demonstrates the server-side API approach (recommended)

## Security Considerations

The service role client should be used carefully as it has full access to your Supabase project. In a production environment, you should:

1. Use server-side endpoints for operations that require elevated permissions (Option 3)
2. Properly configure bucket policies to allow authenticated users to upload files
3. Implement additional validation and security checks

**Important**: Never expose your service role key in client-side code. If you need to use the service role key, always do it on the server side.

## Bucket Policies

If you prefer to use proper bucket policies instead of the service role client, you can create them using the SQL Executor or Bucket Creator tools in the debug page.

Here's an example of the SQL needed to create a bucket with public upload and read policies:

```sql
-- Create bucket if it doesn't exist
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
$$;
```

## Troubleshooting

If you encounter issues with file uploads, try the following:

1. Check if the bucket exists using the Supabase Connection Test
2. Create the bucket and policies using the Bucket Creator
3. Test direct file uploads using the Direct File Upload Test or Simple Uploader
4. Try the server-side approach using the Server Uploader
5. Check for errors in the browser console

If you see the error `new row violates row-level security policy`, it means that the current user doesn't have permission to upload files to the bucket. You can:

1. Use the server-side approach (Option 3)
2. Create proper bucket policies using the SQL Executor
3. Use the service role client with the correct configuration 