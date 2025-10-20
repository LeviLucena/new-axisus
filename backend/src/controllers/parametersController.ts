import { Request, Response } from 'express';

// Mock parameter data for demonstration
const systemParameters = {
  machineParams: [
    { id: 1, machineId: 'machine-01', cicloIdeal: 45, velocidade: 120, oeeMinimo: 85 },
    { id: 2, machineId: 'machine-02', cicloIdeal: 50, velocidade: 110, oeeMinimo: 85 },
    { id: 3, machineId: 'machine-03', cicloIdeal: 45, velocidade: 120, oeeMinimo: 85 },
    { id: 4, machineId: 'machine-04', cicloIdeal: 55, velocidade: 100, oeeMinimo: 85 },
  ],
  
  stopReasons: [
    { id: 1, codigo: 'MAN-01', descricao: 'Manutenção Preventiva', tipo: 'Planejada' },
    { id: 2, codigo: 'MAN-02', descricao: 'Manutenção Corretiva', tipo: 'Não Planejada' },
    { id: 3, codigo: 'MAT-01', descricao: 'Falta de Material', tipo: 'Não Planejada' },
    { id: 4, codigo: 'SET-01', descricao: 'Setup de Produto', tipo: 'Planejada' },
    { id: 5, codigo: 'QLD-01', descricao: 'Ajuste de Qualidade', tipo: 'Não Planejada' },
  ],
  
  oeeTargets: {
    oeeGeral: 85,
    disponibilidade: 90,
    performance: 95,
    qualidade: 99
  },
  
  productionTargets: {
    producaoDiaria: 3600,
    producaoTurno: 1200,
    leadTime: 120,
    wipMaximo: 300
  },
  
  systemSettings: {
    turnoDuracao: 8,
    turnosDia: 3,
    intervalo: 15,
    atualizacao: 30
  }
};

export const getSystemParameters = async (req: Request, res: Response) => {
  try {
    return res.json(systemParameters);
  } catch (error) {
    console.error('Get system parameters error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateSystemParameters = async (req: Request, res: Response) => {
  try {
    const { section, data } = req.body;
    
    switch(section) {
      case 'machineParams':
        systemParameters.machineParams = data;
        break;
      case 'stopReasons':
        systemParameters.stopReasons = data;
        break;
      case 'oeeTargets':
        systemParameters.oeeTargets = { ...systemParameters.oeeTargets, ...data };
        break;
      case 'productionTargets':
        systemParameters.productionTargets = { ...systemParameters.productionTargets, ...data };
        break;
      case 'systemSettings':
        systemParameters.systemSettings = { ...systemParameters.systemSettings, ...data };
        break;
      default:
        return res.status(400).json({ message: 'Invalid section specified' });
    }
    
    return res.json({ message: 'Parameters updated successfully', section, data });
  } catch (error) {
    console.error('Update system parameters error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetSystemParameters = async (req: Request, res: Response) => {
  try {
    // In a real implementation, we would restore from database defaults
    // For now, we'll reset to the initial mock data
    
    systemParameters.machineParams = [
      { id: 1, machineId: 'machine-01', cicloIdeal: 45, velocidade: 120, oeeMinimo: 85 },
      { id: 2, machineId: 'machine-02', cicloIdeal: 50, velocidade: 110, oeeMinimo: 85 },
      { id: 3, machineId: 'machine-03', cicloIdeal: 45, velocidade: 120, oeeMinimo: 85 },
      { id: 4, machineId: 'machine-04', cicloIdeal: 55, velocidade: 100, oeeMinimo: 85 },
    ];
    
    systemParameters.stopReasons = [
      { id: 1, codigo: 'MAN-01', descricao: 'Manutenção Preventiva', tipo: 'Planejada' },
      { id: 2, codigo: 'MAN-02', descricao: 'Manutenção Corretiva', tipo: 'Não Planejada' },
      { id: 3, codigo: 'MAT-01', descricao: 'Falta de Material', tipo: 'Não Planejada' },
      { id: 4, codigo: 'SET-01', descricao: 'Setup de Produto', tipo: 'Planejada' },
      { id: 5, codigo: 'QLD-01', descricao: 'Ajuste de Qualidade', tipo: 'Não Planejada' },
    ];
    
    systemParameters.oeeTargets = {
      oeeGeral: 85,
      disponibilidade: 90,
      performance: 95,
      qualidade: 99
    };
    
    systemParameters.productionTargets = {
      producaoDiaria: 3600,
      producaoTurno: 1200,
      leadTime: 120,
      wipMaximo: 300
    };
    
    systemParameters.systemSettings = {
      turnoDuracao: 8,
      turnosDia: 3,
      intervalo: 15,
      atualizacao: 30
    };
    
    return res.json({ message: 'Parameters reset to default values' });
  } catch (error) {
    console.error('Reset system parameters error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};