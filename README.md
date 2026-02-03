# Vixion Play — Plataforma de Streaming Completa

Plataforma completa de streaming com Next.js (App Router), incluindo painel administrativo, autenticação e gerenciamento de conteúdo.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## ✨ Principais Funcionalidades

### 🎬 Para Usuários
- **Player HLS** com `hls.js` (fallback nativo)
- **Catálogo** de filmes e séries
- **Busca** de conteúdo
- **Lista pessoal** (My List)
- **Perfil** de usuário
- **Autenticação** com NextAuth
- **Design responsivo** com Tailwind CSS

### 👑 Painel Administrativo

Sistema completo de administração em `/admin`:

#### 📊 Dashboard
- Estatísticas em tempo real
- Visão geral do sistema
- Acesso rápido a todas as funcionalidades

#### 🎥 Gerenciamento de Conteúdo
- Adicionar/editar/remover filmes e séries
- Upload de thumbnails e vídeos
- Marcar conteúdo como destaque
- Campos: título, tipo, gênero, ano, rating, descrição

#### 👥 Gerenciamento de Usuários
- Visualizar todos os usuários
- Buscar por email ou nome
- Promover/rebaixar administradores
- Suspender/ativar contas
- Deletar usuários

#### 📈 Analytics
- Visualizações (diário, semanal, mensal)
- Conteúdo mais assistido
- Atividade por horário
- Estatísticas por dispositivo

#### ⚙️ Configurações
- Configurações gerais do site
- Controle de uploads
- Qualidade de vídeo
- Modo de manutenção

#### 📋 Relatórios
- Relatório de usuários
- Relatório de conteúdo
- Relatório financeiro
- Relatório de crescimento
- Relatório de segurança
- Relatório de dispositivos

#### 💾 Backup & Restore
- Backup de banco de dados
- Backup de arquivos
- Backup completo
- Restauração de backups

## 🔐 Sistema de Autenticação

### Configurar Administradores

Edite `app/api/auth/[...nextauth]/route.ts`:

```typescript
const ADMIN_EMAILS = [
  'admin@vixionplay.com',
  'seu-email@example.com'
]
```

### Login de Teste

**Admin:**
- Email: `admin@vixionplay.com`
- Password: qualquer

**Usuário:**
- Email: qualquer email
- Password: qualquer

## 🛠️ Tecnologias

- **Next.js 14** (App Router) com TypeScript
- **NextAuth** para autenticação
- **Tailwind CSS** para estilização
- **Supabase** para banco de dados
- **HLS.js** para streaming de vídeo
- **React** com hooks modernos

## 📁 Estrutura do Projeto

```
vixion-play/
├── app/
│   ├── admin/              # Painel administrativo
│   │   ├── page.tsx        # Dashboard
│   │   ├── content/        # Gerenciar conteúdo
│   │   ├── users/          # Gerenciar usuários
│   │   ├── analytics/      # Analytics
│   │   ├── settings/       # Configurações
│   │   ├── reports/        # Relatórios
│   │   └── backup/         # Backup
│   ├── api/
│   │   ├── auth/           # NextAuth
│   │   └── admin/          # APIs admin
│   ├── catalog/            # Catálogo público
│   ├── my-list/            # Lista pessoal
│   ├── profile/            # Perfil
│   ├── signin/             # Login
│   └── title/[id]/         # Detalhes do título
├── components/
│   ├── AuthProvider.tsx    # Provedor de sessão
│   ├── Header.tsx          # Header com auth
│   ├── Catalog.tsx         # Grid de conteúdo
│   ├── VideoPlayer.tsx     # Player HLS
│   └── ui/                 # Componentes UI
├── lib/
│   ├── supabaseClient.ts   # Cliente Supabase
│   ├── analytics.ts        # Analytics
│   └── mockData.ts         # Dados mock
├── middleware.ts           # Proteção de rotas
└── ADMIN_GUIDE.md          # Documentação admin
```

## 🔒 Segurança

### Proteção de Rotas

O middleware protege automaticamente todas as rotas `/admin/*`:
- Verifica autenticação
- Valida role de administrador
- Redireciona usuários não autorizados

### APIs Seguras

Todas as APIs admin verificam:
```typescript
const session = await getServerSession(authOptions)
if (!session || session.user?.role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## 📚 Documentação

Para documentação completa do painel administrativo, consulte [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 🌐 SEO & Deployment

### Configuração de SEO

- Set `NEXT_PUBLIC_SITE_URL` para URL de produção
- `sitemap.xml` gerado em `/sitemap.xml`
- `robots.txt` disponível em `/robots.txt`
- Open Graph e Twitter Cards configurados
- JSON-LD para Schema.org

### Deploy na Vercel

**Método 1: CLI**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Método 2: GitHub**

1. Push para GitHub
2. Conecte em https://vercel.com/new
3. Vercel criará deployments automáticos

### Variáveis de Ambiente

```env
NEXTAUTH_SECRET=sua-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=https://seu-site.com
SUPABASE_URL=sua-supabase-url
SUPABASE_ANON_KEY=sua-supabase-key
```

## 🚧 Próximos Passos

### Integrações Pendentes

- [ ] Conectar APIs ao Supabase (atualmente mock)
- [ ] Implementar upload real de arquivos
- [ ] Sistema de analytics real
- [ ] Geração de relatórios PDF
- [ ] Backup real com storage
- [ ] Sistema de pagamentos
- [ ] Notificações por email
- [ ] Comentários e avaliações

### Melhorias Sugeridas

- [ ] Design system (Radix UI, shadcn)
- [ ] Busca com Algolia
- [ ] Testes E2E (Playwright)
- [ ] CI/CD com GitHub Actions
- [ ] Monitoramento de erros (Sentry)
- [ ] CDN para vídeos
- [ ] Sistema de cache

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
```

## 🐛 Troubleshooting

### Não consigo acessar /admin

1. Verifique se está logado
2. Confirme que seu email está em `ADMIN_EMAILS`
3. Limpe cookies e faça login novamente

### Dados não persistem

Os dados são mock. Para persistência:
1. Configure Supabase
2. Crie tabelas necessárias
3. Atualize APIs para usar Supabase

## 📞 Suporte

Para questões ou suporte, consulte a documentação ou contate o desenvolvedor.

## 📄 Licença

Este projeto é privado e proprietário.


