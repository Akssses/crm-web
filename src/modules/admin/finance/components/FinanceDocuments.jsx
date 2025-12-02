"use client";
import React from "react";
import { UITable, Button, Select } from "@/ui";
import s from "../styles/Finance.module.scss";

const DOC_TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "invoice", label: "Счёт" },
  { value: "act", label: "Акт" },
  { value: "receipt", label: "Квитанция" },
  { value: "voucher", label: "Ваучер" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "active", label: "Активен" },
  { value: "archived", label: "В архиве" },
];

const MOCK_TEMPLATES = [
  {
    id: 1,
    type: "Счёт",
    code: "INVOICE_STD",
    name: "Счёт (стандартный)",
    version: "v2",
    scope: "Все заказы",
    status: "active",
    updatedAt: "10.11.2025",
  },
  {
    id: 2,
    type: "Акт",
    code: "ACT_CORP",
    name: "Акт для корпоративных клиентов",
    version: "v1",
    scope: "B2B, организации",
    status: "active",
    updatedAt: "05.11.2025",
  },
  {
    id: 3,
    type: "Квитанция",
    code: "RECEIPT_CASH",
    name: "Квитанция (наличные)",
    version: "v3",
    scope: "B2C",
    status: "draft",
    updatedAt: "01.11.2025",
  },
];

export default function FinanceDocuments() {
  const [filters, setFilters] = React.useState({
    type: "all",
    status: "all",
  });

  const filteredTemplates = MOCK_TEMPLATES.filter((tpl) => {
    if (
      filters.type !== "all" &&
      tpl.type.toLowerCase().indexOf("счёт") === -1 &&
      filters.type === "invoice"
    ) {
      return false;
    }
    if (filters.status !== "all" && tpl.status !== filters.status) {
      return false;
    }
    return true;
  });

  const columns = [
    { key: "type", label: "Тип", width: "120px" },
    {
      key: "name",
      label: "Название",
      flex: 1.6,
      render: (value, row) => (
        <div className={s.templateNameCell}>
          <div className={s.templateName}>{value}</div>
          <div className={s.templateCode}>{row.code}</div>
        </div>
      ),
    },
    { key: "version", label: "Версия", width: "80px" },
    { key: "scope", label: "Применимость", flex: 1.4 },
    {
      key: "status",
      label: "Статус",
      width: "120px",
      render: (value) => (
        <span
          className={
            value === "active"
              ? s.ruleActive
              : value === "draft"
              ? s.ruleInactive
              : s.muted
          }
        >
          {value === "active"
            ? "Активен"
            : value === "draft"
            ? "Черновик"
            : "В архиве"}
        </span>
      ),
    },
    { key: "updatedAt", label: "Обновлён", width: "120px" },
  ];

  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Финансовые документы и шаблоны</h2>
      <p className={s.sectionDescription}>
        Управление шаблонами счетов, актов, квитанций и другими финансовыми
        документами. Здесь настраиваются автогенерация при оплате и массовая
        регенерация документов.
      </p>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.type}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
              options={DOC_TYPE_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
              options={STATUS_OPTIONS}
            />
          </div>
        </div>
        <div className={s.actionsInline}>
          <Button variant="primary">Добавить шаблон</Button>
          <Button variant="secondary">Массовая регенерация</Button>
        </div>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredTemplates}
          showCheckbox={false}
        />
      </div>
    </div>
  );
}
