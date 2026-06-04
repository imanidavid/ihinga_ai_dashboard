import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";

export const Route = createFileRoute("/agronomist")({
  component: () => <StubDashboard role="agronomist" />,
});
