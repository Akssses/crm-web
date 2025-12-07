"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@/modules/admin/reports/components/Analytics"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorAnalyticsPage() {
  return <Analytics />;
}
