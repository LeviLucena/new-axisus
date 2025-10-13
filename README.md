<p align="center">

  <!-- Linguagem principal -->
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  
  <!-- Framework principal -->
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  </a>
  
  <!-- Bundler -->
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  </a>
  
  <!-- Estilização -->
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  
  <!-- UI Components -->
  <a href="https://ui.shadcn.com/">
    <img src="https://img.shields.io/badge/-shadcn%2Fui-000000?style=flat-square&logo=css3&logoColor=white" alt="shadcn/ui" />
  </a>
  
  <!-- Gerenciamento de estado -->
  <a href="https://tanstack.com/query">
    <img src="https://img.shields.io/badge/-React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" alt="React Query" />
  </a>
  
  <!-- Validação -->
  <a href="https://zod.dev/">
    <img src="https://img.shields.io/badge/-Zod-3E67B1?style=flat-square&logo=typescript&logoColor=white" alt="Zod" />
  </a>
  
  <!-- Roteamento -->
  <a href="https://reactrouter.com/">
    <img src="https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router" />
  </a>
  
  <!-- Ambiente -->
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/-Node.js-43853D?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  </a>
  
  <!-- Testes -->
  <a href="https://jestjs.io/">
    <img src="https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest" />
  </a>
  
  <!-- Status do projeto -->
  <img src="https://img.shields.io/badge/status-em_desenvolvimento-success?style=flat-square" alt="Status" />

  <!-- Licença -->
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />

</p>

# AXISUS MES - Sistema de Gestão de Produção

## 📋 Descrição

AXISUS MES é um sistema completo de gestão de produção industrial com monitoramento em tempo real, análise de OEE (Overall Equipment Effectiveness) e controle de máquinas. A aplicação oferece uma plataforma integrada para gerenciamento de operações de produção, análise de desempenho e tomada de decisão baseada em dados.

## ✨ Funcionalidades

- **Dashboard Executivo**: Visão geral do desempenho da produção
- **Dashboard Tático**: Análise detalhada de indicadores
- **Ordens de Produção**: Gestão de ordens de produção
- **Registro de Produção**: Controle de produção em tempo real
- **Análise de Qualidade**: Monitoramento e análise de qualidade
- **Análise de Disponibilidade**: Avaliação da disponibilidade de equipamentos
- **Análise de Performance**: Análise do desempenho produtivo
- **Análise de Paradas**: Identificação e análise de paradas de equipamentos
- **Análise de Fluxo**: Monitoramento do fluxo de produção
- **Gestão de Usuários**: Controle de acesso e permissões
- **Gestão de Grupos**: Organização de usuários em grupos
- **Gestão de Produtos**: Catalogação e controle de produtos
- **Parâmetros**: Configurações do sistema
- **Interface Operacional**: Tela específica para operadores de máquina

## 🛠️ Tecnologias Utilizadas

### Linguagens
- **TypeScript**: Superset tipado do JavaScript
- **JavaScript**: Linguagem de programação

### Framework e Bibliotecas
- **React 18.3.1**: Biblioteca JavaScript para construção de interfaces
- **React Router DOM**: Roteamento e navegação entre páginas
- **Vite 5.4.19**: Ferramenta de build rápida
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes primitivos sem estilos
- **shadcn/ui**: Biblioteca de componentes acessíveis e customizáveis

### Gerenciamento de Estado e Dados
- **React Query (TanStack Query)**: Gerenciamento de cache e sincronização de dados
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas

### Componentes e UI
- **Radix UI Primitives**: Componentes acessíveis e não estilizados
- **Lucide React**: Ícones SVG
- **Recharts**: Biblioteca de visualização de dados
- **Date-fns**: Manipulação de datas
- **Sonner**: Notificações toast
- **Cmdk**: Componente de comando (command palette)

### Utilitários
- **Class Variance Authority**: Utilitário para variantes de classes
- **CLSX**: Utilitário para condicional de classes CSS
- **Tailwind Merge**: Mesclagem segura de classes Tailwind
- **Input OTP**: Componente de verificação de código de uso único

### Estilização
- **Tailwind CSS 3.4.17**: Framework de estilização utilitário
- **Tailwind CSS Animate**: Animações prontas para Tailwind
- **Tailwind CSS Typography**: Plugin para estilização de conteúdo

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis da aplicação
│   ├── ui/             # Componentes de UI (shadcn/ui)
│   └── AppSidebar.tsx  # Barra lateral da aplicação
├── pages/              # Componentes das páginas da aplicação
│   ├── Dashboard.tsx   # Dashboard executivo
│   ├── DashboardTatico.tsx # Dashboard tático
│   ├── Analise*.tsx    # Páginas de análise (Qualidade, Disponibilidade, etc.)
│   ├── Gestao*.tsx     # Páginas de gestão (Usuários, Grupos, etc.)
│   ├── Login.tsx       # Tela de login
│   ├── NotFound.tsx    # Página de erro 404
│   └── ...
├── hooks/              # Hooks personalizados
├── lib/                # Código de utilidades e funções auxiliares
├── App.tsx             # Componente principal da aplicação
├── main.tsx            # Ponto de entrada da aplicação
├── index.css           # Estilos CSS globais
└── App.css             # Estilos específicos da aplicação
```

## 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Instalação e Execução

### Instalação Local

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd artful-route-mapper
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`

### Execução com Docker

A aplicação também pode ser executada usando Docker:

1. Certifique-se de ter o Docker instalado em seu sistema

2. Execute a aplicação com docker-compose:
```bash
docker-compose up -d
```

A aplicação estará disponível em `http://localhost`

3. Para parar a aplicação:
```bash
docker-compose down
```

## 📦 Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev` - Inicia o servidor de desenvolvimento com hot-reload
- `npm run build` - Cria uma versão otimizada para produção na pasta `dist`
- `npm run build:dev` - Cria uma versão de desenvolvimento na pasta `dist`
- `npm run lint` - Executa o ESLint para verificar problemas de código
- `npm run preview` - Inicia um servidor local para visualizar o build de produção

## 🚢 Deploy

### Para produção
1. Execute o build de produção:
```bash
npm run build
```

2. Os arquivos otimizados estarão disponíveis na pasta `dist`

3. Configure seu servidor web para servir os arquivos estáticos (ex: Nginx, Apache)

### Com Docker
1. Use o Dockerfile para criar uma imagem:
```bash
docker build -t axisus-mes .
```

2. Execute o container:
```bash
docker run -p 80:80 axisus-mes
```

## 🧪 Testes

Ainda não há testes implementados, mas recomenda-se adicionar testes unitários e de integração com frameworks como Jest e React Testing Library.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

AXISUS MES - Sistema de Gestão de Produção

## 🐳 Docker

O projeto inclui suporte para Docker e Docker Compose para facilitar a implantação em ambientes de produção. O Dockerfile utiliza uma abordagem de build em múltiplas etapas para otimizar o tamanho da imagem final.

## 🔒 Segurança

O projeto implementa práticas recomendadas de segurança, incluindo:

- Tipagem estática com TypeScript
- Validação de formulários com Zod
- Componentes acessíveis com Radix UI
- Gerenciamento seguro de estado com React Query