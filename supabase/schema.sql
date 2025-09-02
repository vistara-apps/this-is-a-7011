-- Create users table
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  farcaster_id TEXT UNIQUE,
  username TEXT NOT NULL,
  display_name TEXT,
  profile_picture_url TEXT,
  location TEXT,
  skills TEXT[] DEFAULT '{}',
  bio TEXT,
  wallet_address TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gigs table
CREATE TABLE gigs (
  gig_id TEXT PRIMARY KEY,
  poster_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location_proximity TEXT,
  payment_amount DECIMAL,
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  assigned_user_id TEXT REFERENCES users(user_id)
);

-- Create gig applicants table
CREATE TABLE gig_applicants (
  gig_id TEXT REFERENCES gigs(gig_id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (gig_id, user_id)
);

-- Create projects table
CREATE TABLE projects (
  project_id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('seeking_members', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create project members table
CREATE TABLE project_members (
  project_id TEXT REFERENCES projects(project_id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('creator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- Create conversations table
CREATE TABLE conversations (
  conversation_id TEXT PRIMARY KEY,
  participants TEXT[] NOT NULL,
  gig_id TEXT REFERENCES gigs(gig_id) ON DELETE SET NULL,
  project_id TEXT REFERENCES projects(project_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  message_id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_by TEXT[] DEFAULT '{}'
);

-- Create payments table
CREATE TABLE payments (
  payment_id TEXT PRIMARY KEY,
  gig_id TEXT REFERENCES gigs(gig_id) ON DELETE SET NULL,
  amount DECIMAL NOT NULL,
  fee_amount DECIMAL NOT NULL,
  fee_percentage INTEGER NOT NULL,
  total_amount DECIMAL NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  payer_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('gig_application', 'project_join', 'message', 'payment')),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_gigs_poster_id ON gigs(poster_id);
CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_projects_creator_id ON projects(creator_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_conversations_participants ON conversations USING GIN(participants);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Create function to update conversation updated_at on new message
CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET updated_at = NOW()
  WHERE conversation_id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update conversation timestamp
CREATE TRIGGER update_conversation_timestamp_trigger
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_conversation_timestamp();

-- Create function to create notification on gig application
CREATE OR REPLACE FUNCTION create_gig_application_notification()
RETURNS TRIGGER AS $$
DECLARE
  gig_title TEXT;
  applicant_username TEXT;
BEGIN
  -- Get gig title
  SELECT title INTO gig_title FROM gigs WHERE gig_id = NEW.gig_id;
  
  -- Get applicant username
  SELECT username INTO applicant_username FROM users WHERE user_id = NEW.user_id;
  
  -- Get gig poster id
  INSERT INTO notifications (
    id,
    user_id,
    type,
    message,
    read,
    data,
    created_at
  )
  SELECT
    gen_random_uuid(),
    poster_id,
    'gig_application',
    applicant_username || ' applied to your gig: ' || gig_title,
    FALSE,
    jsonb_build_object(
      'gig_id', NEW.gig_id,
      'applicant_id', NEW.user_id
    ),
    NOW()
  FROM gigs
  WHERE gig_id = NEW.gig_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for gig application notifications
CREATE TRIGGER create_gig_application_notification_trigger
AFTER INSERT ON gig_applicants
FOR EACH ROW
EXECUTE FUNCTION create_gig_application_notification();

-- Create function to create notification on project join
CREATE OR REPLACE FUNCTION create_project_join_notification()
RETURNS TRIGGER AS $$
DECLARE
  project_title TEXT;
  member_username TEXT;
BEGIN
  -- Get project title
  SELECT title INTO project_title FROM projects WHERE project_id = NEW.project_id;
  
  -- Get member username
  SELECT username INTO member_username FROM users WHERE user_id = NEW.user_id;
  
  -- Create notification for project creator
  IF NEW.role = 'member' THEN
    INSERT INTO notifications (
      id,
      user_id,
      type,
      message,
      read,
      data,
      created_at
    )
    SELECT
      gen_random_uuid(),
      creator_id,
      'project_join',
      member_username || ' joined your project: ' || project_title,
      FALSE,
      jsonb_build_object(
        'project_id', NEW.project_id,
        'member_id', NEW.user_id
      ),
      NOW()
    FROM projects
    WHERE project_id = NEW.project_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for project join notifications
CREATE TRIGGER create_project_join_notification_trigger
AFTER INSERT ON project_members
FOR EACH ROW
EXECUTE FUNCTION create_project_join_notification();

-- Create function to create notification on new message
CREATE OR REPLACE FUNCTION create_message_notification()
RETURNS TRIGGER AS $$
DECLARE
  sender_username TEXT;
  conversation_participants TEXT[];
BEGIN
  -- Get sender username
  SELECT username INTO sender_username FROM users WHERE user_id = NEW.sender_id;
  
  -- Get conversation participants
  SELECT participants INTO conversation_participants FROM conversations WHERE conversation_id = NEW.conversation_id;
  
  -- Create notification for all participants except sender
  INSERT INTO notifications (
    id,
    user_id,
    type,
    message,
    read,
    data,
    created_at
  )
  SELECT
    gen_random_uuid(),
    participant,
    'message',
    'New message from ' || sender_username,
    FALSE,
    jsonb_build_object(
      'conversation_id', NEW.conversation_id,
      'message_id', NEW.message_id,
      'sender_id', NEW.sender_id
    ),
    NOW()
  FROM unnest(conversation_participants) AS participant
  WHERE participant != NEW.sender_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for message notifications
CREATE TRIGGER create_message_notification_trigger
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION create_message_notification();

-- Create function to create notification on payment
CREATE OR REPLACE FUNCTION create_payment_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Create notification for gig poster
  INSERT INTO notifications (
    id,
    user_id,
    type,
    message,
    read,
    data,
    created_at
  )
  SELECT
    gen_random_uuid(),
    poster_id,
    'payment',
    'Payment of $' || NEW.amount || ' received for gig: ' || title,
    FALSE,
    jsonb_build_object(
      'gig_id', NEW.gig_id,
      'payment_id', NEW.payment_id,
      'amount', NEW.amount
    ),
    NOW()
  FROM gigs
  WHERE gig_id = NEW.gig_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for payment notifications
CREATE TRIGGER create_payment_notification_trigger
AFTER INSERT ON payments
FOR EACH ROW
WHEN (NEW.status = 'completed')
EXECUTE FUNCTION create_payment_notification();

