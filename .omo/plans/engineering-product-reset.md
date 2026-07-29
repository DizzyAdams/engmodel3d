# Engineering Product Reset Plan

## Objetivo
Transformar o projeto em um produto de engenharia realmente vendável, com uma experiência coerente, funcional e claramente orientada a fluxo de trabalho profissional. O foco não é “encher de telas”, e sim entregar três coisas que um usuário técnico entende de primeira: captar o briefing, editar o modelo com segurança e exportar um pacote que faça sentido.

## Diagnóstico
Hoje o projeto já tem partes úteis, mas a experiência ainda sofre de três problemas:

1. A narrativa visual oscila entre landing page comercial e cockpit técnico sem uma ponte clara.
2. Existe funcionalidade real, porém ela não está organizada como fluxo único de trabalho.
3. Ainda falta um caminho de exportação “de verdade” para formatos finais de engenharia, ou ao menos uma limitação explícita e bem tratada.

## Princípios de corte

- Menos superfícies, mais profundidade.
- Cada tela precisa responder a uma ação do usuário.
- Nada de cards decorativos sem impacto.
- Se algo for placeholder, deve ser tratado como placeholder de forma honesta.
- O sistema deve parecer um produto para engenheiros, não uma demo genérica de IA.

## Escopo Prioritário

### 1. Home como entrada de trabalho
Converter a home em um ponto de entrada real:

- briefing guiado
- estimativa inicial de escopo
- CTA claro para workbench e intake
- prova de valor com export preview

Critério de aceitação:

- o usuário entende em menos de 10 segundos o que faz
- o formulário gera saída útil
- não existe texto que pareça marketing vazio

### 2. Project Workbench como núcleo
Consolidar a página do projeto como ambiente principal:

- viewer 3D real
- parâmetros editáveis com impacto visível
- métricas derivadas em tempo real
- estados de validação
- download de snapshot e manifesto

Critério de aceitação:

- alterar parâmetros muda a cena ou métricas imediatamente
- a página não quebra em WebGL indisponível
- exportar gera artefatos concretos

### 3. Exportação séria
Definir a fronteira entre o que o browser faz e o que o backend precisa fazer:

- snapshot JSON canônico
- manifest com descrição de arquivos
- placeholders apenas onde a geometria real ainda não exista
- caminho preparado para STEP/STL/GLB reais

Critério de aceitação:

- o usuário recebe um pacote exportável
- a limitação técnica é explícita
- o formato de expansão futura já está previsto

### 4. Linguagem e design
Reduzir o aspecto “AI slop” com direção visual única:

- menos blocos repetidos
- mais hierarquia e ritmo
- tipografia consistente
- CTAs úteis e específicos
- painel técnico com densidade controlada

Critério de aceitação:

- a página parece um console técnico
- não há seções redundantes
- a navegação é curta e óbvia

## Execução em Fases

### Fase A: Consolidação
- remover duplicações
- manter apenas um caminho principal para briefing e workbench
- garantir que build e deploy passem sem ruído

### Fase B: Produto
- fortalecer métricas de engenharia
- integrar export package à UI
- tornar a validação mais legível

### Fase C: Evolução
- backend de geometria real
- exportadores STEP/STL/GLB
- inspeção de propriedades e marcações
- comparação de revisões

## Definição de pronto
O projeto só pode ser considerado “bom” quando:

- a home capta demanda real
- a página de projeto permite edição útil
- a exportação entrega algo que o cliente consegue usar
- o visual transmite precisão e controle
- o repositório fica limpo e deployável

## Próximo passo
Executar a consolidação do fluxo principal e, em seguida, escolher uma direção visual mais forte para o produto inteiro.
