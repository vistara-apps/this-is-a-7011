// Mock data for development

export const mockData = {
  users: [
    {
      user_id: "user_1",
      farcaster_id: "fc_123",
      username: "alex_dev",
      display_name: "Alex Developer",
      profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      location: "San Francisco, CA",
      skills: ["Web Development", "React", "Node.js"],
      bio: "Full-stack developer passionate about building community tools.",
      wallet_address: "0x1234567890abcdef1234567890abcdef12345678"
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
      wallet_address: "0x2345678901abcdef2345678901abcdef23456789"
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
      wallet_address: "0x3456789012abcdef3456789012abcdef34567890"
    }
  ],
  
  gigs: [
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
      applicants: [],
      poster: {
        user_id: "user_2",
        username: "sarah_design",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      }
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
      applicants: [
        {
          user_id: "user_3",
          status: "pending",
          user: {
            user_id: "user_3",
            username: "mike_helper",
            profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
          }
        }
      ],
      poster: {
        user_id: "user_1",
        username: "alex_dev",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      }
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
      applicants: [],
      poster: {
        user_id: "user_3",
        username: "mike_helper",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
      }
    }
  ],
  
  projects: [
    {
      project_id: "project_1",
      creator_id: "user_1",
      title: "Community Garden Website",
      description: "Building a website for our local community garden. Need help with design, content, and maybe some photography. This is a volunteer project to help our neighborhood.",
      required_skills: ["Web Design", "Photography", "Content Writing"],
      status: "seeking_members",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      members: [
        {
          user_id: "user_1",
          role: "creator",
          user: {
            user_id: "user_1",
            username: "alex_dev",
            profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
          }
        }
      ],
      creator: {
        user_id: "user_1",
        username: "alex_dev",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      }
    },
    {
      project_id: "project_2",
      creator_id: "user_2",
      title: "Local Business Directory App",
      description: "Creating a mobile app to showcase local businesses in our area. Looking for developers and designers who want to support local commerce.",
      required_skills: ["React Native", "UI Design", "Backend Development"],
      status: "in_progress",
      created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      members: [
        {
          user_id: "user_2",
          role: "creator",
          user: {
            user_id: "user_2",
            username: "sarah_design",
            profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
          }
        },
        {
          user_id: "user_1",
          role: "member",
          user: {
            user_id: "user_1",
            username: "alex_dev",
            profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
          }
        }
      ],
      creator: {
        user_id: "user_2",
        username: "sarah_design",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      }
    }
  ],
  
  conversations: [
    {
      conversation_id: "conversation_1",
      participants: ["user_1", "user_3"],
      gig_id: "gig_2",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      gig: {
        gig_id: "gig_2",
        title: "Dog Walking - 2 Hours"
      },
      participants_data: [
        {
          user_id: "user_1",
          username: "alex_dev",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        },
        {
          user_id: "user_3",
          username: "mike_helper",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
        }
      ],
      last_message: {
        message_id: "message_2",
        content: "That's great! When would be a good time for you this weekend?",
        sender_id: "user_1",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    },
    {
      conversation_id: "conversation_2",
      participants: ["user_1", "user_2"],
      project_id: "project_1",
      created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      project: {
        project_id: "project_1",
        title: "Community Garden Website"
      },
      participants_data: [
        {
          user_id: "user_1",
          username: "alex_dev",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        },
        {
          user_id: "user_2",
          username: "sarah_design",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
        }
      ],
      last_message: {
        message_id: "message_4",
        content: "Perfect! I'll send you the project details and we can set up a meeting.",
        sender_id: "user_1",
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    }
  ],
  
  messages: [
    {
      message_id: "message_1",
      conversation_id: "conversation_1",
      sender_id: "user_3",
      content: "Hi! I'd love to help with dog walking. I have experience with golden retrievers.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read_by: ["user_3"],
      sender: {
        user_id: "user_3",
        username: "mike_helper",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
      }
    },
    {
      message_id: "message_2",
      conversation_id: "conversation_1",
      sender_id: "user_1",
      content: "That's great! When would be a good time for you this weekend?",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      read_by: ["user_1", "user_3"],
      sender: {
        user_id: "user_1",
        username: "alex_dev",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      }
    },
    {
      message_id: "message_3",
      conversation_id: "conversation_2",
      sender_id: "user_2",
      content: "I'm interested in helping with the community garden website design!",
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      read_by: ["user_2"],
      sender: {
        user_id: "user_2",
        username: "sarah_design",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      }
    },
    {
      message_id: "message_4",
      conversation_id: "conversation_2",
      sender_id: "user_1",
      content: "Perfect! I'll send you the project details and we can set up a meeting.",
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      read_by: ["user_1", "user_2"],
      sender: {
        user_id: "user_1",
        username: "alex_dev",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      }
    }
  ],
  
  notifications: [
    {
      id: "notification_1",
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
      id: "notification_2",
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
      id: "notification_3",
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
  ]
};

