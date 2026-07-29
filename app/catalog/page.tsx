"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { CatalogListingDetail } from "../src/data/catalog/catalog-listing-detail";

export default function CatalogPage() {
  const [filter, setFilter] = useState("all");

  return (
    <main className="min-h-screen w-full bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Catálogo de Modelos 3D</h1>
            <p className="mt-2 text-white/70">Modelos profissionais prontos para compra.</p>
          </div>
          <select
            className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white"
            value={filter}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setFilter(event.target.value)}
          >
            <option value="all">Todos</option>
            <option value="residential">Residencial</option>
            <option value="commercial">Comercial</option>
            <option value="interior">Interiores</option>
            <option value="bim">BIM</option>
          </select>
        </div>
      </div>
      <CatalogListingDetail tag={filter} />
    </main>
  );
}
