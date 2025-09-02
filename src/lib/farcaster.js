// Farcaster client for authentication and API calls

// Get Neynar API key from environment variables
const neynarApiKey = import.meta.env.VITE_NEYNAR_API_KEY;

// Check if Farcaster is configured
export const isFarcasterConfigured = () => {
  return neynarApiKey && neynarApiKey !== 'your_neynar_api_key';
};

// Create Farcaster client
export const farcasterClient = {
  // Get user by FID
  getUserByFid: async (fid) => {
    if (!isFarcasterConfigured()) {
      // Return mock data for development
      return {
        fid,
        username: `user_${fid}`,
        displayName: `User ${fid}`,
        pfp: { url: `https://api.dicebear.com/7.x/avataaars/svg?seed=farcaster_${fid}` },
        profile: {
          bio: { text: 'Farcaster user exploring GigsLocal' },
          location: { placeId: 'San Francisco, CA' }
        },
        verifications: [],
        followerCount: 42,
        followingCount: 37
      };
    }
    
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/user/by-fid?fid=${fid}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'api_key': neynarApiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching Farcaster user:', error);
      throw error;
    }
  },
  
  // Get user by username
  getUserByUsername: async (username) => {
    if (!isFarcasterConfigured()) {
      // Return mock data for development
      return {
        fid: Date.now(),
        username,
        displayName: username,
        pfp: { url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` },
        profile: {
          bio: { text: 'Farcaster user exploring GigsLocal' },
          location: { placeId: 'San Francisco, CA' }
        },
        verifications: [],
        followerCount: 42,
        followingCount: 37
      };
    }
    
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/user/by-username?username=${username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'api_key': neynarApiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching Farcaster user:', error);
      throw error;
    }
  },
  
  // Get user's followers
  getUserFollowers: async (fid, limit = 10) => {
    if (!isFarcasterConfigured()) {
      // Return mock data for development
      return Array.from({ length: limit }, (_, i) => ({
        fid: Date.now() + i,
        username: `follower_${i}`,
        displayName: `Follower ${i}`,
        pfp: { url: `https://api.dicebear.com/7.x/avataaars/svg?seed=follower_${i}` }
      }));
    }
    
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/followers?fid=${fid}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'api_key': neynarApiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch followers: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching Farcaster followers:', error);
      throw error;
    }
  },
  
  // Get user's following
  getUserFollowing: async (fid, limit = 10) => {
    if (!isFarcasterConfigured()) {
      // Return mock data for development
      return Array.from({ length: limit }, (_, i) => ({
        fid: Date.now() + i,
        username: `following_${i}`,
        displayName: `Following ${i}`,
        pfp: { url: `https://api.dicebear.com/7.x/avataaars/svg?seed=following_${i}` }
      }));
    }
    
    try {
      const response = await fetch(`https://api.neynar.com/v2/farcaster/following?fid=${fid}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'api_key': neynarApiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch following: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching Farcaster following:', error);
      throw error;
    }
  }
};

