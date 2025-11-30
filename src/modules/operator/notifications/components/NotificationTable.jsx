"use client";
import React, { useState } from "react";
import { Container, UITable, Select } from "@/ui";
import {
  MdError,
  MdCheckCircle,
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight,
  MdChatBubbleOutline,
  MdDescription,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/NotificationTable.module.scss";

const EVENT_TYPE_OPTIONS = [
  { value: "all", label: "Все типы" },
  { value: "sla", label: "SLA" },
  { value: "completed", label: "Выполнено" },
  { value: "reminder", label: "Напоминание" },
  { value: "supplier", label: "Поставщик" },
  { value: "payment", label: "Платёж" },
  { value: "order", label: "Заказ" },
  { value: "request", label: "Заявка" },
];

const SLA_OPTIONS = [
  { value: "all", label: "Все SLA" },
  { value: "violated", label: "Нарушения" },
  { value: "warning", label: "Предупреждения" },
  { value: "ok", label: "В норме" },
];

const SUPPLIER_OPTIONS = [
  { value: "all", label: "Все поставщики" },
  { value: "supplier1", label: "Поставщик 1" },
  { value: "supplier2", label: "Поставщик 2" },
  { value: "supplier3", label: "Поставщик 3" },
];

export default function NotificationTable() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    eventType: "all",
    sla: "all",
    supplier: "all",
  });
  const totalItems = 47;

  const notifications = [
    {
      id: 1,
      type: "SLA",
      typeIcon: MdError,
      typeColor: "#ef4444",
      message: "Оператор Айбек просрочил заявку Z-002",
      messageDetail: "Критическое нарушение SLA",
      time: "12:40",
      status: "Новое",
      statusColor: "orange",
      eventType: "sla",
      slaType: "violated",
      requestId: "REQ-002",
      orderId: null,
      supplierId: null,
    },
    {
      id: 2,
      type: "Выполнено",
      typeIcon: MdCheckCircle,
      typeColor: "#10b981",
      message: "Азамат закрыл заказ ORD-123",
      messageDetail: "Заказ успешно выполнен",
      time: "12:00",
      status: "Прочитано",
      statusColor: "gray",
      eventType: "completed",
      slaType: "ok",
      requestId: null,
      orderId: "ORD-123",
      supplierId: null,
    },
    {
      id: 3,
      type: "Напоминание",
      typeIcon: MdCalendarToday,
      typeColor: "#3b82f6",
      message: "Проверить SLA по отделу",
      messageDetail: "Еженедельная проверка показателей",
      time: "09:00",
      status: "Новое",
      statusColor: "orange",
      eventType: "reminder",
      slaType: "warning",
      requestId: null,
      orderId: null,
      supplierId: null,
    },
    {
      id: 4,
      type: "Поставщик",
      typeIcon: MdError,
      typeColor: "#f97316",
      message: "Поставщик не подтвердил услугу SRV-001",
      messageDetail: "Требуется действие оператора",
      time: "08:30",
      status: "Новое",
      statusColor: "orange",
      eventType: "supplier",
      slaType: "ok",
      requestId: "REQ-001",
      orderId: "ORD-120",
      supplierId: "supplier1",
    },
    {
      id: 5,
      type: "Платёж",
      typeIcon: MdCheckCircle,
      typeColor: "#10b981",
      message: "Получен платёж PAY-001 по заказу ORD-125",
      messageDetail: "Сумма: 20 000 USD",
      time: "07:15",
      status: "Прочитано",
      statusColor: "gray",
      eventType: "payment",
      slaType: "ok",
      requestId: null,
      orderId: "ORD-125",
      supplierId: null,
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (filters.eventType !== "all" && notif.eventType !== filters.eventType)
      return false;
    if (filters.sla !== "all" && notif.slaType !== filters.sla) return false;
    if (filters.supplier !== "all" && notif.supplierId !== filters.supplier)
      return false;
    return true;
  });

  const handleGoToRequest = (requestId, e) => {
    e.stopPropagation();
    if (requestId) {
      router.push(`/operator/requests/${requestId}`);
    }
  };

  const handleGoToOrder = (orderId, e) => {
    e.stopPropagation();
    if (orderId) {
      router.push(`/operator/orders/${orderId}`);
    }
  };

  const handleGoToChat = (requestId, orderId, e) => {
    e.stopPropagation();
    const id = orderId || requestId;
    if (id) {
      router.push(`/operator/chat/${id}`);
    }
  };

  const columns = [
    {
      key: "type",
      label: "Тип",
      flex: 1,
      render: (value, row) => {
        const Icon = row.typeIcon;
        return (
          <div className={s.typeCell}>
            <div
              className={s.typeIcon}
              style={{
                background: `${row.typeColor}15`,
                color: row.typeColor,
              }}
            >
              <Icon size={20} />
            </div>
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      key: "message",
      label: "Сообщение",
      flex: 2.5,
      render: (value, row) => (
        <div className={s.messageCell}>
          <p className={s.messageMain}>{value}</p>
          <p className={s.messageDetail}>{row.messageDetail}</p>
        </div>
      ),
    },
    {
      key: "time",
      label: "Время",
      flex: 0.8,
    },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value, row) => (
        <span className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}>
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.actions}>
          {row.requestId && (
            <button
              className={s.actionButton}
              onClick={(e) => handleGoToRequest(row.requestId, e)}
              title="Перейти в заявку"
            >
              <MdDescription size={18} />
            </button>
          )}
          {row.orderId && (
            <button
              className={s.actionButton}
              onClick={(e) => handleGoToOrder(row.orderId, e)}
              title="Перейти в заказ"
            >
              <MdDescription size={18} />
            </button>
          )}
          {(row.requestId || row.orderId) && (
            <button
              className={s.actionButton}
              onClick={(e) => handleGoToChat(row.requestId, row.orderId, e)}
              title="Открыть чат"
            >
              <MdChatBubbleOutline size={18} />
            </button>
          )}
          <button
            className={`${s.actionButton} ${s.actionButtonMark}`}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Mark as read
            }}
            title="Отметить как прочитанное"
          >
            Отметить
          </button>
        </div>
      ),
    },
  ];

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h2 className={s.title}>Список уведомлений</h2>
      </div>

      <div className={s.filters}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value={filters.eventType}
              onChange={(value) => setFilters({ ...filters, eventType: value })}
              options={EVENT_TYPE_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.sla}
              onChange={(value) => setFilters({ ...filters, sla: value })}
              options={SLA_OPTIONS}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value={filters.supplier}
              onChange={(value) => setFilters({ ...filters, supplier: value })}
              options={SUPPLIER_OPTIONS}
            />
          </div>
        </div>
      </div>

      <UITable
        columns={columns}
        rows={filteredNotifications}
        showCheckbox={true}
        type="default"
      />

      {/* <div className={s.footer}>
        <div className={s.itemsPerPage}>
          <Select
            value={itemsPerPage.toString()}
            options={[
              { value: "10", label: "10 на странице" },
              { value: "20", label: "20 на странице" },
              { value: "50", label: "50 на странице" },
            ]}
            onChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          />
        </div>
        <div className={s.pagination}>
          <button
            className={s.pageButton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Предыдущая
          </button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 3) {
              pageNum = i + 1;
            } else if (currentPage === 1) {
              pageNum = i + 1;
            } else if (currentPage === totalPages) {
              pageNum = totalPages - 2 + i;
            } else {
              pageNum = currentPage - 1 + i;
            }
            return (
              <button
                key={pageNum}
                className={`${s.pageButton} ${
                  currentPage === pageNum ? s.pageButtonActive : ""
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            className={s.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Следующая
          </button>
        </div>
      </div> */}
    </Container>
  );
}
