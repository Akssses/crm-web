import React from "react";
import { Container } from "@/ui";
import { MdHistory } from "react-icons/md";
import s from "../../styles/ChangeHistory.module.scss";

export default function ChangeHistory() {
  const changes = [
    {
      id: 1,
      action: "Добавлен в VIP",
      details: "Присвоен тег VIP, статус изменен на Active",
      user: "Айгуль Мамбетова",
      date: "25.11.2025",
      time: "14:30"
    },
    {
      id: 2,
      action: "Обновлены контактные данные",
      details: "Изменен email с old@mail.com на new@mail.com",
      user: "Бекзат Султанов",
      date: "20.11.2025",
      time: "09:15"
    },
    {
      id: 3,
      action: "Добавлен документ «Устав организации»",
      details: "Загружен файл ustav.pdf (2.4 MB)",
      user: "Айгуль Мамбетова",
      date: "17.11.2025",
      time: "16:45"
    },
    {
      id: 4,
      action: "Статус изменён на “Под наблюдением”",
      details: "Причина: задержка оплаты",
      user: "Система",
      date: "11.11.2025",
      time: "10:00"
    }
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>История изменений клиента</h3>
      </div>
      <div className={s.list}>
        {changes.map((change) => (
          <div key={change.id} className={s.item}>
            <div className={s.dateColumn}>
              <span className={s.date}>{change.date}</span>
              <span className={s.time}>{change.time}</span>
            </div>
            <div className={s.content}>
              <p className={s.action}>{change.action}</p>
              {change.details && <p className={s.details}>{change.details}</p>}
              <span className={s.user}>{change.user}</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}


