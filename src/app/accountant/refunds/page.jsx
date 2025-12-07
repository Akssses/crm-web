"use client";

import dynamic from "next/dynamic";
const Refunds = dynamic(
  () => import("@/modules/accountant/refunds/components/Refunds"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function AccountantRefundsPage() {
  return <Refunds />;
}
