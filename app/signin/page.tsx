"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { redirect: false, email, password })
    if (res?.ok) router.push('/')
  }

  return (
    <main className="container py-12">
      <div className="max-w-md mx-auto glass p-6">
        <h1 className="text-2xl font-bold mb-4">Entrar</h1>
        <form onSubmit={submit} className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded bg-white/5" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 rounded bg-white/5" />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-vixion-500 rounded">Entrar</button>
            <button type="button" onClick={() => { setEmail('demo@vixion.test'); setPassword('demo') }} className="px-4 py-2 bg-white/5 rounded">Demo</button>
          </div>
        </form>
      </div>
    </main>
  )
}
