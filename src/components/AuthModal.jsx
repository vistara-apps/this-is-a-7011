import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserPlus, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { farcasterClient } from '../lib/farcaster';

export function AuthModal() {
  const [step, setStep] = useState('connect'); // 'connect' or 'profile'
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    location: '',
    bio: '',
    skills: []
  });

  const { signInWithFarcaster, signInWithDemo } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleFarcasterLogin = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would use Farcaster's authentication flow
      // For now, we'll simulate it with mock data
      const mockFarcasterData = {
        fid: Date.now(),
        username: 'farcaster_user',
        displayName: 'Farcaster User',
        pfp: { url: `https://api.dicebear.com/7.x/avataaars/svg?seed=farcaster_${Date.now()}` },
        profile: {
          bio: { text: 'Farcaster user exploring GigsLocal' },
          location: { placeId: 'San Francisco, CA' }
        },
        verifications: [],
        followerCount: 42,
        followingCount: 37
      };
      
      await signInWithFarcaster(mockFarcasterData);
      showSuccess('Successfully signed in with Farcaster!');
    } catch (error) {
      console.error('Farcaster login error:', error);
      showError('Failed to sign in with Farcaster. Please try again.');
      setStep('profile'); // Fallback to profile creation
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (profileData.username && profileData.location) {
      try {
        setLoading(true);
        await signInWithDemo(profileData);
        showSuccess('Welcome to GigsLocal!');
      } catch (error) {
        console.error('Demo login error:', error);
        showError('Failed to create demo profile. Please try again.');
      } finally {
        setLoading(false);
      }
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
            {/* Farcaster Login */}
            <button
              onClick={handleFarcasterLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M125 0C55.9644 0 0 55.9644 0 125C0 194.036 55.9644 250 125 250C194.036 250 250 194.036 250 125C250 55.9644 194.036 0 125 0Z" fill="white"/>
                    <path d="M125 26C70.3 26 26 70.3 26 125C26 179.7 70.3 224 125 224C179.7 224 224 179.7 224 125C224 70.3 179.7 26 125 26Z" fill="purple"/>
                    <path d="M125 224C70.3 224 26 179.7 26 125H224C224 179.7 179.7 224 125 224Z" fill="url(#paint0_linear_1_11)"/>
                    <path d="M125 26C179.7 26 224 70.3 224 125H26C26 70.3 70.3 26 125 26Z" fill="url(#paint1_linear_1_11)"/>
                    <defs>
                      <linearGradient id="paint0_linear_1_11" x1="26" y1="174.5" x2="224" y2="174.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6F4AFF"/>
                        <stop offset="1" stopColor="#D83AEB"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_1_11" x1="125" y1="26" x2="125" y2="125" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D83AEB"/>
                        <stop offset="1" stopColor="#6F4AFF"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  Continue with Farcaster
                </>
              )}
            </button>
            
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
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep('connect')}
                className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Loading...
                  </span>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
