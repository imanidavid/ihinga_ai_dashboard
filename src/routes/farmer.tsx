import { createFileRoute } from "@tanstack/react-router";
import { FarmerDashboard } from "@/components/dashboards/farmer-dashboard";

export const Route = createFileRoute("/farmer")({
  component: FarmerDashboard,
});
