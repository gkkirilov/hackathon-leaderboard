import { ref, watch, onUnmounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useUserProfile } from './useUserProfile'
import { useSupabaseUser } from '#imports'

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
    
    // Reset participants when initializing 
    roomParticipants.value = []
    participantsCount.value = 0

    // Create channel first without subscribing
    currentChannel.value = supabase.channel('global-chat')
    
    // Set up message broadcasting
    currentChannel.value.on('broadcast', { event: 'chat-message' }, (data) => {
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
    
    // Set up presence tracking
    currentChannel.value
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('New presences joined:', newPresences);
        
        // Update participants when someone joins
        const updated = [...roomParticipants.value];
        newPresences.forEach(presence => {
          // Check if this presence already exists
          const existingIndex = updated.findIndex(p => p.id === presence.id);
          if (existingIndex >= 0) {
            // Update existing presence
            updated[existingIndex] = presence;
          } else {
            // Add new presence
            updated.push(presence);
          }
        });
        
        roomParticipants.value = updated;
        participantsCount.value = updated.length;
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('Presences left:', leftPresences);
        
        // Remove participants when they leave
        if (leftPresences.length > 0) {
          const leftIds = leftPresences.map(p => p.id);
          roomParticipants.value = roomParticipants.value.filter(p => !leftIds.includes(p.id));
          participantsCount.value = roomParticipants.value.length;
        }
      })
      .on('presence', { event: 'sync' }, () => {
        // Get the full, current presence state
        const presenceState = currentChannel.value.presenceState();
        console.log('Presence sync state:', presenceState);
        
        // Convert the state object to a flat array of participants
        const allPresences = [];
        Object.keys(presenceState).forEach(key => {
          const usersPresences = presenceState[key];
          if (Array.isArray(usersPresences)) {
            allPresences.push(...usersPresences);
          }
        });
        
        console.log('All presences after sync:', allPresences);
        roomParticipants.value = allPresences;
        participantsCount.value = allPresences.length;
      });
    
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

    // Now subscribe to the channel and track presence
    try {
      // First subscribe to the channel
      const status = await currentChannel.value.subscribe();
      console.log('Channel subscription status:', status);
      
      if (status === 'SUBSCRIBED') {
        // Get user and profile data
        const user = useSupabaseUser();
        const { profile } = useUserProfile();
        
        // Only track presence if we have both user and profile
        if (user.value && profile.value && profile.value.name && profile.value.team_id) {
          console.log('Tracking user presence for', user.value.id, profile.value.name);
          
          // Track user presence
          try {
            // Add a slight delay to ensure channel is ready
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const trackResult = await currentChannel.value.track({
              id: user.value.id,
              name: profile.value.name,
              team_id: profile.value.team_id,
              online_at: new Date().toISOString()
            });
            
            console.log('Track presence result:', trackResult);
            
            // Force a refresh of participants
            setTimeout(() => {
              const state = currentChannel.value.presenceState();
              console.log('Current presence state after tracking:', state);
            }, 1000);
            
            return true;
          } catch (trackError) {
            console.error('Error tracking presence:', trackError);
            return false;
          }
        } else {
          console.warn('Cannot track presence: Missing user or profile data', { 
            hasUser: !!user.value, 
            hasProfile: !!profile.value 
          });
          return false;
        }
      } else {
        console.error('Failed to subscribe to channel:', status);
        return false;
      }
    } catch (error) {
      console.error('Error while setting up channel:', error);
      return false;
    }
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
    loadMoreMessages,
    currentChannel
  }
}
