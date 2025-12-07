"use client";

import dynamic from "next/dynamic";
const Payments = dynamic(
  () => import("@/modules/accountant/payments/components/Payments"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function PaymentsPage() {
  return <Payments />;
}
