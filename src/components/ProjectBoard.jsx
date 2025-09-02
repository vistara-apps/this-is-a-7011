import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Plus, Filter } from 'lucide-react';

export function ProjectBoard({ projects, currentUser, onJoin, onCreateProject }) {
  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Local Projects</h2>
        <div className="flex gap-2">
          <button className="p-2 glass-card rounded-lg hover:bg-white/20 transition-colors">
            <Filter size={18} className="text-slate-300" />
          </button>
          <button 
            onClick={onCreateProject}
            className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Create Project
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard 
            key={project.project_id} 
            project={project} 
            currentUser={currentUser}
            onJoin={onJoin}
          />
        ))}
      </div>
    </div>
  );
}