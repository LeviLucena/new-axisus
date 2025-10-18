import { Router } from 'express';
import { 
  getOeeMetrics,
  getQualityMetrics,
  getAvailabilityMetrics,
  getPerformanceMetrics,
  getStopAnalysis,
  getFlowAnalysis
} from '../controllers/analyticsController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/oee', authenticateToken, getOeeMetrics);
router.get('/quality', authenticateToken, getQualityMetrics);
router.get('/availability', authenticateToken, getAvailabilityMetrics);
router.get('/performance', authenticateToken, getPerformanceMetrics);
router.get('/stops', authenticateToken, getStopAnalysis);
router.get('/flow', authenticateToken, getFlowAnalysis);

export default router;