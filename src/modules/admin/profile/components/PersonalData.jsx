import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import s from "../styles/PersonalData.module.scss";
import { Container } from "@/ui";

export default function PersonalData() {
  return (
    <Container size="full">
      <div className={s.header}>
        <AiOutlineUser size={24} />
        <h4>Личные данные</h4>
      </div>
      <div className={s.data}>
        <div>
          <span>Имя</span>
          <p>Иван</p>
        </div>
        <div>
          <span>Фамилия</span>
          <p>Петров</p>
        </div>
        <div>
          <span>Отчество</span>
          <p>Петров</p>
        </div>
        <div>
          <span>Телефон</span>
          <p>+996 500 123 456</p>
        </div>
        <div>
          <span>Email</span>
          <p>Petrov@gmail.com</p>
        </div>
        <div></div>
        <div>
          <span>Должность</span>
          <p>Администратор</p>
        </div>
        <div>
          <span>ID Пользователя</span>
          <p>#EMP-2024-0156</p>
        </div>
      </div>
    </Container>
  );
}
