import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, UserCog, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const testCredentials = [
  {
    role: "Administrador",
    username: "admin",
    password: "admin123",
    icon: UserCog,
    color: "text-destructive",
  },
  {
    role: "Gestor",
    username: "gestor01",
    password: "gestor123",
    icon: UserCheck,
    color: "text-warning",
  },
  {
    role: "Operador",
    username: "operador01",
    password: "operador123",
    icon: User,
    color: "text-success",
  },
];

export default function Login() {
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo
    if (username && password && profile) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary/80 items-center justify-center p-12">
        <div className="text-center text-primary-foreground">
          <div className="w-32 h-32 mx-auto mb-8 bg-primary-foreground/10 backdrop-blur rounded-3xl flex items-center justify-center">
            <Package className="w-20 h-20" />
          </div>
          <h1 className="text-5xl font-bold mb-4">AXISUS MES</h1>
          <p className="text-xl opacity-90">Sistema de Gestão de Produção</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="lg:hidden w-16 h-16 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
              <Package className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Acesso ao Sistema</h2>
            <p className="text-muted-foreground">Faça login para acessar o painel de controle</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profile">Selecione seu perfil</Label>
              <Select value={profile} onValueChange={setProfile}>
                <SelectTrigger id="profile">
                  <SelectValue placeholder="Selecione seu perfil..." />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="operador">Operador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Digite seu usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Digite sua senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Entrar no Sistema
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Credenciais de Teste
            </p>
            <div className="space-y-3">
              {testCredentials.map((cred) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={cred.role}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center ${cred.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{cred.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {cred.username} / {cred.password}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
