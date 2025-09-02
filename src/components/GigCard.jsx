import React from 'react';
import { Clock, MapPin, DollarSign, Users } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

export function GigCard({ gig, currentUser, onApply }) {
  const { createSession } = usePaymentContext();
  const hasApplied = gig.applicants?.some(applicant => applicant.user_id === currentUser?.user_id);

  const handleApply = async () => {
    if (gig.payment_amount && parseFloat(gig.payment_amount.replace('$', '')) > 0) {
      try {
        await createSession();
        onApply(gig.gig_id);
      } catch (error) {
        console.error('Payment failed:', error);
        // For demo purposes, still allow application
        onApply(gig.gig_id);
      }
    } else {
      onApply(gig.gig_id);
    }
  };

  return (
    <div className="glass-card rounded-lg p-4 hover:bg-white/15 transition-all duration-200 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-base mb-1">{gig.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{gig.description}</p>
        </div>
        <div className="ml-3 flex-shrink-0">
          <div className="flex items-center gap-1 text-accent-500 font-bold">
            <DollarSign size={16} />
            <span>{gig.payment_amount}</span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{gig.location_proximity}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{new Date(gig.created_at).toLocaleDateString()}</span>
        </div>
        {gig.applicants?.length > 0 && (
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{gig.applicants.length} applied</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={gig.poster?.profile_picture_url || '/default-avatar.png'} 
            alt={gig.poster?.username || 'User'}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-slate-300 text-sm">{gig.poster?.username || 'Unknown'}</span>
        </div>
        
        {gig.poster_id !== currentUser?.user_id && (
          <button
            onClick={handleApply}
            disabled={hasApplied}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              hasApplied
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {hasApplied ? 'Applied' : 'Apply'}
          </button>
        )}
      </div>

      {/* Status Badge */}
      <div className="mt-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          gig.status === 'open' ? 'bg-green-500/20 text-green-400' :
          gig.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-gray-500/20 text-gray-400'
        }`}>
          {gig.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
    </div>
  );
}