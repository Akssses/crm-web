"use client";
import React, { useState } from "react";
import { Container, UITable, Select, Button } from "@/ui";
import {
  MdAdd,
  MdDownload,
  MdVisibility,
  MdPictureAsPdf,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/ReturnsTable.module.scss";

const RETURN_STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "returned", label: "Возвращено" },
  { value: "partial", label: "Частичный возврат" },
  { value: "pending", label: "В ожидании" },
];

const RETURN_SOURCE_OPTIONS = [
  { value: "all", label: "Все источники" },
  { value: "to_client", label: "Клиенту" },
  { value: "from_supplier", label: "От поставщика" },
  { value: "internal", label: "Внутренний" },
];

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "KGS", label: "KGS" },
  { value: "USD", label: "USD" },
  { value: "RUB", label: "RUB" },
  { value: "EUR", label: "EUR" },
];

export default function ReturnsTable() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    status: "all",
    source: "all",
    currency: "all",
  });

  const returns = [
    {
      id: "RET-001",
      orderId: "ORD-123",
      serviceId: "SRV-001",
      serviceName: "Авиаперелёт (туда)",
      client: "Иван Иванов",
      type: "full",
      typeLabel: "Полный возврат",
      amount: 32000,
      currency: "KGS",
      exchangeRate: 1,
      status: "returned",
      statusLabel: "Возвращено",
      statusColor: "green",
      date: "10.10.2025",
      reason: "Отмена заказа клиентом",
      source: "to_client",
      sourceLabel: "Клиенту",
    },
    {
      id: "RET-002",
      orderId: "ORD-125",
      serviceId: "SRV-002",
      serviceName: "Отель",
      client: 'ООО "Бета Трэвел"',
      type: "partial",
      typeLabel: "Частичный возврат",
      amount: 10000,
      currency: "USD",
      exchangeRate: 89.5,
      status: "partial",
      statusLabel: "Частичный возврат",
      statusColor: "yellow",
      date: "11.10.2025",
      reason: "Изменение условий заказа",
      source: "from_supplier",
      sourceLabel: "От поставщика",
    },
    {
      id: "RET-003",
      orderId: "ORD-120",
      serviceId: "SRV-003",
      serviceName: "Трансфер",
      client: 'ООО "Алмаз-Тур"',
      type: "partial",
      typeLabel: "Частичный возврат",
      amount: 15000,
      currency: "KGS",
      exchangeRate: 1,
      status: "pending",
      statusLabel: "В ожидании",
      statusColor: "orange",
      date: "09.10.2025",
      reason: "Несоответствие услуги",
      source: "internal",
      sourceLabel: "Внутренний",
    },
  ];

  const filteredReturns = returns.filter((ret) => {
    if (filters.status !== "all" && ret.status !== filters.status) return false;
    if (filters.source !== "all" && ret.source !== filters.source) return false;
    if (filters.currency !== "all" && ret.currency !== filters.currency)
      return false;
    return true;
  });

  const columns = [
    {
      key: "id",
      label: "№",
      flex: 0.8,
      render: (value) => <span className={s.returnId}>{value}</span>,
    },
    {
      key: "orderId",
      label: "Заказ",
      flex: 1.2,
      render: (value, row) => (
        <span
          className={s.orderLink}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/operator/orders/${value}`);
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "serviceId",
      label: "Услуга",
      flex: 1.2,
      render: (value, row) => (
        <span
          className={s.serviceLink}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/operator/services/${value}`);
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Сумма",
      flex: 1.5,
      render: (value, row) => (
        <span className={s.amount}>
          {value.toLocaleString()} {row.currency}
        </span>
      ),
    },
    {
      key: "statusLabel",
      label: "Статус",
      flex: 1.2,
      render: (value, row) => (
        <span className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}>
          {value}
        </span>
      ),
    },
    {
      key: "date",
      label: "Дата",
      flex: 1,
    },
    {
      key: "actions",
      label: "",
      flex: 0.7,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <button
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/operator/finance/returns/${row.id}`);
            }}
            title="Просмотр"
          >
            <MdVisibility size={18} />
          </button>
          <button
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Generate PDF
              console.log("Generate PDF for return", row.id);
            }}
            title="Скачать PDF"
          >
            <MdPictureAsPdf size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleAddReturn = () => {
    // TODO: Open add return modal
    console.log("Add return");
  };

  const handleExport = () => {
    // TODO: Export to Excel
    console.log("Export to Excel");
  };

  return (
    <Container size="full" className={s.container}>
      <div className={s.filters}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              options={RETURN_STATUS_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.source}
              onChange={(value) => setFilters({ ...filters, source: value })}
              options={RETURN_SOURCE_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.currency}
              onChange={(value) => setFilters({ ...filters, currency: value })}
              options={CURRENCY_OPTIONS}
            />
          </div>
        </div>
        <div className={s.actions}>
          <Button variant="primary" icon={MdAdd} onClick={handleAddReturn}>
            Добавить возврат
          </Button>
          <Button variant="secondary" icon={MdDownload} onClick={handleExport}>
            Экспорт Excel
          </Button>
        </div>
      </div>

      <UITable
        columns={columns}
        rows={filteredReturns}
        showCheckbox={true}
        type="default"
        onRowClick={(row) => router.push(`/operator/finance/returns/${row.id}`)}
      />
    </Container>
  );
}
