import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";

export const Route = createFileRoute("/cooperative")({
  component: () => <StubDashboard role="cooperative" />,
});
