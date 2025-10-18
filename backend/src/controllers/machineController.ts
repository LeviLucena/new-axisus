import { Request, Response } from 'express';
import { MachineService } from '../services/machineService';

const machineService = new MachineService();

export const getAllMachines = async (req: Request, res: Response) => {
  try {
    const machines = await machineService.getAllMachines();
    return res.json(machines);
  } catch (error) {
    console.error('Get machines error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMachineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const machine = await machineService.getMachineById(id);
    
    if (!machine) {
      return res.status(404).json({ message: 'Machine not found' });
    }
    
    return res.json(machine);
  } catch (error) {
    console.error('Get machine error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createMachine = async (req: Request, res: Response) => {
  try {
    const machine = await machineService.createMachine(req.body);
    return res.status(201).json(machine);
  } catch (error) {
    console.error('Create machine error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMachine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const machine = await machineService.updateMachine(id, req.body);
    return res.json(machine);
  } catch (error) {
    console.error('Update machine error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMachineStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const machine = await machineService.updateMachineStatus(id, status);
    return res.json(machine);
  } catch (error) {
    console.error('Update machine status error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMachine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await machineService.deleteMachine(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Delete machine error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};