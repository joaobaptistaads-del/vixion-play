import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: string
  title: string
  poster: string
  year: number
}

export default function MovieCard({ id, title, poster, year }: Props) {
  return (
    <Link href={`/title/${id}`} className="block">
      <div className="w-full rounded-md overflow-hidden glass hover:scale-[1.02] transition-transform">
        <div className="relative aspect-[2/3] w-full bg-black">
          <Image src={poster} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
        <div className="p-3">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-slate-400">{year}</div>
        </div>
      </div>
    </Link>
  )
}
