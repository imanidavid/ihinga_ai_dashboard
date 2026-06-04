import { createFileRoute } from "@tanstack/react-router";
import { useRole } from "@/components/role-provider";
import { FarmerDashboard } from "@/components/dashboards/farmer-dashboard";
import { OfficerDashboard } from "@/components/dashboards/officer-dashboard";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { role } = useRole();
  if (role === "officer") return <OfficerDashboard />;
  if (role === "farmer" || !role) return <FarmerDashboard />;
  return <StubDashboard role={role} />;
}
