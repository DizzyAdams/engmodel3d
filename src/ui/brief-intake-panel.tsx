"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type ExportTarget = {
  format: string;
  filename: string;
  mimeType: string;
};

type BriefIntakePanelProps = {
  exportTargets: ExportTarget[];
};

type ProjectType =
  | "Mechanical part"
  | "Architecture/BIM module"
  | "Fixture"
  | "Enclosure"
  | "Custom assembly";

type UseCase =
  | "Prototype"
  | "Client review"
  | "Production handoff"
  | "Reusable library asset";

type SizeBand = "Pocket-sized" | "Desktop" | "Workbench" | "Room-scale";

type TimelineBand = "Rush (1 week)" | "Standard (2-4 weeks)" | "Pilot (1-2 months)" | "Program (quarter+)";

type Priority = "Rush" | "Standard" | "High rigor";

type BudgetBand = "< $10k" | "$10k-$25k" | "$25k-$50k" | "$50k+";

type BriefFormState = {
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

const projectTypeOptions: ProjectType[] = [
  "Mechanical part",
  "Architecture/BIM module",
  "Fixture",
  "Enclosure",
  "Custom assembly",
];

const useCaseOptions: UseCase[] = ["Prototype", "Client review", "Production handoff", "Reusable library asset"];

const sizeBandOptions: SizeBand[] = ["Pocket-sized", "Desktop", "Workbench", "Room-scale"];

const timelineOptions: TimelineBand[] = ["Rush (1 week)", "Standard (2-4 weeks)", "Pilot (1-2 months)", "Program (quarter+)"];

const priorityOptions: Priority[] = ["Rush", "Standard", "High rigor"];

const budgetOptions: BudgetBand[] = ["< $10k", "$10k-$25k", "$25k-$50k", "$50k+"];

const scoreMap = {
  projectType: {
    "Mechanical part": 2,
    "Architecture/BIM module": 3,
    Fixture: 2,
    Enclosure: 3,
    "Custom assembly": 4,
  },
  useCase: {
    Prototype: 1,
    "Client review": 2,
    "Production handoff": 3,
    "Reusable library asset": 2,
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
};

function createDefaultForm(exportTargets: ExportTarget[]): BriefFormState {
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function normalizeDimensions(dimensions: string) {
  const trimmed = dimensions.trim();
  return trimmed.length > 0 ? trimmed : "dimensions not specified";
}

function getDimensionScore(dimensions: string) {
  const numericTokens = dimensions.match(/\d+(?:\.\d+)?/g) ?? [];
  return Math.max(1, Math.min(4, numericTokens.length || 1));
}

function buildPreview(form: BriefFormState, analysis: ReturnType<typeof analyzeBrief>, exportTargets: ExportTarget[]) {
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
    `Build a ${form.projectType.toLowerCase()} for ${dimensions}. The brief is marked ${form.priority.toLowerCase()} priority, so the first pass should focus on ${{
      "Mechanical part": "mounting interfaces, clearance, and stress hotspots",
      "Architecture/BIM module": "IFC metadata, placement logic, and reuse rules",
      Fixture: "datum control, repeatability, and clamping behavior",
      Enclosure: "wall thickness, access points, and assembly constraints",
      "Custom assembly": "interfaces, tolerance stack-up, and cross-team handoff rules",
    }[form.projectType]}. Deliver ${{
      "Mechanical part": "STEP + STL",
      "Architecture/BIM module": "IFC + GLB",
      Fixture: "STEP + setup notes",
      Enclosure: "STEP + GLB",
      "Custom assembly": "STEP + review package",
    }[form.projectType]} and keep the handoff narrow enough to review in one pass.`,
    "",
    "## Scope summary",
    `- Scope tier: ${analysis.scopeLabel}`,
    `- Estimated effort: ${analysis.effortHours} hours`,
    `- Readiness: ${analysis.readiness}%`,
    `- Recommended next step: ${analysis.nextStep}`,
    `- Primary risk: ${{
      "Mechanical part": "clearance and rib spacing",
      "Architecture/BIM module": "property mapping and assembly context",
      Fixture: "repeatability and service access",
      Enclosure: "fit, ingress, and draft angles",
      "Custom assembly": "coordination gaps between components",
    }[form.projectType]}`,
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

function analyzeBrief(form: BriefFormState) {
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

  const scopeLabel =
    totalScore <= 10
      ? "Discovery brief"
      : totalScore <= 14
        ? "Qualified pilot"
        : totalScore <= 19
          ? "Delivery-ready scope"
          : "Multi-workstream engagement";

  const blockers: string[] = [];
  if (!form.selectedExports.length) {
    blockers.push("Select at least one export target.");
  }
  if (noteLength < 35) {
    blockers.push("Add acceptance criteria or tolerance details.");
  }
  if (form.budgetBand === "< $10k" && totalScore > 12) {
    blockers.push("The current budget band may be tight for this scope.");
  }

  const readiness = Math.max(48, Math.min(98, 100 - blockers.length * 16 - clarityBonus * 4 + Math.min(10, form.selectedExports.length * 3)));

  const nextStep =
    blockers.length > 0
      ? "Collect the missing context before pricing."
      : form.priority === "Rush"
        ? "Send a same-week scope and confirm the handoff gate."
        : totalScore >= 16
        ? "Send a scoped estimate and delivery outline."
        : "Book a discovery call and confirm constraints.";

  return {
    scopeLabel,
    effortHours,
    readiness,
    blockers,
    nextStep,
    exportPack: form.selectedExports.join(" + ") || "No export target selected",
  };
}

export function BriefIntakePanel({ exportTargets }: BriefIntakePanelProps) {
  const [form, setForm] = useState(() => createDefaultForm(exportTargets));
  const [statusMessage, setStatusMessage] = useState("Scope preview updates live as the brief changes.");

  const analysis = analyzeBrief(form);
  const preview = buildPreview(form, analysis, exportTargets);

  function updateField<K extends keyof BriefFormState>(key: K, value: BriefFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleExport(format: string) {
    setForm((current) => {
      const selectedExports = current.selectedExports.includes(format)
        ? current.selectedExports.filter((item) => item !== format)
        : [...current.selectedExports, format];

      return { ...current, selectedExports };
    });
  }

  function downloadPreview() {
    const filename = `${slugify(form.projectName) || "project-brief"}.md`;
    const blob = new Blob([preview], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage(`Downloaded ${filename}.`);
  }

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(preview);
      setStatusMessage("Brief preview copied to the clipboard.");
    } catch {
      setStatusMessage("Copy failed. Use the download button instead.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    downloadPreview();
  }

  return (
    <section className="panel panel--stacked panel--wide brief-intake" id="intake">
      <div className="panel__header">
        <div>
          <p className="section-label">Brief intake</p>
          <h3>Generate a scoped handoff preview from three inputs</h3>
          <p className="section-subtitle">
            Capture project type, dimensions, and priority, then export a concrete brief preview you can attach to the
            follow-up.
          </p>
        </div>
        <div className="status-pill status-pill--soft">{analysis.scopeLabel}</div>
      </div>

      <div className="brief-intake__grid">
        <form className="brief-intake__form" onSubmit={handleSubmit}>
          <div className="brief-intake__fields">
            <label className="brief-intake__field brief-intake__field--full">
              <span>Project name</span>
              <input
                className="brief-intake__input"
                value={form.projectName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateField("projectName", event.target.value)}
                placeholder="Cantilever bracket pilot"
              />
            </label>

            <label className="brief-intake__field">
              <span>Project type</span>
              <select
                className="brief-intake__input brief-intake__select"
                value={form.projectType}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField("projectType", event.target.value as ProjectType)}
              >
                {projectTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="brief-intake__field">
              <span>Primary use</span>
              <select
                className="brief-intake__input brief-intake__select"
                value={form.useCase}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField("useCase", event.target.value as UseCase)}
              >
                {useCaseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="brief-intake__field">
              <span>Dimensions</span>
              <input
                className="brief-intake__input"
                value={form.dimensions}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateField("dimensions", event.target.value)}
                placeholder="320 x 180 x 24 mm"
              />
            </label>

            <label className="brief-intake__field">
              <span>Priority</span>
              <select
                className="brief-intake__input brief-intake__select"
                value={form.priority}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField("priority", event.target.value as Priority)}
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="brief-intake__field">
              <span>Budget band</span>
              <select
                className="brief-intake__input brief-intake__select"
                value={form.budgetBand}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField("budgetBand", event.target.value as BudgetBand)}
              >
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="brief-intake__field brief-intake__field--full brief-intake__fieldset">
              <legend>Export targets</legend>
              <div className="brief-intake__toggles">
                {exportTargets.map((target) => {
                  const checked = form.selectedExports.includes(target.format);

                  return (
                    <label className={`brief-intake__toggle ${checked ? "brief-intake__toggle--active" : ""}`} key={target.format}>
                      <input
                        checked={checked}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          event.currentTarget.checked;
                          toggleExport(target.format);
                        }}
                        type="checkbox"
                      />
                      <span>
                        {target.format}
                        <small>{target.filename}</small>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <label className="brief-intake__field brief-intake__field--full">
              <span>Notes</span>
              <textarea
                className="brief-intake__input brief-intake__textarea"
                value={form.notes}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateField("notes", event.target.value)}
                placeholder="Add tolerances, acceptance criteria, production context, or stakeholder notes."
              />
            </label>
          </div>

          <div className="brief-intake__actions">
            <button className="button button--primary" type="submit">
              Download brief preview
            </button>
            <button className="button button--ghost" type="button" onClick={copyPreview}>
              Copy preview
            </button>
          </div>
          <p className="brief-intake__note" aria-live="polite">
            {statusMessage}
          </p>
        </form>

        <div className="brief-intake__results">
          <div className="brief-intake__summary-grid">
            <article className="brief-intake__metric">
              <span>Scope tier</span>
              <strong>{analysis.scopeLabel}</strong>
            </article>
            <article className="brief-intake__metric">
              <span>Estimated effort</span>
              <strong>{analysis.effortHours}h</strong>
            </article>
            <article className="brief-intake__metric">
              <span>Readiness</span>
              <strong>{analysis.readiness}%</strong>
            </article>
            <article className="brief-intake__metric">
              <span>Export pack</span>
              <strong>{analysis.exportPack}</strong>
            </article>
          </div>

          <div className="brief-intake__blockers">
            <div className="brief-intake__subhead">
              <p className="section-label">Clarifications</p>
              <div className="status-pill status-pill--muted">
                {analysis.blockers.length > 0 ? `${analysis.blockers.length} open` : "Ready"}
              </div>
            </div>
            {analysis.blockers.length > 0 ? (
              <ul className="brief-intake__list">
                {analysis.blockers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="brief-intake__empty">The brief is complete enough to move to a discovery call.</p>
            )}
          </div>

          <div className="brief-intake__preview">
            <div className="brief-intake__subhead">
              <div>
                <p className="section-label">Preview</p>
                <h4>Downloadable project brief</h4>
              </div>
              <div className="status-pill status-pill--soft">{analysis.nextStep}</div>
            </div>
            <pre>{preview}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
