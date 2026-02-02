export type Movie = {
  id: string
  title: string
  year: number
  genre: string[]
  synopsis: string
  poster: string
  hls: string
  subtitles?: string
}

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'A Última Aurora',
    year: 2025,
    genre: ['Drama', 'Sci-Fi'],
    synopsis: 'Uma jornada emocional através de um mundo que desperta para um novo dia.',
    poster: '/logo.svg',
    hls: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    subtitles: '/subs/a-ultima-aurora.vtt'
  },
  {
    id: 'm2',
    title: 'Corrida Sombria',
    year: 2024,
    genre: ['Ação', 'Thriller'],
    synopsis: 'Velocidade, vingança e um segredo que muda tudo.',
    poster: '/logo.svg',
    hls: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    subtitles: '/subs/corrida-sombrio.vtt'
  },
  {
    id: 'm3',
    title: 'Ecos do Passado',
    year: 2023,
    genre: ['Documentário'],
    synopsis: 'Um olhar íntimo sobre histórias que moldaram uma cidade.',
    poster: '/logo.svg',
    hls: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    subtitles: '/subs/ecos-do-passado.vtt'
  }
]
