import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserPlus, MapPin } from 'lucide-react';

export function AuthModal({ onAuth }) {
  const [step, setStep] = useState('connect'); // 'connect' or 'profile'
  const [profileData, setProfileData] = useState({
    username: '',
    location: '',
    bio: '',
    skills: []
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (profileData.username && profileData.location) {
      const userData = {
        user_id: Date.now().toString(),
        farcaster_id: `fc_${Date.now()}`,
        profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.username}`,
        ...profileData,
        skills: profileData.skills.filter(skill => skill.trim() !== '')
      };
      onAuth(userData);
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setProfileData({ ...profileData, skills });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="glass-card rounded-xl p-8 w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome to GigsLocal</h1>
          <p className="text-slate-400">Your neighborhood marketplace for tasks and skills</p>
        </div>

        {step === 'connect' ? (
          <div className="space-y-6">
            {/* Wallet Connection */}
            <div className="text-center">
              <ConnectButton />
            </div>
            
            <div className="text-center">
              <span className="text-slate-400">or</span>
            </div>

            {/* Demo Login */}
            <button
              onClick={() => setStep('profile')}
              className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <UserPlus size={20} />
              Continue with Demo Profile
            </button>

            <p className="text-xs text-slate-500 text-center">
              Demo mode allows you to explore the app without connecting a wallet
            </p>
          </div>
        ) : (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Complete Your Profile</h3>
            
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                <MapPin size={16} className="inline mr-1" />
                Location
              </label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Bio (Optional)
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Tell others about yourself..."
                rows="3"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Skills (Optional)
              </label>
              <input
                type="text"
                onChange={handleSkillsChange}
                placeholder="e.g., Photography, Writing, Coding (comma separated)"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep('connect')}
                className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg hover:bg-white/10 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}