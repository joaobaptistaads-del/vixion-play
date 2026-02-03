import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

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
  },
  {
    id: '2',
    title: 'Sombras do Passado',
    type: 'series' as const,
    genre: 'Drama',
    year: 2023,
    rating: 9.2,
    thumbnail: 'https://image.tmdb.org/t/p/w500/example2.jpg',
    videoUrl: '/videos/sombras.mp4',
    description: 'Mistérios do passado voltam para assombrar.',
    featured: false
  }
]

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(mockContents)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const newContent = {
    id: Date.now().toString(),
    ...data
  }

  mockContents.push(newContent)

  return NextResponse.json(newContent, { status: 201 })
}
