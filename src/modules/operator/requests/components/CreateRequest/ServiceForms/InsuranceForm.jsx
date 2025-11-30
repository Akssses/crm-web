"use client";

import React, { useState } from "react";
import { Container, Input, Select, Switch } from "@/ui";
import { BsShieldCheck } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const INSURANCE_TYPE_OPTIONS = [
  { value: "medical", label: "Медицинская" },
  { value: "trip_cancellation", label: "Отмена поездки" },
  { value: "baggage", label: "Багаж" },
  { value: "liability", label: "Гражданская ответственность" },
];

const SUPPLIER_OPTIONS = [
  { value: "erv", label: "ERV" },
  { value: "alfa", label: "Alfa" },
  { value: "sber", label: "Sber" },
  { value: "liberty", label: "Liberty" },
];

export default function InsuranceForm() {
  const [sports, setSports] = useState(false);

  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <BsShieldCheck size={20} />
          <span>Страховка</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input placeholder="Страна" className={s.serviceInput} />
          <Input
            placeholder="Дата начала поездки"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата окончания поездки"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество человек"
            type="number"
            min="1"
            className={s.serviceInput}
          />
          <Select
            options={INSURANCE_TYPE_OPTIONS}
            placeholder="Тип страхования"
            className={s.serviceSelect}
          />
          <Input
            placeholder="Сумма покрытия"
            type="number"
            className={s.serviceInput}
          />
        </div>
        <div className={s.checkboxGroup}>
          <Switch
            checked={sports}
            onChange={setSports}
            label="Спорт / активный отдых"
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
