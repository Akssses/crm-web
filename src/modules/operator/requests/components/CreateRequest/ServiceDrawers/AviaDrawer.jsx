import React from "react";
import { Button, Checkbox } from "@/ui";
import s from "./ServiceDrawers.module.scss";

export default function AviaDrawer({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={s.drawerContent}>
      {/* 1. Общая информация */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Общая информация</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Авиакомпания</span>
            <span className={s.value}>{data.airline}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Рейс</span>
            <span className={s.value}>{data.flightNumber}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Тариф</span>
            <span className={s.value}>{data.tariffType || "Эконом"}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Цена за пассажира</span>
            <span className={s.value}>{data.price}</span>
          </div>
        </div>
        <div className={s.priceTotal}>
          <span>Общая стоимость</span>
          <span>{data.totalPrice || data.price}</span>
        </div>
      </div>

      {/* 2. Маршрут */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Маршрут</h3>
        {data.segments?.map((segment, idx) => (
          <div key={idx} className={s.segment}>
            <div className={s.segmentHeader}>
              <span className={s.segmentRoute}>
                {segment.from} → {segment.to}
              </span>
              <span className={s.segmentDuration}>{segment.duration}</span>
            </div>
            <div className={s.segmentTimes}>
              <div className={s.timeBlock}>
                <span className={s.time}>{segment.departure}</span>
                <span className={s.date}>Вылет</span>
              </div>
              <div className={s.timeBlock}>
                <span className={s.time}>{segment.arrival}</span>
                <span className={s.date}>Прилет</span>
              </div>
            </div>
            <div className={s.segmentMeta}>
              <span>Рейс: {segment.flight}</span>
              <span>Самолёт: {segment.aircraft}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Тарифные правила */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Тарифные правила</h3>
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <span className={s.label}>Возврат</span>
            <span className={s.value}>{data.tariffRules?.refund || "По условиям тарифа"}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Обмен</span>
            <span className={s.value}>{data.tariffRules?.exchange || "По условиям тарифа"}</span>
          </div>
          <div className={s.infoItem}>
            <span className={s.label}>Багаж</span>
            <span className={s.value}>{data.tariffRules?.baggage || data.baggage}</span>
          </div>
        </div>
      </div>

      {/* 4. Состав пассажиров */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Пассажиры</h3>
        <div className={s.passengerList}>
          {data.passengers?.map((pax, idx) => (
            <div key={idx} className={s.passengerItem}>
              <div className={s.passengerInfo}>
                <span className={s.passengerName}>{pax.name}</span>
                <span className={s.passengerDetails}>{pax.type}, {pax.birthDate}</span>
              </div>
              <div className={s.tags}>
                <span className={s.tag}>{pax.tariff}</span>
              </div>
            </div>
          ))}
          <Button variant="text" size="sm" className={s.addPassengerBtn}>
            + Добавить пассажира
          </Button>
        </div>
      </div>

      {/* 5. Допуслуги */}
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Дополнительные услуги</h3>
        <div className={s.optionsList}>
          <Checkbox label="Дополнительный багаж" />
          <Checkbox label="Выбор питания" />
          <Checkbox label="Страховка в перелёт" />
          <Checkbox label="Fast Track" />
        </div>
      </div>

      {/* Buttons */}
      <div className={s.actions}>
        <Button variant="primary" fullWidth onClick={onClose}>
          Добавить в заявку
        </Button>
      </div>
    </div>
  );
}
