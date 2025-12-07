"use client";

import dynamic from "next/dynamic";

const SupervisorOperators = dynamic(
  () => import("@/modules/supervisor/operators/components/Operators"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function SupervisorOperatorsPage() {
  return <SupervisorOperators />;
}
