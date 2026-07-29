"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { catalogListings, type CatalogListing } from "../../server/model-catalog";

const FILTERS = [
  { value: "all", label: "Todos" },
  { value: "residential", label: "Residencial" },
  { value: "commercial", label: "Comercial" },
  { value: "interior", label: "Interiores" },
  { value: "bim", label: "BIM" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export function CatalogListingDetail({ tag = "all", initialId }: { tag?: Filter; initialId?: string }) {
  const selected = useMemo(() => {
    if (initialId) return catalogListings.find((entry: CatalogListing) => entry.id === initialId);
    if (tag !== "all") return catalogListings.find((entry: CatalogListing) => entry.tags.includes(tag));
    return undefined;
  }, [tag, initialId]);

  const items = useMemo(
    () =>
      tag === "all"
        ? catalogListings
        : catalogListings.filter((entry: CatalogListing) => entry.tags.includes(tag)),
    [tag],
  );

  const relatedByTag = useMemo(
    () =>
      selected
        ? catalogListings
            .filter((entry: CatalogListing) => entry.id !== selected.id)
            .filter((entry: CatalogListing) => entry.tags.some((t: string) => selected.tags.includes(t)))
        : [],
    [selected],
  );

  if (selected) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{selected.category}</span>
                <span className="text-xs font-semibold">{selected.qualityScore}/100</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold">{selected.name}</h2>
              <p className="mt-2 text-sm text-white/80">{selected.signal}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span>{selected.price}</span>
                <span className="text-xs font-semibold text-white">{selected.license}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.tags.map((t: string) => (
                  <span key={t} className="rounded-full bg-white/10 px-2 py-1 text-[11px]">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.rotationPreviewModels?.map((rotation: { rotationId: string; modelType: string }) => (
                  <span key={rotation.rotationId} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {rotation.rotationId} · {rotation.modelType}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {selected.formats}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Entrega: {selected.delivery}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <h3 className="text-lg font-semibold">Pacotes</h3>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {selected.launchPackages?.map((pack: { packageName: string; startupPhase: string; fullDeliverables: string; launchPrice: string; eligibilityRequirement: string }) => (
                  <div key={pack.packageName} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold">{pack.startupPhase}</div>
                    <h4 className="mt-1 text-sm font-semibold">{pack.packageName}</h4>
                    <p className="mt-1 text-xs text-white/70">{pack.fullDeliverables}</p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span>{pack.launchPrice}</span>
                      <span className="text-white/70">{pack.eligibilityRequirement}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <h3 className="text-lg font-semibold">Validação e integração</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
                {selected.integrationProof?.map((proof: { experienceId: string; type: string; location: string; status: string }) => (
                  <li key={proof.experienceId}>
                    {proof.type}: {proof.location} · {proof.status}
                    <span className="text-white/60"> {proof.experienceId}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {relatedByTag.length > 0 ? (
          <section className="mt-12">
            <h3 className="text-xl font-semibold">Relacionados</h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedByTag.map((related: CatalogListing) => (
                <div key={related.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
                  <div className="text-xs text-white/70">{related.category}</div>
                  <h4 className="mt-1 text-base font-semibold">{related.name}</h4>
                  <p className="mt-2 text-sm text-white/80">{related.signal}</p>
                  <div className="mt-3">
                    <a className="text-sm underline underline-offset-4" href={`/catalog/${related.id}`}>
                      Abrir pacote
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: CatalogListing) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg transition hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-xs text-white/70">{item.category}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{item.qualityScore}/100</span>
            </div>
            <p className="mt-3 text-sm text-white/80">{item.signal}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/70">
              <span>{item.delivery}</span>
              <span className="font-semibold text-white">{item.price}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t: string) => (
                <span key={t} className="rounded-full bg-white/10 px-2 py-1 text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <a className="text-sm underline underline-offset-4" href={`/catalog/${item.id}`}>
                Abrir pacote
              </a>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 ? (
        <div className="mt-10 text-center text-sm text-white/70">Nenhum modelo encontrado para este filtro.</div>
      ) : null}
    </div>
  );
}
