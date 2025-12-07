"use client";

import dynamic from "next/dynamic";

const Employees = dynamic(
  () => import("@/modules/customer/employees/components/Employees"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function CustomerEmployeesPage() {
  return <Employees />;
}
