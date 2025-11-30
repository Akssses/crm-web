"use client";
import React from "react";
import { Button, Input, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import s from "../styles/ServicesFilters.module.scss";

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

export default function ServicesFilters({
  filters,
  onFilterChange,
  searchValue,
  onSearchChange,
  onAddClick,
}) {
  return (
    <div className={s.filters}>
      <div className={s.filterGroup}>
        <div className={s.selectWrapper}>
          <Select
            value={filters.type || "all"}
            onChange={(value) => onFilterChange("type", value)}
            options={SERVICE_TYPE_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.status || "all"}
            onChange={(value) => onFilterChange("status", value)}
            options={STATUS_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.paymentStatus || "all"}
            onChange={(value) => onFilterChange("paymentStatus", value)}
            options={PAYMENT_STATUS_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.supplier || "all"}
            onChange={(value) => onFilterChange("supplier", value)}
            options={SUPPLIER_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.problems || "all"}
            onChange={(value) => onFilterChange("problems", value)}
            options={PROBLEM_OPTIONS}
          />
        </div>
      </div>
      <div className={s.actions}>
        <Input
          icon={IoSearchOutline}
          placeholder="Поиск по услугам..."
          value={searchValue}
          onChange={onSearchChange}
          className={s.search}
        />
        <Button variant="bgblue" size="md" icon={MdAdd} onClick={onAddClick}>
          Добавить услугу
        </Button>
      </div>
    </div>
  );
}
