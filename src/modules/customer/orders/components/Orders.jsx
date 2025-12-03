"use client";

import React, { useState } from "react";
import { Input, Button, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd, MdFileDownload } from "react-icons/md";
import CustomerOrdersTable from "./OrdersTable";
import OrderChatDrawer from "@/modules/operator/orders/components/OrderChatDrawer";
import s from "@/modules/operator/orders/styles/Orders.module.scss";

const ORGANIZATION_OPTIONS = [
  { value: "all", label: "Все организации" },
  { value: "techno", label: 'ООО "Техносервис"' },
  { value: "retail", label: 'ООО "RetailX"' },
];

const SERVICE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиабилеты" },
  { value: "hotel", label: "Отели" },
  { value: "combo", label: "Командировки" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "awaiting_payment", label: "Ожидает оплаты" },
  { value: "confirmed", label: "Заказ подтвержден" },
  { value: "in_progress", label: "В работе" },
];

export default function CustomerOrders() {
  const [filters, setFilters] = useState({
    organization: "all",
    service: "all",
    status: "all",
  });
  const [searchValue, setSearchValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleChatClick = (order) => {
    setSelectedOrder(order);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
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
            placeholder="Поиск заказа..."
            value={searchValue}
            onChange={setSearchValue}
            className={s.search}
          />
          <Button variant="outline" size="md" icon={MdFileDownload}>
            Экспорт
          </Button>
          <Button variant="bgblue" size="md" icon={MdAdd}>
            Новый заказ
          </Button>
        </div>
      </div>

      <CustomerOrdersTable onChatClick={handleChatClick} />

      <OrderChatDrawer
        isOpen={isChatOpen}
        onClose={handleChatClose}
        order={selectedOrder}
      />
    </div>
  );
}


