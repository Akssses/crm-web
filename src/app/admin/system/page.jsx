"use client";

import dynamic from "next/dynamic";

const SystemAdmin = dynamic(
  () => import("@/modules/admin/system/components/SystemAdmin"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SystemAdminPage() {
  return <SystemAdmin />;
}
