"use client"

import Image from 'next/image'
import { useRef } from 'react'
import Link from 'next/link'
import { Movie, movies } from '../lib/mockData'

export default function RowStrip({ title, items }: { title: string; items?: Movie[] }) {
  const list = items || movies
  const ref = useRef<HTMLDivElement | null>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = ref.current
    if (!el) return
    const amount = el.clientWidth * 0.7
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="px-2 py-1 bg-black/40 rounded">‹</button>
          <button onClick={() => scroll('right')} className="px-2 py-1 bg-black/40 rounded">›</button>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {list.map((m) => (
          <Link key={m.id} href={`/title/${m.id}`} className="min-w-[160px] w-[160px] shrink-0">
            <div className="rounded-md overflow-hidden bg-black glass">
              <div className="relative aspect-[2/3] w-full">
                <Image src={m.poster} alt={m.title} fill className="object-cover" />
              </div>
              <div className="p-2">
                <div className="font-medium text-sm">{m.title}</div>
                <div className="text-xs text-slate-400">{m.year}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
