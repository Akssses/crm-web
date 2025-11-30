"use client";

import React, { useState } from "react";
import { Container, Input, Select, Switch } from "@/ui";
import { BsTrainFront } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const WAGON_TYPE_OPTIONS = [
  { value: "platzkart", label: "Плацкарт" },
  { value: "coupe", label: "Купе" },
  { value: "sv", label: "СВ" },
  { value: "luxury", label: "Люкс" },
];

const SEAT_TYPE_OPTIONS = [
  { value: "lower", label: "Нижние" },
  { value: "upper", label: "Верхние" },
  { value: "side", label: "Боковые" },
  { value: "full", label: "Купе целиком" },
];

const GROUP_SEATING_OPTIONS = [
  { value: "max_near", label: "Максимально рядом" },
  { value: "clusters", label: "По кучкам" },
  { value: "any", label: "Любые доступные" },
];

export default function TrainForm() {
  const [groupBooking, setGroupBooking] = useState(false);
  const [seatsCount, setSeatsCount] = useState(1);

  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <BsTrainFront size={20} />
          <span>Ж/Д билеты</span>
        </div>
      </div>

      {/* Основные поля */}
      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Откуда (станция)"
            icon={BsTrainFront}
            className={s.serviceInput}
          />
          <Input
            placeholder="Куда (станция)"
            icon={BsTrainFront}
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата отправления"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input
            placeholder="Предпочтительное время отправления"
            type="time"
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество пассажиров"
            type="number"
            min="1"
            value={seatsCount.toString()}
            onChange={(value) => setSeatsCount(parseInt(value) || 1)}
            className={s.serviceInput}
          />
        </div>
      </div>

      {/* Групповая бронь */}
      <div className={s.formSection}>
        <Switch
          checked={groupBooking}
          onChange={setGroupBooking}
          label="Групповая бронь"
        />
        {groupBooking && (
          <div className={s.groupBookingFields}>
            <Input
              placeholder="Количество мест (до 40)"
              type="number"
              min="1"
              max="40"
              className={s.serviceInput}
            />
            <Select
              options={GROUP_SEATING_OPTIONS}
              placeholder="Тип рассадки"
              className={s.serviceSelect}
            />
            <p className={s.hint}>
              Система автоматически разобьёт на потоки (4 места за раз, до 10
              запросов подряд)
            </p>
          </div>
        )}
      </div>

      {/* Выбор мест (после поиска) */}
      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Выбор мест (после выбора поезда)</h4>
        <Select
          options={WAGON_TYPE_OPTIONS}
          placeholder="Тип вагона"
          className={s.serviceSelect}
        />
        <Select
          options={SEAT_TYPE_OPTIONS}
          placeholder="Места"
          className={s.serviceSelect}
        />
      </div>
    </Container>
  );
}
