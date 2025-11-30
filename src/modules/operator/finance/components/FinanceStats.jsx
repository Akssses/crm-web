"use client";
import React from "react";
import { Statcard } from "@/ui";
import {
  MdFolder,
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import s from "../styles/FinanceStats.module.scss";

export default function FinanceStats() {
  const stats = [
    {
      id: 1,
      icon: MdFolder,
      title: "Заказов закрыто",
      unit: "24",
      change: 0.5,
      trend: "down",
    },
    {
      id: 2,
      icon: TbCoins,
      title: "Комиссия за месяц",
      unit: "42 500 RUB",
      change: 3.4,
      trend: "up",
    },
    {
      id: 3,
      icon: TbCoins,
      title: "Сервисные сборы",
      unit: "8 400 RUB",
      change: 10.5,
      trend: "up",
    },
    {
      id: 4,
      icon: MdAccountBalanceWallet,
      title: "К выплате",
      unit: "42 900 RUB",
      change: 1.5,
      trend: "up",
    },
    {
      id: 5,
      icon: FaUser,
      title: "Авансы",
      unit: "10 000 RUB",
      change: 1.5,
      trend: "up",
    },
    // {
    //   id: 6,
    //   icon: MdTrendingDown,
    //   title: "Задолженность клиентов",
    //   unit: "125 000 KGS",
    //   change: -5.2,
    //   trend: "down",
    //   color: "danger",
    // },
    // {
    //   id: 7,
    //   icon: MdTrendingUp,
    //   title: "Задолженность перед поставщиками",
    //   unit: "45 000 USD",
    //   change: 2.1,
    //   trend: "up",
    //   color: "warning",
    // },
  ];

  return (
    <div className={s.stats}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Statcard
            key={stat.id}
            icon={Icon}
            title={stat.title}
            unit={stat.unit}
            trend={stat.trend}
            change={stat.change}
          />
        );
      })}
    </div>
  );
}
