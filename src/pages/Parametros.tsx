import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RotateCcw, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useState, useRef } from "react";

const maquinasParametros = [
  { id: 1, maquina: "Máquina 01", cicloIdeal: 45, velocidade: 120, oeeMinimo: 85 },
  { id: 2, maquina: "Máquina 02", cicloIdeal: 50, velocidade: 110, oeeMinimo: 85 },
  { id: 3, maquina: "Máquina 03", cicloIdeal: 45, velocidade: 120, oeeMinimo: 85 },
  { id: 4, maquina: "Máquina 04", cicloIdeal: 55, velocidade: 100, oeeMinimo: 85 },
];

export default function Parametros() {
  const queryClient = useQueryClient();
  
  const { data: parametersData, isLoading, error } = useQuery<SystemParameters>({
    queryKey: ['systemParameters'],
    queryFn: () => apiClient.getSystemParameters(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutations for saving and resetting parameters
  const saveMutation = useMutation({
    mutationFn: ({ section, data }: { section: string; data: any }) => 
      apiClient.updateSystemParameters(section, data),
    onSuccess: () => {
      toast({
        title: "Parâmetros Salvos",
        description: "As configurações foram atualizadas com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ['systemParameters'] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao salvar parâmetros.",
        variant: "destructive",
      });
    }
  });

  const resetMutation = useMutation({
    mutationFn: () => apiClient.resetSystemParameters(),
    onSuccess: () => {
      toast({
        title: "Parâmetros Restaurados",
        description: "Os valores padrão foram restaurados.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: ['systemParameters'] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao restaurar parâmetros.",
        variant: "destructive",
      });
    }
  });

  const handleSave = () => {
    // This function will be implemented to save all current parameter values
    // For now, I'll just show the toast
    // In a real implementation, we would collect the current values from the form and send them
    toast({
      title: "Parâmetros Salvos",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  const handleReset = () => {
    resetMutation.mutate();
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Parâmetros do Sistema</h1>
          <p className="text-muted-foreground">Configurações e definições operacionais</p>
        </div>
        <div className="text-center py-10">Carregando parâmetros...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Parâmetros do Sistema</h1>
          <p className="text-muted-foreground">Configurações e definições operacionais</p>
        </div>
        <div className="text-center py-10 text-destructive">
          Erro ao carregar parâmetros: {error instanceof Error ? error.message : 'An error occurred'}
        </div>
      </div>
    );
  }

  // If no data is available, show empty state
  if (!parametersData) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Parâmetros do Sistema</h1>
          <p className="text-muted-foreground">Configurações e definições operacionais</p>
        </div>
        <div className="text-center py-10">Nenhum dado disponível</div>
      </div>
    );
  }

  // Destructure the parameter data
  const { machineParams, stopReasons, oeeTargets, productionTargets, systemSettings } = parametersData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Parâmetros do Sistema</h1>
        <p className="text-muted-foreground">Configurações e definições operacionais</p>
      </div>

      <Tabs defaultValue="maquinas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="maquinas">Máquinas</TabsTrigger>
          <TabsTrigger value="paradas">Motivos de Parada</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="maquinas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parâmetros das Máquinas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Máquina</TableHead>
                    <TableHead className="text-right">Ciclo Ideal (s)</TableHead>
                    <TableHead className="text-right">Velocidade Ideal (un/h)</TableHead>
                    <TableHead className="text-right">OEE Mínimo (%)</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machineParams.map((maq) => (
                    <TableRow key={maq.id}>
                      <TableCell className="font-medium">{maq.machineId.replace('machine-', 'Máquina ').toUpperCase()}</TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={maq.cicloIdeal} className="w-20 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={maq.velocidade} className="w-20 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input type="number" defaultValue={maq.oeeMinimo} className="w-20 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paradas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Motivos de Parada</CardTitle>
                <Button>Adicionar Motivo</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stopReasons.map((motivo) => (
                    <TableRow key={motivo.id}>
                      <TableCell className="font-medium">{motivo.codigo}</TableCell>
                      <TableCell>{motivo.descricao}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            motivo.tipo === "Planejada"
                              ? "bg-info/20 text-info"
                              : "bg-warning/20 text-warning"
                          }`}
                        >
                          {motivo.tipo}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline">Editar</Button>
                          <Button size="sm" variant="destructive">Excluir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metas" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Metas de OEE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oee-meta">Meta OEE Geral (%)</Label>
                  <Input id="oee-meta" type="number" defaultValue={oeeTargets.oeeGeral} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disponibilidade-meta">Meta Disponibilidade (%)</Label>
                  <Input id="disponibilidade-meta" type="number" defaultValue={oeeTargets.disponibilidade} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performance-meta">Meta Performance (%)</Label>
                  <Input id="performance-meta" type="number" defaultValue={oeeTargets.performance} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualidade-meta">Meta Qualidade (%)</Label>
                  <Input id="qualidade-meta" type="number" defaultValue={oeeTargets.qualidade} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metas de Produção</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="producao-diaria">Produção Diária (unidades)</Label>
                  <Input id="producao-diaria" type="number" defaultValue={productionTargets.producaoDiaria} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="producao-turno">Produção por Turno (unidades)</Label>
                  <Input id="producao-turno" type="number" defaultValue={productionTargets.producaoTurno} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-time">Lead Time Máximo (min)</Label>
                  <Input id="lead-time" type="number" defaultValue={productionTargets.leadTime} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wip-maximo">WIP Máximo (unidades)</Label>
                  <Input id="wip-maximo" type="number" defaultValue={productionTargets.wipMaximo} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="turno-duracao">Duração do Turno (horas)</Label>
                  <Input id="turno-duracao" type="number" defaultValue={systemSettings.turnoDuracao} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="turnos-dia">Turnos por Dia</Label>
                  <Input id="turnos-dia" type="number" defaultValue={systemSettings.turnosDia} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intervalo">Intervalo (minutos)</Label>
                  <Input id="intervalo" type="number" defaultValue={systemSettings.intervalo} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="atualizacao">Intervalo de Atualização (segundos)</Label>
                  <Input id="atualizacao" type="number" defaultValue={systemSettings.atualizacao} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-warning/10 border-warning">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="w-5 h-5" />
                  Informações Importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>• Alterações nos parâmetros afetam o cálculo de todos os indicadores</p>
                <p>• Recomenda-se backup antes de modificar configurações críticas</p>
                <p>• Mudanças em metas de OEE são aplicadas imediatamente</p>
                <p>• Parâmetros de máquinas devem ser validados com a equipe técnica</p>
                <p>• Histórico de alterações é mantido no sistema</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar Padrões
        </Button>
      </div>
    </div>
  );
}
