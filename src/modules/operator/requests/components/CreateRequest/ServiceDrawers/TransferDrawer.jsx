import React from "react";
import { Button } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function TransferDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Маршрут */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Маршрут</h3>
        <div className={s.segment}>
          <div className={s.segmentHeader} style={{ borderBottom: "none", marginBottom: 0 }}>
            <span className={s.segmentRoute}>{data.route}</span>
            <span className={s.segmentDuration}>{data.duration}</span>
          </div>
        </div>
      </div>

      {/* 2. Инфо по авто */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Автомобиль</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Класс</span>
            <span className={s.value}>{data.carClass}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Поставщик</span>
            <span className={s.value}>{data.supplier}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Вместимость</span>
            <span className={s.value}>{data.capacity}</span>
          </div>
        </div>
      </div>

      {/* 3. Варианты авто */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Варианты</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Класс</th>
              <th>Пассажиры</th>
              <th>Багаж</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {data.cars?.map((car, idx) => (
              <tr key={idx}>
                <td>{car.class}</td>
                <td>{car.passengers}</td>
                <td>{car.luggage}</td>
                <td>{car.price}</td>
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
