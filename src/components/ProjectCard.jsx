import React from 'react';
import { Calendar, Users, Tag } from 'lucide-react';

export function ProjectCard({ project, currentUser, onJoin }) {
  const isMember = project.members?.some(member => member.user_id === currentUser?.user_id);
  const isCreator = project.creator_id === currentUser?.user_id;

  return (
    <div className="glass-card rounded-lg p-4 hover:bg-white/15 transition-all duration-200 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-base mb-1">{project.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
        </div>
      </div>

      {/* Required Skills */}
      {project.required_skills && project.required_skills.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2 text-slate-400">
            <Tag size={14} />
            <span className="text-xs">Required Skills:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.required_skills.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{project.members?.length || 0} members</span>
        </div>
      </div>

      {/* Members Preview */}
      {project.members && project.members.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member, index) => (
                <img 
                  key={index}
                  src={member.profile_picture_url || '/default-avatar.png'} 
                  alt={member.username}
                  className="w-6 h-6 rounded-full border-2 border-slate-800"
                />
              ))}
            </div>
            {project.members.length > 3 && (
              <span className="text-slate-400 text-xs">+{project.members.length - 3} more</span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={project.creator?.profile_picture_url || '/default-avatar.png'} 
            alt={project.creator?.username || 'Creator'}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-slate-300 text-sm">{project.creator?.username || 'Unknown'}</span>
        </div>
        
        {!isCreator && (
          <button
            onClick={() => onJoin(project.project_id)}
            disabled={isMember}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isMember
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-accent-500 hover:bg-accent-600 text-white'
            }`}
          >
            {isMember ? 'Joined' : 'Join Project'}
          </button>
        )}
      </div>

      {/* Status Badge */}
      <div className="mt-3">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          project.status === 'seeking_members' ? 'bg-blue-500/20 text-blue-400' :
          project.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {project.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
    </div>
  );
}