import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions as any)
  if (!session) return redirect('/signin')

  return (
    <main className="container py-8">
      <div className="glass p-6 max-w-md">
        <h1 className="text-2xl font-bold mb-2">Minha Conta</h1>
        <div className="text-slate-300 mb-4">{session.user?.email}</div>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-slate-400">Plano</div>
            <div className="font-semibold">Assinatura Demo</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Preferências</div>
            <div className="text-slate-300">Legendas: Português (padrão)</div>
          </div>
          <div className="flex gap-2 mt-4">
            <form action="/api/auth/signout" method="post">
              <button type="submit" className="px-4 py-2 bg-white/5 rounded">Sair</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
