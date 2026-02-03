'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminReports() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/')
      return
    }
  }, [session, status, router])

  const handleGenerateReport = (type: string) => {
    alert(`Gerando relatório de ${type}...`)
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white text-xl">Carregando...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <Link href="/admin" className="text-emerald-500 hover:text-emerald-400">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">📊 Relatório de Usuários</h2>
            <p className="text-zinc-400 mb-4">Dados completos sobre usuários ativos, inativos e estatísticas de uso</p>
            <button
              onClick={() => handleGenerateReport('usuários')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
            >
              Gerar Relatório
            </button>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">🎬 Relatório de Conteúdo</h2>
            <p className="text-zinc-400 mb-4">Análise de performance de conteúdo, visualizações e engajamento</p>
            <button
              onClick={() => handleGenerateReport('conteúdo')}
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              Gerar Relatório
            </button>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">💰 Relatório Financeiro</h2>
            <p className="text-zinc-400 mb-4">Receitas, assinaturas e análise financeira detalhada</p>
            <button
              onClick={() => handleGenerateReport('financeiro')}
              className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              Gerar Relatório
            </button>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">📈 Relatório de Crescimento</h2>
            <p className="text-zinc-400 mb-4">Análise de crescimento mensal, trimestral e anual</p>
            <button
              onClick={() => handleGenerateReport('crescimento')}
              className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
            >
              Gerar Relatório
            </button>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">🔒 Relatório de Segurança</h2>
            <p className="text-zinc-400 mb-4">Logs de acesso, tentativas de login e atividades suspeitas</p>
            <button
              onClick={() => handleGenerateReport('segurança')}
              className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              Gerar Relatório
            </button>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-bold mb-3">📱 Relatório de Dispositivos</h2>
            <p className="text-zinc-400 mb-4">Estatísticas de uso por dispositivo e plataforma</p>
            <button
              onClick={() => handleGenerateReport('dispositivos')}
              className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
            >
              Gerar Relatório
            </button>
          </div>
        </div>

        <div className="mt-8 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">📋 Relatórios Recentes</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Relatório de Usuários - Janeiro 2026</span>
              <button className="text-emerald-500 hover:text-emerald-400">Baixar PDF</button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Relatório de Conteúdo - Janeiro 2026</span>
              <button className="text-emerald-500 hover:text-emerald-400">Baixar PDF</button>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Relatório Financeiro - Dezembro 2025</span>
              <button className="text-emerald-500 hover:text-emerald-400">Baixar PDF</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
