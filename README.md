# AXISUS MES - Manufacturing Execution System

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue.svg)
![Docker](https://img.shields.io/badge/Docker-24.x-blue.svg)
![Express](https://img.shields.io/badge/Express-5.x-black.svg)
![Prisma](https://img.shields.io/badge/Prisma-6.x-blue.svg)

AXISUS MES (Manufacturing Execution System) is a comprehensive production management system designed for industrial environments. It provides real-time monitoring, OEE metrics, production order tracking, and machine performance analysis to optimize manufacturing operations.

## 🎯 Purpose

The AXISUS MES system bridges the gap between planning systems (ERP) and shop floor operations, offering:

- Real-time production monitoring
- Overall Equipment Effectiveness (OEE) tracking
- Production order management
- Quality control and traceability
- Resource allocation optimization
- Performance analytics and reporting

## 🏗️ Architecture

<<<<<<< HEAD
The system follows a modern microservices architecture with clear separation of concerns:
=======
https://github.com/user-attachments/assets/4c0254ec-f761-4a1f-8f45-27e2f674c4d3

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
>>>>>>> a4faff39a8932964c24e57aa1d1a5b606506ccac

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database       │
│   (React)       │◄──►│   (Node/Express)│◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
       │                        │                        │
       ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Docker        │    │   Prisma ORM    │    │   Persistent    │
│   Container     │    │   Migration     │    │   Volume        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Technologies

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Axios** for HTTP requests
- **Recharts** for data visualization

### Backend
- **Node.js 18** with TypeScript
- **Express.js 5** for REST API
- **Prisma ORM** for database operations
- **PostgreSQL 15** as database
- **JWT** for authentication
- **Bcrypt.js** for password hashing
- **Zod** for validation
- **Dotenv** for environment management

### Infrastructure
- **Docker** for containerization
- **Docker Compose** for orchestration
- **Nginx** as reverse proxy
- **PostgreSQL** for data persistence

## 📁 Project Structure

```
artful-route-mapper/
├── backend/                 # Backend API service
│   ├── prisma/             # Database schema and migrations
│   │   ├── schema.prisma   # Prisma schema definition
│   │   └── seed.ts         # Database seeding script
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── types/          # TypeScript types
│   ├── Dockerfile          # Backend Docker configuration
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend React application
│   ├── src/                # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and API clients
│   │   └── routes/         # Route definitions
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json        # Frontend dependencies
├── docker-compose.yml      # Docker orchestration
└── README.md              # This file
```

## 🔄 How It Works

1. **Frontend** serves the user interface through Nginx
2. **Backend API** handles all business logic and data operations
3. **PostgreSQL** stores all production data persistently
4. **Prisma ORM** manages database interactions
5. **Docker Compose** orchestrates all services together

The system uses JWT tokens for authentication, with role-based access control (ADMIN, MANAGER, OPERATOR) to ensure proper permissions across different user types.

## 🛠️ API Routes

### Authentication
- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get authenticated user profile

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Machines
- `GET /api/machines` - List all machines
- `GET /api/machines/:id` - Get specific machine
- `POST /api/machines` - Create new machine
- `PUT /api/machines/:id` - Update machine
- `PUT /api/machines/:id/status` - Update machine status
- `DELETE /api/machines/:id` - Delete machine

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Production Orders
- `GET /api/orders` - List all production orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `PUT /api/orders/:id/start` - Start order execution
- `PUT /api/orders/:id/finish` - Finish order execution
- `PUT /api/orders/:id/cancel` - Cancel order
- `DELETE /api/orders/:id` - Delete order

### Production Logs
- `GET /api/production` - List production logs
- `GET /api/production/:id` - Get specific log
- `POST /api/production` - Create new log
- `PUT /api/production/:id` - Update log
- `DELETE /api/production/:id` - Delete log

### Analytics
- `GET /api/analytics/oee` - Overall Equipment Effectiveness metrics
- `GET /api/analytics/quality` - Quality metrics
- `GET /api/analytics/availability` - Availability metrics
- `GET /api/analytics/performance` - Performance metrics
- `GET /api/analytics/stops` - Stop analysis
- `GET /api/analytics/flow` - Production flow analysis

## 🔧 Default Credentials

After database seeding, the system creates three default users:

| Role | Username | Password | Profile |
|------|----------|----------|---------|
| Administrator | admin | admin123 | Administrador |
| Manager | gestor01 | gestor123 | Gestor |
| Operator | operador01 | operador123 | Operador |

## 🐳 Quick Start with Docker

1. **Clone the repository:**
```bash
git clone <repository-url>
cd artful-route-mapper
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Access the application:**
- Frontend: http://localhost
- Backend API: http://localhost:4000
- Database: localhost:5432

4. **Stop services:**
```bash
docker-compose down
```

## 📊 Key Features

### Dashboard
- Real-time machine status monitoring
- OEE (Overall Equipment Effectiveness) metrics
- Production order tracking
- Performance indicators (availability, performance, quality)

### Production Management
- Production order creation and tracking
- Machine assignment and scheduling
- Real-time production logging
- Quality control checkpoints

### Analytics & Reporting
- Historical performance analysis
- Downtime analysis and reporting
- Quality metrics tracking
- Production flow optimization

### User Management
- Role-based access control
- User group management
- Permission delegation
- Activity logging

## 🔒 Security Features

- JWT-based authentication
- Role-based authorization
- Password encryption with bcrypt
- Input validation with Zod
- SQL injection protection with Prisma ORM
- Rate limiting and security headers

## 📈 Scalability

The system is designed to scale horizontally:
- Stateless backend services
- Database connection pooling
- Containerized deployment
- Load balancing ready

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🆘 Support

<<<<<<< HEAD
For support, please contact the development team or open an issue in the repository.
=======
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
>>>>>>> a4faff39a8932964c24e57aa1d1a5b606506ccac
