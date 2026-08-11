import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

/**
 * GET /api/profile - Get current user's profile
 */
export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }

  return NextResponse.json({ profile })
}

/**
 * PATCH /api/profile - Update current user's profile
 */
export async function PATCH(request: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const supabase = await createClient()

  // Parse request body
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = await request.json()

  // Remove fields that shouldn't be updated directly
  delete body.id
  delete body.created_at
  delete body.email
  delete body.role

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(body as never)
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      {
        error: 'Failed to update profile',
        details: error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ profile })
}