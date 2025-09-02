import { supabase, handleSupabaseError, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from '../data/mockData';

// Get user's conversations
export const getUserConversations = async (userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.conversations.filter(
      conversation => conversation.participants.includes(userId)
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        gig:gigs(gig_id, title),
        project:projects(project_id, title),
        participants:users(user_id, username, profile_picture_url),
        last_message:messages(message_id, content, sender_id, timestamp)
      `)
      .contains('participants', [userId])
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get conversation by ID
export const getConversationById = async (conversationId) => {
  if (!isSupabaseConfigured()) {
    return mockData.conversations.find(
      conversation => conversation.conversation_id === conversationId
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        gig:gigs(gig_id, title),
        project:projects(project_id, title),
        participants:users(user_id, username, profile_picture_url)
      `)
      .eq('conversation_id', conversationId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Get messages for a conversation
export const getConversationMessages = async (conversationId) => {
  if (!isSupabaseConfigured()) {
    return mockData.messages.filter(
      message => message.conversation_id === conversationId
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users(user_id, username, profile_picture_url)
      `)
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Create a new conversation
export const createConversation = async (participants, gigId = null, projectId = null) => {
  if (!isSupabaseConfigured()) {
    const newConversation = {
      conversation_id: uuidv4(),
      participants,
      gig_id: gigId,
      project_id: projectId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return newConversation;
  }
  
  try {
    const newConversation = {
      conversation_id: uuidv4(),
      participants,
      gig_id: gigId,
      project_id: projectId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('conversations')
      .insert(newConversation)
      .select(`
        *,
        gig:gigs(gig_id, title),
        project:projects(project_id, title),
        participants:users(user_id, username, profile_picture_url)
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Send a message
export const sendMessage = async (conversationId, senderId, content) => {
  if (!isSupabaseConfigured()) {
    const newMessage = {
      message_id: uuidv4(),
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      timestamp: new Date().toISOString(),
      read_by: [senderId]
    };
    
    return newMessage;
  }
  
  try {
    const newMessage = {
      message_id: uuidv4(),
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      timestamp: new Date().toISOString(),
      read_by: [senderId]
    };
    
    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select(`
        *,
        sender:users(user_id, username, profile_picture_url)
      `)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(handleSupabaseError(error));
  }
};

// Mark messages as read
export const markMessagesAsRead = async (conversationId, userId) => {
  if (!isSupabaseConfigured()) {
    return mockData.messages
      .filter(message => message.conversation_id === conversationId)
      .map(message => ({
        ...message,
        read_by: [...new Set([...message.read_by, userId])]
      }));
  }
  
  try {
    // Get all messages in the conversation that the user hasn't read
    const { data: messages, error: fetchError } = await supabase
      .from('messages')
      .select('message_id, read_by')
      .eq('conversation_id', conversationId)
      .not('read_by', 'cs', `{${userId}}`);
    
    if (fetchError) throw fetchError;
    
    // Update each message to add the user to read_by
    for (const message of messages) {
      const { error: updateError } = await supabase
        .from('messages')
        .update({
          read_by: [...message.read_by, userId]
        })
        .eq('message_id', message.message_id);
      
      if (updateError) throw updateError;
    }
    
    // Get all updated messages
    const { data: updatedMessages, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users(user_id, username, profile_picture_url)
      `)
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    
    return updatedMessages;
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw new Error(handleSupabaseError(error));
  }
};

