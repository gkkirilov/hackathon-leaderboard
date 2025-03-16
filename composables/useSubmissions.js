export const useSubmissions = () => {
  const supabase = useSupabaseClient()
  const submissions = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const votingEnabled = ref(false)
  const userHasVoted = ref({})

  // Categories
  const categories = [
    { id: 'design', name: 'Best Design' },
    { id: 'entertaining', name: 'Most Entertaining' },
    { id: 'creative', name: 'Most Creative' }
  ]

  // Get all submissions
  const fetchSubmissions = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('submissions')
        .select('*, votes(*)')
        .order('created_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      submissions.value = data
    } catch (err) {
      console.error('Error fetching submissions:', err)
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  // Submit a new idea
  const submitIdea = async (teamId, title, description, techStack) => {
    isLoading.value = true
    error.value = null
    
    try {
      const submission = {
        team_id: teamId,
        title,
        description,
        tech_stack: techStack,
        created_at: new Date().toISOString()
      }
      
      const { data, error: submitError } = await supabase
        .from('submissions')
        .insert(submission)
        .select()
      
      if (submitError) throw submitError
      
      await fetchSubmissions()
      return data
    } catch (err) {
      console.error('Error submitting idea:', err)
      error.value = err.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Vote for a submission in a specific category
  const voteForSubmission = async (submissionId, category, userId) => {
    if (!votingEnabled.value) {
      error.value = 'Voting is not enabled yet'
      return false
    }
    
    if (userHasVoted.value[`${userId}-${category}`]) {
      error.value = 'You have already voted in this category'
      return false
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const vote = {
        submission_id: submissionId,
        user_id: userId,
        category,
        created_at: new Date().toISOString()
      }
      
      const { error: voteError } = await supabase
        .from('votes')
        .insert(vote)
      
      if (voteError) throw voteError
      
      // Mark that user has voted in this category
      userHasVoted.value = {
        ...userHasVoted.value,
        [`${userId}-${category}`]: true
      }
      
      await fetchSubmissions()
      return true
    } catch (err) {
      console.error('Error voting for submission:', err)
      error.value = err.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Check if a user has already voted in specific categories
  const checkUserVotes = async (userId) => {
    if (!userId) return
    
    try {
      const { data, error: votesError } = await supabase
        .from('votes')
        .select('category')
        .eq('user_id', userId)
      
      if (votesError) throw votesError
      
      const votedCategories = {}
      data.forEach(vote => {
        votedCategories[`${userId}-${vote.category}`] = true
      })
      
      userHasVoted.value = votedCategories
    } catch (err) {
      console.error('Error checking user votes:', err)
    }
  }

  // Admin function to enable/disable voting
  const setVotingEnabled = async (enabled) => {
    try {
      const { error: settingError } = await supabase
        .from('settings')
        .upsert({ key: 'voting_enabled', value: enabled })
      
      if (settingError) throw settingError
      
      votingEnabled.value = enabled
      return true
    } catch (err) {
      console.error('Error updating voting settings:', err)
      return false
    }
  }

  // Check if voting is enabled
  const checkVotingStatus = async () => {
    try {
      const { data, error: settingError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'voting_enabled')
        .single()
      
      if (settingError) throw settingError
      
      votingEnabled.value = data?.value === true
    } catch (err) {
      console.error('Error checking voting status:', err)
      votingEnabled.value = false
    }
  }

  return {
    submissions,
    categories,
    isLoading,
    error,
    votingEnabled,
    fetchSubmissions,
    submitIdea,
    voteForSubmission,
    checkUserVotes,
    setVotingEnabled,
    checkVotingStatus
  }
}
