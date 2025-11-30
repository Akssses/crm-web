"use client";
import React from "react";
import { Select, Button } from "@/ui";
import { MdAdd } from "react-icons/md";
import s from "../styles/DocumentsFilters.module.scss";

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отели" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визы" },
  { value: "insurance", label: "Страховки" },
  { value: "railway", label: "ЖД" },
  { value: "other", label: "Другие" },
];

const DOCUMENT_TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "ticket", label: "Билет" },
  { value: "voucher", label: "Ваучер" },
  { value: "confirmation", label: "Подтверждение бронирования" },
  { value: "insurance", label: "Страховка" },
  { value: "visa", label: "Визовый документ" },
  { value: "invoice", label: "Счет" },
  { value: "act", label: "Акт" },
  { value: "other", label: "Другое" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "uploaded", label: "Загружено" },
  { value: "pending", label: "Ожидается" },
  { value: "replacement_required", label: "Требуется замена" },
  { value: "overdue", label: "Просрочено" },
  { value: "not_required", label: "Не требуется" },
];

export default function DocumentsFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleAddDocument = () => {
    // TODO: Open add document modal
    console.log("Add document");
  };

  return (
    <div className={s.filters}>
      <div className={s.filterGroup}>
        <div className={s.selectWrapper}>
          <Select
            value={filters.serviceType}
            onChange={(value) => handleFilterChange("serviceType", value)}
            options={SERVICE_TYPE_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.documentType}
            onChange={(value) => handleFilterChange("documentType", value)}
            options={DOCUMENT_TYPE_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            options={STATUS_OPTIONS}
          />
        </div>
        <div className={s.selectWrapper}>
          <Select
            value={filters.service}
            onChange={(value) => handleFilterChange("service", value)}
            options={[
              { value: "all", label: "Все услуги" },
              { value: "SRV-001", label: "SRV-001 - Авиаперелёт" },
              { value: "SRV-002", label: "SRV-002 - Отель" },
              { value: "SRV-003", label: "SRV-003 - Трансфер" },
            ]}
          />
        </div>
      </div>
      <div className={s.actions}>
        <Button variant="primary" icon={MdAdd} onClick={handleAddDocument}>
          Загрузить документ
        </Button>
      </div>
    </div>
  );
}
