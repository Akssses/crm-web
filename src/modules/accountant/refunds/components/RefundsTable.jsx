"use client";

import React from "react";
import { UITable } from "@/ui";
const STATUS_STYLES = {
  created: { bg: "#e5e7eb", color: "#374151" },
  awaiting: { bg: "#fef3c7", color: "#92400e" },
  processing: { bg: "#dbeafe", color: "#1d4ed8" },
  returned: { bg: "#dcfce7", color: "#166534" },
  partial: { bg: "#fee2e2", color: "#b45309" },
  declined: { bg: "#fee2e2", color: "#b91c1c" },
  error: { bg: "#fee2e2", color: "#b91c1c" },
  settlement: { bg: "#ede9fe", color: "#6d28d9" },
};

const StatusBadge = ({ value }) => {
  const style = STATUS_STYLES[value] || STATUS_STYLES.processing;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        background: style.bg,
        color: style.color,
        textTransform: "capitalize",
      }}
    >
      {value.replace("_", " ")}
    </span>
  );
};

export default function RefundsTable({ rows = [], onRowClick }) {
  const columns = [
    { key: "date", label: "Дата операции" },
    {
      key: "amount",
      label: "Сумма",
      render: (value, row) => (
        <span style={{ fontWeight: 600 }}>
          {value} {row.currency}
        </span>
      ),
    },
    // { key: "exchangeRate", label: "Курс валюты" },
    {
      key: "type",
      label: "Тип возврата",
      render: (value) => (value === "supplier" ? "От поставщика" : "Клиенту"),
    },
    { key: "reason", label: "Причина" },
    {
      key: "status",
      label: "Статус",
      render: (value) => <StatusBadge value={value} />,
    },
    { key: "orderId", label: "Заказ" },
    { key: "service", label: "Услуга" },
    // { key: "source", label: "Источник" },
    { key: "operator", label: "Инициатор" },
    { key: "approver", label: "Утвердил" },
  ];

  return (
    <UITable
      columns={columns}
      rows={rows}
      showCheckbox={false}
      onRowClick={(row) => onRowClick?.(row)}
    />
  );
}
