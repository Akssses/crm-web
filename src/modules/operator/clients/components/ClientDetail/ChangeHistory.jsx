import React from "react";
import { Container } from "@/ui";
import s from "../../styles/ChangeHistory.module.scss";

export default function ChangeHistory() {
  const changes = [
    {
      id: 1,
      action: "Статус изменен на VIP",
      user: "Айгуль Мамбетова",
      date: "25.10.2025 14:30",
    },
    {
      id: 2,
      action: "Добавлен новый документ: Договор",
      user: "Айгуль Мамбетова",
      date: "20.10.2025 09:15",
    },
    {
      id: 3,
      action: "Обновлена контактная информация",
      user: "Бекзат Султанов",
      date: "15.10.2025 16:45",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>История изменений</h3>
      <div className={s.list}>
        {changes.map((change) => (
          <div key={change.id} className={s.item}>
            <div className={s.content}>
              <p className={s.action}>{change.action}</p>
              <span className={s.user}>{change.user}</span>
            </div>
            <span className={s.date}>{change.date}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}

