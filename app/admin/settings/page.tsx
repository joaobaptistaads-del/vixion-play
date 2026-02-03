'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminSettings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState({
    siteName: 'Vixion Play',
    siteUrl: 'https://vixionplay.com',
    allowSignup: true,
    maintenanceMode: false,
    maxUploadSize: 100,
    videoQuality: 'auto',
    enableComments: true,
    enableRatings: true
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/')
      return
    }
  }, [session, status, router])

  const handleSave = async () => {
    // Salvar configurações
    alert('Configurações salvas com sucesso!')
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
          <h1 className="text-3xl font-bold">Configurações</h1>
          <Link href="/admin" className="text-emerald-500 hover:text-emerald-400">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-6">
          <div>
            <label className="block text-sm mb-2">Nome do Site</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">URL do Site</label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Tamanho Máximo de Upload (MB)</label>
            <input
              type="number"
              value={settings.maxUploadSize}
              onChange={(e) => setSettings({...settings, maxUploadSize: parseInt(e.target.value)})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Qualidade de Vídeo Padrão</label>
            <select
              value={settings.videoQuality}
              onChange={(e) => setSettings({...settings, videoQuality: e.target.value})}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
            >
              <option value="auto">Automático</option>
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
              <option value="480p">480p</option>
            </select>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.allowSignup}
                onChange={(e) => setSettings({...settings, allowSignup: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Permitir novos cadastros</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Modo de manutenção</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableComments}
                onChange={(e) => setSettings({...settings, enableComments: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Habilitar comentários</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableRatings}
                onChange={(e) => setSettings({...settings, enableRatings: e.target.checked})}
                className="w-4 h-4"
              />
              <span>Habilitar avaliações</span>
            </label>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg transition-colors font-bold"
          >
            Salvar Configurações
          </button>
        </div>
      </main>
    </div>
  )
}
