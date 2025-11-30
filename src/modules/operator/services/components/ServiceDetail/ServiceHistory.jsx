"use client";
import React from "react";
import { Container } from "@/ui";
import s from "../../styles/ServiceDetail.module.scss";

export default function ServiceHistory({ service }) {
  const historyItems = [
    {
      date: "15.03.2024 14:30",
      user: "Айсулуу М.",
      action: "Изменена стоимость услуги",
      field: "Стоимость",
      was: "$450",
      became: "$470",
    },
    {
      date: "15.03.2024 12:00",
      user: "Система",
      action: "Документ загружен",
      field: "Авиабилет",
      was: null,
      became: "ticket.pdf",
    },
    {
      date: "15.03.2024 10:47",
      user: "Айсулуу М.",
      action: "Услуга создана",
      field: "Статус",
      was: null,
      became: "В работе",
    },
  ];

  return (
    <Container size="full" className={s.section}>
      <h3 className={s.sectionTitle}>История изменений</h3>

      <div className={s.historyList}>
        {historyItems.map((item, idx) => (
          <div key={idx} className={s.historyItem}>
            <div className={s.historyHeader}>
              <span className={s.historyDate}>{item.date}</span>
              <span className={s.historyUser}>{item.user}</span>
            </div>
            <div className={s.historyAction}>{item.action}</div>
            {item.field && (
              <div className={s.historyChange}>
                <span className={s.historyField}>{item.field}:</span>
                {item.was && <span className={s.historyWas}>{item.was}</span>}
                {item.was && <span className={s.historyArrow}>→</span>}
                <span className={s.historyBecame}>{item.became}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
