import { Request, Response } from 'express';
import { GroupService } from '../services/groupService';

const groupService = new GroupService();

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    return res.json(groups);
  } catch (error) {
    console.error('Get groups error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await groupService.getGroupById(id);
    
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    
    return res.json(group);
  } catch (error) {
    console.error('Get group error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await groupService.createGroup(req.body);
    return res.status(201).json(group);
  } catch (error) {
    console.error('Create group error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await groupService.updateGroup(id, req.body);
    return res.json(group);
  } catch (error) {
    console.error('Update group error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await groupService.deleteGroup(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Delete group error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};