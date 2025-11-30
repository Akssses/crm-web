"use client";

import React from "react";
import { Container, Input, Select } from "@/ui";
import { MdTour } from "react-icons/md";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const TOUR_TYPE_OPTIONS = [
  { value: "group", label: "Групповая" },
  { value: "individual", label: "Индивидуальная" },
];

const SUPPLIER_OPTIONS = [
  { value: "getyourguide", label: "GetYourGuide" },
  { value: "local", label: "Local" },
];

export default function TourForm() {
  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <MdTour size={20} />
          <span>Экскурсии</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Город"
            icon={IoLocationOutline}
            className={s.serviceInput}
          />
          <Select
            options={TOUR_TYPE_OPTIONS}
            placeholder="Тип экскурсии"
            className={s.serviceSelect}
          />
          <Input
            placeholder="Дата"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input placeholder="Время" type="time" className={s.serviceInput} />
          <Input
            placeholder="Количество человек"
            type="number"
            min="1"
            className={s.serviceInput}
          />
          <Input placeholder="Язык гида" className={s.serviceInput} />
          <Input placeholder="Место встречи" className={s.serviceInput} />
          <Select
            options={SUPPLIER_OPTIONS}
            placeholder="Поставщик"
            className={s.serviceSelect}
          />
        </div>
      </div>
    </Container>
  );
}
