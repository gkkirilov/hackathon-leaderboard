<script setup>
const { teamColors, getTeamColor } = useTeams()
const { messages, messagesLoading, initGlobalChat, sendMessage } = useSupabaseRealtime()
const { profile, fetchProfile } = useUserProfile()
const user = useSupabaseUser()

const chatMessage = ref('')
const chatContainer = ref(null)

// Initialize chat on component mount and fetch profile if needed
onMounted(async () => {
  initGlobalChat()
  
  // Ensure profile is loaded
  if (user.value && !profile.value) {
    await fetchProfile()
  }
})

// Scroll to bottom when new messages arrive
watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}, { deep: true })

// Send message function
const handleSendMessage = () => {
  if (!chatMessage.value.trim() || !profile.value?.name || !profile.value?.team_id) return
  
  sendMessage(
    chatMessage.value.trim(),
    profile.value.name,
    profile.value.team_id
  )
  
  chatMessage.value = ''
}
</script>

<template>
  <div class="flex flex-col h-full border border-green-900/30 rounded-lg overflow-hidden bg-gray-900/50">
    <div 
      ref="chatContainer"
      class="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-gray-900"
    >
      <div v-if="messagesLoading" class="flex justify-center py-4">
        <div class="animate-spin h-6 w-6 border-2 border-green-500 rounded-full border-t-transparent"></div>
      </div>
      
      <template v-else-if="messages.length === 0">
        <div class="text-center text-gray-500 py-4">
          <p>No messages yet. Initializing communication...</p>
          <p class="text-xs mt-1 text-green-500/50">Be the first to say hello!</p>
        </div>
      </template>
      
      <div 
        v-for="(message, index) in messages" 
        :key="index"
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
            <span class="text-xs text-gray-500 font-mono">
              {{ new Date(message.created_at).toLocaleTimeString() }}
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
