"use client";

import dynamic from "next/dynamic";
const Finance = dynamic(
  () => import("@/modules/admin/finance/components/Finance"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function FinancePage() {
  return <Finance />;
}
