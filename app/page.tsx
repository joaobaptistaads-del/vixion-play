import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import FeaturedCarousel from '../components/FeaturedCarousel'
import RowStrip from '../components/RowStrip'

export default function Home() {
  return (
    <main className="container py-8">
      <Header />

      <section className="mt-6">
        <FeaturedCarousel />
      </section>

      <section className="mt-8">
        <div className="glass p-6">
          <h2 className="text-2xl font-bold mb-4">Catálogo</h2>
          <p className="text-slate-300 mb-4">Explore recomendações selecionadas e novidades.</p>
          {/* Rows */}
          <RowStrip title="Recomendados para você" />
          <RowStrip title="Mais populares" />
        </div>
      </section>
    </main>
  )
}
