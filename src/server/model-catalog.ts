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
  buyer: string;
  useCase: string;
  lod: string;
  units: string;
  tolerance: string;
  coordinateSystem: string;
  sourceInputs: string[];
  validationChecks: string[];
  complianceSignals: string[];
  deliveryAssets: string[];
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
    buyer: "Construtora residencial, incorporadora boutique e engenharia de aprovação",
    useCase: "Venda antecipada, aprovação executiva, estudo de fachada e briefing BIM inicial",
    lod: "LOD 300 visual + BIM-ready metadata shell",
    units: "Metric · meters and millimeters",
    tolerance: "±20 mm architectural envelope / ±2 mm export mesh cleanup",
    coordinateSystem: "Local project origin, true-north note required before IFC handoff",
    sourceInputs: ["Text brief", "Floor plan image", "Facade references", "Material moodboard"],
    validationChecks: ["Watertight GLB preview", "PBR material assignment", "Scale sanity check", "Room/program coverage", "AR/USDZ launch test"],
    complianceSignals: ["Licensable asset lineage", "Human approval before construction use", "Non-structural visual model disclaimer"],
    deliveryAssets: ["GLB viewer package", "STL concept mass", "USDZ AR preview", "PNG floor-plan board", "Buyer render brief"],
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
    buyer: "Gestor de ativos, construtora comercial, corretora B2B e tenant-rep",
    useCase: "Leasing, fit-out preliminar, apresentação para locatário e pacote de obra fria",
    lod: "LOD 300 shell + tenant-zone annotations",
    units: "Metric · meters and square meters",
    tolerance: "±25 mm shell envelope / ±5 mm fixture clearance narrative",
    coordinateSystem: "Local store grid with lease-line reference",
    sourceInputs: ["PDF plan", "Existing listing media", "Site photos", "Tenant requirements"],
    validationChecks: ["Lease-line dimensions", "Clear-height tags", "Opening/egress review", "OBJ material split", "PDF handoff present"],
    complianceSignals: ["Commercial-use extended license", "Tenant fit-out assumptions labeled", "Approval memo required before construction"],
    deliveryAssets: ["GLB shell", "OBJ fit-out zones", "PDF leasing board", "Fixture scenario notes", "Broker visual pack"],
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
    buyer: "Incorporadora, estúdio de interiores, corretor premium e marketing imobiliário",
    useCase: "Apartamento decorado virtual, campanha de lançamento, variações de acabamento e tour de venda",
    lod: "LOD 300 interior visual + finish schedule",
    units: "Metric · meters, room areas and furniture scale",
    tolerance: "±15 mm furniture clearance / visual-grade lighting validation",
    coordinateSystem: "Room-local origin per staged environment",
    sourceInputs: ["Room photos", "Floor plan", "Finish references", "Buyer persona"],
    validationChecks: ["Furniture collision pass", "Lighting exposure check", "Material naming", "USDZ scale preview", "Finish schedule completeness"],
    complianceSignals: ["Furniture/texture licensing declared", "Marketing-only disclaimer", "Client signoff for substitutions"],
    deliveryAssets: ["GLB staged scene", "USDZ room AR", "OBJ room pack", "Finish board", "Render shot list"],
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
    buyer: "Diretor técnico, BIM manager, incorporadora vertical e engenharia de fachada",
    useCase: "Massing executivo, estudo de fachada, IFC de coordenação e pacote investidor",
    lod: "LOD 300 massing + IFC property-set readback",
    units: "Metric · meters, floors, GFA and facade modules",
    tolerance: "±50 mm massing / facade module grid labeled, not fabrication-certified",
    coordinateSystem: "Project base point + north orientation + level datum",
    sourceInputs: ["Zoning brief", "Facade references", "Tower program", "Parking/area assumptions"],
    validationChecks: ["IFC property-set presence", "Level stack consistency", "Facade rhythm review", "Area schedule sanity", "PDF investor pack generated"],
    complianceSignals: ["BIM audit trail", "Engineering review required", "Investor-facing assumptions disclosed"],
    deliveryAssets: ["IFC coordination file", "GLB tower viewer", "Facade PDF board", "Area schedule", "Investor deck extract"],
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
    buyer: "Hotelaria, incorporadora de luxo, resort developer e arquitetura comercial",
    useCase: "Campanha de villa, estudo de implantação, experiência AR para vendas internacionais",
    lod: "LOD 300 visual + landscape context",
    units: "Metric · meters, terrain levels and room areas",
    tolerance: "±30 mm architectural envelope / terrain context is advisory",
    coordinateSystem: "Local terrain origin with landscape reference markers",
    sourceInputs: ["Drone imagery", "Moodboard", "Hospitality program", "Landscape references"],
    validationChecks: ["Terrain/context alignment", "Interior/exterior scene continuity", "Hospitality room program", "USDZ preview", "Campaign export checklist"],
    complianceSignals: ["Image/reference provenance", "Marketing-use scope", "Site survey required before construction"],
    deliveryAssets: ["GLB villa scene", "USDZ AR preview", "STL massing", "Landscape render board", "Campaign PDF"],
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
    buyer: "Incorporadora premium, imobiliária de alto padrão e equipe de personalização",
    useCase: "Venda de cobertura, personalização de acabamentos, tour AR e material para corretores",
    lod: "LOD 300 interior/exterior visual + finish variants",
    units: "Metric · meters, ceiling height and terrace areas",
    tolerance: "±15 mm interior clearance / ±25 mm terrace envelope",
    coordinateSystem: "Unit-local origin with terrace datum",
    sourceInputs: ["Apartment plan", "Terrace photos", "Finish references", "Sales script"],
    validationChecks: ["Duplex circulation check", "Terrace boundary review", "Lighting pass", "OBJ material grouping", "AR preview scale"],
    complianceSignals: ["Marketing-only model scope", "Finish substitutions labeled", "Broker asset rights declared"],
    deliveryAssets: ["GLB duplex tour", "USDZ AR preview", "OBJ material pack", "Hero render board", "Broker one-pager"],
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
