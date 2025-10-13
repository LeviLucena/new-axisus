import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, TrendingUp, Clock, Target } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const performanceData = [
  { turno: "1º Turno", performance: 92, velocidadeReal: 110, velocidadeIdeal: 120 },
  { turno: "2º Turno", performance: 95, velocidadeReal: 114, velocidadeIdeal: 120 },
  { turno: "3º Turno", performance: 88, velocidadeReal: 106, velocidadeIdeal: 120 },
];

const evolucaoData = [
  { dia: "Seg", performance: 90 },
  { dia: "Ter", performance: 91 },
  { dia: "Qua", performance: 93 },
  { dia: "Qui", performance: 89 },
  { dia: "Sex", performance: 94 },
];

const maquinasPerformance = [
  { maquina: "Máquina 01", performance: 94.5, cicloIdeal: 45, cicloReal: 48, producao: 1200 },
  { maquina: "Máquina 02", performance: 89.2, cicloIdeal: 50, cicloReal: 56, producao: 1050 },
  { maquina: "Máquina 03", performance: 91.8, cicloIdeal: 45, cicloReal: 49, producao: 1150 },
  { maquina: "Máquina 04", performance: 87.5, cicloIdeal: 55, cicloReal: 63, producao: 980 },
];

export default function AnalisePerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Performance</h1>
        <p className="text-muted-foreground">Monitoramento de velocidade e eficiência produtiva</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Performance Média"
          value="92.8%"
          icon={Zap}
          variant="blue"
        />
        <MetricCard
          title="Velocidade Real"
          value="110 un/h"
          icon={TrendingUp}
          variant="green"
        />
        <MetricCard
          title="Ciclo Médio"
          value="53 seg"
          icon={Clock}
          variant="lightblue"
        />
        <MetricCard
          title="Meta Atingida"
          value="98.3%"
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
              <BarChart data={performanceData}>
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
              <LineChart data={evolucaoData}>
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
            <BarChart data={performanceData}>
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
              {maquinasPerformance.map((maq) => (
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
