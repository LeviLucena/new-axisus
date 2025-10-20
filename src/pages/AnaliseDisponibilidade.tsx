import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Clock, Pause, Play } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Define interfaces for availability analytics data
interface HourlyAvailabilityData {
  hora: string;
  disponivel: number;
  parado: number;
}

interface MachineAvailabilityData {
  maquina: string;
  disponibilidade: number;
  tempoOperacao: number;
  tempoParada: number;
}

interface RecentStopData {
  maquina: string;
  motivo: string;
  inicio: string;
  fim: string;
  duracao: string;
}

interface AvailabilityAnalytics {
  avgAvailability: number;
  plannedDowntime: number;
  unplannedDowntime: number;
  totalOperationTime: number;
  totalDowntime: number;
  mtbf: number;
  availabilityTrend: Array<{ date: string; availability: number }>;
  hourlyAvailability: HourlyAvailabilityData[];
  machineAvailability: MachineAvailabilityData[];
  recentStops: RecentStopData[];
}

export default function AnaliseDisponibilidade() {
  const { data: availabilityData, isLoading, error } = useQuery<AvailabilityAnalytics>({
    queryKey: ['availabilityAnalytics'],
    queryFn: () => apiClient.getAvailabilityMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Disponibilidade</h1>
          <p className="text-muted-foreground">Monitoramento do tempo produtivo e paradas</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Disponibilidade</h1>
          <p className="text-muted-foreground">Monitoramento do tempo produtivo e paradas</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar dados: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  // If no data is available, show empty state
  if (!availabilityData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Disponibilidade</h1>
          <p className="text-muted-foreground">Monitoramento do tempo produtivo e paradas</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  // Destructure the data from the API response
  const {
    avgAvailability,
    totalOperationTime,
    totalDowntime,
    mtbf,
    hourlyAvailability,
    machineAvailability,
    recentStops
  } = availabilityData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Disponibilidade</h1>
        <p className="text-muted-foreground">Monitoramento do tempo produtivo e paradas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Disponibilidade Média"
          value={`${avgAvailability}%`}
          icon={Activity}
          variant="green"
        />
        <MetricCard
          title="Tempo Operação"
          value={`${totalOperationTime.toLocaleString()} min`}
          icon={Play}
          variant="blue"
        />
        <MetricCard
          title="Tempo Parada"
          value={`${totalDowntime.toLocaleString()} min`}
          icon={Pause}
          variant="red"
        />
        <MetricCard
          title="MTBF"
          value={`${mtbf} min`}
          icon={Clock}
          variant="lightblue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Disponibilidade por Período (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyAvailability}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="disponivel" stackId="a" fill="hsl(var(--success))" name="Disponível (%)" />
                <Bar dataKey="parado" stackId="a" fill="hsl(var(--destructive))" name="Parado (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disponibilidade por Máquina</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={machineAvailability} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="maquina" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="disponibilidade" fill="hsl(var(--primary))" name="Disponibilidade (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tempo de Operação vs Parada (minutos)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Máquina</TableHead>
                <TableHead className="text-right">Disponibilidade</TableHead>
                <TableHead className="text-right">Tempo Operação</TableHead>
                <TableHead className="text-right">Tempo Parada</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machineAvailability.map((maq) => (
                <TableRow key={maq.maquina}>
                  <TableCell className="font-medium">{maq.maquina}</TableCell>
                  <TableCell className="text-right font-semibold">{maq.disponibilidade}%</TableCell>
                  <TableCell className="text-right text-success">{maq.tempoOperacao} min</TableCell>
                  <TableCell className="text-right text-destructive">{maq.tempoParada} min</TableCell>
                  <TableCell>
                    {maq.disponibilidade >= 90 ? (
                      <span className="px-2 py-1 bg-success/20 text-success rounded text-sm">Excelente</span>
                    ) : maq.disponibilidade >= 85 ? (
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

      <Card>
        <CardHeader>
          <CardTitle>Paradas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Máquina</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentStops.map((parada, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{parada.maquina}</TableCell>
                  <TableCell>{parada.motivo}</TableCell>
                  <TableCell>{parada.inicio}</TableCell>
                  <TableCell>{parada.fim}</TableCell>
                  <TableCell className="font-semibold">{parada.duracao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
