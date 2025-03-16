export const useSupabaseRealtime = () => {
  const supabase = useSupabaseClient()
  const messages = ref([])
  const messagesLoading = ref(true)
  const currentChannel = ref(null)

  // Initialize the global chat channel
  const initGlobalChat = async () => {
    if (currentChannel.value) {
      currentChannel.value.unsubscribe()
    }

    messagesLoading.value = true
    
    // Load existing messages
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      
      if (error) throw error
      messages.value = data.reverse()
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      messagesLoading.value = false
    }

    // Subscribe to new messages
    currentChannel.value = supabase
      .channel('global-chat')
      .on('broadcast', { event: 'chat-message' }, (payload) => {
        messages.value.push(payload)
      })
      .subscribe()
  }

  // Send a message to the global chat
  const sendMessage = async (message, userName, teamId) => {
    if (!message || !userName || !teamId) return
    
    try {
      const newMessage = {
        text: message,
        user_name: userName,
        team_id: teamId,
        created_at: new Date().toISOString()
      }
      
      // Save to database
      const { error } = await supabase
        .from('messages')
        .insert(newMessage)
      
      if (error) throw error
      
      // Broadcast to realtime channel
      currentChannel.value.send({
        type: 'broadcast',
        event: 'chat-message',
        payload: newMessage
      })
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // Clean up when component unmounts
  onUnmounted(() => {
    if (currentChannel.value) {
      currentChannel.value.unsubscribe()
    }
  })

  return {
    messages,
    messagesLoading,
    initGlobalChat,
    sendMessage
  }
}
