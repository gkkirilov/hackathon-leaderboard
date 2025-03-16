<script setup>
const { teamColors, getTeamColor } = useTeams()
const { messages, messagesLoading, initGlobalChat, sendMessage, roomParticipants, participantsCount } = useSupabaseRealtime()
const { profile, fetchProfile } = useUserProfile()
const user = useSupabaseUser()

const chatMessage = ref('')
const chatContainer = ref(null)
const isJoiningChat = ref(true)
const localMessages = ref([]) // Track messages locally

// Initialize chat on component mount and fetch profile if needed
onMounted(async () => {
  // Ensure profile is loaded
  if (user.value && !profile.value) {
    await fetchProfile()
  }
  
  // Initialize chat with presence
  initGlobalChat()
  
  // Show joining animation
  setTimeout(() => {
    isJoiningChat.value = false
  }, 1500)
})

// Copy external messages to local state
watch(messages, (newMessages) => {
  localMessages.value = [...newMessages]
  
  nextTick(() => {
    if (chatContainer.value) {
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
  
  // Scroll to bottom immediately after adding the message
  nextTick(() => {
    if (chatContainer.value) {
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
</script>

<template>
  <div class="flex flex-col h-full border border-green-900/30 rounded-lg overflow-hidden bg-gray-900/50">
    <!-- Chat Header -->
    <div class="bg-black border-b border-green-900/30 p-3 flex items-center justify-between">
      <div class="flex items-center">
        <Icon name="lucide:message-square" class="text-green-400 h-5 w-5 mr-2" />
        <h3 class="font-bold text-sm text-green-400">GLOBAL CHAT</h3>
      </div>
      <div class="flex items-center">
        <span class="text-xs text-gray-500 font-mono mr-2">
          {{ participantsCount }} ONLINE
        </span>
        <div class="flex -space-x-1">
          <div 
            v-for="(participant, index) in roomParticipants.slice(0, 3)" 
            :key="participant.id"
            class="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs font-bold"
            :class="getTeamColor(participant.team_id)"
            :title="participant.name"
          >
            {{ participant.name ? participant.name.charAt(0).toUpperCase() : '?' }}
          </div>
          <div 
            v-if="participantsCount > 3" 
            class="w-6 h-6 rounded-full border border-black bg-gray-800 flex items-center justify-center text-xs font-bold text-white"
          >
            +{{ participantsCount - 3 }}
          </div>
        </div>
      </div>
    </div>
    
    <div 
      ref="chatContainer"
      class="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-gray-900"
    >
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
        v-for="(message, index) in localMessages" 
        :key="message._tempId || index"
        class="flex items-start gap-2 hover:bg-black/20 p-2 rounded transition-colors"
      >
        <div 
          class="w-8 h-8 rounded-sm flex items-center justify-center text-white shadow-inner shadow-black/50"
          :class="getTeamColor(message.team_id)"
        >
          {{ message.user_name ? message.user_name.charAt(0).toUpperCase() : '?' }}
        </div>
        
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-green-400">{{ message.user_name }}</span>
            <span v-if="formatMessageTime(message.created_at)" class="text-xs text-gray-500 font-mono">
              {{ formatMessageTime(message.created_at) }}
            </span>
          </div>
          <p class="text-sm text-gray-300">{{ message.text }}</p>
        </div>
      </div>
    </div>
    
    <div class="p-3 border-t border-green-900/30 bg-black/50">
      <form @submit.prevent="handleSendMessage" class="flex gap-2">
        <input
          v-model="chatMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 px-3 py-2 bg-gray-900 border border-green-900/30 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-300 placeholder-gray-600"
          :disabled="!profile?.name"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-green-900 hover:bg-green-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:bg-gray-800 transition-colors"
          :disabled="!chatMessage.trim() || !profile?.name"
        >
          <Icon name="lucide:send" />
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
  </div>
</template>
