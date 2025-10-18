# AXISUS MES - Documentação da API

## Descrição
AXISUS MES (Manufacturing Execution System) é um sistema completo de gestão de produção industrial com monitoramento em tempo real, análise de OEE e controle de máquinas.

## Configuração do Ambiente

### Pré-requisitos
- Node.js v18 ou superior
- PostgreSQL v12 ou superior
- Git

### Instalação do Backend

1. Clone o repositório e navegue até o diretório backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Banco de dados
DATABASE_URL="postgresql://user:password@localhost:5432/axisus_mes?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-jwt-aqui"

# Servidor
PORT=4000

# Ambiente
NODE_ENV=development
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Execute o seed para dados iniciais:
```bash
npm run seed
```

6. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:4000`

## Estrutura de Dados

### Usuários
- **ID**: Identificador único
- **firstName**: Primeiro nome
- **lastName**: Sobrenome
- **username**: Nome de usuário único
- **email**: Email único
- **role**: ADMIN | MANAGER | OPERATOR
- **status**: ATIVO | INATIVO
- **lastLogin**: Data do último login

### Máquinas
- **ID**: Identificador único
- **name**: Nome da máquina
- **type**: Tipo (Ex: Produção, Logística, Embalagem)
- **status**: RUNNING | STOPPED | MAINTENANCE
- **oee**: Overall Equipment Effectiveness
- **availability**: Disponibilidade
- **performance**: Performance
- **quality**: Qualidade

### Produtos
- **ID**: Identificador único
- **code**: Código único do produto
- **name**: Nome do produto
- **description**: Descrição
- **status**: ACTIVE | INACTIVE

### Ordens de Produção
- **ID**: Identificador único
- **orderNumber**: Número da ordem (Ex: OP010)
- **productId**: Referência ao produto
- **quantity**: Quantidade planejada
- **produced**: Quantidade produzida
- **status**: PLANNED | IN_PROGRESS | FINISHED | CANCELLED
- **priority**: Prioridade (1-5)
- **startDate**: Data de início
- **endDate**: Data de término

## Endpoints da API

### Autenticação

#### POST `/api/auth/login`
Autentica um usuário e retorna um token JWT

**Body:**
```json
{
  "username": "string",
  "password": "string",
  "profile": "administrador | gestor | operador"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": { ... }
}
```

#### GET `/api/auth/profile`
Retorna informações do usuário autenticado

**Headers:**
```
Authorization: Bearer <token>
```

### Usuários

#### GET `/api/users`
Lista todos os usuários

**Headers:**
```
Authorization: Bearer <token>
```

#### GET `/api/users/:id`
Obtém informações de um usuário específico

#### POST `/api/users`
Cria um novo usuário
- **Requer:** ADMIN role
- **Headers:** Authorization

#### PUT `/api/users/:id`
Atualiza informações de um usuário
- **Requer:** ADMIN ou MANAGER role
- **Headers:** Authorization

#### DELETE `/api/users/:id`
Exclui um usuário
- **Requer:** ADMIN role
- **Headers:** Authorization

### Máquinas

#### GET `/api/machines`
Lista todas as máquinas

#### GET `/api/machines/:id`
Obtém informações de uma máquina específica

#### POST `/api/machines`
Cria uma nova máquina
- **Requer:** ADMIN ou MANAGER role

#### PUT `/api/machines/:id`
Atualiza informações de uma máquina
- **Requer:** ADMIN ou MANAGER role

#### PUT `/api/machines/:id/status`
Atualiza o status de uma máquina
- **Requer:** ADMIN, MANAGER ou OPERATOR role

#### DELETE `/api/machines/:id`
Exclui uma máquina
- **Requer:** ADMIN role

### Produtos

#### GET `/api/products`
Lista todos os produtos

#### GET `/api/products/:id`
Obtém informações de um produto específico

#### POST `/api/products`
Cria um novo produto
- **Requer:** ADMIN ou MANAGER role

#### PUT `/api/products/:id`
Atualiza informações de um produto
- **Requer:** ADMIN ou MANAGER role

#### DELETE `/api/products/:id`
Exclui um produto
- **Requer:** ADMIN ou MANAGER role

### Ordens de Produção

#### GET `/api/orders`
Lista todas as ordens de produção

#### GET `/api/orders/:id`
Obtém informações de uma ordem específica

#### POST `/api/orders`
Cria uma nova ordem de produção
- **Requer:** ADMIN ou MANAGER role

#### PUT `/api/orders/:id`
Atualiza informações de uma ordem
- **Requer:** ADMIN ou MANAGER role

#### PUT `/api/orders/:id/start`
Inicia uma ordem de produção
- **Requer:** ADMIN, MANAGER ou OPERATOR role

#### PUT `/api/orders/:id/finish`
Finaliza uma ordem de produção
- **Requer:** ADMIN, MANAGER ou OPERATOR role

#### PUT `/api/orders/:id/cancel`
Cancela uma ordem de produção
- **Requer:** ADMIN ou MANAGER role

#### DELETE `/api/orders/:id`
Exclui uma ordem de produção
- **Requer:** ADMIN ou MANAGER role

### Produção

#### GET `/api/production`
Lista todos os registros de produção

#### GET `/api/production/:id`
Obtém informações de um registro específico

#### POST `/api/production`
Registra uma nova produção
- **Requer:** ADMIN, MANAGER ou OPERATOR role

#### PUT `/api/production/:id`
Atualiza um registro de produção
- **Requer:** ADMIN ou MANAGER role

#### DELETE `/api/production/:id`
Exclui um registro de produção
- **Requer:** ADMIN ou MANAGER role

### Análises

#### GET `/api/analytics/oee`
Métricas de OEE (Overall Equipment Effectiveness)

#### GET `/api/analytics/quality`
Métricas de qualidade

#### GET `/api/analytics/availability`
Métricas de disponibilidade

#### GET `/api/analytics/performance`
Métricas de performance

#### GET `/api/analytics/stops`
Análise de paradas

#### GET `/api/analytics/flow`
Análise de fluxo

## Credenciais de Teste

| Perfil | Usuário | Senha |
|--------|---------|-------|
| Administrador | admin | admin123 |
| Gestor | gestor01 | gestor123 |
| Operador | operador01 | operador123 |

## Integração Frontend

O backend está configurado para funcionar com o frontend em `http://localhost:5173`.
O frontend deve incluir o token JWT no header `Authorization` para requisições autenticadas.

### Exemplo de requisição:
```javascript
const response = await fetch('http://localhost:4000/api/machines', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Endereço do Serviço
O backend está disponível em: `http://localhost:4000`