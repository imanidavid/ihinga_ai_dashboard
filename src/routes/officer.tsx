import { createFileRoute } from "@tanstack/react-router";
import { OfficerDashboard } from "@/components/dashboards/officer-dashboard";
import { useRole } from "@/components/role-provider";
import { useEffect } from "react";

export const Route = createFileRoute("/officer")({
  component: OfficerPage,
});

function OfficerPage() {
  const { setRole } = useRole();
  useEffect(() => {
    setRole("officer");
  }, [setRole]);

  return <OfficerDashboard />;
}
