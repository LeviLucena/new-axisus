import { PrismaClient } from '@prisma/client';
import { Product } from '../types';

const prisma = new PrismaClient();

export class ProductService {
  async getAllProducts() {
    return await prisma.product.findMany();
  }

  async getProductById(id: string) {
    return await prisma.product.findUnique({
      where: { id }
    });
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.product.create({
      data: productData
    });
  }

  async updateProduct(id: string, productData: Partial<Product>) {
    return await prisma.product.update({
      where: { id },
      data: productData
    });
  }

  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: { id }
    });
  }
}