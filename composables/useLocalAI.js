export const useLocalAI = () => {
  const { 
    sendMessage, 
    initGlobalChat, 
    currentChannel: chatChannel, 
    messages 
  } = useSupabaseRealtime()
  const { profile } = useUserProfile()
  const localAIActive = ref(false)
  const localAIError = ref(null)
  const lastMessageTime = ref(Date.now())
  const isProcessingQuestion = ref(false)
  const lmStudioEndpoint = ref('http://localhost:1234/v1')
  const chatInitialized = ref(false)
  
  // Generate a random AI name if none exists
  const aiName = ref('AI Assistant')
  const aiTeamId = ref('team-green') // Default team for the AI
  
  // Interval reference for cleanup
  let messageInterval = null
  
  // Sample messages that the AI can send randomly
  const randomMessages = [
    "Just reviewed some fascinating hackathon projects. The creativity is impressive!",
    "Remember to hydrate and take breaks during the hackathon!",
    "Pro tip: document your code as you go - future you will thank you.",
    "Any interesting challenges you're working on right now?",
    "Don't forget to commit your changes frequently!",
    "What technologies are you all using for your projects?",
    "Looking forward to seeing the final submissions!",
    "Team collaboration is key to hackathon success.",
    "Who's planning to pull an all-nighter for the hackathon?",
    "Remember: working code > perfect code for a hackathon.",
    "Anyone need help with debugging? I might have some insights.",
    "How's everyone's progress coming along?",
    "Have you tried turning it off and on again? Works 60% of the time, every time.",
    "Reminder: the best solution is often the simplest one.",
    "I'm fascinated by the different approaches everyone is taking!"
  ]
  
  // Check if text contains a question
  const containsQuestion = (text) => {
    return text.includes('?') || 
           text.toLowerCase().includes('how') ||
           text.toLowerCase().includes('what') ||
           text.toLowerCase().includes('where') ||
           text.toLowerCase().includes('when') ||
           text.toLowerCase().includes('why') ||
           text.toLowerCase().includes('who') ||
           text.toLowerCase().includes('can you')
  }
  
  // Initialize chat system before sending messages
  const ensureChatInitialized = async () => {
    if (!chatInitialized.value) {
      try {
        await initGlobalChat()
        chatInitialized.value = true
        return true
      } catch (error) {
        console.error('Error initializing chat:', error)
        localAIError.value = 'Failed to initialize chat: ' + error.message
        return false
      }
    }
    return true
  }
  
  // Send a message directly with error handling
  const sendAIMessage = async (text) => {
    if (!chatChannel.value) {
      localAIError.value = 'Chat connection not available'
      return false
    }
    
    try {
      // Create message object with tempId for local tracking
      const localMessage = {
        text: text,
        user_name: aiName.value,
        team_id: aiTeamId.value,
        created_at: new Date().toISOString(),
        _tempId: Date.now() + Math.random().toString(36).substring(2, 9) // Only for local use
      }
      
      // Create database message object (without tempId)
      const dbMessage = {
        text: text,
        user_name: aiName.value,
        team_id: aiTeamId.value,
        created_at: new Date().toISOString()
      }
      
      console.log('[AI] Sending message:', text)
      
      // Add to local messages array and ensure it's reactive
      messages.value = [...messages.value, localMessage]
      console.log('[AI] Added to local messages, current count:', messages.value.length)
      
      // Save to database - without the _tempId field
      const supabase = useSupabaseClient()
      const { data, error } = await supabase.from('messages').insert(dbMessage).select()
      
      if (error) throw error
      console.log('[AI] Saved to database:', data)
      
      // Broadcast to channel
      await chatChannel.value.send({
        type: 'broadcast',
        event: 'chat-message',
        payload: dbMessage // Send without _tempId
      })
      console.log('[AI] Broadcast message sent')
      
      return true
    } catch (error) {
      console.error('[AI] Failed to send message:', error)
      localAIError.value = 'Failed to send message: ' + error.message
      return false
    }
  }
  
  // Send a random message to the chat
  const sendRandomMessage = async () => {
    if (!localAIActive.value || !profile.value) return
    
    // Ensure chat is initialized
    if (!await ensureChatInitialized()) return
    
    const randomIndex = Math.floor(Math.random() * randomMessages.length)
    const randomMessage = randomMessages[randomIndex]
    
    if (await sendAIMessage(randomMessage)) {
      lastMessageTime.value = Date.now()
    }
  }
  
  // Call the LM Studio API to answer a question
  const generateAnswer = async (question, recentMessages) => {
    if (isProcessingQuestion.value) return null
    
    try {
      isProcessingQuestion.value = true
      
      // Format recent messages as context
      const context = recentMessages
        .map(m => `${m.user_name}: ${m.text}`)
        .join('\n')
      
      // Create the prompt with context
      const prompt = `
You are an AI assistant in a hackathon chat. You should be helpful, friendly, and knowledgeable.

Recent chat messages:
${context}

Based on the above conversation, please answer the following question concisely:
${question}

Your answer should be helpful and to the point. If you don't know the answer, just say you're not sure but offer to help with something else.
`
      
      const response = await fetch(`${lmStudioEndpoint.value}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'local-model',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      })
      
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`LM Studio API error: ${response.status} - ${errorData}`)
      }
      
      const data = await response.json()
      return data.choices[0].message.content.trim()
      
    } catch (error) {
      console.error('Error calling LM Studio API:', error)
      localAIError.value = error.message
      return "I'm having trouble connecting to my knowledge base right now. Please try again later."
    } finally {
      isProcessingQuestion.value = false
    }
  }
  
  // Check recent messages for questions and answer them
  const checkForQuestions = async (messages) => {
    if (!localAIActive.value || isProcessingQuestion.value || !profile.value) return
    
    // Ensure chat is initialized before responding
    if (!chatInitialized.value && !await ensureChatInitialized()) return
    
    // Get the 5 most recent messages
    const recentMessages = [...messages].slice(-5)
    
    // Check if any are questions not from the AI
    const questions = recentMessages.filter(msg => 
      msg.user_name !== aiName.value && 
      containsQuestion(msg.text)
    )
    
    if (questions.length > 0) {
      // Take the most recent question
      const latestQuestion = questions[questions.length - 1]
      
      // Generate answer
      const answer = await generateAnswer(latestQuestion.text, recentMessages)
      
      if (answer) {
        // Send the answer
        await sendAIMessage(answer)
        lastMessageTime.value = Date.now()
      }
    }
  }
  
  // Start the AI service
  const startLocalAI = async (aiNameValue, teamId) => {
    if (localAIActive.value) return
    
    if (aiNameValue) aiName.value = aiNameValue
    if (teamId) aiTeamId.value = teamId
    
    // Initialize chat if not already done
    if (!await ensureChatInitialized()) {
      return false
    }
    
    localAIActive.value = true
    localAIError.value = null
    
    // Set up interval to send messages every 20 seconds
    messageInterval = setInterval(() => {
      // If it's been more than 20 seconds since last message
      if (Date.now() - lastMessageTime.value >= 20000) {
        sendRandomMessage()
      }
    }, 20000)
    
    return true
  }
  
  // Stop the AI service
  const stopLocalAI = () => {
    if (!localAIActive.value) return
    
    localAIActive.value = false
    
    if (messageInterval) {
      clearInterval(messageInterval)
      messageInterval = null
    }
    
    return true
  }
  
  // Update LM Studio API endpoint
  const updateEndpoint = (newEndpoint) => {
    lmStudioEndpoint.value = newEndpoint
  }
  
  // Clean up on component unmount
  onUnmounted(() => {
    stopLocalAI()
  })
  
  return {
    startLocalAI,
    stopLocalAI,
    updateEndpoint,
    checkForQuestions,
    localAIActive,
    localAIError,
    isProcessingQuestion,
    aiName,
    aiTeamId,
    chatInitialized
  }
} 