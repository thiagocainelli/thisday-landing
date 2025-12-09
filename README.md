# thisday - Landing Page

Landing page moderna para a plataforma thisday, uma solução que permite reunir todas as fotos e vídeos de eventos através de QR Code, sem necessidade de app ou cadastro.

## 🚀 Tecnologias

- **React 18** + **TypeScript** - Framework e tipagem
- **Vite** - Build tool e dev server
- **React Router v6** - Roteamento com code splitting
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI baseados em Radix UI
- **Framer Motion** - Animações e transições
- **React Hook Form** + **Zod** - Formulários e validação
- **TanStack Query** - Gerenciamento de estado assíncrono

## 📋 Pré-requisitos

- Node.js 18+ e npm (ou yarn/pnpm)
- Git

## 🛠️ Instalação e Execução

```bash
# Clone o repositório
git clone <repository-url>
cd thisday-landing

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:8080
```

## 📜 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run build:dev    # Build em modo desenvolvimento
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
```

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes React
│   ├── landing/     # Componentes da landing page
│   ├── ui/          # Componentes UI base (shadcn)
│   └── seo/         # Componentes de SEO
├── pages/           # Páginas da aplicação
├── hooks/           # Custom hooks
├── utils/           # Funções utilitárias
├── constants/       # Constantes e configurações
├── routes.tsx       # Configuração de rotas
└── App.tsx          # Componente principal
```

## 🎨 Funcionalidades

- ✅ Landing page completa com múltiplas seções
- ✅ Fluxo de criação de evento com validação
- ✅ Checkout com pagamento Pix e cartão de crédito
- ✅ Cartão de crédito 3D interativo
- ✅ Páginas legais (Termos e Privacidade)
- ✅ Página de contato com formulário
- ✅ SEO otimizado (meta tags, Open Graph, Schema.org)
- ✅ Code splitting e lazy loading
- ✅ Responsivo e acessível
- ✅ Animações suaves com Framer Motion

## 🔧 Configuração

O projeto utiliza variáveis de ambiente através de `import.meta.env`. Para produção, configure:

- `VITE_API_URL` - URL da API (se aplicável)
- Outras variáveis conforme necessário

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🚢 Deploy

O projeto pode ser deployado em qualquer plataforma que suporte aplicações React estáticas:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Outros serviços de hospedagem estática**

## 📝 Licença

Este projeto é privado e proprietário.

## 👥 Contribuindo

Este é um projeto privado. Para contribuições, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para thisday**
