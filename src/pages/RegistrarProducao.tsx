import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function RegistrarProducao() {
  const [formData, setFormData] = useState({
    maquina: "",
    ordem: "",
    produto: "",
    quantidade: "",
    conformes: "",
    naoConformes: "",
    refugos: "",
    observacoes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Produção Registrada",
      description: "Os dados de produção foram salvos com sucesso.",
    });
    setFormData({
      maquina: "",
      ordem: "",
      produto: "",
      quantidade: "",
      conformes: "",
      naoConformes: "",
      refugos: "",
      observacoes: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Registrar Produção</h1>
        <p className="text-muted-foreground">Lançamento de dados de produção e qualidade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dados de Produção</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maquina">Máquina *</Label>
                  <Select
                    value={formData.maquina}
                    onValueChange={(value) => setFormData({ ...formData, maquina: value })}
                  >
                    <SelectTrigger id="maquina">
                      <SelectValue placeholder="Selecione a máquina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maq01">Máquina 01</SelectItem>
                      <SelectItem value="maq02">Máquina 02</SelectItem>
                      <SelectItem value="maq03">Máquina 03</SelectItem>
                      <SelectItem value="maq04">Máquina 04</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ordem">Ordem de Produção *</Label>
                  <Select
                    value={formData.ordem}
                    onValueChange={(value) => setFormData({ ...formData, ordem: value })}
                  >
                    <SelectTrigger id="ordem">
                      <SelectValue placeholder="Selecione a OP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="op001">OP-2025-001</SelectItem>
                      <SelectItem value="op002">OP-2025-002</SelectItem>
                      <SelectItem value="op003">OP-2025-003</SelectItem>
                      <SelectItem value="op004">OP-2025-004</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="produto">Produto *</Label>
                  <Select
                    value={formData.produto}
                    onValueChange={(value) => setFormData({ ...formData, produto: value })}
                  >
                    <SelectTrigger id="produto">
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prod-a">Produto A</SelectItem>
                      <SelectItem value="prod-b">Produto B</SelectItem>
                      <SelectItem value="prod-c">Produto C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade Produzida *</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    placeholder="0"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Controle de Qualidade</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conformes">Peças Conformes</Label>
                    <Input
                      id="conformes"
                      type="number"
                      placeholder="0"
                      value={formData.conformes}
                      onChange={(e) => setFormData({ ...formData, conformes: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="naoConformes">Não Conformes</Label>
                    <Input
                      id="naoConformes"
                      type="number"
                      placeholder="0"
                      value={formData.naoConformes}
                      onChange={(e) => setFormData({ ...formData, naoConformes: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refugos">Refugos</Label>
                    <Input
                      id="refugos"
                      type="number"
                      placeholder="0"
                      value={formData.refugos}
                      onChange={(e) => setFormData({ ...formData, refugos: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Adicione observações sobre a produção..."
                  rows={4}
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Registro
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({
                      maquina: "",
                      ordem: "",
                      produto: "",
                      quantidade: "",
                      conformes: "",
                      naoConformes: "",
                      refugos: "",
                      observacoes: "",
                    })
                  }
                >
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Turno</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Turno Atual</p>
                <p className="text-2xl font-bold">2º Turno</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Horário</p>
                <p className="text-lg font-semibold">14:00 - 22:00</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-1">Total Produzido Hoje</p>
                <p className="text-3xl font-bold text-primary">2,840 un</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa de Conformidade</p>
                <p className="text-2xl font-bold text-success">98.5%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-info/10 border-info">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-info">
                <AlertCircle className="w-5 h-5" />
                Instruções
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>1. Selecione a máquina e ordem de produção</p>
              <p>2. Informe a quantidade produzida</p>
              <p>3. Registre os dados de qualidade</p>
              <p>4. Adicione observações se necessário</p>
              <p>5. Clique em "Salvar Registro"</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
