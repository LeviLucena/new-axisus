import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

const orderService = new OrderService();

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    return res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.updateOrder(id, req.body);
    return res.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const startOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.startOrder(id);
    return res.json(order);
  } catch (error) {
    console.error('Start order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const finishOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.finishOrder(id);
    return res.json(order);
  } catch (error) {
    console.error('Finish order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await orderService.cancelOrder(id);
    return res.json(order);
  } catch (error) {
    console.error('Cancel order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await orderService.deleteOrder(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Delete order error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};