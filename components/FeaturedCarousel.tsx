"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { movies } from '../lib/mockData'
import dynamic from 'next/dynamic'
import IconButton from './ui/IconButton'
import Badge from './ui/Badge'

const AddToListButton = dynamic(() => import('./AddToListButton'), { ssr: false })

export default function FeaturedCarousel() {
  const items = movies
  const [idx, setIdx] = useState(0)

  function next() {
    setIdx((s) => (s + 1) % items.length)
  }
  function prev() {
    setIdx((s) => (s - 1 + items.length) % items.length)
  }

  const current = items[idx]

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="relative h-[420px] bg-black rounded-lg">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image src={current.poster} alt={current.title} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute left-6 bottom-6 max-w-lg text-white">
              <div className="flex items-center gap-3 mb-2">
                <Badge>{current.genre[0]}</Badge>
                <div className="text-sm text-slate-300">{current.year}</div>
              </div>
              <h2 className="text-3xl font-bold">{current.title}</h2>
              <p className="mt-2 text-slate-200/80">{current.synopsis}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link href={`/title/${current.id}`} className="px-4 py-2 bg-white text-black rounded font-semibold">Play</Link>
                <AddToListButton movieId={current.id} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <IconButton onClick={prev} aria-label="Previous">‹</IconButton>
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <IconButton onClick={next} aria-label="Next">›</IconButton>
      </div>
    </div>
  )
}
