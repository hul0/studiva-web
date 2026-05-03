-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (for the signup form)
CREATE POLICY "Allow public newsletter signup" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Allow service role to manage
CREATE POLICY "Allow service role to manage newsletter" ON newsletter_subscribers
    USING (true) WITH CHECK (true);
