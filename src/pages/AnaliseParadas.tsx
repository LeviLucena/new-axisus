import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Clock, Wrench, PackageX } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const motivosParada = [
  { motivo: "Manutenção", quantidade: 12, duracao: 180, percentual: 35, color: "#ef4444" },
  { motivo: "Falta de Material", quantidade: 8, duracao: 95, percentual: 18, color: "#f97316" },
  { motivo: "Setup", quantidade: 15, duracao: 120, percentual: 23, color: "#eab308" },
  { motivo: "Ajuste de Qualidade", quantidade: 6, duracao: 65, percentual: 13, color: "#3b82f6" },
  { motivo: "Outros", quantidade: 5, duracao: 55, percentual: 11, color: "#8b5cf6" },
];

const paradasPorMaquina = [
  { maquina: "Máquina 01", paradas: 8, duracao: 95 },
  { maquina: "Máquina 02", paradas: 14, duracao: 165 },
  { maquina: "Máquina 03", paradas: 10, duracao: 120 },
  { maquina: "Máquina 04", paradas: 14, duracao: 135 },
];

const historicoParadas = [
  { data: "10/10/2025", hora: "08:30", maquina: "Máquina 02", motivo: "Manutenção Preventiva", duracao: "45 min", responsavel: "João Silva" },
  { data: "10/10/2025", hora: "10:15", maquina: "Máquina 04", motivo: "Falta de Material", duracao: "30 min", responsavel: "Maria Santos" },
  { data: "10/10/2025", hora: "13:00", maquina: "Máquina 01", motivo: "Setup de Produto", duracao: "25 min", responsavel: "Pedro Costa" },
  { data: "10/10/2025", hora: "14:45", maquina: "Máquina 03", motivo: "Ajuste de Parâmetros", duracao: "20 min", responsavel: "Ana Lima" },
  { data: "10/10/2025", hora: "16:20", maquina: "Máquina 02", motivo: "Manutenção Corretiva", duracao: "60 min", responsavel: "João Silva" },
];

export default function AnaliseParadas() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Paradas</h1>
        <p className="text-muted-foreground">Monitoramento de causas e tempos de parada</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Paradas"
          value="46"
          icon={AlertTriangle}
          variant="red"
        />
        <MetricCard
          title="Tempo Total Parado"
          value="515 min"
          icon={Clock}
          variant="red"
        />
        <MetricCard
          title="Tempo Médio/Parada"
          value="11.2 min"
          icon={Clock}
          variant="lightblue"
        />
        <MetricCard
          title="MTTR"
          value="18 min"
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
                  data={motivosParada}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ motivo, percentual }) => `${motivo}: ${percentual}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentual"
                >
                  {motivosParada.map((entry, index) => (
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
              <BarChart data={paradasPorMaquina}>
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
              {motivosParada.map((motivo) => (
                <TableRow key={motivo.motivo}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: motivo.color }} />
                      {motivo.motivo}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{motivo.quantidade}</TableCell>
                  <TableCell className="text-right">{motivo.duracao} min</TableCell>
                  <TableCell className="text-right">{(motivo.duracao / motivo.quantidade).toFixed(1)} min</TableCell>
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
              {historicoParadas.map((parada, idx) => (
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
