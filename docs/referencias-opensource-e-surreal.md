# Referências open source para a refatoração

## Confirmadas diretamente nesta sessão

| Projeto | URL primária | Licença observada | Uso possível |
|---|---|---|---|
| Three.js | https://github.com/mrdoob/three.js | MIT | renderer 3D, geometria, exportadores e cena interativa |
| FreeCAD | https://github.com/FreeCAD/FreeCAD | LGPL-2.1 observado no arquivo LICENSE | referência de parametricidade e formatos abertos; integração futura precisa de processo separado |
| CADQuery | https://github.com/CadQuery/cadquery | Apache 2.0 observado no arquivo LICENSE | geração paramétrica declarativa no backend/worker |

## Referências para investigação posterior

- OpenSCAD: linguagem paramétrica e reprodutibilidade; confirmar licença e integração antes de distribuição.
- xeokit: visualização BIM/IFC; confirmar repositório, licença e maturidade atual antes de adotar.
- web-ifc / That Open: leitura e escrita IFC no navegador; confirmar licença e API na implementação real.
- IFC.js / That Open Engine: referência de navegação BIM e seleção espacial; validar a linha atual do projeto.

## Regras de adoção

1. Copiar somente técnicas e contratos, nunca código sem revisão de licença.
2. Manter `three` como dependência já instalada até provar que outra camada traz benefício real.
3. Não adicionar dependência somente para efeito visual.
4. Cada integração CAD/BIM precisa de fixture real, teste de import/export e fallback honesto.
5. Separar visualização, geração paramétrica e validação; não vender Three.js como solver de engenharia.
6. Registrar licença e versão no inventário de dependências antes de publicar.

## Direção surreal adaptável

- Instrumentação editorial: linhas, grids, régua, coordenadas e telemetria como linguagem visual.
- Stage 3D único por tela: a cena é o protagonista; o restante é interface de decisão.
- Movimento funcional: câmera, revisão e estados mudam com o trabalho, não com decoração infinita.
- Contraste contido: carvão, azul técnico e verde de aprovação; sem roxo neon genérico.
- Assimetria controlada: painel de decisão e cena 3D não devem competir por atenção.
