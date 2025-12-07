"use client";
// import Operators from "@/modules/accountant/employees/components/Operators";
import dynamic from "next/dynamic";
const Operators = dynamic(
  () => import("@/modules/accountant/employees/components/Operators"),
  {
    ssr: false,
    loading: () => <p>Загрузка...</p>,
  }
);

export default function AccountantOperatorsPage() {
  return (
    <div>
      <Operators />
    </div>
  );
}
