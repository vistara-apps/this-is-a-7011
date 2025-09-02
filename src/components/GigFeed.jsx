import React from 'react';
import { GigCard } from './GigCard';
import { Plus, MapPin, Filter } from 'lucide-react';

export function GigFeed({ gigs, currentUser, onApply, onCreateGig }) {
  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Available Gigs</h2>
        <div className="flex gap-2">
          <button className="p-2 glass-card rounded-lg hover:bg-white/20 transition-colors">
            <Filter size={18} className="text-slate-300" />
          </button>
          <button 
            onClick={onCreateGig}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Post Gig
          </button>
        </div>
      </div>

      {/* Location Filter */}
      <div className="glass-card rounded-lg p-3">
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin size={16} />
          <span className="text-sm">Within 5 miles of your location</span>
        </div>
      </div>

      {/* Gigs List */}
      <div className="space-y-3">
        {gigs.map((gig) => (
          <GigCard 
            key={gig.gig_id} 
            gig={gig} 
            currentUser={currentUser}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  );
}