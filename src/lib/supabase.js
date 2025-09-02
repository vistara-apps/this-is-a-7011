import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'your_supabase_url' && 
    supabaseAnonKey !== 'your_supabase_anon_key';
};

// Create Supabase client
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  
  // Return a user-friendly error message
  if (error.code === 'PGRST116') {
    return 'Resource not found';
  } else if (error.code === 'PGRST104') {
    return 'Invalid request';
  } else if (error.code === '23505') {
    return 'This record already exists';
  } else if (error.code === '23503') {
    return 'Referenced record does not exist';
  } else if (error.code === '42P01') {
    return 'Table does not exist';
  } else if (error.code === '42703') {
    return 'Column does not exist';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

