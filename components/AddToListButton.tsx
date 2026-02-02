"use client"

import { useState } from 'react'

export default function AddToListButton({ movieId }: { movieId: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'added' | 'error'>('idle')

  async function add() {
    setStatus('loading')
    try {
      const res = await fetch('/api/my-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId })
      })
      if (res.status === 401) {
        // redirect to sign in
        window.location.href = '/signin'
        return
      }
      if (!res.ok) throw new Error('failed')
      setStatus('added')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <button
      onClick={add}
      disabled={status === 'loading' || status === 'added'}
      className={`px-4 py-2 rounded ${status === 'added' ? 'bg-green-600' : 'bg-vixion-500'} text-sm`}
    >
      {status === 'added' ? 'Adicionado' : status === 'loading' ? 'Adicionando...' : 'Adicionar à Minha Lista'}
    </button>
  )
}
