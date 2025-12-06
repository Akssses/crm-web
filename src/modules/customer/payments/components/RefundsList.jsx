"use client";
import React, { useState, useMemo } from "react";
import { Button, Select, Input, UITable, Modal } from "@/ui";
import {
  MdAdd,
  MdDownload,
  MdVisibility,
  MdCheckCircle,
  MdError,
  MdAccessTime,
  MdWarning,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import RefundRequestModal from "./RefundRequestModal";
import s from "../styles/RefundsList.module.scss";

const STATUS_FILTERS = [
  { value: "all", label: "Все статусы" },
  { value: "requested", label: "Запрошено" },
  { value: "reviewing", label: "На рассмотрении" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "paid", label: "Выплачено" },
  { value: "error", label: "Ошибка" },
];

const MOCK_REFUNDS = [
  {
    id: "REF-001",
    order: "ORD-145",
    date: "2025-01-15 10:30",
    reason: "Отмена поставщиком",
    initiator: "Клиент",
    amount: 50000,
    currency: "KGS",
    status: "approved",
    statusLabel: "Одобрено",
    requisites: "Карта ****1234",
  },
  {
    id: "REF-002",
    order: "ORD-144",
    date: "2025-01-12 14:20",
    reason: "Личная причина",
    initiator: "Клиент",
    amount: 25000,
    currency: "KGS",
    status: "reviewing",
    statusLabel: "На рассмотрении",
    requisites: null,
  },
  {
    id: "REF-003",
    order: "ORD-143",
    date: "2025-01-10 09:15",
    reason: "Корректировка стоимости",
    initiator: "Оператор",
    amount: 15000,
    currency: "KGS",
    status: "paid",
    statusLabel: "Выплачено",
    requisites: "Карта ****5678",
  },
];

export default function RefundsList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);

  const filteredRefunds = useMemo(() => {
    return MOCK_REFUNDS.filter((refund) => {
      const matchesSearch =
        !search ||
        refund.id.toLowerCase().includes(search.toLowerCase()) ||
        refund.order.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || refund.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusConfig = (status) => {
    const configs = {
      requested: { icon: MdAccessTime, color: "yellow", label: "Запрошено" },
      reviewing: {
        icon: MdAccessTime,
        color: "blue",
        label: "На рассмотрении",
      },
      approved: { icon: MdCheckCircle, color: "green", label: "Одобрено" },
      rejected: { icon: MdError, color: "red", label: "Отклонено" },
      paid: { icon: MdCheckCircle, color: "green", label: "Выплачено" },
      error: { icon: MdWarning, color: "red", label: "Ошибка" },
    };
    return (
      configs[status] || { icon: MdAccessTime, color: "gray", label: status }
    );
  };

  const columns = [
    {
      key: "id",
      label: "Номер возврата",
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
      key: "reason",
      label: "Причина",
      flex: 1.2,
    },
    {
      key: "initiator",
      label: "Инициатор",
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
            Документы
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdVisibility}
            onClick={() => setSelectedRefund(row)}
          >
            Детали
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.refundsList}>
      <div className={s.header}>
        <div className={s.headerInfo}>
          <h3 className={s.sectionTitle}>Возвраты и корректировки</h3>
          <p className={s.sectionDescription}>
            Все запросы на возврат средств и автоматические корректировки
          </p>
        </div>
        <Button
          variant="primary"
          icon={MdAdd}
          onClick={() => setIsRequestModalOpen(true)}
        >
          Запросить возврат
        </Button>
      </div>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по номеру возврата, заказу..."
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

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredRefunds}
          showCheckbox={false}
        />
      </div>

      {isRequestModalOpen && (
        <RefundRequestModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
        />
      )}

      {selectedRefund && (
        <RefundDetailModal
          refund={selectedRefund}
          isOpen={!!selectedRefund}
          onClose={() => setSelectedRefund(null)}
        />
      )}
    </div>
  );
}

function RefundDetailModal({ refund, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="700px"
      title={`Возврат: ${refund.id}`}
    >
      <div className={s.refundDetailModal}>
        <div className={s.detailSection}>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Номер возврата:</span>
            <span className={s.detailValue}>{refund.id}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Заказ:</span>
            <span className={s.detailValue}>{refund.order}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Дата:</span>
            <span className={s.detailValue}>{refund.date}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Причина:</span>
            <span className={s.detailValue}>{refund.reason}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Инициатор:</span>
            <span className={s.detailValue}>{refund.initiator}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Сумма:</span>
            <span className={s.detailValue}>
              {refund.amount.toLocaleString()} {refund.currency}
            </span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>Статус:</span>
            <span className={s.detailValue}>{refund.statusLabel}</span>
          </div>
          {refund.requisites && (
            <div className={s.detailRow}>
              <span className={s.detailLabel}>Реквизиты для выплаты:</span>
              <span className={s.detailValue}>{refund.requisites}</span>
            </div>
          )}
        </div>
        <div className={s.modalFooter}>
          <Button variant="outline" icon={MdDownload}>
            Скачать документы
          </Button>
          <Button variant="primary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
}
