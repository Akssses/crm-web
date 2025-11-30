"use client";

import React from "react";
import { Container, Input, Select } from "@/ui";
import { MdDirectionsCar } from "react-icons/md";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const TRANSFER_TYPE_OPTIONS = [
  { value: "airport_hotel", label: "Аэропорт → Отель" },
  { value: "hotel_airport", label: "Отель → Аэропорт" },
  { value: "location_location", label: "Локация → Локация" },
];

const CAR_CLASS_OPTIONS = [
  { value: "standard", label: "Стандарт" },
  { value: "comfort", label: "Комфорт" },
  { value: "minivan", label: "Минивэн" },
  { value: "vip", label: "VIP" },
  { value: "bus", label: "Автобус" },
];

const SUPPLIER_OPTIONS = [
  { value: "kiwitaxi", label: "KiwiTaxi" },
  { value: "intui", label: "Intui" },
  { value: "gettransfer", label: "GetTransfer" },
  { value: "local", label: "Локальные" },
];

export default function TransferForm() {
  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <MdDirectionsCar size={20} />
          <span>Трансфер</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Select
            options={TRANSFER_TYPE_OPTIONS}
            placeholder="Тип трансфера"
            className={s.serviceSelect}
          />
          <Input
            placeholder="Адрес (автокомплит)"
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
          <Input
            placeholder="Количество пассажиров"
            type="number"
            min="1"
            className={s.serviceInput}
          />
          <Input
            placeholder="Количество багажа"
            type="number"
            min="0"
            className={s.serviceInput}
          />
          <Select
            options={CAR_CLASS_OPTIONS}
            placeholder="Класс машины"
            className={s.serviceSelect}
          />
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Фильтры</h4>
        <Select
          options={SUPPLIER_OPTIONS}
          placeholder="Поставщик"
          className={s.serviceSelect}
        />
      </div>
    </Container>
  );
}
