import { Package, Plus, Search, RefreshCw, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  { id: 1, code: "PROD001", name: "Parafuso M8x20 - Aço Inox", description: "", status: "ATIVO" },
  { id: 2, code: "PROD002", name: "Porca M8 - Aço Inox", description: "", status: "ATIVO" },
  { id: 3, code: "PROD003", name: "Arruela M8 - Aço Inox", description: "", status: "ATIVO" },
  { id: 4, code: "PROD004", name: "Suporte Metálico 30x40cm", description: "", status: "ATIVO" },
  { id: 5, code: "PROD005", name: "Placa Alumínio 2mm 50x100cm", description: "", status: "ATIVO" },
  { id: 6, code: "PROD006", name: "Tubo Aço 25mm - 1 metro", description: "", status: "ATIVO" },
];

export default function Produtos() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Gestão de Produtos</h1>
            </div>
            <p className="text-muted-foreground">Gerencie o inventário de produtos do sistema</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-5 h-5" />
              <p className="text-sm text-muted-foreground">Total de Produtos</p>
            </div>
            <p className="text-3xl font-bold">{products.length}</p>
          </Card>
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-success text-success-foreground">ATIVO</Badge>
              <p className="text-sm text-muted-foreground">Produtos Ativos</p>
            </div>
            <p className="text-3xl font-bold">{products.length}</p>
          </Card>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar produtos..." className="pl-10" />
          </div>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary">
                <TableHead className="text-primary-foreground font-bold">ID</TableHead>
                <TableHead className="text-primary-foreground font-bold">Código</TableHead>
                <TableHead className="text-primary-foreground font-bold">Nome</TableHead>
                <TableHead className="text-primary-foreground font-bold">Descrição</TableHead>
                <TableHead className="text-primary-foreground font-bold">Status</TableHead>
                <TableHead className="text-primary-foreground font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell className="font-mono font-semibold">{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.description || "--"}</TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">{product.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Trash2 className="w-4 h-4" />
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
