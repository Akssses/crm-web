"use client";

import React from "react";
import s from "../../../styles/RequestDetail.module.scss";

export default function VersionsTab({ request }) {
  return (
    <section className={s.versionsSection}>
      <div className={s.sectionTitle}>Версии заявки</div>
      <div className={s.versionsList}>
        <div className={s.versionItem}>
          <div className={s.versionHeader}>
            <span className={s.versionNumber}>Версия 3 (текущая)</span>
            <span className={s.versionDate}>24.10.2025 14:00</span>
          </div>
          <div className={s.versionAuthor}>Изменено: Оператор Айсулуу М.</div>
          <div className={s.versionChanges}>
            Изменения: Обновлена цена отеля, добавлен трансфер
          </div>
        </div>
        <div className={s.versionItem}>
          <div className={s.versionHeader}>
            <span className={s.versionNumber}>Версия 2</span>
            <span className={s.versionDate}>24.10.2025 12:00</span>
          </div>
          <div className={s.versionAuthor}>Изменено: Оператор Айсулуу М.</div>
          <div className={s.versionChanges}>Изменения: Добавлен отель</div>
        </div>
        <div className={s.versionItem}>
          <div className={s.versionHeader}>
            <span className={s.versionNumber}>Версия 1</span>
            <span className={s.versionDate}>24.10.2025 10:47</span>
          </div>
          <div className={s.versionAuthor}>Создано: Оператор Айсулуу М.</div>
          <div className={s.versionChanges}>Изменения: Создана заявка</div>
        </div>
      </div>
    </section>
  );
}
