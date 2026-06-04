import { createFileRoute } from "@tanstack/react-router";
import { FarmerDashboard } from "@/components/dashboards/farmer-dashboard";
import { useRole } from "@/components/role-provider";
import { useEffect } from "react";

export const Route = createFileRoute("/farmer")({
  component: FarmerPage,
});

function FarmerPage() {
  const { setRole } = useRole();
  useEffect(() => {
    setRole("farmer");
  }, [setRole]);

  return <FarmerDashboard />;
}
