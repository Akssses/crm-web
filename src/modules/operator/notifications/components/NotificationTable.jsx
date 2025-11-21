"use client";
import React, { useState } from "react";
import { Container, UITable, Select } from "@/ui";
import { MdError } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import s from "../styles/NotificationTable.module.scss";

export default function NotificationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
    },
  ];

  const columns = [
    {
      key: "type",
      label: "Тип",
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
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span
          className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      render: () => (
        <div className={s.actions}>
          <button className={s.actionButton}>Просмотр</button>
          <button className={`${s.actionButton} ${s.actionButtonMark}`}>
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
        <div className={s.paginationInfo}>
          <span>
            Показано {startItem}-{endItem} из {totalItems}
          </span>
          <div className={s.paginationArrows}>
            <button
              className={s.arrowButton}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <MdChevronLeft size={20} />
            </button>
            <button
              className={s.arrowButton}
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <UITable
        columns={columns}
        rows={notifications}
        showCheckbox={true}
        type="default"
      />

      <div className={s.footer}>
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
      </div>
    </Container>
  );
}

