import React from "react";
import { Container } from "@/ui";
import s from "../styles/MyOrders.module.scss";

export default function MyOrders() {
  const orders = [
    {
      id: "#1256",
      description: "Установка Windows",
      amount: "₽3,500",
      status: "Оплачено",
    },
    {
      id: "#1255",
      description: "Ремонт принтера",
      amount: "₽2,200",
      status: "Ожидание",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Мои заказы</h3>
        <a href="#" className={s.link}>
          Все заказы
        </a>
      </div>
      <div className={s.list}>
        {orders.map((order) => (
          <div key={order.id} className={s.item}>
            <div className={s.top}>
              <span className={s.id}>{order.id}</span>
              <span className={s.amount}>{order.amount}</span>
            </div>
            <p className={s.description}>{order.description}</p>
            <span className={`${s.status} ${s[`status-${order.status.toLowerCase().replace(" ", "-")}`]}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
}

