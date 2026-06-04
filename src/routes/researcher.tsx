import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";
import { useRole } from "@/components/role-provider";
import { useEffect } from "react";

export const Route = createFileRoute("/researcher")({
  component: ResearcherPage,
});

function ResearcherPage() {
  const { setRole } = useRole();
  useEffect(() => {
    setRole("researcher");
  }, [setRole]);

  return <StubDashboard role="researcher" />;
}
