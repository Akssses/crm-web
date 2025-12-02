"use client";
import React from "react";
import { Select, Button, UITable } from "@/ui";
import s from "../styles/Finance.module.scss";

const ORDER_TYPE_OPTIONS = [
  { value: "all", label: "Все типы заказов" },
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "partner", label: "Партнёрский" },
  { value: "group", label: "Групповой" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отели" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визы" },
];

const MOCK_RULES = [
  {
    id: 1,
    priority: 1,
    scope: "B2B · Авиа · Корп. клиенты",
    orderType: "b2b",
    serviceType: "avia",
    organization: "Все корпоративные",
    supplier: "Любой",
    agencyCommission: "5%",
    supplierCommission: "0%",
    markup: "+7%",
    rounding: "до 10 ₽ в пользу агентства",
    active: true,
  },
  {
    id: 2,
    priority: 2,
    scope: "B2C · Отели",
    orderType: "b2c",
    serviceType: "hotel",
    organization: "Физ. лица",
    supplier: "Booking.com",
    agencyCommission: "3%",
    supplierCommission: "2%",
    markup: "+10%",
    rounding: "до 1 ₽ обычное",
    active: true,
  },
  {
    id: 3,
    priority: 5,
    scope: "Партнёрка · Все услуги",
    orderType: "partner",
    serviceType: "all",
    organization: "Партнёры",
    supplier: "Любой",
    agencyCommission: "2%",
    supplierCommission: "0%",
    markup: "0%",
    rounding: "до 1 ₽ обычное",
    active: false,
  },
];

export default function FinanceRules() {
  const [filters, setFilters] = React.useState({
    orderType: "all",
    serviceType: "all",
  });

  const filteredRules = MOCK_RULES.filter((rule) => {
    if (filters.orderType !== "all" && rule.orderType !== filters.orderType) {
      return false;
    }
    if (
      filters.serviceType !== "all" &&
      rule.serviceType !== filters.serviceType &&
      rule.serviceType !== "all"
    ) {
      return false;
    }
    return true;
  });

  const columns = [
    {
      key: "priority",
      label: "Приоритет",
      width: "90px",
      render: (value) => <span className={s.rulePriority}>#{value}</span>,
    },
    {
      key: "scope",
      label: "Область действия",
      flex: 1.6,
      render: (value, row) => (
        <div className={s.ruleScopeCell}>
          <div className={s.ruleScopeTitle}>{value}</div>
          <div className={s.ruleScopeMeta}>
            <span>{row.organization}</span>
            <span>{row.supplier}</span>
          </div>
        </div>
      ),
    },
    {
      key: "agencyCommission",
      label: "Комиссия агентства",
      flex: 1,
    },
    {
      key: "supplierCommission",
      label: "Комиссия поставщика",
      flex: 1,
    },
    {
      key: "markup",
      label: "Маркап",
      flex: 0.8,
    },
    {
      key: "rounding",
      label: "Округление",
      flex: 1.2,
    },
    {
      key: "active",
      label: "Статус",
      width: "120px",
      render: (value) => (
        <span className={value ? s.ruleActive : s.ruleInactive}>
          {value ? "Активно" : "Отключено"}
        </span>
      ),
    },
  ];

  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Финансовые правила</h2>
      <p className={s.sectionDescription}>
        Матрица правил комиссий, маркапа, удержаний и спецусловий для разных
        типов заказов, услуг, организаций и поставщиков. Эти правила будут
        использоваться при автоматическом расчёте маржи и чистой суммы.
      </p>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.orderType}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, orderType: value }))
              }
              options={ORDER_TYPE_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.serviceType}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, serviceType: value }))
              }
              options={SERVICE_TYPE_OPTIONS}
            />
          </div>
        </div>
        <Button variant="primary">Добавить правило</Button>
      </div>

      <div className={s.tableBlock}>
        <UITable columns={columns} rows={filteredRules} showCheckbox={false} />
      </div>
    </div>
  );
}
