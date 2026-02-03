import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

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
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'User Example',
    role: 'user' as const,
    createdAt: new Date('2024-02-15').toISOString(),
    lastLogin: new Date('2024-02-28').toISOString(),
    status: 'active' as const
  },
  {
    id: '3',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user' as const,
    createdAt: new Date('2024-01-20').toISOString(),
    lastLogin: new Date('2024-02-20').toISOString(),
    status: 'suspended' as const
  }
]

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(mockUsers)
}
