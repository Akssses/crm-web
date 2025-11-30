"use client";
import React, { useState } from "react";
import { Container, UITable, Select, Button } from "@/ui";
import { MdAdd, MdDownload, MdVisibility, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/PaymentsTable.module.scss";

const PAYMENT_TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "payment", label: "Оплата" },
  { value: "prepayment", label: "Предоплата" },
  { value: "refund", label: "Возврат" },
  { value: "withholding", label: "Удержание" },
  { value: "adjustment", label: "Корректировка" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "paid", label: "Оплачено" },
  { value: "partial", label: "Частично оплачено" },
  { value: "pending", label: "В ожидании" },
  { value: "cancelled", label: "Отменено" },
];

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "KGS", label: "KGS" },
  { value: "USD", label: "USD" },
  { value: "RUB", label: "RUB" },
  { value: "EUR", label: "EUR" },
];

export default function PaymentsTable() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    currency: "all",
  });

  const payments = [
    {
      id: "PAY-001",
      orderId: "ORD-123",
      serviceId: "SRV-001",
      serviceName: "Авиаперелёт (туда)",
      client: "Иван Иванов",
      type: "payment",
      typeLabel: "Оплата",
      amount: 32000,
      currency: "KGS",
      exchangeRate: 1,
      amountInOrderCurrency: 32000,
      orderCurrency: "KGS",
      status: "paid",
      statusLabel: "Оплачено",
      statusColor: "green",
      date: "10.10.2025",
      source: "Банковский перевод",
      paymentDate: "10.10.2025",
    },
    {
      id: "PAY-002",
      orderId: "ORD-125",
      serviceId: "SRV-002",
      serviceName: "Отель",
      client: 'ООО "Бета Трэвел"',
      type: "prepayment",
      typeLabel: "Предоплата",
      amount: 20000,
      currency: "USD",
      exchangeRate: 89.5,
      amountInOrderCurrency: 1790000,
      orderCurrency: "KGS",
      status: "pending",
      statusLabel: "В ожидании",
      statusColor: "yellow",
      date: "11.10.2025",
      source: "Карта",
      paymentDate: null,
    },
    {
      id: "PAY-003",
      orderId: "ORD-120",
      serviceId: "SRV-003",
      serviceName: "Трансфер",
      client: 'ООО "Алмаз-Тур"',
      type: "refund",
      typeLabel: "Возврат",
      amount: 15000,
      currency: "KGS",
      exchangeRate: 1,
      amountInOrderCurrency: 15000,
      orderCurrency: "KGS",
      status: "partial",
      statusLabel: "Частично оплачено",
      statusColor: "orange",
      date: "09.10.2025",
      source: "Банковский перевод",
      paymentDate: "09.10.2025",
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    if (filters.type !== "all" && payment.type !== filters.type) return false;
    if (filters.status !== "all" && payment.status !== filters.status)
      return false;
    if (filters.currency !== "all" && payment.currency !== filters.currency)
      return false;
    return true;
  });

  const columns = [
    {
      key: "id",
      label: "№",
      flex: 0.8,
      render: (value) => <span className={s.paymentId}>{value}</span>,
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
        <div className={s.amountCell}>
          <span className={s.amount}>
            {value.toLocaleString()} {row.currency}
          </span>
          {row.currency !== row.orderCurrency && (
            <span className={s.amountConverted}>
              ≈ {row.amountInOrderCurrency.toLocaleString()} {row.orderCurrency}
            </span>
          )}
        </div>
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
      flex: 0.6,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <button
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/operator/finance/payments/${row.id}`);
            }}
            title="Просмотр"
          >
            <MdVisibility size={18} />
          </button>
          <button
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open edit modal
            }}
            title="Редактировать"
          >
            <MdEdit size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleAddPayment = () => {
    // TODO: Open add payment modal
    console.log("Add payment");
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
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
              options={PAYMENT_TYPE_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              options={STATUS_OPTIONS}
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
          <Button variant="primary" icon={MdAdd} onClick={handleAddPayment}>
            Добавить платёж
          </Button>
          <Button variant="secondary" icon={MdDownload} onClick={handleExport}>
            Экспорт Excel
          </Button>
        </div>
      </div>

      <UITable
        columns={columns}
        rows={filteredPayments}
        showCheckbox={true}
        type="default"
        onRowClick={(row) =>
          router.push(`/operator/finance/payments/${row.id}`)
        }
      />
    </Container>
  );
}
