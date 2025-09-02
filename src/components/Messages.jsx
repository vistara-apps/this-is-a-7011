import React, { useState } from 'react';
import { MessageSquare, Search } from 'lucide-react';

export function Messages({ conversations, currentUser }) {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Messages</h2>
      
      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {conversations.map((conversation) => {
          const otherParticipant = conversation.participants?.find(p => p.user_id !== currentUser?.user_id);
          const lastMessage = conversation.messages?.[conversation.messages.length - 1];
          
          return (
            <div 
              key={conversation.conversation_id}
              onClick={() => setSelectedConversation(conversation)}
              className="glass-card rounded-lg p-4 hover:bg-white/15 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={otherParticipant?.profile_picture_url || '/default-avatar.png'} 
                  alt={otherParticipant?.username || 'User'}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">
                      {otherParticipant?.username || 'Unknown User'}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {lastMessage ? new Date(lastMessage.timestamp).toLocaleDateString() : ''}
                    </span>
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-slate-300 truncate">
                      {lastMessage.content}
                    </p>
                  )}
                  {conversation.gig_title && (
                    <p className="text-xs text-primary-400">
                      Re: {conversation.gig_title}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {conversations.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-400 mb-2">No messages yet</h3>
          <p className="text-slate-500">Apply to gigs or join projects to start conversations</p>
        </div>
      )}
    </div>
  );
}