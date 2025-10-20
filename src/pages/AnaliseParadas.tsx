import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Clock, Wrench, PackageX } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Define interfaces for stop analysis data
interface StopReason {
  motivo: string;
  quantidade: number;
  duracao: number;
  percentual: number;
  color: string;
}

interface StopsByMachine {
  maquina: string;
  paradas: number;
  duracao: number;
}

interface StopHistory {
  data: string;
  hora: string;
  maquina: string;
  motivo: string;
  duracao: string;
  responsavel: string;
}

interface StopAnalytics {
  totalStops: number;
  totalStopTime: number;
  avgStopDuration: number;
  plannedStops: number;
  unplannedStops: number;
  mttr: number;
  stopReasons: StopReason[];
  stopsByMachine: StopsByMachine[];
  stopHistory: StopHistory[];
  topStopReasons: Array<{ reason: string; count: number; totalDuration: number }>;
}

export default function AnaliseParadas() {
  const { data: stopData, isLoading, error } = useQuery<StopAnalytics>({
    queryKey: ['stopAnalytics'],
    queryFn: () => apiClient.getStopAnalysis(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Paradas</h1>
          <p className="text-muted-foreground">Monitoramento de causas e tempos de parada</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Paradas</h1>
          <p className="text-muted-foreground">Monitoramento de causas e tempos de parada</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar dados: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  // If no data is available, show empty state
  if (!stopData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Paradas</h1>
          <p className="text-muted-foreground">Monitoramento de causas e tempos de parada</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  // Destructure the data from the API response
  const {
    totalStops,
    totalStopTime,
    avgStopDuration,
    mttr,
    stopReasons,
    stopsByMachine,
    stopHistory
  } = stopData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Paradas</h1>
        <p className="text-muted-foreground">Monitoramento de causas e tempos de parada</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Paradas"
          value={totalStops.toString()}
          icon={AlertTriangle}
          variant="red"
        />
        <MetricCard
          title="Tempo Total Parado"
          value={`${totalStopTime} min`}
          icon={Clock}
          variant="red"
        />
        <MetricCard
          title="Tempo Médio/Parada"
          value={`${avgStopDuration} min`}
          icon={Clock}
          variant="lightblue"
        />
        <MetricCard
          title="MTTR"
          value={`${mttr} min`}
          icon={Wrench}
          variant="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Paradas por Motivo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stopReasons}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ motivo, percentual }) => `${motivo}: ${percentual}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentual"
                >
                  {stopReasons.map((entry, index) => (
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
            <CardTitle>Paradas por Máquina</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stopsByMachine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="maquina" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="paradas" fill="hsl(var(--destructive))" name="Quantidade" />
                <Bar dataKey="duracao" fill="hsl(var(--warning))" name="Duração (min)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Motivo de Parada</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Duração Total</TableHead>
                <TableHead className="text-right">Média por Parada</TableHead>
                <TableHead className="text-right">% do Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stopReasons.map((motivo) => (
                <TableRow key={motivo.motivo}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: motivo.color }} />
                      {motivo.motivo}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{motivo.quantidade}</TableCell>
                  <TableCell className="text-right">{motivo.duracao} min</TableCell>
                  <TableCell className="text-right">{motivo.quantidade > 0 ? (motivo.duracao / motivo.quantidade).toFixed(1) : '0.0'} min</TableCell>
                  <TableCell className="text-right font-semibold">{motivo.percentual}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Paradas - Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Máquina</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Responsável</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stopHistory.map((parada, idx) => (
                <TableRow key={idx}>
                  <TableCell>{parada.data}</TableCell>
                  <TableCell>{parada.hora}</TableCell>
                  <TableCell className="font-medium">{parada.maquina}</TableCell>
                  <TableCell>{parada.motivo}</TableCell>
                  <TableCell className="font-semibold text-destructive">{parada.duracao}</TableCell>
                  <TableCell>{parada.responsavel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
