export const useSupabaseRealtime = () => {
  const supabase = useSupabaseClient()
  const messages = ref([])
  const messagesLoading = ref(true)
  const currentChannel = ref(null)
  const roomParticipants = ref([])
  const participantsCount = ref(0)

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

    // Subscribe to new messages and presence
    currentChannel.value = supabase
      .channel('global-chat')
      .on('broadcast', { event: 'chat-message' }, (data) => {
        // The payload structure is different than expected
        // Instead of receiving the message directly, we get {event, payload, type}
        // Extract the actual message data from the nested payload property
        const messageData = data.payload || {};
        
        // Ensure the message has required properties
        if (messageData && typeof messageData === 'object' && 
            messageData.text && messageData.user_name && messageData.team_id) {
          
          // Ensure the message has a valid timestamp
          if (!messageData.created_at) {
            messageData.created_at = new Date().toISOString();
          }
          
          // Add the message to the messages array
          messages.value.push(messageData);
        } else {
          console.error('Received invalid broadcast message format:', data);
        }
      })
      // Track presence of users in the room
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        roomParticipants.value = [...roomParticipants.value, ...newPresences]
        participantsCount.value = roomParticipants.value.length
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        const leftIds = leftPresences.map(p => p.id)
        roomParticipants.value = roomParticipants.value.filter(p => !leftIds.includes(p.id))
        participantsCount.value = roomParticipants.value.length
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Join the current user to the room with their user data
          const { profile } = useUserProfile()
          const user = useSupabaseUser()
          
          if (user.value && profile.value) {
            await currentChannel.value.track({
              id: user.value.id,
              name: profile.value.name,
              team_id: profile.value.team_id,
              online_at: new Date().toISOString()
            })
          }
        }
      })
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
      
      // Optimistically add message to local state immediately
      messages.value.push(newMessage)
      
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
    sendMessage,
    roomParticipants,
    participantsCount
  }
}
