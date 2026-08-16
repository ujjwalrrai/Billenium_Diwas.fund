-- Contact Messages Table
-- Add this to your Supabase SQL Editor to create the contact_messages table

CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    ip_address TEXT,
    user_agent TEXT
);

-- Create index for better query performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Row Level Security (RLS) Policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (submit contact form)
CREATE POLICY "Anyone can submit contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

-- Only admins can view messages (you can adjust this based on your needs)
CREATE POLICY "Admins can view all contact messages"
    ON contact_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Only admins can update message status
CREATE POLICY "Admins can update contact messages"
    ON contact_messages FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );
