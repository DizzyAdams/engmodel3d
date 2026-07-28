export type ExportTarget = {
  format: string;
  filename: string;
  mimeType: string;
};

export type ProjectType =
  | "Mechanical part"
  | "Architecture/BIM module"
  | "Fixture"
  | "Enclosure"
  | "Custom assembly"
  | "Structural frame"
  | "MEP system"
  | "Civil/infrastructure package";

export type UseCase =
  | "Prototype"
  | "Client review"
  | "Production handoff"
  | "Reusable library asset"
  | "Construction coordination";

export type SizeBand = "Pocket-sized" | "Desktop" | "Workbench" | "Room-scale";
export type TimelineBand = "Rush (1 week)" | "Standard (2-4 weeks)" | "Pilot (1-2 months)" | "Program (quarter+)";
export type Priority = "Rush" | "Standard" | "High rigor";
export type BudgetBand = "< $10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";

export type BriefFormState = {
  projectName: string;
  projectType: ProjectType;
  dimensions: string;
  priority: Priority;
  sizeBand: SizeBand;
  timeline: TimelineBand;
  useCase: UseCase;
  budgetBand: BudgetBand;
  notes: string;
  selectedExports: string[];
};

export type BriefAnalysis = {
  scopeLabel: string;
  effortHours: number;
  readiness: number;
  blockers: string[];
  nextStep: string;
  exportPack: string;
  estimatedPriceBand: string;
  estimatedPriceUsd: { low: number; high: number | null };
  marginRisk: "Low" | "Medium" | "High";
  riskPosture: string;
  exportPresets: string[];
  recommendedSector: string;
  recommendedPackage: string;
  surrealDirection: string;
};

export type BriefProposal = {
  proposalVersion: "1.0";
  project: { name: string; type: ProjectType; useCase: UseCase };
  commercial: {
    package: string;
    priceBand: string;
    priceUsd: { low: number; high: number | null };
    estimatedEffortHours: number;
    marginRisk: "Low" | "Medium" | "High";
    riskPosture: string;
  };
  delivery: { sector: string; exportTargets: string[]; presets: string[]; nextStep: string };
  creativeDirection: string;
};

export type BriefSubmission = {
  id: string;
  createdAt: string;
  form: BriefFormState;
  analysis: BriefAnalysis;
  preview: string;
  proposal: BriefProposal;
};

export const projectTypeOptions: ProjectType[] = [
  "Mechanical part",
  "Architecture/BIM module",
  "Fixture",
  "Enclosure",
  "Custom assembly",
  "Structural frame",
  "MEP system",
  "Civil/infrastructure package",
];

export const useCaseOptions: UseCase[] = [
  "Prototype",
  "Client review",
  "Production handoff",
  "Reusable library asset",
  "Construction coordination",
];

export const sizeBandOptions: SizeBand[] = ["Pocket-sized", "Desktop", "Workbench", "Room-scale"];
export const timelineOptions: TimelineBand[] = ["Rush (1 week)", "Standard (2-4 weeks)", "Pilot (1-2 months)", "Program (quarter+)"];
export const priorityOptions: Priority[] = ["Rush", "Standard", "High rigor"];
export const budgetOptions: BudgetBand[] = ["< $10k", "$10k-$25k", "$25k-$50k", "$50k+"];

const scoreMap = {
  projectType: {
    "Mechanical part": 2,
    "Architecture/BIM module": 3,
    Fixture: 2,
    Enclosure: 3,
    "Custom assembly": 4,
    "Structural frame": 4,
    "MEP system": 4,
    "Civil/infrastructure package": 4,
  },
  useCase: {
    Prototype: 1,
    "Client review": 2,
    "Production handoff": 3,
    "Reusable library asset": 2,
    "Construction coordination": 3,
  },
  sizeBand: {
    "Pocket-sized": 1,
    Desktop: 2,
    Workbench: 3,
    "Room-scale": 4,
  },
  timeline: {
    "Rush (1 week)": 1,
    "Standard (2-4 weeks)": 2,
    "Pilot (1-2 months)": 3,
    "Program (quarter+)": 4,
  },
  priority: {
    Rush: 1,
    Standard: 2,
    "High rigor": 3,
  },
  budgetBand: {
    "< $10k": 1,
    "$10k-$25k": 2,
    "$25k-$50k": 3,
    "$50k+": 4,
  },
} as const;

const sectorMap: Record<ProjectType, string> = {
  "Mechanical part": "Industrial equipment and fixtures",
  "Architecture/BIM module": "BIM and modular construction",
  Fixture: "Industrial equipment and fixtures",
  Enclosure: "Industrial equipment and fixtures",
  "Custom assembly": "Energy, utilities, and plant skids",
  "Structural frame": "Structural and facade engineering",
  "MEP system": "MEP coordination and prefabrication",
  "Civil/infrastructure package": "Civil and infrastructure packages",
};

const surrealDirectionMap: Record<ProjectType, string> = {
  "Mechanical part": "Surreal precision metal artifact with luminous edge ribs, cinematic exploded-view logic, and studio-grade material realism.",
  "Architecture/BIM module": "Surreal architectural assembly with crystalline layers, glowing metadata callouts, and premium spatial composition.",
  Fixture: "Surreal industrial fixture with tactical clamps, floating datum annotations, and precise fabrication aura.",
  Enclosure: "Surreal enclosure concept with translucent shells, controlled openings, and luxury technical detailing.",
  "Custom assembly": "Surreal multi-part engineered system with articulated interfaces, premium exploded storytelling, and cinematic staging.",
  "Structural frame": "Surreal structural skeleton with impossible-but-readable load paths, dramatic connection nodes, and premium engineering monumentality.",
  "MEP system": "Surreal MEP routing composition with luminous service lines, clash-free sweeps, and hyper-legible coordination layers.",
  "Civil/infrastructure package": "Surreal civil infrastructure scene with monumental joints, layered revision overlays, and cinematic construction clarity.",
};

function priceForPackage(packageName: string) {
  return packageName === "Pilot Sprint"
    ? { label: "$12k-$18k", low: 12000, high: 18000 }
    : packageName === "Engineering Pod"
      ? { label: "$28k-$45k", low: 28000, high: 45000 }
      : { label: "$60k+", low: 60000, high: null };
}

function exportPresets(projectType: ProjectType): string[] {
  return {
    "Mechanical part": ["manufacturing-core: STEP + STL", "review-pack: GLB + decision memo"],
    "Architecture/BIM module": ["coordination-core: IFC + GLB", "metadata-pack: IFC + issue matrix"],
    Fixture: ["manufacturing-core: STEP + STL", "shop-floor-pack: STEP + setup notes"],
    Enclosure: ["fabrication-core: STEP + GLB", "review-pack: GLB + ingress notes"],
    "Custom assembly": ["assembly-core: STEP + GLB", "handoff-pack: STEP + review package"],
    "Structural frame": ["structural-core: STEP + IFC", "review-pack: GLB + issue matrix"],
    "MEP system": ["coordination-core: IFC + GLB", "field-pack: IFC + coordination notes"],
    "Civil/infrastructure package": ["infrastructure-core: STEP + IFC", "contractor-pack: IFC + issue matrix"],
  }[projectType];
}

export function buildBriefProposal(form: BriefFormState, analysis: BriefAnalysis): BriefProposal {
  return {
    proposalVersion: "1.0",
    project: { name: form.projectName, type: form.projectType, useCase: form.useCase },
    commercial: {
      package: analysis.recommendedPackage,
      priceBand: analysis.estimatedPriceBand,
      priceUsd: analysis.estimatedPriceUsd,
      estimatedEffortHours: analysis.effortHours,
      marginRisk: analysis.marginRisk,
      riskPosture: analysis.riskPosture,
    },
    delivery: {
      sector: analysis.recommendedSector,
      exportTargets: form.selectedExports,
      presets: analysis.exportPresets,
      nextStep: analysis.nextStep,
    },
    creativeDirection: analysis.surrealDirection,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

export function normalizeDimensions(dimensions: string) {
  const trimmed = dimensions.trim();
  return trimmed.length > 0 ? trimmed : "dimensions not specified";
}

function getDimensionScore(dimensions: string) {
  const numericTokens = dimensions.match(/\d+(?:\.\d+)?/g) ?? [];
  return Math.max(1, Math.min(4, numericTokens.length || 1));
}

export function createDefaultBriefForm(exportTargets: ExportTarget[]): BriefFormState {
  const preferredExports = exportTargets
    .filter((target) => target.format === "STEP" || target.format === "STL")
    .map((target) => target.format);

  return {
    projectName: "Cantilever bracket pilot",
    projectType: "Mechanical part",
    dimensions: "220 x 80 x 40 mm",
    priority: "Standard",
    sizeBand: "Desktop",
    timeline: "Standard (2-4 weeks)",
    useCase: "Prototype",
    budgetBand: "$10k-$25k",
    notes: "Need a fast pilot with validation and export handoff.",
    selectedExports: preferredExports.length > 0 ? preferredExports : [exportTargets[0]?.format ?? "STEP"],
  };
}

export function analyzeBrief(form: BriefFormState): BriefAnalysis {
  const projectTypeScore = scoreMap.projectType[form.projectType];
  const useCaseScore = scoreMap.useCase[form.useCase];
  const sizeScore = scoreMap.sizeBand[form.sizeBand];
  const timelineScore = scoreMap.timeline[form.timeline];
  const priorityScore = scoreMap.priority[form.priority];
  const budgetScore = scoreMap.budgetBand[form.budgetBand];
  const dimensionScore = getDimensionScore(form.dimensions);
  const exportScore = Math.max(1, form.selectedExports.length);
  const noteLength = form.notes.trim().length;
  const clarityBonus = noteLength >= 80 ? 0 : noteLength >= 35 ? 1 : 2;

  const totalScore =
    projectTypeScore +
    useCaseScore +
    sizeScore +
    timelineScore +
    priorityScore +
    budgetScore +
    dimensionScore +
    exportScore +
    clarityBonus;

  const effortHours = 8 + totalScore * 3;
  const blockers: string[] = [];

  if (!form.selectedExports.length) blockers.push("Select at least one export target.");
  if (noteLength < 35) blockers.push("Add acceptance criteria or tolerance details.");
  if (form.budgetBand === "< $10k" && totalScore > 12) blockers.push("The current budget band may be tight for this scope.");
  if (form.projectType === "MEP system" && form.useCase !== "Construction coordination") blockers.push("MEP work usually needs coordination context for a strong proposal.");

  const scopeLabel =
    totalScore <= 10
      ? "Discovery brief"
      : totalScore <= 14
        ? "Qualified pilot"
        : totalScore <= 19
          ? "Delivery-ready scope"
          : "Multi-workstream engagement";

  const readiness = Math.max(48, Math.min(98, 100 - blockers.length * 16 - clarityBonus * 4 + Math.min(10, form.selectedExports.length * 3)));

  const recommendedPackage =
    totalScore <= 14
      ? "Pilot Sprint"
      : totalScore <= 20
        ? "Engineering Pod"
        : "Enterprise Rollout";

  const nextStep =
    blockers.length > 0
      ? "Collect the missing context before pricing."
      : form.priority === "Rush"
        ? "Send a same-week scope and confirm the handoff gate."
        : recommendedPackage === "Enterprise Rollout"
          ? "Propose a phased rollout with governance and portfolio reporting."
          : recommendedPackage === "Engineering Pod"
            ? "Send a scoped estimate and delivery outline."
            : "Book a discovery call and confirm constraints.";

  const price = priceForPackage(recommendedPackage);
  const marginRisk: BriefAnalysis["marginRisk"] = form.priority === "Rush" || blockers.length >= 2 ? "High" : blockers.length === 1 || form.budgetBand === "< $10k" ? "Medium" : "Low";
  const riskPosture = marginRisk === "High" ? "Protect margin with a paid discovery gate and explicit change control." : marginRisk === "Medium" ? "Confirm acceptance criteria before committing the delivery estimate." : "Scope is commercially aligned with the selected package and delivery posture.";

  return {
    scopeLabel,
    effortHours,
    readiness,
    blockers,
    nextStep,
    exportPack: form.selectedExports.join(" + ") || "No export target selected",
    estimatedPriceBand: price.label,
    estimatedPriceUsd: { low: price.low, high: price.high },
    marginRisk,
    riskPosture,
    exportPresets: exportPresets(form.projectType),
    recommendedSector: sectorMap[form.projectType],
    recommendedPackage,
    surrealDirection: surrealDirectionMap[form.projectType],
  };
}

export function buildBriefPreview(form: BriefFormState, analysis: BriefAnalysis, exportTargets: ExportTarget[]) {
  const selectedExportTargets = exportTargets.filter((target) => form.selectedExports.includes(target.format));
  const dimensions = normalizeDimensions(form.dimensions);

  return [
    `# Project Brief: ${form.projectName}`,
    "",
    "## Intake details",
    `- Project type: ${form.projectType}`,
    `- Dimensions: ${dimensions}`,
    `- Priority: ${form.priority}`,
    `- Size band: ${form.sizeBand}`,
    `- Timeline: ${form.timeline}`,
    `- Primary use: ${form.useCase}`,
    `- Budget band: ${form.budgetBand}`,
    `- Export targets: ${selectedExportTargets.map((target) => target.format).join(" + ") || "TBD"}`,
    "",
    "## Scoped summary",
    `Build a ${form.projectType.toLowerCase()} for ${dimensions}. The brief is marked ${form.priority.toLowerCase()} priority, so the first pass should focus on ${getFocusText(form.projectType)}. Deliver ${getDeliveryText(form.projectType)} and keep the handoff narrow enough to review in one pass.`,
    "",
    "## Commercial recommendation",
    `- Recommended sector: ${analysis.recommendedSector}`,
    `- Recommended package: ${analysis.recommendedPackage}`,
    `- Next step: ${analysis.nextStep}`,
    `- Surreal 3D direction: ${analysis.surrealDirection}`,
    "",
    "## Scope summary",
    `- Scope tier: ${analysis.scopeLabel}`,
    `- Estimated effort: ${analysis.effortHours} hours`,
    `- Readiness: ${analysis.readiness}%`,
    `- Estimated price band: ${analysis.estimatedPriceBand}`,
    `- Margin risk: ${analysis.marginRisk}`,
    `- Export pack: ${analysis.exportPack}`,
    `- Primary risk: ${getRiskText(form.projectType)}`,
    "",
    "## Notes",
    form.notes.trim() || "No additional notes supplied.",
    "",
    "## Delivery assumptions",
    "- Human review remains required before release.",
    "- Export readiness is validated against the selected file targets.",
    "- Brief will be revised once tolerances and acceptance criteria are confirmed.",
  ].join("\n");
}

export function createBriefSubmission(form: BriefFormState, exportTargets: ExportTarget[]): BriefSubmission {
  const analysis = analyzeBrief(form);
  return {
    id: `brief-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    form,
    analysis,
    preview: buildBriefPreview(form, analysis, exportTargets),
    proposal: buildBriefProposal(form, analysis),
  };
}

function getFocusText(projectType: ProjectType) {
  return {
    "Mechanical part": "mounting interfaces, clearance, and stress hotspots",
    "Architecture/BIM module": "IFC metadata, placement logic, and reuse rules",
    Fixture: "datum control, repeatability, and clamping behavior",
    Enclosure: "wall thickness, access points, and assembly constraints",
    "Custom assembly": "interfaces, tolerance stack-up, and cross-team handoff rules",
    "Structural frame": "load paths, connection logic, and staged release assumptions",
    "MEP system": "routing logic, clash posture, and field-install constraints",
    "Civil/infrastructure package": "connection geometry, revision control, and contractor handoff clarity",
  }[projectType];
}

function getDeliveryText(projectType: ProjectType) {
  return {
    "Mechanical part": "STEP + STL",
    "Architecture/BIM module": "IFC + GLB",
    Fixture: "STEP + setup notes",
    Enclosure: "STEP + GLB",
    "Custom assembly": "STEP + review package",
    "Structural frame": "STEP + review package",
    "MEP system": "IFC + GLB + coordination notes",
    "Civil/infrastructure package": "STEP + IFC + issue matrix",
  }[projectType];
}

function getRiskText(projectType: ProjectType) {
  return {
    "Mechanical part": "clearance and rib spacing",
    "Architecture/BIM module": "property mapping and assembly context",
    Fixture: "repeatability and service access",
    Enclosure: "fit, ingress, and draft angles",
    "Custom assembly": "coordination gaps between components",
    "Structural frame": "connection assumptions and staged load transfer",
    "MEP system": "routing conflicts and field-install access",
    "Civil/infrastructure package": "revision drift between geometry, comments, and procurement notes",
  }[projectType];
}
