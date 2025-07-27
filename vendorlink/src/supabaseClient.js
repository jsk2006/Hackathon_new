// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jcwteutrmvcpefawntwg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjd3RldXRybXZjcGVmYXdudHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjU5NDgsImV4cCI6MjA2OTA0MTk0OH0.O_Eb7qSS_24UwVFo4G7qYtXeMK8FcQgDJQwDcHQfm-A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)