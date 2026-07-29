# Open Source Feature References

Este documento organiza referencias estaveis para evoluir o marketplace global de modelos 3D sem confundir inspiracao de produto com copia de codigo. O objetivo e orientar arquitetura, discovery, validacao tecnica, revisao de licencas e priorizacao de features.

## Principios de Uso

1. Usar projetos open source como referencia de contratos, formatos, UX tecnica e pipelines, nao como fonte automatica de codigo.
2. Registrar licenca, versao, origem e mudancas locais antes de distribuir qualquer componente derivado.
3. Separar responsabilidades: viewer, validacao, conversao, geracao parametrica, commerce, entrega e compliance devem poder evoluir isoladamente.
4. Preferir formatos abertos e auditaveis para preview, entrega e validacao: glTF/GLB, OBJ, STL, STEP, IFC e pacotes com manifesto.
5. Tratar CAD/BIM como dominio tecnico: toda automacao precisa de fixtures reais, testes de import/export, tolerancias e fallback manual.

## Referencias por Dominio

| Dominio | Projetos de referencia | Padroes aproveitaveis | Aplicacao no marketplace |
| --- | --- | --- | --- |
| Modelagem e DCC | Blender | Pipeline de import/export, materiais, thumbnails, cenas, add-ons e convencoes de asset browser | Normalizacao de previews, geracao de renders, validacao visual e guias para sellers |
| CAD parametrico | FreeCAD, CadQuery, OpenCascade | Arvore parametrica, constraints, scripts reprodutiveis, kernels B-Rep, STEP e unidades | Adaptacoes pagas, geracao sob medida, revisao tecnica e derivativos versionados |
| BIM e AEC | IfcOpenShell, FreeCAD BIM | Leitura IFC, propriedades, classificacao, elementos espaciais, extracao de quantidades | Categorias AEC, filtros por disciplina, validacao de metadados e compradores enterprise |
| Visualizacao web | Three.js | Cena WebGL, camera, loaders, orbit controls, bounding boxes, picking e materiais PBR | Viewer de produto, inspecao basica, screenshots e preview seguro |
| glTF pipeline | glTF-Transform | Otimizacao, compressao, inspeccao, deduplicacao, transformacoes e validacao de assets | Conversao para GLB de preview, reducao de peso, LOD e checagem pre-publicacao |
| Malhas e geometria | MeshLab, Open3D | Reparos de malha, simplificacao, metricas, normals, point clouds e processamento geometrico | Score de qualidade, alertas de printabilidade, limpeza e diagnostico de arquivos |
| Commerce e dados | Supabase, Medusa, Stripe-like patterns | Auth, storage, RLS, pedidos, carrinho, entitlements, webhooks, invoices e payouts | Compra, entrega versionada, seller portal, assinaturas, creditos e operacao global |

## Features Inspiradas por Referencia

### Blender

- Pipeline de ingestao com renders padronizados por categoria, usando cameras, luzes e fundos consistentes para comparar modelos.
- Validacao de materiais: detectar texturas ausentes, nomes inconsistentes, UVs quebrados e arquivos externos nao empacotados.
- Add-on ou template futuro para seller exportar pacote com manifesto, thumbnail, licenca, unidades e formatos derivados.
- Convencao de colecoes/layers para separar geometria vendavel, preview, helpers, collision meshes e variantes.

### FreeCAD, OpenCascade e CadQuery

- Modelos parametricos devem declarar parametros editaveis, unidades, limites e efeitos esperados antes de virar feature comercial.
- Jobs de customizacao precisam gerar artefatos rastreaveis: fonte parametrica, export STEP/STL/GLB, diff de parametros e screenshots.
- Validacao de CAD deve diferenciar preview mesh de fonte tecnica. Um GLB bonito nao prova solidez, tolerancia ou manufaturabilidade.
- Derivativos pagos devem manter historico de input, versao do script, versao do kernel/worker e aprovacao humana quando houver risco tecnico.

### IfcOpenShell

- Para BIM, o marketplace deve indexar propriedades alem de tags: disciplina, tipo de elemento, classificacao, pavimento, material e quantidades.
- Viewer e pagina de produto devem expor se o arquivo tem estrutura IFC real ou apenas geometria exportada.
- Validacoes iniciais: schema IFC, entidades vazias, unidades, georreferenciamento, propriedades obrigatorias e tamanho do arquivo.
- Categorias AEC devem suportar compra por compatibilidade: Revit/IFC, disciplina, LOD/LOI e uso permitido.

### Three.js

- Viewer MVP: GLB otimizado, orbit/zoom/pan, bounding box, unidades, screenshot, estados de loading/erro e fallback de imagens.
- Inspecao avancada: picking, medicao simples, seccoes, exploded view, layers, anotacoes e comparacao de variacoes.
- Seguranca: preview com geometria reduzida ou watermark quando o modelo completo e premium.
- Contrato de viewer: todo produto publicado precisa declarar o que pode ser visualizado, baixado e validado.

### glTF-Transform

- Pipeline de preview deve aplicar regras previsiveis: deduplicacao, compressao, redimensionamento de texturas e geracao de relatorio.
- Cada transformacao precisa preservar um log para auditoria e suporte.
- Otimizacao nao pode substituir o arquivo original vendido; ela cria uma representacao para visualizacao e performance.
- Sinais de qualidade: tamanho antes/depois, numero de vertices, draw calls, texturas, materiais e extensoes usadas.

### MeshLab e Open3D

- Score geometrico pode considerar non-manifold edges, faces degeneradas, normals invertidas, escala suspeita e densidade excessiva.
- Para scan/point cloud, separar workflows de mesh, nuvem de pontos e CAD. Cada um tem metricas e expectativas diferentes.
- Reparos automaticos devem ser sugeridos ou aplicados em copia derivada, nunca silenciosamente no original do seller.
- Issues devem ser exibidas com severidade, localizacao quando possivel e acao recomendada.

### Supabase, Medusa e Padroes Stripe-like

- Separar catalogo, pedidos, pagamentos, entitlements, downloads e payouts para reduzir acoplamento operacional.
- Webhooks devem ser idempotentes e produzir audit trail: pagamento aprovado, entitlement criado, download liberado e seller creditado.
- Entrega precisa ser versionada: comprador acessa exatamente o pacote comprado, mesmo se o seller publicar nova versao.
- Operacao global exige impostos, moeda, recibos, invoices, chargebacks, KYC/KYB, payout holds e politicas regionais.
- Seller analytics devem focar decisao: conversao por produto, refunds, reports, downloads, receita liquida e qualidade tecnica.

## Matriz de Adoção

| Capacidade | Referencia primaria | Primeiro passo pragmatico | Risco principal |
| --- | --- | --- | --- |
| Viewer GLB | Three.js, glTF-Transform | Definir contrato de asset preview e estados de erro | Produto parecer valido sem ser tecnicamente utilizavel |
| Conversao e otimizacao | Blender, glTF-Transform | Criar worker com relatorio por arquivo | Perder fidelidade ou material no preview |
| Validacao de malha | MeshLab, Open3D | Rodar checks nao destrutivos e salvar issues | Reparar automaticamente e alterar autoria |
| CAD parametrico | CadQuery, FreeCAD, OpenCascade | Comecar com uma categoria e fixtures versionadas | Prometer tolerancia sem validacao suficiente |
| BIM/IFC | IfcOpenShell | Indexar metadados IFC para produtos AEC | Tratar IFC como mesh generica |
| Commerce global | Supabase, Medusa, Stripe-like patterns | Modelar pedidos, entitlements e downloads versionados | Misturar pagamento com entrega sem auditoria |

## Checklist para Nova Integracao

1. Identificar projeto, repositorio, licenca e versao.
2. Definir se sera referencia conceitual, dependencia direta, worker isolado ou ferramenta offline.
3. Criar fixture minima com arquivo real do dominio.
4. Registrar entrada, saida, logs, tolerancias e falhas esperadas.
5. Documentar impacto no produto: seller, comprador, operador, suporte e compliance.
6. Adicionar fallback manual ou visual quando a automacao falhar.
7. Revisar risco de licenca, IP, dados e seguranca antes de publicar.

## Gaps que Viram Roadmap

- Inventario formal de formatos suportados por categoria, com diferenca entre preview e entrega.
- Manifesto de pacote: arquivos, checksums, licenca, unidades, autoria, versao, dependencias e instrucoes.
- Quality score tecnico por tipo de asset: mesh, CAD, BIM, material, rig, scan e textura.
- Fila de revisao com evidencias: thumbnails, relatorio de validacao, diff de versao e flags de risco.
- Entitlements e downloads auditaveis para compra avulsa, bundle, assinatura, creditos e enterprise.
- Politica de derivados gerados por agentes: autoria, aprovacao, logs, limite de responsabilidade e refund.
