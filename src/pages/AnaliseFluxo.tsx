import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { GitBranch, TrendingUp, Clock, Package } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const fluxoProducao = [
  { etapa: "Recebimento", entrada: 1500, saida: 1480, estoque: 20 },
  { etapa: "Preparação", entrada: 1480, saida: 1450, estoque: 30 },
  { etapa: "Usinagem", entrada: 1450, saida: 1420, estoque: 30 },
  { etapa: "Montagem", entrada: 1420, saida: 1400, estoque: 20 },
  { etapa: "Inspeção", entrada: 1400, saida: 1380, estoque: 20 },
  { etapa: "Expedição", entrada: 1380, saida: 1380, estoque: 0 },
];

const leadTimeData = [
  { dia: "Seg", leadTime: 145, meta: 120 },
  { dia: "Ter", leadTime: 132, meta: 120 },
  { dia: "Qua", leadTime: 128, meta: 120 },
  { dia: "Qui", leadTime: 138, meta: 120 },
  { dia: "Sex", leadTime: 125, meta: 120 },
];

const wipData = [
  { hora: "08h", wip: 250 },
  { hora: "10h", wip: 280 },
  { hora: "12h", wip: 310 },
  { hora: "14h", wip: 290 },
  { hora: "16h", wip: 270 },
  { hora: "18h", wip: 240 },
];

const gargalosData = [
  { processo: "Usinagem", utilizacao: 95, capacidade: 100 },
  { processo: "Montagem", utilizacao: 78, capacidade: 100 },
  { processo: "Inspeção", utilizacao: 85, capacidade: 100 },
  { processo: "Preparação", utilizacao: 65, capacidade: 100 },
];

export default function AnaliseFluxo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Fluxo</h1>
        <p className="text-muted-foreground">Visualização do fluxo produtivo e gargalos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Lead Time Médio"
          value="133.6 min"
          icon={Clock}
          variant="blue"
        />
        <MetricCard
          title="WIP Atual"
          value="240 un"
          icon={Package}
          variant="lightblue"
        />
        <MetricCard
          title="Taxa de Fluxo"
          value="92%"
          icon={GitBranch}
          variant="green"
        />
        <MetricCard
          title="Throughput"
          value="1,380 un"
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
            <BarChart data={fluxoProducao}>
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
            <BarChart data={gargalosData} layout="vertical">
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
        {gargalosData.map((proc) => (
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
