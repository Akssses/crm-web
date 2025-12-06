"use client";

import React, { useState, useMemo } from "react";
import { Select, UITable, Button, Input, Modal } from "@/ui";
import {
  MdVisibility,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdAccessTime,
  MdChat,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import SupplierDetailModal from "./SupplierDetailModal";
import ProblematicServices from "./ProblematicServices";
import s from "../styles/Suppliers.module.scss";

const RATING_FILTERS = [
  { value: "all", label: "Все поставщики" },
  { value: "top", label: "Топ по рейтингу" },
  { value: "risk", label: "С рисками" },
  { value: "critical", label: "Критический статус" },
];

const STATUS_FILTERS = [
  { value: "all", label: "Все статусы" },
  { value: "stable", label: "Работает стабильно" },
  { value: "risky", label: "Есть риски" },
  { value: "critical", label: "Критический статус" },
  { value: "suspended", label: "Приостановлен" },
];

const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "Booking.com",
    type: "API",
    rating: 4.8,
    orders: 128,
    confirmations: "96%",
    sla: "1ч 10м",
    issues: 3,
    status: "stable",
    statusLabel: "Работает стабильно",
    activeServices: 45,
    overdueServices: 2,
    pendingConfirmations: 8,
    apiStatus: "online",
    lastSync: "2025-01-15 14:30",
  },
  {
    id: 2,
    name: "Turkish Airlines",
    type: "GDS",
    rating: 4.6,
    orders: 92,
    confirmations: "93%",
    sla: "1ч 40м",
    issues: 5,
    status: "risky",
    statusLabel: "Есть риски",
    activeServices: 32,
    overdueServices: 5,
    pendingConfirmations: 12,
    apiStatus: "slow",
    lastSync: "2025-01-15 14:25",
  },
  {
    id: 3,
    name: "Local DMC Dubai",
    type: "Email",
    rating: 3.9,
    orders: 47,
    confirmations: "81%",
    sla: "3ч 05м",
    issues: 11,
    status: "critical",
    statusLabel: "Критический статус",
    activeServices: 18,
    overdueServices: 8,
    pendingConfirmations: 15,
    apiStatus: "offline",
    lastSync: "2025-01-15 12:00",
  },
];

export default function SupervisorSuppliers() {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showProblematic, setShowProblematic] = useState(false);

  const filteredSuppliers = useMemo(() => {
    return MOCK_SUPPLIERS.filter((supplier) => {
      const matchesSearch =
        !search || supplier.name.toLowerCase().includes(search.toLowerCase());
      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "top" && supplier.rating >= 4.5) ||
        (ratingFilter === "risk" && supplier.status === "risky") ||
        (ratingFilter === "critical" && supplier.status === "critical");
      const matchesStatus =
        statusFilter === "all" || supplier.status === statusFilter;

      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [search, ratingFilter, statusFilter]);

  const getStatusConfig = (status) => {
    const configs = {
      stable: { color: "green", icon: MdCheckCircle },
      risky: { color: "yellow", icon: MdWarning },
      critical: { color: "red", icon: MdError },
      suspended: { color: "gray", icon: MdAccessTime },
    };
    return configs[status] || { color: "gray", icon: MdCheckCircle };
  };

  const columns = [
    {
      key: "name",
      label: "Поставщик",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.supplierNameCell}>
          <div className={s.supplierName}>{value}</div>
          <div className={s.supplierMeta}>
            <span className={s.supplierType}>{row.type}</span>
            <span className={s.supplierStatus}>
              {row.activeServices} активных услуг
            </span>
          </div>
        </div>
      ),
    },
    { key: "type", label: "Тип", flex: 0.8 },
    {
      key: "rating",
      label: "Рейтинг",
      flex: 1,
      render: (value) => (
        <span
          className={`${s.rating} ${
            value >= 4.5
              ? s.ratingHigh
              : value >= 4.0
              ? s.ratingMedium
              : s.ratingLow
          }`}
        >
          {value.toFixed(1)} / 5
        </span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      flex: 1.4,
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
    { key: "orders", label: "Заявок", flex: 0.8 },
    { key: "confirmations", label: "Подтверждений", flex: 1 },
    { key: "sla", label: "Средний SLA", flex: 1 },
    {
      key: "issues",
      label: "Инциденты",
      flex: 1,
      render: (value) => (
        <span
          className={`${s.issues} ${
            value > 8 ? s.issuesHigh : value > 3 ? s.issuesMedium : s.issuesLow
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button
            variant="primary"
            size="sm"
            icon={MdVisibility}
            onClick={() => {
              setSelectedSupplier(row);
              setIsDetailModalOpen(true);
            }}
          >
            Детали
          </Button>
        </div>
      ),
    },
  ];

  const problematicCount = MOCK_SUPPLIERS.reduce(
    (sum, s) => sum + s.overdueServices + s.pendingConfirmations,
    0
  );

  return (
    <div className={s.suppliers}>
      <div className={s.header}>
        <div className={s.headerInfo}>
          <h2 className={s.title}>Контроль поставщиков</h2>
          <p className={s.description}>
            Рейтинг и показатели поставщиков: подтверждения, SLA, инциденты. Эти
            данные используются в отчетах супервизора и при выборе партнёров.
          </p>
        </div>
        {problematicCount > 0 && (
          <Button
            variant="warning"
            icon={MdWarning}
            onClick={() => setShowProblematic(true)}
          >
            Проблемные услуги ({problematicCount})
          </Button>
        )}
      </div>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по поставщику..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={ratingFilter}
            onChange={setRatingFilter}
            options={RATING_FILTERS}
            size="sm"
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={STATUS_FILTERS}
            size="sm"
          />
        </div>
      </div>

      <UITable
        columns={columns}
        rows={filteredSuppliers}
        showCheckbox={false}
      />

      {isDetailModalOpen && selectedSupplier && (
        <SupplierDetailModal
          supplier={selectedSupplier}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedSupplier(null);
          }}
        />
      )}

      {showProblematic && (
        <ProblematicServices
          isOpen={showProblematic}
          onClose={() => setShowProblematic(false)}
          suppliers={MOCK_SUPPLIERS}
        />
      )}
    </div>
  );
}
