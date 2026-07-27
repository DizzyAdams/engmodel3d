# Arquitetura Inicial

## Visão

O sistema é uma plataforma de composição:

- entrada natural por texto, upload ou template
- geração de modelo por IA
- validação automática
- renderização web
- exportação profissional

## Camadas

### 1. Interface

- chat de briefing
- editor paramétrico
- viewer 3D
- painel de parâmetros
- revisão de erros

### 2. Orquestração de IA

- prompt versionado
- seleção de ferramentas
- roteamento por tarefa
- fallback para revisão humana

### 3. Geração Geométrica

- CadQuery para scripts paramétricos
- OpenSCAD para peças simples e reproduzíveis
- FreeCAD para reparo, desenho técnico e exportação

### 4. Validação

- checagem de schema
- checagem de dimensões
- detecção de falhas geométricas
- limites de manufatura
- consistência de assemblies

### 5. Visualização

- Three.js ou React Three Fiber
- carregamento de GLB/GLTF
- fallback estático quando WebGL falhar

### 6. Persistência

- projetos
- versões
- prompts
- parâmetros
- histórico de revisões

## Agentes Paralelos

### Agente de pesquisa

Responsável por mapear projetos open source, licenças e lacunas.

### Agente de domínio CAD

Responsável por regras geométricas, exportação e automação.

### Agente de UX

Responsável por fluxo de briefing, revisão e confiança do usuário.

### Agente de plataforma

Responsável por API, jobs assíncronos, filas e observabilidade.

### Agente de QA

Responsável por casos de teste, regressão geométrica e formatos.

## Primeira Stack Recomendada

- Frontend: Next.js
- 3D Web: React Three Fiber
- Backend: Node.js ou Python
- CAD automation: Python + CadQuery
- BIM: IfcOpenShell
- Worker jobs: fila assíncrona
- Storage: banco relacional + object storage

## Riscos

- IA gerar código válido porém geometria inválida
- custo de inferência alto
- latência de geração
- dependência de kernels externos
- complexidade de integração entre CAD, BIM e web

