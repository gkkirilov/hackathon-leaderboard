<script setup>
import AIControlPanel from '~/components/chat/AIControlPanel.vue'

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
  }
  
  // Clean up interval and event listener
  onUnmounted(() => {
    clearInterval(logInterval)
    if (chatContainer.value) {
      chatContainer.value.removeEventListener('scroll', checkScroll);
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
  
  // Fix: we need to scroll to the bottom since messages are displayed in reversed order
  nextTick(() => {
    if (chatContainer.value) {
      console.log('[ChatBox] Scrolling message container to bottom')
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
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
  
  // Store the current scroll height before loading more messages
  const scrollHeightBefore = chatContainer.value?.scrollHeight || 0;
  console.log('[ChatBox] Scroll height before loading more:', scrollHeightBefore);
  
  await loadMoreMessages();
  
  // After loading more messages, calculate how much the scroll height has changed
  // and adjust the scroll position to maintain the relative view
  nextTick(() => {
    if (chatContainer.value) {
      const newScrollHeight = chatContainer.value.scrollHeight;
      const scrollHeightDiff = newScrollHeight - scrollHeightBefore;
      console.log('[ChatBox] New scroll height:', newScrollHeight, 'Difference:', scrollHeightDiff);
      
      // Adjust scroll position to maintain the same relative view
      chatContainer.value.scrollTop = chatContainer.value.scrollTop + scrollHeightDiff;
      console.log('[ChatBox] Adjusted scroll position after loading more messages');
    }
    loadingMore.value = false;
  });
}

// Send message function
const handleSendMessage = () => {
  if (!chatMessage.value.trim() || !profile.value?.name || !profile.value?.team_id) return
  
  // Create the message object
  const newMessage = {
    text: chatMessage.value.trim(),
    user_name: profile.value.name,
    team_id: profile.value.team_id,
    created_at: new Date().toISOString(),
    // Add a temporary ID to identify this message locally
    _tempId: Date.now() + Math.random().toString(36).substring(2, 9)
  }
  
  // Add to local messages first for immediate display
  localMessages.value.push(newMessage)
  
  // Fix: Scroll to the bottom to see the new message since display is reversed
  nextTick(() => {
    if (chatContainer.value) {
      console.log('[ChatBox] Scrolling to bottom after sending message')
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
  
  // Clear input
  chatMessage.value = ''
  
  // Send through Supabase
  sendMessage(
    newMessage.text,
    newMessage.user_name,
    newMessage.team_id
  )
}

// Check if user is near the top of the message container (for auto-loading more messages)
const checkScroll = () => {
  if (!chatContainer.value) return;
  
  // Consider "near top" to be within 200px of the scroll end
  const nearTopThreshold = 200;
  const isNearScrollEnd = chatContainer.value.scrollTop >= (chatContainer.value.scrollHeight - chatContainer.value.clientHeight - nearTopThreshold);
  
  isNearTop.value = isNearScrollEnd;
  
  // Log scroll position every 10th check (to avoid console spam)
  if (Math.random() < 0.1) {
    console.log(
      '[ChatBox] Scroll position:',
      chatContainer.value.scrollTop,
      'of',
      chatContainer.value.scrollHeight - chatContainer.value.clientHeight,
      'isNearTop:',
      isNearTop.value
    );
  }
}
</script>

<template>
  <div class="flex flex-col h-full rounded-xl overflow-hidden bg-gray-900/60 backdrop-blur-lg border border-green-900/20 shadow-xl shadow-green-900/10 relative">
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
      <form @submit.prevent="handleSendMessage" class="flex gap-2">
        <input
          v-model="chatMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 px-4 py-2 bg-gray-900/70 backdrop-blur-sm border border-green-900/30 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-300 placeholder-gray-600"
          :disabled="!profile?.name"
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
          :disabled="!chatMessage.trim() || !profile?.name"
        >
          <Icon name="lucide:send" class="h-5 w-5" />
        </button>
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
      class="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-green-900/50 scrollbar-track-gray-900/30 flex flex-col-reverse"
      @scroll="checkScroll"
    >
      <div class="space-y-3 min-h-full">
        <div v-if="messagesLoading || isJoiningChat" class="flex justify-center py-4">
          <div class="animate-spin h-6 w-6 border-2 border-green-500 rounded-full border-t-transparent"></div>
        </div>
        
        <template v-else-if="localMessages.length === 0">
          <div class="text-center text-gray-500 py-4">
            <p>No messages yet. Initializing communication...</p>
            <p class="text-xs mt-1 text-green-500/50">Be the first to say hello!</p>
          </div>
        </template>
        
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
            <p class="text-sm text-gray-300 mt-1">{{ message.text }}</p>
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
        
        <!-- End of Messages Indicator -->
        <div v-if="!hasMoreMessages && localMessages.length > 0 && !messagesLoading" class="text-center py-3">
          <div class="flex items-center justify-center">
            <div class="h-px w-16 bg-green-900/30"></div>
            <span class="text-xs text-gray-500 mx-3">End of message history</span>
            <div class="h-px w-16 bg-green-900/30"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
