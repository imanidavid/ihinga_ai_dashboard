import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";
import { useRole } from "@/components/role-provider";
import { useEffect } from "react";

export const Route = createFileRoute("/cooperative")({
  component: CooperativePage,
});

function CooperativePage() {
  const { setRole } = useRole();
  useEffect(() => {
    setRole("cooperative");
  }, [setRole]);

  return <StubDashboard role="cooperative" />;
}
