export type CatalogListing = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  license: string;
  qualityScore: string;
  formats: string;
  delivery: string;
  signal: string;
  tags: string[];
  launchPackages?: Array<{
    startupPhase: string;
    packageName: string;
    fullDeliverables: string;
    launchPrice: string;
    eligibilityRequirement: string;
  }>;
  rotationPreviewModels?: Array<{
    rotationId: string;
    status: string;
    timing: string;
    modelType: string;
  }>;
  integrationProof?: Array<{
    type: string;
    experienceId: string;
    location: string;
    status: string;
  }>;
};

export const catalogListings: CatalogListing[] = [
  {
    id: "casa-contemporanea-listing",
    slug: "casa-contemporanea",
    name: "Casa contemporânea",
    category: "Residential",
    price: "R$ 4.200",
    license: "Standard",
    qualityScore: "94",
    formats: "GLB / GLTF / STL / USDZ",
    delivery: "Immediate",
    signal: "Buyer-ready residential package with validated geometry and PBR materials.",
    tags: ["residential", "bim", "prefab"],
    launchPackages: [
      {
        startupPhase: "MVP",
        packageName: "MVP residential",
        fullDeliverables: "3D model + PBR materials + floor plan PNG + USDZ viewer",
        launchPrice: "R$ 4.200",
        eligibilityRequirement: "Purchase via catalog",
      },
      {
        startupPhase: "Growth",
        packageName: "Residential campaign",
        fullDeliverables: "Model + staging variants + rendered hero + Instagram kit",
        launchPrice: "R$ 12.800",
        eligibilityRequirement: "Attribution required",
      },
    ],
    rotationPreviewModels: [
      {
        rotationId: "rotation-01",
        status: "Ready",
        timing: "0-30s",
        modelType: "Interactive viewer",
      },
      {
        rotationId: "rotation-02",
        status: "Ready",
        timing: "30-60s",
        modelType: "AR preview",
      },
    ],
    integrationProof: [
      {
        type: "Hero",
        experienceId: "MCE-7821",
        location: "Dashboard",
        status: "Shown",
      },
    ],
  },
  {
    id: "loja-comercial-shell",
    slug: "loja-comercial",
    name: "Loja comercial shell",
    category: "Commercial",
    price: "R$ 6.500",
    license: "Extended",
    qualityScore: "90",
    formats: "GLTF / GLB / OBJ / PDF",
    delivery: "3 business days",
    signal: "Commercial shell model with structural reads, floor plan and sales-ready exports.",
    tags: ["commercial", "bim"],
    launchPackages: [
      {
        startupPhase: "MVP",
        packageName: "Commercial MVP",
        fullDeliverables: "Shell model + floor plan + commercial PDF kit",
        launchPrice: "R$ 6.500",
        eligibilityRequirement: "Purchase via catalog",
      },
      {
        startupPhase: "Scale",
        packageName: " leasing package",
        fullDeliverables: "Shell + tenant layout pack + rendered stills",
        launchPrice: "R$ 18.900",
        eligibilityRequirement: "Meeting required",
      },
    ],
    rotationPreviewModels: [
      {
        rotationId: "rotation-01",
        status: "Ready",
        timing: "0-35s",
        modelType: "Interactive viewer",
      },
    ],
    integrationProof: [
      {
        type: "Hero",
        experienceId: "MCE-8844",
        location: "Dashboard",
        status: "Shown",
      },
    ],
  },
  {
    id: "apartamento-decorado-listing",
    slug: "apartamento-decorado",
    name: "Apartamento decorado",
    category: "Interior",
    price: "R$ 3.900",
    license: "Standard",
    qualityScore: "92",
    formats: "GLB / GLTF / USDZ / OBJ",
    delivery: "Immediate",
    signal: "Decorated interior package with staged scenes, lighting and buy-ready renders.",
    tags: ["interior", "epc", "prefab"],
    launchPackages: [
      {
        startupPhase: "MVP",
        packageName: "Interior MVP",
        fullDeliverables: "Decorated model + staging variants + USDZ preview",
        launchPrice: "R$ 3.900",
        eligibilityRequirement: "Purchase via catalog",
      },
      {
        startupPhase: "Growth",
        packageName: "Interior campaign",
        fullDeliverables: "Model + rendered stills + social cuts + PDF brochure",
        launchPrice: "R$ 11.400",
        eligibilityRequirement: "Attribution required",
      },
    ],
    rotationPreviewModels: [
      {
        rotationId: "rotation-01",
        status: "Ready",
        timing: "0-25s",
        modelType: "Interactive viewer",
      },
      {
        rotationId: "rotation-02",
        status: "Ready",
        timing: "25-50s",
        modelType: "AR preview",
      },
    ],
    integrationProof: [
      {
        type: "Hero",
        experienceId: "MCE-9901",
        location: "Dashboard",
        status: "Shown",
      },
    ],
  },
  {
    id: "torre-comercial-listing",
    slug: "torre-comercial",
    name: "Torre comercial",
    category: "Commercial",
    price: "R$ 9.800",
    license: "Extended",
    qualityScore: "95",
    formats: "GLTF / GLB / IFC / PDF",
    delivery: "5 business days",
    signal: "High-rise commercial package with BIM/IFC readback and facade-ready exports.",
    tags: ["commercial", "bim", "industrial"],
    launchPackages: [
      {
        startupPhase: "MVP",
        packageName: "Tower MVP",
        fullDeliverables: "Tower model + IFC readback + PDF kit",
        launchPrice: "R$ 9.800",
        eligibilityRequirement: "Purchase via catalog",
      },
      {
        startupPhase: "Scale",
        packageName: "Tower campaign",
        fullDeliverables: "Model + facade pack + video stills + investor deck",
        launchPrice: "R$ 27.500",
        eligibilityRequirement: "Meeting required",
      },
    ],
    rotationPreviewModels: [
      {
        rotationId: "rotation-01",
        status: "Ready",
        timing: "0-40s",
        modelType: "Interactive viewer",
      },
      {
        rotationId: "rotation-02",
        status: "Ready",
        timing: "40-80s",
        modelType: "AR preview",
      },
    ],
    integrationProof: [
      {
        type: "Hero",
        experienceId: "MCE-4410",
        location: "Dashboard",
        status: "Shown",
      },
    ],
  },
  {
    id: "villa-resort-listing",
    slug: "villa-resort",
    name: "Villa resort",
    category: "Residential",
    price: "R$ 7.600",
    license: "Standard",
    qualityScore: "91",
    formats: "GLB / GLTF / STL / USDZ",
    delivery: "4 business days",
    signal: "Resort villa package with landscape, interior staging and campaign-ready exports.",
    tags: ["residential", "prefab", "campaign"],
    launchPackages: [
      {
        startupPhase: "MVP",
        packageName: "Resort MVP",
        fullDeliverables: "Villa model + terrain pack + USDZ preview",
        launchPrice: "R$ 7.600",
        eligibilityRequirement: "Purchase via catalog",
      },
      {
        startupPhase: "Growth",
        packageName: "Resort campaign",
        fullDeliverables: "Model + rendered stills + video frames + PDF brochure",
        launchPrice: "R$ 21.000",
        eligibilityRequirement: "Attribution required",
      },
    ],
    rotationPreviewModels: [
      {
        rotationId: "rotation-01",
        status: "Ready",
        timing: "0-35s",
        modelType: "Interactive viewer",
      },
      {
        rotationId: "rotation-02",
        status: "Ready",
        timing: "35-70s",
        modelType: "Video export",
      },
    ],
    integrationProof: [
      {
        type: "Hero",
        experienceId: "MCE-5523",
        location: "Dashboard",
        status: "Shown",
      },
    ],
  },
  {
    id: "cobertura-duplex-listing",
    slug: "cobertura-duplex",
    name: "Cobertura duplex",
    category: "Interior",
    price: "R$ 5.100",
    license: "Extended",
    qualityScore: "93",
    formats: "GLB / GLTF / USDZ / OBJ",
    delivery: "Immediate",
    signal: "Duplex penthouse package with furnished interiors, lighting and buyer-ready exports.",
    tags: ["interior", "epc", "campaign"],
    launchPackages: [
      {
        startupPhase: "MVP",
        packageName: "Penthouse MVP",
        fullDeliverables: "Duplex model + interior staging + USDZ preview",
        launchPrice: "R$ 5.100",
        eligibilityRequirement: "Purchase via catalog",
      },
      {
        startupPhase: "Scale",
        packageName: "Penthouse campaign",
        fullDeliverables: "Model + hero renders + social cuts + PDF brochure",
        launchPrice: "R$ 15.200",
        eligibilityRequirement: "Meeting required",
      },
    ],
    rotationPreviewModels: [
      {
        rotationId: "rotation-01",
        status: "Ready",
        timing: "0-30s",
        modelType: "Interactive viewer",
      },
    ],
    integrationProof: [
      {
        type: "Hero",
        experienceId: "MCE-6634",
        location: "Dashboard",
        status: "Shown",
      },
    ],
  },
];
