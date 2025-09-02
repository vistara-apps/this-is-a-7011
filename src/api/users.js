import { supabase, handleSupabaseError, isSupabaseConfigured } from '../lib/supabase';
import { mockData } from '../data/mockData';

// Get user by ID
export const getUserById = async (userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.users.find(user => user.user_id === userId);
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get user by Farcaster ID
export const getUserByFarcasterId = async (farcasterId) => {
  if (!isSupabaseConfigured()) {
    return mockData.users.find(user => user.farcaster_id === farcasterId);
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('farcaster_id', farcasterId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user by Farcaster ID:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.users.find(user => user.user_id === userId),
      ...profileData
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get user's gigs (posted by the user)
export const getUserGigs = async (userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.gigs.filter(gig => gig.poster_id === userId);
  }
  
  try {
    const { data, error } = await supabase
      .from('gigs')
      .select(`
        *,
        applicants:gig_applicants(
          user_id,
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('poster_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user gigs:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get user's applied gigs
export const getUserAppliedGigs = async (userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.gigs.filter(gig => 
      gig.applicants && gig.applicants.some(applicant => applicant.user_id === userId)
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('gig_applicants')
      .select(`
        status,
        gig:gigs(
          *,
          poster:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Transform the data to match the expected format
    return data.map(item => ({
      ...item.gig,
      application_status: item.status
    }));
  } catch (error) {
    console.error('Error fetching user applied gigs:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get user's projects (created by the user)
export const getUserProjects = async (userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.projects.filter(project => project.creator_id === userId);
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('creator_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get user's joined projects
export const getUserJoinedProjects = async (userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.projects.filter(project => 
      project.members && project.members.some(member => 
        member.user_id === userId && member.role === 'member'
      )
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('project_members')
      .select(`
        role,
        project:projects(
          *,
          creator:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('user_id', userId)
      .eq('role', 'member')
      .order('joined_at', { ascending: false });
    
    if (error) throw error;
    
    // Transform the data to match the expected format
    return data.map(item => ({
      ...item.project,
      member_role: item.role
    }));
  } catch (error) {
    console.error('Error fetching user joined projects:', error);
    throw new Error(handleSupabaseError(error));
  }
};

