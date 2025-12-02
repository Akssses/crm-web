"use client";
import React from "react";
import s from "../styles/Finance.module.scss";

export default function FinanceSettings() {
  return (
    <div className={s.section}>
      <h2 className={s.sectionTitle}>Финансовые настройки</h2>
      <p className={s.sectionDescription}>
        Здесь будут глобальные параметры финансовой модели CRM: комиссионные
        правила, налоговые режимы, маркап и настройки по типам заказов.
      </p>
      <div className={s.settingsGrid}>
        <div className={s.settingsCard}>
          <h3>Комиссии и маркап</h3>
          <p>
            Глобальные комиссии агентства и поставщиков, индивидуальные правила
            по организациям, поставщикам и типам услуг. Приоритеты правил,
            распределение комиссий между операторами и правила округления.
          </p>
        </div>
        <div className={s.settingsCard}>
          <h3>Типы операций</h3>
          <p>
            Справочник типов финансовых операций: оплаты клиентов, оплаты
            поставщикам, депозиты, корректировки, комиссии, штрафы и возвраты.
          </p>
        </div>
        <div className={s.settingsCard}>
          <h3>Налоговые параметры</h3>
          <p>
            НДС, сервисные сборы, спецрежимы, призна́к облагаемых услуг, правила
            по организациям и типам услуг.
          </p>
        </div>
      </div>
    </div>
  );
}
