"use client";

import dynamic from "next/dynamic";
const Suppliers = dynamic(
  () => import("@/modules/admin/suppliers/components/Suppliers"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SuppliersPage() {
  return <Suppliers />;
}
