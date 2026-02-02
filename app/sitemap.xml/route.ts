import { NextResponse } from 'next/server'
import { movies } from '../../lib/mockData'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const staticPages = ['/', '/catalog', '/signin', '/profile']

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`

  for (const p of staticPages) {
    xml += `<url><loc>${baseUrl}${p}</loc></url>\n`
  }

  for (const m of movies) {
    xml += `<url><loc>${baseUrl}/title/${m.id}</loc><lastmod>${new Date().toISOString()}</lastmod></url>\n`
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=59'
    }
  })
}
