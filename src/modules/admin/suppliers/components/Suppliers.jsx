"use client";
import React, { useMemo, useState } from "react";
import { UITable, Select, Input, Button } from "@/ui";
import { MdAdd, MdLock, MdLockOpen, MdVisibility } from "react-icons/md";
import { useRouter } from "next/navigation";
import AddSupplierModal from "./AddSupplierModal";
import s from "../styles/Suppliers.module.scss";

const TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "airline", label: "Авиакомпания" },
  { value: "hotel", label: "Отель / агрегатор" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визовый центр" },
  { value: "insurance", label: "Страховая" },
  { value: "railway", label: "ЖД оператор" },
  { value: "api", label: "API-поставщик" },
  { value: "local", label: "Локальный партнёр" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "active", label: "Активен" },
  { value: "blocked", label: "Заблокирован" },
  { value: "archived", label: "В архиве" },
];

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
];

const MOCK_SUPPLIERS = [
  {
    id: "SUP-001",
    name: "Turkish Airlines",
    type: "airline",
    typeLabel: "Авиакомпания",
    status: "active",
    statusLabel: "Активен",
    statusColor: "green",
    services: "Авиа",
    currency: "USD",
    commission: "3% + 10 USD",
    paymentTerms: "Предоплата 100% / 3 дня",
    docsSla: "Билеты до 2 ч., обмен до 4 ч.",
    locked: false,
  },
  {
    id: "SUP-002",
    name: "Booking.com B2B",
    type: "hotel",
    typeLabel: "Отель / агрегатор",
    status: "active",
    statusLabel: "Активен",
    statusColor: "green",
    services: "Отели",
    currency: "EUR",
    commission: "12%",
    paymentTerms: "Постоплата 14 дней",
    docsSla: "Ваучер до 1 ч.",
    locked: false,
  },
  {
    id: "SUP-003",
    name: "Local Travel Partner Dubai",
    type: "local",
    typeLabel: "Локальный партнёр",
    status: "blocked",
    statusLabel: "Заблокирован",
    statusColor: "red",
    services: "Туры, трансферы",
    currency: "USD",
    commission: "по договору",
    paymentTerms: "50% предоплата, 50% по заезду",
    docsSla: "Ваучер до 24 ч.",
    locked: true,
  },
  {
    id: "SUP-004",
    name: "Amadeus API",
    type: "api",
    typeLabel: "API-поставщик",
    status: "active",
    statusLabel: "Активен",
    statusColor: "green",
    services: "Авиа, ЖД",
    currency: "USD",
    commission: "GDS комиссия",
    paymentTerms: "По отчётам BSP",
    docsSla: "Электронный билет онлайн",
    locked: false,
  },
];

const STATUS_BADGES = {
  green: s.statusGreen,
  red: s.statusRed,
  gray: s.statusGray,
};

export default function Suppliers() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    name: "",
    type: "all",
    status: "all",
    currency: "all",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddSupplier = () => {
    setIsModalOpen(true);
  };

  const handleSubmitSupplier = (formData) => {
    // TODO: Save supplier to API
    console.log("Creating supplier:", formData);
    // After successful creation, refresh the list
  };

  const filteredSuppliers = useMemo(() => {
    return MOCK_SUPPLIERS.filter((supplier) => {
      if (
        filters.name &&
        !supplier.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        !supplier.id.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      if (filters.type !== "all" && supplier.type !== filters.type)
        return false;
      if (filters.status !== "all" && supplier.status !== filters.status)
        return false;
      if (filters.currency !== "all" && supplier.currency !== filters.currency)
        return false;
      return true;
    });
  }, [filters]);

  const columns = [
    {
      key: "name",
      label: "Поставщик",
      flex: 1.6,
      render: (value, row) => (
        <div className={s.nameCell}>
          <div className={s.nameMain}>{value}</div>
          <div className={s.nameMeta}>{row.id}</div>
        </div>
      ),
    },
    {
      key: "typeLabel",
      label: "Тип",
      flex: 1,
    },
    {
      key: "statusLabel",
      label: "Статус",
      flex: 0.9,
      render: (value, row) => (
        <span className={`${s.statusBadge} ${STATUS_BADGES[row.statusColor]}`}>
          {value}
        </span>
      ),
    },
    {
      key: "services",
      label: "Пул услуг",
      flex: 1.2,
    },
    {
      key: "currency",
      label: "Валюта",
      flex: 0.6,
    },
    {
      key: "commission",
      label: "Комиссия / маржа",
      flex: 1.2,
    },
    {
      key: "paymentTerms",
      label: "Условия оплаты",
      flex: 1.4,
    },
    {
      key: "docsSla",
      label: "Сроки документов",
      flex: 1.4,
    },
    {
      key: "actions",
      label: "",
      flex: 1,
      render: (value, row) => (
        <div className={s.rowActions}>
          <button
            className={s.iconButton}
            title="Открыть"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/suppliers/${row.id}`);
            }}
          >
            <MdVisibility size={16} />
          </button>
          <button
            className={s.iconButton}
            title={row.locked ? "Разблокировать" : "Заблокировать"}
            onClick={(e) => e.stopPropagation()}
          >
            {row.locked ? <MdLockOpen size={16} /> : <MdLock size={16} />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.suppliers}>
      <div className={s.header}>
        <div>
          <h1>Поставщики</h1>
          <p>Всего поставщиков: {filteredSuppliers.length}</p>
        </div>
        <div className={s.headerActions}>
          <Button variant="primary" icon={MdAdd} onClick={handleAddSupplier}>
            Добавить поставщика
          </Button>
        </div>
      </div>

      <div className={s.filters}>
        <Input
          label="Название / ID"
          placeholder="Поиск по названию или ID"
          value={filters.name}
          onChange={(value) => handleChange("name", value)}
        />
        <Select
          label="Тип поставщика"
          value={filters.type}
          onChange={(value) => handleChange("type", value)}
          options={TYPE_OPTIONS}
        />
        <Select
          label="Статус"
          value={filters.status}
          onChange={(value) => handleChange("status", value)}
          options={STATUS_OPTIONS}
        />
        <Select
          label="Валюта расчётов"
          value={filters.currency}
          onChange={(value) => handleChange("currency", value)}
          options={CURRENCY_OPTIONS}
        />
      </div>

      <UITable
        columns={columns}
        rows={filteredSuppliers}
        showCheckbox
        onRowClick={(row) => router.push(`/admin/suppliers/${row.id}`)}
      />

      <AddSupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitSupplier}
      />
    </div>
  );
}
