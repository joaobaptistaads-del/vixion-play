import '../styles/globals.css'
import { Metadata } from 'next'
import Image from 'next/image'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Vixion Play — Cinema-grade streaming',
  description: 'Vixion Play — experiência de streaming digna de Hollywood',
  icons: {
    icon: '/logo.svg'
  },
  openGraph: {
    title: 'Vixion Play — Cinema-grade streaming',
    description: 'Vixion Play — experiência de streaming digna de Hollywood',
    url: siteUrl,
    siteName: 'Vixion Play',
    images: [
      { url: `${siteUrl}/logo.svg`, alt: 'Vixion Play' }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vixion Play — Cinema-grade streaming',
    description: 'Vixion Play — experiência de streaming digna de Hollywood',
    images: [`${siteUrl}/logo.svg`]
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Vixion Play',
  'url': siteUrl,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${siteUrl}/catalog?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
