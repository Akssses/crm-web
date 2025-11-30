"use client";

import React from "react";
import { Container, Input, Select } from "@/ui";
import { FaBus } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const CLASS_OPTIONS = [
  { value: "economy", label: "Эконом" },
  { value: "business", label: "Бизнес" },
];

export default function BusForm() {
  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <FaBus size={20} />
          <span>Автобус</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input placeholder="Откуда" icon={FaBus} className={s.serviceInput} />
          <Input placeholder="Куда" icon={FaBus} className={s.serviceInput} />
          <Input
            placeholder="Дата отправления"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата возврата"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Select
            options={CLASS_OPTIONS}
            placeholder="Класс"
            className={s.serviceSelect}
          />
          <Input
            placeholder="Пассажиры"
            type="number"
            min="1"
            className={s.serviceInput}
          />
        </div>
      </div>
    </Container>
  );
}
