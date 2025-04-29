-- Drop just analytics_events if exists
DROP TABLE IF EXISTS analytics_events CASCADE;

-- Create analytics_events with exact schema
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add analytics_events policy
CREATE POLICY "Enable analytics read for authenticated" 
ON analytics_events FOR SELECT
USING (auth.role() = 'authenticated');

-- Drop test_table if exists
DROP TABLE IF EXISTS test_table CASCADE;

-- Create test_table with complete schema
CREATE TABLE test_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  test_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  test_count INTEGER DEFAULT 0
);

-- Create exact test_table_with_users view from database
CREATE OR REPLACE VIEW test_table_with_users AS
SELECT 
  t.id,
  t.user_id,
  t.test_data,
  t.created_at,
  t.updated_at,
  t.is_active,
  t.test_count,
  u.email AS user_email,
  u.created_at AS user_created_at
FROM test_table t
LEFT JOIN auth.users u ON t.user_id = u.id;

-- Drop user_profiles if exists
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user_profiles with complete schema
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  failed_login_count INTEGER DEFAULT 0,
  timezone TEXT,
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);

-- Create policies
CREATE POLICY "Enable read access for authenticated users" 
ON user_profiles FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable users to update their own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);

-- Drop user_sessions if exists
DROP TABLE IF EXISTS user_sessions CASCADE;

-- Create user_sessions with complete schema
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_info TEXT,
  ip_address TEXT,
  last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  request_count INTEGER DEFAULT 0,
  avg_response_time NUMERIC(10,2),
  device_type TEXT
);

-- Create indexes
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);

-- Create policies
CREATE POLICY "Enable session access for owner"
ON user_sessions
USING (auth.uid() = user_id);

-- Drop subscription_plans if exists
DROP TABLE IF EXISTS subscription_plans CASCADE;

-- Create subscription_plans with complete schema
CREATE TABLE subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  billing_cycle INTERVAL NOT NULL,
  features JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Drop user_subscriptions if exists
DROP TABLE IF EXISTS user_subscriptions CASCADE;

-- Create user_subscriptions with complete schema
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES subscription_plans(id),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  renewal_count INTEGER DEFAULT 0,
  total_paid NUMERIC(10,2) DEFAULT 0,
  cancellation_reason TEXT
);

-- Create indexes
CREATE INDEX idx_user_subscriptions_period_end ON user_subscriptions(current_period_end);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);

-- Create policies
CREATE POLICY "Enable subscription access for owner"
ON user_subscriptions
USING (auth.uid() = user_id);