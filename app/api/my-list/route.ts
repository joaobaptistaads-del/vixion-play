import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { supabase } from '../../../lib/supabaseClient'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const email = session.user.email
    const { data, error } = await supabase
      .from('my_lists')
      .select('movie_id')
      .eq('user_email', email)
      .order('added_at', { ascending: false })

    if (error) {
      console.error('Supabase error (GET):', error)
      return NextResponse.json({ 
        error: 'Failed to fetch list', 
        details: error.message 
      }, { status: 500 })
    }

    const list = (data || []).map((r: any) => r.movie_id)
    return NextResponse.json({ list })
  } catch (e) {
    console.error('Unexpected error (GET):', e)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: e instanceof Error ? e.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const movieId = body?.movieId as string
    if (!movieId) {
      return NextResponse.json({ error: 'movieId required' }, { status: 400 })
    }

    const email = session.user.email

    // Ensure user exists in users table
    const { error: upsertError } = await supabase
      .from('users')
      .upsert({ email, name: session.user.name || null }, { onConflict: 'email' })
    
    if (upsertError) {
      console.error('Failed to upsert user:', upsertError)
      return NextResponse.json({ 
        error: 'Failed to create/update user',
        details: upsertError.message 
      }, { status: 500 })
    }

    // Check existing entry
    const { data: existing, error: checkError } = await supabase
      .from('my_lists')
      .select('id')
      .eq('user_email', email)
      .eq('movie_id', movieId)
      .limit(1)

    if (checkError) {
      console.error('Failed to check existing entry:', checkError)
      return NextResponse.json({ 
        error: 'Failed to check existing entry',
        details: checkError.message 
      }, { status: 500 })
    }

    // Insert if doesn't exist
    if (!existing || existing.length === 0) {
      const { error: insertError } = await supabase
        .from('my_lists')
        .insert([{ user_email: email, movie_id: movieId }])
      
      if (insertError) {
        console.error('Failed to insert:', insertError)
        return NextResponse.json({ 
          error: 'Failed to add to list',
          details: insertError.message 
        }, { status: 500 })
      }
    }

    // Return updated list
    const { data, error } = await supabase
      .from('my_lists')
      .select('movie_id')
      .eq('user_email', email)
      .order('added_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch updated list:', error)
      return NextResponse.json({ 
        error: 'Failed to fetch updated list',
        details: error.message 
      }, { status: 500 })
    }

    const list = (data || []).map((r: any) => r.movie_id)
    return NextResponse.json({ ok: true, list })
  } catch (e) {
    console.error('Unexpected error (POST):', e)
    return NextResponse.json({ 
      error: 'Invalid request',
      details: e instanceof Error ? e.message : 'Unknown error'
    }, { status: 400 })
  }
}
