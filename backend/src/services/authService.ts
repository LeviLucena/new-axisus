import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse, User } from '../types';

const prisma = new PrismaClient();

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse | null> {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username: credentials.username },
      include: { group: true }
    });

    if (!user || !await bcrypt.compare(credentials.password, user.password)) {
      return null;
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin || undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        groupId: user.groupId || undefined,
      }
    };
  }
}

// Define a type for creating users that includes password
type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string };
type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        group: true
      }
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        group: true
      }
    });
  }

  async createUser(userData: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      include: {
        group: true
      }
    });
  }

  async updateUser(id: string, userData: UpdateUserInput) {
    // Password is handled separately since it needs to be hashed
    const { password, ...otherData } = userData as any;
    const updateData: any = { ...otherData };
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    return await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        group: true
      }
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }
}