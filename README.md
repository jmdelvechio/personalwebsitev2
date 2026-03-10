# João Vechio — Site Pessoal

Site pessoal com blog CMS, captação de leads e formulário de contato.

## Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Estilização**: Tailwind CSS
- **Banco de dados**: Supabase (PostgreSQL)
- **Hospedagem**: Vercel

---

## Setup em 4 passos

### 1. Supabase
1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute o conteúdo de `supabase-schema.sql`
3. Pegue a **Project URL** e as **API Keys** em Settings > API

### 2. Variáveis de ambiente
Crie um arquivo `.env.local` na raiz:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=sua_senha_secreta
```

### 3. Rodar localmente
```bash
npm install
npm run dev
```
Acesse: http://localhost:3000

### 4. Deploy na Vercel
1. Faça push para um repositório GitHub
2. Importe o repositório na [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente no painel da Vercel
4. Deploy automático!

---

## Páginas
| URL | Descrição |
|-----|-----------|
| `/` | Homepage com todas as seções |
| `/blog` | Listagem de artigos |
| `/blog/[slug]` | Artigo individual |
| `/admin` | Painel CMS (protegido por senha) |

## Admin CMS (`/admin`)
- **Posts**: criar, editar, publicar/despublicar, excluir artigos
- **Leads**: ver inscritos na newsletter
- **Contatos**: ver mensagens do formulário de contato

## Adicionando foto
Substitua o placeholder no `src/app/page.tsx` (seção "Sobre"):
```tsx
// Trocar o div placeholder por:
<Image
  src="/foto-joao.jpg"  // adicione a foto em /public/
  alt="João Vechio"
  fill
  className="object-cover object-top"
/>
```
