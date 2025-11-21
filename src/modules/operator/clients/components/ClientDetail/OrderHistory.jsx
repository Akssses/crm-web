"use client";
import React from "react";
import { Container, UITable, Button } from "@/ui";
import s from "../../styles/OrderHistory.module.scss";

export default function OrderHistory() {
  const orders = [
    {
      id: "ORD-2357",
      service: "Авиа + Отель",
      amount: "141,700 KGS",
      status: "В работе",
      statusColor: "yellow",
      payment: "Частично",
      paymentColor: "orange",
      date: "25.10.25",
    },
    {
      id: "ORD-2210",
      service: "Виза",
      amount: "4,200 KGS",
      status: "Завершён",
      statusColor: "green",
      payment: "Оплачен",
      paymentColor: "green",
      date: "12.09.25",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "№",
      render: (value) => (
        <span className={s.orderId}>{value}</span>
      ),
    },
    { key: "service", label: "Услуга" },
    {
      key: "amount",
      label: "Сумма",
      render: (value) => (
        <span className={s.amount}>{value}</span>
      ),
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
      key: "payment",
      label: "Оплата",
      render: (value, row) => (
        <span
          className={`${s.statusBadge} ${s[`status-${row.paymentColor}`]}`}
        >
          {value}
        </span>
      ),
    },
    { key: "date", label: "Дата" },
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>История заказов</h3>
        <Button variant="primary">Посмотреть все заказы</Button>
      </div>
      <UITable columns={columns} rows={orders} showCheckbox={false} />
    </Container>
  );
}

