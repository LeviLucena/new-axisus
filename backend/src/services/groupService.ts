import { PrismaClient } from '@prisma/client';
import { Group } from '../types';

const prisma = new PrismaClient();

export class GroupService {
  async getAllGroups() {
    return await prisma.group.findMany();
  }

  async getGroupById(id: string) {
    return await prisma.group.findUnique({
      where: { id }
    });
  }

  async createGroup(groupData: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.group.create({
      data: groupData
    });
  }

  async updateGroup(id: string, groupData: Partial<Group>) {
    return await prisma.group.update({
      where: { id },
      data: groupData
    });
  }

  async deleteGroup(id: string) {
    return await prisma.group.delete({
      where: { id }
    });
  }
}