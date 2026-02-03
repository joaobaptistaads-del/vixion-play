"use client"

import Image from 'next/image'
import Button from './ui/Button'
import Input from './ui/Input'

export default function Header() {
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
        <Input placeholder="Pesquisar" />
        <Button>Entrar</Button>
      </div>
    </header>
  )
}
