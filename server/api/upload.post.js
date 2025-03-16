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

    // Generate a unique filename
    const fileData = filePart.data
    const fileName = filePart.filename
    const fileExt = fileName.split('.').pop()
    const uniqueFileName = `${uuidv4()}.${fileExt}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, fileData, {
        contentType: filePart.type,
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Upload error:', error)
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
        fileUrl: urlData.publicUrl,
        fileName: fileName,
        fileType: filePart.type,
        fileSize: fileData.length
      }
    }
  } catch (err) {
    console.error('Server upload error:', err)
    return {
      statusCode: 500,
      body: { error: err.message }
    }
  }
}) 