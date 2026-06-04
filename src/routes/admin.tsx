import { createFileRoute } from "@tanstack/react-router";
import { StubDashboard } from "@/components/dashboards/stub-dashboard";
import { useRole } from "@/components/role-provider";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { setRole } = useRole();
  useEffect(() => {
    setRole("admin");
  }, [setRole]);

  return <StubDashboard role="admin" />;
}
