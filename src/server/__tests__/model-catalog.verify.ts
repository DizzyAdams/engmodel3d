import { catalogListings, type CatalogListing } from "../model-catalog.js";

const EXPECTED_IDS = [
  "casa-contemporanea-listing",
  "loja-comercial-shell",
  "apartamento-decorado-listing",
  "torre-comercial-listing",
  "villa-resort-listing",
  "cobertura-duplex-listing",
];

const FILTERS = [
  { filter: "all", expected: 6 },
  { filter: "residential", expected: 2 },
  { filter: "commercial", expected: 2 },
  { filter: "interior", expected: 2 },
  { filter: "bim", expected: 3 },
];

const REQUIRED_LIST_FIELDS: Array<keyof CatalogListing> = [
  "buyer",
  "useCase",
  "lod",
  "units",
  "tolerance",
  "coordinateSystem",
  "sourceInputs",
  "validationChecks",
  "complianceSignals",
  "deliveryAssets",
];

let failed = false;

for (const id of EXPECTED_IDS) {
  const found = catalogListings.some((item: CatalogListing) => item.id === id);
  if (!found) {
    console.log("fail missing listing", id);
    failed = true;
  }
}

for (const caseItem of FILTERS) {
  const q = caseItem.filter.toLowerCase();
  const count = catalogListings.filter((item: CatalogListing) => {
    if (caseItem.filter === "all") return true;
    const matchesTags = item.tags.includes(q);
    const matchesCategory = item.category.toLowerCase().includes(q);
    return matchesTags || matchesCategory;
  }).length;
  if (count !== caseItem.expected) {
    console.log("fail filter", caseItem.filter, "expected", caseItem.expected, "got", count);
    failed = true;
  }
}

if (catalogListings.length !== EXPECTED_IDS.length) {
  console.log("fail listing count", catalogListings.length, EXPECTED_IDS.length);
  failed = true;
}

const ids = new Set<string>();
const slugs = new Set<string>();
for (const item of catalogListings) {
  if (ids.has(item.id)) {
    console.log("fail duplicate id", item.id);
    failed = true;
  }
  ids.add(item.id);

  if (slugs.has(item.slug)) {
    console.log("fail duplicate slug", item.slug);
    failed = true;
  }
  slugs.add(item.slug);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) {
    console.log("fail invalid slug", item.id, item.slug);
    failed = true;
  }

  for (const field of REQUIRED_LIST_FIELDS) {
    const value = item[field];
    const valid = Array.isArray(value) ? value.length >= 3 : typeof value === "string" && value.trim().length >= 8;
    if (!valid) {
      console.log("fail enterprise field", item.id, field);
      failed = true;
    }
  }

  if (!/(GLB|GLTF|IFC|OBJ|STL|USDZ|PDF)/.test(item.formats)) {
    console.log("fail format coverage", item.id, item.formats);
    failed = true;
  }

  if (!item.lod.includes("LOD")) {
    console.log("fail lod", item.id, item.lod);
    failed = true;
  }
}

if (!failed) {
  console.log("ok catalog listings=%s filtered=%s validated_slugs=%s enterprise_fields=%s", catalogListings.length, FILTERS[1].expected, slugs.size, REQUIRED_LIST_FIELDS.length);
  process.exit(0);
} else {
  console.log("verify failed");
  process.exit(1);
}
