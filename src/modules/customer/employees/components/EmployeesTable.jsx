"use client";

import React from "react";
import { UITable } from "@/ui";
import { useRouter } from "next/navigation";

const MOCK_EMPLOYEES = [
  {
    id: "EMP-001",
    fullName: "Алина Максим",
    position: "Менеджер",
    phone: "+999 999 999 999",
    email: "example@gmail.com",
    birthday: "15.11.2024",
    citizenship: "RUS",
  },
  {
    id: "EMP-002",
    fullName: "Михаил Иванов",
    position: "Директор",
    phone: "+999 999 999 999",
    email: "example@gmail.com",
    birthday: "15.11.2024",
    citizenship: "KGZ",
  },
];

export default function EmployeesTable({ rows = MOCK_EMPLOYEES }) {
  const router = useRouter();

  const columns = [
    { key: "fullName", label: "ФИО" },
    { key: "position", label: "Должность" },
    { key: "phone", label: "Телефон" },
    { key: "email", label: "E-mail" },
    { key: "birthday", label: "Дата рождения" },
    { key: "citizenship", label: "Гражданство" },
  ];

  const handleRowClick = (row) => {
    router.push(`/customer/employees/${row.id}`);
  };

  return (
    <UITable
      columns={columns}
      rows={rows}
      showCheckbox={true}
      onRowClick={handleRowClick}
    />
  );
}


