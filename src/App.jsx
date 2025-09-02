import React, { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { GigFeed } from './components/GigFeed';
import { ProjectBoard } from './components/ProjectBoard';
import { Messages } from './components/Messages';
import { Profile } from './components/Profile';
import { CreateGig } from './components/CreateGig';
import { CreateProject } from './components/CreateProject';
import { AuthModal } from './components/AuthModal';
import { mockData } from './data/mockData';

function App() {
  const [currentTab, setCurrentTab] = useState('gigs');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [gigs, setGigs] = useState(mockData.gigs);
  const [projects, setProjects] = useState(mockData.projects);
  const [conversations, setConversations] = useState(mockData.conversations);
  const [showCreateGig, setShowCreateGig] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const handleAuth = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleCreateGig = (gigData) => {
    const newGig = {
      gig_id: Date.now().toString(),
      poster_id: user.user_id,
      ...gigData,
      status: 'open',
      created_at: new Date().toISOString(),
      applicants: [],
      poster: user
    };
    setGigs([newGig, ...gigs]);
    setShowCreateGig(false);
  };

  const handleCreateProject = (projectData) => {
    const newProject = {
      project_id: Date.now().toString(),
      creator_id: user.user_id,
      ...projectData,
      status: 'seeking_members',
      created_at: new Date().toISOString(),
      members: [user],
      creator: user
    };
    setProjects([newProject, ...projects]);
    setShowCreateProject(false);
  };

  const handleApplyToGig = (gigId) => {
    setGigs(gigs.map(gig => 
      gig.gig_id === gigId 
        ? { ...gig, applicants: [...(gig.applicants || []), user] }
        : gig
    ));
  };

  const handleJoinProject = (projectId) => {
    setProjects(projects.map(project => 
      project.project_id === projectId 
        ? { ...project, members: [...(project.members || []), user] }
        : project
    ));
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'gigs':
        return (
          <GigFeed 
            gigs={gigs} 
            currentUser={user}
            onApply={handleApplyToGig}
            onCreateGig={() => setShowCreateGig(true)}
          />
        );
      case 'projects':
        return (
          <ProjectBoard 
            projects={projects}
            currentUser={user}
            onJoin={handleJoinProject}
            onCreateProject={() => setShowCreateProject(true)}
          />
        );
      case 'messages':
        return (
          <Messages 
            conversations={conversations}
            currentUser={user}
          />
        );
      case 'profile':
        return <Profile user={user} />;
      default:
        return null;
    }
  };

  if (showAuthModal) {
    return <AuthModal onAuth={handleAuth} />;
  }

  return (
    <AppShell 
      currentTab={currentTab} 
      onTabChange={setCurrentTab}
      user={user}
    >
      {renderCurrentTab()}
      
      {showCreateGig && (
        <CreateGig 
          onSubmit={handleCreateGig}
          onClose={() => setShowCreateGig(false)}
        />
      )}
      
      {showCreateProject && (
        <CreateProject 
          onSubmit={handleCreateProject}
          onClose={() => setShowCreateProject(false)}
        />
      )}
    </AppShell>
  );
}

export default App;