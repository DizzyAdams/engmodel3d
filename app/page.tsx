import { AppShell } from "../src/ui/app-shell";
import { DashboardScreen } from "../src/ui/dashboard-screen";
import { getDashboardData } from "../src/server/mock-data";

export default function HomePage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Model3DEng"
      eyebrow="Engineering workspace"
      subtitle="Define the part, review the geometry, validate the constraints, and export a decision-ready package."
    >
      <DashboardScreen data={data} />
    </AppShell>
  );
}
