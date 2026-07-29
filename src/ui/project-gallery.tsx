"use client";

import type { ProjectRecord } from "../server/mock-data";

type ProjectGalleryProps = {
  project: ProjectRecord;
};

const GALLERY_IMAGES = [
  {
    label: "Default preview",
    gradient:
      "linear-gradient(135deg, rgba(124,243,255,0.18), rgba(124,155,255,0.18))",
  },
  {
    label: "Massing study",
    gradient:
      "linear-gradient(135deg, rgba(120,244,185,0.18), rgba(124,155,255,0.18))",
  },
  {
    label: "Facade close-up",
    gradient:
      "linear-gradient(135deg, rgba(255,211,109,0.18), rgba(124,243,255,0.18))",
  },
  {
    label: "Site context",
    gradient:
      "linear-gradient(135deg, rgba(124,155,255,0.22), rgba(120,244,185,0.18))",
  },
];

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <section className="panel panel--hero project-gallery" id="project-gallery">
      <div className="panel__header">
        <div>
          <p className="section-label">Model gallery</p>
          <h2>{project.name} previews</h2>
          <p className="section-subtitle">
            Real-time WebGL workbench ready for geometry inspection and material
            variation.
          </p>
        </div>
        <div className="status-pill status-pill--soft">{GALLERY_IMAGES.length} views</div>
      </div>

      <div className="project-gallery__grid">
        {GALLERY_IMAGES.map((image) => (
          <article
            className="project-gallery__cell"
            key={image.label}
            style={{ background: image.gradient }}
          >
            <div className="project-gallery__label">
              <span>{image.label}</span>
              <strong>{project.dimensions}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="project-gallery__actions" style={{ marginTop: 14 }}>
        <span className="catalog-card__license">
          Target format: {project.exportTarget}
        </span>
        <span className="catalog-card__license">
          Validation: {project.validationState}
        </span>
        <span className="catalog-card__license">
          Confidence: {project.confidence}
        </span>
      </div>
    </section>
  );
}
