export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', "@nuxt/fonts", '@nuxt/image', '@nuxt/icon', 'shadcn-nuxt', '@nuxtjs/seo', 'lenis/nuxt'],

  lenis: {
    options: {
      root: true,
      smooth: true,
      smoothWheel: true,
      autoRaf: true,
    },
  },

  css: [
    '~/assets/css/transitions.css',
  ],

  site: {
    url: 'https://leaderboard-hackathon.com',
    name: 'Leaderboard Hackathon',
    description: 'Track progress, vote for projects, and engage with participants in our AI Hackathon event.',
    defaultLocale: 'en',
  },

  // @ts-ignore - Lenis module configuration
  lenis: {
    root: true,
    options: {
      smooth: true,
      smoothWheel: true,
      autoRaf:true
    }

  },
  ogImage: {
    enabled: false,
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  supabase: {
    url: 'https://vxtftprybsmtupbgtdau.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dGZ0cHJ5YnNtdHVwYmd0ZGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTA4NDgsImV4cCI6MjA1NzY4Njg0OH0.G-mPgbmWijHEvM-f34oHr_dMD-y4XUaspx7fxM6g5MM',
    serviceKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dGZ0cHJ5YnNtdHVwYmd0ZGF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjExMDg0OCwiZXhwIjoyMDU3Njg2ODQ4fQ.t826O26GVewDcfuf5WniyBqlToZFXYMY7uOUjnkTLI8",
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/login', '/confirm'],
      cookieRedirect: true
    }
  }
})