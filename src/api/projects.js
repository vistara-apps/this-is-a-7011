import { supabase, handleSupabaseError, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from '../data/mockData';

// Get all projects
export const getProjects = async () => {
  if (!isSupabaseConfigured()) {
    return mockData.projects;
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get project by ID
export const getProjectById = async (projectId) => {
  if (!isSupabaseConfigured()) {
    return mockData.projects.find(project => project.project_id === projectId);
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('project_id', projectId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Create a new project
export const createProject = async (projectData) => {
  if (!isSupabaseConfigured()) {
    const newProject = {
      project_id: uuidv4(),
      ...projectData,
      status: 'seeking_members',
      created_at: new Date().toISOString(),
      members: []
    };
    
    return newProject;
  }
  
  try {
    // Start a transaction
    const { data, error } = await supabase.rpc('create_project_with_creator', {
      p_project_id: uuidv4(),
      p_creator_id: projectData.creator_id,
      p_title: projectData.title,
      p_description: projectData.description,
      p_required_skills: projectData.required_skills || []
    });
    
    if (error) throw error;
    
    // Get the created project with relationships
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('project_id', data.project_id)
      .single();
    
    if (fetchError) throw fetchError;
    
    return project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Update a project
export const updateProject = async (projectId, projectData) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.projects.find(project => project.project_id === projectId),
      ...projectData
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('project_id', projectId)
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Join a project
export const joinProject = async (projectId, userId) => {
  if (!isSupabaseConfigured()) {
    const project = mockData.projects.find(project => project.project_id === projectId);
    
    // Check if user is already a member
    if (project.members.some(member => member.user_id === userId)) {
      return project;
    }
    
    return {
      ...project,
      members: [
        ...project.members,
        { user_id: userId, role: 'member' }
      ]
    };
  }
  
  try {
    // First, check if user is already a member
    const { data: existingMember, error: checkError } = await supabase
      .from('project_members')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // If user is already a member, return the project
    if (existingMember) {
      const { data: project, error: fetchError } = await supabase
        .from('projects')
        .select(`
          *,
          creator:users(user_id, username, profile_picture_url),
          members:project_members(
            user_id,
            role,
            user:users(user_id, username, profile_picture_url)
          )
        `)
        .eq('project_id', projectId)
        .single();
      
      if (fetchError) throw fetchError;
      
      return project;
    }
    
    // Insert the new member
    const { error: insertError } = await supabase
      .from('project_members')
      .insert({
        project_id: projectId,
        user_id: userId,
        role: 'member',
        joined_at: new Date().toISOString()
      });
    
    if (insertError) throw insertError;
    
    // Get the updated project
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('project_id', projectId)
      .single();
    
    if (fetchError) throw fetchError;
    
    return project;
  } catch (error) {
    console.error('Error joining project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Leave a project
export const leaveProject = async (projectId, userId) => {
  if (!isSupabaseConfigured()) {
    const project = mockData.projects.find(project => project.project_id === projectId);
    
    // Check if user is the creator
    if (project.creator_id === userId) {
      throw new Error('Project creator cannot leave the project');
    }
    
    return {
      ...project,
      members: project.members.filter(member => member.user_id !== userId)
    };
  }
  
  try {
    // First, check if user is the creator
    const { data: project, error: checkError } = await supabase
      .from('projects')
      .select('creator_id')
      .eq('project_id', projectId)
      .single();
    
    if (checkError) throw checkError;
    
    if (project.creator_id === userId) {
      throw new Error('Project creator cannot leave the project');
    }
    
    // Delete the member
    const { error: deleteError } = await supabase
      .from('project_members')
      .delete()
      .eq('project_id', projectId)
      .eq('user_id', userId);
    
    if (deleteError) throw deleteError;
    
    // Get the updated project
    const { data: updatedProject, error: fetchError } = await supabase
      .from('projects')
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .eq('project_id', projectId)
      .single();
    
    if (fetchError) throw fetchError;
    
    return updatedProject;
  } catch (error) {
    console.error('Error leaving project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Complete a project
export const completeProject = async (projectId) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.projects.find(project => project.project_id === projectId),
      status: 'completed',
      completed_at: new Date().toISOString()
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('project_id', projectId)
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error completing project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Cancel a project
export const cancelProject = async (projectId) => {
  if (!isSupabaseConfigured()) {
    return {
      ...mockData.projects.find(project => project.project_id === projectId),
      status: 'cancelled'
    };
  }
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        status: 'cancelled'
      })
      .eq('project_id', projectId)
      .select(`
        *,
        creator:users(user_id, username, profile_picture_url),
        members:project_members(
          user_id,
          role,
          user:users(user_id, username, profile_picture_url)
        )
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error cancelling project:', error);
    throw new Error(handleSupabaseError(error));
  }
};

