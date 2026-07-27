# Model3DEng

Plataforma para modelagem 3D assistida por IA para engenharia, arquitetura e produtos configuráveis.

## Objetivo

Criar uma empresa e um software que combinem:

- geração paramétrica por IA
- modelagem CAD e BIM
- visualização 3D web em tempo real
- validação geométrica automática
- colaboração entre humanos e agentes

## Direção do Produto

O produto não deve tentar substituir Blender, FreeCAD ou CAD industrial.
O objetivo é virar uma camada de inteligência sobre ferramentas já fortes:

- transformar briefing em modelo inicial
- gerar variações rapidamente
- validar regras de engenharia
- exportar em formatos profissionais
- permitir revisão humana antes do envio final

## Base Open Source Recomendada

- `FreeCAD` para CAD paramétrico e engenharia
- `CadQuery` para modelagem por código
- `OpenSCAD` para geração baseada em texto/código
- `Blender` para criação visual, automação e renderização
- `IfcOpenShell` para BIM/IFC
- `OCCT` como kernel geométrico
- `Three.js` ou `React Three Fiber` para visualização web

## MVP

1. Usuário escreve o que quer construir.
2. A IA gera uma proposta paramétrica em código estruturado.
3. O sistema valida geometria e restrições.
4. O modelo é exibido em um viewer 3D web.
5. O usuário ajusta parâmetros e exporta em STEP, STL, IFC ou GLB.

## Estratégia de Agentes

- agente de pesquisa: encontra libs, licenças e referências
- agente de arquitetura: define módulos e integrações
- agente de CAD: cuida da geração paramétrica
- agente de frontend: cria viewer e interface
- agente de validação: testa geometria, formatos e falhas
- agente de produto: define nicho, pricing e posicionamento

## Regra Principal

IA nunca pode ser a fonte final sem validação.
Toda saída deve passar por schema, regras geométricas e revisão visual.

