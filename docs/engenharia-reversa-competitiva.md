# Engenharia reversa competitiva — Model3DEng

Data da análise: 2026-07-28
Escopo: produto, UX, proposta de valor, modelo comercial e lacunas observáveis em fontes públicas.
Método: clean-room. Nenhum código, marca, ativo visual proprietário ou mecanismo interno de concorrente é copiado.

## Resumo executivo

O Model3DEng não deve tentar substituir todo o CAD paramétrico, PLM, CAM e CAE de uma empresa grande. Isso exigiria anos de kernel geométrico, certificações, integrações e suporte.

A oportunidade mais defensável é ser a camada de decisão e entrega que fica acima ou ao lado dessas ferramentas:

1. brief técnico estruturado;
2. geração paramétrica inicial;
3. validação explicável e orientada a risco;
4. comparação de revisões e cenários;
5. exportação governada para STEP/STL/IFC/GLB;
6. pacote de decisão para engenharia, fabricação e cliente.

A tese de preço é cobrar muito menos que um assento CAD profissional e vender velocidade de decisão, não uma licença de CAD genérica.

## Concorrentes observados

### Onshape — referência cloud-native
Fonte pública: https://www.onshape.com/en/pricing

- Free: US$0, limitado a uso não comercial e documentos públicos.
- Standard: US$1.500 por usuário/ano.
- Professional: US$2.500 por usuário/ano.
- Enterprise: preço customizado.
- Forças observáveis: colaboração no navegador, armazenamento privado, versionamento, PDM, release management e integrações.
- Fraqueza/oportunidade: o cliente ainda compra uma plataforma CAD extensa e cara para resolver decisões e handoffs específicos.
- O que adaptar: colaboração, versionamento, comentários e release gate.
- O que não copiar: nomenclatura, layout ou textos proprietários.

### Shapr3D — referência de acessibilidade e entrada visual
Fonte pública: https://www.shapr3d.com/pricing

- Free: dois projetos e exportações/recursos limitados.
- Pro: página pública mostra US$299 por assento editor, faturado anualmente.
- Enterprise: preço sob consulta, com controles de colaboração, acesso e armazenamento.
- Forças observáveis: promessa “pro CAD sem curva de aprendizado”, fluxo visual, suporte a múltiplas plataformas e revisão 3D.
- Fraqueza/oportunidade: excelente para modelagem e comunicação visual, mas não é uma camada completa de governança de decisão, risco e custo de entrega.
- O que adaptar: entrada simples, visualização imediata, exportação compreensível e experiência para não especialistas.

### FreeCAD — referência de custo e soberania
Fonte pública: https://www.freecad.org/

- Software open source, sem taxa de licença e sem vendor lock-in.
- Forças observáveis: custo zero, extensibilidade, modelo paramétrico e controle do usuário.
- Fraquezas/oportunidades: curva de aprendizado, fragmentação de workbenches, colaboração e governança menos polidas para um comprador empresarial.
- O que adaptar: transparência de custo, exportação aberta e ausência de lock-in.
- O que superar: onboarding, clareza de próximo passo, revisão, histórico, linguagem comercial e suporte.

### Autodesk Fusion / SOLIDWORKS / Siemens NX / CATIA

Acessos automatizados a algumas páginas de preço foram bloqueados ou expiraram; não tratar preços não verificados como fato. A posição de mercado é clara, porém: suites desktop/cloud completas, grande profundidade de modelagem, manufatura, simulação, dados e ecossistema, normalmente com venda por assinatura, contrato ou revenda.

- Forças: profundidade, compatibilidade industrial, ecossistema, treinamento e confiança institucional.
- Fraquezas/oportunidades: complexidade, custo total de propriedade, tempo de onboarding, excesso de funcionalidades para pilotos pequenos e handoff entre áreas.
- Estratégia: integrar e complementar; não declarar substituição integral.

## Mapa de lacunas

| Necessidade do comprador | Suites CAD | Model3DEng hoje | Oportunidade prioritária |
|---|---|---|---|
| Criar modelo detalhado | Muito forte | Biblioteca paramétrica inicial | Expandir famílias de peças mais vendidas |
| Transformar briefing em restrições | Fragmentado | Intake + briefing | Fazer isso virar a entrada principal |
| Comparar revisões e cenários | Existe, mas é espalhado | Já existe em dados e UI | Tornar a decisão visual e exportável |
| Explicar risco para não especialista | Fraco/assistemático | Riscos e checks já modelados | Gerar resumo técnico em linguagem do comprador |
| Governar exportação | Depende de PDM/PLM | Export readiness já existe | Fazer o export pack ser o produto central |
| Colaboração assíncrona | Forte em cloud leaders | Parcial | Comentários, aprovação e links de revisão |
| Preço para piloto pequeno | Alto custo ou consultoria | Oferta própria | Entrar por projeto/workspace, não por assento CAD |
| Soberania de dados | Varia por fornecedor | Local-first possível | Export aberto, retenção clara e opção self-hosted futura |

## North-star do produto

“Em uma sessão, um engenheiro transforma um pedido mal definido em uma revisão técnica comparável e um pacote de exportação com gate humano.”

O indicador principal não é número de agentes. É:

- tempo do brief até primeira revisão;
- número de revisões até aprovação;
- percentual de exportações sem retrabalho;
- custo por decisão aprovada;
- valor do piloto convertido em workspace recorrente.

## O que torna o Model3DEng mais competitivo

1. Menos superfície: resolver o caminho crítico, não todo o universo CAD.
2. Explicabilidade: cada saída mostra hipótese, risco, check e dono.
3. Comparação: antes/depois e cenários ficam no mesmo lugar.
4. Entrega: STEP/STL/IFC/GLB e decisão memo são tratados como um pacote.
5. Preço: workspace e uso de validação, não licença de CAD por usuário.
6. Integração: importar/exportar para ferramentas existentes em vez de exigir migração.
7. Open posture: formatos abertos, dados exportáveis e retenção transparente.

## Backlog por ROI

### P0 — fechar em 1–2 semanas

- Renomear o fluxo principal para Brief → Modelo → Checks → Revisão → Exportar.
- Adicionar uma tela de “próxima ação” como primeiro bloco do projeto.
- Transformar cada warning em tarefa com responsável e ação sugerida.
- Criar pacote de revisão com snapshot, métricas, riscos e arquivos.
- Instrumentar tempo de brief, primeira revisão, aprovação e exportação.

### P1 — fechar em 3–6 semanas

- Biblioteca de famílias: bracket, plate, enclosure, frame, cabinet, riser e skid.
- Comentários por revisão e aprovação humana.
- Link de revisão read-only para cliente/fabricante.
- Importação de STEP/STL/GLB e comparação de versão.
- Exportação de relatório PDF/Markdown com premissas e limitações.

### P2 — fechar em 6–12 semanas

- Conectores para FreeCAD, Onshape e Fusion via arquivos/API autorizada.
- Controle de permissões por workspace.
- Templates por setor: mecânico, BIM, MEP, civil e planta industrial.
- Métrica de custo e tempo de fabricação por cenário.
- Deploy local/self-hosted para clientes regulados.

## Riscos

- Não vender “simulação certificada” sem solver, validação e responsabilidade técnica adequados.
- Não apresentar valores mock como medição real de engenharia.
- Não prometer compatibilidade universal de CAD antes de testar arquivos reais.
- Não usar “mais barato” sem definir o que está sendo comparado: licença, assento, projeto ou custo total.
- Fazer revisão humana obrigatória antes de qualquer decisão estrutural ou liberação de fabricação.
