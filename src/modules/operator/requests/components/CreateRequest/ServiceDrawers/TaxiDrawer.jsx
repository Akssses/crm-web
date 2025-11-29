import React from "react";
import { Button } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function TaxiDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Маршрут */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Поездка</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Сервис</span>
            <span className={s.value}>{data.service}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Маршрут</span>
            <span className={s.value}>{data.route}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Время в пути</span>
            <span className={s.value}>{data.duration}</span>
          </div>
        </div>
      </div>

      {/* 3. Класс авто */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Автомобиль</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Класс</span>
            <span className={s.value}>{data.carClass}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Пассажиры</span>
            <span className={s.value}>{data.pax}</span>
          </div>
        </div>
      </div>

      {/* Таблица классов */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Варианты</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Класс</th>
              <th>Пассажиры</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {data.classes?.map((cls, idx) => (
              <tr key={idx}>
                <td>{cls.class}</td>
                <td>{cls.passengers}</td>
                <td>{cls.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
