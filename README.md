# AXISUS MES - Manufacturing Execution System

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue.svg)
![Docker](https://img.shields.io/badge/Docker-24.x-blue.svg)
![Express](https://img.shields.io/badge/Express-5.x-black.svg)
![Prisma](https://img.shields.io/badge/Prisma-6.x-blue.svg)

AXISUS MES (Manufacturing Execution System) is a comprehensive production management system designed for industrial environments. It provides real-time monitoring, OEE metrics, production order tracking, and machine performance analysis to optimize manufacturing operations.

https://github.com/user-attachments/assets/f8cdcc36-aa06-41aa-97b4-1a2e301d474e

## 🎯 Purpose

The AXISUS MES system bridges the gap between planning systems (ERP) and shop floor operations, offering:

- Real-time production monitoring
- Overall Equipment Effectiveness (OEE) tracking
- Production order management
- Quality control and traceability
- Resource allocation optimization
- Performance analytics and reporting

## 🏗️ Architecture

The system follows a modern microservices architecture with clear separation of concerns:

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
- `GET /api/analytics/tactical` - Tactical dashboard metrics

### Parameters
- `GET /api/parameters` - Get all system parameters
- `PUT /api/parameters` - Update system parameters
- `POST /api/parameters/reset` - Reset parameters to default values

## 🔧 Default Credentials

After database seeding, the system creates three default users:

| Role | Username | Password | Profile |
|------|----------|----------|---------|
| Administrator | admin | admin123 | Administrador |
| Manager | gestor01 | gestor123 | Gestor |
| Operator | operador01 | operador123 | Operador |

## 📱 Available Pages

The system now includes the following integrated pages:

### Dashboard Pages
- **/dashboard** - Main dashboard with real-time OEE metrics
- **/dashboard-tatico** - Tactical dashboard with business KPIs and analytics
- **/operador** - Operator interface for machine selection and operation

### Analysis Pages
- **/analise-qualidade** - Quality analysis with defect tracking and metrics
- **/analise-disponibilidade** - Availability analysis with machine uptime tracking
- **/analise-performance** - Performance analysis with speed and efficiency metrics
- **/analise-paradas** - Stop analysis with reasons and duration tracking
- **/analise-fluxo** - Flow analysis with bottlenecks and WIP tracking

### Management Pages
- **/ordens-producao** - Production order management
- **/produtos** - Product catalog management
- **/registrar-producao** - Production logging interface
- **/parametros** - System parameters and configuration management

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

## 📡 API Endpoints

All API endpoints require authentication with a JWT token except for the login endpoint. Tokens can be obtained by logging in via the web interface or by making a POST request to `/api/auth/login`.

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
- `GET /api/analytics/tactical` - Tactical dashboard metrics

### Parameters
- `GET /api/parameters` - Get all system parameters
- `PUT /api/parameters` - Update system parameters
- `POST /api/parameters/reset` - Reset parameters to default values

## 🔐 Authentication and Testing

To test any protected endpoint, you need to obtain a JWT token first. There are several ways to do this:

### Method 1: Using the Web Interface
1. Access the application at http://localhost:8080
2. Log in with default credentials:
   - Administrator: `admin` / `admin123`
   - Manager: `gestor01` / `gestor123`
   - Operator: `operador01` / `operador123`
3. The token will be automatically stored in localStorage

### Method 2: Programmatic Login
Make a POST request to the login endpoint:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123", "profile": "administrador"}'
```

This will return a response with a token:
```json
{
  "token": "your_jwt_token_here",
  "user": { ... }
}
```

### Testing Endpoints
Once you have a token, you can test any endpoint by including it in the Authorization header:

```bash
curl http://localhost:4000/api/analytics/tactical \
  -H "Authorization: Bearer your_jwt_token_here"
```

### Example Requests for Each Endpoint Category

#### Dashboard Endpoints
```bash
# Get OEE dashboard metrics
curl http://localhost:4000/api/analytics/oee \
  -H "Authorization: Bearer your_jwt_token_here"

# Get tactical dashboard metrics
curl http://localhost:4000/api/analytics/tactical \
  -H "Authorization: Bearer your_jwt_token_here"
```

#### Quality Analysis Endpoints
```bash
# Get quality metrics
curl http://localhost:4000/api/analytics/quality \
  -H "Authorization: Bearer your_jwt_token_here"

# Get availability metrics
curl http://localhost:4000/api/analytics/availability \
  -H "Authorization: Bearer your_jwt_token_here"

# Get performance metrics
curl http://localhost:4000/api/analytics/performance \
  -H "Authorization: Bearer your_jwt_token_here"
```

#### Production Management Endpoints
```bash
# Get machines
curl http://localhost:4000/api/machines \
  -H "Authorization: Bearer your_jwt_token_here"

# Get products
curl http://localhost:4000/api/products \
  -H "Authorization: Bearer your_jwt_token_here"

# Get orders
curl http://localhost:4000/api/orders \
  -H "Authorization: Bearer your_jwt_token_here"

# Register production
curl -X POST http://localhost:4000/api/production \
  -H "Authorization: Bearer your_jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 100, "orderId": "order_id", "productId": "product_id", "userId": "user_id"}'
```

#### Analysis Endpoints
```bash
# Get stop analysis
curl http://localhost:4000/api/analytics/stops \
  -H "Authorization: Bearer your_jwt_token_here"

# Get flow analysis
curl http://localhost:4000/api/analytics/flow \
  -H "Authorization: Bearer your_jwt_token_here"
```

#### Parameter Management Endpoints
```bash
# Get system parameters
curl http://localhost:4000/api/parameters \
  -H "Authorization: Bearer your_jwt_token_here"

# Update parameters
curl -X PUT http://localhost:4000/api/parameters \
  -H "Authorization: Bearer your_jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{"section": "oeeTargets", "data": {"oeeGeral": 90, "disponibilidade": 95}}'

# Reset parameters to defaults
curl -X POST http://localhost:4000/api/parameters/reset \
  -H "Authorization: Bearer your_jwt_token_here"
```

  1. Acessando o token do localStorage (via navegador):
  Se você já estiver logado na aplicação, o token JWT está armazenado no localStorage do navegador:
```
   - Abra o Console do navegador (F12)
   - Execute: localStorage.getItem('token')
```
  2. Fazendo login via API:
  Você pode obter um novo token fazendo uma requisição POST para o endpoint de login:
```
   1 POST http://localhost:4000/api/auth/login
```
  Com o corpo da requisição no formato JSON:
```
   1 {
   2   "username": "admin",
   3   "password": "admin123",
   4   "profile": "administrador"
   5 }
```
  3. Usando credenciais padrão:
  O projeto vem com credenciais padrão definidas na documentação:

```
  ┌───────────────┬────────────┬─────────────┐
  │ Perfil        │ Usuário    │ Senha       │
  ├───────────────┼────────────┼─────────────┤
  │ Administrador │ admin      │ admin123    │
  │ Gestor        │ gestor01   │ gestor123   │
  │ Operador      │ operador01 │ operador123 │
  └───────────────┴────────────┴─────────────┘
```

  Exemplo completo de obtenção e uso do token:

   1. Primeiro, faça login para obter o token:
```
   1 curl -X POST http://localhost:4000/api/auth/login \
   2   -H "Content-Type: application/json" \
   3   -d '{"username": "admin", "password": "admin123", "profile": "administrador"}'
```
   2. Isso retornará algo como:                                                                                       
```
   1 {
   2   "token": "seu_token_jwt_aqui",
   3   "user": { ... }
   4 }
```
   3. Use o token retornado na requisição para o dashboard tático:
```
   1 curl http://localhost:4000/api/analytics/tactical \
   2   -H "Authorization: Bearer seu_token_jwt_aqui"
```
  Ou você pode pegar o token diretamente acessando a aplicação web em http://localhost:8080, fazendo login
  e usando o token que foi automaticamente salvo no localStorage do seu navegador.

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
- Tactical dashboard with business KPIs
- Stop analysis with root cause identification
- Parameter configuration and management

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

For support, please contact the development team or open an issue in the repository. 
