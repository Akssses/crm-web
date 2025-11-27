"use client";

import React from "react";
import s from "../styles/State.module.scss";
import {
  MdAccessTime,
  MdShoppingBag,
  MdWarning,
  MdOutlineChat,
} from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import { Statcard } from "@/ui";
import { useRouter } from "next/navigation";

const statsConfig = [
  {
    id: 1,
    icon: MdAccessTime,
    title: "Активных заявок",
    unit: "24",
    change: 0.5,
    trend: "down",
    href: "/operator/requests?filter=active",
  },
  {
    id: 2,
    icon: MdShoppingBag,
    title: "Активных заказов",
    unit: "18",
    change: 3.4,
    trend: "up",
    href: "/operator/orders?filter=active",
  },
  {
    id: 3,
    icon: TbCoins,
    title: "Общая сумма продаж",
    unit: "₽1 870 000",
    change: 10.5,
    trend: "up",
    href: "/operator/finance",
  },
  {
    id: 4,
    icon: MdWarning,
    title: "Просроченные заявки",
    unit: "5",
    change: 1.5,
    trend: "up",
    href: "/operator/requests?filter=overdue",
    color: "#ef4444",
  },
];

const criticalStatuses = [
  {
    id: "sla",
    icon: MdWarning,
    label: "3 SLA на грани срыва",
    description: "Турция / SkyJet — 40 мин",
    severity: "warning",
    href: "/operator/requests?filter=sla-risk",
  },
  {
    id: "overdue",
    icon: MdWarning,
    label: "2 SLA просрочено",
    description: "Аэрофлот / Berlin — 12 мин",
    severity: "danger",
    href: "/operator/requests?filter=overdue",
  },
  {
    id: "chat",
    icon: MdOutlineChat,
    label: "5 диалогов без ответа",
    description: "В среднем 18 мин ожидания",
    severity: "info",
    href: "/operator/chat",
  },
];

export default function State() {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        {statsConfig.map((item) => (
          <Statcard
            key={item.id}
            icon={item.icon}
            title={item.title}
            unit={item.unit}
            trend={item.trend}
            change={item.change}
            color={item.color}
            onClick={() => router.push(item.href)}
            ariaLabel={`Перейти к разделу «${item.title}»`}
          />
        ))}
      </div>

      <div className={s.criticalStrip}>
        {criticalStatuses.map((status) => {
          const Icon = status.icon;
          return (
            <button
              key={status.id}
              type="button"
              className={`${s.criticalCard} ${s[status.severity]}`}
              onClick={() => router.push(status.href)}
            >
              <Icon size={20} />
              <div className={s.criticalContent}>
                <span>{status.label}</span>
                <p>{status.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
