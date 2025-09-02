-- Install the required extensions if not already installed
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- Create a function to get nearby gigs based on latitude and longitude
CREATE OR REPLACE FUNCTION get_nearby_gigs(
  user_lat FLOAT,
  user_lng FLOAT,
  radius_km FLOAT DEFAULT 10,
  max_results INT DEFAULT 20
)
RETURNS TABLE (
  gig_id TEXT,
  poster_id TEXT,
  title TEXT,
  description TEXT,
  location_proximity TEXT,
  payment_amount DECIMAL,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  assigned_user_id TEXT,
  distance_km FLOAT,
  poster_username TEXT,
  poster_profile_picture_url TEXT
) AS $$
BEGIN
  -- Add latitude and longitude columns to gigs table if they don't exist
  BEGIN
    ALTER TABLE gigs ADD COLUMN IF NOT EXISTS latitude FLOAT;
    ALTER TABLE gigs ADD COLUMN IF NOT EXISTS longitude FLOAT;
  EXCEPTION WHEN OTHERS THEN
    -- Column might already exist
  END;

  RETURN QUERY
  SELECT 
    g.gig_id,
    g.poster_id,
    g.title,
    g.description,
    g.location_proximity,
    g.payment_amount,
    g.status,
    g.created_at,
    g.expires_at,
    g.completed_at,
    g.assigned_user_id,
    earth_distance(
      ll_to_earth(g.latitude, g.longitude),
      ll_to_earth(user_lat, user_lng)
    ) / 1000 AS distance_km,
    u.username AS poster_username,
    u.profile_picture_url AS poster_profile_picture_url
  FROM 
    gigs g
    JOIN users u ON g.poster_id = u.user_id
  WHERE 
    g.status = 'open'
    AND g.latitude IS NOT NULL
    AND g.longitude IS NOT NULL
    AND earth_distance(
      ll_to_earth(g.latitude, g.longitude),
      ll_to_earth(user_lat, user_lng)
    ) / 1000 <= radius_km
  ORDER BY 
    distance_km ASC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

