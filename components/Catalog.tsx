import Fuse from 'fuse.js'
import { movies } from '../lib/mockData'
import MovieCard from './MovieCard'

export default function Catalog({ query = '' }: { query?: string }) {
  let list = movies

  if (query) {
    const fuse = new Fuse(movies, {
      keys: ['title', 'genre', 'year', 'synopsis'],
      threshold: 0.35,
      includeScore: true
    })
    const res = fuse.search(query)
    list = res.map((r) => r.item)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {list.map((m) => (
        <MovieCard key={m.id} id={m.id} title={m.title} poster={m.poster} year={m.year} />
      ))}
    </div>
  )
}
