"use client";

import React from "react";
import { Container, Button } from "@/ui";
import { MdAddCircle, MdError, MdCheckCircle, MdOutlineChat } from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/Notifications.module.scss";

const notifications = [
  {
    id: 1,
    icon: MdAddCircle,
    iconColor: "#3b82f6",
    title: "Новая заявка",
    description: 'ООО "Ром" — Обслуживание ПК',
    time: "15 мин назад",
    requestHref: "/operator/requests/REQ-1288",
    chatHref: "/operator/chat?request=REQ-1288",
    badge: "Новая",
    severity: "info",
  },
  {
    id: 2,
    icon: MdError,
    iconColor: "#ef4444",
    title: "Просрочка SLA",
    description: "Заявка #1247 превысила лимит",
    time: "1 ч назад",
    requestHref: "/operator/requests/REQ-1247",
    chatHref: "/operator/chat?request=REQ-1247",
    badge: "Критично",
    severity: "danger",
  },
  {
    id: 3,
    icon: MdCheckCircle,
    iconColor: "#10b981",
    title: "Заявка закрыта",
    description: "Клиент оценил работу на 5 звёзд",
    time: "2 ч назад",
    requestHref: "/operator/requests/REQ-1201",
    badge: "Закрыта",
    severity: "success",
  },
];

export default function Notifications() {
  const router = useRouter();

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Уведомления</h3>
      <div className={s.list}>
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className={`${s.item} ${s[notification.severity] || ""}`}>
              <div
                className={s.iconWrapper}
                style={{
                  color: notification.iconColor,
                  background: `${notification.iconColor}15`,
                }}
              >
                <Icon size={20} />
              </div>
              <div className={s.content}>
                <div className={s.row}>
                  <p className={s.notificationTitle}>{notification.title}</p>
                  {notification.badge && (
                    <span className={s.badge}>{notification.badge}</span>
                  )}
                </div>
                <p className={s.description}>{notification.description}</p>
                <div className={s.meta}>
                  <span className={s.time}>{notification.time}</span>
                  <div className={s.actions}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(notification.requestHref)}
                    >
                      В заявку
                    </Button>
                    {notification.chatHref && (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={MdOutlineChat}
                        onClick={() => router.push(notification.chatHref)}
                      >
                        В чат
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

