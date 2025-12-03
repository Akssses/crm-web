"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd, MdFileDownload } from "react-icons/md";
import RequestsTable from "./RequestsTable";
import OrderChatDrawer from "@/modules/operator/orders/components/OrderChatDrawer";
import s from "@/modules/operator/requests/styles/Requests.module.scss";

const ORGANIZATION_OPTIONS = [
  { value: "all", label: "Все организации" },
  { value: "asia", label: 'ООО "Asia Travel"' },
  { value: "business", label: 'ООО "Бизнес Тревел"' },
  { value: "techno", label: 'ООО "Техносервис"' },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "active", label: "Активна" },
  { value: "in_progress", label: "В работе" },
  { value: "pending", label: "В ожидании" },
  { value: "awaiting_confirmation", label: "Ожидает подтверждения" },
  { value: "overdue", label: "Просрочено" },
];

const SERVICE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиаперелет" },
  { value: "hotel", label: "Отель" },
  { value: "transfer", label: "Трансфер" },
  { value: "visa", label: "Визы" },
];

export default function CustomerRequests() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    organization: "all",
    status: "all",
    service: "all",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleCreateRequest = () => {
    router.push("/customer/requests/create");
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleChatClick = (request) => {
    const toneToColor = {
      success: "green",
      warning: "yellow",
      info: "blue",
      danger: "red",
    };
    const orderData = {
      id: request.id,
      client: request.organization,
      organization: request.organization,
      service: request.service,
      date: request.date,
      status: request.status,
      statusColor: toneToColor[request.statusTone] || "gray",
    };

    if (isChatOpen) {
      setSelectedRequest(orderData);
    } else {
      setSelectedRequest(orderData);
      setIsChatOpen(true);
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className={s.requests}>
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
              value={filters.status}
              onChange={(value) => handleFilterChange("status", value)}
              options={STATUS_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.service}
              onChange={(value) => handleFilterChange("service", value)}
              options={SERVICE_OPTIONS}
            />
          </div>
        </div>
        <div className={s.actions}>
          <Input
            placeholder="Поиск..."
            icon={IoSearchOutline}
            className={s.search}
          />
          <Button variant="outline" size="md" icon={MdFileDownload}>
            Экспорт
          </Button>
          <Button
            variant="bgblue"
            size="md"
            icon={MdAdd}
            onClick={handleCreateRequest}
          >
            Новая заявка
          </Button>
        </div>
      </div>

      <RequestsTable filters={filters} onChatClick={handleChatClick} />

      <OrderChatDrawer
        isOpen={isChatOpen}
        onClose={handleChatClose}
        order={selectedRequest}
      />
    </div>
  );
}


