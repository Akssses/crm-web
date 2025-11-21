import React from "react";
import { Container } from "@/ui";
import s from "../../styles/BasicInfo.module.scss";

export default function BasicInfo() {
  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Базовая информация</h3>
      <div className={s.content}>
        <div className={s.column}>
          <div className={s.infoRow}>
            <span className={s.label}>Название организации</span>
            <span className={s.value}>ООО "Asia Travel"</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>ИНН / БИН</span>
            <span className={s.value}>01234567890123</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Адрес</span>
            <span className={s.value}>
              г. Бишкек, ул. Токтогула 123, оф. 45
            </span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Основная валюта</span>
            <span className={s.value}>KGS</span>
          </div>
        </div>
        <div className={s.column}>
          <div className={s.infoRow}>
            <span className={s.label}>Контактное лицо</span>
            <span className={s.value}>Айсулуу Мамбетова / Директор</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Контакты</span>
            <span className={s.value}>
              +996 555 333 445 / manager@asiatravel.kg
            </span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Количество филиалов</span>
            <span className={s.value}>3</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Договор</span>
            <span className={s.value}>Nº DG-2024-0123 / 15.03.2024</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.label}>Примечание</span>
            <span className={s.value}>
              VIP клиент, приоритетное обслуживание
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

