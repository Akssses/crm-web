"use client";

import dynamic from "next/dynamic";

const Payments = dynamic(
  () => import("@/modules/customer/payments/components/Payments"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerPaymentsPage() {
  return <Payments />;
}
