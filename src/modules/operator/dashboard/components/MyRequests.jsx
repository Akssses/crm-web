import React from "react";
import { Container } from "@/ui";
import s from "../styles/MyRequests.module.scss";

export default function MyRequests() {
  const requests = [
    {
      id: 1,
      company: 'ООО "Техносервис"',
      status: "В работе",
      description: "Настройка сетевого оборудования",
      time: "2 ч назад",
      sla: "SLA: 4ч 20м",
    },
    {
      id: 2,
      company: 'ООО "Техносервис"',
      status: "В работе",
      description: "Настройка сетевого оборудования",
      time: "2 ч назад",
      sla: "SLA: 4ч 20м",
    },
    {
      id: 3,
      company: 'ООО "Техносервис"',
      status: "В работе",
      description: "Настройка сетевого оборудования",
      time: "2 ч назад",
      sla: "SLA: 4ч 20м",
    },
    {
      id: 4,
      company: 'ООО "Техносервис"',
      status: "В работе",
      description: "Настройка сетевого оборудования",
      time: "2 ч назад",
      sla: "SLA: 4ч 20м",
    },
  ];

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Мои заявки</h3>
        <a href="#" className={s.link}>
          Открыть все заявки
        </a>
      </div>
      <div className={s.list}>
        {requests.map((request) => (
          <div key={request.id} className={s.item}>
            <div className={s.content}>
              <div className={s.top}>
                <span className={s.company}>{request.company}</span>
                <span className={s.status}>{request.status}</span>
              </div>
              <p className={s.description}>{request.description}</p>
              <div className={s.bottom}>
                <span className={s.time}>{request.time}</span>
                <span className={s.sla}>{request.sla}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
