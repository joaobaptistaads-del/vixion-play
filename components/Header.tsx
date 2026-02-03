"use client"

import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from './ui/Button'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const isAdmin = session && (session.user as any)?.role === 'admin'

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Vixion Play" width={40} height={40} />
        <div>
          <div className="font-semibold">Vixion Play</div>
          <div className="text-xs text-slate-400">Cinema-grade streaming</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {session ? (
          <>
            {isAdmin && (
              <Link href="/admin">
                <Button variant="outline">👑 Admin</Button>
              </Link>
            )}
            <span className="text-sm text-slate-300">
              Olá, {session.user?.name}
            </span>
            <Button onClick={() => signOut()}>Sair</Button>
          </>
        ) : (
          <Link href="/signin">
            <Button>Entrar</Button>
          </Link>
        )}
      </div>
    </header>
  )
}
