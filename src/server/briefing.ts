export type ExportTarget = {
  format: string;
  filename: string;
  mimeType: string;
};

export type ProjectType =
  | "Single-family house"
  | "Multi-family building"
  | "Commercial building"
  | "Interior staging"
  | "Renovation/as-built"
  | "Mixed-use development"
  | "Real-estate sales tour";

export type UseCase =
  | "Concept generation"
  | "Feasibility study"
  | "Sales launch"
  | "Approval package"
  | "BIM handoff"
  | "Renovation planning"
  | "Client review"
  | "Construction coordination";

export type SizeBand = "Room/interior" | "House lot" | "Small building" | "Tower/development";
export type TimelineBand = "Rush (1 week)" | "Standard (2-4 weeks)" | "Pilot (1-2 months)" | "Program (quarter+)";
export type Priority = "Rush" | "Standard" | "High rigor";
export type BudgetBand = "< $10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";
export type MediaKind = "Prompt" | "PNG/JPEG" | "Floor plan PDF" | "Video walkthrough" | "Drone footage" | "Reference images" | "Existing listing";

export type MediaAsset = {
  kind: MediaKind;
  name: string;
  detail: string;
};

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
  mediaAssets: MediaAsset[];
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
  mediaPlan: string[];
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
  "Single-family house",
  "Multi-family building",
  "Commercial building",
  "Interior staging",
  "Renovation/as-built",
  "Mixed-use development",
  "Real-estate sales tour",
];

export const useCaseOptions: UseCase[] = [
  "Concept generation",
  "Feasibility study",
  "Sales launch",
  "Approval package",
  "BIM handoff",
  "Renovation planning",
  "Client review",
  "Construction coordination",
];

export const sizeBandOptions: SizeBand[] = ["Room/interior", "House lot", "Small building", "Tower/development"];
export const timelineOptions: TimelineBand[] = ["Rush (1 week)", "Standard (2-4 weeks)", "Pilot (1-2 months)", "Program (quarter+)"];
export const priorityOptions: Priority[] = ["Rush", "Standard", "High rigor"];
export const budgetOptions: BudgetBand[] = ["< $10k", "$10k-$25k", "$25k-$50k", "$50k+"];
export const mediaKindOptions: MediaKind[] = ["Prompt", "PNG/JPEG", "Floor plan PDF", "Video walkthrough", "Drone footage", "Reference images", "Existing listing"];

const scoreMap = {
  projectType: {
    "Single-family house": 2,
    "Multi-family building": 4,
    "Commercial building": 4,
    "Interior staging": 2,
    "Renovation/as-built": 4,
    "Mixed-use development": 4,
    "Real-estate sales tour": 3,
  },
  useCase: {
    "Concept generation": 1,
    "Feasibility study": 3,
    "Sales launch": 2,
    "Approval package": 4,
    "BIM handoff": 4,
    "Renovation planning": 3,
    "Client review": 2,
    "Construction coordination": 3,
  },
  sizeBand: {
    "Room/interior": 1,
    "House lot": 2,
    "Small building": 3,
    "Tower/development": 4,
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
  "Single-family house": "Residential developers and brokers",
  "Multi-family building": "Multi-family feasibility and investor review",
  "Commercial building": "Commercial leasing and retail development",
  "Interior staging": "Interior studios and real-estate marketing",
  "Renovation/as-built": "Renovation, retrofit and as-built reconstruction",
  "Mixed-use development": "Developer feasibility and investor packaging",
  "Real-estate sales tour": "Brokerage, sales launch and virtual showrooms",
};

const surrealDirectionMap: Record<ProjectType, string> = {
  "Single-family house": "Premium residential tour with sunlit facade, furnished social core, clear lot context, and sales-ready camera path.",
  "Multi-family building": "Investor-grade tower massing with unit mix overlays, podium/parking logic, area schedule and night/day sales views.",
  "Commercial building": "Tenant-ready commercial shell with storefront rhythm, signage zones, circulation, leasing views and fit-out variants.",
  "Interior staging": "Styled interior scene with finish palettes, furnishing presets, lighting moods and buyer-persona variants.",
  "Renovation/as-built": "Measured reconstruction view with existing/new deltas, uncertainty callouts, photo anchors and approval notes.",
  "Mixed-use development": "Urban-scale concept with retail base, residential/commercial stack, public realm and investor storytelling.",
  "Real-estate sales tour": "Interactive sales showroom with hotspots, unit options, renders, room scenes and broker handoff narrative.",
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
    "Single-family house": ["sales-core: GLB tour + render pack", "bim-core: IFC + floor plan + area schedule"],
    "Multi-family building": ["feasibility-core: massing + unit mix + area schedule", "investor-pack: GLB + IFC + VGV summary"],
    "Commercial building": ["leasing-core: GLB + storefront views", "fitout-pack: zones + circulation + tenant notes"],
    "Interior staging": ["staging-core: room scenes + finish schedule", "sales-pack: renders + tour hotspots"],
    "Renovation/as-built": ["reconstruction-core: photo anchors + measured model", "approval-pack: existing/new deltas + issue list"],
    "Mixed-use development": ["urban-core: podium/tower massing + public realm", "investor-pack: GLB + area mix + phasing"],
    "Real-estate sales tour": ["tour-core: GLB + camera path + hotspots", "broker-pack: listing copy + renders + share link"],
  }[projectType];
}

function mediaPlanFor(asset: MediaAsset): string {
  return {
    Prompt: `Prompt "${asset.name}" seeds the architectural program, style, buyer profile and deliverable scope.`,
    "PNG/JPEG": `Image "${asset.name}" goes to vision extraction for facade/style, visible dimensions and missing-view checks.`,
    "Floor plan PDF": `Plan "${asset.name}" goes to room extraction, wall/opening detection, area assumptions and BIM level setup.`,
    "Video walkthrough": `Video "${asset.name}" goes to keyframe sampling, room sequence mapping and camera path reconstruction.`,
    "Drone footage": `Drone asset "${asset.name}" goes to site context, access, massing envelope and terrain/lot assumptions.`,
    "Reference images": `Reference set "${asset.name}" drives style, materials, lighting, staging and render direction.`,
    "Existing listing": `Listing media "${asset.name}" becomes a sales upgrade job with tour, staged rooms and broker-ready copy.`,
  }[asset.kind];
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
    .filter((target) => target.format === "IFC" || target.format === "GLB")
    .map((target) => target.format);

  return {
    projectName: "Casa térrea premium em lote urbano",
    projectType: "Single-family house",
    dimensions: "Lote 12 x 30 m · 180 m² construídos · 3 suítes",
    priority: "Standard",
    sizeBand: "House lot",
    timeline: "Standard (2-4 weeks)",
    useCase: "Sales launch",
    budgetBand: "$10k-$25k",
    notes: "Gerar casa contemporânea com sala integrada, garagem para 2 carros, área gourmet, fachada premium, interiores mobiliados, tour 3D e pacote IFC/GLB para venda.",
    selectedExports: preferredExports.length > 0 ? preferredExports : [exportTargets[0]?.format ?? "STEP"],
    mediaAssets: [
      { kind: "Prompt", name: "construction brief", detail: "Texto inicial com dimensoes, programa, estilo e objetivo comercial." },
      { kind: "Reference images", name: "fachadas contemporâneas", detail: "Usar como direção visual para materiais, volumetria e renders." },
    ],
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
  const mediaScore = Math.min(4, Math.max(1, form.mediaAssets.length + (form.mediaAssets.some((asset) => asset.kind === "Floor plan PDF" || asset.kind === "PNG/JPEG") ? 1 : 0)));
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
    mediaScore +
    clarityBonus;

  const effortHours = 8 + totalScore * 3;
  const blockers: string[] = [];

  if (!form.selectedExports.length) blockers.push("Select at least one export target.");
  if (!form.mediaAssets.length) blockers.push("Add at least one prompt, image, video, plan, drone, or listing-media input.");
  if (noteLength < 35) blockers.push("Add property program, lot context, style, buyer persona, approval, or sales goals.");
  if (form.budgetBand === "< $10k" && totalScore > 12) blockers.push("The current budget band may be tight for this scope.");
  if ((form.useCase === "Approval package" || form.useCase === "BIM handoff") && !form.selectedExports.includes("IFC")) blockers.push("Approval or BIM handoff should include IFC.");
  if ((form.projectType === "Renovation/as-built" || form.mediaAssets.some((asset) => asset.kind === "Video walkthrough" || asset.kind === "Drone footage")) && !form.mediaAssets.some((asset) => asset.kind === "Floor plan PDF" || asset.kind === "PNG/JPEG")) blockers.push("Reconstruction quality improves with at least one plan or still image for scale confirmation.");

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
    mediaPlan: form.mediaAssets.map(mediaPlanFor),
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
    `- Media inputs: ${form.mediaAssets.map((asset) => `${asset.kind}: ${asset.name}`).join(" | ") || "TBD"}`,
    `- Export targets: ${selectedExportTargets.map((target) => target.format).join(" + ") || "TBD"}`,
    "",
    "## Scoped summary",
    `Generate a ${form.projectType.toLowerCase()} for ${dimensions}. The brief is marked ${form.priority.toLowerCase()} priority, so the first pass should focus on ${getFocusText(form.projectType)}. Deliver ${getDeliveryText(form.projectType)} and keep the output reviewable as a BIM, tour, approval, or sales package.`,
    "",
    "## Commercial recommendation",
    `- Recommended sector: ${analysis.recommendedSector}`,
    `- Recommended package: ${analysis.recommendedPackage}`,
    `- Next step: ${analysis.nextStep}`,
    `- Surreal 3D direction: ${analysis.surrealDirection}`,
    "",
    "## Multimodal generation plan",
    ...(analysis.mediaPlan.length ? analysis.mediaPlan.map((item) => `- ${item}`) : ["- No media inputs supplied yet. Start with prompt-only generation and request visual references before release."]),
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
    "Single-family house": "lot placement, room program, facade, interiors, GLB tour and IFC handoff",
    "Multi-family building": "massing, unit mix, levels, parking, area schedule and investor feasibility",
    "Commercial building": "leasable area, storefront rhythm, service zones, circulation and tenant-ready visuals",
    "Interior staging": "room composition, finishes, furniture, lighting and buyer-persona variants",
    "Renovation/as-built": "photo/video reconstruction, existing-new deltas, scale recovery and approval gaps",
    "Mixed-use development": "podium/tower split, public realm, area mix, phasing and investor story",
    "Real-estate sales tour": "camera path, hotspots, listing narrative, renders and shareable sales package",
  }[projectType];
}

function getDeliveryText(projectType: ProjectType) {
  return {
    "Single-family house": "GLB tour + IFC + render pack + listing copy",
    "Multi-family building": "IFC + GLB + area schedule + investor summary",
    "Commercial building": "GLB leasing tour + fit-out zones + storefront views",
    "Interior staging": "room GLB scenes + renders + finish schedule",
    "Renovation/as-built": "reconstructed model + photo anchors + delta report",
    "Mixed-use development": "urban massing GLB + area mix + phasing package",
    "Real-estate sales tour": "interactive GLB tour + hotspots + broker pack",
  }[projectType];
}

function getRiskText(projectType: ProjectType) {
  return {
    "Single-family house": "missing lot constraints, room area mismatch, facade/reference ambiguity",
    "Multi-family building": "zoning, parking, unit mix, FAR/GFA and approval assumptions",
    "Commercial building": "tenant requirements, circulation, storefront constraints and fit-out uncertainty",
    "Interior staging": "style drift, furniture scale, lighting realism and illustrative finish disclaimers",
    "Renovation/as-built": "scale recovery, incomplete media, hidden conditions and approval deltas",
    "Mixed-use development": "program mix, public realm, access, parking and investor assumptions",
    "Real-estate sales tour": "media fidelity, hotspot accuracy, listing claims and visual disclaimers",
  }[projectType];
}
