import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://frpioghidjocrwsfimbl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycGlvZ2hpZGpvY3J3c2ZpbWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjU5OTAsImV4cCI6MjA5MTMwMTk5MH0.FfrbUznr6e2QisVUZ4O_JEogbL1VpN6LRSaTRVEI7Is"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
