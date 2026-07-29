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

if (!failed) {
  console.log("ok catalog listings=%s filtered=%s", catalogListings.length, FILTERS[1].expected);
  process.exit(0);
} else {
  console.log("verify failed");
  process.exit(1);
}
