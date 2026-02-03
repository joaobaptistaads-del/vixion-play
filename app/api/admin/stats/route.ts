import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock stats - integre com seu banco de dados real
  const stats = {
    totalUsers: 1247,
    totalContent: 156,
    activeUsers: 892,
    recentActivity: 45
  }

  return NextResponse.json(stats)
}
