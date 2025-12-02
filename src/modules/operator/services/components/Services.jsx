"use client";
import React, { useState } from "react";
import { Select } from "@/ui";
import ServicesTable from "./ServicesTable";
import s from "../styles/Services.module.scss";

const MOCK_SERVICES = [
  {
    id: 1,
    type: "avia",
    typeLabel: "Авиа",
    title: "Авиаперелёт (туда)",
    subtitle: "Рейс КС-123",
    route: "Бишкек (FRU) → Дубай (DXB)",
    dates: "18.03.2024",
    price: "$450",
    passenger: "Петров И.С.",
    supplier: "Air Manas",
    orderId: "ORD-001",
    deadline: "20.03.2024",
    supplierStatus: "confirmed",
    paymentStatus: "paid",
    sla: "В срок",
    slaViolated: false,
    documentsReceived: true,
    hasProblems: false,
  },
  {
    id: 2,
    type: "hotel",
    typeLabel: "Отель",
    title: "Jumeirah Beach Hotel",
    subtitle: "7 ночей",
    route: null,
    dates: "18.03 - 25.03.2024",
    price: "$1,890",
    passenger: "Петров И.С.",
    supplier: "Booking.com",
    orderId: "ORD-001",
    deadline: "17.03.2024",
    supplierStatus: "pending",
    paymentStatus: "unpaid",
    sla: "В срок",
    slaViolated: false,
    documentsReceived: false,
    hasProblems: true,
  },
  {
    id: 3,
    type: "transfer",
    typeLabel: "Трансфер",
    title: "Трансфер аэропорт-отель",
    subtitle: "VIP",
    route: "DXB → Jumeirah Beach Hotel",
    dates: "18.03.2024, 12:45",
    price: "$120",
    passenger: "Петров И.С.",
    supplier: "Local Transfer",
    orderId: "ORD-001",
    deadline: "18.03.2024",
    supplierStatus: "action_required",
    paymentStatus: "partial",
    sla: "Нарушен",
    slaViolated: true,
    documentsReceived: true,
    hasProblems: true,
  },
  {
    id: 4,
    type: "visa",
    typeLabel: "Визы",
    title: "Туристическая виза ОАЭ",
    subtitle: "Однократная",
    route: null,
    dates: "До 15.03.2024",
    price: "$80",
    passenger: "Петров И.С.",
    supplier: "Visa Service",
    orderId: "ORD-001",
    deadline: "15.03.2024",
    supplierStatus: "confirmed",
    paymentStatus: "paid",
    sla: "В срок",
    slaViolated: false,
    documentsReceived: true,
    hasProblems: false,
  },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отель" },
  { value: "transfer", label: "Трансфер" },
  { value: "train", label: "ЖД" },
  { value: "visa", label: "Визы" },
  { value: "insurance", label: "Страховка" },
  { value: "tour", label: "Экскурсия" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "pending", label: "Ожидает подтверждения" },
  { value: "confirmed", label: "Подтверждено" },
  { value: "rejected", label: "Отклонено" },
  { value: "action_required", label: "Требуется действие" },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: "all", label: "Все статусы оплаты" },
  { value: "paid", label: "Оплачено" },
  { value: "partial", label: "Частично оплачено" },
  { value: "unpaid", label: "Не оплачено" },
];

const SUPPLIER_OPTIONS = [
  { value: "all", label: "Все поставщики" },
  { value: "booking", label: "Booking.com" },
  { value: "air_manas", label: "Air Manas" },
  { value: "turkish", label: "Turkish Airlines" },
];

const PROBLEM_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "problems", label: "Только проблемные" },
  { value: "no_problems", label: "Без проблем" },
];

export default function Services() {
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    paymentStatus: "all",
    supplier: "all",
    problems: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter services
  const filteredServices = MOCK_SERVICES.filter((service) => {
    if (filters.type !== "all" && service.type !== filters.type) return false;
    if (filters.status !== "all" && service.supplierStatus !== filters.status)
      return false;
    if (
      filters.paymentStatus !== "all" &&
      service.paymentStatus !== filters.paymentStatus
    )
      return false;
    if (
      filters.supplier !== "all" &&
      service.supplier.toLowerCase() !== filters.supplier.toLowerCase()
    )
      return false;
    if (filters.problems === "problems" && !service.hasProblems) return false;
    if (filters.problems === "no_problems" && service.hasProblems) return false;
    return true;
  });

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleChat = () => {};

  return (
    <div className={s.services}>
      <div className={s.filterGroup}>
        <div className={s.selectWrapper}>
          <Select
            value={filters.type || "all"}
            onChange={(value) => handleFilterChange("type", value)}
            options={SERVICE_TYPE_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.status || "all"}
            onChange={(value) => handleFilterChange("status", value)}
            options={STATUS_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.paymentStatus || "all"}
            onChange={(value) => handleFilterChange("paymentStatus", value)}
            options={PAYMENT_STATUS_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.supplier || "all"}
            onChange={(value) => handleFilterChange("supplier", value)}
            options={SUPPLIER_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.problems || "all"}
            onChange={(value) => handleFilterChange("problems", value)}
            options={PROBLEM_OPTIONS}
          />
        </div>
      </div>

      <div className={s.tableWrapper}>
        <ServicesTable
          services={filteredServices}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChat={handleChat}
        />
      </div>
    </div>
  );
}
