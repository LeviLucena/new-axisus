import { PrismaClient } from '@prisma/client';
import { Machine } from '../types';

const prisma = new PrismaClient();

// Define types from Prisma
type MachineStatus = 'RUNNING' | 'STOPPED' | 'MAINTENANCE';

export class MachineService {
  async getAllMachines() {
    return await prisma.machine.findMany({
      include: {
        group: true
      }
    });
  }

  async getMachineById(id: string) {
    return await prisma.machine.findUnique({
      where: { id },
      include: {
        group: true
      }
    });
  }

  async createMachine(machineData: Omit<Machine, 'id' | 'oee' | 'availability' | 'performance' | 'quality' | 'createdAt' | 'updatedAt'>) {
    return await prisma.machine.create({
      data: {
        ...machineData,
        oee: 0,
        availability: 0,
        performance: 0,
        quality: 0
      },
      include: {
        group: true
      }
    });
  }

  async updateMachine(id: string, machineData: Partial<Machine>) {
    return await prisma.machine.update({
      where: { id },
      data: machineData,
      include: {
        group: true
      }
    });
  }

  async updateMachineStatus(id: string, status: MachineStatus) {
    return await prisma.machine.update({
      where: { id },
      data: { status },
      include: {
        group: true
      }
    });
  }

  async deleteMachine(id: string) {
    return await prisma.machine.delete({
      where: { id }
    });
  }
}