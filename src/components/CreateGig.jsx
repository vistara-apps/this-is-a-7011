import React, { useState } from 'react';
import { X, DollarSign, MapPin, Clock } from 'lucide-react';

export function CreateGig({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    payment_amount: '',
    location_proximity: '',
    expires_at: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.payment_amount) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-xl p-6 w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Post a Gig</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Gig Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery Shopping Help"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you need help with..."
              rows="3"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Payment
              </label>
              <input
                type="text"
                name="payment_amount"
                value={formData.payment_amount}
                onChange={handleChange}
                placeholder="$25"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                <MapPin size={16} className="inline mr-1" />
                Distance
              </label>
              <select
                name="location_proximity"
                value={formData.location_proximity}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">Select...</option>
                <option value="1 mile">1 mile</option>
                <option value="2 miles">2 miles</option>
                <option value="5 miles">5 miles</option>
                <option value="10 miles">10 miles</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              <Clock size={16} className="inline mr-1" />
              Expires (Optional)
            </label>
            <input
              type="datetime-local"
              name="expires_at"
              value={formData.expires_at}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-white/20 text-slate-300 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Post Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}