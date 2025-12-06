"use client";

import React from "react";
import { UITable } from "@/ui";
import { useRouter } from "next/navigation";

const OPERATORS = [
  {
    id: "OP-001",
    name: "Азамат Азаматов",
    period: "01.12.2025",
    ordersCount: 122,
    salesTotal: "512 000 ₽",
    salary: "50 000 ₽",
    status: "Подключен",
    statusTone: "success",
  },
  {
    id: "OP-002",
    name: "Алена Аленовна",
    period: "01.12.2025",
    ordersCount: 33,
    salesTotal: "512 000 ₽",
    salary: "50 000 ₽",
    status: "Не активен",
    statusTone: "danger",
  },
];

export default function OperatorsTable({ rows = OPERATORS }) {
  const router = useRouter();

  const columns = [
    { key: "name", label: "Оператор" },
    { key: "period", label: "Период" },
    { key: "ordersCount", label: "Кол-во заказов" },
    { key: "salesTotal", label: "Общая сумма продаж" },
    { key: "salary", label: "Оклад" },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            backgroundColor:
              row.statusTone === "success" ? "#dcfce7" : "#fee2e2",
            color: row.statusTone === "success" ? "#166534" : "#b91c1c",
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router.push(`/accountant/employees/${row.id}`);
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


