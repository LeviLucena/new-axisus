import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  Gauge,
  Users,
  ClipboardList,
  Package,
  BarChart3,
  GitBranch,
  Settings,
  Building2,
  UserCog,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard Tático", url: "/dashboard-tatico", icon: TrendingUp },
  { title: "Análise de Qualidade", url: "/analise-qualidade", icon: Activity },
  { title: "Análise de Disponibilidade", url: "/analise-disponibilidade", icon: Gauge },
  { title: "Análise de Performance", url: "/analise-performance", icon: BarChart3 },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Operador", url: "/operador", icon: Users },
  { title: "Registrar Produção", url: "/registrar-producao", icon: ClipboardList },
  { title: "Ordens de Produção", url: "/ordens-producao", icon: ClipboardList },
  { title: "Produtos", url: "/produtos", icon: Package },
  { title: "Análise de Paradas", url: "/analise-paradas", icon: GitBranch },
  { title: "Análise de Fluxo", url: "/analise-fluxo", icon: GitBranch },
  { title: "Parâmetros", url: "/parametros", icon: Settings },
];

const adminItems = [
  { title: "Gestão de Usuários", url: "/gestao-usuarios", icon: UserCog },
  { title: "Gestão de Grupo", url: "/gestao-grupo", icon: Building2 },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground rounded flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">AXISUS MES</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent" : ""
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administrador do Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent" : ""
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
