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
  totalScore: number;
  recommendedPackage: string;
  recommendedSector: string;
  surrealDirection: string;
};

export type BriefResponse = {
  ok: boolean;
  slug: string;
  analysis: BriefAnalysis;
  preview: string;
  generatedAt: string;
};

function normalizeDimensions(dimensions: string) {
  const trimmed = dimensions.trim();
  return trimmed.length > 0 ? trimmed : "dimensions not specified";
}

function getDimensionScore(dimensions: string) {
  const numericTokens = dimensions.match(/\d+(?:\.\d+)?/g) ?? [];
  return Math.max(1, Math.min(4, numericTokens.length || 1));
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/--+/g, "-");
}

function recommendedSector(projectType: ProjectType): string {
  return {
    "Mechanical part": "Industrial equipment and fixtures",
    "Architecture/BIM module": "BIM and modular construction",
    Fixture: "Industrial equipment and fixtures",
    Enclosure: "Energy, utilities, and plant skids",
    "Custom assembly": "Energy, utilities, and plant skids",
    "Structural frame": "Structural and facade engineering",
    "MEP system": "MEP coordination and prefabrication",
    "Civil/infrastructure package": "Civil and infrastructure packages",
  }[projectType];
}

function surrealDirection(projectType: ProjectType): string {
  return {
    "Mechanical part": "Cinematic exploded bracket turntable with stress-hotspot glow and export-ready edge highlights.",
    "Architecture/BIM module": "Immersive coordination module with metadata halos, staged cutaways, and review-gate overlays.",
    Fixture: "High-contrast fixture theater with datum rings, tolerance bands, and live manufacturing notes.",
    Enclosure: "Glass-dark enclosure reveal with sectional peelback, ingress surfaces, and release-path callouts.",
    "Custom assembly": "Multi-piece assembly choreography with interface pulses, revision traces, and handoff-state lighting.",
    "Structural frame": "Surreal structural frame vista with load paths rendered as luminous force ribbons across the assembly.",
    "MEP system": "Neon coordination scene with route trails, clash bubbles, and install-sequence overlays for field teams.",
    "Civil/infrastructure package": "Infrastructure command theater with connection nodes, phased revisions, and contractor-ready issue mapping.",
  }[projectType];
}

function recommendedPackage(totalScore: number, budgetBand: BudgetBand, useCase: UseCase): string {
  if (budgetBand === "$50k+" || totalScore >= 18) return "Enterprise Rollout";
  if (budgetBand === "$25k-$50k" || totalScore >= 14 || useCase === "Construction coordination") return "Engineering Pod";
  return "Pilot Sprint";
}

export function analyzeBrief(form: BriefFormState): BriefAnalysis {
  const projectTypeScore = {
    "Mechanical part": 2,
    "Architecture/BIM module": 3,
    Fixture: 2,
    Enclosure: 3,
    "Custom assembly": 4,
    "Structural frame": 4,
    "MEP system": 4,
    "Civil/infrastructure package": 4,
  }[form.projectType];
  const useCaseScore = {
    Prototype: 1,
    "Client review": 2,
    "Production handoff": 3,
    "Reusable library asset": 2,
    "Construction coordination": 3,
  }[form.useCase];
  const sizeScore = { "Pocket-sized": 1, Desktop: 2, Workbench: 3, "Room-scale": 4 }[form.sizeBand];
  const timelineScore = { "Rush (1 week)": 1, "Standard (2-4 weeks)": 2, "Pilot (1-2 months)": 3, "Program (quarter+)": 4 }[form.timeline];
  const priorityScore = { Rush: 1, Standard: 2, "High rigor": 3 }[form.priority];
  const budgetScore = { "< $10k": 1, "$10k-$25k": 2, "$25k-$50k": 3, "$50k+": 4 }[form.budgetBand];
  const dimensionScore = getDimensionScore(form.dimensions);
  const exportScore = Math.max(1, form.selectedExports.length);
  const noteLength = form.notes.trim().length;
  const clarityBonus = noteLength >= 80 ? 0 : noteLength >= 35 ? 1 : 2;
  const totalScore = projectTypeScore + useCaseScore + sizeScore + timelineScore + priorityScore + budgetScore + dimensionScore + exportScore + clarityBonus;
  const blockers: string[] = [];
  if (!form.selectedExports.length) blockers.push("Select at least one export target.");
  if (noteLength < 35) blockers.push("Add acceptance criteria or tolerance details.");
  if (form.budgetBand === "< $10k" && totalScore > 12) blockers.push("The current budget band may be tight for this scope.");
  return {
    scopeLabel: totalScore <= 10 ? "Discovery brief" : totalScore <= 14 ? "Qualified pilot" : totalScore <= 19 ? "Delivery-ready scope" : "Multi-workstream engagement",
    effortHours: 8 + totalScore * 3,
    readiness: Math.max(48, Math.min(98, 100 - blockers.length * 16 - clarityBonus * 4 + Math.min(10, form.selectedExports.length * 3))),
    blockers,
    nextStep: blockers.length > 0 ? "Collect the missing context before pricing." : form.priority === "Rush" ? "Send a same-week scope and confirm the handoff gate." : totalScore >= 16 ? "Send a scoped estimate and delivery outline." : "Book a discovery call and confirm constraints.",
    exportPack: form.selectedExports.join(" + ") || "No export target selected",
    totalScore,
    recommendedPackage: recommendedPackage(totalScore, form.budgetBand, form.useCase),
    recommendedSector: recommendedSector(form.projectType),
    surrealDirection: surrealDirection(form.projectType),
  };
}

export function buildPreview(form: BriefFormState, analysis: BriefAnalysis, exportTargets: ExportTarget[]) {
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
    `- Scope tier: ${analysis.scopeLabel}`,
    `- Estimated effort: ${analysis.effortHours} hours`,
    `- Readiness: ${analysis.readiness}%`,
    `- Recommended package: ${analysis.recommendedPackage}`,
    `- Recommended sector: ${analysis.recommendedSector}`,
    `- Next step: ${analysis.nextStep}`,
    "",
    "## Surreal model direction",
    analysis.surrealDirection,
    "",
    "## Notes",
    form.notes.trim() || "No additional notes supplied.",
  ].join("\n");
}

export function buildBriefResponse(form: BriefFormState, exportTargets: ExportTarget[]): BriefResponse {
  const analysis = analyzeBrief(form);
  return { ok: true, slug: slugify(form.projectName) || "project-brief", analysis, preview: buildPreview(form, analysis, exportTargets), generatedAt: new Date().toISOString() };
}