import React from "react";
import s from "../styles/State.module.scss";
import { FaRegUser } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";
import { TbCoins } from "react-icons/tb";
import { State } from "@/ui";

export default function StateGrid() {
  const Date = [
    {
      id: 1,
      icon: FaRegUser,
      title: "Оплачено",
      unit: "$203,569.00",
    },
    {
      id: 2,
      icon: BiBarChartSquare,
      title: "Частично",
      unit: "$2,569.00",
    },
    {
      id: 3,
      icon: TbCoins,
      title: "Просрочено",
      unit: "$20,569.00",
    },
    {
      id: 4,
      icon: TbCoins,
      title: "Возврат",
      unit: "$23,569.00",
    },
  ];
  return (
    <div className={s.main}>
      {Date.map((item) => {
        const Incons = item.icon;
        return (
          <State
            key={item.id}
            icon={Incons}
            title={item.title}
            unit={item.unit}
          />
        );
      })}
    </div>
  );
}
