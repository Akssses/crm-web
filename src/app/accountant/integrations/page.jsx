"use client";

import dynamic from "next/dynamic";
const Integrations = dynamic(
  () => import("@/modules/admin/integrations/components/Integrations"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function IntegrationsPage() {
  return <Integrations />;
}
