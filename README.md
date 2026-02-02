# Vixion Play — Frontend

Projeto front-end Next.js (App Router) minimal para o Vixion Play — streaming com player HLS, Tailwind e TypeScript.

Quick start

```bash
npm install
npm run dev
```

Principais pontos
- Next.js (App Router) com TypeScript
- Tailwind CSS para design rápido e responsivo
- Player HLS com `hls.js` (fallback nativo)
- Estrutura inicial: homepage, componentes e assets
- SEO: Open Graph, Twitter cards, JSON-LD, `sitemap.xml` route, and `robots.txt`

Próximos passos sugeridos
- Integrar design system (Radix/UI, shadcn)
- Adicionar autenticação (NextAuth), Algolia, analytics
- Testes e CI (Playwright + GitHub Actions)

SEO & Deployment notes
- Set `NEXT_PUBLIC_SITE_URL` to your production URL for correct Open Graph images and sitemap.
- `sitemap.xml` is generated at `/sitemap.xml` from mock data.
- `robots.txt` is available in `/robots.txt`.

Deploy / get a public preview link
---------------------------------

Quickest (recommended): deploy to Vercel

1. Install Vercel CLI (optional, you can also use the Vercel web UI):

```bash
npm i -g vercel
vercel login
```

2. From the project root deploy (it will return a public URL):

```bash
cd "C:\\Users\\joaob\\OneDrive\\Documents\\vixion play"
vercel --prod
```

3. Alternatively: push this repository to GitHub and connect it in https://vercel.com/new — Vercel will create preview and production deployments automatically and provide URLs.

Local quick tunnel (if you only need a short-lived preview without deploying):
- Install `ngrok` or use `localhost.run`.

Example (ngrok):

```bash
npm run dev
npx ngrok http 3000
# copy the provided https://... address to share
```

Notes:
- `vercel --prod` will give you a stable production URL (and a preview URL per push if connected to GitHub).
- If you want, I can prepare a small GitHub Actions workflow to auto-push a preview URL into the PR description (requires connecting to GitHub/Vercel).

