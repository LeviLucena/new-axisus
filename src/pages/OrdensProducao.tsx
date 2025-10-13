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

const orders = [
  {
    number: "OP010",
    product: "Porca M8 - Aço Inox",
    quantity: "734/339",
    status: "Em Execução",
    progress: 217,
    startDate: "--",
    endDate: "--",
  },
  {
    number: "OP009",
    product: "Placa Alumínio 2mm 50x100cm",
    quantity: "567/443",
    status: "Em Execução",
    progress: 128,
    startDate: "--",
    endDate: "--",
  },
  {
    number: "OP008",
    product: "Tubo Aço 25mm - 1 metro",
    quantity: "296/547",
    status: "Em Execução",
    progress: 54,
    startDate: "--",
    endDate: "--",
  },
  {
    number: "OP007",
    product: "Placa Alumínio 2mm 50x100cm",
    quantity: "800/919",
    status: "Finalizada",
    progress: 87,
    startDate: "--",
    endDate: "--",
  },
  {
    number: "OP006",
    product: "Arruela M8 - Aço Inox",
    quantity: "135/830",
    status: "Planejada",
    progress: 16,
    startDate: "--",
    endDate: "--",
  },
];

export default function OrdensProducao() {
  const totalOPs = orders.length;
  const executing = orders.filter((o) => o.status === "Em Execução").length;
  const finished = orders.filter((o) => o.status === "Finalizada").length;

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
          <Button variant="outline" size="sm">
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
                <TableRow key={order.number}>
                  <TableCell className="font-semibold text-primary">{order.number}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="font-mono">{order.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Em Execução"
                          ? "default"
                          : order.status === "Finalizada"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={order.progress} className="w-24 h-2" />
                      <span className="text-sm font-medium">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.startDate}</TableCell>
                  <TableCell className="text-muted-foreground">{order.endDate}</TableCell>
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
