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
  if (role === "farmer") return <FarmerDashboard />;
  if (role === "cooperative" || role === "agronomist" || role === "researcher" || role === "admin") {
    return <StubDashboard role={role} />;
  }
  
  // Default to farmer if role is missing (should be handled by Root shell redirect, 
  // but if role param is used, we need to show something).
  return <FarmerDashboard />;
}
