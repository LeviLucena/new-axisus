import { ClipboardList, Plus, FileDown, Eye, Play, Pause, X, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface Order {
  id: string;
  orderNumber: string;
  product: {
    name: string;
  };
  quantity: number;
  produced: number;
  status: string;
  priority?: number;
  startDate?: string;
  endDate?: string;
  createdById: string;
}

export default function OrdensProducao() {
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClient.getOrders(),
  });

  const totalOPs = orders.length;
  const executing = orders.filter((o: Order) => o.status === "IN_PROGRESS").length;
  const finished = orders.filter((o: Order) => o.status === "FINISHED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ordens de Produção</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Ordem
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <ClipboardList className="w-5 h-5" />
          <h2 className="text-xl font-bold">Ordens de Produção</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-4 bg-muted/50">
            <p className="text-4xl font-bold mb-1">{totalOPs}</p>
            <p className="text-sm text-muted-foreground">Total de OPs</p>
          </Card>
          <Card className="p-4 bg-muted/50">
            <p className="text-4xl font-bold mb-1">{executing}</p>
            <p className="text-sm text-muted-foreground">Em Execução</p>
          </Card>
          <Card className="p-4 bg-muted/50">
            <p className="text-4xl font-bold mb-1">{finished}</p>
            <p className="text-sm text-muted-foreground">Finalizadas</p>
          </Card>
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary">
                <TableHead className="text-primary-foreground font-bold">Número</TableHead>
                <TableHead className="text-primary-foreground font-bold">Produto</TableHead>
                <TableHead className="text-primary-foreground font-bold">Quantidade</TableHead>
                <TableHead className="text-primary-foreground font-bold">Status</TableHead>
                <TableHead className="text-primary-foreground font-bold">Progresso</TableHead>
                <TableHead className="text-primary-foreground font-bold">Data Início</TableHead>
                <TableHead className="text-primary-foreground font-bold">Data Fim</TableHead>
                <TableHead className="text-primary-foreground font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold text-primary">{order.orderNumber}</TableCell>
                  <TableCell>{order.product?.name || 'Produto não encontrado'}</TableCell>
                  <TableCell className="font-mono">{order.produced}/{order.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "IN_PROGRESS"
                          ? "default"
                          : order.status === "FINISHED"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status === "PLANNED" ? "Planejada" : 
                       order.status === "IN_PROGRESS" ? "Em Execução" : 
                       order.status === "FINISHED" ? "Finalizada" : 
                       order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(order.produced / order.quantity) * 100} className="w-24 h-2" />
                      <span className="text-sm font-medium">{Math.round((order.produced / order.quantity) * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.startDate ? new Date(order.startDate).toLocaleDateString() : '--'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.endDate ? new Date(order.endDate).toLocaleDateString() : '--'}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-success hover:bg-success/90 text-success-foreground">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-warning hover:bg-warning/90 text-warning-foreground">
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
