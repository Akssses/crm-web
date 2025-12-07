"use client";

import dynamic from "next/dynamic";

const Report = dynamic(
  () => import("@/modules/operator/finance/components/Report"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorShiftsPage() {
  return <Report />;
}
