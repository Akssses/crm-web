"use client";

import React, { useState } from "react";
import { Container, Input, Select, Switch } from "@/ui";
import { MdHotel } from "react-icons/md";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const ACCOMMODATION_TYPE_OPTIONS = [
  { value: "1_adult", label: "1 взрослый" },
  { value: "2_adults", label: "2 взрослых" },
  { value: "2_adults_1_child", label: "2 + 1 ребёнок" },
  { value: "3_adults", label: "3 взрослых" },
  { value: "custom", label: "Другое" },
];

const STAR_OPTIONS = [
  { value: "1", label: "1 звезда" },
  { value: "2", label: "2 звезды" },
  { value: "3", label: "3 звезды" },
  { value: "4", label: "4 звезды" },
  { value: "5", label: "5 звёзд" },
];

const SUPPLIER_OPTIONS = [
  { value: "ostrovok", label: "Ostrovok" },
  { value: "travelline", label: "Travelline" },
  { value: "booking", label: "Booking XML" },
  { value: "ratehawk", label: "RateHawk" },
];

export default function HotelForm() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [breakfast, setBreakfast] = useState(false);
  const [freeCancellation, setFreeCancellation] = useState(false);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <MdHotel size={20} />
          <span>Отель</span>
        </div>
      </div>

      {/* Основные параметры */}
      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Город"
            icon={IoLocationOutline}
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата заезда"
            icon={IoCalendarOutline}
            type="date"
            value={checkIn}
            onChange={setCheckIn}
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата выезда"
            icon={IoCalendarOutline}
            type="date"
            value={checkOut}
            onChange={setCheckOut}
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество ночей"
            value={calculateNights() || ""}
            readOnly
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество гостей"
            type="number"
            min="1"
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество номеров"
            type="number"
            min="1"
            className={s.serviceInput}
          />
          <Input placeholder="Национальность" className={s.serviceInput} />
          <Select
            options={ACCOMMODATION_TYPE_OPTIONS}
            placeholder="Тип размещения"
            className={s.serviceSelect}
          />
        </div>
      </div>

      {/* Фильтры */}
      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Фильтры</h4>
        <div className={s.serviceFormGrid}>
          <Select
            options={STAR_OPTIONS}
            placeholder="Количество звёзд"
            className={s.serviceSelect}
          />
          <Input
            placeholder="Цена от"
            type="number"
            className={s.serviceInput}
          />
          <Input
            placeholder="Цена до"
            type="number"
            className={s.serviceInput}
          />
          <Input placeholder="Район / локация" className={s.serviceInput} />
        </div>
        <div className={s.checkboxGroup}>
          <Switch
            checked={breakfast}
            onChange={setBreakfast}
            label="Завтраки включены"
          />
          <Switch
            checked={freeCancellation}
            onChange={setFreeCancellation}
            label="Бесплатная отмена"
          />
        </div>
        <Select
          options={SUPPLIER_OPTIONS}
          placeholder="Поставщик"
          className={s.serviceSelect}
        />
      </div>
    </Container>
  );
}
