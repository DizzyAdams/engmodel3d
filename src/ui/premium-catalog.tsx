"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { catalogListings, type CatalogListing } from "../server/model-catalog";

const FILTERS = [
  "all",
  "residential",
  "commercial",
  "interior",
  "bim",
  "industrial",
  "epc",
  "prefab",
  "campaign",
] as const;

type Filter = (typeof FILTERS)[number];

export function PremiumCatalog() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogListings.filter((item) => {
      const matchesQuery =
        !q ||
        [item.name, item.category, item.signal, item.formats, item.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesFilter =
        filter === "all" ||
        item.tags.includes(filter) ||
        item.category.toLowerCase().includes(filter);

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <section className="catalog-panel" id="catalog">
      <div className="catalog-panel__header">
        <div>
          <p className="section-label">Ready-to-buy construction models</p>
          <h3>3D model catalog with delivery packs, formats, and quality score</h3>
        </div>
        <span className="status-pill">Commercial marketplace</span>
      </div>

      <div className="catalog-toolbar">
        <input
          className="catalog-search"
          placeholder="Search models, categories, formats, or tags..."
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        />
        <div className="catalog-filters">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className={option === filter ? "catalog-filter--active" : ""}
              onClick={() => setFilter(option)}
            >
              {option === "all" ? "All models" : option}
            </button>
          ))}
        </div>
      </div>

      <div className="catalog-grid">
        {items.map((item: CatalogListing) => (
          <article className="catalog-card" key={item.id}>
            <div className="catalog-card__top">
              <div>
                <span className="catalog-card__category">{item.category}</span>
                <strong>{item.name}</strong>
              </div>
              <span className="catalog-card__score">{item.qualityScore}/100</span>
            </div>
            <p className="catalog-card__signal">{item.signal}</p>
            <div className="catalog-card__meta">
              <span>{item.price}</span>
              <span>{item.license}</span>
            </div>
            <div className="catalog-card__enterprise">
              <span>{item.lod}</span>
              <span>{item.units}</span>
              <span>{item.tolerance}</span>
            </div>
            <p className="catalog-card__buyer">{item.buyer}</p>
            <div className="catalog-card__proof">
              {item.validationChecks.slice(0, 3).map((check) => (
                <span key={check}>{check}</span>
              ))}
            </div>
            <div className="catalog-card__footer">
              <span className="catalog-card__formats">{item.formats}</span>
              <span className="catalog-card__delivery">{item.delivery}</span>
            </div>
            <div className="catalog-card__actions">
              <a className="button button--primary" href={`/catalog/${item.slug}`}>
                View validation matrix
              </a>
              <a className="button button--ghost" href="/briefs">
                Start governed brief
              </a>
            </div>
          </article>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="catalog-empty">No models match this filter.</p>
      ) : null}
    </section>
  );
}
