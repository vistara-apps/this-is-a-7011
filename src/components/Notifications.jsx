import React, { useState } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { Card, Button } from './ui';
import { formatDistanceToNow } from 'date-fns';

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, loading } = useNotifications();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
      >
        <Bell size={20} className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto glass-card rounded-lg shadow-lg z-50 animate-fade-in scrollbar-hide">
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-medium">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1 rounded hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  title="Mark all as read"
                >
                  <Check size={16} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="p-2">
            {loading ? (
              <div className="py-8 text-center text-slate-400">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <Bell size={24} className="mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  // Determine icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'gig_application':
        return <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">👋</div>;
      case 'project_join':
        return <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-500">👥</div>;
      case 'message':
        return <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">💬</div>;
      case 'payment':
        return <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">💰</div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-500">📣</div>;
    }
  };

  return (
    <div 
      className={`p-2 rounded-lg mb-1 hover:bg-white/5 transition-colors cursor-pointer ${
        !notification.read ? 'bg-white/10' : ''
      }`}
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${!notification.read ? 'text-white font-medium' : 'text-slate-300'}`}>
            {notification.message}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          {!notification.read && (
            <button
              onClick={handleMarkAsRead}
              className="p-1 rounded hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              title="Mark as read"
            >
              <Check size={14} />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

