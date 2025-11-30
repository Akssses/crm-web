"use client";

import React from "react";
import { Container, Input, Select } from "@/ui";
import { FaBriefcase } from "react-icons/fa";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const SUPPLIER_OPTIONS = [
  { value: "loungekey", label: "LoungeKey" },
  { value: "prioritypass", label: "Priority Pass" },
  { value: "airport", label: "Аэропорты" },
];

export default function LoungeForm() {
  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <FaBriefcase size={20} />
          <span>Бизнес-залы</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Аэропорт"
            icon={IoLocationOutline}
            className={s.serviceInput}
          />
          <Input placeholder="Терминал" className={s.serviceInput} />
          <Input
            placeholder="Дата посещения"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input
            placeholder="Время посещения"
            type="time"
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество человек"
            type="number"
            min="1"
            className={s.serviceInput}
          />
          <Input
            placeholder="Доступные бизнес-залы"
            className={s.serviceInput}
          />
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
