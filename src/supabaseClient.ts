// src/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mplspqecffhovquczean.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbHNwcWVjZmZob3ZxdWN6ZWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0Njg0NzYsImV4cCI6MjA3OTA0NDQ3Nn0.Gw5FqpEQnE0gHMyf0capqrgtN-ovrOKflK4YJSF2_f4'

// TypeScript infiere el tipo de 'supabase'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)