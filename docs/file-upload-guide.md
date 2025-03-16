# File Upload Guide

This guide explains how to use the file upload functionality in the Hackathon Leaderboard chat.

## Uploading Files in Chat

### Method 1: Using the Paperclip Button

1. Navigate to the chat interface
2. Click the paperclip icon (📎) next to the message input field
3. Select a file from your device
4. The file will appear as a preview in the chat input area
5. Type an optional message to accompany the file
6. Click the send button to upload and share the file

### Method 2: Using the File Uploader Component

1. In the chat interface, locate the File Uploader component above the message input
2. Click "Select File" to choose a file from your device
3. Once selected, you'll see a preview (for images) and file details
4. Click "Upload" to upload the file
5. After successful upload, the file will be shared in the chat

## Supported File Types

The following file types are supported:

- Images (PNG, JPG, GIF, WebP, etc.)
- Documents (PDF, DOC, DOCX, TXT)
- Spreadsheets (XLS, XLSX)
- Other common file formats

## File Size Limits

- Maximum file size: 5MB

## Viewing Shared Files

When a file is shared in the chat:

1. Image files will display as thumbnails that can be clicked to view full-size
2. Document files will appear as clickable links
3. Click on any file to open or download it

## Troubleshooting

If you encounter issues uploading files:

1. **File Too Large**: Ensure your file is under the size limit (5MB)
2. **Unsupported File Type**: Check that your file type is supported
3. **Upload Fails**: Try refreshing the page and uploading again
4. **Permission Issues**: Contact an administrator if you consistently have problems

For persistent issues, administrators can use the debug tools at `/debug` to test and troubleshoot file uploads.

## Privacy and Security

- Files uploaded to the chat are stored in Supabase Storage
- Files are publicly accessible to anyone with the link
- Do not upload sensitive or confidential information
- Administrators can remove inappropriate files if necessary 