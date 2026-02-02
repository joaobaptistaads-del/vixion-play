import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { movies } from '../../lib/mockData'
import { getListFor } from '../../lib/storage'
import MovieCard from '../../components/MovieCard'

export default async function MyListPage() {
  const session = await getServerSession(authOptions as any)
  if (!session || !session.user?.email) {
    return new Response(null, { status: 302, headers: { Location: '/signin' } })
  }

  const list = getListFor(session.user.email)
  const items = movies.filter((m) => list.includes(m.id))

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Minha Lista</h1>
      {items.length === 0 ? (
        <div className="text-slate-400">Sua lista está vazia. Navegue pelo catálogo e adicione títulos.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m) => (
            <MovieCard key={m.id} id={m.id} title={m.title} poster={m.poster} year={m.year} />
          ))}
        </div>
      )}
    </main>
  )
}
