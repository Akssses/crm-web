"use client";

import React from "react";
import { UITable } from "@/ui";
import { useRouter } from "next/navigation";
import { MdChatBubbleOutline } from "react-icons/md";
import s from "../styles/OrdersTable.module.scss";

const ORDERS = [
  {
    id: "ORD-001",
    client: "Анна Петрова",
    organization: "Asia Travel Group",
    service: "Авиабилеты",
    date: "15.11.2024",
    amount: "144.000 RUB",
    payment: "Частично",
    status: "В работе",
    statusColor: "green",
  },
];

export default function OrdersTable({ filters = {}, onChatClick = null }) {
  const router = useRouter();

  const columns = [
    {
      key: "client",
      label: "Клиент",
    },
    {
      key: "organization",
      label: "Организация",
    },
    {
      key: "service",
      label: "Услуга",
    },
    {
      key: "date",
      label: "Дата",
    },
    {
      key: "amount",
      label: "Сумма",
      render: (value) => <span className={s.amount}>{value}</span>,
    },
    {
      key: "payment",
      label: "Оплата",
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}>
          {value}
        </span>
      ),
    },
    {
      key: "chat",
      label: "",
      width: "60px",
      render: (value, row) => (
        <button
          className={s.chatButton}
          onClick={(e) => {
            e.stopPropagation();
            onChatClick?.(row);
          }}
          title="Открыть чат"
        >
          <MdChatBubbleOutline size={20} />
        </button>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router.push(`/operator/orders/${row.id}`);
  };

  const handleRowAction = (row) => {
    // TODO: Open actions menu
    console.log("Actions for order:", row.id);
  };

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={ORDERS}
        showCheckbox={true}
        onRowClick={handleRowClick}
        onRowAction={handleRowAction}
      />
    </div>
  );
}
