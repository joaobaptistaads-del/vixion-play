import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'

// Mock data - substitua por banco de dados real
let mockContents = [
  {
    id: '1',
    title: 'A Última Aurora',
    type: 'movie' as const,
    genre: 'Ficção Científica',
    year: 2024,
    rating: 8.9,
    thumbnail: 'https://image.tmdb.org/t/p/w500/example1.jpg',
    videoUrl: '/videos/aurora.mp4',
    description: 'Uma jornada épica através das estrelas.',
    featured: true
  }
]

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const index = mockContents.findIndex(c => c.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  mockContents[index] = { ...mockContents[index], ...data }

  return NextResponse.json(mockContents[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  mockContents = mockContents.filter(c => c.id !== params.id)

  return NextResponse.json({ success: true })
}
