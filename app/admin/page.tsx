'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalUsers: number
  totalContent: number
  activeUsers: number
  recentActivity: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalContent: 0,
    activeUsers: 0,
    recentActivity: 0
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/')
      return
    }

    // Load stats
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error)
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Link href="/" className="text-emerald-500 hover:text-emerald-400">
            ← Voltar ao Site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Total de Usuários</h3>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Conteúdo Total</h3>
            <p className="text-4xl font-bold">{stats.totalContent}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Usuários Ativos</h3>
            <p className="text-4xl font-bold">{stats.activeUsers}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-400 text-sm mb-2">Atividade Recente</h3>
            <p className="text-4xl font-bold">{stats.recentActivity}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/content" className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 rounded-lg hover:from-emerald-500 hover:to-emerald-600 transition-all">
            <h2 className="text-2xl font-bold mb-2">📺 Gerenciar Conteúdo</h2>
            <p className="text-emerald-100">Adicionar, editar ou remover títulos</p>
          </Link>

          <Link href="/admin/users" className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all">
            <h2 className="text-2xl font-bold mb-2">👥 Gerenciar Usuários</h2>
            <p className="text-blue-100">Visualizar e administrar usuários</p>
          </Link>

          <Link href="/admin/analytics" className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all">
            <h2 className="text-2xl font-bold mb-2">📊 Analytics</h2>
            <p className="text-purple-100">Visualizar estatísticas detalhadas</p>
          </Link>

          <Link href="/admin/settings" className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all">
            <h2 className="text-2xl font-bold mb-2">⚙️ Configurações</h2>
            <p className="text-orange-100">Configurações gerais do sistema</p>
          </Link>

          <Link href="/admin/reports" className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-lg hover:from-red-500 hover:to-red-600 transition-all">
            <h2 className="text-2xl font-bold mb-2">📋 Relatórios</h2>
            <p className="text-red-100">Gerar relatórios detalhados</p>
          </Link>

          <Link href="/admin/backup" className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-lg hover:from-teal-500 hover:to-teal-600 transition-all">
            <h2 className="text-2xl font-bold mb-2">💾 Backup</h2>
            <p className="text-teal-100">Gerenciar backups do sistema</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
