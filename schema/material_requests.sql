-- Create material_requests table
CREATE TABLE IF NOT EXISTS material_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    material_name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending'
);

-- Note: RLS is disabled for this table as per user request.
ALTER TABLE material_requests DISABLE ROW LEVEL SECURITY;
