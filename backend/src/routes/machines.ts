import { Router } from 'express';
import { 
  getAllMachines, 
  getMachineById, 
  createMachine, 
  updateMachine, 
  updateMachineStatus,
  deleteMachine 
} from '../controllers/machineController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllMachines);
router.get('/:id', authenticateToken, getMachineById);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), createMachine);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateMachine);
router.put('/:id/status', authenticateToken, authorizeRoles('ADMIN', 'MANAGER', 'OPERATOR'), updateMachineStatus);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN'), deleteMachine);

export default router;