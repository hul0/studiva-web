-- Verified Creator Partner Program Applications
-- Run this in Supabase SQL Editor to create the table.
-- RLS is intentionally disabled for this table.

CREATE TABLE IF NOT EXISTS verified_creator_applications (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  weekly_uploads INTEGER    NOT NULL DEFAULT 0,
  social_links  TEXT,                           -- optional, comma-separated or JSON
  has_team      BOOLEAN     NOT NULL DEFAULT FALSE,
  team_size     INTEGER     DEFAULT 0,
  status        TEXT        NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on email for quick duplicate lookups
CREATE INDEX IF NOT EXISTS idx_vca_email ON verified_creator_applications (email);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_vca_updated_at
  BEFORE UPDATE ON verified_creator_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS (as requested)
ALTER TABLE verified_creator_applications DISABLE ROW LEVEL SECURITY;
