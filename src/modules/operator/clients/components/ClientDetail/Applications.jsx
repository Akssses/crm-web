"use client";
import React from "react";
import { Container, UITable } from "@/ui";
import s from "../../styles/Applications.module.scss";

export default function Applications() {
  const applications = [
    {
      id: "A-2357",
      type: "Тур",
      status: "Конвертирована",
      statusColor: "green",
      date: "24.10.25",
      comment: "Подбор тура в Дубай",
    },
    {
      id: "A-2121",
      type: "Виза",
      status: "Закрыта",
      statusColor: "gray",
      date: "10.08.25",
      comment: "Виза в Чехию",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "№",
      render: (value) => (
        <span className={s.applicationId}>{value}</span>
      ),
    },
    { key: "type", label: "Тип" },
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
    { key: "date", label: "Дата" },
    { key: "comment", label: "Комментарий" },
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Заявки</h3>
      <UITable columns={columns} rows={applications} showCheckbox={false} />
    </Container>
  );
}

