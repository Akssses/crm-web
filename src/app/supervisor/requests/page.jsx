"use client";

import dynamic from "next/dynamic";

const Requests = dynamic(
  () => import("@/modules/operator/requests/components/Requests"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorRequestsPage() {
  return <Requests hideCreateButton />;
}
