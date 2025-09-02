import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export function CreateProject({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    required_skills: []
  });

  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        required_skills: [...formData.required_skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      required_skills: formData.required_skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-xl p-6 w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Create Project</h3>
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
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Community Website Design"
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
              placeholder="Describe your project and what kind of collaboration you're looking for..."
              rows="4"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Required Skills
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            
            {/* Skills List */}
            {formData.required_skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.required_skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              className="flex-1 px-4 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}