import { Request, Response } from 'express';

// Mock data for demonstration
const mockMachines = [
  { id: 1, name: 'Prensa Hidráulica 01', type: 'Produção', status: 'RUNNING', oee: 83.5, availability: 100.0, performance: 87.0, quality: 96.0 },
  { id: 2, name: 'Esteira Transportadora 02', type: 'Logística', status: 'STOPPED', oee: 40.8, availability: 58.3, performance: 70.0, quality: 100.0 },
  { id: 3, name: 'Injetora Plástico 03', type: 'Produção', status: 'STOPPED', oee: 14.7, availability: 20.0, performance: 75.0, quality: 98.0 },
  { id: 4, name: 'Empacotadora 04', type: 'Embalagem', status: 'RUNNING', oee: 89.3, availability: 100.0, performance: 93.0, quality: 96.0 },
];

const mockOrders = [
  { number: 'OP010', product: 'Porca M8 - Aço Inox', quantity: 339, produced: 734, status: 'IN_PROGRESS', progress: 217 },
  { number: 'OP009', product: 'Placa Alumínio 2mm 50x100cm', quantity: 443, produced: 567, status: 'IN_PROGRESS', progress: 128 },
];

export const getOeeMetrics = async (req: Request, res: Response) => {
  try {
    // Calculate overall OEE metrics
    const totalMachines = mockMachines.length;
    const runningMachines = mockMachines.filter(m => m.status === 'RUNNING').length;
    const stoppedMachines = mockMachines.filter(m => m.status === 'STOPPED').length;
    const avgOEE = mockMachines.reduce((sum, m) => sum + m.oee, 0) / totalMachines;
    
    return res.json({
      totalMachines,
      runningMachines,
      stoppedMachines,
      avgOEE: parseFloat(avgOEE.toFixed(2)),
      machines: mockMachines
    });
  } catch (error) {
    console.error('Get OEE metrics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getQualityMetrics = async (req: Request, res: Response) => {
  try {
    // Mock quality metrics
    return res.json({
      totalInspections: 1247,
      passedInspections: 1220,
      failedInspections: 27,
      passRate: 97.8,
      defectRate: 2.2,
      topDefects: [
        { type: 'Dimensional', count: 15, percentage: 55.6 },
        { type: 'Surface', count: 7, percentage: 25.9 },
        { type: 'Material', count: 5, percentage: 18.5 }
      ]
    });
  } catch (error) {
    console.error('Get quality metrics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAvailabilityMetrics = async (req: Request, res: Response) => {
  try {
    const avgAvailability = mockMachines.reduce((sum, m) => sum + m.availability, 0) / mockMachines.length;
    
    return res.json({
      avgAvailability: parseFloat(avgAvailability.toFixed(2)),
      plannedDowntime: 120, // minutes
      unplannedDowntime: 45, // minutes
      availabilityTrend: [
        { date: '2025-07-25', availability: 94.2 },
        { date: '2025-07-26', availability: 96.8 },
        { date: '2025-07-27', availability: 98.1 },
        { date: '2025-07-28', availability: 91.5 },
        { date: '2025-07-29', availability: 95.3 },
        { date: '2025-07-30', availability: 97.2 },
        { date: '2025-07-31', availability: avgAvailability },
      ]
    });
  } catch (error) {
    console.error('Get availability metrics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPerformanceMetrics = async (req: Request, res: Response) => {
  try {
    const avgPerformance = mockMachines.reduce((sum, m) => sum + m.performance, 0) / mockMachines.length;
    
    return res.json({
      avgPerformance: parseFloat(avgPerformance.toFixed(2)),
      actualOutput: 12450,
      targetOutput: 13000,
      performanceTrend: [
        { date: '2025-07-25', performance: 92.1 },
        { date: '2025-07-26', performance: 95.4 },
        { date: '2025-07-27', performance: 97.2 },
        { date: '2025-07-28', performance: 89.3 },
        { date: '2025-07-29', performance: 93.7 },
        { date: '2025-07-30', performance: 96.1 },
        { date: '2025-07-31', performance: avgPerformance },
      ]
    });
  } catch (error) {
    console.error('Get performance metrics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStopAnalysis = async (req: Request, res: Response) => {
  try {
    return res.json({
      totalStops: 24,
      totalStopTime: 180, // minutes
      avgStopDuration: 7.5, // minutes
      plannedStops: 8,
      unplannedStops: 16,
      topStopReasons: [
        { reason: 'Changeover', count: 6, totalDuration: 95 },
        { reason: 'Maintenance', count: 5, totalDuration: 60 },
        { reason: 'Material Shortage', count: 4, totalDuration: 45 },
        { reason: 'Quality Issue', count: 3, totalDuration: 30 },
        { reason: 'Equipment Failure', count: 6, totalDuration: 120 },
      ]
    });
  } catch (error) {
    console.error('Get stop analysis error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFlowAnalysis = async (req: Request, res: Response) => {
  try {
    return res.json({
      totalOrders: mockOrders.length,
      ordersInProgress: mockOrders.filter(o => o.status === 'IN_PROGRESS').length,
      avgThroughput: 1245,
      bottlenecks: [
        { process: 'Quality Control', avgWaitTime: 45, efficiency: 82 },
        { process: 'Packaging', avgWaitTime: 30, efficiency: 88 },
        { process: 'Assembly', avgWaitTime: 15, efficiency: 94 },
      ],
      flowEfficiency: 87.5
    });
  } catch (error) {
    console.error('Get flow analysis error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};