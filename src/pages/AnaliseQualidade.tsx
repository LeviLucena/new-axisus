import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Define interfaces for quality analytics data
interface QualityDayData {
  dia: string;
  conformes: number;
  naoConformes: number;
  refugo: number;
}

interface QualityAnalytics {
  totalInspections: number;
  passedInspections: number;
  failedInspections: number;
  passRate: number;
  defectRate: number;
  qualityTrend: QualityDayData[]; // Daily trend of quality metrics
  topDefects: {
    type: string;  // Backend returns 'type', not 'tipo'
    count: number; // Backend returns 'count', not 'quantidade'
    percentage: number; // Backend returns 'percentage', not 'percentual'
  }[];
  recentBatches: {
    lote: string;
    produto: string;
    total: number;
    aprovados: number;
    rejeitados: number;
    taxa: number;
  }[];
}

export default function AnaliseQualidade() {
  const { data: qualityData, isLoading, error } = useQuery<QualityAnalytics>({
    queryKey: ['qualityAnalytics'],
    queryFn: () => apiClient.getQualityMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Qualidade</h1>
          <p className="text-muted-foreground">Monitoramento e controle de qualidade da produção</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Qualidade</h1>
          <p className="text-muted-foreground">Monitoramento e controle de qualidade da produção</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar dados: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  // If no data is available, show empty state
  if (!qualityData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Qualidade</h1>
          <p className="text-muted-foreground">Monitoramento e controle de qualidade da produção</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  // Destructure the data from the API response
  const {
    totalInspections,
    passedInspections,
    failedInspections,
    passRate,
    defectRate,
    qualityTrend,
    topDefects,
    recentBatches
  } = qualityData;

  // Map backend field names to the chart-friendly format
  const defeitosData = topDefects.map(defect => ({
    tipo: defect.type,
    quantidade: defect.count,
    percentual: defect.percentage
  }));

const qualidadeData = [
  { dia: "Seg", conformes: 1180, naoConformes: 20, refugo: 10 },
  { dia: "Ter", conformes: 1190, naoConformes: 15, refugo: 8 },
  { dia: "Qua", conformes: 1200, naoConformes: 10, refugo: 5 },
  { dia: "Qui", conformes: 1170, naoConformes: 25, refugo: 12 },
  { dia: "Sex", conformes: 1195, naoConformes: 12, refugo: 6 },
];



const lotesRecentes = [
  { lote: "LT-2025-001", produto: "Produto A", total: 1200, aprovados: 1185, rejeitados: 15, taxa: 98.75 },
  { lote: "LT-2025-002", produto: "Produto B", total: 800, aprovados: 792, rejeitados: 8, taxa: 99.00 },
  { lote: "LT-2025-003", produto: "Produto C", total: 1500, aprovados: 1470, rejeitados: 30, taxa: 98.00 },
  { lote: "LT-2025-004", produto: "Produto A", total: 1000, aprovados: 995, rejeitados: 5, taxa: 99.50 },
];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Qualidade</h1>
        <p className="text-muted-foreground">Monitoramento e controle de qualidade da produção</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Taxa de Qualidade"
          value={`${passRate}%`}
          icon={CheckCircle}
          variant="green"
        />
        <MetricCard
          title="Itens Conformes"
          value={passedInspections.toLocaleString()}
          icon={TrendingUp}
          variant="blue"
        />
        <MetricCard
          title="Não Conformes"
          value={failedInspections.toLocaleString()}
          icon={AlertCircle}
          variant="red"
        />
        <MetricCard
          title="Taxa de Defeitos"
          value={`${defectRate}%`}
          icon={XCircle}
          variant="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Semanal - Qualidade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={qualityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="conformes" stroke="hsl(var(--success))" strokeWidth={2} name="Conformes" />
                <Line type="monotone" dataKey="naoConformes" stroke="hsl(var(--destructive))" strokeWidth={2} name="Não Conformes" />
                <Line type="monotone" dataKey="refugo" stroke="hsl(var(--warning))" strokeWidth={2} name="Refugo" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Defeitos (Semana)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={defeitosData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="tipo" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="hsl(var(--primary))" name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lotes Recentes - Análise de Qualidade</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lote</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Aprovados</TableHead>
                <TableHead className="text-right">Rejeitados</TableHead>
                <TableHead className="text-right">Taxa Aprovação</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBatches.map((lote) => (
                <TableRow key={lote.lote}>
                  <TableCell className="font-medium">{lote.lote}</TableCell>
                  <TableCell>{lote.produto}</TableCell>
                  <TableCell className="text-right">{lote.total}</TableCell>
                  <TableCell className="text-right text-success">{lote.aprovados}</TableCell>
                  <TableCell className="text-right text-destructive">{lote.rejeitados}</TableCell>
                  <TableCell className="text-right font-semibold">{lote.taxa}%</TableCell>
                  <TableCell>
                    {lote.taxa >= 99 ? (
                      <span className="inline-flex items-center gap-1 text-success">
                        <CheckCircle className="w-4 h-4" />
                        Excelente
                      </span>
                    ) : lote.taxa >= 98 ? (
                      <span className="inline-flex items-center gap-1 text-info">
                        <CheckCircle className="w-4 h-4" />
                        Bom
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-warning">
                        <AlertCircle className="w-4 h-4" />
                        Atenção
                      </span>
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
