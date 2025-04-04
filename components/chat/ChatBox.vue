<script setup>
import AIControlPanel from '~/components/chat/AIControlPanel.vue'
import FileAttachment from '~/components/chat/FileAttachment.vue'
import FileUploader from '~/components/chat/FileUploader.vue'

const { teamColors, getTeamColor } = useTeams()
const { 
  messages, 
  messagesLoading, 
  initGlobalChat, 
  sendMessage, 
  roomParticipants, 
  participantsCount,
  hasMoreMessages,
  loadMoreMessages
} = useSupabaseRealtime()
const { profile, fetchProfile } = useUserProfile()
const { checkForQuestions } = useLocalAI()
const { uploadFile, isUploading, uploadProgress, uploadError } = useFileUpload()
const user = useSupabaseUser()

const chatMessage = ref('')
const chatContainer = ref(null)
const isJoiningChat = ref(true)
const localMessages = ref([]) // Track messages locally
const loadingMore = ref(false)
const notificationSound = ref(null)
const lastMessageTimestamp = ref(null)
const lastMessageSender = ref(null)
const isSoundMuted = ref(false)
const isSoundLoaded = ref(false)
const soundLoadError = ref(null)
const isNearTop = ref(false)
const fileInputRef = ref(null)
const selectedFile = ref(null)
const filePreview = ref(null)
const isServerUploading = ref(false)
const serverUploadError = ref(null)

// Initialize chat on component mount and fetch profile if needed
onMounted(async () => {
  // Ensure profile is loaded
  if (user.value && !profile.value) {
    await fetchProfile()
  }
  
  // Load mute preference from localStorage
  const savedMutePreference = localStorage.getItem('chatSoundMuted')
  if (savedMutePreference !== null) {
    isSoundMuted.value = savedMutePreference === 'true'
  }
  
  // Initialize chat with presence
  await initGlobalChat()
  
  // Show joining animation
  setTimeout(() => {
    isJoiningChat.value = false
  }, 1500)
  
  // Try to load the sound
  initSound()
  
  // Log message counts periodically for debugging
  const logInterval = setInterval(() => {
    if (messages.value) {
      console.log('[ChatBox] Message counts - messages:', messages.value.length, 'localMessages:', localMessages.value.length)
    }
  }, 5000)
  
  // Set up scroll event listener
  if (chatContainer.value) {
    chatContainer.value.addEventListener('scroll', checkScroll);
    
    // Add explicit wheel event listener to ensure mousewheel scrolling works
    chatContainer.value.addEventListener('wheel', handleWheel, { passive: true });
    
    // Add touch event listeners for mobile scrolling
    chatContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
    chatContainer.value.addEventListener('touchmove', handleTouchMove, { passive: true });
  }
  
  // Clean up interval and event listener
  onUnmounted(() => {
    clearInterval(logInterval)
    if (chatContainer.value) {
      chatContainer.value.removeEventListener('scroll', checkScroll);
      chatContainer.value.removeEventListener('wheel', handleWheel);
      chatContainer.value.removeEventListener('touchstart', handleTouchStart);
      chatContainer.value.removeEventListener('touchmove', handleTouchMove);
    }
  })
})

// Initialize and test the notification sound
const initSound = () => {
  setTimeout(() => {
    if (notificationSound.value) {
      console.log('[ChatBox] Initializing notification sound...')
      
      // Load and prepare the sound
      notificationSound.value.load()
      
      // Test play the sound with very low volume (muted for user but tests browser capability)
      if (!isSoundMuted.value) {
        const originalVolume = notificationSound.value.volume
        notificationSound.value.volume = 0.01
        const playPromise = notificationSound.value.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('[ChatBox] Sound test successful')
              // Reset volume and pause immediately
              notificationSound.value.pause()
              notificationSound.value.currentTime = 0
              notificationSound.value.volume = originalVolume
              isSoundLoaded.value = true
            })
            .catch(err => {
              console.error('[ChatBox] Sound test failed:', err)
              soundLoadError.value = 'Browser blocked autoplay'
            })
        }
      } else {
        // Skip test if muted
        isSoundLoaded.value = true
      }
    }
  }, 2000) // Give the audio element time to load
}

// Play notification sound
const playSound = () => {
  if (!notificationSound.value || isSoundMuted.value || !isSoundLoaded.value) return false
  
  try {
    notificationSound.value.currentTime = 0
    const playPromise = notificationSound.value.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.error('[ChatBox] Error playing notification sound:', err)
        soundLoadError.value = 'Failed to play sound: ' + err.message
      })
    }
    return true
  } catch (err) {
    console.error('[ChatBox] Error playing notification sound:', err)
    soundLoadError.value = 'Error: ' + err.message
    return false
  }
}

// Handle sound loading events
const handleSoundLoaded = () => {
  console.log('[ChatBox] Notification sound loaded successfully')
  isSoundLoaded.value = true
  soundLoadError.value = null
}

const handleSoundError = (event) => {
  console.error('[ChatBox] Error loading notification sound:', event)
  soundLoadError.value = 'Failed to load sound file'
  isSoundLoaded.value = false
}

// Toggle mute/unmute notification sounds
const toggleSound = () => {
  isSoundMuted.value = !isSoundMuted.value
  // Save preference to localStorage
  localStorage.setItem('chatSoundMuted', isSoundMuted.value.toString())
  
  // Play a test sound when unmuting to confirm it's working
  if (!isSoundMuted.value && isSoundLoaded.value) {
    playSound()
  }
}

// Copy external messages to local state
watch(messages, (newMessages, oldMessages) => {
  console.log('[ChatBox] Messages updated, count:', newMessages.length)
  
  // Check if there are new messages 
  const hasNewMessages = newMessages.length > (oldMessages?.length || 0)
  
  // Get the most recent message
  const latestMessage = newMessages[newMessages.length - 1]
  
  // Play sound for new messages but not user's own messages
  if (hasNewMessages && latestMessage && isSoundLoaded.value && !isSoundMuted.value) {
    const isUserMessage = profile.value && latestMessage.user_name === profile.value.name
    const isDuplicate = lastMessageTimestamp.value === latestMessage.created_at && 
                        lastMessageSender.value === latestMessage.user_name
    
    if (!isUserMessage && !isDuplicate) {
      console.log('[ChatBox] Playing notification sound for new message')
      playSound()
      
      // Store reference to the last message to avoid double notifications
      lastMessageTimestamp.value = latestMessage.created_at
      lastMessageSender.value = latestMessage.user_name
    }
  }
  
  localMessages.value = [...newMessages]
  
  // Check for questions that the AI should answer
  if (newMessages.length > 0) {
    checkForQuestions(newMessages)
  }
  
  // Update scroll logic since we're no longer using reversed flex direction
  nextTick(() => {
    if (chatContainer.value && !isNearTop.value) {
      console.log('[ChatBox] Scrolling message container to top for newest messages')
      chatContainer.value.scrollTop = 0
    }
  })
}, { immediate: true, deep: true })

// Format the timestamp for chat messages
const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';
  
  // Validate date string
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return date.toLocaleTimeString();
}

// Handle loading more messages when scrolling or clicking "Load More"
const handleLoadMore = async () => {
  if (loadingMore.value || !hasMoreMessages.value) return;
  
  loadingMore.value = true;
  
  // Store current scroll position before loading more messages
  const scrollTopBefore = chatContainer.value?.scrollTop || 0;
  const scrollHeightBefore = chatContainer.value?.scrollHeight || 0;
  console.log('[ChatBox] Scroll position before loading more:', scrollTopBefore);
  
  await loadMoreMessages();
  
  // After loading more messages, adjust the scroll position to maintain the view
  nextTick(() => {
    if (chatContainer.value) {
      const newScrollHeight = chatContainer.value.scrollHeight;
      const scrollHeightDiff = newScrollHeight - scrollHeightBefore;
      console.log('[ChatBox] New scroll height:', newScrollHeight, 'Difference:', scrollHeightDiff);
      
      // Adjust scroll position to maintain the same relative view of newer messages
      chatContainer.value.scrollTop = scrollTopBefore + scrollHeightDiff;
      console.log('[ChatBox] Adjusted scroll position after loading more messages');
    }
    loadingMore.value = false;
  });
}

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  selectedFile.value = file
  
  // Create a preview for images
  if (file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      filePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    filePreview.value = null
  }
}

// Clear selected file
const clearSelectedFile = () => {
  selectedFile.value = null
  filePreview.value = null
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Trigger file input click
const openFileSelector = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

// Handle file upload complete
const handleUploadComplete = (fileData) => {
  console.log('File upload completed:', fileData)
  
  // Create the message object with file attachment
  const newMessage = {
    text: chatMessage.value.trim(),
    user_name: profile.value.name,
    team_id: profile.value.team_id,
    created_at: new Date().toISOString(),
    file_url: fileData.fileUrl,
    file_type: fileData.fileType,
    file_name: fileData.fileName,
    file_size: fileData.fileSize,
    // Add a temporary ID to identify this message locally
    _tempId: Date.now() + Math.random().toString(36).substring(2, 9)
  }
  
  // Add to local messages first for immediate display
  localMessages.value.push(newMessage)
  
  // Scroll to top to see new message since messages are sorted newest first
  nextTick(() => {
    if (chatContainer.value) {
      console.log('[ChatBox] Scrolling to top after sending message')
      chatContainer.value.scrollTop = 0
    }
  })
  
  // Clear input
  chatMessage.value = ''
  
  // Send through Supabase
  try {
    const result = sendMessage(
      newMessage.text,
      newMessage.user_name,
      newMessage.team_id,
      {
        fileUrl: fileData.fileUrl,
        fileType: fileData.fileType,
        fileName: fileData.fileName,
        fileSize: fileData.fileSize
      }
    )
    
    if (!result) {
      console.error('Failed to send message through Supabase')
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

// Handle file upload error
const handleUploadError = (errorMessage) => {
  console.error('File upload error:', errorMessage)
  uploadError.value = errorMessage
}

// Send message function with file attachment support
const handleSendMessage = async () => {
  if ((!chatMessage.value.trim() && !selectedFile.value) || !profile.value?.name || !profile.value?.team_id) return
  
  let fileAttachment = null
  
  // Upload file if selected
  if (selectedFile.value) {
    try {
      console.log('Starting file upload for:', selectedFile.value.name)
      
      // Use server-side API for file upload
      isServerUploading.value = true
      serverUploadError.value = null
      
      // Create form data for the API request
      const formData = new FormData()
      formData.append('file', selectedFile.value)
      formData.append('bucketName', 'chat-files')
      
      // Send request to server-side API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }
      
      console.log('File uploaded successfully via server API:', result)
      
      // Format the file attachment data
      fileAttachment = {
        fileUrl: result.body.fileUrl,
        fileType: selectedFile.value.type,
        fileName: selectedFile.value.name,
        fileSize: selectedFile.value.size
      }
      
    } catch (error) {
      console.error('Error during server file upload:', error)
      serverUploadError.value = error.message || 'File upload failed'
      
      // Show error but allow sending the text message part
      if (!chatMessage.value.trim()) {
        isServerUploading.value = false
        return // Don't proceed if there's no text message and file upload failed
      }
    } finally {
      isServerUploading.value = false
    }
  }
  
  // Create the message object
  const newMessage = {
    text: chatMessage.value.trim(),
    user_name: profile.value.name,
    team_id: profile.value.team_id,
    created_at: new Date().toISOString(),
    // Add a temporary ID to identify this message locally
    _tempId: Date.now() + Math.random().toString(36).substring(2, 9)
  }
  
  // Add file attachment data if available
  if (fileAttachment) {
    newMessage.file_url = fileAttachment.fileUrl
    newMessage.file_type = fileAttachment.fileType
    newMessage.file_name = fileAttachment.fileName
    newMessage.file_size = fileAttachment.fileSize
    
    console.log('Adding file attachment to message:', {
      url: fileAttachment.fileUrl,
      type: fileAttachment.fileType,
      name: fileAttachment.fileName,
      size: fileAttachment.fileSize
    })
  }
  
  // Add to local messages first for immediate display
  localMessages.value.push(newMessage)
  
  // Scroll to top to see new message since messages are sorted newest first
  nextTick(() => {
    if (chatContainer.value) {
      console.log('[ChatBox] Scrolling to top after sending message')
      chatContainer.value.scrollTop = 0
    }
  })
  
  // Clear input and selected file
  chatMessage.value = ''
  clearSelectedFile()
  
  // Send through Supabase
  try {
    const result = await sendMessage(
      newMessage.text,
      newMessage.user_name,
      newMessage.team_id,
      fileAttachment
    )
    
    if (!result) {
      console.error('Failed to send message through Supabase')
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

// Check if user is near the bottom of the message container (for auto-loading more messages)
const checkScroll = () => {
  if (!chatContainer.value) return;
  
  // For a normal scrolling experience with newest at top, we need to check if user is near bottom
  // since that's where older messages would be loaded
  const nearBottomThreshold = 200;
  const scrollBottom = chatContainer.value.scrollHeight - chatContainer.value.scrollTop - chatContainer.value.clientHeight;
  isNearTop.value = scrollBottom < nearBottomThreshold;
  
  // Log scroll position every 10th check (to avoid console spam)
  if (Math.random() < 0.1) {
    console.log(
      '[ChatBox] Scroll position:',
      chatContainer.value.scrollTop,
      'of',
      chatContainer.value.scrollHeight,
      'nearBottom:',
      isNearTop.value,
      'scrollBottom:',
      scrollBottom
    );
  }
}

// Handle mousewheel events for scrolling
const handleWheel = (event) => {
  if (chatContainer.value) {
    // Prevent default only if needed (usually not necessary with passive listeners)
    // event.preventDefault(); 
    
    // Adjust scroll position based on wheel delta
    chatContainer.value.scrollTop += event.deltaY;
    
    // Update scroll check
    checkScroll();
  }
}

// Touch event handling for mobile scrolling
let touchStartY = 0;

const handleTouchStart = (event) => {
  if (event.touches.length === 1) {
    touchStartY = event.touches[0].clientY;
  }
}

const handleTouchMove = (event) => {
  if (event.touches.length === 1) {
    const touchY = event.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    if (chatContainer.value) {
      chatContainer.value.scrollTop += diff;
      touchStartY = touchY;
    }
    
    // Update scroll check
    checkScroll();
  }
}
</script>

<template>
  <div class="flex flex-col h-full rounded-xl overflow-hidden bg-gray-900/60 backdrop-blur-lg border border-green-900/20 shadow-xl shadow-green-900/10 relative touch-auto">
    <!-- AI Control Panel - moved to work with the toggle button -->
    <AIControlPanel ref="aiControlPanel" />
    
    <!-- Notification Sound -->
    <audio 
      ref="notificationSound" 
      preload="auto"
      @canplaythrough="handleSoundLoaded"
      @error="handleSoundError"
    >
      <!-- Try multiple sources to increase browser compatibility -->
      <source src="/sounds/chat-notification.mp3" type="audio/mpeg">
      
    </audio>
    
    <!-- Chat Header -->
    <div class="bg-black/50 backdrop-blur-md border-b border-green-900/30 p-3 flex items-center justify-between">
      <div class="flex items-center">
        <Icon name="lucide:message-square" class="text-green-400 h-5 w-5 mr-2" />
        <h3 class="font-bold text-sm text-green-400">GLOBAL CHAT</h3>
      </div>
      <div class="flex items-center gap-3">
        <!-- Sound toggle button with indicator -->
        <button 
          @click="toggleSound" 
          class="relative text-gray-500 hover:text-gray-300 focus:outline-none"
          :title="isSoundMuted ? 'Unmute notifications' : 'Mute notifications'"
        >
          <Icon 
            :name="isSoundMuted ? 'lucide:volume-x' : 'lucide:volume-2'" 
            class="h-5 w-5"
            :class="{'text-green-500': !isSoundMuted && isSoundLoaded}"
          />
          <span 
            v-if="!isSoundMuted && isSoundLoaded" 
            class="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"
          ></span>
          
          <!-- Sound error indicator -->
          <span 
            v-if="soundLoadError" 
            class="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"
          ></span>
        </button>
        
        <span class="text-xs text-gray-500 font-mono mr-2">
          {{ participantsCount }} ONLINE
        </span>
        <div class="flex -space-x-1">
          <div 
            v-for="(participant, index) in roomParticipants.slice(0, 3)" 
            :key="participant.id"
            class="w-6 h-6 rounded-full border border-black/40 flex items-center justify-center text-xs font-bold shadow-inner shadow-black/20"
            :class="getTeamColor(participant.team_id)"
            :title="participant.name"
          >
            {{ participant.name ? participant.name.charAt(0).toUpperCase() : '?' }}
          </div>
          <div 
            v-if="participantsCount > 3" 
            class="w-6 h-6 rounded-full border border-black/40 bg-gray-800/70 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white"
          >
            +{{ participantsCount - 3 }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Chat Input (Moved to top) -->
    <div class="p-3 border-b border-green-900/30 bg-black/40 backdrop-blur-sm">
      <form @submit.prevent="handleSendMessage" class="flex flex-col gap-2">
        <!-- File Uploader Component -->
        <FileUploader 
          v-if="profile?.name"
          @upload-complete="handleUploadComplete"
          @upload-error="handleUploadError"
        />
        
        <!-- Error Message -->
        <div v-if="uploadError || serverUploadError" class="bg-red-900/20 rounded-lg p-2 border border-red-900/30 text-red-400 text-sm">
          <Icon name="lucide:alert-circle" class="h-4 w-4 inline-block mr-1" />
          {{ uploadError || serverUploadError }}
        </div>
        
        <!-- File Selection UI -->
        <div v-if="selectedFile" class="bg-gray-800/50 rounded-lg p-2 border border-green-900/30 flex items-center justify-between">
          <div class="flex items-center">
            <Icon 
              :name="selectedFile.type.startsWith('image/') ? 'lucide:image' : 'lucide:file'" 
              class="h-4 w-4 text-green-400 mr-2" 
            />
            <span class="text-sm text-gray-300 truncate max-w-[200px]">{{ selectedFile.name }}</span>
          </div>
          <button 
            type="button" 
            @click="clearSelectedFile" 
            class="text-gray-500 hover:text-gray-300"
          >
            <Icon name="lucide:x" class="h-4 w-4" />
          </button>
        </div>
        
        <div class="flex gap-2">
          <input
            v-model="chatMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-4 py-2 bg-gray-900/70 backdrop-blur-sm border border-green-900/30 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-300 placeholder-gray-600"
            :disabled="!profile?.name || isUploading || isServerUploading"
          />
          <!-- Hidden file input -->
          <input
            ref="fileInputRef"
            type="file"
            class="hidden"
            @change="handleFileSelect"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          
          <!-- AI Assistant Button -->
          <button
            type="button"
            @click="$refs.aiControlPanel?.togglePanel()"
            class="p-2 bg-gray-900/80 hover:bg-gray-800 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 backdrop-blur-sm transition-colors flex items-center justify-center relative"
            :class="{ 'bg-green-900/70 text-green-300': $refs.aiControlPanel?.localAIActive }"
            title="AI Assistant Settings"
          >
            <Icon :name="$refs.aiControlPanel?.localAIActive ? 'lucide:bot' : 'lucide:bot-offline'" class="h-5 w-5" />
            <span v-if="$refs.aiControlPanel?.localAIActive" class="absolute -top-1 -right-1 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </button>
          
          <button
            type="submit"
            class="px-4 py-2 bg-green-900/80 hover:bg-green-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:bg-gray-800/50 backdrop-blur-sm transition-colors flex items-center justify-center"
            :disabled="(!chatMessage.trim() && !selectedFile) || !profile?.name || isUploading || isServerUploading"
          >
            <span v-if="isServerUploading" class="flex items-center">
              <span class="h-3 w-3 mr-2 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></span>
            </span>
            <Icon name="lucide:send" class="h-5 w-5" />
          </button>
        </div>
      </form>
      <div v-if="!profile?.name" class="mt-2">
        <p class="text-xs text-orange-400">
          Please set up your profile to join the chat
        </p>
        <NuxtLink 
          to="/profile-setup" 
          class="text-xs text-green-400 hover:text-green-300 mt-1 inline-block"
        >
          Go to profile setup →
        </NuxtLink>
      </div>
    </div>
    
    <!-- Message Display Area (Newest first) -->
    <div 
      ref="chatContainer"
      class="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-thin scrollbar-thumb-green-900/50 scrollbar-track-gray-900/30 flex flex-col w-full h-full overscroll-contain will-change-scroll"
      @scroll="checkScroll"
    >
      <div class="space-y-3 min-h-full w-full">
        <div v-if="messagesLoading || isJoiningChat" class="flex justify-center py-4">
          <div class="animate-spin h-6 w-6 border-2 border-green-500 rounded-full border-t-transparent"></div>
        </div>
        
        <template v-else-if="localMessages.length === 0">
          <div class="text-center text-gray-500 py-4">
            <p>No messages yet. Initializing communication...</p>
            <p class="text-xs mt-1 text-green-500/50">Be the first to say hello!</p>
          </div>
        </template>
        
        <!-- End of Messages Indicator -->
        <div v-if="!hasMoreMessages && localMessages.length > 0 && !messagesLoading" class="text-center py-3">
          <div class="flex items-center justify-center">
            <div class="h-px w-16 bg-green-900/30"></div>
            <span class="text-xs text-gray-500 mx-3">End of message history</span>
            <div class="h-px w-16 bg-green-900/30"></div>
          </div>
        </div>
        
        <div 
          v-for="(message, index) in [...localMessages].reverse()" 
          :key="message._tempId || index"
          class="flex items-start gap-2 hover:bg-black/20 p-3 rounded-xl transition-colors backdrop-blur-sm"
        >
          <div 
            class="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20"
            :class="getTeamColor(message.team_id)"
          >
            {{ message.user_name ? message.user_name.charAt(0).toUpperCase() : '?' }}
          </div>
          
          <div class="flex flex-col bg-black/20 rounded-xl p-3 backdrop-blur-sm flex-1">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-green-400">{{ message.user_name }}</span>
              <span v-if="formatMessageTime(message.created_at)" class="text-xs text-gray-500 font-mono">
                {{ formatMessageTime(message.created_at) }}
              </span>
            </div>
            
            <!-- Message Text -->
            <p v-if="message.text" class="text-sm text-gray-300 mt-1">{{ message.text }}</p>
            
            <!-- File Attachment -->
            <div v-if="message.file_url" class="mt-2">
              <FileAttachment 
                :fileUrl="message.file_url"
                :fileType="message.file_type"
                :fileName="message.file_name"
                :fileSize="message.file_size"
              />
            </div>
          </div>
        </div>
        
        <!-- Load More Messages Button -->
        <div v-if="hasMoreMessages && !messagesLoading && !isJoiningChat" class="flex justify-center pt-4 pb-2">
          <button
            @click="handleLoadMore"
            class="px-4 py-2 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 border border-green-900/30 rounded-full text-sm backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            :disabled="loadingMore"
            :class="{'animate-pulse bg-green-900/30': isNearTop && hasMoreMessages}"
          >
            <span v-if="loadingMore" class="flex items-center">
              <span class="h-3 w-3 mr-2 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></span>
              Loading...
            </span>
            <span v-else>
              <Icon name="lucide:arrow-down" class="h-4 w-4 inline-block mr-1" />
              Load More Messages
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure proper scrolling behavior */
.flex-1 {
  flex: 1 1 auto;
  min-height: 0; /* This is crucial for proper flex scrolling */
}

/* Improve scrolling performance */
.will-change-scroll {
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch;
}
</style>
