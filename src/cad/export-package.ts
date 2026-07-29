import type { ProjectRecord } from "../server/mock-data";

export interface EngineeringWorkbenchDerivedState {
  massKg: number;
  stress: number;
  fos: number;
  allowableStress: number;
  allowableLoad: number;
  utilization: number;
  reserve: number;
  deflection: number;
  volumeCm3: number;
  validity: string;
  materialLabel: string;
  materialLimit: number;
  safetyFactor: number;
}

export interface EngineeringWorkbenchExportState {
  width: number;
  height: number;
  thickness: number;
  load: number;
  material: string;
  safetyFactor: number;
  derived: EngineeringWorkbenchDerivedState;
}

export interface EngineeringExportFileEntry {
  filename: string;
  mimeType: string;
  status: "ready" | "pending-kernel";
  description: string;
  contentPreview?: string;
}

export interface EngineeringExportSnapshot {
  schema: "model3deng.engineering-export.snapshot";
  schemaVersion: 1;
  generatedAt: string;
  limitation: string;
  project: {
    id: string;
    name: string;
    category: string;
    summary: string;
    status: string;
    owner: string;
    exportTarget: string;
    lastRevision: string;
    dimensions: string;
    confidence: string;
    validationState: string;
    generatedBy: string;
    nextAction: string;
    tags: string[];
  };
  workbench: EngineeringWorkbenchExportState;
  engineering: ProjectRecord["engineering"];
  kpis: ProjectRecord["kpis"];
  calculations: ProjectRecord["calculations"];
  risks: ProjectRecord["risks"];
  features: ProjectRecord["features"];
  validationChecks: ProjectRecord["validationChecks"];
  exportReadiness: ProjectRecord["exportReadiness"];
  revisions: ProjectRecord["revisions"];
  comparison: ProjectRecord["comparison"];
  compliance: ProjectRecord["compliance"];
  versions: ProjectRecord["versions"];
  activity: ProjectRecord["activity"];
}

export interface EngineeringExportManifest {
  schema: "model3deng.engineering-export.manifest";
  schemaVersion: 1;
  generatedAt: string;
  limitation: string;
  projectId: string;
  projectName: string;
  sourceRevision: string;
  files: EngineeringExportFileEntry[];
}

export interface EngineeringExportBundle {
  snapshot: EngineeringExportSnapshot;
  manifest: EngineeringExportManifest;
}

const exportLimitation =
  "This browser export generates STL and GLB from the live mesh. STEP remains pending until a CAD kernel or server-side STEP exporter is connected.";

function createExportSlug(project: ProjectRecord): string {
  return project.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function buildEngineeringExportSnapshot(
  project: ProjectRecord,
  state: EngineeringWorkbenchExportState,
  generatedAt: string,
): EngineeringExportSnapshot {
  return {
    schema: "model3deng.engineering-export.snapshot",
    schemaVersion: 1,
    generatedAt,
    limitation: exportLimitation,
    project: {
      id: project.id,
      name: project.name,
      category: project.category,
      summary: project.summary,
      status: project.status,
      owner: project.owner,
      exportTarget: project.exportTarget,
      lastRevision: project.lastRevision,
      dimensions: project.dimensions,
      confidence: project.confidence,
      validationState: project.validationState,
      generatedBy: project.generatedBy,
      nextAction: project.nextAction,
      tags: project.tags,
    },
    workbench: state,
    engineering: project.engineering,
    kpis: project.kpis,
    calculations: project.calculations,
    risks: project.risks,
    features: project.features,
    validationChecks: project.validationChecks,
    exportReadiness: project.exportReadiness,
    revisions: project.revisions,
    comparison: project.comparison,
    compliance: project.compliance,
    versions: project.versions,
    activity: project.activity,
  };
}

export function buildEngineeringExportManifest(
  project: ProjectRecord,
  generatedAt: string,
): EngineeringExportManifest {
  const slug = createExportSlug(project);

  return {
    schema: "model3deng.engineering-export.manifest",
    schemaVersion: 1,
    generatedAt,
    limitation: exportLimitation,
    projectId: project.id,
    projectName: project.name,
    sourceRevision: project.lastRevision,
    files: [
      {
        filename: `${slug}.engineering-state.json`,
        mimeType: "application/json",
        status: "ready",
        description: "Canonical engineering brief and live workbench state snapshot.",
      },
      {
        filename: `${slug}.step`,
        mimeType: "application/step",
        status: "pending-kernel",
        description: "STEP remains pending until a CAD kernel or server-side STEP exporter is connected.",
        contentPreview:
          "ISO-10303-21;\nHEADER;\n/* Placeholder only: browser build did not generate geometry */\nENDSEC;\nDATA;\nENDSEC;\nEND-ISO-10303-21;",
      },
      {
        filename: `${slug}.stl`,
        mimeType: "model/stl",
        status: "ready",
        description: "Generated from the live browser mesh for additive-manufacturing review.",
      },
      {
        filename: `${slug}.glb`,
        mimeType: "model/gltf-binary",
        status: "ready",
        description: "Generated from the live browser mesh for a browser or rendering pipeline.",
      },
    ],
  };
}

export function buildEngineeringExportBundle(
  project: ProjectRecord,
  state: EngineeringWorkbenchExportState,
  generatedAt: string,
): EngineeringExportBundle {
  return {
    snapshot: buildEngineeringExportSnapshot(project, state, generatedAt),
    manifest: buildEngineeringExportManifest(project, generatedAt),
  };
}
