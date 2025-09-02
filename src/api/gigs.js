import { supabase, handleSupabaseError, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from '../data/mockData';

// Get all gigs
export const getGigs = async () => {
  if (!isSupabaseConfigured()) {
    return mockData.gigs;
  }
  
  try {
    const { data, error } = await supabase
      .from('gigs')
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(user_id, status)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching gigs:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get gig by ID
export const getGigById = async (gigId) => {
  if (!isSupabaseConfigured()) {
    return mockData.gigs.find(gig => gig.gig_id === gigId);
  }
  
  try {
    const { data, error } = await supabase
      .from('gigs')
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(
          user_id, 
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('gig_id', gigId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching gig:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get nearby gigs
export const getNearbyGigs = async (latitude, longitude, radius = 10) => {
  if (!isSupabaseConfigured()) {
    return mockData.gigs;
  }
  
  try {
    const { data, error } = await supabase.rpc('get_nearby_gigs', {
      user_lat: latitude,
      user_lng: longitude,
      radius_km: radius
    });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching nearby gigs:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Create a new gig
export const createGig = async (gigData) => {
  if (!isSupabaseConfigured()) {
    const newGig = {
      gig_id: uuidv4(),
      ...gigData,
      status: 'open',
      created_at: new Date().toISOString(),
      applicants: []
    };
    
    return newGig;
  }
  
  try {
    const newGig = {
      gig_id: uuidv4(),
      ...gigData,
      status: 'open',
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('gigs')
      .insert(newGig)
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url)
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating gig:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Update a gig
export const updateGig = async (gigId, gigData) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.gigs.find(gig => gig.gig_id === gigId),
      ...gigData
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('gigs')
      .update(gigData)
      .eq('gig_id', gigId)
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(
          user_id, 
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating gig:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Apply to a gig
export const applyToGig = async (gigId, userId) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.gigs.find(gig => gig.gig_id === gigId),
      applicants: [
        ...(mockData.gigs.find(gig => gig.gig_id === gigId)?.applicants || []),
        { user_id: userId, status: 'pending' }
      ]
    };
  }
  
  try {
    // First, insert the application
    const { error: applicationError } = await supabase
      .from('gig_applicants')
      .insert({
        gig_id: gigId,
        user_id: userId,
        status: 'pending',
        created_at: new Date().toISOString()
      });
    
    if (applicationError) throw applicationError;
    
    // Then, get the updated gig
    const { data, error } = await supabase
      .from('gigs')
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(
          user_id, 
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('gig_id', gigId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error applying to gig:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Accept an applicant for a gig
export const acceptGigApplicant = async (gigId, applicantId) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.gigs.find(gig => gig.gig_id === gigId),
      status: 'in_progress',
      assigned_user_id: applicantId,
      applicants: mockData.gigs.find(gig => gig.gig_id === gigId)?.applicants.map(
        applicant => applicant.user_id === applicantId 
          ? { ...applicant, status: 'accepted' } 
          : { ...applicant, status: 'rejected' }
      )
    };
  }
  
  try {
    // Start a transaction
    const { error } = await supabase.rpc('accept_gig_applicant', {
      p_gig_id: gigId,
      p_applicant_id: applicantId
    });
    
    if (error) throw error;
    
    // Get the updated gig
    const { data, error: fetchError } = await supabase
      .from('gigs')
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(
          user_id, 
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('gig_id', gigId)
      .single();
    
    if (fetchError) throw fetchError;
    
    return data;
  } catch (error) {
    console.error('Error accepting gig applicant:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Complete a gig
export const completeGig = async (gigId) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.gigs.find(gig => gig.gig_id === gigId),
      status: 'completed',
      completed_at: new Date().toISOString()
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('gigs')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('gig_id', gigId)
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(
          user_id, 
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error completing gig:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Cancel a gig
export const cancelGig = async (gigId) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.gigs.find(gig => gig.gig_id === gigId),
      status: 'cancelled'
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('gigs')
      .update({
        status: 'cancelled'
      })
      .eq('gig_id', gigId)
      .select(`
        *,
        poster:users(user_id, username, profile_picture_url),
        applicants:gig_applicants(
          user_id, 
          status,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error cancelling gig:', error);
    throw new Error(handleSupabaseError(error));
  }
};

