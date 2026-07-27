import type { ParametricFeature } from "./spec.js";

export const parametricLibrary: Record<string, ParametricFeature> = {
  plate: {
    name: "plate",
    description: "Simple parametric plate with configurable dimensions and thickness.",
    values: {
      width: 120,
      height: 80,
      thickness: 8,
    },
  },
  bracket: {
    name: "bracket",
    description: "Structural bracket with flange and hole options.",
    values: {
      width: 140,
      height: 90,
      thickness: 10,
      holes: 4,
    },
  },
  enclosure: {
    name: "enclosure",
    description: "Simple box enclosure for product packaging or small devices.",
    values: {
      width: 180,
      depth: 120,
      height: 70,
      wall: 3,
    },
  },
};

export function getParametricFeature(name: string): ParametricFeature | undefined {
  return parametricLibrary[name];
}

