"use client";

import React, { useMemo } from "react";
import { Container, Button } from "@/ui";
import { useRouter } from "next/navigation";
import s from "../styles/MyOrders.module.scss";

const ORDERS = [
  {
    id: "ORD-9821",
    description: "Установка Windows",
    amount: 3500,
    currency: "₽",
    status: "Оплачено",
    createdAt: "2025-10-24T12:30:00Z",
    organizationId: "techno",
  },
  {
    id: "ORD-9810",
    description: "Ремонт принтера",
    amount: 2200,
    currency: "₽",
    status: "Ожидание",
    createdAt: "2025-10-23T08:10:00Z",
    organizationId: "techno",
  },
  {
    id: "ORD-9805",
    description: "Подбор билетов в Париж",
    amount: 152000,
    currency: "₽",
    status: "Черновик",
    createdAt: "2025-10-25T09:20:00Z",
    organizationId: "psc",
  },
];

const getPeriodStart = (period) => {
  const now = new Date();
  const start = new Date(now);
  if (period === "today") {
    start.setHours(0, 0, 0, 0);
  } else if (period === "week") {
    start.setDate(now.getDate() - 7);
  } else if (period === "month") {
    start.setMonth(now.getMonth() - 1);
  } else if (period === "quarter") {
    start.setMonth(now.getMonth() - 3);
  } else {
    start.setFullYear(2020);
  }
  return start;
};

export default function MyOrders({
  filters = { period: "week", organization: "all" },
}) {
  const router = useRouter();

  const periodStart = useMemo(
    () => getPeriodStart(filters.period),
    [filters.period]
  );
  const filteredOrders = useMemo(() => {
    return ORDERS.filter((order) => {
      const matchesOrganization =
        filters.organization === "all" ||
        order.organizationId === filters.organization;
      const matchesPeriod = new Date(order.createdAt) >= periodStart;
      return matchesOrganization && matchesPeriod;
    });
  }, [filters.organization, periodStart]);

  const handleOpenOrders = () => router.push("/operator/orders");

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Мои заказы</h3>
        <Button variant="outline" size="sm" onClick={handleOpenOrders}>
          Все заказы
        </Button>
      </div>
      <div className={s.list}>
        {filteredOrders.map((order) => (
          <button
            key={order.id}
            type="button"
            className={s.item}
            onClick={() => router.push(`/operator/orders/${order.id}`)}
          >
            <div className={s.top}>
              <span className={s.id}>{order.id}</span>
              <span className={s.amount}>
                {order.currency}
                {order.amount.toLocaleString("ru-RU")}
              </span>
            </div>
            <p className={s.description}>{order.description}</p>
            <span
              className={`${s.status} ${
                s[`status-${order.status.toLowerCase()}`]
              }`}
            >
              {order.status}
            </span>
          </button>
        ))}
        {filteredOrders.length === 0 && (
          <div className={s.empty}>Нет заказов по текущим фильтрам</div>
        )}
      </div>
    </Container>
  );
}
