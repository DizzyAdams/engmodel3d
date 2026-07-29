# Plataforma 3D para Construcao e Comercializacao

## Foco

Model3DEng e uma plataforma para construtoras, incorporadoras, arquitetos, corretores e imobiliarias gerarem, validarem, visualizarem e apresentarem modelos 3D de empreendimentos e ambientes.

O objetivo nao e apenas criar imagens bonitas. A plataforma deve produzir ativos construtivos utilizaveis: casas, predios, empreendimentos comerciais, interiores, modelos BIM/IFC, tours comerciais, pacotes de aprovacao e variacoes por unidade, acabamento e fase da obra.

## Publicos

- Incorporadoras: criam estudos de massa, maquetes digitais, plantas humanizadas, tours e material de venda.
- Construtoras: validam compatibilidade, fases, quantitativos preliminares e comunicacao com cliente.
- Arquitetos e studios 3D: aceleram proposta, iteracao, render, BIM/IFC e entrega ao cliente.
- Corretores e imobiliarias: apresentam unidades, acabamentos, vistas, tours e configuracoes.
- Equipes de aprovacao: revisam recuos, areas, volumetria, normas locais e evidencias tecnicas.

## Casos de Uso Principais

### Casas

- Geracao a partir de briefing, planta baixa, terreno, referencias e estilo arquitetonico.
- Variacoes por metragem, numero de quartos, garagem, varanda, piscina, telhado e acabamento.
- Entrega em GLB/GLTF para web, imagens, tour, plantas derivadas e IFC quando houver escopo BIM.

### Predios Residenciais

- Estudos de massa por terreno, coeficiente, gabarito, recuos, pavimentos e tipologias.
- Modelos por torre, pavimento tipo, areas comuns, fachada, unidade decorada e implantacao.
- Comparacao de alternativas para viabilidade, aprovacao e material comercial.

### Comerciais

- Lojas, salas, galpoes, lajes corporativas, fachadas comerciais e fit-out interno.
- Configuracao por uso, layout, vitrine, circulacao, areas tecnicas e acessibilidade.
- Pacotes para locacao, venda, aprovacao de cliente e apresentacao institucional.

### Interiores

- Ambientes mobiliados com configuracao de acabamentos, iluminacao, marcenaria e decoracao.
- Unidade decorada virtual para vendas, com presets por padrao economico, medio e alto.
- Exportacao para tour web e imagens por ambiente.

### Fachadas e areas comuns

- Geracao de fachadas, portarias, areas comuns, paisagismo e cenas de apresentacao.
- Variacoes de materiais, iluminacao, mobiliario e identidade visual da construtora.
- Visualizacao 3D navegavel para vendas, cliente e revisao de projeto.

### BIM/IFC

- Suporte a IFC para troca com workflows BIM e validacao tecnica.
- Classificacao de elementos, unidades, niveis, pavimentos, materiais e propriedades.
- Relatorios de consistencia para evitar que o modelo 3D comercial se descole do modelo tecnico.

### Tours, Aprovacao e Vendas

- Tours web navegaveis por empreendimento, unidade, ambiente e area comum.
- Modo aprovacao com anotacoes, checklist, comparacao de versoes e evidencias.
- Modo vendas com configurador de unidade, acabamento, disponibilidade, imagens e link compartilhavel.

## Capacidades do Produto

| Area | Capacidade Inicial | Evolucao |
| --- | --- | --- |
| Briefing | Texto, medidas, tipo de imovel, terreno e referencias | Upload de planta, memorial, imagens e regras urbanisticas |
| Geracao | Modelo 3D parametrico por categoria imobiliaria | Multiplas alternativas com custo, prazo e risco |
| Viewer | Orbit, medidas, corte, pavimentos e materiais | Tour guiado, anotacoes 3D, comparacao e modo vendas |
| BIM/IFC | Import/export IFC e metadados essenciais | Validacao por disciplina, compatibilizacao e quantitativos |
| Aprovacao | Checklist, comentarios e versoes | Regras por municipio, evidencias e trilha de auditoria |
| Vendas | Link de apresentacao, imagens e configuracoes | CRM, disponibilidade por unidade, propostas e analytics |
| Operacao | Projetos, versoes, assets e exportacoes | Portais por cliente, permissao por equipe e SLAs |

## Entidades de Produto

- Projeto: empreendimento, casa, predio, comercio, interior, fachada ou area comum.
- Terreno: dimensoes, topografia simplificada, orientacao, recuos, acessos e restricoes.
- Modelo: geometria, parametros, categoria, escala, unidades, materiais e fonte.
- Unidade: apartamento, casa, loja, sala, lote ou ambiente vendavel.
- Versao: snapshot auditavel de briefing, modelo, exportacoes, aprovacoes e assets.
- Tour: roteiro navegavel, cenas, cameras, hotspots e configuracoes.
- Pacote de venda: imagens, GLB, tour, ficha, plantas derivadas e links.
- Pacote de aprovacao: IFC, relatorios, evidencias, anotacoes e checklist.

## Fluxo Principal

1. Usuario cria um projeto imobiliario e informa tipo, objetivo, terreno, medidas e publico.
2. Plataforma normaliza briefing, identifica restricoes e sugere parametros editaveis.
3. Motor de geracao cria uma primeira versao 3D com materiais, pavimentos e cenas.
4. Validadores checam escala, unidades, bounding box, pavimentos, elementos obrigatorios e exportacao.
5. Usuario revisa no viewer, faz anotacoes, ajusta parametros e compara alternativas.
6. Plataforma exporta pacote para venda, aprovacao, BIM/IFC, tour ou apresentacao.
7. Historico preserva decisao, autor, versao, arquivos e relatorios.

## Diferenciais

- Imobiliario como dominio nativo, nao como categoria lateral de marketplace 3D.
- Parametros orientados a produto imobiliario: area, pavimentos, unidades, fachadas, ambientes, acabamentos e lote.
- Viewer focado em decisao: medidas, cortes, pavimentos, materiais, anotacoes, tour e disponibilidade.
- Ponte entre venda e tecnica: GLB/tour para comercial, IFC/relatorios para projeto e aprovacao.
- Agentes especializados para briefing, alternativas, interiores, BIM, compliance urbano, vendas e suporte.

## Limites e Cuidados

- Modelos gerados nao substituem responsabilidade tecnica de arquiteto, engenheiro ou profissional habilitado.
- Regras urbanisticas variam por municipio e devem ser configuradas, versionadas e revisadas.
- Pacotes comerciais devem indicar quando imagens, vistas, mobiliario e acabamentos sao ilustrativos.
- BIM/IFC precisa preservar unidades, classificacao e propriedades para nao virar apenas malha visual.
- Aprovacao formal exige trilha de auditoria, fonte dos dados e validacao humana quando houver impacto legal.
