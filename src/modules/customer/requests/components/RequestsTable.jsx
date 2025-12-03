"use client";

import React from "react";
import { UITable } from "@/ui";
import { useRouter } from "next/navigation";
import { MdChatBubbleOutline } from "react-icons/md";
import s from "@/modules/operator/requests/styles/RequestsTable.module.scss";

const REQUESTS = [
  {
    id: "REQ-2101",
    organization: "ООО «Техносервис»",
    service: "Командировка (авиа + отель)",
    responsible: "Ваш менеджер",
    date: "04.12.2025",
    source: "ЛК заказчика",
    sla: "1 дн. 4 ч.",
    status: "Ожидает подтверждения",
    slaTone: "warning",
    statusTone: "info",
    routeProgress: 75,
    routeLabel: "Маршрут собран",
  },
  {
    id: "REQ-2102",
    organization: "АО «Нева»",
    service: "Авиа + трансфер",
    responsible: "Координатор Петрова",
    date: "03.12.2025",
    source: "Email",
    sla: "7 ч. 12 мин",
    status: "В работе",
    slaTone: "success",
    statusTone: "warning",
    routeProgress: 55,
    routeLabel: "Ожидает документы",
  },
  {
    id: "REQ-2103",
    organization: "ООО «RetailX»",
    service: "Отель",
    responsible: "Менеджер Бахыт",
    date: "01.12.2025",
    source: "TG Bot",
    sla: "Просрочено",
    status: "Активен",
    slaTone: "danger",
    statusTone: "success",
    routeProgress: 100,
    routeLabel: "Готов к запуску",
  },
];

export default function CustomerRequestsTable({ onChatClick }) {
  const router = useRouter();

  const columns = [
    {
      key: "organization",
      label: "Организация / инициатор",
    },
    {
      key: "service",
      label: "Услуга",
    },
    {
      key: "responsible",
      label: "Ответственный",
    },
    {
      key: "date",
      label: "Дата",
    },
    // {
    //   key: "routeProgress",
    //   label: "Маршрут",
    //   render: (_, row) => (
    //     <div className={s.routePill}>
    //       <span className={s.routePercent}>{row.routeProgress}%</span>
    //       <span className={s.routeLabel}>{row.routeLabel}</span>
    //     </div>
    //   ),
    // },
    {
      key: "source",
      label: "Источник",
    },
    {
      key: "sla",
      label: "SLA",
      render: (value, row) => (
        <span
          className={`${s.pill} ${
            row.slaTone === "success"
              ? s.pillSuccess
              : row.slaTone === "danger"
              ? s.pillDanger
              : ""
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span
          className={`${s.pill} ${
            row.statusTone === "success"
              ? s.statusSuccess
              : row.statusTone === "warning"
              ? s.statusWarning
              : row.statusTone === "info"
              ? s.statusInfo
              : ""
          }`}
        >
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
          title="Связаться с оператором"
        >
          <MdChatBubbleOutline size={20} />
        </button>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router.push(`/customer/requests/${row.id}`);
  };

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={REQUESTS}
        showCheckbox={false}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
