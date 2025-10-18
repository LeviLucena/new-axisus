// Types for the AXISUS MES Backend

export interface User {
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

export interface LoginRequest {
  username: string;
  password: string;
  profile: string; // 'administrador', 'gestor', 'operador'
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
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

export interface Machine {
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

export interface ProductionLog {
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