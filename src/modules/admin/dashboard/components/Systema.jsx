import React from "react";
import s from "../styles/Systema.module.scss";
import { Container } from "@/ui";

export default function Systema() {
  const Data = [
    { id: 1, title: "База данных", skill: "SQL" },
    { id: 2, title: "API Сервер", skill: "Работает" },
    { id: 3, title: "Версия", skill: "v.15.01" },
    { id: 4, title: "API Dock", skill: "Swagger" },
  ];
  return (
    <Container>
      <div className={s.sys}>
        <h5>Система</h5>
        {Data.map((i) => (
          <Container padding="sm" key={i.id}>
            <div className={s.flex}>
              <p>{i.title}</p> <p className={s.border}>{i.skill}</p>
            </div>
          </Container>
        ))}
      </div>
    </Container>
  );
}
