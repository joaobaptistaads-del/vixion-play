'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminAnalytics() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<{
    views: { today: number; week: number; month: number; total: number };
    topContent: Array<{ title: string; views: number }>;
    userActivity: Array<{ time: string; users: number }>;
    deviceStats: { mobile: number; desktop: number; tablet: number };
  }>({
    views: { today: 0, week: 0, month: 0, total: 0 },
    topContent: [],
    userActivity: [],
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 }
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/')
      return
    }

    // Mock analytics data
    setAnalytics({
      views: { today: 1543, week: 8234, month: 45678, total: 234567 },
      topContent: [
        { title: 'A Última Aurora', views: 15234 },
        { title: 'Sombras do Passado', views: 12456 },
        { title: 'Horizonte Perdido', views: 9876 }
      ],
      userActivity: [
        { time: '00:00', users: 45 },
        { time: '06:00', users: 123 },
        { time: '12:00', users: 456 },
        { time: '18:00', users: 789 },
        { time: '23:00', users: 234 }
      ],
      deviceStats: { mobile: 45, desktop: 40, tablet: 15 }
    })
  }, [session, status, router])

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white text-xl">Carregando...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <Link href="/admin" className="text-emerald-500 hover:text-emerald-400">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Visualizações Hoje</h3>
            <p className="text-4xl font-bold text-emerald-500">{analytics.views.today.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Esta Semana</h3>
            <p className="text-4xl font-bold text-blue-500">{analytics.views.week.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Este Mês</h3>
            <p className="text-4xl font-bold text-purple-500">{analytics.views.month.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Total</h3>
            <p className="text-4xl font-bold text-orange-500">{analytics.views.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">Conteúdo Mais Visto</h2>
            <div className="space-y-4">
              {analytics.topContent.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{item.title}</span>
                  <span className="text-emerald-500 font-bold">{item.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">Dispositivos</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>📱 Mobile</span>
                <span className="text-blue-500 font-bold">{analytics.deviceStats.mobile}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>💻 Desktop</span>
                <span className="text-purple-500 font-bold">{analytics.deviceStats.desktop}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>📱 Tablet</span>
                <span className="text-orange-500 font-bold">{analytics.deviceStats.tablet}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
