import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Zap, Target, AlertTriangle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const oeeData = [
  { mes: "Jan", oee: 78, disponibilidade: 85, performance: 90, qualidade: 98 },
  { mes: "Fev", oee: 82, disponibilidade: 88, performance: 92, qualidade: 99 },
  { mes: "Mar", oee: 85, disponibilidade: 90, performance: 93, qualidade: 99 },
  { mes: "Abr", oee: 81, disponibilidade: 87, performance: 91, qualidade: 98 },
  { mes: "Mai", oee: 87, disponibilidade: 92, performance: 94, qualidade: 99 },
  { mes: "Jun", oee: 89, disponibilidade: 94, performance: 95, qualidade: 99 },
];

const producaoData = [
  { turno: "1º Turno", planejado: 1200, realizado: 1150 },
  { turno: "2º Turno", planejado: 1200, realizado: 1180 },
  { turno: "3º Turno", planejado: 1200, realizado: 1100 },
];

const perdaData = [
  { name: "Setup", value: 15, color: "#ef4444" },
  { name: "Manutenção", value: 25, color: "#f97316" },
  { name: "Falta Material", value: 10, color: "#eab308" },
  { name: "Qualidade", value: 5, color: "#3b82f6" },
];

export default function DashboardTatico() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Tático</h1>
        <p className="text-muted-foreground">Visão estratégica da performance operacional</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="OEE Médio"
          value="85.2%"
          icon={Target}
          variant="blue"
        />
        <MetricCard
          title="Disponibilidade"
          value="89.3%"
          icon={Activity}
          variant="green"
        />
        <MetricCard
          title="Performance"
          value="92.8%"
          icon={Zap}
          variant="lightblue"
        />
        <MetricCard
          title="Qualidade"
          value="98.7%"
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
              <LineChart data={oeeData}>
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
              <BarChart data={producaoData}>
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
                  data={perdaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {perdaData.map((entry, index) => (
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
                  <p className="text-2xl font-bold text-success">+5.2%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Tempo de Setup</p>
                  <p className="text-2xl font-bold text-destructive">15 min</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Paradas Não Planejadas</p>
                  <p className="text-2xl font-bold text-warning">8</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
