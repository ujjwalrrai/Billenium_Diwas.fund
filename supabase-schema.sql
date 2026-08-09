-- Billennium Divas Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_role AS ENUM ('member', 'admin', 'investor', 'mentor');
CREATE TYPE startup_stage AS ENUM ('idea', 'mvp', 'early_stage', 'growth', 'scaling');
CREATE TYPE startup_status AS ENUM ('active', 'inactive', 'funded');
CREATE TYPE mentor_availability AS ENUM ('available', 'limited', 'unavailable');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'member',
    bio TEXT,
    website TEXT,
    linkedin_url TEXT
);

-- Startups table
CREATE TABLE startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    founder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    logo_url TEXT,
    pitch_deck_url TEXT,
    website TEXT,
    stage startup_stage DEFAULT 'idea',
    industry TEXT NOT NULL,
    funding_goal NUMERIC,
    current_funding NUMERIC DEFAULT 0,
    status startup_status DEFAULT 'active'
);

-- Mentors table
CREATE TABLE mentors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    expertise TEXT[] NOT NULL,
    years_of_experience INTEGER NOT NULL,
    availability mentor_availability DEFAULT 'available',
    hourly_rate NUMERIC,
    bio TEXT NOT NULL,
    UNIQUE(profile_id)
);

-- Investors table
CREATE TABLE investors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    investment_focus TEXT[] NOT NULL,
    ticket_size_min NUMERIC,
    ticket_size_max NUMERIC,
    portfolio_companies INTEGER DEFAULT 0,
    bio TEXT NOT NULL,
    UNIQUE(profile_id)
);

-- Applications table
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    applicant_type TEXT NOT NULL CHECK (applicant_type IN ('mentor', 'investor')),
    applicant_id UUID NOT NULL,
    status application_status DEFAULT 'pending',
    message TEXT,
    notes TEXT
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_startups_updated_at BEFORE UPDATE ON startups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentors_updated_at BEFORE UPDATE ON mentors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investors_updated_at BEFORE UPDATE ON investors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_startups_founder ON startups(founder_id);
CREATE INDEX idx_startups_status ON startups(status);
CREATE INDEX idx_mentors_profile ON mentors(profile_id);
CREATE INDEX idx_investors_profile ON investors(profile_id);
CREATE INDEX idx_applications_startup ON applications(startup_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Startups policies
CREATE POLICY "Startups are viewable by everyone"
    ON startups FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create startups"
    ON startups FOR INSERT
    WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Founders can update own startups"
    ON startups FOR UPDATE
    USING (auth.uid() = founder_id);

CREATE POLICY "Founders can delete own startups"
    ON startups FOR DELETE
    USING (auth.uid() = founder_id);

-- Mentors policies
CREATE POLICY "Mentors are viewable by everyone"
    ON mentors FOR SELECT
    USING (true);

CREATE POLICY "Users can create own mentor profile"
    ON mentors FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own mentor profile"
    ON mentors FOR UPDATE
    USING (auth.uid() = profile_id);

-- Investors policies
CREATE POLICY "Investors are viewable by everyone"
    ON investors FOR SELECT
    USING (true);

CREATE POLICY "Users can create own investor profile"
    ON investors FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own investor profile"
    ON investors FOR UPDATE
    USING (auth.uid() = profile_id);

-- Applications policies
CREATE POLICY "Applications viewable by startup founder and applicant"
    ON applications FOR SELECT
    USING (
        auth.uid() IN (
            SELECT founder_id FROM startups WHERE id = startup_id
        )
        OR auth.uid() = applicant_id
    );

CREATE POLICY "Authenticated users can create applications"
    ON applications FOR INSERT
    WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Startup founders can update applications to their startups"
    ON applications FOR UPDATE
    USING (
        auth.uid() IN (
            SELECT founder_id FROM startups WHERE id = startup_id
        )
    );

-- Storage bucket for pitch decks and images
INSERT INTO storage.buckets (id, name, public)
VALUES ('pitch-decks', 'pitch-decks', false);

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true);

-- Storage policies for pitch decks (private)
CREATE POLICY "Authenticated users can upload pitch decks"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'pitch-decks'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view pitch decks they have access to"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'pitch-decks' AND auth.role() = 'authenticated');

-- Storage policies for avatars (public)
CREATE POLICY "Anyone can view avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Storage policies for logos (public)
CREATE POLICY "Anyone can view logos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'logos');

CREATE POLICY "Authenticated users can upload logos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'logos'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update logos they own"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'logos'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );
