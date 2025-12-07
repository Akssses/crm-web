"use client";

import dynamic from "next/dynamic";
const Organizations = dynamic(
  () => import("@/modules/admin/organizations/components/Organizations"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function OrganizationsPage() {
  return <Organizations />;
}
