"use client";
import React, { useState, useMemo } from "react";
import { Button, Select, Input, UITable, Modal } from "@/ui";
import {
  MdDownload,
  MdRefresh,
  MdVisibility,
  MdCheckCircle,
  MdError,
  MdAccessTime,
  MdWarning,
  MdSend,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/PaymentsList.module.scss";

const STATUS_FILTERS = [
  { value: "all", label: "Все статусы" },
  { value: "paid", label: "Оплачено" },
  { value: "partial", label: "Частично оплачено" },
  { value: "pending", label: "Ожидает подтверждения" },
  { value: "checking", label: "На проверке бухгалтером" },
  { value: "cancelled", label: "Отменён банком" },
  { value: "overdue", label: "Просрочено" },
];

const MOCK_PAYMENTS = [
  {
    id: "PAY-001",
    order: "ORD-145",
    date: "2025-01-15 14:30",
    amount: 125000,
    currency: "KGS",
    purpose: "Оплата тура",
    method: "Карта",
    status: "paid",
    statusLabel: "Оплачено",
    invoice: "INV-145",
  },
  {
    id: "PAY-002",
    order: "ORD-145",
    date: "2025-01-10 10:15",
    amount: 50000,
    currency: "KGS",
    purpose: "Частичная оплата",
    method: "Перевод",
    status: "partial",
    statusLabel: "Частично оплачено",
    invoice: "INV-144",
  },
  {
    id: "PAY-003",
    order: "ORD-144",
    date: "2025-01-08 16:45",
    amount: 85000,
    currency: "KGS",
    purpose: "Страховка",
    method: "Карта",
    status: "checking",
    statusLabel: "На проверке бухгалтером",
    invoice: "INV-143",
  },
  {
    id: "PAY-004",
    order: "ORD-143",
    date: "2025-01-05 09:20",
    amount: 95000,
    currency: "KGS",
    purpose: "Оплата тура",
    method: "Юр. лицо",
    status: "overdue",
    statusLabel: "Просрочено",
    invoice: "INV-142",
    deadline: "2025-01-10",
  },
];

const MOCK_ORDER_SUMMARY = {
  orderId: "ORD-145",
  totalAmount: 175000,
  currency: "KGS",
  paid: 125000,
  partial: 50000,
  remaining: 0,
  deadline: "2025-01-20",
  riskWarning: false,
};

export default function PaymentsList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredPayments = useMemo(() => {
    return MOCK_PAYMENTS.filter((payment) => {
      const matchesSearch =
        !search ||
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.order.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusConfig = (status) => {
    const configs = {
      paid: { icon: MdCheckCircle, color: "green", label: "Оплачено" },
      partial: {
        icon: MdAccessTime,
        color: "yellow",
        label: "Частично оплачено",
      },
      pending: {
        icon: MdAccessTime,
        color: "yellow",
        label: "Ожидает подтверждения",
      },
      checking: {
        icon: MdAccessTime,
        color: "blue",
        label: "На проверке бухгалтером",
      },
      cancelled: { icon: MdError, color: "red", label: "Отменён банком" },
      overdue: { icon: MdWarning, color: "red", label: "Просрочено" },
    };
    return (
      configs[status] || { icon: MdAccessTime, color: "gray", label: status }
    );
  };

  const columns = [
    {
      key: "id",
      label: "Номер платежа",
      flex: 1,
    },
    {
      key: "order",
      label: "Заказ",
      flex: 0.8,
    },
    {
      key: "date",
      label: "Дата",
      flex: 1,
    },
    {
      key: "amount",
      label: "Сумма",
      flex: 1,
      render: (value, row) => (
        <div className={s.amountCell}>
          {value.toLocaleString()} {row.currency}
        </div>
      ),
    },
    {
      key: "purpose",
      label: "Назначение",
      flex: 1.2,
    },
    {
      key: "method",
      label: "Метод оплаты",
      flex: 1,
    },
    {
      key: "status",
      label: "Статус",
      flex: 1.2,
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
            icon={MdDownload}
            onClick={() => console.log("Download:", row.id)}
          >
            Чек
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdVisibility}
            onClick={() => setSelectedPayment(row)}
          >
            Детали
          </Button>
          {row.status === "cancelled" && (
            <Button variant="primary" size="sm" icon={MdRefresh}>
              Повторить
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={s.paymentsList}>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по номеру платежа, заказу..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_FILTERS}
            size="sm"
          />
        </div>
      </div>

      <div className={s.orderSummary}>
        <h3 className={s.summaryTitle}>
          Итоги по заказу {MOCK_ORDER_SUMMARY.orderId}
        </h3>
        <div className={s.summaryGrid}>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Стоимость заказа:</span>
            <span className={s.summaryValue}>
              {MOCK_ORDER_SUMMARY.totalAmount.toLocaleString()}{" "}
              {MOCK_ORDER_SUMMARY.currency}
            </span>
          </div>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Оплачено:</span>
            <span className={`${s.summaryValue} ${s.summaryValueSuccess}`}>
              {MOCK_ORDER_SUMMARY.paid.toLocaleString()}{" "}
              {MOCK_ORDER_SUMMARY.currency}
            </span>
          </div>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Частичная оплата:</span>
            <span className={`${s.summaryValue} ${s.summaryValueWarning}`}>
              {MOCK_ORDER_SUMMARY.partial.toLocaleString()}{" "}
              {MOCK_ORDER_SUMMARY.currency}
            </span>
          </div>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Остаток к оплате:</span>
            <span className={`${s.summaryValue} ${s.summaryValueDanger}`}>
              {MOCK_ORDER_SUMMARY.remaining.toLocaleString()}{" "}
              {MOCK_ORDER_SUMMARY.currency}
            </span>
          </div>
          <div className={s.summaryItem}>
            <span className={s.summaryLabel}>Дедлайн оплаты:</span>
            <span className={s.summaryValue}>
              {new Date(MOCK_ORDER_SUMMARY.deadline).toLocaleDateString(
                "ru-RU"
              )}
            </span>
          </div>
        </div>
        {MOCK_ORDER_SUMMARY.riskWarning && (
          <div className={s.riskWarning}>
            <MdWarning size={20} />
            <span>
              Внимание! При нарушении сроков оплаты услуги могут быть отменены.
            </span>
          </div>
        )}
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredPayments}
          showCheckbox={false}
        />
      </div>

      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          isOpen={!!selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}

function PaymentDetailModal({ payment, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="700px"
      title={`Платеж: ${payment.id}`}
    >
      <div className={s.paymentDetailModal}>
        <div className={s.detailSection}>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Номер платежа:</span>
            <span className={s.detailValue}>{payment.id}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Заказ:</span>
            <span className={s.detailValue}>{payment.order}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Дата:</span>
            <span className={s.detailValue}>{payment.date}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Сумма:</span>
            <span className={s.detailValue}>
              {payment.amount.toLocaleString()} {payment.currency}
            </span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Назначение:</span>
            <span className={s.detailValue}>{payment.purpose}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Метод оплаты:</span>
            <span className={s.detailValue}>{payment.method}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Статус:</span>
            <span className={s.detailValue}>{payment.statusLabel}</span>
          </div>
        </div>
        <div className={s.modalFooter}>
          <Button variant="outline" icon={MdDownload}>
            Скачать чек
          </Button>
          <Button variant="outline" icon={MdDownload}>
            Скачать счёт
          </Button>
          <Button variant="primary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
}
