"use client";

import React, { useState } from "react";
import { Input, Button, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import OrdersTable from "./OrdersTable";
import OrderChatDrawer from "./OrderChatDrawer";
import s from "../styles/Orders.module.scss";

const ORGANIZATION_OPTIONS = [
  { value: "all", label: "Все организации" },
  { value: "asia", label: 'ООО "Asia Travel Group"' },
  { value: "business", label: 'ООО "Бизнес Тревел"' },
  { value: "techno", label: 'ООО "Техносервис"' },
];

const SERVICE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиабилеты" },
  { value: "hotel", label: "Отель" },
  { value: "transfer", label: "Трансфер" },
  { value: "visa", label: "Визы" },
  { value: "tour", label: "Туры" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Завершен" },
  { value: "pending", label: "В ожидании" },
  { value: "cancelled", label: "Отменен" },
];

export default function Orders() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    organization: "all",
    service: "all",
    status: "all",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAddOrder = () => {
    // TODO: Open add order modal or navigate
    console.log("Add order");
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleChatClick = (order) => {
    // Если панель уже открыта, просто обновляем контекст
    if (isChatOpen) {
      setSelectedOrder(order);
    } else {
      setSelectedOrder(order);
      setIsChatOpen(true);
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    // Не сбрасываем selectedOrder, чтобы при повторном открытии сохранялся контекст
  };

  return (
    <div className={s.orders}>
      <div className={s.header}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.organization}
              onChange={(value) => handleFilterChange("organization", value)}
              options={ORGANIZATION_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.service}
              onChange={(value) => handleFilterChange("service", value)}
              options={SERVICE_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>
        <div className={s.actions}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            value={searchValue}
            onChange={setSearchValue}
            className={s.search}
          />
          <Button
            variant="bgblue"
            size="md"
            icon={MdAdd}
            onClick={handleAddOrder}
          >
            Добавить заказ
          </Button>
        </div>
      </div>

      <OrdersTable filters={filters} onChatClick={handleChatClick} />

      <OrderChatDrawer
        isOpen={isChatOpen}
        onClose={handleChatClose}
        order={selectedOrder}
      />
    </div>
  );
}
