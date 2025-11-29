import React from "react";
import { Button } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function LoungeDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Инфо */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Бизнес-зал</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Название</span>
            <span className={s.value}>{data.name}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Терминал</span>
            <span className={s.value}>{data.terminal}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Доступ</span>
            <span className={s.value}>{data.accessTime}</span>
          </div>
        </div>
      </div>

      {/* 3. Условия */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Условия и услуги</h3>
        <div className={s.amenities}>
          {data.conditions?.map((cond, idx) => (
            <span key={idx} className={s.amenity}>{cond.item}: {cond.value}</span>
          ))}
        </div>
        {data.restrictions && (
           <div className={s.description} style={{ marginTop: "12px" }}>
             {data.restrictions}
           </div>
        )}
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
