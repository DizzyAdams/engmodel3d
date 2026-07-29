# Platform Feature Matrix

Esta matriz traduz o roadmap em capacidades de produto. Ela deve orientar planejamento, discovery e priorizacao sem misturar escopo de marketplace, agentes, visualizacao, monetizacao, trust/safety e operacao global. Referencias open source e padroes tecnicos relacionados ficam em `docs/OPEN_SOURCE_FEATURE_REFERENCES.md`.

## Marketplace Core

| Capacidade | MVP | Evolucao | Sinal de Pronto |
| --- | --- | --- | --- |
| Catalogo | Listagem por categoria, formato e tags | Busca semantica, filtros por industria, software e licenca | Comprador encontra modelos sem suporte humano |
| Pagina de produto | Viewer, imagens, formatos, licenca, unidades e metadados | Comparacao de versoes, Q&A, bundles, changelog e relatorio tecnico | Compra feita com entendimento de uso e risco |
| Compra e entrega | Checkout, recibo, entitlement e download versionado | Assinatura, creditos, invoice B2B e download por equipe | Pacote comprado e auditavel por versao |
| Seller portal | Perfil, upload, status de revisao e vendas | Analytics, recomendacoes e gestao de portfolio | Seller publica sem depender de operador |
| Reviews | Avaliacao pos-download e report issue | Reviews por formato, uso, compatibilidade e versao | Feedback melhora ranking e qualidade |

## Agentes e Skills

| Agente/Skill | Funcao | Controle Humano | Dependencias |
| --- | --- | --- | --- |
| Intake | Normaliza briefing, categoria, medidas e restricoes | Obrigatorio em adaptacoes pagas | Taxonomia, schemas, historico de projeto |
| CAD | Gera ou modifica fonte parametrica | Obrigatorio antes de publicar derivativo | CadQuery, OpenSCAD, export pipeline |
| Validation | Roda checks de schema, geometria, unidades e exportacao | Bloqueia publicacao em erro critico | Compliance engine, viewer contract |
| Materials | Sugere material, tolerancia e processo | Revisao em categorias tecnicas | Regras DFM, categorias e custo |
| Cost | Estima esforco, preco e margem | Revisao em servicos customizados | Pricing, dados de vendas, formatos |
| Compliance | Verifica licenca, IP, categoria proibida e audit trail | Escala risco alto para operador | Politicas, seller identity, logs |
| Support | Diagnostica problemas de uso e arquivo | Escala refund, disputa e risco legal | Pedidos, downloads, validacoes |
| Localization | Adapta texto, moeda, termos e suporte | Revisao em regioes novas | Catalogo, regras fiscais, CMS |

## Visualizacao 3D

| Area | Essencial | Avancado | Risco que reduz |
| --- | --- | --- | --- |
| Preview seguro | GLB otimizado, thumbnails, screenshots e manifesto de preview | Watermark 3D, preview parcial e LOD | Vazamento de fonte premium |
| Inspecao | Orbit, zoom, unidades, escala e bounding box | Medicao, secoes, layers, picking e exploded view | Compra de modelo incompativel |
| Variacoes | Parametros visiveis e presets | Comparacao visual de derivativos | Falhas em adaptacoes por agente |
| Issues | Erros de validacao em painel | Anotacoes presas a regioes do modelo e relatorio exportavel | Suporte sem contexto tecnico |
| Fallback | Imagens renderizadas e metadados | Pacote estatico por dispositivo/regiao | Perda de conversao sem WebGL |

## Monetizacao

| Modelo | Quando Usar | Requisitos | Metricas |
| --- | --- | --- | --- |
| Venda avulsa | Catalogo inicial e compras pontuais | Checkout, licenca, entitlement, entrega e refund | Conversao, AOV, refund rate |
| Bundles | Categorias com itens complementares | Curadoria, desconto e pagina de colecao | Attach rate, margem, sell-through |
| Assinatura | Usuarios recorrentes e equipes | Entitlements, limites e invoices | Retencao, ARPA, uso por assento |
| Creditos de agente | Adaptacao, validacao e conversao | Custo de inferencia e filas | Custo por job, taxa de sucesso |
| Enterprise | Times CAD/BIM e fabricantes | SSO, audit, SLA e suporte | ACV, churn, tickets por conta |
| Servicos premium | Certificacao, DFM/BIM e customizacao | Handoff humano e escopo fechado | Margem, SLA, retrabalho |

## Trust, Safety e Compliance

| Risco | Politica Minima | Automacao | Escalada |
| --- | --- | --- | --- |
| Violacao de IP | Declaracao de autoria, licenca e takedown | Similaridade de nomes, marcas, imagens e geometria quando viavel | Revisao legal/operador |
| Conteudo proibido | Lista por categoria e regiao | Classificacao no upload e reportes | Bloqueio preventivo |
| Arquivo malicioso | Sanitizacao, tipos permitidos e manifesto | Scan de pacote, hash e isolamento de processamento | Quarentena |
| Engenharia perigosa | Categorias restritas e disclaimers | Flags por uso, palavras e geometria | Revisao tecnica |
| Fraude seller | Verificacao progressiva | Risk score, chargebacks, payout holds | KYC/KYB |
| Produto enganoso | Evidencias, previews e formatos reais | Comparacao pacote vs pagina | Refund/disputa |

## Operacao Global

| Dominio | Capacidade Inicial | Escala Global |
| --- | --- | --- |
| Pagamentos | Checkout em moeda principal e payout basico | Multimoeda, impostos, invoices, VAT/GST e payout local |
| Localizacao | Interface e catalogo em idioma principal | Traducoes por mercado, termos regionais e suporte local |
| Suporte | Tickets por pedido e modelo | SLAs, roteamento por idioma, base de conhecimento e agente |
| Moderacao | Fila manual para publicacao e reports | Risk scoring, revisao por lote e auditoria regional |
| Analytics | GMV, conversao, refunds e vendas por seller | Cohorts, ranking quality-adjusted e margem por regiao |
| Infra | Storage de pacotes, previews e manifests | CDN global, object lifecycle, backups e data residency quando exigido |

## Priorizacao Recomendada

1. Marketplace core confiavel: catalogo, pagina de produto, compra, entrega versionada e revisao manual.
2. Validacao e viewer tecnico: contratos, checks, preview seguro e evidencias claras.
3. Seller portal controlado: upload guiado, score de qualidade, payouts e audit trail.
4. Agentes de adaptacao: primeiro para um nicho com parametros bem definidos.
5. Monetizacao avancada: bundles, creditos e assinatura apenas depois de demanda recorrente.
6. Operacao global: expandir paises conforme pagamentos, suporte e politicas estiverem prontos.
