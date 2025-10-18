import { Request, Response } from 'express';
import { ProductionService } from '../services/productionService';

const productionService = new ProductionService();

export const getAllProductionLogs = async (req: Request, res: Response) => {
  try {
    const logs = await productionService.getAllProductionLogs();
    return res.json(logs);
  } catch (error) {
    console.error('Get production logs error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductionLogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const log = await productionService.getProductionLogById(id);
    
    if (!log) {
      return res.status(404).json({ message: 'Production log not found' });
    }
    
    return res.json(log);
  } catch (error) {
    console.error('Get production log error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProductionLog = async (req: Request, res: Response) => {
  try {
    const log = await productionService.createProductionLog(req.body);
    return res.status(201).json(log);
  } catch (error) {
    console.error('Create production log error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProductionLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const log = await productionService.updateProductionLog(id, req.body);
    return res.json(log);
  } catch (error) {
    console.error('Update production log error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProductionLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productionService.deleteProductionLog(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Delete production log error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};