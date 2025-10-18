import { Router } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);
router.post('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), createProduct);
router.put('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), updateProduct);
router.delete('/:id', authenticateToken, authorizeRoles('ADMIN', 'MANAGER'), deleteProduct);

export default router;