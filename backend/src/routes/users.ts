import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.post('/', authenticateToken, authorizeRoles('ADMIN'), createUser);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), deleteUser);

export default router;