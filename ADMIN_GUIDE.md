# Sistema Administrativo - Vixion Play

## 📋 Visão Geral

O sistema administrativo do Vixion Play fornece controle total sobre a plataforma de streaming, permitindo que administradores gerenciem conteúdo, usuários, configurações e muito mais.

## 🔐 Autenticação e Acesso

### Configuração de Administradores

Os emails de administradores são definidos em `app/api/auth/[...nextauth]/route.ts`:

```typescript
const ADMIN_EMAILS = [
  'admin@vixionplay.com',
  'joaob@vixionplay.com'
]
```

Para adicionar novos administradores, adicione o email à lista acima.

### Sistema de Roles

O sistema possui dois níveis de acesso:
- **admin**: Acesso total ao painel administrativo
- **user**: Acesso apenas às funcionalidades públicas

### Proteção de Rotas

O middleware (`middleware.ts`) protege automaticamente todas as rotas `/admin/*`, redirecionando usuários não autorizados ou sem privilégios de admin.

## 📊 Funcionalidades do Painel

### 1. Dashboard Principal (`/admin`)
- Estatísticas em tempo real
- Cards de acesso rápido
- Visão geral do sistema

**Métricas exibidas:**
- Total de usuários
- Conteúdo total
- Usuários ativos
- Atividade recente

### 2. Gerenciamento de Conteúdo (`/admin/content`)

**Funcionalidades:**
- ✅ Adicionar novo conteúdo (filmes/séries)
- ✅ Editar conteúdo existente
- ✅ Deletar conteúdo
- ✅ Marcar conteúdo como destaque
- ✅ Upload de thumbnails e vídeos

**Campos do formulário:**
- Título
- Tipo (Filme/Série)
- Gênero
- Ano
- Rating (0-10)
- URL da Thumbnail
- URL do Vídeo
- Descrição
- Destaque (checkbox)

### 3. Gerenciamento de Usuários (`/admin/users`)

**Funcionalidades:**
- 👥 Visualizar todos os usuários
- 🔍 Buscar por email ou nome
- 👑 Promover/rebaixar administradores
- 🔒 Suspender/ativar usuários
- 🗑️ Deletar usuários

**Informações exibidas:**
- Email
- Nome
- Role (Admin/Usuário)
- Status (Ativo/Suspenso)
- Data de criação
- Último login

### 4. Analytics (`/admin/analytics`)

**Métricas disponíveis:**
- Visualizações (hoje, semana, mês, total)
- Conteúdo mais visto
- Atividade por horário
- Estatísticas por dispositivo (Mobile/Desktop/Tablet)

### 5. Configurações (`/admin/settings`)

**Opções configuráveis:**
- Nome do site
- URL do site
- Tamanho máximo de upload
- Qualidade de vídeo padrão
- Permitir novos cadastros
- Modo de manutenção
- Habilitar comentários
- Habilitar avaliações

### 6. Relatórios (`/admin/reports`)

**Tipos de relatórios:**
- 📊 Relatório de Usuários
- 🎬 Relatório de Conteúdo
- 💰 Relatório Financeiro
- 📈 Relatório de Crescimento
- 🔒 Relatório de Segurança
- 📱 Relatório de Dispositivos

### 7. Backup & Restore (`/admin/backup`)

**Funcionalidades:**
- 💾 Backup de banco de dados
- 📁 Backup de arquivos (vídeos/mídias)
- 🗂️ Backup completo do sistema
- 📥 Download de backups
- ⚡ Restauração de backups

## 🛠️ APIs Administrativas

### Estatísticas
```
GET /api/admin/stats
```
Retorna estatísticas gerais do sistema.

### Conteúdo
```
GET /api/admin/content
POST /api/admin/content
PUT /api/admin/content/[id]
DELETE /api/admin/content/[id]
```

### Usuários
```
GET /api/admin/users
PATCH /api/admin/users/[id]
DELETE /api/admin/users/[id]
```

**Todas as APIs verificam:**
- ✅ Sessão ativa
- ✅ Role de administrador

## 🎨 Interface do Usuário

### Botão Admin no Header

Para usuários com role de admin, um botão especial aparece no header:

```tsx
{isAdmin && (
  <Link href="/admin">
    <Button variant="outline">👑 Admin</Button>
  </Link>
)}
```

### Tema Visual

- **Background**: Preto (`bg-black`)
- **Cards**: Zinc-900 (`bg-zinc-900`)
- **Bordas**: Zinc-800 (`border-zinc-800`)
- **Destaque**: Emerald-600 (botões principais)

## 🔒 Segurança

### Middleware de Proteção

O arquivo `middleware.ts` garante que:
1. Apenas usuários autenticados acessem `/admin/*`
2. Apenas usuários com role `admin` vejam o conteúdo
3. Usuários não autorizados sejam redirecionados para `/`

### Validação de Sessão

Todas as páginas admin verificam:
```tsx
const { data: session, status } = useSession()
const isAdmin = session && (session.user as any)?.role === 'admin'

if (!session || !isAdmin) {
  router.push('/')
  return
}
```

## 📦 Estrutura de Arquivos

```
app/
├── admin/
│   ├── page.tsx              # Dashboard principal
│   ├── layout.tsx            # Layout administrativo
│   ├── content/
│   │   └── page.tsx          # Gerenciar conteúdo
│   ├── users/
│   │   └── page.tsx          # Gerenciar usuários
│   ├── analytics/
│   │   └── page.tsx          # Analytics
│   ├── settings/
│   │   └── page.tsx          # Configurações
│   ├── reports/
│   │   └── page.tsx          # Relatórios
│   └── backup/
│       └── page.tsx          # Backup & Restore
├── api/
│   └── admin/
│       ├── stats/
│       │   └── route.ts      # API de estatísticas
│       ├── content/
│       │   ├── route.ts      # CRUD de conteúdo
│       │   └── [id]/
│       │       └── route.ts
│       └── users/
│           ├── route.ts      # CRUD de usuários
│           └── [id]/
│               └── route.ts
middleware.ts                 # Proteção de rotas
components/
└── AuthProvider.tsx          # Provedor de sessão
```

## 🚀 Como Usar

### 1. Login como Admin

Faça login com um dos emails configurados como admin:
- admin@vixionplay.com
- joaob@vixionplay.com

### 2. Acessar o Painel

Após o login, clique no botão "👑 Admin" no header ou navegue para `/admin`

### 3. Gerenciar Conteúdo

1. Acesse "Gerenciar Conteúdo"
2. Clique em "+ Novo Conteúdo"
3. Preencha o formulário
4. Clique em "Adicionar"

### 4. Gerenciar Usuários

1. Acesse "Gerenciar Usuários"
2. Use a busca para encontrar usuários
3. Use os botões de ação para:
   - 👑 Tornar admin / 👤 Remover admin
   - 🔒 Suspender / 🔓 Ativar
   - 🗑️ Deletar

## 🔄 Próximos Passos

### Integrações Pendentes

Os seguintes recursos atualmente usam dados mock e precisam ser integrados com o banco de dados real:

1. **Supabase Integration**
   - Tabela de conteúdo
   - Tabela de usuários
   - Tabela de analytics
   - Storage para vídeos/imagens

2. **APIs Reais**
   - Substituir mock data por queries Supabase
   - Implementar upload de arquivos
   - Implementar geração de relatórios PDF

3. **Analytics Real**
   - Integrar com sistema de analytics
   - Rastreamento de visualizações
   - Métricas em tempo real

## 📝 Notas de Desenvolvimento

- Todos os dados são atualmente MOCK para demonstração
- As APIs precisam ser conectadas ao Supabase
- O sistema de upload precisa ser implementado
- Relatórios PDF precisam de biblioteca de geração
- Backup real precisa de integração com storage

## 🐛 Troubleshooting

### Não consigo acessar o painel admin

1. Verifique se está logado com email de admin
2. Verifique se o email está na lista `ADMIN_EMAILS`
3. Limpe os cookies e faça login novamente

### Dados não estão salvando

Os dados são mock atualmente. Para persistência real:
1. Configure o Supabase
2. Crie as tabelas necessárias
3. Atualize as APIs para usar Supabase

### Erro 401 nas APIs

As APIs verificam autenticação. Certifique-se de:
1. Estar logado
2. Ter role de admin
3. A sessão NextAuth estar ativa

## 📧 Contato e Suporte

Para questões sobre o sistema administrativo, contate o desenvolvedor principal.
