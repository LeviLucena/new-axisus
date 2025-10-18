import { Router } from 'express';
import { 
  getAllOrders, 
  getOrderById, 
  createOrder, 
  updateOrder, 
  startOrder,
  finishOrder,
  cancelOrder,
  deleteOrder 
} from '../controllers/orderController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllOrders);
router.get('/:id', authenticateToken, getOrderById);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), createOrder);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateOrder);
router.put('/:id/start', authenticateToken, authorizeRoles('ADMIN', 'MANAGER', 'OPERATOR'), startOrder);
router.put('/:id/finish', authenticateToken, authorizeRoles('ADMIN', 'MANAGER', 'OPERATOR'), finishOrder);
router.put('/:id/cancel', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), cancelOrder);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), deleteOrder);

export default router;