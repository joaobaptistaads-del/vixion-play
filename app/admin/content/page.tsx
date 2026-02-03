'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Content {
  id: string
  title: string
  type: 'movie' | 'series'
  genre: string
  year: number
  rating: number
  thumbnail: string
  videoUrl: string
  description: string
  featured: boolean
}

export default function ContentManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [formData, setFormData] = useState<Partial<Content>>({
    title: '',
    type: 'movie',
    genre: '',
    year: new Date().getFullYear(),
    rating: 0,
    thumbnail: '',
    videoUrl: '',
    description: '',
    featured: false
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/')
      return
    }

    loadContents()
  }, [session, status, router])

  const loadContents = async () => {
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      setContents(data)
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingContent 
        ? `/api/admin/content/${editingContent.id}`
        : '/api/admin/content'
      
      const method = editingContent ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        await loadContents()
        setShowForm(false)
        setEditingContent(null)
        setFormData({
          title: '',
          type: 'movie',
          genre: '',
          year: new Date().getFullYear(),
          rating: 0,
          thumbnail: '',
          videoUrl: '',
          description: '',
          featured: false
        })
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este conteúdo?')) return

    try {
      const res = await fetch(`/api/admin/content/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await loadContents()
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  const startEdit = (content: Content) => {
    setEditingContent(content)
    setFormData(content)
    setShowForm(true)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Conteúdo</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors"
            >
              {showForm ? 'Cancelar' : '+ Novo Conteúdo'}
            </button>
            <Link href="/admin" className="text-emerald-500 hover:text-emerald-400">
              ← Voltar
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {showForm && (
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingContent ? 'Editar Conteúdo' : 'Adicionar Novo Conteúdo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'movie' | 'series'})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                  >
                    <option value="movie">Filme</option>
                    <option value="series">Série</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Gênero</label>
                  <input
                    type="text"
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Ano</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Rating (0-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">URL da Thumbnail</label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">URL do Vídeo</label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 h-24"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <span>Destaque na página inicial</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-colors"
                >
                  {editingContent ? 'Atualizar' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingContent(null)
                  }}
                  className="bg-zinc-700 hover:bg-zinc-600 px-6 py-2 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 flex items-center gap-4"
            >
              <img
                src={content.thumbnail}
                alt={content.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{content.title}</h3>
                <p className="text-zinc-400 text-sm">
                  {content.type === 'movie' ? 'Filme' : 'Série'} • {content.genre} • {content.year} • ⭐ {content.rating}
                  {content.featured && ' • ⭐ DESTAQUE'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(content)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(content.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
