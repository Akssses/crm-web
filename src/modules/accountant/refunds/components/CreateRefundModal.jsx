"use client";

import React, { useState } from "react";
import { Modal, Input, Select, Textarea, Button } from "@/ui";

const ORDER_OPTIONS = [
  { value: "ORD-145", label: "#ORD-145 — Командировка" },
  { value: "ORD-210", label: "#ORD-210 — Отель" },
];

const REASONS = [
  { value: "cancellation", label: "Отмена поездки" },
  { value: "supplier", label: "Возврат от поставщика" },
  { value: "tariff_error", label: "Ошибка тарифа" },
  { value: "client_request", label: "Запрос клиента" },
];

const SOURCES = [
  { value: "bank", label: "Банк" },
  { value: "pos", label: "Эквайринг" },
  { value: "cash", label: "Касса" },
];

const CURRENCIES = [
  { value: "RUB", label: "RUB" },
  { value: "KGS", label: "KGS" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

export default function CreateRefundModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    orderId: "ORD-145",
    service: "Командировка (авиа+отель)",
    amount: "0",
    currency: "RUB",
    reason: "cancellation",
    source: "bank",
    description: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создание возврата"
      width="30%"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select
          label="Заказ"
          value={form.orderId}
          onChange={(val) => handleChange("orderId", val)}
          options={ORDER_OPTIONS}
        />
        <Input
          label="Услуга"
          value={form.service}
          onChange={(val) => handleChange("service", val)}
        />
        <div style={{ display: "flex", gap: 12 }}>
          <Input
            label="Сумма возврата"
            type="number"
            value={form.amount}
            onChange={(val) => handleChange("amount", val)}
          />
          <Select
            label="Валюта"
            value={form.currency}
            onChange={(val) => handleChange("currency", val)}
            options={CURRENCIES}
          />
        </div>
        <Select
          label="Причина"
          value={form.reason}
          onChange={(val) => handleChange("reason", val)}
          options={REASONS}
        />
        <Select
          label="Источник возврата"
          value={form.source}
          onChange={(val) => handleChange("source", val)}
          options={SOURCES}
        />
        <Textarea
          label="Описание / комментарий"
          value={form.description}
          onChange={(val) => handleChange("description", val)}
          placeholder="Причина возврата, доп. информация, ссылки на документы..."
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Создать возврат</Button>
        </div>
      </div>
    </Modal>
  );
}
