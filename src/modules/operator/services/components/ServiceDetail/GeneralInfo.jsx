"use client";
import React from "react";
import { Container } from "@/ui";
import Link from "next/link";
import s from "../../styles/ServiceDetail.module.scss";

export default function GeneralInfo() {
  return (
    <Container size="full" className={s.section}>
      <h3 className={s.sectionTitle}>Общие данные</h3>
      <div className={s.grid}>
        <div className={s.field}>
          <span className={s.label}>ID услуги</span>
          <span className={s.value}>SRV-0234</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Заказ</span>
          <Link href="/operator/clients/1" className={s.link}>
            ORD-145
          </Link>
        </div>
        <div className={s.field}>
          <span className={s.label}>Организация</span>
          <span className={s.value}>ООО "Asia Travel"</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Дата создания</span>
          <span className={s.value}>10.10.2025</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Тип услуги</span>
          <span className={s.value}>Отель</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Клиент</span>
          <span className={s.value}>Иван Петров</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Поставщик</span>
          <span className={s.value}>Hilton Hotels</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Ответственный оператор</span>
          <div className={s.operator}>
            <span className={s.value}>Андрей Клауд</span>
            <div className={s.avatar}>АК</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
