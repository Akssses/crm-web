import React from "react";
import { Container } from "@/ui";
import s from "../styles/SalaryCalculation.module.scss";

export default function SalaryCalculation() {
  const items = [
    { label: "Оклад", value: "40 000 Р", isNegative: false },
    { label: "Смены (14)", value: "21 000 Р", isNegative: false },
    { label: "% от комиссий (5%)", value: "22 800 Р", isNegative: false },
    { label: "Авансы", value: "10 000 Р", isNegative: true },
    { label: "Удержания", value: "2 000 Р", isNegative: true },
  ];

  const total = "50 800 Р";

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Расчёт ЗП за октябрь 2025</h3>
      <div className={s.items}>
        {items.map((item, index) => (
          <div key={index} className={s.item}>
            <span className={s.label}>{item.label}</span>
            <span
              className={`${s.value} ${item.isNegative ? s.negative : ""}`}
            >
              {item.isNegative ? "-" : ""}
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className={s.total}>
        <span className={s.totalLabel}>Итого к выплате</span>
        <span className={s.totalValue}>{total}</span>
      </div>
    </Container>
  );
}

