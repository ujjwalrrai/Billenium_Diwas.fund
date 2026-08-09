import { Database } from './database'

// Helper types for working with Supabase tables
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Specific table types for easier imports
export type Profile = Tables<'profiles'>
export type Startup = Tables<'startups'>
export type Mentor = Tables<'mentors'>
export type Investor = Tables<'investors'>
export type Application = Tables<'applications'>

// Enum types
export type UserRole = Database['public']['Enums']['user_role']
export type StartupStage = Database['public']['Enums']['startup_stage']
export type StartupStatus = Database['public']['Enums']['startup_status']
export type MentorAvailability = Database['public']['Enums']['mentor_availability']
export type ApplicationStatus = Database['public']['Enums']['application_status']

// Extended types with relations
export type StartupWithFounder = Startup & {
  founder: Profile
}

export type MentorWithProfile = Mentor & {
  profile: Profile
}

export type InvestorWithProfile = Investor & {
  profile: Profile
}

export type ApplicationWithDetails = Application & {
  startup: Startup
  applicant: Profile
}
