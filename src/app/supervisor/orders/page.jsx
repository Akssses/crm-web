"use client";

import dynamic from "next/dynamic";

const Orders = dynamic(
  () => import("@/modules/operator/orders/components/Orders"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorOrdersPage() {
  return <Orders />;
}
