import { createClient } from '@supabase/supabase-js'

// Supabase configuration with environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vwwhvesrwzhofiolouhd.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3d2h2ZXNyd3pob2Zpb2xvdWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwODMwNDUsImV4cCI6MjA4NTY1OTA0NX0.tdLlE0oTXWd5H-L3V--ij8R4jw5b8a9AjdOOCQybB48'

// Validate configuration
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase configuration missing. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.')
}

// Create Supabase client with options
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // We're using NextAuth for session management
    autoRefreshToken: false,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'vixion-play',
    },
  },
})

// Export configuration for debugging (development only)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Supabase configured:', {
    url: SUPABASE_URL,
    hasKey: !!SUPABASE_ANON_KEY,
  })
}
