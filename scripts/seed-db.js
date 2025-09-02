import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Sample data
const users = [
  {
    user_id: "user_1",
    farcaster_id: "fc_123",
    username: "alex_dev",
    display_name: "Alex Developer",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    location: "San Francisco, CA",
    skills: ["Web Development", "React", "Node.js"],
    bio: "Full-stack developer passionate about building community tools.",
    wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    user_id: "user_2",
    farcaster_id: "fc_456",
    username: "sarah_design",
    display_name: "Sarah Designer",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    location: "Berkeley, CA",
    skills: ["UI/UX Design", "Figma", "Illustration"],
    bio: "Creative designer helping local businesses shine online.",
    wallet_address: "0x2345678901abcdef2345678901abcdef23456789",
    latitude: 37.8715,
    longitude: -122.2730
  },
  {
    user_id: "user_3",
    farcaster_id: "fc_789",
    username: "mike_helper",
    display_name: "Mike Helper",
    profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    location: "Oakland, CA",
    skills: ["Handyman", "Gardening", "Pet Care"],
    bio: "Your friendly neighborhood helper for all kinds of tasks.",
    wallet_address: "0x3456789012abcdef3456789012abcdef34567890",
    latitude: 37.8044,
    longitude: -122.2711
  }
];

const gigs = [
  {
    gig_id: "gig_1",
    poster_id: "user_2",
    title: "Grocery Shopping Help",
    description: "Need someone to pick up groceries from Whole Foods. I'll provide the list and payment for groceries, just need help with the shopping and delivery.",
    location_proximity: "2 miles",
    payment_amount: 25,
    status: "open",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 37.8715,
    longitude: -122.2730
  },
  {
    gig_id: "gig_2",
    poster_id: "user_1",
    title: "Dog Walking - 2 Hours",
    description: "Looking for someone to walk my golden retriever for 2 hours this weekend. He's very friendly and loves long walks in the park.",
    location_proximity: "1 mile",
    payment_amount: 30,
    status: "open",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    gig_id: "gig_3",
    poster_id: "user_3",
    title: "Quick Furniture Assembly",
    description: "Need help assembling an IKEA bookshelf. Should take about 1-2 hours. All tools provided.",
    location_proximity: "3 miles",
    payment_amount: 40,
    status: "open",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    latitude: 37.8044,
    longitude: -122.2711
  }
];

const projects = [
  {
    project_id: "project_1",
    creator_id: "user_1",
    title: "Community Garden Website",
    description: "Building a website for our local community garden. Need help with design, content, and maybe some photography. This is a volunteer project to help our neighborhood.",
    required_skills: ["Web Design", "Photography", "Content Writing"],
    status: "seeking_members",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    project_id: "project_2",
    creator_id: "user_2",
    title: "Local Business Directory App",
    description: "Creating a mobile app to showcase local businesses in our area. Looking for developers and designers who want to support local commerce.",
    required_skills: ["React Native", "UI Design", "Backend Development"],
    status: "in_progress",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const projectMembers = [
  {
    project_id: "project_1",
    user_id: "user_1",
    role: "creator",
    joined_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    project_id: "project_2",
    user_id: "user_2",
    role: "creator",
    joined_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    project_id: "project_2",
    user_id: "user_1",
    role: "member",
    joined_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const gigApplicants = [
  {
    gig_id: "gig_2",
    user_id: "user_3",
    status: "pending",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const conversations = [
  {
    conversation_id: "conversation_1",
    participants: ["user_1", "user_3"],
    gig_id: "gig_2",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    conversation_id: "conversation_2",
    participants: ["user_1", "user_2"],
    project_id: "project_1",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const messages = [
  {
    message_id: "message_1",
    conversation_id: "conversation_1",
    sender_id: "user_3",
    content: "Hi! I'd love to help with dog walking. I have experience with golden retrievers.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read_by: ["user_3"]
  },
  {
    message_id: "message_2",
    conversation_id: "conversation_1",
    sender_id: "user_1",
    content: "That's great! When would be a good time for you this weekend?",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read_by: ["user_1", "user_3"]
  },
  {
    message_id: "message_3",
    conversation_id: "conversation_2",
    sender_id: "user_2",
    content: "I'm interested in helping with the community garden website design!",
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    read_by: ["user_2"]
  },
  {
    message_id: "message_4",
    conversation_id: "conversation_2",
    sender_id: "user_1",
    content: "Perfect! I'll send you the project details and we can set up a meeting.",
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    read_by: ["user_1", "user_2"]
  }
];

const notifications = [
  {
    id: uuidv4(),
    user_id: "user_1",
    type: "gig_application",
    message: "Mike Helper applied to your gig: Dog Walking - 2 Hours",
    read: false,
    data: {
      gig_id: "gig_2",
      applicant_id: "user_3"
    },
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    user_id: "user_1",
    type: "message",
    message: "New message from Sarah Designer",
    read: true,
    data: {
      conversation_id: "conversation_2",
      message_id: "message_3",
      sender_id: "user_2"
    },
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: uuidv4(),
    user_id: "user_2",
    type: "project_join",
    message: "Alex Developer joined your project: Local Business Directory App",
    read: false,
    data: {
      project_id: "project_2",
      member_id: "user_1"
    },
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Function to seed the database
async function seedDatabase() {
  console.log('Seeding database...');

  // Insert users
  const { error: usersError } = await supabase.from('users').upsert(users);
  if (usersError) {
    console.error('Error inserting users:', usersError);
    return;
  }
  console.log('Users inserted successfully');

  // Insert gigs
  const { error: gigsError } = await supabase.from('gigs').upsert(gigs);
  if (gigsError) {
    console.error('Error inserting gigs:', gigsError);
    return;
  }
  console.log('Gigs inserted successfully');

  // Insert projects
  const { error: projectsError } = await supabase.from('projects').upsert(projects);
  if (projectsError) {
    console.error('Error inserting projects:', projectsError);
    return;
  }
  console.log('Projects inserted successfully');

  // Insert project members
  const { error: projectMembersError } = await supabase.from('project_members').upsert(projectMembers);
  if (projectMembersError) {
    console.error('Error inserting project members:', projectMembersError);
    return;
  }
  console.log('Project members inserted successfully');

  // Insert gig applicants
  const { error: gigApplicantsError } = await supabase.from('gig_applicants').upsert(gigApplicants);
  if (gigApplicantsError) {
    console.error('Error inserting gig applicants:', gigApplicantsError);
    return;
  }
  console.log('Gig applicants inserted successfully');

  // Insert conversations
  const { error: conversationsError } = await supabase.from('conversations').upsert(conversations);
  if (conversationsError) {
    console.error('Error inserting conversations:', conversationsError);
    return;
  }
  console.log('Conversations inserted successfully');

  // Insert messages
  const { error: messagesError } = await supabase.from('messages').upsert(messages);
  if (messagesError) {
    console.error('Error inserting messages:', messagesError);
    return;
  }
  console.log('Messages inserted successfully');

  // Insert notifications
  const { error: notificationsError } = await supabase.from('notifications').upsert(notifications);
  if (notificationsError) {
    console.error('Error inserting notifications:', notificationsError);
    return;
  }
  console.log('Notifications inserted successfully');

  console.log('Database seeded successfully!');
}

// Run the seed function
seedDatabase().catch(console.error);

