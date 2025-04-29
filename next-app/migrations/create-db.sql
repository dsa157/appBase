
-- Main Database Schema Migration
-- This script creates all core tables for the application

-- Tables Overview:
-- 1. test_table - Legacy test table (to be deprecated)
-- 2. user_profiles - Extends auth.users with user profile data
-- 3. user_sessions - Tracks active user sessions
-- 4. subscription_plans - Defines available subscription tiers
-- 5. user_subscriptions - Manages user subscription status
-- 6. analytics_events - Tracks user behavior and system metrics
-- 7. audit_logs - Tracks all system changes

-- Notes:
-- * All tables use UUID primary keys
-- * Timestamps use TIMESTAMPTZ for timezone awareness
-- * RLS (Row Level Security) enabled where appropriate
-- * Cascade deletes configured for related records

DROP TABLE IF EXISTS public.test_table;
CREATE TABLE public.test_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  test_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  test_count INTEGER DEFAULT 0
);

-- Enable Row Level Security if needed
ALTER TABLE public.test_table ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE VIEW public.test_table_with_users AS
SELECT 
  t.*,
  u.email AS user_email,
  u.created_at AS user_created_at
FROM public.test_table t
LEFT JOIN auth.users u ON t.user_id = u.id;

-- Clean up existing tables if they exist
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP TABLE IF EXISTS public.subscription_plans CASCADE;
DROP TABLE IF EXISTS public.user_subscriptions CASCADE;
DROP TABLE IF EXISTS public.analytics_events CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;

-- Extend auth.users with profile data
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  -- Usage metrics
  last_active_at TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  failed_login_count INTEGER DEFAULT 0,
  timezone TEXT,
  -- Audit trail
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Track active sessions
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_info TEXT,
  ip_address TEXT,
  last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  -- Performance metrics
  request_count INTEGER DEFAULT 0,
  avg_response_time NUMERIC(10,2),
  device_type TEXT
);
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Subscription plans
CREATE TABLE public.subscription_plans (
  id TEXT PRIMARY KEY,  -- e.g. 'basic', 'pro'
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  billing_cycle INTERVAL NOT NULL,  -- e.g. '1 month', '1 year'
  features JSONB NOT NULL DEFAULT '{}'
);

-- User subscriptions
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  -- Business metrics
  renewal_count INTEGER DEFAULT 0,
  total_paid NUMERIC(10,2) DEFAULT 0,
  cancellation_reason TEXT
);
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Analytics events
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Audit logs for tracking all system changes
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create useful views
CREATE OR REPLACE VIEW public.active_subscriptions AS
SELECT us.*, sp.name, sp.price, sp.billing_cycle
FROM public.user_subscriptions us
JOIN public.subscription_plans sp ON us.plan_id = sp.id
WHERE us.status = 'active' AND us.current_period_end > NOW();

-- Seed default subscription plans
INSERT INTO public.subscription_plans (id, name, description, price, billing_cycle, features)
VALUES
  ('free', 'Free', 'Basic access', 0.00, '1 month', '{"storage_limit": 1000}'),
  ('pro', 'Pro', 'Full features', 9.99, '1 month', '{"storage_limit": 10000}'),
  ('enterprise', 'Enterprise', 'Unlimited', 29.99, '1 month', '{"storage_limit": null}');

-- Add performance indexes
CREATE INDEX idx_user_profiles_username ON public.user_profiles (username);
CREATE INDEX idx_user_profiles_created_at ON public.user_profiles (created_at);
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions (user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions (status);
CREATE INDEX idx_user_subscriptions_period_end ON public.user_subscriptions (current_period_end);

-- Define RLS policies
CREATE POLICY "Enable read access for authenticated users" ON public.user_profiles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable users to update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable session access for owner" ON public.user_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Enable subscription access for owner" ON public.user_subscriptions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Enable analytics read for authenticated" ON public.analytics_events
  FOR SELECT USING (auth.role() = 'authenticated');

-- Add cascade rules for audit trail
ALTER TABLE public.user_profiles 
  ALTER COLUMN created_by SET DEFAULT auth.uid(),
  ALTER COLUMN created_by SET NOT NULL;

ALTER TABLE public.user_profiles 
  ADD CONSTRAINT fk_user_profiles_created_by FOREIGN KEY (created_by) 
  REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.user_profiles 
  ADD CONSTRAINT fk_user_profiles_updated_by FOREIGN KEY (updated_by) 
  REFERENCES auth.users(id) ON DELETE SET NULL;