import React from "react";
import s from "../../styles/MainInfo.module.scss";
import { Container } from "@/ui";

export default function MainInfo() {
  return (
    <Container size="full">
      <div className={s.main}>
        <h4>Основная информация</h4>
        <div>
          <span>Юридическое название</span>
          <p>Общество с ограниченной ответственностью "ПСЦ Тур"</p>
        </div>
        <div className={s.grid}>
          <div>
            <span>ИНН / БИН</span>
            <p>02050500077777</p>
          </div>
          <div>
            <span>Тип организации</span>
            <p>Туроператор</p>
          </div>
          <div>
            <span>Юридический адрес</span>
            <p>Бишкек, ул. Киевская 124</p>
          </div>
          <div></div>
          <div>
            <span>Email</span>
            <p className={s.email}>info@psctour.kg</p>
          </div>
          <div>
            <span>Телефон</span>
            <p>+996 500 111 222</p>
          </div>
          <div>
            <span>Основная валюта</span>
            <p>KGS</p>
          </div>
          <div>
            <span>Оператор</span>
            <p>Азамат А.</p>
          </div>
          <div>
            <span>Дата создания</span>
            <p>10.09.2024</p>
          </div>
          <div></div>
        </div>
      </div>
    </Container>
  );
}
