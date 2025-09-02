export const mockData = {
  users: [
    {
      user_id: "1",
      farcaster_id: "fc_123",
      username: "alex_dev",
      profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      location: "San Francisco, CA",
      skills: ["Web Development", "React", "Node.js"],
      bio: "Full-stack developer passionate about building community tools."
    },
    {
      user_id: "2",
      farcaster_id: "fc_456",
      username: "sarah_design",
      profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      location: "Berkeley, CA",
      skills: ["UI/UX Design", "Figma", "Illustration"],
      bio: "Creative designer helping local businesses shine online."
    },
    {
      user_id: "3",
      farcaster_id: "fc_789",
      username: "mike_helper",
      profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      location: "Oakland, CA",
      skills: ["Handyman", "Gardening", "Pet Care"],
      bio: "Your friendly neighborhood helper for all kinds of tasks."
    }
  ],
  
  gigs: [
    {
      gig_id: "1",
      poster_id: "2",
      title: "Grocery Shopping Help",
      description: "Need someone to pick up groceries from Whole Foods. I'll provide the list and payment for groceries, just need help with the shopping and delivery.",
      location_proximity: "2 miles",
      payment_amount: "$25",
      status: "open",
      created_at: "2024-01-15T10:00:00Z",
      expires_at: "2024-01-20T18:00:00Z",
      applicants: [],
      poster: {
        user_id: "2",
        username: "sarah_design",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      }
    },
    {
      gig_id: "2",
      poster_id: "1",
      title: "Dog Walking - 2 Hours",
      description: "Looking for someone to walk my golden retriever for 2 hours this weekend. He's very friendly and loves long walks in the park.",
      location_proximity: "1 mile",
      payment_amount: "$30",
      status: "open",
      created_at: "2024-01-14T15:30:00Z",
      expires_at: "2024-01-19T20:00:00Z",
      applicants: [
        {
          user_id: "3",
          username: "mike_helper",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
        }
      ],
      poster: {
        user_id: "1",
        username: "alex_dev",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      }
    },
    {
      gig_id: "3",
      poster_id: "3",
      title: "Quick Furniture Assembly",
      description: "Need help assembling an IKEA bookshelf. Should take about 1-2 hours. All tools provided.",
      location_proximity: "3 miles",
      payment_amount: "$40",
      status: "open",
      created_at: "2024-01-13T09:15:00Z",
      expires_at: "2024-01-18T17:00:00Z",
      applicants: [],
      poster: {
        user_id: "3",
        username: "mike_helper",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
      }
    }
  ],

  projects: [
    {
      project_id: "1",
      creator_id: "1",
      title: "Community Garden Website",
      description: "Building a website for our local community garden. Need help with design, content, and maybe some photography. This is a volunteer project to help our neighborhood.",
      required_skills: ["Web Design", "Photography", "Content Writing"],
      status: "seeking_members",
      created_at: "2024-01-10T14:00:00Z",
      members: [
        {
          user_id: "1",
          username: "alex_dev",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        }
      ],
      creator: {
        user_id: "1",
        username: "alex_dev",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
      }
    },
    {
      project_id: "2",
      creator_id: "2",
      title: "Local Business Directory App",
      description: "Creating a mobile app to showcase local businesses in our area. Looking for developers and designers who want to support local commerce.",
      required_skills: ["React Native", "UI Design", "Backend Development"],
      status: "in_progress",
      created_at: "2024-01-08T11:30:00Z",
      members: [
        {
          user_id: "2",
          username: "sarah_design",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
        },
        {
          user_id: "1",
          username: "alex_dev",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        }
      ],
      creator: {
        user_id: "2",
        username: "sarah_design",
        profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
      }
    }
  ],

  conversations: [
    {
      conversation_id: "1",
      gig_id: "2",
      gig_title: "Dog Walking - 2 Hours",
      participants: [
        {
          user_id: "1",
          username: "alex_dev",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        },
        {
          user_id: "3",
          username: "mike_helper",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
        }
      ],
      messages: [
        {
          message_id: "1",
          sender_id: "3",
          content: "Hi! I'd love to help with dog walking. I have experience with golden retrievers.",
          timestamp: "2024-01-14T16:00:00Z"
        },
        {
          message_id: "2",
          sender_id: "1",
          content: "That's great! When would be a good time for you this weekend?",
          timestamp: "2024-01-14T16:15:00Z"
        }
      ]
    },
    {
      conversation_id: "2",
      project_id: "1",
      participants: [
        {
          user_id: "1",
          username: "alex_dev",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
        },
        {
          user_id: "2",
          username: "sarah_design",
          profile_picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
        }
      ],
      messages: [
        {
          message_id: "3",
          sender_id: "2",
          content: "I'm interested in helping with the community garden website design!",
          timestamp: "2024-01-11T10:30:00Z"
        },
        {
          message_id: "4",
          sender_id: "1",
          content: "Perfect! I'll send you the project details and we can set up a meeting.",
          timestamp: "2024-01-11T11:00:00Z"
        }
      ]
    }
  ]
};