import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from '../data/mockData';
import { isSupabaseConfigured } from '../lib/supabase';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  
  // Determine if we should use mock data
  const useMockData = !isSupabaseConfigured();

  // Fetch notifications when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications();
      
      // Set up real-time subscription for new notifications
      if (!useMockData) {
        const subscription = supabase
          .channel('notifications')
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.user_id}`
          }, (payload) => {
            // Add new notification to state
            setNotifications(prev => [payload.new, ...prev]);
            // Update unread count
            if (!payload.new.read) {
              setUnreadCount(prev => prev + 1);
            }
          })
          .subscribe();
          
        return () => {
          supabase.removeChannel(subscription);
        };
      }
    }
  }, [isAuthenticated, user]);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      if (useMockData) {
        // Use mock data
        const mockNotifications = mockData.notifications.filter(
          notification => notification.user_id === user.user_id
        );
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
        return;
      }
      
      // Fetch notifications from Supabase
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.user_id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      setNotifications(data || []);
      setUnreadCount(data.filter(notification => !notification.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      
      // Fallback to mock data
      const mockNotifications = mockData.notifications.filter(
        notification => notification.user_id === user.user_id
      );
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } finally {
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Find the notification
      const notification = notifications.find(n => n.id === notificationId);
      if (!notification || notification.read) return;
      
      if (useMockData) {
        // Update local state for mock data
        setNotifications(prev => 
          prev.map(n => 
            n.id === notificationId ? { ...n, read: true } : n
          )
        );
        setUnreadCount(prev => prev - 1);
        return;
      }
      
      // Update notification in Supabase
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (unreadCount === 0) return;
    
    try {
      if (useMockData) {
        // Update local state for mock data
        setNotifications(prev => 
          prev.map(n => ({ ...n, read: true }))
        );
        setUnreadCount(0);
        return;
      }
      
      // Update all notifications in Supabase
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.user_id)
        .eq('read', false);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete a notification
  const deleteNotification = async (notificationId) => {
    try {
      // Find the notification
      const notification = notifications.find(n => n.id === notificationId);
      if (!notification) return;
      
      if (useMockData) {
        // Update local state for mock data
        setNotifications(prev => 
          prev.filter(n => n.id !== notificationId)
        );
        if (!notification.read) {
          setUnreadCount(prev => prev - 1);
        }
        return;
      }
      
      // Delete notification from Supabase
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
      if (!notification.read) {
        setUnreadCount(prev => prev - 1);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Create a notification (for testing)
  const createNotification = async (type, message, data = {}) => {
    if (!user) return;
    
    try {
      const newNotification = {
        id: uuidv4(),
        user_id: user.user_id,
        type,
        message,
        read: false,
        data,
        created_at: new Date().toISOString()
      };
      
      if (useMockData) {
        // Update local state for mock data
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        return newNotification;
      }
      
      // Insert notification into Supabase
      const { data: createdNotification, error } = await supabase
        .from('notifications')
        .insert(newNotification)
        .select()
        .single();
      
      if (error) throw error;
      
      return createdNotification;
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

