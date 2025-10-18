# AXISUS MES Backend API

## Overview

The AXISUS MES (Manufacturing Execution System) Backend API provides a comprehensive RESTful interface for managing manufacturing operations. Built with Node.js, Express, and Prisma ORM, it offers robust data management, real-time monitoring, and analytics capabilities.

## Base URL

```
http://localhost:4000/api
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "profile": "administrador|gestor|operador"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "role": "ADMIN|MANAGER|OPERATOR",
    "status": "ATIVO",
    "createdAt": "ISO timestamp",
    "updatedAt": "ISO timestamp",
    "groupId": "string"
  }
}
```

### Get Profile
```
GET /auth/profile
```

Returns the authenticated user's profile information.

## Users

### Get All Users
```
GET /users
```

Returns a list of all users with pagination support.

### Get User by ID
```
GET /users/:id
```

Returns detailed information about a specific user.

### Create User
```
POST /users
```

Creates a new user account.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string", 
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "ADMIN|MANAGER|OPERATOR",
  "groupId": "string"
}
```

### Update User
```
PUT /users/:id
```

Updates an existing user's information.

### Delete User
```
DELETE /users/:id
```

Removes a user account from the system.

## Machines

### Get All Machines
```
GET /machines
```

Returns a list of all machines with their current status and OEE metrics.

### Get Machine by ID
```
GET /machines/:id
```

Returns detailed information about a specific machine.

### Create Machine
```
POST /machines
```

Registers a new machine in the system.

**Request Body:**
```json
{
  "name": "string",
  "type": "string",
  "groupId": "string"
}
```

### Update Machine
```
PUT /machines/:id
```

Updates machine information.

### Update Machine Status
```
PUT /machines/:id/status
```

Updates the operational status of a machine.

**Request Body:**
```json
{
  "status": "RUNNING|STOPPED|MAINTENANCE"
}
```

### Delete Machine
```
DELETE /machines/:id
```

Removes a machine from the system.

## Products

### Get All Products
```
GET /products
```

Returns a list of all products.

### Get Product by ID
```
GET /products/:id
```

Returns detailed information about a specific product.

### Create Product
```
POST /products
```

Registers a new product in the catalog.

**Request Body:**
```json
{
  "code": "string",
  "name": "string",
  "description": "string"
}
```

### Update Product
```
PUT /products/:id
```

Updates product information.

### Delete Product
```
DELETE /products/:id
```

Removes a product from the catalog.

## Production Orders

### Get All Orders
```
GET /orders
```

Returns a list of all production orders with filtering and sorting options.

### Get Order by ID
```
GET /orders/:id
```

Returns detailed information about a specific production order.

### Create Order
```
POST /orders
```

Creates a new production order.

**Request Body:**
```json
{
  "orderNumber": "string",
  "productId": "string",
  "quantity": "number",
  "priority": "number",
  "createdById": "string"
}
```

### Update Order
```
PUT /orders/:id
```

Updates order information.

### Start Order
```
PUT /orders/:id/start
```

Marks an order as in progress and sets the start time.

### Finish Order
```
PUT /orders/:id/finish
```

Marks an order as completed and sets the end time.

### Cancel Order
```
PUT /orders/:id/cancel
```

Cancels a production order.

### Delete Order
```
DELETE /orders/:id
```

Removes an order from the system.

## Production Logs

### Get All Production Logs
```
GET /production
```

Returns a list of all production logs with filtering by date, machine, or order.

### Get Production Log by ID
```
GET /production/:id
```

Returns detailed information about a specific production log entry.

### Create Production Log
```
POST /production
```

Records a new production activity.

**Request Body:**
```json
{
  "quantity": "number",
  "machineId": "string",
  "orderId": "string",
  "productId": "string",
  "userId": "string"
}
```

### Update Production Log
```
PUT /production/:id
```

Updates a production log entry.

### Delete Production Log
```
DELETE /production/:id
```

Removes a production log entry.

## Analytics

### OEE Metrics
```
GET /analytics/oee
```

Returns Overall Equipment Effectiveness metrics for all machines.

### Quality Metrics
```
GET /analytics/quality
```

Returns quality-related metrics and defect analysis.

### Availability Metrics
```
GET /analytics/availability
```

Returns machine availability statistics and downtime analysis.

### Performance Metrics
```
GET /analytics/performance
```

Returns performance metrics and throughput analysis.

### Stop Analysis
```
GET /analytics/stops
```

Returns detailed analysis of machine stops and downtimes.

### Flow Analysis
```
GET /analytics/flow
```

Returns production flow and bottleneck analysis.

## Groups

### Get All Groups
```
GET /groups
```

Returns a list of all user groups.

### Get Group by ID
```
GET /groups/:id
```

Returns detailed information about a specific group.

### Create Group
```
POST /groups
```

Creates a new user group.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

### Update Group
```
PUT /groups/:id
```

Updates group information.

### Delete Group
```
DELETE /groups/:id
```

Removes a group from the system.

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "message": "Error description"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per hour per IP address
- 10 requests per minute for authentication endpoints

## CORS Policy

The API allows cross-origin requests from:
- `http://localhost`
- `http://localhost:5173`
- Any origin (for development)

## Data Models

### User
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'OPERATOR';
  status: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  groupId?: string;
}
```

### Machine
```typescript
{
  id: string;
  name: string;
  type: string;
  status: 'RUNNING' | 'STOPPED' | 'MAINTENANCE';
  groupId?: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product
```typescript
{
  id: string;
  code: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}
```

### Order
```typescript
{
  id: string;
  orderNumber: string;
  productId: string;
  quantity: number;
  produced: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';
  priority?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}
```

### ProductionLog
```typescript
{
  id: string;
  quantity: number;
  timestamp: Date;
  machineId: string;
  orderId: string;
  productId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Environment Variables

The backend requires the following environment variables:

```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development|production
PORT=4000
```

## Health Checks

### API Health
```
GET /health
```

Returns the overall health status of the API.

### Database Health
```
GET /health/db
```

Returns the database connection status.

## WebSocket Support

The backend also supports real-time updates through WebSocket connections for:
- Live machine status updates
- Real-time production logging
- Instant notification system

WebSocket endpoint: `ws://localhost:4000/ws`

## Performance Optimization

- Connection pooling for database connections
- Response caching for frequently accessed data
- Database indexing for improved query performance
- Compression for reduced bandwidth usage
- Pagination for large dataset handling