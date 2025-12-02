"use client";
import React, { useState } from "react";
import { Select, Button, Input, Modal } from "@/ui";
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import s from "../styles/AdvancedFilters.module.scss";

const DATE_PRESETS = [
  { value: "today", label: "Сегодня" },
  { value: "yesterday", label: "Вчера" },
  { value: "this_week", label: "Эта неделя" },
  { value: "last_week", label: "Прошлая неделя" },
  { value: "this_month", label: "Этот месяц" },
  { value: "last_month", label: "Прошлый месяц" },
  { value: "this_quarter", label: "Этот квартал" },
  { value: "last_quarter", label: "Прошлый квартал" },
  { value: "this_year", label: "Этот год" },
  { value: "last_year", label: "Прошлый год" },
  { value: "custom", label: "Произвольный период" },
];

const ORDER_TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "partner", label: "Партнёрский" },
  { value: "group", label: "Групповой" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиабилеты" },
  { value: "hotel", label: "Отели" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визы" },
  { value: "insurance", label: "Страхование" },
  { value: "tour", label: "Туры" },
];

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "confirmed", label: "Подтверждена" },
  { value: "completed", label: "Завершена" },
  { value: "cancelled", label: "Отменена" },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "paid", label: "Оплачено" },
  { value: "partial", label: "Частично оплачено" },
  { value: "unpaid", label: "Не оплачено" },
  { value: "overdue", label: "Просрочено" },
];

export default function AdvancedFilters({ isOpen, onClose, filters, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters || {
    datePreset: "this_month",
    dateFrom: "",
    dateTo: "",
    organizations: [],
    operators: [],
    suppliers: [],
    orderTypes: ["all"],
    serviceTypes: ["all"],
    currencies: ["all"],
    serviceStatus: ["all"],
    paymentStatus: ["all"],
  });

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      datePreset: "this_month",
      dateFrom: "",
      dateTo: "",
      organizations: [],
      operators: [],
      suppliers: [],
      orderTypes: ["all"],
      serviceTypes: ["all"],
      currencies: ["all"],
      serviceStatus: ["all"],
      paymentStatus: ["all"],
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.organizations?.length > 0) count++;
    if (localFilters.operators?.length > 0) count++;
    if (localFilters.suppliers?.length > 0) count++;
    if (!localFilters.orderTypes.includes("all")) count++;
    if (!localFilters.serviceTypes.includes("all")) count++;
    if (!localFilters.currencies.includes("all")) count++;
    if (!localFilters.serviceStatus.includes("all")) count++;
    if (!localFilters.paymentStatus.includes("all")) count++;
    return count;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Расширенные фильтры"
      icon={CiFilter}
      width="800px"
    >
      <div className={s.filterModal}>
        <div className={s.filterSections}>
          {/* Temporal Filters */}
          <div className={s.filterSection}>
            <h3 className={s.sectionTitle}>Период</h3>
            <div className={s.filterRow}>
              <Select
                label="Быстрый выбор"
                value={localFilters.datePreset}
                onChange={(value) => handleChange("datePreset", value)}
                options={DATE_PRESETS}
              />
            </div>
            {localFilters.datePreset === "custom" && (
              <div className={s.filterRow}>
                <Input
                  label="От"
                  type="date"
                  value={localFilters.dateFrom}
                  onChange={(value) => handleChange("dateFrom", value)}
                />
                <Input
                  label="До"
                  type="date"
                  value={localFilters.dateTo}
                  onChange={(value) => handleChange("dateTo", value)}
                />
              </div>
            )}
          </div>

          {/* Order & Service Types */}
          <div className={s.filterSection}>
            <h3 className={s.sectionTitle}>Типы заказов и услуг</h3>
            <div className={s.filterRow}>
              <Select
                label="Тип заказа"
                value={localFilters.orderTypes[0] || "all"}
                onChange={(value) => handleChange("orderTypes", [value])}
                options={ORDER_TYPE_OPTIONS}
              />
              <Select
                label="Тип услуги"
                value={localFilters.serviceTypes[0] || "all"}
                onChange={(value) => handleChange("serviceTypes", [value])}
                options={SERVICE_TYPE_OPTIONS}
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className={s.filterSection}>
            <h3 className={s.sectionTitle}>Статусы</h3>
            <div className={s.filterRow}>
              <Select
                label="Статус услуги"
                value={localFilters.serviceStatus[0] || "all"}
                onChange={(value) => handleChange("serviceStatus", [value])}
                options={STATUS_OPTIONS}
              />
              <Select
                label="Статус оплаты"
                value={localFilters.paymentStatus[0] || "all"}
                onChange={(value) => handleChange("paymentStatus", [value])}
                options={PAYMENT_STATUS_OPTIONS}
              />
            </div>
          </div>

          {/* Financial Filters */}
          <div className={s.filterSection}>
            <h3 className={s.sectionTitle}>Финансы</h3>
            <div className={s.filterRow}>
              <Select
                label="Валюта"
                value={localFilters.currencies[0] || "all"}
                onChange={(value) => handleChange("currencies", [value])}
                options={CURRENCY_OPTIONS}
              />
            </div>
          </div>

          {/* Entity Filters - Placeholder for multi-select */}
          <div className={s.filterSection}>
            <h3 className={s.sectionTitle}>Организации и сотрудники</h3>
            <div className={s.filterRow}>
              <Input
                label="Организации"
                placeholder="Выберите организации..."
                value={localFilters.organizations.join(", ")}
                readOnly
              />
              <Input
                label="Операторы"
                placeholder="Выберите операторов..."
                value={localFilters.operators.join(", ")}
                readOnly
              />
            </div>
            <div className={s.filterRow}>
              <Input
                label="Поставщики"
                placeholder="Выберите поставщиков..."
                value={localFilters.suppliers.join(", ")}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={s.filterActions}>
          <div className={s.filterInfo}>
            {getActiveFilterCount() > 0 && (
              <span className={s.activeCount}>
                Активных фильтров: {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className={s.actionButtons}>
            <Button variant="outline" onClick={handleReset}>
              Сбросить всё
            </Button>
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Применить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
