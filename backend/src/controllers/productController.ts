import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    return res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    return res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};