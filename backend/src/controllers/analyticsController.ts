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
    const qualityTrend = [
      { dia: 'Seg', conformes: 1180, naoConformes: 20, refugo: 10 },
      { dia: 'Ter', conformes: 1190, naoConformes: 15, refugo: 8 },
      { dia: 'Qua', conformes: 1200, naoConformes: 10, refugo: 5 },
      { dia: 'Qui', conformes: 1170, naoConformes: 25, refugo: 12 },
      { dia: 'Sex', conformes: 1195, naoConformes: 12, refugo: 6 },
    ];

    const recentBatches = [
      { lote: 'LT-2025-001', produto: 'Produto A', total: 1200, aprovados: 1185, rejeitados: 15, taxa: 98.75 },
      { lote: 'LT-2025-002', produto: 'Produto B', total: 800, aprovados: 792, rejeitados: 8, taxa: 99.00 },
      { lote: 'LT-2025-003', produto: 'Produto C', total: 1500, aprovados: 1470, rejeitados: 30, taxa: 98.00 },
      { lote: 'LT-2025-004', produto: 'Produto A', total: 1000, aprovados: 995, rejeitados: 5, taxa: 99.50 },
    ];

    return res.json({
      totalInspections: 1247,
      passedInspections: 1197, // Updated to match the trend data total
      failedInspections: 50,   // Updated to match the trend data total
      passRate: 96.0,         // Updated to match the trend data
      defectRate: 4.0,        // Updated to match the trend data
      qualityTrend,
      recentBatches,
      topDefects: [
        { type: 'Dimensional', count: 25, percentage: 40 },
        { type: 'Visual', count: 18, percentage: 29 },
        { type: 'Funcional', count: 12, percentage: 19 },
        { type: 'Material', count: 7, percentage: 12 }
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
    
    // Hourly availability data (24h)
    const disponibilidadeData = [
      { hora: '00h', disponivel: 95, parado: 5 },
      { hora: '04h', disponivel: 92, parado: 8 },
      { hora: '08h', disponivel: 88, parado: 12 },
      { hora: '12h', disponivel: 90, parado: 10 },
      { hora: '16h', disponivel: 93, parado: 7 },
      { hora: '20h', disponivel: 94, parado: 6 },
    ];

    // Machine availability data
    const maquinasData = [
      { maquina: 'Máquina 01', disponibilidade: 94.5, tempoOperacao: 340, tempoParada: 20 },
      { maquina: 'Máquina 02', disponibilidade: 89.2, tempoOperacao: 321, tempoParada: 39 },
      { maquina: 'Máquina 03', disponibilidade: 91.8, tempoOperacao: 331, tempoParada: 29 },
      { maquina: 'Máquina 04', disponibilidade: 87.5, tempoOperacao: 315, tempoParada: 45 },
    ];

    // Recent stops
    const paradasRecentes = [
      { maquina: 'Máquina 02', motivo: 'Manutenção Preventiva', inicio: '08:30', fim: '09:45', duracao: '1h 15min' },
      { maquina: 'Máquina 04', motivo: 'Falta de Material', inicio: '10:20', fim: '11:00', duracao: '40min' },
      { maquina: 'Máquina 01', motivo: 'Setup de Produto', inicio: '13:00', fim: '13:25', duracao: '25min' },
      { maquina: 'Máquina 03', motivo: 'Ajuste de Parâmetros', inicio: '14:15', fim: '14:35', duracao: '20min' },
    ];

    return res.json({
      avgAvailability: parseFloat(avgAvailability.toFixed(2)),
      plannedDowntime: 120, // minutes
      unplannedDowntime: 45, // minutes
      totalOperationTime: 1307, // minutes
      totalDowntime: 133, // minutes
      mtbf: 127, // Mean Time Between Failures in minutes
      availabilityTrend: [
        { date: '2025-07-25', availability: 94.2 },
        { date: '2025-07-26', availability: 96.8 },
        { date: '2025-07-27', availability: 98.1 },
        { date: '2025-07-28', availability: 91.5 },
        { date: '2025-07-29', availability: 95.3 },
        { date: '2025-07-30', availability: 97.2 },
        { date: '2025-07-31', availability: avgAvailability },
      ],
      hourlyAvailability: disponibilidadeData,
      machineAvailability: maquinasData,
      recentStops: paradasRecentes
    });
  } catch (error) {
    console.error('Get availability metrics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPerformanceMetrics = async (req: Request, res: Response) => {
  try {
    const avgPerformance = mockMachines.reduce((sum, m) => sum + m.performance, 0) / mockMachines.length;
    
    // Performance by shift
    const performanceByShift = [
      { turno: '1º Turno', performance: 92, velocidadeReal: 110, velocidadeIdeal: 120 },
      { turno: '2º Turno', performance: 95, velocidadeReal: 114, velocidadeIdeal: 120 },
      { turno: '3º Turno', performance: 88, velocidadeReal: 106, velocidadeIdeal: 120 },
    ];

    // Weekly performance evolution
    const weeklyPerformance = [
      { dia: 'Seg', performance: 90 },
      { dia: 'Ter', performance: 91 },
      { dia: 'Qua', performance: 93 },
      { dia: 'Qui', performance: 89 },
      { dia: 'Sex', performance: 94 },
    ];

    // Machine performance data
    const machinePerformance = [
      { maquina: 'Máquina 01', performance: 94.5, cicloIdeal: 45, cicloReal: 48, producao: 1200 },
      { maquina: 'Máquina 02', performance: 89.2, cicloIdeal: 50, cicloReal: 56, producao: 1050 },
      { maquina: 'Máquina 03', performance: 91.8, cicloIdeal: 45, cicloReal: 49, producao: 1150 },
      { maquina: 'Máquina 04', performance: 87.5, cicloIdeal: 55, cicloReal: 63, producao: 980 },
    ];

    return res.json({
      avgPerformance: parseFloat(avgPerformance.toFixed(2)),
      actualOutput: 12450,
      targetOutput: 13000,
      achievementRate: 95.8, // Percentage of target achieved
      actualSpeed: 110, // units per hour
      averageCycleTime: 53, // seconds
      performanceByShift,
      weeklyPerformance,
      machinePerformance,
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
    // Enhanced stop analysis data for the frontend
    const stopReasons = [
      { motivo: 'Manutenção', quantidade: 12, duracao: 180, percentual: 35, color: '#ef4444' },
      { motivo: 'Falta de Material', quantidade: 8, duracao: 95, percentual: 18, color: '#f97316' },
      { motivo: 'Setup', quantidade: 15, duracao: 120, percentual: 23, color: '#eab308' },
      { motivo: 'Ajuste de Qualidade', quantidade: 6, duracao: 65, percentual: 13, color: '#3b82f6' },
      { motivo: 'Outros', quantidade: 5, duracao: 55, percentual: 11, color: '#8b5cf6' },
    ];

    const stopsByMachine = [
      { maquina: 'Máquina 01', paradas: 8, duracao: 95 },
      { maquina: 'Máquina 02', paradas: 14, duracao: 165 },
      { maquina: 'Máquina 03', paradas: 10, duracao: 120 },
      { maquina: 'Máquina 04', paradas: 14, duracao: 135 },
    ];

    const stopHistory = [
      { data: '10/10/2025', hora: '08:30', maquina: 'Máquina 02', motivo: 'Manutenção Preventiva', duracao: '45 min', responsavel: 'João Silva' },
      { data: '10/10/2025', hora: '10:15', maquina: 'Máquina 04', motivo: 'Falta de Material', duracao: '30 min', responsavel: 'Maria Santos' },
      { data: '10/10/2025', hora: '13:00', maquina: 'Máquina 01', motivo: 'Setup de Produto', duracao: '25 min', responsavel: 'Pedro Costa' },
      { data: '10/10/2025', hora: '14:45', maquina: 'Máquina 03', motivo: 'Ajuste de Parâmetros', duracao: '20 min', responsavel: 'Ana Lima' },
      { data: '10/10/2025', hora: '16:20', maquina: 'Máquina 02', motivo: 'Manutenção Corretiva', duracao: '60 min', responsavel: 'João Silva' },
    ];

    const totalStops = stopReasons.reduce((sum, item) => sum + item.quantidade, 0);
    const totalStopTime = stopReasons.reduce((sum, item) => sum + item.duracao, 0);
    const avgStopDuration = totalStops > 0 ? totalStopTime / totalStops : 0;

    return res.json({
      totalStops,
      totalStopTime,
      avgStopDuration: parseFloat(avgStopDuration.toFixed(1)),
      plannedStops: 18, // Based on planned reasons like setup and maintenance
      unplannedStops: totalStops - 18,
      mttr: 18, // Mean Time To Repair
      stopReasons,
      stopsByMachine,
      stopHistory,
      topStopReasons: [
        { reason: 'Setup', count: 15, totalDuration: 120 },
        { reason: 'Manutenção', count: 12, totalDuration: 180 },
        { reason: 'Falta de Material', count: 8, totalDuration: 95 },
        { reason: 'Ajuste de Qualidade', count: 6, totalDuration: 65 },
        { reason: 'Outros', count: 5, totalDuration: 55 },
      ]
    });
  } catch (error) {
    console.error('Get stop analysis error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFlowAnalysis = async (req: Request, res: Response) => {
  try {
    // Production flow by stage
    const productionFlow = [
      { etapa: 'Recebimento', entrada: 1500, saida: 1480, estoque: 20 },
      { etapa: 'Preparação', entrada: 1480, saida: 1450, estoque: 30 },
      { etapa: 'Usinagem', entrada: 1450, saida: 1420, estoque: 30 },
      { etapa: 'Montagem', entrada: 1420, saida: 1400, estoque: 20 },
      { etapa: 'Inspeção', entrada: 1400, saida: 1380, estoque: 20 },
      { etapa: 'Expedição', entrada: 1380, saida: 1380, estoque: 0 },
    ];

    // Lead time data by day
    const leadTimeData = [
      { dia: 'Seg', leadTime: 145, meta: 120 },
      { dia: 'Ter', leadTime: 132, meta: 120 },
      { dia: 'Qua', leadTime: 128, meta: 120 },
      { dia: 'Qui', leadTime: 138, meta: 120 },
      { dia: 'Sex', leadTime: 125, meta: 120 },
    ];

    // WIP data by hour
    const wipData = [
      { hora: '08h', wip: 250 },
      { hora: '10h', wip: 280 },
      { hora: '12h', wip: 310 },
      { hora: '14h', wip: 290 },
      { hora: '16h', wip: 270 },
      { hora: '18h', wip: 240 },
    ];

    // Bottleneck analysis
    const bottleneckAnalysis = [
      { processo: 'Usinagem', utilizacao: 95, capacidade: 100 },
      { processo: 'Montagem', utilizacao: 78, capacidade: 100 },
      { processo: 'Inspeção', utilizacao: 85, capacidade: 100 },
      { processo: 'Preparação', utilizacao: 65, capacidade: 100 },
    ];

    // Calculate derived metrics
    const avgLeadTime = leadTimeData.reduce((sum, item) => sum + item.leadTime, 0) / leadTimeData.length;
    const currentWip = wipData[wipData.length - 1].wip; // Using last WIP value as current
    const throughput = productionFlow[productionFlow.length - 1].saida; // Using last stage output as throughput
    const flowEfficiency = 87.5; // Using original value

    return res.json({
      totalOrders: 12,
      ordersInProgress: 8,
      avgThroughput: 1380,
      avgLeadTime: parseFloat(avgLeadTime.toFixed(1)),
      currentWip,
      flowEfficiency,
      productionFlow,
      leadTimeData,
      wipData,
      bottleneckAnalysis,
      bottlenecks: [
        { process: 'Quality Control', avgWaitTime: 45, efficiency: 82 },
        { process: 'Packaging', avgWaitTime: 30, efficiency: 88 },
        { process: 'Assembly', avgWaitTime: 15, efficiency: 94 },
      ]
    });
  } catch (error) {
    console.error('Get flow analysis error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTacticalDashboard = async (req: Request, res: Response) => {
  try {
    // Calculate monthly OEE trend data
    const oeeTrend = [
      { mes: 'Jan', oee: 78, disponibilidade: 85, performance: 90, qualidade: 98 },
      { mes: 'Fev', oee: 82, disponibilidade: 88, performance: 92, qualidade: 99 },
      { mes: 'Mar', oee: 85, disponibilidade: 90, performance: 93, qualidade: 99 },
      { mes: 'Abr', oee: 81, disponibilidade: 87, performance: 91, qualidade: 98 },
      { mes: 'Mai', oee: 87, disponibilidade: 92, performance: 94, qualidade: 99 },
      { mes: 'Jun', oee: 89, disponibilidade: 94, performance: 95, qualidade: 99 },
    ];

    // Production by shift data
    const productionByShift = [
      { turno: '1º Turno', planejado: 1200, realizado: 1150 },
      { turno: '2º Turno', planejado: 1200, realizado: 1180 },
      { turno: '3º Turno', planejado: 1200, realizado: 1100 },
    ];

    // Loss distribution data
    const lossDistribution = [
      { name: 'Setup', value: 15, color: '#ef4444' },
      { name: 'Manutenção', value: 25, color: '#f97316' },
      { name: 'Falta Material', value: 10, color: '#eab308' },
      { name: 'Qualidade', value: 5, color: '#3b82f6' },
    ];

    // Calculate summary metrics
    const avgOEE = oeeTrend.reduce((sum, month) => sum + month.oee, 0) / oeeTrend.length;
    const avgAvailability = oeeTrend.reduce((sum, month) => sum + month.disponibilidade, 0) / oeeTrend.length;
    const avgPerformance = oeeTrend.reduce((sum, month) => sum + month.performance, 0) / oeeTrend.length;
    const avgQuality = oeeTrend.reduce((sum, month) => sum + month.qualidade, 0) / oeeTrend.length;

    return res.json({
      oeeTrend,
      productionByShift,
      lossDistribution,
      summary: {
        avgOEE: parseFloat(avgOEE.toFixed(1)),
        avgAvailability: parseFloat(avgAvailability.toFixed(1)),
        avgPerformance: parseFloat(avgPerformance.toFixed(1)),
        avgQuality: parseFloat(avgQuality.toFixed(1)),
      },
      keyIndicators: {
        oeeTargetAchieved: 5.2, // percentage above target
        setupTime: 15, // minutes
        unplannedStops: 8
      }
    });
  } catch (error) {
    console.error('Get tactical dashboard error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};