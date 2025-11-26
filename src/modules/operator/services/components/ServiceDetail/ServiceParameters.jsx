"use client";
import React from "react";
import { Container } from "@/ui";
import s from "../../styles/ServiceDetail.module.scss";

export default function ServiceParameters() {
  return (
    <Container size="full" className={s.section}>
      <h3 className={s.sectionTitle}>Параметры услуги</h3>
      <div className={s.grid}>
        <div className={s.field}>
          <span className={s.label}>Город, название</span>
          <span className={s.value}>Стамбул, Hilton Istanbul Bosphorus</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Дата заезда</span>
          <span className={s.value}>15.12.2025</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Питание</span>
          <span className={s.value}>Завтрак включен (BB)</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Категория номера</span>
          <span className={s.value}>Deluxe Room with Bosphorus View</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Дата выезда</span>
          <span className={s.value}>20.12.2025</span>
        </div>
        <div className={s.field}>
          <span className={s.label}>Количество гостей</span>
          <span className={s.value}>2 взрослых</span>
        </div>
      </div>
    </Container>
  );
}

