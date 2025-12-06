"use client";

import React, { useState } from "react";
import { Select, UITable } from "@/ui";
import s from "../styles/Refunds.module.scss";

const REPORT_ROWS = [
  {
    organization: "Asia Travel",
    operator: "Айгерим М.",
    orders: 12,
    services: "Авиа, Отель",
    refunds: "320 000 RUB",
    pending: "45 000 RUB",
  },
  {
    organization: "Техносервис",
    operator: "Руслан Р.",
    orders: 6,
    services: "Авиа",
    refunds: "178 000 KGS",
    pending: "0",
  },
];

export default function RefundReport() {
  const [reportFilters, setReportFilters] = useState({
    organization: "all",
    operator: "all",
    status: "all",
  });

  const columns = [
    { key: "organization", label: "Организация" },
    { key: "operator", label: "Оператор" },
    { key: "orders", label: "Заявок" },
    { key: "services", label: "Услуги" },
    { key: "refunds", label: "Возвращено" },
    { key: "pending", label: "Ожидание" },
  ];

  return (
    <div>
      <div className={s.reportFilters}>
        <Select
          value={reportFilters.organization}
          onChange={(v) =>
            setReportFilters((prev) => ({ ...prev, organization: v }))
          }
          options={[
            { value: "all", label: "Все организации" },
            { value: "asia", label: "Asia Travel" },
            { value: "techno", label: "Техносервис" },
          ]}
          size="sm"
        />
        <Select
          value={reportFilters.operator}
          onChange={(v) =>
            setReportFilters((prev) => ({ ...prev, operator: v }))
          }
          options={[
            { value: "all", label: "Все операторы" },
            { value: "aigerim", label: "Айгерим М." },
            { value: "ruslan", label: "Руслан Р." },
          ]}
          size="sm"
        />
        <Select
          value={reportFilters.status}
          onChange={(v) =>
            setReportFilters((prev) => ({ ...prev, status: v }))
          }
          options={[
            { value: "all", label: "Все статусы" },
            { value: "returned", label: "Возвращено" },
            { value: "pending", label: "Ожидает" },
          ]}
          size="sm"
        />
      </div>

      <div className={s.reportTable}>
        <UITable columns={columns} rows={REPORT_ROWS} showCheckbox={false} />
      </div>
    </div>
  );
}


