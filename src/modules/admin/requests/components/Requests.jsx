"use client";
import React, { useMemo, useState } from "react";
import { Container, UITable, Select, Input, Button } from "@/ui";
import {
  MdPerson,
  MdBusiness,
  MdAccessTime,
  MdOutlineFilterAlt,
  MdLock,
  MdLockOpen,
  MdDelete,
  MdRefresh,
  MdOpenInNew,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/Requests.module.scss";

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "sla", label: "SLA" },
  { value: "approved", label: "Согласована" },
  { value: "converted", label: "Конвертирована" },
  { value: "blocked", label: "Заблокирована" },
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

const REQUEST_TYPE_OPTIONS = [
  { value: "all", label: "Все типы заявок" },
  { value: "corporate", label: "Корпоративная" },
  { value: "individual", label: "Индивидуальная" },
  { value: "group", label: "Групповая" },
];

const MOCK_REQUESTS = [
  {
    id: "REQ-145",
    client: "Иван Петров",
    company: "ООО Турист",
    operator: "Айгерим М.",
    status: "in_progress",
    statusLabel: "В работе",
    statusColor: "yellow",
    serviceType: "avia",
    requestType: "corporate",
    createdAt: "12.11.2025",
    lastUpdate: "14:32",
    total: "2 450 USD",
    locked: false,
    sla: "-2ч",
  },
  {
    id: "REQ-144",
    client: "Мария Сидорова",
    company: "ООО РимТур",
    operator: "Бекзат Ж.",
    status: "sla",
    statusLabel: "SLA",
    statusColor: "red",
    serviceType: "hotel",
    requestType: "group",
    createdAt: "11.11.2025",
    lastUpdate: "13:05",
    total: "4 120 EUR",
    locked: true,
    sla: "+3ч",
  },
  {
    id: "REQ-143",
    client: "ООО Алмаз",
    company: "ООО Алмаз",
    operator: "Айгерим М.",
    status: "approved",
    statusLabel: "Согласована",
    statusColor: "green",
    serviceType: "transfer",
    requestType: "corporate",
    createdAt: "10.11.2025",
    lastUpdate: "09:45",
    total: "890 USD",
    locked: false,
    sla: "в срок",
  },
  {
    id: "REQ-142",
    client: "Елена Васильева",
    company: "ИП Васильева",
    operator: "—",
    status: "new",
    statusLabel: "Новая",
    statusColor: "blue",
    serviceType: "visa",
    requestType: "individual",
    createdAt: "09.11.2025",
    lastUpdate: "—",
    total: "1 120 USD",
    locked: false,
    sla: "12ч",
  },
  {
    id: "REQ-141",
    client: "Таиланд Тур",
    company: "ООО Dream Travel",
    operator: "Камила Т.",
    status: "blocked",
    statusLabel: "Заблокирована",
    statusColor: "gray",
    serviceType: "other",
    requestType: "corporate",
    createdAt: "05.11.2025",
    lastUpdate: "08:20",
    total: "6 540 USD",
    locked: true,
    sla: "—",
  },
];

const STATUS_BADGES = {
  green: s.statusGreen,
  yellow: s.statusYellow,
  red: s.statusRed,
  blue: s.statusBlue,
  gray: s.statusGray,
};

export default function AdminRequests() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    operator: "",
    client: "",
    company: "",
    status: "all",
    serviceType: "all",
    requestType: "all",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRequests = useMemo(() => {
    return MOCK_REQUESTS.filter((request) => {
      if (
        filters.operator &&
        !request.operator.toLowerCase().includes(filters.operator.toLowerCase())
      )
        return false;
      if (
        filters.client &&
        !request.client.toLowerCase().includes(filters.client.toLowerCase())
      )
        return false;
      if (
        filters.company &&
        !request.company.toLowerCase().includes(filters.company.toLowerCase())
      )
        return false;
      if (filters.status !== "all" && request.status !== filters.status)
        return false;
      if (
        filters.serviceType !== "all" &&
        request.serviceType !== filters.serviceType
      )
        return false;
      if (
        filters.requestType !== "all" &&
        request.requestType !== filters.requestType
      )
        return false;
      return true;
    });
  }, [filters]);

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (value) => <span className={s.idCell}>{value}</span>,
      flex: 0.7,
    },
    {
      key: "client",
      label: "Клиент",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.cellWithIcon}>
          <div className={s.cellPrimary}>{value}</div>
        </div>
      ),
    },
    {
      key: "operator",
      label: "Оператор",
      flex: 1,
      render: (value) => (
        <div className={s.cellWithIcon}>
          <div>{value}</div>
        </div>
      ),
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
      key: "serviceType",
      label: "Тип услуги",
      flex: 0.8,
      render: (value) => (
        <span className={s.tag}>{SERVICE_TYPE_LABELS[value]}</span>
      ),
    },
    {
      key: "requestType",
      label: "Тип заявки",
      flex: 0.8,
      render: (value) => (
        <span className={s.tag}>{REQUEST_TYPE_LABELS[value]}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Создана",
      flex: 0.9,
    },
    {
      key: "total",
      label: "Сумма",
      flex: 0.9,
    },
    {
      key: "actions",
      label: "",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.rowActions}>
          <button
            className={s.iconButton}
            title="Открыть"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/requests/${row.id}`);
            }}
          >
            <MdOpenInNew size={16} />
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
            title="Пересоздать КП"
            onClick={(e) => e.stopPropagation()}
          >
            <MdRefresh size={16} />
          </button>
          <button
            className={`${s.iconButton} ${s.danger}`}
            title="Удалить"
            onClick={(e) => e.stopPropagation()}
          >
            <MdDelete size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.requests}>
      <div className={s.header}>
        <div>
          <h1>Все заявки</h1>
          <p>Всего заявок: {filteredRequests.length}</p>
        </div>
        <div className={s.headerActions}>
          <Button variant="primary">Создать заявку</Button>
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
        <Input
          label="Компания"
          placeholder="Название компании"
          value={filters.company}
          onChange={(value) => handleChange("company", value)}
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
        <Select
          label="Тип заявки"
          value={filters.requestType}
          onChange={(value) => handleChange("requestType", value)}
          options={REQUEST_TYPE_OPTIONS}
        />
      </div>

      <UITable
        columns={columns}
        rows={filteredRequests}
        showCheckbox
        onRowClick={(row) => router.push(`/admin/requests/${row.id}`)}
      />
    </div>
  );
}

const SERVICE_TYPE_LABELS = {
  avia: "Авиа",
  hotel: "Отель",
  transfer: "Трансфер",
  visa: "Виза",
  insurance: "Страховка",
  railway: "ЖД",
  other: "Другое",
};

const REQUEST_TYPE_LABELS = {
  corporate: "Корпоративная",
  individual: "Индивидуальная",
  group: "Групповая",
};
