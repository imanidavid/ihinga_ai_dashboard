import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";

export const Route = createFileRoute("/researcher")({
  component: () => <StubDashboard role="researcher" />,
});
