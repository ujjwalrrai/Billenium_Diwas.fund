import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

/**
 * GET /api/startups - Fetch all active startups
 */
export async function GET() {
  const supabase = await createClient()

  const { data: startups, error } = await supabase
    .from('startups')
    .select(`
      *,
      founder:profiles!startups_founder_id_fkey(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch startups' },
      { status: 500 }
    )
  }

  return NextResponse.json({ startups })
}

/**
 * POST /api/startups - Create a new startup
 */
export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()
  const body = await request.json()

  const { data: startup, error } = await supabase
    .from('startups')
    .insert({
      ...body,
      founder_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: 'Failed to create startup', details: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ startup }, { status: 201 })
}
