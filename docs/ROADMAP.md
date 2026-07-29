# Roadmap

## Norte do Produto

Model3DEng deve evoluir de uma bancada de geracao 3D assistida por IA para uma plataforma de construcao e comercializacao de modelos 3D, BIM/IFC, tours, aprovacao e vendas.

O diferencial nao e listar arquivos 3D soltos. O produto deve gerar ativos construtivos confiaveis: casas, predios, comerciais, interiores e fachadas com parametros editaveis, viewer tecnico, historico de versoes, evidencias de validacao, exportacao profissional, pacotes de aprovacao e experiencias de venda navegaveis.

## Principios

- Validacao antes de entrega: nenhum pacote comercial, BIM/IFC ou de aprovacao deve sair sem schema, preview 3D, metadados, escala, unidades e checks minimos de geometria/exportacao.
- Construcao como produto operacional: briefing, geracao, revisao, tour, aprovacao, vendas, suporte e auditoria fazem parte do core.
- Agentes como alavanca, nao como substituto de responsabilidade tecnica: agentes ajudam briefing, alternativas, interiores, BIM, validacao, suporte e vendas, com checkpoints humanos em entregas criticas.
- Visualizacao 3D como prova de qualidade: o viewer precisa permitir inspecao tecnica, comercial e espacial antes de aprovar, vender ou exportar.
- Localizacao desde a arquitetura: normas, moeda, idioma, areas, unidades, materiais, impostos e termos comerciais variam por mercado.

## Fase 0: Fundacao Confiavel

Objetivo: estabilizar a plataforma atual como workspace imobiliario tecnico e auditavel.

- Consolidar projetos, terrenos, modelos, unidades, versoes, tours, approval packs e export plans como entidades de produto.
- Definir taxonomia inicial: casas, predios residenciais, comerciais, interiores, areas comuns, fachadas e BIM/IFC.
- Padronizar formatos suportados: GLB/GLTF para web/tour, IFC para BIM, imagens para vendas, PDF/relatorios para aprovacao e fonte parametrica quando aplicavel.
- Criar contrato minimo de entrega: tipo de imovel, objetivo, escala, unidades, area, pavimentos, materiais, parametros, screenshots, preview 3D, exportacoes e relatorio de validacao.
- Instrumentar eventos operacionais: briefing criado, terreno definido, modelo gerado, validacao falhou, tour criado, exportacao pronta, versao aprovada e agente bloqueado.

Criterio de saida: um projeto imobiliario interno consegue passar por intake, geracao/registro, validacao, viewer, versionamento e pacote de exportacao reproduzivel.

## Fase 1: Projetos Imobiliarios Guiados

Objetivo: permitir criar e revisar os primeiros ativos imobiliarios de ponta a ponta.

- Criar fluxo de projeto por categoria: casa, predio, comercial, interior e fachada.
- Implementar briefing estruturado com terreno, areas, pavimentos, ambientes, estilo, materiais, publico e objetivo final.
- Entregar viewer 3D com orbit, medidas, pavimentos, materiais, screenshots e metadados tecnicos.
- Gerar pacotes iniciais: preview GLB, imagens, ficha de projeto e relatorio de validacao.
- Implantar revisao manual para versoes que serao usadas em venda, cliente ou aprovacao.

Criterio de saida: usuarios conseguem criar, inspecionar, ajustar e exportar um modelo imobiliario validado; operadores conseguem revisar e bloquear entregas inadequadas.

## Fase 2: BIM/IFC e Pacotes de Aprovacao

Objetivo: conectar a geracao visual com workflows tecnicos e auditoria de aprovacao.

- Importar e exportar IFC com unidades, pavimentos, elementos, materiais e propriedades essenciais.
- Criar relatorios de consistencia: escala, area, bounding box, niveis, classificacao e arquivos entregues.
- Adicionar checklist de aprovacao por projeto, com anotacoes, responsaveis e status.
- Comparar versoes visuais e tecnicas para identificar alteracoes entre briefing, modelo e exportacao.
- Preservar trilha de auditoria: autor, data, prompt, parametros, arquivos, validacoes e decisoes.

Criterio de saida: equipes conseguem gerar um pacote BIM/IFC ou de aprovacao com evidencias suficientes para revisao tecnica humana.

## Fase 3: Tours e Vendas

Objetivo: transformar modelos em experiencias comerciais compartilhaveis.

- Criar tours web por empreendimento, unidade, ambiente, area comum e lote.
- Adicionar cenas, cameras, hotspots, variacoes de acabamento e links compartilhaveis.
- Gerar pacote de venda com imagens, tour, ficha do imovel, configuracoes e arquivos web.
- Modelar disponibilidade comercial para unidades, lotes, salas ou casas.
- Capturar analytics de interesse: visualizacoes, cenas abertas, configuracoes escolhidas e compartilhamentos.

Criterio de saida: uma equipe comercial consegue apresentar um imovel ou empreendimento em tour 3D e compartilhar um pacote de venda versionado.

## Fase 4: Agentes Imobiliarios

Objetivo: reduzir tempo de briefing, variacao, revisao e suporte sem remover controle humano.

- Agent skill catalog: intake imobiliario, estudo de massa, interiores, materiais, BIM/IFC, validacao urbana, vendas, suporte e localizacao.
- Fluxo "gerar alternativas": agentes produzem opcoes de volumetria, fachada, layout, interiores ou implantacao.
- Agente BIM/IFC: checa classificacao, propriedades, unidades e consistencia entre modelo visual e tecnico.
- Agente de aprovacao: organiza checklist, riscos, evidencias e pendencias para revisao humana.
- Agente de vendas: cria cenas, textos tecnicos, variacoes de acabamento e respostas para duvidas comerciais.

Criterio de saida: pelo menos um fluxo permite gerar alternativas, revisar no viewer, validar e exportar um pacote derivado com checkpoint humano.

## Fase 5: Visualizacao 3D Profissional

Objetivo: fazer o viewer sustentar decisao tecnica, aprovacao e venda.

- Viewer WebGL com orbit, ortografica, corte/secoes, medidas, pavimentos, layers, materiais, unidades e inspecao de area.
- Comparacao de versoes e deltas visuais para alternativas, revisoes de cliente e aprovacao.
- Anotacoes e issues no espaco 3D, vinculadas a validacao, suporte e revisao.
- Modo tour com cameras, hotspots, cenas por ambiente e configurador de acabamento.
- Pipeline de assets para gerar GLB otimizado, thumbnails, screenshots e fallback estatico.

Criterio de saida: um usuario consegue avaliar escala, layout, pavimentos, materiais, variacoes e riscos antes de aprovar ou vender.

## Fase 6: Monetizacao

Objetivo: capturar valor por projeto, equipe e servicos especializados.

- Planos por usuario, equipe, escritorio, incorporadora e volume de projetos.
- Creditos para geracao, alternativas, tours, validacao BIM/IFC, render e exportacoes premium.
- Add-ons: revisao humana, pacote de aprovacao, interiores decorados, configurador de vendas e suporte prioritario.
- Templates pagos para tipologias recorrentes: casas, predios, lojas, salas, fachadas e areas comuns.
- Pricing assistido por dados: uso por projeto, tempo de geracao, custo de inferencia, conversao comercial e retrabalho.

Criterio de saida: receita vem de planos, creditos e servicos premium, com margem monitoravel por tipo de projeto.

## Fase 7: Compliance e Operacao

Objetivo: operar projetos imobiliarios com rastreabilidade, suporte e controles regionais.

- Politicas para uso ilustrativo, responsabilidade tecnica, direitos autorais, marcas, dados de clientes e arquivos enviados.
- Backoffice com filas de revisao, suporte, aprovacao, validacao premium, projetos sinalizados e saude de agentes.
- SLAs por fluxo: geracao, tour, BIM/IFC, aprovacao, suporte, revisao humana e exportacao.
- Observabilidade: projetos criados, taxa de conclusao, tempo ate primeira versao, falhas de exportacao, uso de tours e custo de inferencia.
- Expansao regional baseada em normas, idioma, moeda, demanda imobiliaria e capacidade de suporte tecnico.

Criterio de saida: a plataforma consegue operar multiplos mercados, idiomas, moedas, clientes e categorias imobiliarias com metricas de qualidade.

## Sequencia Recomendada de Nicho

1. Casas unifamiliares: briefing simples, alto apelo visual, parametros claros e entrega rapida.
2. Interiores e unidade decorada: valor direto para vendas, boa repeticao e baixo risco regulatorio.
3. Comerciais pequenos: lojas, salas e fachadas com demanda de locacao e apresentacao.
4. Predios residenciais: maior ticket, exige tipologias, pavimentos, areas comuns e aprovacao mais forte.
6. BIM/IFC avancado: essencial para equipes tecnicas, porem exige qualidade de dados e responsabilidade maior.

## Metricas Norte

- Projetos: projetos criados, taxa de primeira versao concluida, tempo ate preview e taxa de exportacao.
- Qualidade: falhas de geometria, falhas IFC, tickets por projeto, retrabalho e aprovacoes bloqueadas.
- Vendas: tours gerados, links compartilhados, cenas visualizadas, configuracoes escolhidas e leads atribuiveis.
- Agentes: alternativas concluidas, custo por job, falhas de validacao e handoffs humanos.
- Operacao: backlog de revisao, SLA de suporte, tempo de pacote premium e custo de inferencia.

## Decisoes em Aberto

- Primeiro mercado imobiliario alvo e padrao de unidades/areas no lancamento.
- Nivel minimo de validacao para chamar um pacote de "aprovacao" ou "BIM/IFC".
- Quando exigir revisao humana obrigatoria antes de exportar para cliente, obra ou orgao publico.
- Profundidade inicial de BIM: malha classificada, IFC basico ou propriedades completas por elemento.
- Limites de responsabilidade para modelos usados em venda, aprovacao, construcao ou engenharia critica.
