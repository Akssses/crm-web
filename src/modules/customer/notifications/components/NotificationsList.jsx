"use client";

import React, { useState } from "react";
import { Input } from "@/ui";
import { IoSearchOutline, IoFunnelOutline } from "react-icons/io5";
import NotificationItem from "./NotificationItem";
import s from "../styles/Notifications.module.scss";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "message",
    title: "Новое сообщение в чате",
    description: "Менеджер Анна Смирнова ответила в заказе #12845",
    time: "5 минут назад",
    tag: "Заказ #12845",
    unread: true,
    important: false,
    starred: false,
    status: "в работе",
    orderId: "#12845",
    comment: "Клиент запросил дополнительные документы для визы",
  },
  {
    id: 2,
    type: "status",
    title: "Статус заказа изменён",
    description: 'Заказ #12843 переведён в статус "Выполнен"',
    time: "12 минут назад",
    tag: "Заказ #12843",
    unread: true,
    important: false,
    starred: false,
    status: "выполнено",
    orderId: "#12843",
  },
  {
    id: 3,
    type: "invoice",
    title: "Выставлен новый счет",
    description:
      "Счёт №INV-2024-0156 на сумму 125 000 ₽ требует оплаты до 15.01.2024",
    time: "25 минут назад",
    tag: "Счёт INV-2024-0156",
    unread: false,
    important: true,
    starred: true,
    status: "в работе",
    orderId: "#12840",
    deadline: "15.01.2024",
    comment: "Срочная оплата для бронирования билетов",
  },
  {
    id: 4,
    type: "document",
    title: "Документ загружен",
    description: "Договор №45/2024 добавлен к заказу #12840",
    time: "1 час назад",
    tag: "Документ",
    unread: false,
    important: false,
    starred: false,
    status: "выполнено",
    orderId: "#12840",
  },
  {
    id: 5,
    type: "reminder",
    title: "Напоминание о дедлайне",
    description: "Заказ #12835 должен быть завершён через 2 дня",
    time: "Вчера, 18:30",
    tag: "Заказ #12835",
    unread: false,
    important: false,
    starred: false,
    section: "yesterday",
    status: "в работе",
    orderId: "#12835",
    deadline: "28.01.2024",
    comment: "Убедитесь, что все пассажиры подтвердили участие",
  },
  {
    id: 6,
    type: "system",
    title: "Системное обновление",
    description: "Платформа будет недоступна 15.01.2024 с 02:00 до 04:00 по МСК",
    time: "Вчера, 14:20",
    tag: "Система",
    unread: false,
    important: false,
    starred: false,
    section: "yesterday",
  },
];

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStar = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleOrderClick = (orderId) => {
    console.log("Navigate to order:", orderId);
    // В реальном приложении здесь будет роутинг к заказу
  };

  const todayNotifications = notifications.filter((n) => !n.section);
  const yesterdayNotifications = notifications.filter(
    (n) => n.section === "yesterday"
  );

  return (
    <div className={s.page}>
      <div className={s.header}>
        <button className={s.filterBtn}>
          <IoFunnelOutline size={20} />
          Filter
        </button>
        <div className={s.searchWrapper}>
          <Input
            placeholder="Поиск..."
            icon={IoSearchOutline}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={s.notificationsList}>
        {todayNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onStar={() => handleStar(notification.id)}
            onDelete={() => handleDelete(notification.id)}
            onOrderClick={handleOrderClick}
          />
        ))}

        {yesterdayNotifications.length > 0 && (
          <>
            <div className={s.dateDivider}>Вчера</div>
            {yesterdayNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onStar={() => handleStar(notification.id)}
                onDelete={() => handleDelete(notification.id)}
                onOrderClick={handleOrderClick}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
