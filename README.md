# Vixion Play — Frontend

Projeto front-end Next.js (App Router) minimal para o Vixion Play — streaming com player HLS, Tailwind e TypeScript.

## 🚀 Deploy Rápido no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Faça push do código para o GitHub** (se ainda não fez)
   ```bash
   git push origin main
   ```

2. **Conecte ao Vercel**
   - Acesse [vercel.com/new](https://vercel.com/new)
   - Importe o repositório GitHub
   - Clique em **Deploy**

3. **Configure as variáveis de ambiente**
   - Vá para **Settings** > **Environment Variables**
   - Adicione as seguintes variáveis:
     ```
     SUPABASE_URL=https://[seu-projeto].supabase.co
     SUPABASE_ANON_KEY=[sua-chave-anon]
     NEXTAUTH_SECRET=[gere-com: openssl rand -base64 32]
     NEXTAUTH_URL=https://[seu-app].vercel.app
     NEXT_PUBLIC_SITE_URL=https://[seu-app].vercel.app
     ```

4. **Redeploy**
   - Vá para **Deployments**
   - Clique nos três pontos do último deploy
   - Selecione **Redeploy**

✅ **Pronto!** Seu app estará disponível em: `https://[seu-app].vercel.app`

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🗄️ Configurar Banco de Dados Supabase

Antes de usar a funcionalidade de "Adicionar à Lista", configure o Supabase:

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá para **SQL Editor** e execute o script em `/supabase/schema.sql`
3. Obtenha as credenciais em **Settings** > **API**
4. Configure as variáveis de ambiente (veja acima)

📖 **Guia completo:** Ver `/supabase/README.md`

## 🏃 Quick start local

```bash
npm install
npm run dev
```

## 🧪 Testar localmente

Para executar os testes E2E localmente:

```bash
# Instalar navegadores do Playwright (apenas primeira vez)
npx playwright install chromium

# Executar testes (inicia servidor automaticamente)
npm run ci:e2e

# Ou executar testes manualmente (servidor já deve estar rodando)
npm run dev        # Em um terminal
npm run test:e2e   # Em outro terminal
```

**Testes disponíveis:**
- ✅ `navigation.spec.ts` - Testes de navegação (funcionam sem Supabase)
- ⚠️ `add-to-list.spec.ts` - Teste de adicionar à lista (requer Supabase)

**Para pular testes que requerem Supabase:**
```bash
SKIP_SUPABASE_TESTS=true npm run test:e2e
```

## Principais pontos
- Next.js (App Router) com TypeScript
- Tailwind CSS para design rápido e responsivo
- Player HLS com `hls.js` (fallback nativo)
- Estrutura inicial: homepage, componentes e assets
- SEO: Open Graph, Twitter cards, JSON-LD, `sitemap.xml` route, and `robots.txt`

## Próximos passos sugeridos
- Integrar design system (Radix/UI, shadcn)
- Adicionar autenticação (NextAuth), Algolia, analytics
- Testes e CI (Playwright + GitHub Actions)

## SEO & Deployment notes
- Set `NEXT_PUBLIC_SITE_URL` to your production URL for correct Open Graph images and sitemap.
- `sitemap.xml` is generated at `/sitemap.xml` from mock data.
- `robots.txt` is available in `/robots.txt`.

## Deploy / get a public preview link
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

