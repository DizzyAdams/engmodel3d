import { AppShell } from "../src/ui/app-shell";
import { DashboardScreen } from "../src/ui/dashboard-screen";
import { getDashboardData } from "../src/server/mock-data";

export default function HomePage() {
  const data = getDashboardData();

  return (
    <AppShell
      title="Model3DEng"
      eyebrow="AI-assisted 3D engineering workspace"
      subtitle="Brief a part, inspect the generated model, and keep humans in the loop before anything ships."
    >
      <DashboardScreen data={data} />
    </AppShell>
  );
}
