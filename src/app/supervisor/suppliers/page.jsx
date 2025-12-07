"use client";

import dynamic from "next/dynamic";

const SupervisorSuppliers = dynamic(
  () => import("@/modules/supervisor/suppliers/components/Suppliers"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorSuppliersPage() {
  return <SupervisorSuppliers />;
}
