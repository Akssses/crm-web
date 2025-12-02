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
    label: "Ожидает",
    color: "yellow",
    icon: MdAccessTime,
  },
  confirmed: { label: "Подтверждено", color: "green", icon: MdCheckCircle },
  rejected: { label: "Отклонено", color: "red", icon: MdCancel },
  action_required: {
    label: "Требуется действие",
    color: "yellow",
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
      key: "orderId",
      label: "Заказ",
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
      key: "title",
      label: "Услуга",
      width: "250px",
      render: (value, row) => (
        <div className={s.serviceCell}>
          <div className={s.serviceTitle}>{value}</div>
        </div>
      ),
    },
    {
      key: "supplier",
      label: "Поставщик",
    },
    {
      key: "supplierStatus",
      label: "Статус поставщика",
      render: (value, row) => {
        const config = STATUS_CONFIG[value] || STATUS_CONFIG.pending;
        return (
          <div className={s.statusCell}>
            <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
              {config.label}
            </span>
          </div>
        );
      },
    },

    {
      key: "sla",
      label: "SLA",
      render: (value, row) => (
        <span className={row.slaViolated ? s.slaViolated : s.slaOk}>
          {value}
        </span>
      ),
    },
    {
      key: "price",
      label: "Стоимость",
      render: (value) => <span className={s.priceCell}>{value}</span>,
    },
    {
      key: "actions",
      label: "Действия",
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
    router.push(`/operator/services/${row.id}`);
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
