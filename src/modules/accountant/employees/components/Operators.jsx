"use client";

import React, { useMemo, useState } from "react";
import s from "../styles/EmployeesReports.module.scss";
import { Button, Input, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import OperatorsTable from "./OperatorsTable";
import AddOperatorModal from "./AddOperatorModal";

const PERIOD_OPTIONS = [
  { value: "month", label: "Месяц" },
  { value: "quarter", label: "Квартал" },
  { value: "year", label: "Год" },
];

export default function Operators() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("month");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const summary = useMemo(
    () => ({
      totalOrders: 155,
      totalSales: "1 024 000 ₽",
      totalSalary: "100 000 ₽",
      avgConversion: "28%",
    }),
    []
  );

  const handleAddOperator = (data) => {
    console.log("New operator:", data);
    // Handle adding new operator
  };

  return (
    <div className={s.employeesReports}>
      <div className={s.header}>
        <div className={s.headerRight}>
          <Select
            value={period}
            onChange={setPeriod}
            options={PERIOD_OPTIONS}
            size="sm"
          />
          <Input
            placeholder="Поиск по имени оператора..."
            icon={IoSearchOutline}
            value={search}
            onChange={setSearch}
            className={s.search}
          />
          <Button variant="bgblue" size="md" icon={MdAdd} onClick={() => setIsAddModalOpen(true)}>
            Добавить
          </Button>
        </div>
      </div>

      <div className={s.summaryGrid}>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Всего заказов</span>
          <span className={s.summaryValue}>{summary.totalOrders}</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Общая сумма продаж</span>
          <span className={s.summaryValue}>{summary.totalSales}</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Начислено ЗП</span>
          <span className={s.summaryValue}>{summary.totalSalary}</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Средняя конверсия</span>
          <span className={s.summaryValue}>{summary.avgConversion}</span>
        </div>
      </div>

      <OperatorsTable />

      {/* Add Operator Modal */}
      <AddOperatorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOperator}
      />
    </div>
  );
}
