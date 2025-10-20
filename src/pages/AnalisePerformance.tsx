import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, TrendingUp, Clock, Target } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Define interfaces for performance analytics data
interface PerformanceByShift {
  turno: string;
  performance: number;
  velocidadeReal: number;
  velocidadeIdeal: number;
}

interface WeeklyPerformance {
  dia: string;
  performance: number;
}

interface MachinePerformance {
  maquina: string;
  performance: number;
  cicloIdeal: number;
  cicloReal: number;
  producao: number;
}

interface PerformanceAnalytics {
  avgPerformance: number;
  actualOutput: number;
  targetOutput: number;
  achievementRate: number;
  actualSpeed: number;
  averageCycleTime: number;
  performanceByShift: PerformanceByShift[];
  weeklyPerformance: WeeklyPerformance[];
  machinePerformance: MachinePerformance[];
  performanceTrend: Array<{ date: string; performance: number }>;
}

export default function AnalisePerformance() {
  const { data: performanceData, isLoading, error } = useQuery<PerformanceAnalytics>({
    queryKey: ['performanceAnalytics'],
    queryFn: () => apiClient.getPerformanceMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Performance</h1>
          <p className="text-muted-foreground">Monitoramento de velocidade e eficiência produtiva</p>
        </div>
        <div className="text-center py-10">Carregando dados...</div>
      </div>
    );
  }

  // Show error state if there was an error fetching data
  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Performance</h1>
          <p className="text-muted-foreground">Monitoramento de velocidade e eficiência produtiva</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar dados: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  // If no data is available, show empty state
  if (!performanceData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Performance</h1>
          <p className="text-muted-foreground">Monitoramento de velocidade e eficiência produtiva</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  // Destructure the data from the API response
  const {
    avgPerformance,
    actualSpeed,
    averageCycleTime,
    achievementRate,
    performanceByShift,
    weeklyPerformance,
    machinePerformance
  } = performanceData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Performance</h1>
        <p className="text-muted-foreground">Monitoramento de velocidade e eficiência produtiva</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Performance Média"
          value={`${avgPerformance}%`}
          icon={Zap}
          variant="blue"
        />
        <MetricCard
          title="Velocidade Real"
          value={`${actualSpeed} un/h`}
          icon={TrendingUp}
          variant="green"
        />
        <MetricCard
          title="Ciclo Médio"
          value={`${averageCycleTime} seg`}
          icon={Clock}
          variant="lightblue"
        />
        <MetricCard
          title="Meta Atingida"
          value={`${achievementRate}%`}
          icon={Target}
          variant="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance por Turno</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceByShift}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="turno" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="hsl(var(--primary))" name="Performance (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução Semanal - Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="performance" stroke="hsl(var(--success))" strokeWidth={2} name="Performance (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Velocidade Real vs Ideal por Turno</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceByShift}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turno" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="velocidadeIdeal" fill="hsl(var(--muted))" name="Velocidade Ideal (un/h)" />
              <Bar dataKey="velocidadeReal" fill="hsl(var(--info))" name="Velocidade Real (un/h)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance por Máquina</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Máquina</TableHead>
                <TableHead className="text-right">Performance</TableHead>
                <TableHead className="text-right">Ciclo Ideal</TableHead>
                <TableHead className="text-right">Ciclo Real</TableHead>
                <TableHead className="text-right">Produção</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machinePerformance.map((maq) => (
                <TableRow key={maq.maquina}>
                  <TableCell className="font-medium">{maq.maquina}</TableCell>
                  <TableCell className="text-right font-semibold">{maq.performance}%</TableCell>
                  <TableCell className="text-right">{maq.cicloIdeal}s</TableCell>
                  <TableCell className="text-right">{maq.cicloReal}s</TableCell>
                  <TableCell className="text-right">{maq.producao} un</TableCell>
                  <TableCell>
                    {maq.performance >= 92 ? (
                      <span className="px-2 py-1 bg-success/20 text-success rounded text-sm">Excelente</span>
                    ) : maq.performance >= 88 ? (
                      <span className="px-2 py-1 bg-info/20 text-info rounded text-sm">Bom</span>
                    ) : (
                      <span className="px-2 py-1 bg-warning/20 text-warning rounded text-sm">Atenção</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
