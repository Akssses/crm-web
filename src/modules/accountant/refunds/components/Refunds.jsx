"use client";

import React, { useMemo, useState } from "react";
import s from "../styles/Refunds.module.scss";
import { Button, Input, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import RefundsTable from "./RefundsTable";
import RefundDetailModal from "./RefundDetailModal";
import CreateRefundModal from "./CreateRefundModal";
import RefundLog from "./RefundLog";
import RefundReport from "./RefundReport";

const REFUND_STATUSES = [
  { value: "all", label: "Все статусы" },
  { value: "created", label: "Создан" },
  { value: "awaiting", label: "Ожидает подтверждения" },
  { value: "processing", label: "В обработке" },
  { value: "returned", label: "Возвращено" },
  { value: "partial", label: "Частично возвращено" },
  { value: "declined", label: "Отклонено" },
  { value: "error", label: "Ошибка операции" },
  { value: "settlement", label: "Ожидает поступления средств" },
];

const REFUND_TYPES = [
  { value: "all", label: "Все типы" },
  { value: "client", label: "Клиенту" },
  { value: "supplier", label: "От поставщика" },
];

const ORGANIZATIONS = [
  { value: "all", label: "Все организации" },
  { value: "asia", label: "Asia Travel" },
  { value: "techno", label: "Техносервис" },
  { value: "rom", label: "Ром" },
];

const SERVICES = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отель" },
  { value: "transfer", label: "Трансфер" },
  { value: "package", label: "Командировка" },
];

const SOURCES = [
  { value: "all", label: "Все источники" },
  { value: "bank", label: "Банк" },
  { value: "pos", label: "Эквайринг" },
  { value: "cash", label: "Касса" },
];

const CURRENCIES = [
  { value: "all", label: "Все валюты" },
  { value: "RUB", label: "RUB" },
  { value: "KGS", label: "KGS" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const MOCK_REFUNDS = [
  {
    id: "RFND-1001",
    date: "25.10.2025",
    amount: "45 200",
    currency: "RUB",
    exchangeRate: "1 USD = 93.1 RUB",
    type: "client",
    reason: "Отмена поездки сотрудником",
    status: "returned",
    statusColor: "green",
    orderId: "#ORD-145",
    service: "Командировка (авиа + отель)",
    source: "bank",
    operator: "Айгерим М.",
    approver: "Бахыт К.",
  },
  {
    id: "RFND-1002",
    date: "24.10.2025",
    amount: "18 000",
    currency: "EUR",
    exchangeRate: "1 EUR = 1.07 USD",
    type: "supplier",
    reason: "Переплата поставщику",
    status: "awaiting",
    statusColor: "yellow",
    orderId: "#ORD-210",
    service: "Отель",
    source: "pos",
    operator: "Руслан Р.",
    approver: "Не утвержден",
  },
  {
    id: "RFND-1003",
    date: "23.10.2025",
    amount: "12 500",
    currency: "KGS",
    exchangeRate: "—",
    type: "client",
    reason: "Ошибка тарифа поставщика",
    status: "error",
    statusColor: "red",
    orderId: "#ORD-200",
    service: "Авиа",
    source: "cash",
    operator: "Айсулуу А.",
    approver: "—",
  },
];

export default function Refunds() {
  const [filters, setFilters] = useState({
    organization: "all",
    service: "all",
    currency: "all",
    status: "all",
    type: "all",
    source: "all",
  });
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRefunds = useMemo(() => {
    return MOCK_REFUNDS.filter((row) => {
      if (
        filters.organization !== "all" &&
        row.organization !== filters.organization
      )
        return false;
      if (
        filters.service !== "all" &&
        !row.service?.toLowerCase().includes(filters.service)
      )
        return false;
      if (filters.currency !== "all" && row.currency !== filters.currency)
        return false;
      if (filters.status !== "all" && row.status !== filters.status)
        return false;
      if (filters.type !== "all" && row.type !== filters.type) return false;
      if (filters.source !== "all" && row.source !== filters.source)
        return false;
      if (search) {
        const term = search.toLowerCase();
        const haystack = [
          row.id,
          row.orderId,
          row.service,
          row.reason,
          row.operator,
          row.approver,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [filters, search]);

  return (
    <div className={s.refunds}>
      <div className={s.header}>
        <div className={s.filters}>
          <Select
            value={filters.organization}
            onChange={(v) => handleFilterChange("organization", v)}
            options={ORGANIZATIONS}
            size="sm"
          />
          <Select
            value={filters.service}
            onChange={(v) => handleFilterChange("service", v)}
            options={SERVICES}
            size="sm"
          />
          <Select
            value={filters.currency}
            onChange={(v) => handleFilterChange("currency", v)}
            options={CURRENCIES}
            size="sm"
          />
          <Select
            value={filters.type}
            onChange={(v) => handleFilterChange("type", v)}
            options={REFUND_TYPES}
            size="sm"
          />
          <Select
            value={filters.status}
            onChange={(v) => handleFilterChange("status", v)}
            options={REFUND_STATUSES}
            size="sm"
          />
        </div>
        <div className={s.actions}>
          <Button
            variant="primary"
            icon={MdAdd}
            onClick={() => setIsCreateOpen(true)}
          >
            Создать возврат
          </Button>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.summaryGrid}>
          <div className={s.summaryCard}>
            <span className={s.summaryLabel}>Возвращено за месяц</span>
            <span className={s.summaryValue}>2 340 000 ₽</span>
          </div>
          <div className={s.summaryCard}>
            <span className={s.summaryLabel}>Ожидает подтверждения</span>
            <span className={s.summaryValue}>540 000 ₽</span>
          </div>
          <div className={s.summaryCard}>
            <span className={s.summaryLabel}>Ошибка / в работе</span>
            <span className={s.summaryValue}>4 операции</span>
          </div>
        </div>
      </div>

      <RefundsTable rows={filteredRefunds} onRowClick={setDetail} />

      <div className={s.section}>
        <div className={s.sectionTitle}>Журнал ошибок и операций</div>
        <div className={s.sectionSubtitle}>
          Отклонённые, повторные и задержанные возвраты
        </div>
        <RefundLog />
      </div>

      <div className={s.section}>
        <div className={s.sectionTitle}>Отчёт по возвратам</div>
        <div className={s.sectionSubtitle}>
          Фильтры по организации, оператору, заказу, сервису, валюте и статусу
        </div>
        <RefundReport />
      </div>

      <RefundDetailModal refund={detail} onClose={() => setDetail(null)} />
      <CreateRefundModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
