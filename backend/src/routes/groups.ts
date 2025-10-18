import { Router } from 'express';
import { 
  getAllGroups, 
  getGroupById, 
  createGroup, 
  updateGroup, 
  deleteGroup 
} from '../controllers/groupController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllGroups);
router.get('/:id', authenticateToken, getGroupById);
router.post('/', authenticateToken, authorizeRoles('ADMIN'), createGroup);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateGroup);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), deleteGroup);

export default router;