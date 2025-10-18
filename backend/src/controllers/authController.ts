import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Map profile to role (for compatibility with frontend)
    const profile = req.body.profile;
    let role: string;
    switch (profile) {
      case 'administrador':
        role = 'ADMIN';
        break;
      case 'gestor':
        role = 'MANAGER';
        break;
      case 'operador':
        role = 'OPERATOR';
        break;
      default:
        role = 'OPERATOR';
    }

    const result = await authService.login({ username, password, profile: role });
    
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token is required' });
    }

    // In a real implementation, we'd decode the JWT to get user info
    // For demo purposes, we'll return a mock response
    return res.json({
      id: '1',
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@axisus.com',
      role: 'ADMIN',
      status: 'ATIVO',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};