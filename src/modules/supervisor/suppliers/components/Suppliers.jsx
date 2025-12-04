"use client";

import React from "react";
import { Container, Select, Chart, UITable } from "@/ui";
import s from "@/modules/admin/reports/styles/Analytics.module.scss";

const RATING_FILTERS = [
  { value: "all", label: "Все поставщики" },
  { value: "top", label: "Топ по рейтингу" },
  { value: "risk", label: "С рисками" },
];

const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "Booking.com",
    type: "API",
    rating: 4.8,
    orders: 128,
    confirmations: "96%",
    sla: "1ч 10м",
    issues: 3,
  },
  {
    id: 2,
    name: "Turkish Airlines",
    type: "GDS",
    rating: 4.6,
    orders: 92,
    confirmations: "93%",
    sla: "1ч 40м",
    issues: 5,
  },
  {
    id: 3,
    name: "Local DMC Dubai",
    type: "Email",
    rating: 3.9,
    orders: 47,
    confirmations: "81%",
    sla: "3ч 05м",
    issues: 11,
  },
];

const columns = [
  { key: "name", label: "Поставщик" },
  { key: "type", label: "Тип" },
  {
    key: "rating",
    label: "Рейтинг",
    render: (value) => (
      <span style={{ fontWeight: 600, color: value >= 4.5 ? "#16a34a" : value >= 4.0 ? "#f59e0b" : "#dc2626" }}>
        {value.toFixed(1)} / 5
      </span>
    ),
  },
  { key: "orders", label: "Заявок" },
  { key: "confirmations", label: "Подтверждений" },
  { key: "sla", label: "Средний SLA" },
  {
    key: "issues",
    label: "Инциденты",
    render: (value) => (
      <span style={{ fontWeight: 500, color: value > 8 ? "#dc2626" : value > 3 ? "#f97316" : "#16a34a" }}>
        {value}
      </span>
    ),
  },
];

export default function SupervisorSuppliers() {
  const [ratingFilter, setRatingFilter] = React.useState("all");

  const filteredSuppliers = MOCK_SUPPLIERS;

  return (
    <div className={s.analytics}>
      <Container size="full">
        <h2 className={s.sectionTitle}>Контроль поставщиков</h2>
        <p style={{ color: "#6b7280", marginBottom: 16 }}>
          Рейтинг и показатели поставщиков: подтверждения, SLA, инциденты. Эти данные используются в отчетах
          супервизора и при выборе партнёров.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
          <div style={{ maxWidth: 260 }}>
            <Select value={ratingFilter} onChange={setRatingFilter} options={RATING_FILTERS} />
          </div>
          <div style={{ width: 320 }}>
            <Chart />
          </div>
        </div>

        <UITable columns={columns} rows={filteredSuppliers} showCheckbox={false} />
      </Container>
    </div>
  );
}


