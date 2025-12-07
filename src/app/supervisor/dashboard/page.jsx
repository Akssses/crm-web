"use client";

import dynamic from "next/dynamic";

const SupervisorDashboard = dynamic(
  () => import("@/modules/supervisor/dashboard/components/Dashboard"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorDashboardPage() {
  return <SupervisorDashboard />;
}
