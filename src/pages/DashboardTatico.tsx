import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Zap, Target, AlertTriangle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

interface OeeTrend {
  mes: string;
  oee: number;
  disponibilidade: number;
  performance: number;
  qualidade: number;
}

interface ProductionByShift {
  turno: string;
  planejado: number;
  realizado: number;
}

interface LossDistribution {
  name: string;
  value: number;
  color: string;
}

interface TacticalDashboardData {
  oeeTrend: OeeTrend[];
  productionByShift: ProductionByShift[];
  lossDistribution: LossDistribution[];
  summary: {
    avgOEE: number;
    avgAvailability: number;
    avgPerformance: number;
    avgQuality: number;
  };
  keyIndicators: {
    oeeTargetAchieved: number;
    setupTime: number;
    unplannedStops: number;
  };
}

export default function DashboardTatico() {
  const { data: dashboardData, isLoading, error, refetch } = useQuery({
    queryKey: ['tacticalDashboard'],
    queryFn: () => apiClient.getTacticalDashboard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const loading = isLoading;

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Tático</h1>
          <p className="text-muted-foreground">Carregando dados da performance operacional...</p>
        </div>
        <div className="text-center py-10">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Tático</h1>
          <p className="text-muted-foreground">Visão estratégica da performance operacional</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar dados: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Tático</h1>
          <p className="text-muted-foreground">Visão estratégica da performance operacional</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  const { oeeTrend, productionByShift, lossDistribution, summary, keyIndicators } = dashboardData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Tático</h1>
        <p className="text-muted-foreground">Visão estratégica da performance operacional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="OEE Médio"
          value={`${summary.avgOEE}%`}
          icon={Target}
          variant="blue"
        />
        <MetricCard
          title="Disponibilidade"
          value={`${summary.avgAvailability}%`}
          icon={Activity}
          variant="green"
        />
        <MetricCard
          title="Performance"
          value={`${summary.avgPerformance}%`}
          icon={Zap}
          variant="lightblue"
        />
        <MetricCard
          title="Qualidade"
          value={`${summary.avgQuality}%`}
          icon={TrendingUp}
          variant="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução OEE - Últimos 6 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={oeeTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="oee" stroke="hsl(var(--primary))" strokeWidth={2} name="OEE" />
                <Line type="monotone" dataKey="disponibilidade" stroke="hsl(var(--success))" name="Disponibilidade" />
                <Line type="monotone" dataKey="performance" stroke="hsl(var(--info))" name="Performance" />
                <Line type="monotone" dataKey="qualidade" stroke="hsl(var(--warning))" name="Qualidade" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produção por Turno (Hoje)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionByShift}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="turno" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planejado" fill="hsl(var(--muted))" name="Planejado" />
                <Bar dataKey="realizado" fill="hsl(var(--primary))" name="Realizado" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Perdas (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={lossDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {lossDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Principais Indicadores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Meta OEE Atingida</p>
                  <p className="text-2xl font-bold text-success">+{keyIndicators.oeeTargetAchieved}%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Tempo de Setup</p>
                  <p className="text-2xl font-bold text-destructive">{keyIndicators.setupTime} min</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Paradas Não Planejadas</p>
                  <p className="text-2xl font-bold text-warning">{keyIndicators.unplannedStops}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
