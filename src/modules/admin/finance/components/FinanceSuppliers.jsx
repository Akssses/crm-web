"use client";
import React from "react";
import { Select, UITable } from "@/ui";
import s from "../styles/Finance.module.scss";

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "Turkish Airlines",
    currency: "USD",
    totalDebt: "12 500 USD",
    overdue: "2 300 USD",
    future: "8 000 USD",
    paidThisMonth: "25 000 USD",
    margin: "4 200 USD",
  },
  {
    id: 2,
    name: "Booking.com",
    currency: "EUR",
    totalDebt: "8 700 EUR",
    overdue: "0 EUR",
    future: "3 200 EUR",
    paidThisMonth: "18 000 EUR",
    margin: "2 100 EUR",
  },
  {
    id: 3,
    name: "Local DMC Dubai",
    currency: "USD",
    totalDebt: "5 200 USD",
    overdue: "1 000 USD",
    future: "4 500 USD",
    paidThisMonth: "9 000 USD",
    margin: "1 800 USD",
  },
];

export default function FinanceSuppliers() {
  const [filters, setFilters] = React.useState({
    currency: "all",
  });

  const filteredSuppliers = MOCK_SUPPLIERS.filter((row) => {
    if (filters.currency !== "all" && row.currency !== filters.currency) {
      return false;
    }
    return true;
  });

  const columns = [
    {
      key: "name",
      label: "Поставщик",
      flex: 1.6,
      render: (value, row) => (
        <div className={s.supplierNameCell}>
          <div className={s.supplierName}>{value}</div>
          <div className={s.supplierCurrency}>Валюта расчётов: {row.currency}</div>
        </div>
      ),
    },
    { key: "totalDebt", label: "Текущая задолженность", flex: 1.2 },
    { key: "overdue", label: "Просрочено", flex: 1 },
    { key: "future", label: "Будущие обязательства", flex: 1.2 },
    { key: "paidThisMonth", label: "Выплачено за месяц", flex: 1.2 },
    { key: "margin", label: "Маржа за месяц", flex: 1 },
  ];

  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Поставщики и задолженность</h2>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.currency}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, currency: value }))
              }
              options={CURRENCY_OPTIONS}
            />
          </div>
        </div>
      </div>
      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredSuppliers}
          showCheckbox={false}
        />
      </div>
    </div>
  );
}



