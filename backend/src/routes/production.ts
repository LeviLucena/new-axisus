import { Router } from 'express';
import { 
  getAllProductionLogs, 
  getProductionLogById, 
  createProductionLog, 
  updateProductionLog, 
  deleteProductionLog 
} from '../controllers/productionController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllProductionLogs);
router.get('/:id', authenticateToken, getProductionLogById);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER', 'OPERATOR'), createProductionLog);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateProductionLog);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), deleteProductionLog);

export default router;