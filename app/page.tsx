import { AppShell } from "../src/ui/app-shell";
import { DashboardScreen } from "../src/ui/dashboard-screen";
import { PremiumCatalog } from "../src/ui/premium-catalog";
import { getDashboardData } from "../src/server/mock-data";

export default function HomePage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Model3DEng"
      eyebrow="Construction 3D generation platform"
      subtitle="Generate houses, buildings, commercial spaces and interiors from prompt, plans, images and video, with BIM/IFC, review and sales-ready delivery."
    >
      <DashboardScreen data={data} />
      <PremiumCatalog />
    </AppShell>
  );
}

