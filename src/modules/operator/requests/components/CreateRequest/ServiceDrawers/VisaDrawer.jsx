import React from "react";
import { Button } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function VisaDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Тип визы */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Информация о визе</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Страна</span>
            <span className={s.value}>{data.country}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Сроки</span>
            <span className={s.value}>{data.terms}</span>
          </div>
        </div>
      </div>

      {/* 2. Тарифы */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Тарифы</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Тип</th>
              <th>Срок</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {data.tariffs?.map((tariff, idx) => (
              <tr key={idx}>
                <td>{tariff.type}</td>
                <td>{tariff.term}</td>
                <td>{tariff.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Требуемые документы */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Документы</h3>
        <div className={s.description}>
          {data.docs}
        </div>
      </div>

      {/* 5. Процесс подачи */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Процесс подачи</h3>
        <div className={s.description}>
          {data.process || "Стандартная процедура подачи документов."}
        </div>
      </div>

      {/* Buttons */}
      <div className={s.actions}>
        <div className={s.priceTotal} style={{ marginTop: 0, borderTop: "none" }}>
          <span>Итого</span>
          <span>{data.price}</span>
        </div>
        <Button variant="primary" fullWidth onClick={onClose}>
          Добавить в заявку
        </Button>
      </div>
    </div>
  );
}
