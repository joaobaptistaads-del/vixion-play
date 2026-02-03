import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { supabase } from '../../../lib/supabaseClient'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const email = session.user.email
  const { data, error } = await supabase
    .from('my_lists')
    .select('movie_id')
    .eq('user_email', email)
    .order('added_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const list = (data || []).map((r: any) => r.movie_id)
  return NextResponse.json({ list })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const movieId = body?.movieId as string
    if (!movieId) return NextResponse.json({ error: 'movieId required' }, { status: 400 })

    const email = session.user.email

    // Ensure user exists in users table
    await supabase.from('users').upsert({ email, name: session.user.name || null }, { onConflict: 'email' })

    // Check existing entry
    const { data: existing } = await supabase
      .from('my_lists')
      .select('id')
      .eq('user_email', email)
      .eq('movie_id', movieId)
      .limit(1)

    if (!existing || existing.length === 0) {
      const { error: insertError } = await supabase.from('my_lists').insert([{ user_email: email, movie_id: movieId }])
      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    // Return updated list
    const { data, error } = await supabase
      .from('my_lists')
      .select('movie_id')
      .eq('user_email', email)
      .order('added_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const list = (data || []).map((r: any) => r.movie_id)
    return NextResponse.json({ ok: true, list })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
