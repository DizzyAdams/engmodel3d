"use client";

import { catalogListings } from "@/src/server/model-catalog";

type Props = {
  filter: string;
};

export default function CatalogList({ filter }: Props) {
  const filtered = catalogListings.filter((item) =>
    filter ? item.tags.includes(filter) || item.category.toLowerCase().includes(filter.toLowerCase()) : item
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
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
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="mt-10 text-center text-sm text-white/70">Nenhum modelo encontrado para este filtro.</div>
      ) : null}
    </div>
  );
}
