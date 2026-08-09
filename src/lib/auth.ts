import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/supabase'

/**
 * Get the current authenticated user from the server
 * Use this in Server Components and Server Actions
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

/**
 * Get the current user's profile with role information
 * Use this in Server Components and Server Actions
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

/**
 * Check if the current user has a specific role
 * @param role - The role to check (member, admin, investor, mentor)
 */
export async function hasRole(role: 'member' | 'admin' | 'investor' | 'mentor'): Promise<boolean> {
  const profile = await getCurrentProfile()
  if (!profile) return false
  return profile.role === role
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin() {
  return hasRole('admin')
}
