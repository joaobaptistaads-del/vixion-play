# Supabase Setup Guide

Este guia explica como configurar o banco de dados Supabase para o Vixion Play.

## 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha os dados:
   - **Name**: vixion-play (ou nome de sua escolha)
   - **Database Password**: Crie uma senha segura
   - **Region**: Escolha a região mais próxima
   - **Pricing Plan**: Free (suficiente para começar)

## 2. Executar Schema do Banco de Dados

1. No dashboard do Supabase, vá para **SQL Editor** (menu lateral)
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `schema.sql` desta pasta
4. Cole no editor SQL
5. Clique em **Run** ou pressione `Ctrl+Enter`

Isso criará:
- ✅ Tabela `users` para armazenar usuários
- ✅ Tabela `my_lists` para listas de favoritos
- ✅ Índices para performance
- ✅ Políticas RLS (Row Level Security)
- ✅ Triggers para atualização automática de timestamps
- ✅ Usuário demo para testes

## 3. Obter Credenciais do Projeto

1. No dashboard do Supabase, vá para **Settings** > **API**
2. Você verá:
   - **Project URL**: `https://[seu-projeto].supabase.co`
   - **anon/public key**: Uma chave JWT longa

## 4. Configurar Variáveis de Ambiente

### Para desenvolvimento local:

Crie um arquivo `.env.local` na raiz do projeto:

```env
SUPABASE_URL=https://[seu-projeto].supabase.co
SUPABASE_ANON_KEY=[sua-chave-anon]
NEXTAUTH_SECRET=[gere-um-secret-aleatorio]
NEXTAUTH_URL=http://localhost:3000
```

Para gerar o `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Para produção (Vercel):

1. Acesse seu projeto no Vercel
2. Vá para **Settings** > **Environment Variables**
3. Adicione as variáveis:
   - `SUPABASE_URL`: URL do seu projeto Supabase
   - `SUPABASE_ANON_KEY`: Chave anon do Supabase
   - `NEXTAUTH_SECRET`: Secret gerado
   - `NEXTAUTH_URL`: URL do seu deploy (ex: https://seu-app.vercel.app)

## 5. Verificar Instalação

Para verificar se está funcionando:

1. Inicie o servidor: `npm run dev`
2. Acesse: http://localhost:3000/signin
3. Faça login com: demo@vixion.test / demo
4. Vá para uma página de título e clique em "Adicionar à Minha Lista"
5. Verifique em http://localhost:3000/my-list

## Estrutura das Tabelas

### Tabela `users`
```sql
- id: UUID (Primary Key)
- email: TEXT (Unique)
- name: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Tabela `my_lists`
```sql
- id: UUID (Primary Key)
- user_email: TEXT (Foreign Key -> users.email)
- movie_id: TEXT
- added_at: TIMESTAMP
- UNIQUE(user_email, movie_id)
```

## Troubleshooting

### Erro: "relation does not exist"
- Certifique-se de que executou o schema.sql completamente
- Verifique se as tabelas foram criadas na aba **Table Editor**

### Erro: "new row violates row-level security policy"
- As políticas RLS estão ativas mas configuradas para permitir acesso
- Se precisar, desative temporariamente: `ALTER TABLE my_lists DISABLE ROW LEVEL SECURITY;`

### Erro de conexão
- Verifique se a URL e chave estão corretas
- Verifique se seu IP está na whitelist (Settings > Database > Connection Pooling)

## Melhorias de Produção (Opcional)

Para um ambiente de produção real:

1. **Políticas RLS mais seguras**: 
   - O `schema.sql` usa políticas simplificadas para demo/desenvolvimento
   - Para produção, veja `schema-production.sql` com políticas mais restritivas
   - ⚠️ **Importante**: As políticas de produção requerem Supabase Auth
   - Com NextAuth (setup atual), a segurança é gerenciada nas API routes

2. **Autenticação Supabase**: 
   - Integrar Supabase Auth em vez de NextAuth
   - Permite usar `auth.uid()` e `auth.email()` nas políticas RLS

3. **Storage**: 
   - Adicionar Supabase Storage para uploads de imagens
   - Posters, thumbnails, etc.

4. **Edge Functions**: 
   - Criar funções serverless para lógica complexa
   - Processamento de dados, webhooks, etc.

5. **Realtime**: 
   - Ativar realtime subscriptions para atualizações ao vivo
   - Notificações de novos conteúdos, etc.

## ⚠️ Nota de Segurança

- O `schema.sql` padrão usa políticas RLS simplificadas (`USING (true)`)
- Isso é aceitável para demo/desenvolvimento
- A segurança real é gerenciada nas API routes do Next.js via NextAuth
- Para produção com Supabase Auth, use `schema-production.sql`

## Recursos Úteis

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL Editor](https://supabase.com/docs/guides/database/overview)
