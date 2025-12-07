"use client";

import dynamic from "next/dynamic";

const Clients = dynamic(
  () => import("@/modules/operator/clients/components/Clients"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function OperatorClientsPage() {
  return <Clients />;
}
