"use client";
import React from "react";
import { UITable, Button } from "@/ui";
import {
  MdEdit,
  MdDelete,
  MdChatBubbleOutline,
  MdWarning,
  MdCheckCircle,
  MdAccessTime,
  MdCancel,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/ServicesTable.module.scss";

const STATUS_CONFIG = {
  pending: {
    label: "Ожидает подтверждения",
    color: "yellow",
    icon: MdAccessTime,
  },
  confirmed: { label: "Подтверждено", color: "green", icon: MdCheckCircle },
  rejected: { label: "Отклонено", color: "red", icon: MdCancel },
  action_required: {
    label: "Требуется действие",
    color: "orange",
    icon: MdWarning,
  },
};

const PAYMENT_STATUS_CONFIG = {
  paid: { label: "Оплачено", color: "green" },
  partial: { label: "Частично оплачено", color: "yellow" },
  unpaid: { label: "Не оплачено", color: "red" },
};

export default function ServicesTable({ services, onEdit, onDelete, onChat }) {
  const router = useRouter();

  const columns = [
    {
      key: "type",
      label: "Тип",
      width: "100px",
      render: (value, row) => (
        <div className={s.typeCell}>
          <span className={s.typeBadge}>{row.typeLabel}</span>
        </div>
      ),
    },
    {
      key: "title",
      label: "Услуга",
      render: (value, row) => (
        <div className={s.serviceCell}>
          <div className={s.serviceTitle}>{value}</div>
          {row.subtitle && (
            <div className={s.serviceSubtitle}>{row.subtitle}</div>
          )}
          {row.hasProblems && (
            <div className={s.problemIndicator}>
              <MdWarning size={14} />
              <span>Проблемы</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "route",
      label: "Маршрут/Детали",
      render: (value, row) => (
        <div className={s.routeCell}>{row.route || row.dates || "—"}</div>
      ),
    },
    {
      key: "passenger",
      label: "Пассажир",
      width: "150px",
    },
    {
      key: "supplier",
      label: "Поставщик",
      width: "150px",
    },
    {
      key: "supplierStatus",
      label: "Статус поставщика",
      width: "180px",
      render: (value, row) => {
        const config = STATUS_CONFIG[value] || STATUS_CONFIG.pending;
        const Icon = config.icon;
        return (
          <div className={s.statusCell}>
            <Icon size={16} className={s[`statusIcon-${config.color}`]} />
            <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
              {config.label}
            </span>
          </div>
        );
      },
    },
    {
      key: "paymentStatus",
      label: "Оплата",
      width: "150px",
      render: (value) => {
        const config =
          PAYMENT_STATUS_CONFIG[value] || PAYMENT_STATUS_CONFIG.unpaid;
        return (
          <span className={`${s.paymentBadge} ${s[`payment-${config.color}`]}`}>
            {config.label}
          </span>
        );
      },
    },
    {
      key: "sla",
      label: "SLA",
      width: "100px",
      render: (value, row) => (
        <span className={row.slaViolated ? s.slaViolated : s.slaOk}>
          {value}
        </span>
      ),
    },
    {
      key: "price",
      label: "Стоимость",
      width: "120px",
      render: (value) => <span className={s.priceCell}>{value}</span>,
    },
    {
      key: "orderId",
      label: "Заказ",
      width: "120px",
      render: (value) => (
        <span
          className={s.orderLink}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/operator/orders/${value}`);
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      width: "200px",
      render: (value, row) => (
        <div className={s.actionsCell}>
          <button
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(row);
            }}
            title="Редактировать"
          >
            <MdEdit size={18} />
          </button>
          <button
            className={s.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onChat?.(row);
            }}
            title="Чат"
          >
            <MdChatBubbleOutline size={18} />
          </button>
          <button
            className={`${s.actionButton} ${s.danger}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(row);
            }}
            title="Удалить"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleRowClick = (row) => {
    onEdit?.(row);
  };

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={services}
        showCheckbox={true}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
