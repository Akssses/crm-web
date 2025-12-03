"use client";

import React from "react";
import s from "../styles/Refunds.module.scss";

const LOGS = [
  {
    id: 1,
    date: "25.10.2025 15:12",
    type: "error",
    message: "Ошибка эквайринга: платеж #PAY-2025-103 отклонён банком",
    actor: "Система",
  },
  {
    id: 2,
    date: "25.10.2025 14:40",
    type: "warning",
    message: "Возврат #RFND-1002 ожидает подтверждения более 24 часов",
    actor: "Оператор Руслан Р.",
  },
  {
    id: 3,
    date: "24.10.2025 18:05",
    type: "info",
    message: "Повторная попытка возврата #RFND-998 отправлена",
    actor: "Айгерим М.",
  },
];

export default function RefundLog() {
  return (
    <div className={s.logList}>
      {LOGS.map((log) => (
        <div key={log.id} className={s.logItem}>
          <div className={s.logMeta}>
            {log.date} • {log.actor}
          </div>
          <div className={s.logMessage}>{log.message}</div>
          <span
            className={`${s.badge} ${
              log.type === "error"
                ? s.badgeError
                : log.type === "warning"
                ? s.badgeWarning
                : s.badgeInfo
            }`}
          >
            {log.type === "error" && "Ошибка"}
            {log.type === "warning" && "Предупреждение"}
            {log.type === "info" && "Инфо"}
          </span>
        </div>
      ))}
    </div>
  );
}
