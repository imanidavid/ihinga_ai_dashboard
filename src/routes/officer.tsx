import { createFileRoute } from "@tanstack/react-router";
import { OfficerDashboard } from "@/components/dashboards/officer-dashboard";

export const Route = createFileRoute("/officer")({
  component: OfficerDashboard,
});
