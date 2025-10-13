import { Settings, Play, Pause, TrendingUp, RefreshCw } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const machines = [
  {
    id: 1,
    name: "Prensa Hidráulica 01",
    type: "Produção",
    status: "running",
    oee: 83.5,
    availability: 100.0,
    performance: 87.0,
    quality: 96.0,
  },
  {
    id: 2,
    name: "Esteira Transportadora 02",
    type: "Logística",
    status: "stopped",
    oee: 40.8,
    availability: 58.3,
    performance: 70.0,
    quality: 100.0,
  },
  {
    id: 3,
    name: "Injetora Plástico 03",
    type: "Produção",
    status: "stopped",
    oee: 14.7,
    availability: 20.0,
    performance: 75.0,
    quality: 98.0,
  },
  {
    id: 4,
    name: "Empacotadora 04",
    type: "Embalagem",
    status: "running",
    oee: 89.3,
    availability: 100.0,
    performance: 93.0,
    quality: 96.0,
  },
];

export default function Dashboard() {
  const totalMachines = machines.length;
  const runningMachines = machines.filter((m) => m.status === "running").length;
  const stoppedMachines = machines.filter((m) => m.status === "stopped").length;
  const avgOEE = (machines.reduce((acc, m) => acc + m.oee, 0) / totalMachines).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h1 className="text-3xl font-bold">Dashboard AXISUS MES</h1>
            </div>
            <p className="opacity-90">Monitoramento em Tempo Real</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm opacity-90">
              <p>Última atualização: --</p>
            </div>
            <Button variant="secondary" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm opacity-90 block mb-2">Filial:</label>
          <Select defaultValue="sp">
            <SelectTrigger className="w-64 bg-primary-foreground text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="sp">Filial Principal - São Paulo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Máquinas"
          value={totalMachines}
          icon={Settings}
          variant="blue"
        />
        <MetricCard
          title="Máquinas Operando"
          value={runningMachines}
          icon={Play}
          variant="green"
        />
        <MetricCard
          title="Máquinas Paradas"
          value={stoppedMachines}
          icon={Pause}
          variant="red"
        />
        <MetricCard
          title="OEE Médio"
          value={`${avgOEE}%`}
          icon={TrendingUp}
          variant="lightblue"
        />
      </div>

      {/* Machine Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-bold">Status das Máquinas</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm">
              Todas
            </Button>
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-1" />
              Operando
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="w-4 h-4 mr-1" />
              Paradas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {machines.map((machine) => (
            <Card key={machine.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{machine.name}</h3>
                  <p className="text-sm text-muted-foreground">{machine.type}</p>
                </div>
                <Badge
                  className={
                    machine.status === "running"
                      ? "bg-status-running text-success-foreground"
                      : "bg-status-stopped text-destructive-foreground"
                  }
                >
                  {machine.status === "running" ? "LIGADA" : "PARADA"}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">OEE</span>
                    <span className="font-semibold text-primary">{machine.oee}%</span>
                  </div>
                  <Progress value={machine.oee} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Disponibilidade</p>
                    <p className="font-semibold text-sm">{machine.availability}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Performance</p>
                    <p className="font-semibold text-sm">{machine.performance}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Qualidade</p>
                    <p className="font-semibold text-sm">{machine.quality}%</p>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="sm">
                Acessar Operador
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
