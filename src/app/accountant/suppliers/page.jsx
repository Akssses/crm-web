"use client";

import dynamic from "next/dynamic";

const SuppliersPayouts = dynamic(
  () => import("@/modules/accountant/payments/components/SuppliersPayouts"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function AccountantSuppliersPayoutsPage() {
  return <SuppliersPayouts />;
}
