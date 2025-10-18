import { PrismaClient } from '@prisma/client';
import { ProductionLog } from '../types';

const prisma = new PrismaClient();

export class ProductionService {
  async getAllProductionLogs() {
    return await prisma.productionLog.findMany({
      include: {
        machine: true,
        order: true,
        product: true,
        user: true
      },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getProductionLogById(id: string) {
    return await prisma.productionLog.findUnique({
      where: { id },
      include: {
        machine: true,
        order: true,
        product: true,
        user: true
      }
    });
  }

  async createProductionLog(productionData: Omit<ProductionLog, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.productionLog.create({
      data: productionData,
      include: {
        machine: true,
        order: true,
        product: true,
        user: true
      }
    });
  }

  async updateProductionLog(id: string, productionData: Partial<ProductionLog>) {
    return await prisma.productionLog.update({
      where: { id },
      data: productionData,
      include: {
        machine: true,
        order: true,
        product: true,
        user: true
      }
    });
  }

  async deleteProductionLog(id: string) {
    return await prisma.productionLog.delete({
      where: { id }
    });
  }
}