import type { ProjectRecord } from "../server/mock-data";

type ModelPreviewPlaceholderProps = {
  project: ProjectRecord;
  id?: string;
};

export function ModelPreviewPlaceholder({ project, id }: ModelPreviewPlaceholderProps) {
  return (
    <section className="panel panel--preview" id={id}>
      <div className="panel__header">
        <div>
          <p className="section-label">Model preview</p>
          <h2>Deterministic preview stage</h2>
          <p className="section-subtitle">
            Reserved for a future Three.js or React Three Fiber scene, with a static fallback for review.
          </p>
        </div>
        <div className="status-pill">Review only</div>
      </div>

      <div className="preview-stage" aria-label={`${project.name} deterministic preview stage`}>
        <div className="preview-stage__grid" />
        <div className="preview-stage__mesh" />
        <div className="preview-stage__badge">
          {project.dimensions} | export target {project.exportTarget}
        </div>
      </div>
    </section>
  );
}
