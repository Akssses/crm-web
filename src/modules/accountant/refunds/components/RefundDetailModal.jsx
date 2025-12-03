"use client";

import React, { useMemo, useState } from "react";
import { Modal, Button, UITable } from "@/ui";
import { BsArrowCounterclockwise } from "react-icons/bs";

const SERVICE_COLUMNS = [
  { key: "service", label: "Услуга" },
  { key: "original", label: "Изначальная сумма" },
  { key: "refund", label: "Сумма возврата" },
  { key: "commission", label: "Комиссия" },
  { key: "final", label: "Итого" },
];

export default function RefundDetailModal({ refund, onClose }) {
  const [activeTab, setActiveTab] = useState("summary");
  const isOpen = Boolean(refund);

  const serviceRows = useMemo(() => {
    if (!refund) return [];
    return [
      {
        service: refund.service || "Авиа",
        original: "35 000 RUB",
        refund: "30 000 RUB",
        commission: "500 RUB",
        final: "29 500 RUB",
      },
      {
        service: "Отель",
        original: "18 000 RUB",
        refund: "15 000 RUB",
        commission: "300 RUB",
        final: "14 700 RUB",
      },
    ];
  }, [refund]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Возврат ${refund?.id}`}
      position="right"
      width="45%"
      icon={BsArrowCounterclockwise}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["summary", "history", "documents"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "bgblue" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab === "summary" && "Основные данные"}
              {tab === "history" && "История операции"}
              {tab === "documents" && "Документы"}
            </Button>
          ))}
        </div>

        {activeTab === "summary" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InfoRow label="Сумма первоначального платежа" value="65 000 RUB" bold />
            <InfoRow label="Сумма удержаний" value="5 000 RUB (штраф поставщика)" />
            <InfoRow label="Комиссия платёжной системы" value="350 RUB" />
            <InfoRow label="Сумма к возврату" value="59 650 RUB" bold />
            <InfoRow label="Источник возврата" value="Банк (эквайринг Tinkoff)" />
            <InfoRow label="Документы" value="Акт №123, письмо поставщика" />
            <div>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                Детализация по услугам
              </span>
              <UITable columns={SERVICE_COLUMNS} rows={serviceRows} showCheckbox={false} />
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <HistoryItem
              date="25.10.2025 14:12"
              text="Возврат перечислен клиенту, статус изменён на «Возвращено»"
            />
            <HistoryItem
              date="25.10.2025 13:40"
              text="Операция утверждена бухгалтером Бахыт К."
            />
            <HistoryItem
              date="25.10.2025 13:10"
              text="Поставщик подтвердил удержание 5 000 RUB"
            />
            <HistoryItem
              date="25.10.2025 12:50"
              text="Возврат создан оператором Айгерим М."
            />
          </div>
        )}

        {activeTab === "documents" && (
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Загрузите подтверждающие документы через форму возврата. Пока файлы не
            прикреплены.
          </div>
        )}
      </div>
    </Modal>
  );
}

function InfoRow({ label, value, bold = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ fontSize: 13, color: "#6b7280" }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 500 }}>{value}</span>
    </div>
  );
}

function HistoryItem({ date, text }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "10px 12px",
        background: "#f9fafb",
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280" }}>{date}</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{text}</div>
    </div>
  );
}


