import { UserCog, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    fullName: "Administrador do Sistema",
    username: "admin",
    role: "Administrador",
    status: "ATIVO",
    lastLogin: "30/07/2025, 13:13:31",
  },
  {
    id: 2,
    fullName: "João Silva - Gestor",
    username: "gestor01",
    role: "Gestor",
    status: "ATIVO",
    lastLogin: "Nunca",
  },
  {
    id: 3,
    fullName: "Maria Santos - Gestora",
    username: "gestor02",
    role: "Gestor",
    status: "ATIVO",
    lastLogin: "Nunca",
  },
  {
    id: 4,
    fullName: "Pedro Costa - Operador",
    username: "operador01",
    role: "Operador",
    status: "ATIVO",
    lastLogin: "Nunca",
  },
  {
    id: 5,
    fullName: "Ana Oliveira - Operadora",
    username: "operador02",
    role: "Operador",
    status: "ATIVO",
    lastLogin: "Nunca",
  },
  {
    id: 6,
    fullName: "Carlos Lima - Operador",
    username: "operador03",
    role: "Operador",
    status: "ATIVO",
    lastLogin: "Nunca",
  },
];

export default function GestaoUsuarios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Criar Novo Usuário
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserCog className="w-5 h-5" />
          <h2 className="text-xl font-bold">Lista de Usuários</h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="font-bold">Nome Completo</TableHead>
                <TableHead className="font-bold">Username</TableHead>
                <TableHead className="font-bold">Perfil (Role)</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Último Login</TableHead>
                <TableHead className="font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell className="font-mono">{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-info">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-warning">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive">
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
