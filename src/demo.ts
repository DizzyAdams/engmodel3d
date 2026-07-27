import { Orchestrator, ProjectStore } from "./index.js";

const store = new ProjectStore();
const project = store.create({
  name: "Módulo estrutural inicial",
  kind: "mechanical",
  goal: "Gerar uma peça paramétrica com exportação validável",
  tags: ["mvp", "cad", "ai"],
});

const orchestrator = new Orchestrator();
const plan = orchestrator.createPlan({
  project,
  brief: "Criar uma base paramétrica com largura, altura e furação configuráveis.",
  constraints: {
    width: 120,
    height: 60,
    holes: 4,
    thickness: 8,
  },
});

console.log(JSON.stringify({ project, plan }, null, 2));

