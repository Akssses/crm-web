"use client";
import React, { useState, useMemo } from "react";
import { Button, Select, Input, UITable, Modal } from "@/ui";
import {
  MdDownload,
  MdEmail,
  MdVisibility,
  MdCheckCircle,
  MdError,
  MdAccessTime,
  MdArrowDownward,
  MdArrowUpward,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/TransactionsHistory.module.scss";

const TYPE_FILTERS = [
  { value: "all", label: "Все операции" },
  { value: "topup", label: "Пополнение" },
  { value: "payment", label: "Оплата заказа" },
  { value: "adjustment", label: "Корректировка" },
  { value: "refund", label: "Возврат" },
  { value: "reserve", label: "Резервирование" },
  { value: "cancel", label: "Отмена операции" },
];

const STATUS_FILTERS = [
  { value: "all", label: "Все статусы" },
  { value: "completed", label: "Завершено" },
  { value: "pending", label: "Ожидает" },
  { value: "failed", label: "Ошибка" },
];

const MOCK_TRANSACTIONS = [
  {
    id: "TXN-001",
    date: "2025-01-15 14:30",
    type: "topup",
    typeLabel: "Пополнение",
    amount: 50000,
    currency: "KGS",
    source: "Клиент",
    order: null,
    service: null,
    comment: "Пополнение через банковскую карту",
    status: "completed",
    statusLabel: "Завершено",
    exchangeRate: 1,
  },
  {
    id: "TXN-002",
    date: "2025-01-14 10:15",
    type: "payment",
    typeLabel: "Оплата заказа",
    amount: -75000,
    currency: "KGS",
    source: "Автоинтеграция",
    order: "ORD-145",
    service: "SRV-001",
    comment: "Оплата заказа ORD-145",
    status: "completed",
    statusLabel: "Завершено",
    exchangeRate: 1,
  },
  {
    id: "TXN-003",
    date: "2025-01-13 16:45",
    type: "refund",
    typeLabel: "Возврат",
    amount: 25000,
    currency: "KGS",
    source: "Оператор",
    order: "ORD-144",
    service: "SRV-002",
    comment: "Возврат по заказу ORD-144",
    status: "completed",
    statusLabel: "Завершено",
    exchangeRate: 1,
  },
  {
    id: "TXN-004",
    date: "2025-01-12 09:20",
    type: "adjustment",
    typeLabel: "Корректировка",
    amount: -5000,
    currency: "KGS",
    source: "Бухгалтерия",
    order: "ORD-143",
    service: null,
    comment: "Корректировка стоимости услуги",
    status: "completed",
    statusLabel: "Завершено",
    exchangeRate: 1,
  },
  {
    id: "TXN-005",
    date: "2025-01-11 11:30",
    type: "reserve",
    typeLabel: "Резервирование",
    amount: -30000,
    currency: "KGS",
    source: "Система",
    order: "ORD-142",
    service: "SRV-003",
    comment: "Резервирование средств для заказа",
    status: "pending",
    statusLabel: "Ожидает",
    exchangeRate: 1,
  },
  {
    id: "TXN-006",
    date: "2025-01-10 14:00",
    type: "topup",
    typeLabel: "Пополнение",
    amount: 100000,
    currency: "KGS",
    source: "Клиент",
    order: null,
    service: null,
    comment: "Пополнение через банковский перевод",
    status: "pending",
    statusLabel: "Ожидает",
    exchangeRate: 1,
  },
];

export default function TransactionsHistory() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((transaction) => {
      const matchesSearch =
        !search ||
        transaction.id.toLowerCase().includes(search.toLowerCase()) ||
        (transaction.order &&
          transaction.order.toLowerCase().includes(search.toLowerCase()));
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesCurrency =
        currencyFilter === "all" || transaction.currency === currencyFilter;

      return matchesSearch && matchesType && matchesStatus && matchesCurrency;
    });
  }, [search, typeFilter, statusFilter, currencyFilter]);

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: MdCheckCircle,
        color: "green",
        label: "Завершено",
      },
      pending: { icon: MdAccessTime, color: "yellow", label: "Ожидает" },
      failed: { icon: MdError, color: "red", label: "Ошибка" },
    };
    return (
      configs[status] || { icon: MdAccessTime, color: "gray", label: status }
    );
  };

  const columns = [
    {
      key: "id",
      label: "ID операции",
      flex: 1,
    },
    {
      key: "date",
      label: "Дата",
      flex: 1,
    },
    {
      key: "type",
      label: "Тип",
      flex: 1,
      render: (value, row) => <span>{row.typeLabel}</span>,
    },
    {
      key: "amount",
      label: "Сумма",
      flex: 1,
      render: (value, row) => {
        const isPositive = value > 0;
        return (
          <div
            className={`${s.amountCell} ${
              isPositive ? s.amountPositive : s.amountNegative
            }`}
          >
            {isPositive ? (
              <MdArrowDownward size={16} className={s.amountIcon} />
            ) : (
              <MdArrowUpward size={16} className={s.amountIcon} />
            )}
            {Math.abs(value).toLocaleString()} {row.currency}
          </div>
        );
      },
    },
    {
      key: "source",
      label: "Источник",
      flex: 1,
    },
    {
      key: "order",
      label: "Заказ / Услуга",
      flex: 1.2,
      render: (value, row) => (
        <span>
          {row.order || "—"} {row.service && `/ ${row.service}`}
        </span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value, row) => {
        const config = getStatusConfig(value);
        const Icon = config.icon;
        return (
          <div className={s.statusCell}>
            <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
              <Icon size={16} />
              {row.statusLabel}
            </span>
          </div>
        );
      },
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button
            variant="outline"
            size="sm"
            icon={MdVisibility}
            onClick={() => setSelectedTransaction(row)}
          >
            Детали
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.transactionsHistory}>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, заказу..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            options={TYPE_FILTERS}
            size="sm"
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_FILTERS}
            size="sm"
          />
          <Select
            value={currencyFilter}
            onChange={setCurrencyFilter}
            options={[
              { value: "all", label: "Все валюты" },
              { value: "KGS", label: "KGS" },
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ]}
            size="sm"
          />
        </div>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredTransactions}
          showCheckbox={false}
        />
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}

function TransactionDetailModal({ transaction, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="700px"
      title={`Операция: ${transaction.id}`}
    >
      <div className={s.transactionDetailModal}>
        <div className={s.detailSection}>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>ID операции:</span>
            <span className={s.detailValue}>{transaction.id}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Дата:</span>
            <span className={s.detailValue}>{transaction.date}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Тип:</span>
            <span className={s.detailValue}>{transaction.typeLabel}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Сумма:</span>
            <span className={s.detailValue}>
              {transaction.amount.toLocaleString()} {transaction.currency}
            </span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Курс на момент операции:</span>
            <span className={s.detailValue}>
              {transaction.exchangeRate} {transaction.currency}
            </span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Источник:</span>
            <span className={s.detailValue}>{transaction.source}</span>
          </div>
          {transaction.order && (
            <div className={s.detailRow}>
              <span className={s.detailLabel}>Заказ:</span>
              <span className={s.detailValue}>{transaction.order}</span>
            </div>
          )}
          {transaction.service && (
            <div className={s.detailRow}>
              <span className={s.detailLabel}>Услуга:</span>
              <span className={s.detailValue}>{transaction.service}</span>
            </div>
          )}
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Комментарий:</span>
            <span className={s.detailValue}>{transaction.comment}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Статус:</span>
            <span className={s.detailValue}>{transaction.statusLabel}</span>
          </div>
        </div>
        <div className={s.modalFooter}>
          <Button variant="outline" icon={MdDownload}>
            Скачать документы
          </Button>
          <Button variant="outline" icon={MdEmail}>
            Отправить на email
          </Button>
          <Button variant="primary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
}
