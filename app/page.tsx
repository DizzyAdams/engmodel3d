import { AppShell } from "../src/ui/app-shell";
import { DashboardScreen } from "../src/ui/dashboard-screen";
import { getDashboardData } from "../src/server/mock-data";

export default function HomePage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Model3DEng"
      eyebrow="Surreal AI-assisted 3D engineering workspace"
      subtitle="Brief a part, pressure-test it against a live swarm, and turn the result into a cinematic engineering cockpit with export-ready proof before anything ships."
    >
      <DashboardScreen data={data} />
    </AppShell>
  );
}
