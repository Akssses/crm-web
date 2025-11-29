import React from "react";
import { Button } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function TourDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Основная информация */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Экскурсия</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Название</span>
            <span className={s.value}>{data.name}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Дата и время</span>
            <span className={s.value}>{data.dateTime}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Длительность</span>
            <span className={s.value}>{data.duration}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Участников</span>
            <span className={s.value}>{data.pax}</span>
          </div>
        </div>
      </div>

      {/* 4. Маршрут */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Маршрут</h3>
        <div className={s.description}>
          {data.route}
        </div>
      </div>

      {/* 5. Что входит */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Включено</h3>
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
