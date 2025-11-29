"use client";

import React, { useState } from "react";
import { Container, Input, Select, Switch } from "@/ui";
import { HiGlobeAlt } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import s from "../../../styles/CreateRequest.module.scss";

const VISA_TYPE_OPTIONS = [
  { value: "tourist", label: "Туристическая" },
  { value: "business", label: "Деловая" },
  { value: "urgent", label: "Срочная" },
];

export default function VisaForm() {
  const [visaCenterSubmission, setVisaCenterSubmission] = useState(false);
  const [transferToCenter, setTransferToCenter] = useState(false);

  return (
    <Container size="full" className={s.section}>
      <div className={s.serviceBlockHeader}>
        <div className={s.serviceBlockTitle}>
          <HiGlobeAlt size={20} />
          <span>Виза</span>
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Основные параметры</h4>
        <div className={s.serviceFormGrid}>
          <Input
            placeholder="Страна назначения"
            icon={HiGlobeAlt}
            className={s.serviceInput}
          />
          <Select
            options={VISA_TYPE_OPTIONS}
            placeholder="Тип визы"
            className={s.serviceSelect}
          />
          <Input placeholder="Срок пребывания" className={s.serviceInput} />
          <Input placeholder="Гражданство" className={s.serviceInput} />
          <Input
            placeholder="Даты поездки"
            icon={IoCalendarOutline}
            type="date"
            className={s.serviceInput}
          />
        </div>
      </div>

      <div className={s.formSection}>
        <h4 className={s.formSectionTitle}>Пакет документов</h4>
        <div className={s.checkboxGroup}>
          <Switch
            checked={visaCenterSubmission}
            onChange={setVisaCenterSubmission}
            label="Требуется ли подача в визовый центр"
          />
          <Switch
            checked={transferToCenter}
            onChange={setTransferToCenter}
            label="Нужен ли трансфер до визового центра"
          />
        </div>
      </div>
    </Container>
  );
}
