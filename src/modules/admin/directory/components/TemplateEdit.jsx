"use client";
import React, { useState } from "react";
import s from "../styles/TemplateEdit.module.scss";
import { Input, Select, Button } from "@/ui";

export default function TemplateEdit() {
  const [templateName, setTemplateName] = useState("S7 Amadeus");
  const [supplier, setSupplier] = useState("S7 Airlines");
  const [type, setType] = useState("routing");
  const [format, setFormat] = useState("PDF");
  const [parseMethod, setParseMethod] = useState("OCR");
  const [language, setLanguage] = useState("Russian");
  const [currency, setCurrency] = useState("RUB");
  const [zone, setZone] = useState("AVIA");

  const supplierOptions = [
    { value: "S7 Airlines", label: "S7 Airlines" },
    { value: "Aeroflot", label: "Aeroflot" },
    { value: "Booking.com", label: "Booking.com" },
  ];

  const typeOptions = [
    { value: "routing", label: "Маршрутная квитанция" },
    { value: "voucher", label: "Ваучер" },
    { value: "invoice", label: "Счёт" },
  ];

  const formatOptions = [
    { value: "PDF", label: "PDF" },
    { value: "JPG", label: "JPG" },
    { value: "XML", label: "XML" },
  ];

  const parseMethodOptions = [
    { value: "OCR", label: "OCR" },
    { value: "Regex", label: "Regex" },
    { value: "OCR+Regex", label: "OCR + Regex" },
  ];

  const languageOptions = [
    { value: "Russian", label: "Русский" },
    { value: "English", label: "Английский" },
    { value: "Spanish", label: "Испанский" },
  ];

  const currencyOptions = [
    { value: "RUB", label: "RUB" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const zoneOptions = [
    { value: "AVIA", label: "АВИА" },
    { value: "HOTEL", label: "ОТЕЛИ" },
    { value: "TRANSFER", label: "ТРАНСФЕР" },
  ];

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div></div>
        <div className={s.flex}>
          <Button variant="outline">Посмотреть примеры бланков</Button>
          <Button>Сохранить</Button>
        </div>
      </div>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Основная информация о шаблоне</h2>

        <div className={s.grid2}>
          <Input
            label="Название шаблона"
            value={templateName}
            onChange={setTemplateName}
            placeholder="S7 Amadeus"
          />
          <Select
            label="Поставщик"
            options={supplierOptions}
            value={supplier}
            onChange={setSupplier}
          />
        </div>

        <div className={s.grid2}>
          <Select
            label="Тип бланка"
            options={typeOptions}
            value={type}
            onChange={setType}
          />
          <Select
            label="Формат"
            options={formatOptions}
            value={format}
            onChange={setFormat}
          />
        </div>

        <div className={s.grid2}>
          <Select
            label="Метод разбора"
            options={parseMethodOptions}
            value={parseMethod}
            onChange={setParseMethod}
          />
          <Select
            label="Язык бланка"
            options={languageOptions}
            value={language}
            onChange={setLanguage}
          />
        </div>

        <div className={s.grid2}>
          <Select
            label="Валюта по умолчанию"
            options={currencyOptions}
            value={currency}
            onChange={setCurrency}
          />
          <Select
            label="Зона обработки"
            options={zoneOptions}
            value={zone}
            onChange={setZone}
          />
        </div>
      </section>
    </div>
  );
}
