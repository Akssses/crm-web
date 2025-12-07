"use client";

import dynamic from "next/dynamic";

const CustomerCreateRequest = dynamic(
  () => import("@/modules/customer/requests/components/CreateRequest"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerCreateRequestPage() {
  return <CustomerCreateRequest />;
}
