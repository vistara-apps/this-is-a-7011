import React from 'react';
import { MapPin, Star, Briefcase, Award } from 'lucide-react';

export function Profile({ user }) {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Profile</h2>
      
      {/* Profile Header */}
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-start gap-4">
          <img 
            src={user.profile_picture_url || '/default-avatar.png'} 
            alt={user.username}
            className="w-16 h-16 rounded-full border-3 border-primary-500"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{user.username}</h3>
            <div className="flex items-center gap-2 text-slate-300 mb-2">
              <MapPin size={16} />
              <span>{user.location || 'Location not set'}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {user.bio || 'No bio available'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-lg p-4 text-center">
          <Briefcase size={24} className="mx-auto text-primary-500 mb-2" />
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-slate-400 text-sm">Gigs Completed</div>
        </div>
        <div className="glass-card rounded-lg p-4 text-center">
          <Star size={24} className="mx-auto text-accent-500 mb-2" />
          <div className="text-2xl font-bold text-white">4.8</div>
          <div className="text-slate-400 text-sm">Rating</div>
        </div>
      </div>

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-primary-500" />
            <h4 className="font-semibold text-white">Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="glass-card rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3">Recent Activity</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Completed "Grocery Shopping"</span>
            <span className="text-slate-400 text-xs">2 days ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Joined "Website Design Project"</span>
            <span className="text-slate-400 text-xs">1 week ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Posted "Dog Walking"</span>
            <span className="text-slate-400 text-xs">2 weeks ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}