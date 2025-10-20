import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { GitBranch, TrendingUp, Clock, Package } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Define interfaces for flow analysis data
interface ProductionFlow {
  etapa: string;
  entrada: number;
  saida: number;
  estoque: number;
}

interface LeadTimeData {
  dia: string;
  leadTime: number;
  meta: number;
}

interface WipData {
  hora: string;
  wip: number;
}

interface BottleneckAnalysis {
  processo: string;
  utilizacao: number;
  capacidade: number;
}

interface FlowAnalytics {
  totalOrders: number;
  ordersInProgress: number;
  avgThroughput: number;
  avgLeadTime: number;
  currentWip: number;
  flowEfficiency: number;
  productionFlow: ProductionFlow[];
  leadTimeData: LeadTimeData[];
  wipData: WipData[];
  bottleneckAnalysis: BottleneckAnalysis[];
  bottlenecks: Array<{ process: string; avgWaitTime: number; efficiency: number }>;
}

export default function AnaliseFluxo() {
  const { data: flowData, isLoading, error } = useQuery<FlowAnalytics>({
    queryKey: ['flowAnalytics'],
    queryFn: () => apiClient.getFlowAnalysis(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Fluxo</h1>
          <p className="text-muted-foreground">Visualização do fluxo produtivo e gargalos</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Fluxo</h1>
          <p className="text-muted-foreground">Visualização do fluxo produtivo e gargalos</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar dados: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  // If no data is available, show empty state
  if (!flowData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Fluxo</h1>
          <p className="text-muted-foreground">Visualização do fluxo produtivo e gargalos</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  // Destructure the data from the API response
  const {
    avgLeadTime,
    currentWip,
    avgThroughput,
    flowEfficiency,
    productionFlow,
    leadTimeData,
    wipData,
    bottleneckAnalysis
  } = flowData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Fluxo</h1>
        <p className="text-muted-foreground">Visualização do fluxo produtivo e gargalos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Lead Time Médio"
          value={`${avgLeadTime} min`}
          icon={Clock}
          variant="blue"
        />
        <MetricCard
          title="WIP Atual"
          value={`${currentWip} un`}
          icon={Package}
          variant="lightblue"
        />
        <MetricCard
          title="Taxa de Fluxo"
          value={`${flowEfficiency}%`}
          icon={GitBranch}
          variant="green"
        />
        <MetricCard
          title="Throughput"
          value={`${avgThroughput.toLocaleString()} un`}
          icon={TrendingUp}
          variant="green"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Produção por Etapa</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="etapa" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="entrada" fill="hsl(var(--info))" name="Entrada" />
              <Bar dataKey="saida" fill="hsl(var(--success))" name="Saída" />
              <Bar dataKey="estoque" fill="hsl(var(--warning))" name="WIP" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Time vs Meta (minutos)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis domain={[100, 160]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leadTime" stroke="hsl(var(--primary))" strokeWidth={2} name="Lead Time Real" />
                <Line type="monotone" dataKey="meta" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WIP ao Longo do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={wipData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="wip" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" name="WIP (unidades)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise de Gargalos - Utilização de Capacidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bottleneckAnalysis} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="processo" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="utilizacao" fill="hsl(var(--primary))" name="Utilização (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {bottleneckAnalysis.map((proc) => (
          <Card key={proc.processo} className={proc.utilizacao >= 90 ? "border-destructive" : ""}>
            <CardHeader>
              <CardTitle className="text-lg">{proc.processo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Utilização</span>
                  <span className={`text-2xl font-bold ${proc.utilizacao >= 90 ? "text-destructive" : "text-primary"}`}>
                    {proc.utilizacao}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${proc.utilizacao >= 90 ? "bg-destructive" : "bg-primary"}`}
                    style={{ width: `${proc.utilizacao}%` }}
                  />
                </div>
                {proc.utilizacao >= 90 && (
                  <p className="text-xs text-destructive font-medium">⚠️ Gargalo Identificado</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
