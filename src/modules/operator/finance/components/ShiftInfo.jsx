import React from "react";
import { Container } from "@/ui";
import s from "../styles/ShiftInfo.module.scss";

export default function ShiftInfo() {
  const financialData = {
    commission: "24 000 Р",
    serviceFees: "8 400 Р",
    advances: "-10 000 Р",
    deductions: "-2 000 Р",
    totalToPay: "50 800 Р",
  };

  return (
    <Container size="full">
      <h3 className={s.title}>Общая информация о смене</h3>
      <div className={s.content}>
        <div className={s.leftColumn}>
          <div className={s.infoRow}>
            <span className={s.label}>Дата и время смены</span>
            <div className={s.dateTime}>
              <span>12.10.2025</span>
              <span className={s.time}>09:00-18:00</span>
            </div>
          </div>
          <div className={s.metrics}>
            <div className={s.metric}>
              <span className={s.metricLabel}>Всего заказов закрыто</span>
              <span className={s.metricValue}>15</span>
            </div>
            <div className={s.metric}>
              <span className={s.metricLabel}>Общая выручка</span>
              <span className={s.metricValue}>480 000 Р</span>
            </div>
            <div className={s.metric}>
              <span className={s.metricLabel}>Статус</span>
              <div className={s.statusWrapper}>
                <span className={s.statusDot}></span>
                <span className={s.statusText}>На утверждении</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.rightColumn}>
          <div className={s.financialBreakdown}>
            <div className={s.financialItem}>
              <span className={s.financialLabel}>Комиссия (5%)</span>
              <span className={s.financialValue}>
                {financialData.commission}
              </span>
            </div>
            <div className={s.financialItem}>
              <span className={s.financialLabel}>Сервисные сборы</span>
              <span className={s.financialValue}>
                {financialData.serviceFees}
              </span>
            </div>
            <div className={s.financialItem}>
              <span className={s.financialLabel}>Авансы</span>
              <span className={`${s.financialValue} ${s.negative}`}>
                {financialData.advances}
              </span>
            </div>
            <div className={s.financialItem}>
              <span className={s.financialLabel}>Удержания</span>
              <span className={`${s.financialValue} ${s.negative}`}>
                {financialData.deductions}
              </span>
            </div>
          </div>
          <div className={s.totalBox}>
            <span className={s.totalLabel}>К выплате</span>
            <span className={s.totalValue}>{financialData.totalToPay}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
