"use client";

import React from "react";
import s from "../styles/State.module.scss";
import { FaRegUser } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";
import { TbCoins } from "react-icons/tb";
import { Statcard } from "@/ui";

export default function State() {
  const Date = [
    {
      id: 1,
      icon: FaRegUser,
      title: "Кол-во заявок",
      unit: "1,204",
      change: 0.5,
      trend: "down",
    },
    {
      id: 2,
      icon: BiBarChartSquare,
      title: "Кол-во заявок",
      unit: "12,000",
      change: 3.4,
      trend: "up",
    },
    {
      id: 3,
      icon: TbCoins,
      title: "Объем продаж",
      unit: "$203,569.00",
      change: 10.5,
      trend: "up",
    },
    {
      id: 4,
      icon: TbCoins,
      title: "Средний чек",
      unit: "$23,569.00",
      change: 1.5,
      trend: "up",
    },
  ];
  return (
    <div className={s.main}>
      {Date.map((item) => {
        const Incons = item.icon;
        return (
          <Statcard
            key={item.id}
            icon={Incons}
            title={item.title}
            unit={item.unit}
            trend={item.trend}
            change={item.change}
          />
        );
      })}
    </div>
  );
}
