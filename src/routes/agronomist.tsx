import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";
import { useRole } from "@/components/role-provider";
import { useEffect } from "react";

export const Route = createFileRoute("/agronomist")({
  component: AgronomistPage,
});

function AgronomistPage() {
  const { setRole } = useRole();
  useEffect(() => {
    setRole("agronomist");
  }, [setRole]);

  return <StubDashboard role="agronomist" />;
}
