import { Router } from 'express';
import { 
  getOeeMetrics,
  getQualityMetrics,
  getAvailabilityMetrics,
  getPerformanceMetrics,
  getStopAnalysis,
  getFlowAnalysis,
  getTacticalDashboard
} from '../controllers/analyticsController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/oee', authenticateToken, getOeeMetrics);
router.get('/quality', authenticateToken, getQualityMetrics);
router.get('/availability', authenticateToken, getAvailabilityMetrics);
router.get('/performance', authenticateToken, getPerformanceMetrics);
router.get('/stops', authenticateToken, getStopAnalysis);
router.get('/flow', authenticateToken, getFlowAnalysis);
router.get('/tactical', authenticateToken, getTacticalDashboard);

export default router;