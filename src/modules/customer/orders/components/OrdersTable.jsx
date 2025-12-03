"use client";

import React from "react";
import { UITable } from "@/ui";
import { useRouter } from "next/navigation";
import { MdChatBubbleOutline } from "react-icons/md";
import s from "@/modules/operator/orders/styles/OrdersTable.module.scss";
import reqStyles from "@/modules/operator/requests/styles/RequestsTable.module.scss";

const ORDERS = [
  {
    id: "ORD-301",
    client: "Иванов Игорь",
    organization: "ООО «Техносервис»",
    service: "Командировка (авиа + отель)",
    date: "04.12.2025",
    amount: "248 000 ₽",
    payment: "Ожидает оплаты",
    status: "Ожидает оплаты",
    statusColor: "warning",
    routeProgress: 82,
    routeLabel: "Все услуги подтверждены",
  },
  {
    id: "ORD-302",
    client: "Петрова Анна",
    organization: "АО «Нева»",
    service: "Авиа + трансфер",
    date: "03.12.2025",
    amount: "112 500 ₽",
    payment: "Счёт выставлен",
    status: "Заказ подтвержден",
    statusColor: "success",
    routeProgress: 95,
    routeLabel: "Готов к выдаче билетов",
  },
  {
    id: "ORD-303",
    client: "Сидоров Максим",
    organization: "ООО «RetailX»",
    service: "Отель",
    date: "30.11.2025",
    amount: "78 900 ₽",
    payment: "Оплачено",
    status: "В работе",
    statusColor: "info",
    routeProgress: 60,
    routeLabel: "Ждём подтверждение поставщика",
  },
];

export default function CustomerOrdersTable({ onChatClick }) {
  const router = useRouter();

  const columns = [
    { key: "client", label: "Сотрудник" },
    { key: "organization", label: "Организация" },
    { key: "service", label: "Услуга" },
    { key: "date", label: "Дата" },
    // {
    //   key: "routeProgress",
    //   label: "Маршрут",
    //   render: (_, row) => (
    //     <div className={reqStyles.routePill}>
    //       <span className={reqStyles.routePercent}>{row.routeProgress}%</span>
    //       <span className={reqStyles.routeLabel}>{row.routeLabel}</span>
    //     </div>
    //   ),
    // },
    {
      key: "amount",
      label: "Сумма",
      render: (value) => <span className={s.amount}>{value}</span>,
    },
    { key: "payment", label: "Оплата" },
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
      render: (_, row) => (
        <button
          className={s.chatButton}
          onClick={(e) => {
            e.stopPropagation();
            onChatClick?.(row);
          }}
          title="Связаться с менеджером"
        >
          <MdChatBubbleOutline size={20} />
        </button>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router.push(`/customer/orders/${row.id}`);
  };

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={ORDERS}
        showCheckbox={false}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
