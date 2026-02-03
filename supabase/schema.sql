-- Vixion Play Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create my_lists table for user's saved content
CREATE TABLE IF NOT EXISTS public.my_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES public.users(email) ON DELETE CASCADE,
  movie_id TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_email, movie_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_my_lists_user_email ON public.my_lists(user_email);
CREATE INDEX IF NOT EXISTS idx_my_lists_added_at ON public.my_lists(added_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.my_lists ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
-- Users can read their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT
  USING (true); -- Allow reading for simplicity in demo

-- Users can insert their own data
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT
  WITH CHECK (true); -- Allow insert for demo/development

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for my_lists table
-- Users can view their own lists
CREATE POLICY "Users can view own lists" ON public.my_lists
  FOR SELECT
  USING (true); -- Simplified for demo - in production, should check auth.uid()

-- Users can insert to their own lists
CREATE POLICY "Users can insert to own lists" ON public.my_lists
  FOR INSERT
  WITH CHECK (true); -- Simplified for demo

-- Users can delete from their own lists
CREATE POLICY "Users can delete from own lists" ON public.my_lists
  FOR DELETE
  USING (true); -- Simplified for demo

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing (optional)
INSERT INTO public.users (email, name) VALUES
  ('demo@vixion.test', 'Demo User')
ON CONFLICT (email) DO NOTHING;

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;
GRANT ALL ON public.my_lists TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
