import React from "react";
import { Button, Checkbox } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function InsuranceDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Покрытие */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Страховой полис</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Компания</span>
            <span className={s.value}>{data.company}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Покрытие</span>
            <span className={s.value}>{data.coverage}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Срок</span>
            <span className={s.value}>{data.term}</span>
          </div>
        </div>
      </div>

      {/* 2. Варианты страхования */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Варианты</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Сумма</th>
              <th>Спорт</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {data.options?.map((opt, idx) => (
              <tr key={idx}>
                <td>{opt.sum}</td>
                <td>{opt.sport}</td>
                <td>{opt.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Что покрывает */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Включено в страховку</h3>
        <div className={s.amenities}>
          {data.includes?.map((item, idx) => (
            <span key={idx} className={s.amenity}>{item}</span>
          ))}
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
