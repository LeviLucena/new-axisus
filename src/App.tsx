import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardTatico from "./pages/DashboardTatico";
import Operador from "./pages/Operador";
import OrdensProducao from "./pages/OrdensProducao";
import Produtos from "./pages/Produtos";
import GestaoUsuarios from "./pages/GestaoUsuarios";
import GestaoGrupo from "./pages/GestaoGrupo";
import AnaliseQualidade from "./pages/AnaliseQualidade";
import AnaliseDisponibilidade from "./pages/AnaliseDisponibilidade";
import AnalisePerformance from "./pages/AnalisePerformance";
import RegistrarProducao from "./pages/RegistrarProducao";
import AnaliseParadas from "./pages/AnaliseParadas";
import AnaliseFluxo from "./pages/AnaliseFluxo";
import Parametros from "./pages/Parametros";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/operador"
            element={
              <DashboardLayout>
                <Operador />
              </DashboardLayout>
            }
          />
          <Route
            path="/ordens-producao"
            element={
              <DashboardLayout>
                <OrdensProducao />
              </DashboardLayout>
            }
          />
          <Route
            path="/produtos"
            element={
              <DashboardLayout>
                <Produtos />
              </DashboardLayout>
            }
          />
          <Route
            path="/gestao-usuarios"
            element={
              <DashboardLayout>
                <GestaoUsuarios />
              </DashboardLayout>
            }
          />
          <Route
            path="/gestao-grupo"
            element={
              <DashboardLayout>
                <GestaoGrupo />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard-tatico"
            element={
              <DashboardLayout>
                <DashboardTatico />
              </DashboardLayout>
            }
          />
          <Route
            path="/analise-qualidade"
            element={
              <DashboardLayout>
                <AnaliseQualidade />
              </DashboardLayout>
            }
          />
          <Route
            path="/analise-disponibilidade"
            element={
              <DashboardLayout>
                <AnaliseDisponibilidade />
              </DashboardLayout>
            }
          />
          <Route
            path="/analise-performance"
            element={
              <DashboardLayout>
                <AnalisePerformance />
              </DashboardLayout>
            }
          />
          <Route
            path="/registrar-producao"
            element={
              <DashboardLayout>
                <RegistrarProducao />
              </DashboardLayout>
            }
          />
          <Route
            path="/analise-paradas"
            element={
              <DashboardLayout>
                <AnaliseParadas />
              </DashboardLayout>
            }
          />
          <Route
            path="/analise-fluxo"
            element={
              <DashboardLayout>
                <AnaliseFluxo />
              </DashboardLayout>
            }
          />
          <Route
            path="/parametros"
            element={
              <DashboardLayout>
                <Parametros />
              </DashboardLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
