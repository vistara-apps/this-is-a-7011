import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Home, Briefcase, MessageCircle, User, LogOut } from 'lucide-react';
import { Notifications } from './Notifications';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Tabs, Tab } from './ui';

export function AppShell({ children, currentTab, onTabChange, user }) {
  const { signOut } = useAuth();
  
  const tabs = [
    { id: 'gigs', label: 'Gigs', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="px-4 py-6 max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Gigs Local</h1>
            <p className="text-slate-400 text-sm">Your neighborhood marketplace</p>
          </div>
          <div className="flex items-center gap-3">
            <Notifications />
            <div className="relative group">
              <Avatar 
                src={user?.profile_picture_url} 
                alt={user?.username || 'User'}
                size="md"
                className="cursor-pointer"
              />
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg z-50 hidden group-hover:block animate-fade-in">
                <div className="p-3 border-b border-white/10">
                  <p className="text-white font-medium truncate">{user?.username || 'User'}</p>
                  <p className="text-slate-400 text-xs truncate">{user?.location || 'No location'}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
            
            <ConnectButton />
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs value={currentTab} onChange={onTabChange}>
          {tabs.map((tab) => (
            <Tab 
              key={tab.id} 
              value={tab.id} 
              label={tab.label} 
              icon={tab.icon} 
            />
          ))}
        </Tabs>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20 max-w-sm mx-auto">
        {children}
      </main>
    </div>
  );
}
