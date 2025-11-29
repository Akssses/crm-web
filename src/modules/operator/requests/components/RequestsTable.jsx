"use client";

import React from "react";
import { UITable } from "@/ui";
import { useRouter } from "next/navigation";
import s from "../styles/RequestsTable.module.scss";

const REQUESTS = [
  {
    id: "REQ-1001",
    organization: "Asia Travel",
    service: "Авиабилеты",
    responsible: "Айсулуу А.",
    date: "15.11.2024",
    source: "TG",
    sla: "2 ч. 15 мин",
    status: "Активен",
    slaTone: "success",
    statusTone: "success",
  },
  {
    id: "REQ-1002",
    organization: "Михаил Иванов",
    service: "Отель",
    responsible: "Айтурган Ж.",
    date: "15.11.2024",
    source: "Email",
    sla: "Просрочено",
    status: "В работе",
    slaTone: "danger",
    statusTone: "warning",
  },
];

export default function RequestsTable() {
  const router = useRouter();

  const columns = [
    {
      key: "organization",
      label: "Организация",
    },
    {
      key: "service",
      label: "Услуга",
    },
    {
      key: "responsible",
      label: "Ответственные",
    },
    {
      key: "date",
      label: "Дата",
    },
    {
      key: "source",
      label: "Источник",
    },
    {
      key: "sla",
      label: "SLA",
      render: (value, row) => (
        <span
          className={`${s.pill} ${
            row.slaTone === "success"
              ? s.pillSuccess
              : row.slaTone === "danger"
              ? s.pillDanger
              : ""
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span
          className={`${s.pill} ${
            row.statusTone === "success"
              ? s.statusSuccess
              : row.statusTone === "warning"
              ? s.statusWarning
              : ""
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router.push(`/operator/requests/${row.id}`);
  };

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={REQUESTS}
        showCheckbox={true}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
