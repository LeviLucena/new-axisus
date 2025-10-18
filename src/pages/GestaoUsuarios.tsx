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
import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  status: string;
  lastLogin?: string;
  group?: {
    name: string;
  };
}

export default function GestaoUsuarios() {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getUsers(),
  });
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
                  <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                  <TableCell className="font-mono">{user.username}</TableCell>
                  <TableCell>
                    {user.role === 'ADMIN' ? 'Administrador' : 
                     user.role === 'MANAGER' ? 'Gestor' : 
                     user.role === 'OPERATOR' ? 'Operador' : user.role}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Nunca'}
                  </TableCell>
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
