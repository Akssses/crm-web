import React from "react";
import { Container } from "@/ui";
import { MdAddCircle } from "react-icons/md";
import { MdError } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import s from "../styles/Notifications.module.scss";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      icon: MdAddCircle,
      iconColor: "#3b82f6",
      title: "Новая заявка",
      description: 'ООО "Ром" - Обслуживание ПК',
      time: "15 мин назад",
    },
    {
      id: 2,
      icon: MdError,
      iconColor: "#ef4444",
      title: "Просрочка SLA",
      description: "Заявка #1247 превысила лимит",
      time: "1 ч назад",
    },
    {
      id: 3,
      icon: MdCheckCircle,
      iconColor: "#10b981",
      title: "Заявка закрыта",
      description: "Клиент оценил работу на 5 звёзд",
      time: "2 ч назад",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Уведомления</h3>
      <div className={s.list}>
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className={s.item}>
              <div
                className={s.iconWrapper}
                style={{ 
                  color: notification.iconColor,
                  background: `${notification.iconColor}15`
                }}
              >
                <Icon size={20} />
              </div>
              <div className={s.content}>
                <p className={s.notificationTitle}>{notification.title}</p>
                <p className={s.description}>{notification.description}</p>
                <span className={s.time}>{notification.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

