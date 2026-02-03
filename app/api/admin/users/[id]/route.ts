import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'

// Mock data - substitua por banco de dados real
let mockUsers = [
  {
    id: '1',
    email: 'admin@vixionplay.com',
    name: 'Admin',
    role: 'admin' as const,
    createdAt: new Date('2024-01-01').toISOString(),
    lastLogin: new Date().toISOString(),
    status: 'active' as const
  }
]

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const index = mockUsers.findIndex(u => u.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  mockUsers[index] = { ...mockUsers[index], ...data }

  return NextResponse.json(mockUsers[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  mockUsers = mockUsers.filter(u => u.id !== params.id)

  return NextResponse.json({ success: true })
}
