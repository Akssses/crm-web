"use client";

import dynamic from "next/dynamic";

const CustomerDashboard = dynamic(
  () => import("@/modules/customer/dashboard/components/Dashboard"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerDashboardPage() {
  return <CustomerDashboard />;
}
