"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Select, UITable } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdAdd,
  MdCheckCircle,
  MdWarning,
  MdError,
  MdAccessTime,
  MdInfoOutline,
} from "react-icons/md";
import s from "../styles/PayoutsRegistry.module.scss";

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "to_pay", label: "К выплате" },
  { value: "in_process", label: "В процессе" },
  { value: "paid", label: "Выплачено" },
  { value: "rejected", label: "Отклонено банком" },
  { value: "error", label: "Ошибка интеграции" },
];

const PAYMENT_METHOD_OPTIONS = [
  { value: "all", label: "Все методы" },
  { value: "bank", label: "Банк" },
  { value: "cash", label: "Касса" },
  { value: "pos", label: "Эквайринг" },
];

const MOCK_PAYOUTS = [
  {
    id: "PAY-001",
    date: "2025-01-15",
    supplier: "Turkish Airlines",
    amount: 5000,
    currency: "USD",
    method: "bank",
    services: ["ORD-145", "ORD-144"],
    status: "paid",
    source: "bank",
    documents: ["invoice_001.pdf", "act_001.pdf"],
  },
  {
    id: "PAY-002",
    date: "2025-01-16",
    supplier: "Booking.com",
    amount: 3200,
    currency: "EUR",
    method: "bank",
    services: ["ORD-142"],
    status: "in_process",
    source: "bank",
    documents: ["invoice_002.pdf"],
  },
  {
    id: "PAY-003",
    date: "2025-01-14",
    supplier: "Local DMC Dubai",
    amount: 1500,
    currency: "USD",
    method: "cash",
    services: ["ORD-140"],
    status: "rejected",
    source: "cash",
    documents: [],
  },
  {
    id: "PAY-004",
    date: "2025-01-17",
    supplier: "Turkish Airlines",
    amount: 8000,
    currency: "USD",
    method: "bank",
    services: ["ORD-143", "ORD-141"],
    status: "to_pay",
    source: "bank",
    documents: [],
  },
];

const STATUS_CONFIG = {
  to_pay: { label: "К выплате", icon: MdAccessTime, color: "blue" },
  in_process: { label: "В процессе", icon: MdInfoOutline, color: "yellow" },
  paid: { label: "Выплачено", icon: MdCheckCircle, color: "green" },
  rejected: { label: "Отклонено", icon: MdWarning, color: "red" },
  error: { label: "Ошибка", icon: MdError, color: "red" },
};

export default function PayoutsRegistry({ onCreatePayout }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    method: "all",
    currency: "all",
  });

  const filteredPayouts = useMemo(() => {
    return MOCK_PAYOUTS.filter((payout) => {
      const matchesSearch =
        !search ||
        payout.id.toLowerCase().includes(search.toLowerCase()) ||
        payout.supplier.toLowerCase().includes(search.toLowerCase()) ||
        payout.services.some((s) =>
          s.toLowerCase().includes(search.toLowerCase())
        );
      const matchesStatus =
        filters.status === "all" || payout.status === filters.status;
      const matchesMethod =
        filters.method === "all" || payout.method === filters.method;
      const matchesCurrency =
        filters.currency === "all" || payout.currency === filters.currency;

      return matchesSearch && matchesStatus && matchesMethod && matchesCurrency;
    });
  }, [search, filters]);

  const getStatusConfig = (status) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.to_pay;
  };

  const columns = [
    {
      key: "id",
      label: "ID выплаты",
      render: (value) => <div className={s.payoutId}>{value}</div>,
    },
    {
      key: "date",
      label: "Дата",
      render: (value) => (
        <div className={s.dateCell}>
          {new Date(value).toLocaleDateString("ru-RU")}
        </div>
      ),
    },
    {
      key: "supplier",
      label: "Поставщик",
    },
    {
      key: "amount",
      label: "Сумма",
      render: (value, row) => (
        <div className={s.amountCell}>
          {value.toLocaleString()} {row.currency}
        </div>
      ),
    },
    {
      key: "method",
      label: "Метод оплаты",
      render: (value) => (
        <div className={s.methodCell}>
          {value === "bank" ? "Банк" : value === "cash" ? "Касса" : "Эквайринг"}
        </div>
      ),
    },
    {
      key: "services",
      label: "Услуги/Заказы",
      render: (value) => (
        <div className={s.servicesCell}>
          {value.map((service, idx) => (
            <span key={idx} className={s.serviceTag}>
              {service}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const config = getStatusConfig(value);
        const Icon = config.icon;
        return (
          <div className={s.statusCell}>
            <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
              <Icon size={16} />
              {config.label}
            </span>
          </div>
        );
      },
    },
    {
      key: "documents",
      label: "Документы",
      render: (value) => (
        <div className={s.documentsCell}>
          {value.length > 0 ? (
            <span className={s.docCount}>{value.length} файл(ов)</span>
          ) : (
            <span className={s.noDocs}>—</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={s.registry}>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, поставщику, услуге..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            options={STATUS_OPTIONS}
            size="sm"
          />
          <Select
            value={filters.method}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, method: value }))
            }
            options={PAYMENT_METHOD_OPTIONS}
            size="sm"
          />
          <Select
            value={filters.currency}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, currency: value }))
            }
            options={[
              { value: "all", label: "Все валюты" },
              { value: "KGS", label: "KGS" },
              { value: "RUB", label: "RUB" },
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ]}
            size="sm"
          />
        </div>
        <Button variant="primary" icon={MdAdd} onClick={onCreatePayout}>
          Создать выплату
        </Button>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredPayouts}
          showCheckbox={false}
        />
      </div>

      {filteredPayouts.length === 0 && (
        <div className={s.emptyState}>
          <MdInfoOutline size={48} />
          <p>Выплаты не найдены</p>
        </div>
      )}
    </div>
  );
}
