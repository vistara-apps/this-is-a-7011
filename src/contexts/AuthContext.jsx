import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkUser();
  }, []);

  // Check if user is already logged in
  const checkUser = async () => {
    try {
      setLoading(true);
      
      // Check local storage for user data
      const storedUser = localStorage.getItem('gigslocal_user');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Farcaster
  const signInWithFarcaster = async (farcasterData) => {
    try {
      setLoading(true);
      
      // In a real implementation, we would verify the Farcaster data with Neynar API
      // For now, we'll create a user based on the Farcaster data
      
      // Check if user already exists in Supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('farcaster_id', `fc_${farcasterData.fid}`)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      let userData;
      
      if (existingUser) {
        // Update existing user
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({
            username: farcasterData.username,
            display_name: farcasterData.displayName,
            profile_picture_url: farcasterData.pfp?.url,
            bio: farcasterData.profile?.bio?.text,
            location: farcasterData.profile?.location?.placeId,
            followers_count: farcasterData.followerCount,
            following_count: farcasterData.followingCount,
            last_login: new Date().toISOString()
          })
          .eq('user_id', existingUser.user_id)
          .select()
          .single();
        
        if (updateError) throw updateError;
        userData = updatedUser;
      } else {
        // Create new user
        const newUser = {
          user_id: uuidv4(),
          farcaster_id: `fc_${farcasterData.fid}`,
          username: farcasterData.username,
          display_name: farcasterData.displayName,
          profile_picture_url: farcasterData.pfp?.url,
          bio: farcasterData.profile?.bio?.text,
          location: farcasterData.profile?.location?.placeId,
          skills: [],
          followers_count: farcasterData.followerCount,
          following_count: farcasterData.followingCount,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        };
        
        const { data: createdUser, error: createError } = await supabase
          .from('users')
          .insert(newUser)
          .select()
          .single();
        
        if (createError) throw createError;
        userData = createdUser;
      }
      
      // Save user data to local storage
      localStorage.setItem('gigslocal_user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      console.error('Error signing in with Farcaster:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with demo profile
  const signInWithDemo = async (profileData) => {
    try {
      setLoading(true);
      
      // Create a demo user
      const userData = {
        user_id: uuidv4(),
        farcaster_id: `demo_${Date.now()}`,
        username: profileData.username,
        display_name: profileData.username,
        profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.username}`,
        location: profileData.location,
        bio: profileData.bio || 'Demo user exploring GigsLocal',
        skills: profileData.skills.filter(skill => skill.trim() !== ''),
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };
      
      // In a real implementation, we would save this user to Supabase
      // For demo purposes, we'll just save to local storage
      
      // Save user data to local storage
      localStorage.setItem('gigslocal_user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      console.error('Error signing in with demo profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      
      // Remove user data from local storage
      localStorage.removeItem('gigslocal_user');
      
      // Update state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user data
      const updatedUser = {
        ...user,
        ...profileData,
      };
      
      // In a real implementation, we would update the user in Supabase
      // For demo purposes, we'll just update local storage
      
      // Save updated user data to local storage
      localStorage.setItem('gigslocal_user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signInWithFarcaster,
    signInWithDemo,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

