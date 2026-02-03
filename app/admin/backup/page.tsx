'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminBackup() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/')
      return
    }
  }, [session, status, router])

  const handleBackup = (type: string) => {
    alert(`Iniciando backup de ${type}...`)
  }

  const handleRestore = (backup: string) => {
    if (confirm(`Tem certeza que deseja restaurar o backup de ${backup}?`)) {
      alert(`Restaurando backup de ${backup}...`)
    }
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
          <h1 className="text-3xl font-bold">Backup & Restore</h1>
          <Link href="/admin" className="text-emerald-500 hover:text-emerald-400">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Criar Novo Backup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleBackup('banco de dados')}
              className="bg-emerald-600 hover:bg-emerald-700 p-6 rounded-lg transition-colors"
            >
              <div className="text-4xl mb-2">💾</div>
              <div className="font-bold">Banco de Dados</div>
              <div className="text-sm text-emerald-200 mt-1">Backup completo do BD</div>
            </button>

            <button
              onClick={() => handleBackup('arquivos')}
              className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg transition-colors"
            >
              <div className="text-4xl mb-2">📁</div>
              <div className="font-bold">Arquivos</div>
              <div className="text-sm text-blue-200 mt-1">Vídeos e mídias</div>
            </button>

            <button
              onClick={() => handleBackup('completo')}
              className="bg-purple-600 hover:bg-purple-700 p-6 rounded-lg transition-colors"
            >
              <div className="text-4xl mb-2">🗂️</div>
              <div className="font-bold">Sistema Completo</div>
              <div className="text-sm text-purple-200 mt-1">Backup total</div>
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-2xl font-bold mb-4">Backups Disponíveis</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
              <div>
                <div className="font-bold">Backup Completo - 03/02/2026</div>
                <div className="text-sm text-zinc-400">Tamanho: 2.4 GB</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRestore('03/02/2026')}
                  className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Restaurar
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm">
                  Baixar
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
              <div>
                <div className="font-bold">Backup Completo - 02/02/2026</div>
                <div className="text-sm text-zinc-400">Tamanho: 2.3 GB</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRestore('02/02/2026')}
                  className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Restaurar
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm">
                  Baixar
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
              <div>
                <div className="font-bold">Backup Banco de Dados - 01/02/2026</div>
                <div className="text-sm text-zinc-400">Tamanho: 145 MB</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRestore('01/02/2026')}
                  className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Restaurar
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm">
                  Baixar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-900/20 border border-yellow-700 p-6 rounded-lg">
          <h3 className="text-yellow-500 font-bold mb-2">⚠️ Aviso Importante</h3>
          <p className="text-sm text-yellow-200">
            Restaurar um backup substituirá todos os dados atuais. Certifique-se de criar um backup dos dados atuais antes de restaurar.
            Esta operação não pode ser desfeita.
          </p>
        </div>
      </main>
    </div>
  )
}
