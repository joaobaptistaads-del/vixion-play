import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vwwhvesrwzhofiolouhd.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3d2h2ZXNyd3pob2Zpb2xvdWhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwODMwNDUsImV4cCI6MjA4NTY1OTA0NX0.tdLlE0oTXWd5H-L3V--ij8R4jw5b8a9AjdOOCQybB48'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
