"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  analyzeBrief,
  buildBriefProposal,
  buildBriefPreview,
  budgetOptions,
  createBriefSubmission,
  createDefaultBriefForm,
  priorityOptions,
  projectTypeOptions,
  sizeBandOptions,
  slugify,
  timelineOptions,
  useCaseOptions,
  type BriefAnalysis,
  type BriefFormState,
  type BudgetBand,
  type ExportTarget,
  type Priority,
  type ProjectType,
  type SizeBand,
  type TimelineBand,
  type UseCase,
} from "../server/briefing";

type BriefIntakePanelProps = {
  exportTargets: ExportTarget[];
};

type SavedBriefResponse = {
  ok: boolean;
  submission?: {
    id: string;
    createdAt: string;
    preview: string;
    analysis: BriefAnalysis;
  };
};

export function BriefIntakePanel({ exportTargets }: BriefIntakePanelProps) {
  const [form, setForm] = useState<BriefFormState>(() => createDefaultBriefForm(exportTargets));
  const [statusMessage, setStatusMessage] = useState("Scope preview updates live as the brief changes.");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  const analysis = useMemo(() => analyzeBrief(form), [form]);
  const preview = useMemo(() => buildBriefPreview(form, analysis, exportTargets), [analysis, exportTargets, form]);

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

  function downloadTextFile(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function downloadProposal() {
    const proposal = buildBriefProposal(form, analysis);
    downloadTextFile(JSON.stringify(proposal, null, 2), `${slugify(form.projectName) || "project-brief"}-proposal.json`);
    setStatusMessage("Proposal JSON downloaded for CRM, pricing, or internal review.");
  }

  async function copyPreview() {
    try {
      await navigator.clipboard.writeText(preview);
      setStatusMessage("Brief preview copied to the clipboard.");
    } catch {
      setStatusMessage("Copy failed. Use the download button instead.");
    }
  }

  async function persistBrief() {
    const payload = { form };
    const response = await fetch("/api/intake/briefs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}.`);
    }

    return (await response.json()) as SavedBriefResponse;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const filename = `${slugify(form.projectName) || "project-brief"}.md`;

    try {
      const saved = await persistBrief();
      const backendPreview = saved.submission?.preview ?? preview;
      downloadTextFile(backendPreview, filename);
      setLastSavedId(saved.submission?.id ?? null);
      setStatusMessage(saved.submission?.id ? `Saved ${saved.submission.id} and downloaded ${filename}.` : `Downloaded ${filename}.`);
    } catch {
      const fallback = createBriefSubmission(form, exportTargets);
      downloadTextFile(fallback.preview, filename);
      setLastSavedId(fallback.id);
      setStatusMessage(`Backend unavailable, so a local fallback brief was generated and downloaded as ${filename}.`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="panel panel--stacked panel--wide brief-intake" id="intake">
      <div className="panel__header">
        <div>
          <p className="section-label">Brief intake</p>
          <h3>Generate a scoped handoff preview from a real commercial engineering intake</h3>
          <p className="section-subtitle">
            Capture project type, dimensions, priority, and delivery posture, then turn the result into a buyer-facing scope,
            package recommendation, surreal 3D direction, and backend-saved brief record.
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
              <span>Size band</span>
              <select
                className="brief-intake__input brief-intake__select"
                value={form.sizeBand}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField("sizeBand", event.target.value as SizeBand)}
              >
                {sizeBandOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="brief-intake__field">
              <span>Timeline</span>
              <select
                className="brief-intake__input brief-intake__select"
                value={form.timeline}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField("timeline", event.target.value as TimelineBand)}
              >
                {timelineOptions.map((option) => (
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
                        onChange={() => toggleExport(target.format)}
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
                placeholder="Add tolerances, acceptance criteria, production context, procurement notes, coordination constraints, or stakeholder comments."
              />
            </label>
          </div>

          <div className="brief-intake__actions">
            <button className="button button--primary" type="submit" disabled={isSaving}>
              {isSaving ? "Saving brief..." : "Save + download brief"}
            </button>
            <button className="button button--ghost" type="button" onClick={copyPreview}>
              Copy preview
            </button>
            <button className="button button--ghost" type="button" onClick={downloadProposal}>
              Download proposal JSON
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
            <article className="brief-intake__metric">
              <span>Recommended sector</span>
              <strong>{analysis.recommendedSector}</strong>
            </article>
            <article className="brief-intake__metric">
              <span>Recommended package</span>
              <strong>{analysis.recommendedPackage}</strong>
            </article>
            <article className="brief-intake__metric">
              <span>Price band</span>
              <strong>{analysis.estimatedPriceBand}</strong>
            </article>
            <article className="brief-intake__metric">
              <span>Margin risk</span>
              <strong>{analysis.marginRisk}</strong>
            </article>
          </div>

          <div className="brief-intake__blockers">
            <div className="brief-intake__subhead">
              <p className="section-label">Commercial guidance</p>
              <div className="status-pill status-pill--muted">
                {lastSavedId ? `Saved ${lastSavedId}` : "Live analysis"}
              </div>
            </div>
            <ul className="brief-intake__list">
              <li>{analysis.nextStep}</li>
              <li>{analysis.riskPosture}</li>
              {analysis.exportPresets.map((preset) => <li key={preset}>{preset}</li>)}
              <li>{analysis.surrealDirection}</li>
              {analysis.blockers.length === 0 ? <li key="ready">The brief is complete enough to move to a discovery call or scoped proposal.</li> : null}
              {analysis.blockers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
