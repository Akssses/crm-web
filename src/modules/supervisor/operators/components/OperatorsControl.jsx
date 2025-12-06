"use client";

import React, { useState } from "react";
import { Container, Button, Select, Input, Chart } from "@/ui";
import { OperatorsTable } from "@/modules/admin/reports/components/Table";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/OperatorsControl.module.scss";

export default function OperatorsControl() {
  const [filters, setFilters] = useState({
    status: "all",
    shift: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={s.operatorsControl}>
      <Container size="full">
        <div className={s.header}>
          <div>
            <h2 className={s.title}>Контроль операторов</h2>
            <p className={s.subtitle}>
              Состояние смены, загрузка и эффективность каждого оператора.
            </p>
          </div>
          <div className={s.actions}>
            <Button variant="outline" icon={CiFilter}>
              Фильтры
            </Button>
          </div>
        </div>

        <div className={s.filtersRow}>
          <Select
            label="Статус"
            value={filters.status}
            onChange={(v) => handleFilterChange("status", v)}
            options={[
              { value: "all", label: "Все статусы" },
              { value: "online", label: "Онлайн" },
              { value: "offline", label: "Оффлайн" },
              { value: "break", label: "Перерыв" },
              { value: "in_shift", label: "В смене" },
            ]}
          />
          <Select
            label="Смена"
            value={filters.shift}
            onChange={(v) => handleFilterChange("shift", v)}
            options={[
              { value: "all", label: "Все смены" },
              { value: "morning", label: "Утренняя" },
              { value: "day", label: "Дневная" },
              { value: "evening", label: "Вечерняя" },
            ]}
          />
          <Input
            label="Поиск по оператору"
            icon={IoSearchOutline}
            placeholder="Имя или логин оператора"
          />
        </div>

        <div className={s.chartsRow}>
          <div className={s.chartCard}>
            <h3>Эффективность операторов</h3>
            <Chart />
          </div>
          <div className={s.chartCard}>
            <h3>Распределение нагрузки</h3>
            <Chart />
          </div>
        </div>

        <div className={s.tableSection}>
          <h3 className={s.tableTitle}>Операторы и KPI</h3>
          <OperatorsTable />
        </div>
      </Container>
    </div>
  );
}


