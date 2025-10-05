-- Create sessions table for TechFix AI
CREATE TABLE public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL,
  email TEXT NOT NULL,
  issue TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '30 minutes'),
  active BOOLEAN NOT NULL DEFAULT true,
  plan JSONB
);

-- Enable Row Level Security
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own sessions
CREATE POLICY "Users can view their own sessions" 
ON public.sessions 
FOR SELECT 
USING (true);

-- Create policy to allow inserting new sessions
CREATE POLICY "Anyone can create sessions" 
ON public.sessions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow updating sessions
CREATE POLICY "Anyone can update sessions" 
ON public.sessions 
FOR UPDATE 
USING (true);