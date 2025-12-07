"use client";

import dynamic from "next/dynamic";
const Reports = dynamic(
  () => import("@/modules/admin/reports/components/Reports"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function ReportsPage() {
  return <Reports />;
}
