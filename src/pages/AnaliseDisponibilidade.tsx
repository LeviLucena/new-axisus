import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/MetricCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Clock, Pause, Play } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const disponibilidadeData = [
  { hora: "00h", disponivel: 95, parado: 5 },
  { hora: "04h", disponivel: 92, parado: 8 },
  { hora: "08h", disponivel: 88, parado: 12 },
  { hora: "12h", disponivel: 90, parado: 10 },
  { hora: "16h", disponivel: 93, parado: 7 },
  { hora: "20h", disponivel: 94, parado: 6 },
];

const maquinasData = [
  { maquina: "Máquina 01", disponibilidade: 94.5, tempoOperacao: 340, tempoParada: 20 },
  { maquina: "Máquina 02", disponibilidade: 89.2, tempoOperacao: 321, tempoParada: 39 },
  { maquina: "Máquina 03", disponibilidade: 91.8, tempoOperacao: 331, tempoParada: 29 },
  { maquina: "Máquina 04", disponibilidade: 87.5, tempoOperacao: 315, tempoParada: 45 },
];

const paradasRecentes = [
  { maquina: "Máquina 02", motivo: "Manutenção Preventiva", inicio: "08:30", fim: "09:45", duracao: "1h 15min" },
  { maquina: "Máquina 04", motivo: "Falta de Material", inicio: "10:20", fim: "11:00", duracao: "40min" },
  { maquina: "Máquina 01", motivo: "Setup de Produto", inicio: "13:00", fim: "13:25", duracao: "25min" },
  { maquina: "Máquina 03", motivo: "Ajuste de Parâmetros", inicio: "14:15", fim: "14:35", duracao: "20min" },
];

export default function AnaliseDisponibilidade() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análise de Disponibilidade</h1>
        <p className="text-muted-foreground">Monitoramento do tempo produtivo e paradas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Disponibilidade Média"
          value="89.3%"
          icon={Activity}
          variant="green"
        />
        <MetricCard
          title="Tempo Operação"
          value="1,307 min"
          icon={Play}
          variant="blue"
        />
        <MetricCard
          title="Tempo Parada"
          value="133 min"
          icon={Pause}
          variant="red"
        />
        <MetricCard
          title="MTBF"
          value="127 min"
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
              <BarChart data={disponibilidadeData}>
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
              <BarChart data={maquinasData} layout="vertical">
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
              {maquinasData.map((maq) => (
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
              {paradasRecentes.map((parada, idx) => (
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
