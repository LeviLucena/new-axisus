import { PrismaClient } from '@prisma/client';
import { Order } from '../types';

const prisma = new PrismaClient();

// Define types from Prisma
type OrderStatus = 'PLANNED' | 'IN_PROGRESS' | 'FINISHED' | 'CANCELLED';

export class OrderService {
  async getAllOrders() {
    return await prisma.order.findMany({
      include: {
        product: true,
        createdBy: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getOrderById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async createOrder(orderData: Omit<Order, 'id' | 'produced' | 'status' | 'createdAt' | 'updatedAt'>) {
    return await prisma.order.create({
      data: {
        ...orderData,
        status: 'PLANNED',
        produced: 0
      },
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async updateOrder(id: string, orderData: Partial<Order>) {
    return await prisma.order.update({
      where: { id },
      data: orderData,
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async startOrder(id: string) {
    return await prisma.order.update({
      where: { id },
      data: { 
        status: 'IN_PROGRESS',
        startDate: new Date()
      },
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async finishOrder(id: string) {
    return await prisma.order.update({
      where: { id },
      data: { 
        status: 'FINISHED',
        endDate: new Date()
      },
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async cancelOrder(id: string) {
    return await prisma.order.update({
      where: { id },
      data: { 
        status: 'CANCELLED',
        endDate: new Date()
      },
      include: {
        product: true,
        createdBy: true
      }
    });
  }

  async deleteOrder(id: string) {
    return await prisma.order.delete({
      where: { id }
    });
  }
}