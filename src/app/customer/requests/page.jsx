"use client";

import dynamic from "next/dynamic";

const CustomerRequests = dynamic(
  () => import("@/modules/customer/requests/components/Requests"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerRequestsPage() {
  return <CustomerRequests />;
}
