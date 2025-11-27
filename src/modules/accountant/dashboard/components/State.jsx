"use client";

import React from "react";
import s from "../styles/State.module.scss";
import { FaBox, FaRegUser, FaUsers } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";
import { TbArrowBackUp, TbCoins } from "react-icons/tb";
import { Statcard } from "@/ui";
import { IoDocumentText } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";

export default function State() {
  const Date = [
    {
      id: 1,
      icon: FaBox,
      title: "Заказов закрыто",
      unit: "152",
      change: 0.5,
      trend: "down",
      color: "#16A34A",
    },
    {
      id: 2,
      icon: TbCoins,
      title: "Общие поступления",
      unit: "3 420 000 ₽",
      change: 3.4,
      trend: "up",
    },
    {
      id: 3,
      icon: TbArrowBackUp,
      title: "Общая сумма продаж",
      unit: "$203,569.00",
      change: 10.5,
      trend: "up",
      color: "#DC2626",
    },
    {
      id: 4,
      icon: IoDocumentText,
      title: "Сформировано документов",
      unit: "123",
      change: 1.5,
      trend: "up",
      color: "#9333EA",
    },
    {
      id: 5,
      icon: FaUsers,
      title: "Выплаты операторам",
      unit: "980 000 ₽",
      change: 1.5,
      trend: "up",
      color: "#CA8A04",
    },
    {
      id: 6,
      icon: MdWatchLater,
      title: "Неутверждённые начисления",
      unit: "3",
      change: 1.5,
      trend: "up",
      color: "#EA580C",
    },
  ];
  return (
    <div className={s.main}>
      {Date.map((item) => {
        const Incons = item.icon;
        return (
          <Statcard
            color={item.color}
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
