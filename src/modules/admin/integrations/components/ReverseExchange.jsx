"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Select, UITable } from "@/ui";
import {
  MdCheckCircle,
  MdError,
  MdAccessTime,
  MdSync,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/ReverseExchange.module.scss";

const MOCK_STATUSES = [
  {
    id: "STAT-001",
    document: "INV-145",
    organization: "Asia Travel",
    service: "1С",
    status: "paid",
    statusLabel: "Оплачен",
    amount: 12500,
    currency: "USD",
    receivedAt: "2025-01-15 15:30",
    processed: true,
  },
  {
    id: "STAT-002",
    document: "ACT-144",
    organization: "Техносервис",
    service: "Диадок",
    status: "partially_paid",
    statusLabel: "Частично оплачен",
    amount: 8000,
    currency: "EUR",
    paidAmount: 5000,
    receivedAt: "2025-01-15 15:25",
    processed: true,
  },
  {
    id: "STAT-003",
    document: "UPD-143",
    organization: "Asia Travel",
    service: "1С",
    status: "signed",
    statusLabel: "Подписан",
    receivedAt: "2025-01-15 15:20",
    processed: true,
  },
  {
    id: "STAT-004",
    document: "INV-142",
    organization: "Asia Travel",
    service: "Эльба",
    status: "rejected",
    statusLabel: "Отклонён",
    reason: "Неверная сумма",
    receivedAt: "2025-01-15 15:15",
    processed: false,
  },
];

export default function ReverseExchange() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    organization: "all",
    processed: "all",
  });

  const filteredStatuses = useMemo(() => {
    return MOCK_STATUSES.filter((status) => {
      const matchesSearch =
        !search ||
        status.id.toLowerCase().includes(search.toLowerCase()) ||
        status.document.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || status.status === filters.status;
      const matchesOrg =
        filters.organization === "all" ||
        status.organization === filters.organization;
      const matchesProcessed =
        filters.processed === "all" ||
        (filters.processed === "yes" && status.processed) ||
        (filters.processed === "no" && !status.processed);

      return matchesSearch && matchesStatus && matchesOrg && matchesProcessed;
    });
  }, [search, filters]);

  const getStatusConfig = (status) => {
    const configs = {
      paid: { icon: MdCheckCircle, color: "green" },
      partially_paid: { icon: MdSync, color: "yellow" },
      signed: { icon: MdCheckCircle, color: "blue" },
      rejected: { icon: MdError, color: "red" },
      waiting: { icon: MdAccessTime, color: "yellow" },
    };
    return configs[status] || { icon: MdAccessTime, color: "gray" };
  };

  const columns = [
    {
      key: "id",
      label: "ID статуса",
      flex: 0.8,
    },
    {
      key: "document",
      label: "Документ",
      flex: 0.8,
    },
    {
      key: "organization",
      label: "Организация",
      flex: 1,
    },
    {
      key: "service",
      label: "Сервис",
      flex: 0.8,
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
      key: "amount",
      label: "Сумма",
      flex: 1,
      render: (value, row) => {
        if (!value) return "—";
        return (
          <div className={s.amountCell}>
            {value.toLocaleString()} {row.currency}
            {row.paidAmount && (
              <div className={s.paidAmount}>
                Оплачено: {row.paidAmount.toLocaleString()} {row.currency}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "receivedAt",
      label: "Получен",
      flex: 1,
    },
    {
      key: "processed",
      label: "Обработан",
      flex: 0.8,
      render: (value) => (
        <div className={s.processedCell}>
          {value ? (
            <MdCheckCircle size={20} className={s.processedIcon} />
          ) : (
            <span className={s.notProcessed}>Ожидает</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={s.reverseExchange}>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, документу..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            options={[
              { value: "all", label: "Все статусы" },
              { value: "paid", label: "Оплачен" },
              { value: "partially_paid", label: "Частично оплачен" },
              { value: "signed", label: "Подписан" },
              { value: "rejected", label: "Отклонён" },
            ]}
            size="sm"
          />
          <Select
            value={filters.organization}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, organization: value }))
            }
            options={[
              { value: "all", label: "Все организации" },
              { value: "Asia Travel", label: "Asia Travel" },
              { value: "Техносервис", label: "Техносервис" },
            ]}
            size="sm"
          />
          <Select
            value={filters.processed}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, processed: value }))
            }
            options={[
              { value: "all", label: "Все" },
              { value: "yes", label: "Обработаны" },
              { value: "no", label: "Ожидают обработки" },
            ]}
            size="sm"
          />
        </div>
        <Button variant="primary" icon={MdSync}>
          Синхронизировать
        </Button>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredStatuses}
          showCheckbox={false}
        />
      </div>
    </div>
  );
}

