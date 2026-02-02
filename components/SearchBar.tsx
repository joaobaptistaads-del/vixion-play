"use client"

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { movies } from '../lib/mockData'

export default function SearchBar({ onChange }: { onChange: (q: string) => void }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), 180)
    return () => clearTimeout(timeout)
  }, [value, onChange])

  return (
    <div className="w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar títulos, gêneros, anos..."
        className="w-full px-4 py-3 rounded-md bg-white/5 placeholder:text-slate-400"
      />
    </div>
  )
}
