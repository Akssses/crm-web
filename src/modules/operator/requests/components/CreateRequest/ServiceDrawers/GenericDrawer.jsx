import React from "react";
import { Button, Checkbox } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function GenericDrawer({ data, type, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Основная информация */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Информация об услуге</h3>
        <div className={s.infoGrid}>
          {Object.entries(data).map(([key, value]) => {
            if (typeof value !== "string" && typeof value !== "number") return null;
            if (key === "id" || key === "price") return null;
            return (
              <div key={key} className={s.infoItem}>
                <span className={s.label}>{key}</span>
                <span className={s.value}>{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Клиенты */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Клиенты</h3>
        <div className={s.passengerList}>
          <Checkbox label="Иван Петров" defaultChecked />
          <Checkbox label="Анна Петрова" defaultChecked />
        </div>
      </div>

      {/* 3. Цена */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Стоимость</h3>
        <div className={s.priceTotal}>
          <span>Итого</span>
          <span>{data.price}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className={s.actions}>
        <Button variant="primary" fullWidth onClick={onClose}>
          Добавить в заявку
        </Button>
        <Button variant="outline" fullWidth onClick={onClose}>
          Сохранить черновик
        </Button>
      </div>
    </div>
  );
}
