"use client";

import React from "react";
import { Container, Select, Statcard, Chart } from "@/ui";
import { OperatorsTable } from "@/modules/admin/reports/components/Table";
import s from "@/modules/admin/reports/styles/Analytics.module.scss";

const PERIOD_OPTIONS = [
  { value: "today", label: "Сегодня" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "online", label: "Онлайн" },
  { value: "offline", label: "Оффлайн" },
  { value: "break", label: "Перерыв" },
];

export default function SupervisorOperators() {
  const [period, setPeriod] = React.useState("today");
  const [status, setStatus] = React.useState("all");

  return (
    <div className={s.analytics}>
      <Container size="full">
        <h2 className={s.sectionTitle}>Управление операторами</h2>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <Select value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />
            <Select value={status} onChange={setStatus} options={STATUS_OPTIONS} />
          </div>
          <div style={{ width: 260 }}>
            <Chart />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
          <Statcard title="Операторов онлайн" unit="12" trend="up" change={1.2} />
          <Statcard title="Средний SLA" unit="1ч 25м" trend="down" change={5.1} />
          <Statcard title="Просроченных заявок" unit="7" trend="up" change={0.9} />
          <Statcard title="Средняя загрузка" unit="78%" trend="up" change={2.4} />
        </div>

        <OperatorsTable />
      </Container>
    </div>
  );
}


