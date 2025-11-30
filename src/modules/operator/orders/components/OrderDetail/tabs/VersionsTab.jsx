"use client";

import React from "react";
import s from "../../../styles/OrderDetail.module.scss";

export default function VersionsTab({ order }) {
  return (
    <section className={s.versionsSection}>
      <div className={s.sectionTitle}>Версии заказа</div>
      <div className={s.versionsList}>
        <div className={s.versionItem}>
          <div className={s.versionHeader}>
            <span className={s.versionNumber}>Версия 3 (текущая)</span>
            <span className={s.versionDate}>15.11.2024 14:00</span>
          </div>
          <div className={s.versionAuthor}>Изменено: Оператор Айгерим М.</div>
          <div className={s.versionChanges}>
            Изменения: Обновлена цена отеля, добавлен трансфер
          </div>
        </div>
        <div className={s.versionItem}>
          <div className={s.versionHeader}>
            <span className={s.versionNumber}>Версия 2</span>
            <span className={s.versionDate}>15.11.2024 12:00</span>
          </div>
          <div className={s.versionAuthor}>Изменено: Оператор Айгерим М.</div>
          <div className={s.versionChanges}>Изменения: Добавлен отель</div>
        </div>
        <div className={s.versionItem}>
          <div className={s.versionHeader}>
            <span className={s.versionNumber}>Версия 1</span>
            <span className={s.versionDate}>15.11.2024 10:47</span>
          </div>
          <div className={s.versionAuthor}>Создано: Оператор Айгерим М.</div>
          <div className={s.versionChanges}>Изменения: Создан заказ</div>
        </div>
      </div>
    </section>
  );
}
