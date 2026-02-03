# 🚀 Guia de Deploy - Vixion Play

## Passo a Passo Completo

### 1️⃣ Configurar Supabase

#### A. Criar projeto
1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - Nome: `vixion-play`
   - Password: [escolha uma senha segura]
   - Region: [escolha a mais próxima]
4. Aguarde a criação (~2 minutos)

#### B. Criar banco de dados
1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Abra o arquivo `/supabase/schema.sql` deste repositório
4. Copie TODO o conteúdo
5. Cole no SQL Editor
6. Clique em **Run** (ou Ctrl+Enter)
7. ✅ Deve ver mensagem de sucesso

#### C. Obter credenciais
1. No menu lateral, vá em **Settings** (⚙️)
2. Clique em **API**
3. Copie:
   - **Project URL**: `https://xxxxxxxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (chave JWT longa)

### 2️⃣ Deploy no Vercel

#### Método 1: Via GitHub (Mais Fácil)

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git push origin main
   ```

2. **Importar no Vercel**
   - Acesse: https://vercel.com/new
   - Clique em **Import Git Repository**
   - Selecione seu repositório `vixion-play`
   - Clique em **Import**

3. **Configurar projeto**
   - Framework Preset: **Next.js** (detectado automaticamente)
   - Root Directory: `./` (padrão)
   - Clique em **Deploy**

4. **Aguarde deploy** (~2-3 minutos)
   - ⚠️ Vai falhar na primeira vez (normal!)
   - Precisamos adicionar as variáveis de ambiente

5. **Adicionar variáveis de ambiente**
   - No dashboard do Vercel, vá em **Settings**
   - Clique em **Environment Variables**
   - Adicione uma por uma:

   | Name | Value | Description |
   |------|-------|-------------|
   | `SUPABASE_URL` | `https://xxx.supabase.co` | URL do Supabase (passo 1C) |
   | `SUPABASE_ANON_KEY` | `eyJhbGc...` | Chave anon do Supabase (passo 1C) |
   | `NEXTAUTH_SECRET` | [gerar novo]* | Secret para NextAuth |
   | `NEXTAUTH_URL` | `https://seu-app.vercel.app` | URL do seu app |
   | `NEXT_PUBLIC_SITE_URL` | `https://seu-app.vercel.app` | URL pública |

   *Para gerar `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```
   Ou use: https://generate-secret.vercel.app/32

6. **Redeploy com variáveis**
   - Vá em **Deployments**
   - Clique nos 3 pontos do deploy mais recente
   - Selecione **Redeploy**
   - Marque **Use existing Build Cache** ❌ (desmarcar)
   - Clique em **Redeploy**

7. **✅ Pronto!**
   - Aguarde o deploy (~2 minutos)
   - Clique em **Visit** para abrir seu app
   - URL: `https://[seu-projeto].vercel.app`

#### Método 2: Via CLI

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy (primeira vez)
vercel

# 4. Adicionar variáveis de ambiente
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add NEXT_PUBLIC_SITE_URL

# 5. Deploy para produção
vercel --prod
```

### 3️⃣ Testar Aplicação

1. **Acesse seu app**
   - URL: `https://[seu-projeto].vercel.app`

2. **Faça login**
   - Clique em "Entrar"
   - Use: `demo@vixion.test` / `demo`
   - Deve redirecionar para homepage

3. **Teste "Adicionar à Lista"**
   - Clique em um título (ex: "A Última Aurora")
   - Clique em "Adicionar à Minha Lista"
   - O botão deve mudar para "Adicionado" ✅

4. **Verifique sua lista**
   - Acesse: `https://[seu-projeto].vercel.app/my-list`
   - Deve ver os títulos adicionados

### 4️⃣ Verificar Dados no Supabase

1. Volte para o Supabase
2. No menu lateral, clique em **Table Editor**
3. Selecione a tabela `users`
   - Deve ver o usuário demo
4. Selecione a tabela `my_lists`
   - Deve ver os títulos adicionados

### ✅ Checklist Final

- [ ] Projeto Supabase criado
- [ ] Schema SQL executado com sucesso
- [ ] Credenciais Supabase copiadas
- [ ] Código no GitHub
- [ ] Projeto importado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] App funcionando (login + adicionar à lista)
- [ ] Dados salvos no Supabase

## 🆘 Troubleshooting

### Deploy falhou
- ✅ Verifique se todas as variáveis de ambiente estão configuradas
- ✅ Verifique se `NEXTAUTH_URL` tem o domínio correto do Vercel
- ✅ Faça redeploy sem cache

### Login não funciona
- ✅ Verifique `NEXTAUTH_SECRET` e `NEXTAUTH_URL`
- ✅ Limpe cookies do navegador
- ✅ Tente em aba anônima

### "Adicionar à Lista" não funciona
- ✅ Verifique credenciais Supabase
- ✅ Confirme que executou o schema.sql
- ✅ Verifique tabelas no Supabase Table Editor
- ✅ Veja logs no Vercel (Dashboard > Functions)

### Erro 500
- ✅ Veja logs detalhados no Vercel
- ✅ Verifique se RLS está configurado corretamente no Supabase
- ✅ Teste conexão com Supabase

## 📚 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

## 🎉 Próximos Passos

Após o deploy:
1. Configure domínio personalizado no Vercel
2. Adicione mais conteúdo (filmes/séries)
3. Implemente busca e filtros
4. Adicione analytics (Vercel Analytics)
5. Configure preview deployments automáticos
