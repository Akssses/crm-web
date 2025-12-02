"use client";
import React from "react";
import { UITable, Select, Button } from "@/ui";
import s from "../styles/Finance.module.scss";

const BASE_CURRENCY_OPTIONS = [
  { value: "all", label: "Все базовые валюты" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const MOCK_RATES = [
  {
    id: 1,
    currency: "USD",
    baseCurrency: "KGS",
    date: "15.11.2025",
    rate: 89.5,
    source: "ЦБ",
    type: "на дату транзакции",
  },
  {
    id: 2,
    currency: "EUR",
    baseCurrency: "KGS",
    date: "15.11.2025",
    rate: 96.2,
    source: "Ручной",
    type: "фиксированный для заказа",
  },
  {
    id: 3,
    currency: "USD",
    baseCurrency: "RUB",
    date: "14.11.2025",
    rate: 92.1,
    source: "ЦБ",
    type: "на дату документа",
  },
];

export default function FinanceCurrencies() {
  const [filters, setFilters] = React.useState({
    baseCurrency: "all",
    currency: "all",
  });

  const filteredRates = MOCK_RATES.filter((row) => {
    if (
      filters.baseCurrency !== "all" &&
      row.baseCurrency !== filters.baseCurrency
    ) {
      return false;
    }
    if (filters.currency !== "all" && row.currency !== filters.currency) {
      return false;
    }
    return true;
  });

  const columns = [
    { key: "currency", label: "Валюта", width: "90px" },
    { key: "baseCurrency", label: "Базовая валюта", width: "120px" },
    { key: "date", label: "Дата", width: "120px" },
    {
      key: "rate",
      label: "Курс",
      flex: 1,
      render: (value) => value.toLocaleString(),
    },
    { key: "source", label: "Источник", flex: 1 },
    { key: "type", label: "Тип курса", flex: 1.4 },
  ];

  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Валюты и курсы</h2>
      <p className={s.sectionDescription}>
        Централизованное управление валютами, курсами ЦБ и ручными курсами.
        Здесь будут храниться курсы на дату транзакции, на дату документа и
        закрытия услуги, а также правила пересчёта в валюту заказа и отчёта.
      </p>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.baseCurrency}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, baseCurrency: value }))
              }
              options={BASE_CURRENCY_OPTIONS}
            />
          </div>
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
        <Button variant="primary">Добавить курс</Button>
      </div>

      <div className={s.tableBlock}>
        <UITable columns={columns} rows={filteredRates} showCheckbox={false} />
      </div>
    </div>
  );
}
