"use client";

import dynamic from "next/dynamic";

const CustomerOrders = dynamic(
  () => import("@/modules/customer/orders/components/Orders"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerOrdersPage() {
  return <CustomerOrders />;
}
