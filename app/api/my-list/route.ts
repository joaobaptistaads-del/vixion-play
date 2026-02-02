import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { getListFor, addToList } from '../../../lib/storage'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const list = getListFor(session.user.email)
  return NextResponse.json({ list })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const movieId = body?.movieId as string
    if (!movieId) return NextResponse.json({ error: 'movieId required' }, { status: 400 })

    const email = session.user.email
    const list = addToList(email, movieId)

    return NextResponse.json({ ok: true, list })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
