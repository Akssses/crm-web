"use client";
import React, { useState } from "react";
import { Container, UITable, Select } from "@/ui";
import {
  MdCheckCircle,
  MdAccessTime,
  MdWarning,
  MdCancel,
} from "react-icons/md";
import s from "../styles/DocumentsJournal.module.scss";

const STATUS_CONFIG = {
  uploaded: { label: "Загружено", color: "green", icon: MdCheckCircle },
  pending: { label: "Ожидается", color: "yellow", icon: MdAccessTime },
  replacement_required: {
    label: "Требуется замена",
    color: "orange",
    icon: MdWarning,
  },
  overdue: { label: "Просрочено", color: "red", icon: MdWarning },
  not_required: { label: "Не требуется", color: "gray", icon: MdCancel },
};

export default function DocumentsJournal() {
  const [filter, setFilter] = useState("all");

  const journalEntries = [
    {
      id: 1,
      action: "Загружен документ",
      documentName: "Авиабилет TK214.pdf",
      documentType: "Билет",
      serviceId: "SRV-001",
      serviceName: "Авиаперелёт - Turkish Airlines TK214",
      orderId: "ORD-123",
      user: "Оператор Айсулуу М.",
      date: "10.10.2025 14:30",
      status: "uploaded",
    },
    {
      id: 2,
      action: "Ожидается документ",
      documentName: "Счет на оплату",
      documentType: "Счет",
      serviceId: "SRV-001",
      serviceName: "Авиаперелёт - Turkish Airlines TK214",
      orderId: "ORD-123",
      user: "Система",
      date: "10.10.2025 12:00",
      status: "pending",
    },
    {
      id: 3,
      action: "Загружен документ",
      documentName: "Ваучер отеля.pdf",
      documentType: "Ваучер",
      serviceId: "SRV-002",
      serviceName: "Отель - Hilton Istanbul Bosphorus",
      orderId: "ORD-123",
      user: "Оператор Айсулуу М.",
      date: "11.10.2025 10:15",
      status: "uploaded",
    },
    {
      id: 4,
      action: "Требуется замена",
      documentName: "Акт выполненных работ.pdf",
      documentType: "Акт",
      serviceId: "SRV-002",
      serviceName: "Отель - Hilton Istanbul Bosphorus",
      orderId: "ORD-123",
      user: "Оператор Айсулуу М.",
      date: "08.10.2025 16:45",
      status: "replacement_required",
    },
    {
      id: 5,
      action: "Просрочен документ",
      documentName: "Визовое приглашение",
      documentType: "Визовый документ",
      serviceId: "SRV-004",
      serviceName: "Визовая поддержка",
      orderId: "ORD-125",
      user: "Система",
      date: "05.10.2025 09:00",
      status: "overdue",
    },
    {
      id: 6,
      action: "Загружен документ",
      documentName: "Полис страхования.pdf",
      documentType: "Страховка",
      serviceId: "SRV-005",
      serviceName: "Страховка - Travel Insurance",
      orderId: "ORD-125",
      user: "Оператор Айсулуу М.",
      date: "13.10.2025 11:20",
      status: "uploaded",
    },
  ];

  const filteredEntries = journalEntries.filter((entry) => {
    if (filter !== "all" && entry.status !== filter) return false;
    return true;
  });

  const columns = [
    {
      key: "date",
      label: "Дата",
      flex: 1,
    },
    {
      key: "action",
      label: "Действие",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.actionCell}>
          <span className={s.actionText}>{value}</span>
          <span className={s.documentName}>{row.documentName}</span>
        </div>
      ),
    },
    {
      key: "documentType",
      label: "Тип документа",
      flex: 1,
    },
    {
      key: "serviceName",
      label: "Услуга",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.serviceCell}>
          <span className={s.serviceName}>{value}</span>
          <span className={s.serviceId}>{row.serviceId}</span>
        </div>
      ),
    },
    {
      key: "orderId",
      label: "Заказ",
      flex: 0.8,
    },
    {
      key: "user",
      label: "Пользователь",
      flex: 1.2,
    },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value, row) => {
        const statusConfig = STATUS_CONFIG[row.status];
        const StatusIcon = statusConfig.icon;
        return (
          <span
            className={`${s.statusBadge} ${s[`status-${statusConfig.color}`]}`}
          >
            <StatusIcon size={16} />
            {statusConfig.label}
          </span>
        );
      },
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Журнал документов</h3>
        <div className={s.filterWrapper}>
          <Select
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "Все записи" },
              { value: "uploaded", label: "Загружено" },
              { value: "pending", label: "Ожидается" },
              { value: "replacement_required", label: "Требуется замена" },
              { value: "overdue", label: "Просрочено" },
            ]}
          />
        </div>
      </div>

      <UITable columns={columns} rows={filteredEntries} type="default" />
    </Container>
  );
}
