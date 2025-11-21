import React from "react";
import { Container } from "@/ui";
import { MdShoppingBag } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import { MdTrendingUp } from "react-icons/md";
import { MdWarning } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";
import s from "../../styles/FinancialSummary.module.scss";

export default function FinancialSummary() {
  const metrics = [
    {
      id: 1,
      icon: MdShoppingBag,
      title: "Всего заказов",
      value: "12",
      iconColor: "#3b82f6",
    },
    {
      id: 2,
      icon: MdCheckCircle,
      title: "Активные заказы",
      value: "3",
      iconColor: "#10b981",
    },
    {
      id: 3,
      icon: TbCoins,
      title: "Общая сумма",
      value: "1,420,000 KGS",
      iconColor: "#a855f7",
    },
    {
      id: 4,
      icon: MdTrendingUp,
      title: "Средний чек",
      value: "118,000 KGS",
      iconColor: "#f97316",
    },
    {
      id: 5,
      icon: MdWarning,
      title: "Долг по оплатам",
      value: "0 KGS",
      iconColor: "#ef4444",
    },
    {
      id: 6,
      icon: MdCalendarToday,
      title: "Последняя активность",
      value: "25.10.2025",
      iconColor: "#6b7280",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Финансовое резюме</h3>
      <div className={s.grid}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className={s.card}>
              <div
                className={s.iconWrapper}
                style={{ background: `${metric.iconColor}15` }}
              >
                <Icon size={24} style={{ color: metric.iconColor }} />
              </div>
              <div className={s.content}>
                <span className={s.metricTitle}>{metric.title}</span>
                <span className={s.metricValue}>{metric.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

