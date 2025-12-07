"use client";

import dynamic from "next/dynamic";

const Balance = dynamic(
  () => import("@/modules/customer/balance/components/Balance"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerBalancePage() {
  return <Balance />;
}
