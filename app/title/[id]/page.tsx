import { movies } from '../../../lib/mockData'
import VideoPlayer from '../../../components/VideoPlayer'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const AddToListButton = dynamic(() => import('../../../components/AddToListButton'), { ssr: false })

type Props = {
  params: { id: string }
}

export default function TitlePage({ params }: Props) {
  const movie = movies.find((m) => m.id === params.id)
  if (!movie) return <div className="container py-8">Título não encontrado</div>

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
            <VideoPlayer src={movie.hls} poster={movie.poster} subtitles={movie.subtitles} />
          </div>
          <h1 className="text-3xl font-bold">{movie.title} <span className="text-slate-400 text-lg">({movie.year})</span></h1>
          <p className="mt-3 text-slate-300">{movie.synopsis}</p>
        </div>

        <aside className="glass p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-60 relative">
              <Image src={movie.poster} alt={movie.title} fill className="object-cover rounded-md" />
            </div>
            <div className="text-center">
              <div className="font-semibold">{movie.title}</div>
              <div className="text-sm text-slate-400">{movie.genre.join(', ')}</div>
            </div>
            <AddToListButton movieId={movie.id} />
          </div>
        </aside>
      </div>
    </main>
  )
}
