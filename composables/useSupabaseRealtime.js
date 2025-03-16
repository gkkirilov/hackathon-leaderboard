export const useSupabaseRealtime = () => {
  const supabase = useSupabaseClient()
  const messages = ref([])
  const messagesLoading = ref(true)
  const currentChannel = ref(null)
  const roomParticipants = ref([])
  const participantsCount = ref(0)
  const hasMoreMessages = ref(true)
  const currentPage = ref(1)
  const messagesPerPage = 20 // Number of messages to load per batch
  
  // Initialize the global chat channel
  const initGlobalChat = async () => {
    if (currentChannel.value) {
      currentChannel.value.unsubscribe()
    }

    messagesLoading.value = true
    currentPage.value = 1
    
    // Load existing messages
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(messagesPerPage)
      
      if (error) throw error
      messages.value = data.reverse()
      
      // Check if there might be more messages
      hasMoreMessages.value = data.length === messagesPerPage
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
        console.log('New presences:', newPresences);
        roomParticipants.value = [...roomParticipants.value, ...newPresences];
        participantsCount.value = roomParticipants.value.length;
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('Left presences:', leftPresences);
        const leftIds = leftPresences.map(p => p.id);
        roomParticipants.value = roomParticipants.value.filter(p => !leftIds.includes(p.id));
        participantsCount.value = roomParticipants.value.length;
      })
      .on('presence', { event: 'sync' }, () => {
        // Get the full list of participants when syncing
        const presences = currentChannel.value.presenceState();
        console.log('Presence sync:', presences);
        
        // Flatten the presences object into an array
        const participantsList = Object.values(presences).flat();
        roomParticipants.value = participantsList;
        participantsCount.value = participantsList.length;
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to channel');
          // Join the current user to the room with their user data
          try {
            const { profile } = useUserProfile();
            const user = useSupabaseUser();
            
            if (user.value && profile.value) {
              console.log('Tracking presence for user:', user.value.id);
              await currentChannel.value.track({
                id: user.value.id,
                name: profile.value.name,
                team_id: profile.value.team_id,
                online_at: new Date().toISOString()
              });
            } else {
              console.warn('Missing user or profile data for presence tracking');
            }
          } catch (error) {
            console.error('Error tracking presence:', error);
          }
        } else {
          console.log('Channel subscription status:', status);
        }
      })
  }
  
  // Load more (older) messages for pagination
  const loadMoreMessages = async () => {
    if (!hasMoreMessages.value || messagesLoading.value) return
    
    messagesLoading.value = true
    
    try {
      // Get the oldest message's timestamp to use as a cursor
      const oldestMessage = [...messages.value].sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
      )[0];
      
      const oldestTimestamp = oldestMessage?.created_at;
      
      if (!oldestTimestamp) {
        hasMoreMessages.value = false;
        return;
      }
      
      // Fetch older messages before the oldest one we have
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .lt('created_at', oldestTimestamp)
        .order('created_at', { ascending: false })
        .limit(messagesPerPage)
      
      if (error) throw error
      
      if (data.length === 0) {
        hasMoreMessages.value = false
        return
      }
      
      // Add older messages to the beginning of our array
      messages.value = [...data.reverse(), ...messages.value]
      currentPage.value++
      
      // Check if we might have more messages
      hasMoreMessages.value = data.length === messagesPerPage
    } catch (error) {
      console.error('Error loading more messages:', error)
    } finally {
      messagesLoading.value = false
    }
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
    participantsCount,
    hasMoreMessages,
    currentPage,
    loadMoreMessages
  }
}
