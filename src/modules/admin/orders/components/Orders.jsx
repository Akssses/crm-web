"use client";
import React, { useMemo, useState } from "react";
import { Container, UITable, Select, Input, Button } from "@/ui";
import {
  MdOutlineFilterAlt,
  MdRemoveRedEye,
  MdLock,
  MdLockOpen,
  MdRefresh,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/Orders.module.scss";

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "in_progress", label: "В работе" },
  { value: "waiting_payment", label: "Ожидает оплаты" },
  { value: "completed", label: "Завершён" },
  { value: "closed", label: "Закрыт" },
  { value: "blocked", label: "Заблокирован" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отель" },
  { value: "transfer", label: "Трансфер" },
  { value: "visa", label: "Виза" },
  { value: "insurance", label: "Страховка" },
  { value: "railway", label: "ЖД" },
  { value: "other", label: "Другое" },
];

const MOCK_ORDERS = [
  {
    id: "ORD-145",
    client: "Иван Петров",
    operator: "Айгерим М.",
    status: "in_progress",
    statusLabel: "В работе",
    statusColor: "yellow",
    createdAt: "12.11.2025",
    total: "2 450 USD",
    clientDebt: "320 USD",
    supplierDebt: "0",
    margin: "340 USD",
    services: "avia",
    locked: false,
  },
  {
    id: "ORD-144",
    client: "ООО РимТур",
    operator: "Бекзат Ж.",
    status: "waiting_payment",
    statusLabel: "Ожидает оплаты",
    statusColor: "orange",
    createdAt: "10.11.2025",
    total: "4 120 EUR",
    clientDebt: "1 000 EUR",
    supplierDebt: "420 EUR",
    margin: "610 EUR",
    services: "hotel",
    locked: true,
  },
  {
    id: "ORD-143",
    client: "Алексей Козлов",
    operator: "Айгерим М.",
    status: "completed",
    statusLabel: "Завершён",
    statusColor: "green",
    createdAt: "08.11.2025",
    total: "890 USD",
    clientDebt: "0",
    supplierDebt: "0",
    margin: "140 USD",
    services: "transfer",
    locked: false,
  },
  {
    id: "ORD-142",
    client: "Елена Васильева",
    operator: "—",
    status: "draft",
    statusLabel: "Черновик",
    statusColor: "blue",
    createdAt: "05.11.2025",
    total: "1 120 USD",
    clientDebt: "1 120 USD",
    supplierDebt: "0",
    margin: "-",
    services: "visa",
    locked: false,
  },
  {
    id: "ORD-141",
    client: "ООО Dream Travel",
    operator: "Камила Т.",
    status: "blocked",
    statusLabel: "Заблокирован",
    statusColor: "gray",
    createdAt: "02.11.2025",
    total: "6 540 USD",
    clientDebt: "0",
    supplierDebt: "2 150 USD",
    margin: "860 USD",
    services: "other",
    locked: true,
  },
];

const STATUS_BADGES = {
  green: s.statusGreen,
  yellow: s.statusYellow,
  orange: s.statusOrange,
  blue: s.statusBlue,
  gray: s.statusGray,
};

export default function AdminOrders() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    operator: "",
    client: "",
    status: "all",
    serviceType: "all",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      if (
        filters.operator &&
        !order.operator.toLowerCase().includes(filters.operator.toLowerCase())
      )
        return false;
      if (
        filters.client &&
        !order.client.toLowerCase().includes(filters.client.toLowerCase())
      )
        return false;
      if (filters.status !== "all" && order.status !== filters.status)
        return false;
      if (
        filters.serviceType !== "all" &&
        order.services !== filters.serviceType
      )
        return false;
      return true;
    });
  }, [filters]);

  const columns = [
    {
      key: "id",
      label: "ID",
      flex: 0.7,
      render: (value) => <span className={s.idCell}>{value}</span>,
    },
    {
      key: "client",
      label: "Клиент",
      flex: 1.2,
    },
    {
      key: "operator",
      label: "Оператор",
      flex: 1,
    },
    {
      key: "statusLabel",
      label: "Статус",
      flex: 1,
      render: (value, row) => (
        <span className={`${s.statusBadge} ${STATUS_BADGES[row.statusColor]}`}>
          {value}
        </span>
      ),
    },
    {
      key: "total",
      label: "Сумма",
      flex: 0.9,
    },
    {
      key: "clientDebt",
      label: "Долг клиента",
      flex: 0.9,
      render: (value) => (
        <span className={value !== "0" ? s.debtWarning : ""}>{value}</span>
      ),
    },
    {
      key: "supplierDebt",
      label: "Долг поставщику",
      flex: 0.9,
      render: (value) => (
        <span className={value !== "0" ? s.debtWarning : ""}>{value}</span>
      ),
    },
    {
      key: "margin",
      label: "Маржа",
      flex: 0.8,
    },
    {
      key: "actions",
      label: "",
      flex: 0.9,
      render: (value, row) => (
        <div className={s.rowActions}>
          <button
            className={s.iconButton}
            title="Открыть"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/orders/${row.id}`);
            }}
          >
            <MdRemoveRedEye size={16} />
          </button>
          <button
            className={s.iconButton}
            title={row.locked ? "Разблокировать" : "Заблокировать"}
            onClick={(e) => e.stopPropagation()}
          >
            {row.locked ? <MdLockOpen size={16} /> : <MdLock size={16} />}
          </button>
          <button
            className={s.iconButton}
            title="Переоткрыть"
            onClick={(e) => e.stopPropagation()}
          >
            <MdRefresh size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.orders}>
      <div className={s.header}>
        <div>
          <h1>Все заказы</h1>
          <p>Всего заказов: {filteredOrders.length}</p>
        </div>
        <div className={s.headerActions}>
          <Button variant="primary">Создать заказ</Button>
        </div>
      </div>

      <div className={s.filters}>
        <Input
          label="Оператор"
          placeholder="Имя или ID оператора"
          value={filters.operator}
          onChange={(value) => handleChange("operator", value)}
        />
        <Input
          label="Клиент"
          placeholder="Имя клиента"
          value={filters.client}
          onChange={(value) => handleChange("client", value)}
        />
        <Select
          label="Статус"
          value={filters.status}
          onChange={(value) => handleChange("status", value)}
          options={STATUS_OPTIONS}
        />
        <Select
          label="Тип услуги"
          value={filters.serviceType}
          onChange={(value) => handleChange("serviceType", value)}
          options={SERVICE_TYPE_OPTIONS}
        />
      </div>

      <UITable
        columns={columns}
        rows={filteredOrders}
        showCheckbox
        onRowClick={(row) => router.push(`/admin/orders/${row.id}`)}
      />
    </div>
  );
}
