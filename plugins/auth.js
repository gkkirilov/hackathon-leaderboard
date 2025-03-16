export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useSupabaseUser()
  const { profile, fetchProfile } = useUserProfile()
  
  // Add navigation guards
  nuxtApp.hook('page:start', async () => {
    const route = useRoute()
    
    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/confirm']
    
    // Skip auth check for public routes
    if (publicRoutes.includes(route.path)) {
      return
    }
    
    // If user is not logged in, redirect to login
    if (!user.value) {
      return navigateTo('/login')
    }
    
    // If the user is logged in but doesn't have a profile
    // and isn't already on the profile setup page, redirect to profile setup
    if (user.value && route.path !== '/profile-setup') {
      await fetchProfile()
      
      if (!profile.value) {
        return navigateTo('/profile-setup')
      }
    }
  })
}) 