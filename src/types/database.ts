export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/**
 * Database schema types for Supabase
 * These types should match your actual database schema
 * You can generate these automatically using: npx supabase gen types typescript --project-id YOUR_PROJECT_ID
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'member' | 'admin' | 'investor' | 'mentor'
          bio: string | null
          website: string | null
          linkedin_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'member' | 'admin' | 'investor' | 'mentor'
          bio?: string | null
          website?: string | null
          linkedin_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'member' | 'admin' | 'investor' | 'mentor'
          bio?: string | null
          website?: string | null
          linkedin_url?: string | null
        }
      }
      startups: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          founder_id: string
          logo_url: string | null
          pitch_deck_url: string | null
          website: string | null
          stage: 'idea' | 'mvp' | 'early_stage' | 'growth' | 'scaling'
          industry: string
          funding_goal: number | null
          current_funding: number | null
          status: 'active' | 'inactive' | 'funded'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          founder_id: string
          logo_url?: string | null
          pitch_deck_url?: string | null
          website?: string | null
          stage?: 'idea' | 'mvp' | 'early_stage' | 'growth' | 'scaling'
          industry: string
          funding_goal?: number | null
          current_funding?: number | null
          status?: 'active' | 'inactive' | 'funded'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          founder_id?: string
          logo_url?: string | null
          pitch_deck_url?: string | null
          website?: string | null
          stage?: 'idea' | 'mvp' | 'early_stage' | 'growth' | 'scaling'
          industry?: string
          funding_goal?: number | null
          current_funding?: number | null
          status?: 'active' | 'inactive' | 'funded'
        }
      }
      mentors: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          profile_id: string
          expertise: string[]
          years_of_experience: number
          availability: 'available' | 'limited' | 'unavailable'
          hourly_rate: number | null
          bio: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          profile_id: string
          expertise: string[]
          years_of_experience: number
          availability?: 'available' | 'limited' | 'unavailable'
          hourly_rate?: number | null
          bio: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          profile_id?: string
          expertise?: string[]
          years_of_experience?: number
          availability?: 'available' | 'limited' | 'unavailable'
          hourly_rate?: number | null
          bio?: string
        }
      }
      investors: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          profile_id: string
          investment_focus: string[]
          ticket_size_min: number | null
          ticket_size_max: number | null
          portfolio_companies: number
          bio: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          profile_id: string
          investment_focus: string[]
          ticket_size_min?: number | null
          ticket_size_max?: number | null
          portfolio_companies?: number
          bio: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          profile_id?: string
          investment_focus?: string[]
          ticket_size_min?: number | null
          ticket_size_max?: number | null
          portfolio_companies?: number
          bio?: string
        }
      }
      applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          startup_id: string
          applicant_type: 'mentor' | 'investor'
          applicant_id: string
          status: 'pending' | 'accepted' | 'rejected'
          message: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          startup_id: string
          applicant_type: 'mentor' | 'investor'
          applicant_id: string
          status?: 'pending' | 'accepted' | 'rejected'
          message?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          startup_id?: string
          applicant_type?: 'mentor' | 'investor'
          applicant_id?: string
          status?: 'pending' | 'accepted' | 'rejected'
          message?: string | null
          notes?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          message: string
          status: 'new' | 'read' | 'replied'
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          message: string
          status?: 'new' | 'read' | 'replied'
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          message?: string
          status?: 'new' | 'read' | 'replied'
          ip_address?: string | null
          user_agent?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'member' | 'admin' | 'investor' | 'mentor'
      startup_stage: 'idea' | 'mvp' | 'early_stage' | 'growth' | 'scaling'
      startup_status: 'active' | 'inactive' | 'funded'
      mentor_availability: 'available' | 'limited' | 'unavailable'
      application_status: 'pending' | 'accepted' | 'rejected'
    }
  }
}
