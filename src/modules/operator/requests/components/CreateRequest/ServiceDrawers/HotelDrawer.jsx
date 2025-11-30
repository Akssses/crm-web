import React from "react";
import { Button, Checkbox } from "@/ui";
import s from "./ServiceDrawers.module.scss";
import { MdStar } from "react-icons/md";

export default function HotelDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Карточка отеля */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Отель</h3>
        <div className={s.hotelRating}>
          {data.stars} <MdStar /> {data.rating && `• ${data.rating}`}
        </div>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Название</span>
            <span className={s.value}>{data.name}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Район</span>
            <span className={s.value}>{data.location}</span>
          </div>
        </div>
        <div className={s.description} style={{ marginTop: "12px" }}>
          {data.address}
        </div>
      </div>

      {/* 2. Параметры заселения */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Параметры заселения</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Заезд</span>
            <span className={s.value}>{data.checkIn}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Выезд</span>
            <span className={s.value}>{data.checkOut}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Ночей</span>
            <span className={s.value}>{data.nights}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Гостей</span>
            <span className={s.value}>{data.guests}</span>
          </div>
        </div>
      </div>

      {/* 3. Таблица номеров */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Номера</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Тип</th>
              <th>Питание</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {data.rooms?.map((room, idx) => (
              <tr key={idx}>
                <td>{room.type}</td>
                <td>{room.meals}</td>
                <td>{room.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={s.cancellation}>
          {data.rooms?.[0]?.cancellation || "Бесплатная отмена"}
        </div>
      </div>

      {/* 4. Детали */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Детали</h3>
        <div className={s.amenities}>
          {data.amenities?.map((item, idx) => (
            <span key={idx} className={s.amenity}>{item}</span>
          ))}
        </div>
        <div className={s.description} style={{ marginTop: "12px" }}>
          {data.description}
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
