export const useUserProfile = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const profile = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  // Get current user profile
  const fetchProfile = async () => {
    if (!user.value) return null
    
    isLoading.value = true
    error.value = null
    
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
      
      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // Profile doesn't exist yet
          profile.value = null
        } else {
          throw profileError
        }
      } else {
        profile.value = data
      }
      
      return profile.value
    } catch (err) {
      console.error('Error fetching profile:', err)
      error.value = err.message
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  // Create or update user profile
  const updateProfile = async (name, teamId) => {
    if (!user.value) return null
    
    isLoading.value = true
    error.value = null
    
    try {
      const updates = {
        id: user.value.id,
        name,
        team_id: teamId,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString() // Add created_at for new profiles
      }
      
      const { data, error: updateError } = await supabase
        .from('profiles')
        .upsert(updates)
        .select()
      
      if (updateError) throw updateError
      
      if (data && data.length > 0) {
        profile.value = data[0]
      } else {
        // If no data returned, fetch the profile again
        await fetchProfile()
      }
      
      return profile.value
    } catch (err) {
      console.error('Error updating profile:', err)
      error.value = err.message
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  // Check if a user is an admin
  const isAdmin = computed(() => {
    return profile.value?.is_admin === true
  })
  
  // Fetch profile when user changes
  watch(user, async (newUser) => {
    if (newUser) {
      await fetchProfile()
    } else {
      profile.value = null
    }
  }, { immediate: true })
  
  return {
    profile,
    isAdmin,
    isLoading,
    error,
    fetchProfile,
    updateProfile
  }
}
