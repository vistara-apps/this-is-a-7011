import React, { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { GigFeed } from './components/GigFeed';
import { ProjectBoard } from './components/ProjectBoard';
import { Messages } from './components/Messages';
import { Profile } from './components/Profile';
import { CreateGig } from './components/CreateGig';
import { CreateProject } from './components/CreateProject';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';
import { useToast } from './contexts/ToastContext';
import { getGigs } from './api/gigs';
import { getProjects } from './api/projects';
import { getUserConversations } from './api/messages';
import { isSupabaseConfigured } from './lib/supabase';
import { mockData } from './data/mockData';

function App() {
  const [currentTab, setCurrentTab] = useState('gigs');
  const [gigs, setGigs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState({
    gigs: false,
    projects: false,
    conversations: false
  });
  const [showCreateGig, setShowCreateGig] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();
  
  // Determine if we should use mock data (when Supabase is not configured)
  const useMockData = !isSupabaseConfigured();
  
  // Fetch data when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchGigs();
      fetchProjects();
      fetchConversations();
    }
  }, [isAuthenticated]);
  
  // Fetch gigs
  const fetchGigs = async () => {
    if (useMockData) {
      setGigs(mockData.gigs);
      return;
    }
    
    try {
      setLoading(prev => ({ ...prev, gigs: true }));
      const fetchedGigs = await getGigs();
      setGigs(fetchedGigs);
    } catch (error) {
      console.error('Error fetching gigs:', error);
      showError('Failed to load gigs. Please try again.');
      // Fallback to mock data
      setGigs(mockData.gigs);
    } finally {
      setLoading(prev => ({ ...prev, gigs: false }));
    }
  };
  
  // Fetch projects
  const fetchProjects = async () => {
    if (useMockData) {
      setProjects(mockData.projects);
      return;
    }
    
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      showError('Failed to load projects. Please try again.');
      // Fallback to mock data
      setProjects(mockData.projects);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };
  
  // Fetch conversations
  const fetchConversations = async () => {
    if (useMockData) {
      setConversations(mockData.conversations);
      return;
    }
    
    try {
      setLoading(prev => ({ ...prev, conversations: true }));
      const fetchedConversations = await getUserConversations(user.user_id);
      setConversations(fetchedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      showError('Failed to load messages. Please try again.');
      // Fallback to mock data
      setConversations(mockData.conversations);
    } finally {
      setLoading(prev => ({ ...prev, conversations: false }));
    }
  };

  // Handle creating a new gig
  const handleCreateGig = async (gigData) => {
    try {
      if (useMockData) {
        // Use mock data approach
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
        showSuccess('Gig created successfully!');
        return;
      }
      
      // Create gig in Supabase
      const newGig = await createGig({
        poster_id: user.user_id,
        ...gigData
      });
      
      // Update local state
      setGigs([newGig, ...gigs]);
      setShowCreateGig(false);
      showSuccess('Gig created successfully!');
    } catch (error) {
      console.error('Error creating gig:', error);
      showError('Failed to create gig. Please try again.');
    }
  };

  // Handle creating a new project
  const handleCreateProject = async (projectData) => {
    try {
      if (useMockData) {
        // Use mock data approach
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
        showSuccess('Project created successfully!');
        return;
      }
      
      // Create project in Supabase
      const newProject = await createProject({
        creator_id: user.user_id,
        ...projectData
      });
      
      // Update local state
      setProjects([newProject, ...projects]);
      setShowCreateProject(false);
      showSuccess('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      showError('Failed to create project. Please try again.');
    }
  };

  // Handle applying to a gig
  const handleApplyToGig = async (gigId) => {
    try {
      if (useMockData) {
        // Use mock data approach
        setGigs(gigs.map(gig => 
          gig.gig_id === gigId 
            ? { ...gig, applicants: [...(gig.applicants || []), user] }
            : gig
        ));
        showSuccess('Application submitted successfully!');
        return;
      }
      
      // Apply to gig in Supabase
      const updatedGig = await applyToGig(gigId, user.user_id);
      
      // Update local state
      setGigs(gigs.map(gig => 
        gig.gig_id === gigId ? updatedGig : gig
      ));
      
      showSuccess('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to gig:', error);
      showError('Failed to apply to gig. Please try again.');
    }
  };

  // Handle joining a project
  const handleJoinProject = async (projectId) => {
    try {
      if (useMockData) {
        // Use mock data approach
        setProjects(projects.map(project => 
          project.project_id === projectId 
            ? { ...project, members: [...(project.members || []), user] }
            : project
        ));
        showSuccess('Joined project successfully!');
        return;
      }
      
      // Join project in Supabase
      const updatedProject = await joinProject(projectId, user.user_id);
      
      // Update local state
      setProjects(projects.map(project => 
        project.project_id === projectId ? updatedProject : project
      ));
      
      showSuccess('Joined project successfully!');
    } catch (error) {
      console.error('Error joining project:', error);
      showError('Failed to join project. Please try again.');
    }
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'gigs':
        return (
          <GigFeed 
            gigs={gigs} 
            currentUser={user}
            loading={loading.gigs}
            onApply={handleApplyToGig}
            onCreateGig={() => setShowCreateGig(true)}
            onRefresh={fetchGigs}
          />
        );
      case 'projects':
        return (
          <ProjectBoard 
            projects={projects}
            currentUser={user}
            loading={loading.projects}
            onJoin={handleJoinProject}
            onCreateProject={() => setShowCreateProject(true)}
            onRefresh={fetchProjects}
          />
        );
      case 'messages':
        return (
          <Messages 
            conversations={conversations}
            currentUser={user}
            loading={loading.conversations}
            onRefresh={fetchConversations}
          />
        );
      case 'profile':
        return <Profile user={user} />;
      default:
        return null;
    }
  };

  // Show auth modal if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthModal />;
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
