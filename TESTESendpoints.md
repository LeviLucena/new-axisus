# Testes de endpoints
Para obter o token JWT necessário para acessar a rota /api/analytics/tactical, você tem algumas opções:

  1. Acessando o token do localStorage (via navegador):
  Se você já estiver logado na aplicação, o token JWT está armazenado no localStorage do navegador:
   - Abra o Console do navegador (F12)
   - Execute: localStorage.getItem('token')

  2. Fazendo login via API:
  Você pode obter um novo token fazendo uma requisição POST para o endpoint de login:

   1 POST http://localhost:4000/api/auth/login

  Com o corpo da requisição no formato JSON:

   1 {
   2   "username": "admin",
   3   "password": "admin123",
   4   "profile": "administrador"
   5 }

  3. Usando credenciais padrão:
  O projeto vem com credenciais padrão definidas na documentação:


  ┌───────────────┬────────────┬─────────────┐
  │ Perfil        │ Usuário    │ Senha       │
  ├───────────────┼────────────┼─────────────┤
  │ Administrador │ admin      │ admin123    │
  │ Gestor        │ gestor01   │ gestor123   │
  │ Operador      │ operador01 │ operador123 │
  └───────────────┴────────────┴─────────────┘


  Exemplo completo de obtenção e uso do token:

   1. Primeiro, faça login para obter o token:

   1 curl -X POST http://localhost:4000/api/auth/login \
   2   -H "Content-Type: application/json" \
   3   -d '{"username": "admin", "password": "admin123", "profile": "administrador"}'

   2. Isso retornará algo como:                                                                                       
                                                                                                                      
   1 {
   2   "token": "seu_token_jwt_aqui",
   3   "user": { ... }
   4 }

   3. Use o token retornado na requisição para o dashboard tático:

   1 curl http://localhost:4000/api/analytics/tactical \
   2   -H "Authorization: Bearer seu_token_jwt_aqui"

  Ou você pode pegar o token diretamente acessando a aplicação web em http://localhost:8080, fazendo login
  e usando o token que foi automaticamente salvo no localStorage do seu navegador.

## Testando o endpoint para /analise-qualidade

Para testar o endpoint que fornece dados para a página /analise-qualidade, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/analytics/quality
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/analytics/quality \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `totalInspections`: Número total de inspeções
- `passedInspections`: Número de inspeções aprovadas
- `failedInspections`: Número de inspeções reprovadas
- `passRate`: Taxa de aprovação em porcentagem
- `defectRate`: Taxa de defeitos em porcentagem  
- `qualityTrend`: Array com dados de qualidade por dia (conformes, naoConformes, refugo)
- `recentBatches`: Array com informações dos lotes recentes
- `topDefects`: Array com tipos de defeitos e suas estatísticas

## Testando o endpoint para /analise-disponibilidade

Para testar o endpoint que fornece dados para a página /analise-disponibilidade, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/analytics/availability
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/analytics/availability \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `avgAvailability`: Disponibilidade média em porcentagem
- `plannedDowntime`: Tempo de parada planejado em minutos
- `unplannedDowntime`: Tempo de parada não planejado em minutos
- `totalOperationTime`: Tempo total de operação em minutos
- `totalDowntime`: Tempo total de parada em minutos
- `mtbf`: Mean Time Between Failures (Tempo médio entre falhas) em minutos
- `availabilityTrend`: Array com histórico de disponibilidade por data
- `hourlyAvailability`: Array com dados de disponibilidade por hora (disponível, parado)
- `machineAvailability`: Array com dados de disponibilidade por máquina
- `recentStops`: Array com informações sobre paradas recentes

## Testando o endpoint para /analise-performance

Para testar o endpoint que fornece dados para a página /analise-performance, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/analytics/performance
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/analytics/performance \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `avgPerformance`: Performance média em porcentagem
- `actualOutput`: Produção atual (unidades)
- `targetOutput`: Produção alvo (unidades)
- `achievementRate`: Taxa de alcance da meta em porcentagem
- `actualSpeed`: Velocidade real de produção (unidades por hora)
- `averageCycleTime`: Tempo médio de ciclo em segundos
- `performanceByShift`: Array com dados de performance por turno
- `weeklyPerformance`: Array com dados de performance semanal
- `machinePerformance`: Array com dados de performance por máquina
- `performanceTrend`: Array com histórico de performance por data

## Testando o endpoint para /dashboard

Para testar o endpoint que fornece dados para a página /dashboard, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/analytics/oee
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/analytics/oee \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `totalMachines`: Número total de máquinas
- `runningMachines`: Número de máquinas em operação
- `stoppedMachines`: Número de máquinas paradas
- `avgOEE`: Overall Equipment Effectiveness médio em porcentagem
- `machines`: Array com informações detalhadas de cada máquina, incluindo:
  - `id`: ID da máquina
  - `name`: Nome da máquina
  - `type`: Tipo da máquina
  - `status`: Status (RUNNING, STOPPED, MAINTENANCE)
  - `oee`: OEE da máquina
  - `availability`: Disponibilidade da máquina
  - `performance`: Performance da máquina
  - `quality`: Qualidade da máquina

## Testando o endpoint para /operador

Para testar o endpoint que fornece dados para a página /operador, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/machines
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/machines \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um array de objetos JSON contendo:
- `id`: ID único da máquina
- `name`: Nome da máquina
- `type`: Tipo da máquina (Produção, Logística, Embalagem, etc.)
- `status`: Status atual da máquina (RUNNING, STOPPED, MAINTENANCE)
- `groupId`: ID do grupo (opcional)
- `oee`: Overall Equipment Effectiveness da máquina
- `availability`: Disponibilidade da máquina
- `performance`: Performance da máquina
- `quality`: Qualidade da máquina
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Testando os endpoints para /registrar-producao

A página /registrar-producao utiliza múltiplos endpoints para funcionar corretamente:

### 1. Endpoint para obter máquinas:
```
GET http://localhost:4000/api/machines
```

### 2. Endpoint para obter ordens de produção:
```
GET http://localhost:4000/api/orders
```

### 3. Endpoint para obter produtos:
```
GET http://localhost:4000/api/products
```

### 4. Endpoint para registrar produção (envio de dados):
```
POST http://localhost:4000/api/production
```

Todos os endpoints acima requerem um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplos de requisições:

**Obter máquinas:**
```bash
curl http://localhost:4000/api/machines \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

**Obter ordens de produção:**
```bash
curl http://localhost:4000/api/orders \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

**Obter produtos:**
```bash
curl http://localhost:4000/api/products \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

**Registrar produção:**
```bash
curl -X POST http://localhost:4000/api/production \
  -H "Authorization: Bearer seu_token_jwt_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 100,
    "machineId": "machine_id_here",
    "orderId": "order_id_here",
    "productId": "product_id_here",
    "userId": "user_id_here"
  }'
```

### Estrutura da requisição POST para /api/production:
- `quantity`: Quantidade produzida (número)
- `machineId`: ID da máquina usada (string)
- `orderId`: ID da ordem de produção (string)
- `productId`: ID do produto (string)
- `userId`: ID do usuário que registrou (string)

## Testando os endpoints para /ordens-producao

A página /ordens-producao utiliza múltiplos endpoints para funcionar corretamente:

### 1. Endpoint para obter ordens de produção:
```
GET http://localhost:4000/api/orders
```

### 2. Endpoint para obter produtos (para detalhes dos produtos nas ordens):
```
GET http://localhost:4000/api/products
```

Todos os endpoints acima requerem um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplos de requisições:

**Obter ordens de produção:**
```bash
curl http://localhost:4000/api/orders \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

**Obter produtos:**
```bash
curl http://localhost:4000/api/products \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta para /api/orders:
- `id`: ID único da ordem
- `orderNumber`: Número da ordem de produção
- `productId`: ID do produto associado à ordem
- `quantity`: Quantidade planejada
- `produced`: Quantidade produzida
- `status`: Status da ordem (PLANNED, IN_PROGRESS, FINISHED, CANCELLED)
- `priority`: Prioridade da ordem
- `startDate`: Data de início da execução
- `endDate`: Data de término da execução
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização
- `createdById`: ID do usuário que criou a ordem

### Estrutura da resposta para /api/products:
- `id`: ID único do produto
- `code`: Código do produto
- `name`: Nome do produto
- `description`: Descrição do produto
- `status`: Status do produto (ACTIVE, INACTIVE)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Testando o endpoint para /produtos

A página /produtos utiliza o seguinte endpoint para obter os dados:

```
GET http://localhost:4000/api/products
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/products \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um array de objetos JSON contendo:
- `id`: ID único do produto
- `code`: Código do produto
- `name`: Nome do produto
- `description`: Descrição do produto
- `status`: Status do produto (ACTIVE, INACTIVE)
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## Testando o endpoint para /analise-paradas

Para testar o endpoint que fornece dados para a página /analise-paradas, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/analytics/stops
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/analytics/stops \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `totalStops`: Número total de paradas
- `totalStopTime`: Tempo total de parada em minutos
- `avgStopDuration`: Duração média de parada em minutos
- `plannedStops`: Número de paradas planejadas
- `unplannedStops`: Número de paradas não planejadas
- `mttr`: Mean Time To Repair (Tempo médio para reparo) em minutos
- `stopReasons`: Array com detalhes das razões das paradas, incluindo:
  - `motivo`: Motivo da parada
  - `quantidade`: Quantidade de ocorrências
  - `duracao`: Duração total em minutos
  - `percentual`: Percentual do total
  - `color`: Cor para visualização
- `stopsByMachine`: Array com informações de paradas por máquina
- `stopHistory`: Array com histórico detalhado de paradas
- `topStopReasons`: Array com as principais razões das paradas

## Testando o endpoint para /analise-fluxo

Para testar o endpoint que fornece dados para a página /analise-fluxo, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/analytics/flow
```

Este endpoint requer um token de autenticação JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/analytics/flow \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `totalOrders`: Número total de ordens
- `ordersInProgress`: Número de ordens em andamento
- `avgThroughput`: Throughput médio
- `avgLeadTime`: Lead time médio em minutos
- `currentWip`: Work in Progress atual
- `flowEfficiency`: Eficiência do fluxo em porcentagem
- `productionFlow`: Array com informações do fluxo de produção por etapa, incluindo:
  - `etapa`: Nome da etapa
  - `entrada`: Quantidade de entrada
  - `saida`: Quantidade de saída
  - `estoque`: Quantidade em estoque (WIP)
- `leadTimeData`: Array com dados de lead time por dia
- `wipData`: Array com dados de WIP ao longo do dia
- `bottleneckAnalysis`: Array com análise de gargalos por processo
- `bottlenecks`: Array com informações adicionais de gargalos

## Testando o endpoint para /parametros

Para testar o endpoint que fornece dados para a página /parametros, utilize o seguinte endpoint:

```
GET http://localhost:4000/api/parameters
```

Este endpoint requer um token de autenticação JWT no header `Authorization` e permissões de administrador ou gestor:

```
Authorization: Bearer <seu-token-aqui>
```

### Exemplo de requisição:

```bash
curl http://localhost:4000/api/parameters \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```

### Estrutura da resposta:

O endpoint retorna um objeto JSON contendo:
- `machineParams`: Array com parâmetros das máquinas, incluindo:
  - `id`: ID do parâmetro
  - `machineId`: ID da máquina
  - `cicloIdeal`: Tempo de ciclo ideal em segundos
  - `velocidade`: Velocidade ideal em unidades por hora
  - `oeeMinimo`: OEE mínimo esperado em porcentagem
- `stopReasons`: Array com motivos de parada, incluindo:
  - `id`: ID do motivo
  - `codigo`: Código do motivo de parada
  - `descricao`: Descrição do motivo
  - `tipo`: Tipo do motivo (Planejada ou Não Planejada)
- `oeeTargets`: Objeto com metas de OEE:
  - `oeeGeral`: Meta geral de OEE em porcentagem
  - `disponibilidade`: Meta de disponibilidade em porcentagem
  - `performance`: Meta de performance em porcentagem
  - `qualidade`: Meta de qualidade em porcentagem
- `productionTargets`: Objeto com metas de produção:
  - `producaoDiaria`: Meta de produção diária
  - `producaoTurno`: Meta de produção por turno
  - `leadTime`: Lead time máximo em minutos
  - `wipMaximo`: WIP máximo em unidades
- `systemSettings`: Objeto com configurações do sistema:
  - `turnoDuracao`: Duração do turno em horas
  - `turnosDia`: Número de turnos por dia
  - `intervalo`: Intervalo em minutos
  - `atualizacao`: Intervalo de atualização em segundos

### Atualizando parâmetros:

Para atualizar parâmetros, utilize o método PUT:

```
PUT http://localhost:4000/api/parameters
```

### Exemplo de requisição PUT:

```bash
curl -X PUT http://localhost:4000/api/parameters \
  -H "Authorization: Bearer seu_token_jwt_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "section": "oeeTargets",
    "data": {
      "oeeGeral": 90,
      "disponibilidade": 95
    }
  }'
```

### Restaurando parâmetros padrão:

Para restaurar os valores padrão:

```
POST http://localhost:4000/api/parameters/reset
```

```bash
curl -X POST http://localhost:4000/api/parameters/reset \
  -H "Authorization: Bearer seu_token_jwt_aqui"
```