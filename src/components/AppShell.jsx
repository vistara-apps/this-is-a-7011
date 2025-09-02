import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Home, Briefcase, MessageCircle, User, Plus } from 'lucide-react';

export function AppShell({ children, currentTab, onTabChange, user }) {
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
            <ConnectButton />
            {user?.profile_picture_url && (
              <img 
                src={user.profile_picture_url} 
                alt={user.username}
                className="w-8 h-8 rounded-full border-2 border-primary-500"
              />
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="glass-card rounded-lg p-1">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-md transition-all duration-200 ${
                    currentTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-6 max-w-sm mx-auto">
        {children}
      </main>
    </div>
  );
}