import { Building2, Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const companies = [
  {
    id: 1,
    razaoSocial: "Empresa Teste Ltda",
    nomeFantasia: "Empresa Teste",
    cnpj: "12.345.678/0001-90",
    status: "ATIVO",
  },
];

const branches = [
  {
    id: 1,
    nome: "Filial Principal",
    cidade: "São Paulo",
    empresa: "Empresa Teste",
    status: "ATIVO",
  },
];

export default function GestaoGrupo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Gestão de Grupo</h1>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <Tabs defaultValue="empresas" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="empresas">Empresas</TabsTrigger>
          <TabsTrigger value="filiais">Filiais</TabsTrigger>
        </TabsList>

        <TabsContent value="empresas">
          <Card className="p-6">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead className="font-bold">ID</TableHead>
                    <TableHead className="font-bold">Razão Social</TableHead>
                    <TableHead className="font-bold">Nome Fantasia</TableHead>
                    <TableHead className="font-bold">CNPJ</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.id}</TableCell>
                      <TableCell>{company.razaoSocial}</TableCell>
                      <TableCell>{company.nomeFantasia}</TableCell>
                      <TableCell className="font-mono">{company.cnpj}</TableCell>
                      <TableCell>
                        <Badge className="bg-success text-success-foreground">
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-info"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-destructive"
                          >
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
        </TabsContent>

        <TabsContent value="filiais">
          <div className="flex justify-end mb-4">
            <Button className="bg-success hover:bg-success/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Filial
            </Button>
          </div>
          <Card className="p-6">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead className="font-bold">ID</TableHead>
                    <TableHead className="font-bold">Nome</TableHead>
                    <TableHead className="font-bold">Cidade</TableHead>
                    <TableHead className="font-bold">Empresa</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell className="font-medium">{branch.id}</TableCell>
                      <TableCell>{branch.nome}</TableCell>
                      <TableCell>{branch.cidade}</TableCell>
                      <TableCell>{branch.empresa}</TableCell>
                      <TableCell>
                        <Badge className="bg-success text-success-foreground">
                          {branch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-info"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-destructive"
                          >
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
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-muted-foreground py-8 border-t">
        AXISUS MES © 2024
      </div>
    </div>
  );
}
