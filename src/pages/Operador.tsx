import { Settings, Clock, LogOut, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const availableMachines = [
  { id: 1, name: "Prensa Hidráulica 01", type: "Produção", cycleTime: "10s" },
  { id: 2, name: "Esteira Transportadora 02", type: "Logística", cycleTime: "12s" },
  { id: 3, name: "Injetora Plástico 03", type: "Produção", cycleTime: "15.2s" },
  { id: 4, name: "Empacotadora 04", type: "Embalagem", cycleTime: "6.8s" },
  { id: 5, name: "Serra Circular 05", type: "Corte", cycleTime: "10.5s" },
  { id: 6, name: "Furadeira CNC 06", type: "Usinagem", cycleTime: "18.3s" },
];

export default function Operador() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                PC
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Pedro Costa - Operador</h1>
              <p className="text-muted-foreground">Operador</p>
            </div>
          </div>
          <Button variant="destructive" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </Card>

      {/* Instructions */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold">Área do Operador</h2>
        </div>
        <p className="text-muted-foreground mt-1">Selecione a máquina que você irá operar</p>
      </div>

      {/* Machines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Máquinas Disponíveis</h3>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableMachines.map((machine) => (
            <Card key={machine.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold">{machine.name}</h3>
                    <Badge className="bg-status-operational text-success-foreground">
                      OPERACIONAL
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{machine.type}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ID:</span>
                  <span className="font-semibold">{machine.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tempo de Ciclo:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {machine.cycleTime}
                  </span>
                </div>
              </div>

              <Button className="w-full">Selecionar Máquina</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
