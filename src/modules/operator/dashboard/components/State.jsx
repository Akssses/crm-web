import React from "react";
import s from "../styles/State.module.scss";
import { MdAccessTime } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import { MdWarning } from "react-icons/md";
import { Statcard } from "@/ui";

export default function State() {
  const Date = [
    {
      id: 1,
      icon: MdAccessTime,
      title: "Активных заявок",
      unit: "24",
      change: 0.5,
      trend: "down",
    },
    {
      id: 2,
      icon: MdShoppingBag,
      title: "Активных заказов",
      unit: "18",
      change: 3.4,
      trend: "up",
    },
    {
      id: 3,
      icon: TbCoins,
      title: "Общая сумма продаж",
      unit: "$1870",
      change: 10.5,
      trend: "up",
    },
    {
      id: 4,
      icon: MdWarning,
      title: "Просроченые заявки",
      unit: "5",
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
