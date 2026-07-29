"use client";

import { catalogListings, type CatalogListing } from "../../src/server/model-catalog";
import CatalogListingDetail from "../../src/data/catalog/catalog-listing-detail";

type Props = {
  params: {
    id?: string;
    slug?: string;
  };
};

export default function CatalogDetailPage({ params }: Props) {
  const resolvedId =
    params.id && catalogListings.some((item) => item.id === params.id)
      ? params.id
      : params.slug
        ? catalogListings.find((item) => item.slug === params.slug)?.id
        : undefined;

  const listing = catalogListings.find((item) => item.id === resolvedId);

  if (!listing) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-14 text-center text-white/70">
        <h1 className="text-2xl font-semibold">Pacote não encontrado</h1>
        <p className="mt-2">Esse item do catálogo não existe ou foi removido.</p>
      </div>
    );
  }

  return <div><CatalogListingDetail listingId={listing.id} /></div>;
}
