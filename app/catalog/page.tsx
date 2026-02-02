"use client"

import { useState } from 'react'
import Catalog from '../../components/Catalog'
import SearchBar from '../../components/SearchBar'

export default function CatalogPage() {
  const [q, setQ] = useState('')

  return (
    <main className="container py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="text-slate-400">Explore títulos selecionados e tendências.</p>
      </header>

      <div className="mb-6">
        <SearchBar onChange={(val) => setQ(val)} />
      </div>

      <Catalog query={q} />
    </main>
  )
}
