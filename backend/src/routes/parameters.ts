import { Router } from 'express';
import { 
  getSystemParameters,
  updateSystemParameters,
  resetSystemParameters
} from '../controllers/parametersController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), getSystemParameters);
router.put('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateSystemParameters);
router.post('/reset', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), resetSystemParameters);

export default router;