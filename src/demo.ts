import { Orchestrator, ProjectStore } from "./index.js";
import { capabilities } from "./features/capabilities.js";
import type { ProjectKind } from "./types/domain.js";

const store = new ProjectStore();
const orchestrator = new Orchestrator();

const models: Array<{
  name: string;
  kind: ProjectKind;
  goal: string;
  brief: string;
  constraints: Record<string, string | number | boolean | null>;
}> = [
  {
    name: "Casa térrea premium em lote urbano",
    kind: "residential",
    goal: "Gerar modelo 3D para construtora com planta, interiores, BIM/IFC, tour e pacote comercial",
    brief: "Criar casa térrea de 180 m² em lote 12 x 30 m, com 3 suítes, sala integrada, garagem para 2 carros, área gourmet, fachada contemporânea e tour 3D para venda.",
    constraints: { lotWidth: 12, lotDepth: 30, builtAreaM2: 180, bedrooms: 3, suites: 3, parkingSpots: 2, floors: 1, targetBuyer: "família alta renda", deliveryPack: "GLB + IFC + render pack + listing copy" },
  },
  {
    name: "Casa geminada mid-rise",
    kind: "residential",
    goal: "Modelo 3D para construtora de casas geminadas com fachada moderna e tour de vendas",
    brief: "Casa geminada de 135 m² em lote 6 x 18 m, 2 pavimentos, 3 quartos, 2 suítes, garagem, área gourmet, fachada contemporânea.",
    constraints: { lotWidth: 6, lotDepth: 18, builtAreaM2: 135, bedrooms: 3, suites: 2, parkingSpots: 1, floors: 2, targetBuyer: "família média", deliveryPack: "GLB + render pack" },
  },
  {
    name: "Cobertura duplex",
    kind: "residential",
    goal: "Modelo 3D para cobertura duplex com terraço e vista panorâmica",
    brief: "Cobertura duplex de 160 m² com terraço, sala integrada, cozinha gourmet, 3 quartos, 2 suítes e vista panorâmica.",
    constraints: { lotWidth: 10, lotDepth: 12, builtAreaM2: 160, bedrooms: 3, suites: 2, parkingSpots: 1, floors: 2, targetBuyer: "família alta renda", deliveryPack: "GLB + render pack" },
  },
  {
    name: "Shopping center regional",
    kind: "commercial-real-estate",
    goal: "Modelo 3D para shopping center com lojas, praça de alimentação e estacionamento",
    brief: "Shopping center regional de 3600 m² leasable, 42 lojas, 6 restaurantes, praça de alimentação e 350 vagas.",
    constraints: { frontageM: 45, depthM: 80, leasableAreaM2: 3600, floors: 2, stores: 42, restaurants: 6, parkingSpots: 350 },
  },
  {
    name: "Hospital regional",
    kind: "commercial-real-estate",
    goal: "Modelo 3D para hospital com departamentos, UTI e estacionamento",
    brief: "Hospital regional de 120 leitos, 8 centros cirúrgicos, UTI, pronto-socorro, 4 pavimentos, 80 vagas.",
    constraints: { frontageM: 30, depthM: 50, floorAreaM2: 1500, floors: 4, beds: 120, operatingRooms: 8, parkingSpots: 80 },
  },
  {
    name: "Condomínio residencial urbano",
    kind: "multi-family",
    goal: "Modelo 3D para construtora de condomínio residencial com lazer e portaria",
    brief: "Condomínio residencial urbano de 60 unidades, 15 andares, área de lazer com piscina, academia e salão de festas.",
    constraints: { lotAreaM2: 5000, floors: 15, unitsPerFloor: 4, averageUnitM2: 85, parkingRatio: 1.5 },
  },
  {
    name: "Fábrica de tijolos ecológicos",
    kind: "fabrication",
    goal: "Modelo 3D para linha de produção de tijolos ecológicos com maquinário e layout industrial",
    brief: "Fábrica de tijolos ecológicos com 800 m² de produção, 400 m² de armazenamento, 6 máquinas e capacidade de 5.000 tijolos/dia.",
    constraints: { productionAreaM2: 800, storageM2: 400, officeAreaM2: 120, parkingSpots: 15, machines: 6, dailyOutput: 5000 },
  },
  {
    name: "Restaurante e bar lounge",
    kind: "commercial-real-estate",
    goal: "Modelo 3D para restaurante e bar lounge com salão, cozinha e área externa",
    brief: "Restaurante e bar lounge de 280 m² com 65 assentos, bar com 20 lugares, cozinha de 45 m² e área externa de 80 m².",
    constraints: { floorAreaM2: 280, floors: 1, diningSeats: 65, barSeats: 20, kitchenM2: 45, outdoorAreaM2: 80, parkingSpots: 5 },
  },
  {
    name: "Academia e centro de ginástica",
    kind: "commercial-real-estate",
    goal: "Modelo 3D para academia com fitness zone, group classes, reception and locker area",
    brief: "Academia de 450 m² com 200 m² de zona fitness, 2 salas para aulas em grupo, recepção de 35 m², vestiário e lockers.",
    constraints: { floorAreaM2: 450, floors: 1, fitnessZoneM2: 200, groupRooms: 2, receptionM2: 35, lockerM2: 40, parkingSpots: 10 },
  },
];

const results = models.map((m) => {
  const project = store.create({ name: m.name, kind: m.kind, goal: m.goal, tags: [m.kind] });
  const plan = orchestrator.createPlan({ project, brief: m.brief, constraints: m.constraints });

  return {
    projectId: project.id,
    name: project.name,
    kind: project.kind,
    ok: plan.ok,
    format: plan.data ? plan.data.model.format : undefined,
    validationOk: plan.data ? plan.data.validation.ok : false,
    complianceOk: plan.data ? plan.data.compliance.ok : false,
    tasks: plan.data ? plan.data.taskIds.length : 0,
    routedAgents: plan.meta?.agents ?? [],
    exportTargets: plan.meta?.exportTargets ?? [],
  };
});

const failed = results.filter((r) => !r.ok || !r.validationOk || !r.complianceOk);

console.log(
  JSON.stringify(
    {
      total: results.length,
      successful: results.length - failed.length,
      failed: failed.length,
      results,
      failedItems: failed,
      platformCapabilities: capabilities,
    },
    null,
    2,
  ),
);
