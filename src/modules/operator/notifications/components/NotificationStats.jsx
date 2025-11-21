import React from "react";
import { Statcard } from "@/ui";
import { MdNotifications } from "react-icons/md";
import { MdError } from "react-icons/md";
import { MdWarning } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import s from "../styles/NotificationStats.module.scss";

export default function NotificationStats() {
  const stats = [
    {
      id: 1,
      icon: MdNotifications,
      title: "Всего уведомлений",
      unit: "47",
      change: 0,
      trend: "up",
      iconColor: "#3b82f6",
    },
    {
      id: 2,
      icon: MdError,
      title: "Новые",
      unit: "12",
      change: 0,
      trend: "up",
      iconColor: "#f97316",
    },
    {
      id: 3,
      icon: MdWarning,
      title: "SLA нарушения",
      unit: "3",
      change: 0,
      trend: "up",
      iconColor: "#ef4444",
    },
    {
      id: 4,
      icon: MdCheckCircle,
      title: "Прочитано",
      unit: "35",
      change: 0,
      trend: "up",
      iconColor: "#10b981",
    },
  ];

  return (
    <div className={s.stats}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className={s.statCard}>
            <div className={s.iconWrapper} style={{ background: `${stat.iconColor}15` }}>
              <Icon size={24} style={{ color: stat.iconColor }} />
            </div>
            <div className={s.content}>
              <span className={s.title}>{stat.title}</span>
              <p className={s.value} style={{ color: stat.iconColor }}>
                {stat.unit}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

