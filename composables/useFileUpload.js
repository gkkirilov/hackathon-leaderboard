import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { v4 as uuidv4 } from 'uuid'

export const useFileUpload = () => {
  const supabase = useSupabaseClient()
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
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref(null)
  
  /**
   * Upload a file to Supabase Storage
   * @param {File} file - The file to upload
   * @param {string} bucketName - The bucket to upload to (default: 'chat-files')
   * @returns {Promise<{path: string, fileUrl: string, fileType: string, fileName: string, fileSize: number} | null>}
   */
  const uploadFile = async (file, bucketName = 'chat-files') => {
    if (!file) {
      console.error('No file provided for upload')
      uploadError.value = 'No file provided'
      return null
    }
    
    // Reset state
    isUploading.value = true
    uploadProgress.value = 0
    uploadError.value = null
    
    // Debug: Log Supabase client
    console.log('Supabase client:', supabase ? 'Available' : 'Not available')
    console.log('Supabase storage:', supabase?.storage ? 'Available' : 'Not available')
    console.log('Supabase auth:', supabase?.auth ? 'Available' : 'Not available')
    console.log('Supabase user:', supabase?.auth?.user ? 'Logged in' : 'Not logged in')
    console.log('Service client:', serviceClient ? 'Available' : 'Not available')
    
    try {
      // Generate a unique file name to prevent collisions
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = fileName // Simplified path
      
      console.log('DEBUG - Uploading file:', {
        bucketName,
        filePath,
        fileName,
        fileType: file.type,
        fileSize: file.size,
        fileObject: typeof file
      })
      
      // Skip bucket check - we know it exists in the dashboard
      console.log('Skipping bucket check - assuming bucket exists')
      
      // Prepare file for upload
      let fileBody = file
      
      // Debug: Log file details
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        constructor: file.constructor.name
      })
      
      // Upload the file to Supabase Storage using service role client
      console.log(`Starting upload to ${bucketName}/${filePath} using service role...`)
      const uploadOptions = {
        cacheControl: '3600',
        contentType: file.type,
        upsert: true
      }
      console.log('Upload options:', uploadOptions)
      
      // Try direct upload with error handling using service role client
      try {
        const { data, error } = await serviceClient
          .storage
          .from(bucketName)
          .upload(filePath, fileBody, uploadOptions)
        
        if (error) {
          console.error('Supabase storage upload error:', error)
          console.error('Error details:', {
            message: error.message,
            statusCode: error.statusCode,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          uploadError.value = `Upload failed: ${error.message}`
          throw error
        }
        
        if (!data || !data.path) {
          console.error('Upload succeeded but no path was returned:', data)
          uploadError.value = 'Upload succeeded but no path was returned'
          throw new Error('Upload succeeded but no path was returned')
        }
        
        console.log('Upload successful:', data)
        
        // Get the public URL for the file using service role client
        console.log(`Getting public URL for ${bucketName}/${data.path}...`)
        const { data: publicUrlData } = serviceClient
          .storage
          .from(bucketName)
          .getPublicUrl(data.path)
        
        if (!publicUrlData || !publicUrlData.publicUrl) {
          console.error('Could not get public URL:', publicUrlData)
          uploadError.value = 'Could not get public URL for uploaded file'
          throw new Error('Could not get public URL for uploaded file')
        }
        
        console.log('Public URL generated:', publicUrlData.publicUrl)
        
        return {
          path: data.path,
          fileUrl: publicUrlData.publicUrl,
          fileType: file.type,
          fileName: file.name,
          fileSize: file.size
        }
      } catch (uploadError) {
        console.error('Error in direct upload:', uploadError)
        throw uploadError
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      uploadError.value = error.message || 'Failed to upload file'
      return null
    } finally {
      isUploading.value = false
    }
  }
  
  /**
   * Get file type category for display purposes
   * @param {string} fileType - MIME type of the file
   * @returns {string} - Category of the file (image, video, audio, document, etc.)
   */
  const getFileCategory = (fileType) => {
    if (!fileType) return 'unknown'
    
    if (fileType.startsWith('image/')) return 'image'
    if (fileType.startsWith('video/')) return 'video'
    if (fileType.startsWith('audio/')) return 'audio'
    if (fileType.includes('pdf')) return 'pdf'
    if (fileType.includes('word') || fileType.includes('document')) return 'document'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'spreadsheet'
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'presentation'
    if (fileType.includes('text/')) return 'text'
    
    return 'file'
  }
  
  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} - Formatted file size (e.g., "2.5 MB")
   */
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes'
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
  }
  
  return {
    isUploading,
    uploadProgress,
    uploadError,
    uploadFile,
    getFileCategory,
    formatFileSize
  }
} 