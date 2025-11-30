"use client";

import React from "react";
import { Container, Input, Select } from "@/ui";
import { FaTaxi } from "react-icons/fa";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const TAXI_CLASS_OPTIONS = [
  { value: "economy", label: "Эконом" },
  { value: "comfort", label: "Комфорт" },
  { value: "business", label: "Бизнес" },
  { value: "minivan", label: "Минивэн" },
];

const SUPPLIER_OPTIONS = [
  { value: "yandex", label: "ЯндексТакси B2B" },
  { value: "gettransfer", label: "GetTransfer" },
  { value: "local", label: "Локальные" },
];

export default function TaxiForm() {
  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <FaTaxi size={20} />
          <span>Такси</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Откуда"
            icon={IoLocationOutline}
            className={s.serviceInput}
          />
          <Input
            placeholder="Куда"
            icon={IoLocationOutline}
            className={s.serviceInput}
          />
          <Input
            placeholder="Дата"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
          <Input placeholder="Время" type="time" className={s.serviceInput} />
          <Select
            options={TAXI_CLASS_OPTIONS}
            placeholder="Класс"
            className={s.serviceSelect}
          />
          <Input
            placeholder="Количество пассажиров"
            type="number"
            min="1"
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
