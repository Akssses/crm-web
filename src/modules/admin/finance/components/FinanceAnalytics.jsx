 "use client";
import React from "react";
import { Select, UITable, Statcard } from "@/ui";
import s from "../styles/Finance.module.scss";

const PERIOD_OPTIONS = [
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
  { value: "90d", label: "90 дней" },
];

const CURRENCY_OPTIONS = [
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
];

const SUMMARY_STATS = [
  {
    id: 1,
    title: "Маржа за период",
    unit: "1 240 000 KGS",
    change: 4.2,
    trend: "up",
  },
  {
    id: 2,
    title: "Выручка",
    unit: "8 900 000 KGS",
    change: 2.3,
    trend: "up",
  },
  {
    id: 3,
    title: "Возвраты",
    unit: "320 000 KGS",
    change: -1.1,
    trend: "down",
  },
  {
    id: 4,
    title: "Просроченная задолженность",
    unit: "450 000 KGS",
    change: 3.8,
    trend: "up",
  },
];

const MOCK_ORDERS = [
  {
    id: "ORD-001",
    client: "ООО «Бета Трэвел»",
    organizationType: "B2B",
    revenue: 250000,
    cost: 210000,
    margin: 40000,
    operator: "Айсулуу М.",
  },
  {
    id: "ORD-002",
    client: "ИП «Мир Путешествий»",
    organizationType: "B2B",
    revenue: 180000,
    cost: 150000,
    margin: 30000,
    operator: "Азамат К.",
  },
  {
    id: "ORD-003",
    client: "Петров И.С.",
    organizationType: "B2C",
    revenue: 120000,
    cost: 95000,
    margin: 25000,
    operator: "Нурия А.",
  },
];

const MOCK_SUPPLIER_ANALYTICS = [
  {
    id: 1,
    supplier: "Turkish Airlines",
    revenue: 420000,
    margin: 62000,
    orders: 32,
  },
  {
    id: 2,
    supplier: "Booking.com",
    revenue: 310000,
    margin: 41000,
    orders: 24,
  },
  {
    id: 3,
    supplier: "Local DMC Dubai",
    revenue: 180000,
    margin: 28000,
    orders: 14,
  },
];

export default function FinanceAnalytics() {
  const [period, setPeriod] = React.useState("30d");
  const [currency, setCurrency] = React.useState("KGS");

  const orderColumns = [
    {
      key: "id",
      label: "Заказ",
      width: "110px",
    },
    {
      key: "client",
      label: "Клиент / организация",
      flex: 1.6,
    },
    {
      key: "organizationType",
      label: "Тип",
      width: "100px",
    },
    {
      key: "revenue",
      label: "Выручка",
      flex: 1.1,
      render: (value) => `${value.toLocaleString()} ${currency}`,
    },
    {
      key: "cost",
      label: "Себестоимость",
      flex: 1.1,
      render: (value) => `${value.toLocaleString()} ${currency}`,
    },
    {
      key: "margin",
      label: "Маржа",
      flex: 1,
      render: (value, row) => {
        const marginPercent =
          row.revenue > 0 ? Math.round((value / row.revenue) * 100) : 0;
        return (
          <div className={s.marginCell}>
            <span className={s.marginValue}>
              {value.toLocaleString()} {currency}
            </span>
            <span className={s.marginPercent}>{marginPercent}%</span>
          </div>
        );
      },
    },
    {
      key: "operator",
      label: "Оператор",
      width: "140px",
    },
  ];

  const supplierColumns = [
    {
      key: "supplier",
      label: "Поставщик",
      flex: 1.6,
    },
    {
      key: "orders",
      label: "Кол-во заказов",
      width: "140px",
    },
    {
      key: "revenue",
      label: "Выручка",
      flex: 1.1,
      render: (value) => `${value.toLocaleString()} ${currency}`,
    },
    {
      key: "margin",
      label: "Маржа",
      flex: 1.1,
      render: (value, row) => {
        const marginPercent =
          row.revenue > 0 ? Math.round((value / row.revenue) * 100) : 0;
        return (
          <div className={s.marginCell}>
            <span className={s.marginValue}>
              {value.toLocaleString()} {currency}
            </span>
            <span className={s.marginPercent}>{marginPercent}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Финансовая аналитика</h2>
      <p className={s.sectionDescription}>
        Отчёты по марже, выручке, возвратам и задолженностям в разрезе заказов,
        операторов, организаций и поставщиков.
      </p>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={period}
              onChange={setPeriod}
              options={PERIOD_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={currency}
              onChange={setCurrency}
              options={CURRENCY_OPTIONS}
            />
          </div>
        </div>
      </div>

      <div className={s.analyticsStats}>
        {SUMMARY_STATS.map((stat) => (
          <Statcard
            key={stat.id}
            title={stat.title}
            unit={stat.unit}
            trend={stat.trend}
            change={stat.change}
          />
        ))}
      </div>

      <div className={s.tableBlock}>
        <h3 className={s.subSectionTitle}>Маржа по заказам</h3>
        <UITable
          columns={orderColumns}
          rows={MOCK_ORDERS}
          showCheckbox={false}
        />
      </div>

      <div className={s.tableBlock}>
        <h3 className={s.subSectionTitle}>Рентабельность по поставщикам</h3>
        <UITable
          columns={supplierColumns}
          rows={MOCK_SUPPLIER_ANALYTICS}
          showCheckbox={false}
        />
      </div>
    </div>
  );
}



