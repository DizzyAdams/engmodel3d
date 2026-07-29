# Refatoração total — status de execução

Data: 2026-07-28

## Escopo autorizado

Refatoração integral do Model3DEng para uma experiência de engenharia 3D premium, surreal e funcional, preservando honestidade técnica, formatos abertos e custo operacional baixo.

## Limites reais

- O runtime atual permite até 3 subagentes simultâneos por onda. A meta de 14 agentes será executada em ondas paralelas.
- A meta de 2.000 sprints foi transformada em 20 frentes com 100 micro-sprints rastreáveis cada.
- Cada micro-sprint precisa de evidência no código/runtime; não haverá 2.000 commits artificiais.
- Busca web automatizada está bloqueada nesta sessão por ausência de créditos/API Firecrawl. Referências externas serão classificadas como verificadas localmente, conhecidas e pendentes de confirmação.

## Fotografia inicial verificada

- 7 rotas públicas em `app/`.
- 11 componentes principais em `src/ui/`.
- `app/globals.css`: 1.958 linhas e cerca de 42 KB.
- 26 referências a `mock` na superfície de aplicação.
- 17 referências a `placeholder`.
- 66 ocorrências de `href` para validação.
- Dois renderers com manutenção paralela: React/App Router e `src/runtime/site-renderer.ts`.
- Existe componente `src/ui/engineering-workbench.tsx` com copy de placeholders de exportação; sua montagem precisa ser confirmada ou removida.
- O workbench WebGL atual já tem estados loading/ready/unsupported/error e downloads STL/GLB/JSON em uma implementação separada.

## Ordem de refatoração

1. Verdade funcional: remover dead paths, placeholders e divergência React/static.
2. Design system: consolidar tokens, tipografia, superfícies, densidade, motion e estados.
3. Shell e wayfinding: tornar a sequência Brief → Model → Checks → Review → Export inevitável.
4. Workbench: consolidar viewer, controles, métricas, validação e export.
5. Governança: revisão, comparação, aprovação e pacote de entrega.
6. Comercial: pricing e CTA conectados ao intake real.
7. Performance/a11y: WebGL fallback, reduced motion, teclado, foco, mobile e bundle.
8. Integrações open source: formatos e conectores somente após contratos locais estabilizados.

## Critério de surrealismo

Surreal não significa neon aleatório ou decoração sem função. A direção será:

- cockpit editorial de engenharia;
- campo espacial escuro com linhas técnicas e sinais de instrumentação;
- uma assinatura visual 3D por tela, não uma coleção de efeitos;
- assimetria e ritmo de revista técnica premium;
- motion usado para explicar estado e transição;
- nenhuma promessa de solver/certificação que o produto não execute.
