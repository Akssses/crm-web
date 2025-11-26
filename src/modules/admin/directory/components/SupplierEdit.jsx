"use client";
import React, { useState } from "react";
import s from "../styles/SupplierEdit.module.scss";
import { Input, Select, Button } from "@/ui";
import { TiPlus } from "react-icons/ti";

export default function SupplierEdit() {
  const [supplierName, setSupplierName] = useState("");
  const [supplierType, setSupplierType] = useState("");
  const [services, setServices] = useState(["Авиа", "Отели"]);
  const [currency, setCurrency] = useState("");
  const [commission, setCommission] = useState("");
  const [convertCurrency, setConvertCurrency] = useState(false);

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "S7 Amadeus",
      type: "маршрутная квитанция",
      method: "OCR + паттерны",
      ocr: "Да",
      status: "OK",
    },
    {
      id: 2,
      name: "S7 Web PDF",
      type: "квитанция",
      method: "OCR",
      ocr: "Да",
      status: "Недооцункция",
    },
  ]);

  const [rules, setRules] = useState([
    {
      id: 1,
      method: "OCR",
      level: "высший",
      regularExp: "",
      currencyDetection: "(RUB|USD|EUR)",
      passengerName: "Name([A-Z\\s]+)",
      ticketNumber: "T(\\d{4})",
      total: "Total(\\d+[.,]\\d{2})",
    },
  ]);

  const [logics, setLogics] = useState([
    {
      id: 1,
      name: "Разбивать TAX-4900",
      desc: "Автоматически разделить таксы на компоненты",
      enabled: true,
    },
    {
      id: 2,
      name: "Определить валюту по строке",
      desc: "Автоматическое распознавание валюты из текста",
      enabled: true,
    },
    {
      id: 3,
      name: "Auto-trim лишних пробелов",
      desc: "Удалить лишние пробелы в начале и конце",
      enabled: true,
    },
    {
      id: 4,
      name: "Преобразовать ошибки OCR",
      desc: "Исправить l=1, O=0 и другие частые ошибки",
      enabled: true,
    },
  ]);

  const supplierTypeOptions = [
    { value: "airline", label: "Авиакомпания" },
    { value: "hotel", label: "Отель" },
    { value: "local", label: "Локальный партнёр" },
  ];

  const serviceOptions = [
    { value: "avia", label: "Авиа" },
    { value: "hotel", label: "Отели" },
    { value: "transfer", label: "Трансфер" },
    { value: "visa", label: "Виза" },
  ];

  const currencyOptions = [
    { value: "RUB", label: "RUB" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const handleAddTemplate = () => {
    setTemplates([
      ...templates,
      {
        id: Math.max(...templates.map((t) => t.id), 0) + 1,
        name: "",
        type: "",
        method: "",
        ocr: "Да",
        status: "",
      },
    ]);
  };

  return (
    <div className={s.container}>
      {/* Basic Info Section */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Основная информация о поставщике</h2>

        <Input
          label="Название поставщика"
          value={supplierName}
          onChange={setSupplierName}
          placeholder="Введите название поставщика"
        />
        <Select
          label="Тип поставщика"
          options={supplierTypeOptions}
          value={supplierType}
          onChange={setSupplierType}
          placeholder="Выберите тип поставщика"
        />

        <div className={s.fullWidth}>
          <label className={s.label}>Услуги поставщика</label>
          <div className={s.tagsContainer}>
            {services.map((service, idx) => (
              <span key={idx} className={s.tag}>
                {service}
                <button
                  onClick={() =>
                    setServices(services.filter((_, i) => i !== idx))
                  }
                >
                  ✕
                </button>
              </span>
            ))}
            <button className={s.addTagBtn}>
              <TiPlus size={16} />
              Добавить +
            </button>
          </div>
        </div>

        <Select
          label="Валюта поставщика"
          options={currencyOptions}
          value={currency}
          onChange={setCurrency}
        />
        <Input
          label="Комиссия поставщика (%)"
          value={commission}
          onChange={setCommission}
          placeholder="0.00"
        />

        {/* <label className={s.checkbox}>
          <input
            type="checkbox"
            checked={convertCurrency}
            onChange={(e) => setConvertCurrency(e.target.checked)}
          />
          Требует конвертации валюты
          <span className={s.checkboxDesc}>
            Автоматическая конвертация валюты при расчётах
          </span>
        </label> */}
      </section>

      {/* Templates Section */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Шаблоны бланков этого поставщика</h2>
          <Button icon={TiPlus} size="sm" onClick={handleAddTemplate}>
            Добавить шаблон бланка
          </Button>
        </div>

        <div className={s.templatesTable}>
          <div className={s.tableHeader}>
            <span>Шаблон</span>
            <span>Тип бланка</span>
            <span>Метод разбора</span>
            <span>Использует OCR</span>
            <span>Статус</span>
            <span>Действие</span>
          </div>
          {templates.map((template) => (
            <div key={template.id} className={s.tableRow}>
              <span>{template.name}</span>
              <span>{template.type}</span>
              <span>{template.method}</span>
              <span>{template.ocr}</span>
              <span
                className={`${s.status} ${s[template.status.toLowerCase()]}`}
              >
                {template.status}
              </span>
              <a href="#" className={s.link}>
                Отмотать
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Parsing Rules Section */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Правила парсинга</h2>

        <div className={s.rulesGrid}>
          <div className={s.ruleItem}>
            <label className={s.label}>Где искать поля</label>
            <div className={s.ruleFields}>
              <Input placeholder="Тариф" />
              <Input placeholder="YQ" />
              <Input placeholder="YR" />
              <Input placeholder="XT" />
              <Input placeholder="Airport Tax" />
              <Input placeholder="Currency detection" />
              <Input placeholder="Passenger name" />
              <Input placeholder="Ticket number" />
              <Input placeholder="Total" />
            </div>
            <button className={s.addFieldBtn}>
              <TiPlus size={16} />
              Добавить поле
            </button>
          </div>

          <div className={s.ruleItem}>
            <label className={s.label}>Описание</label>
            <div className={s.descriptions}>
              <Input placeholder="Какой Тариф в начале прочих цена нет" />
              <Input placeholder="Топливный сбор" />
              <Input placeholder="Сбор за оформление" />
              <Input placeholder="Прочие таксы" />
              <Input placeholder="Аэропортовый сбор" />
              <Input placeholder="Автоопределение валюты" />
              <Input placeholder="ФИО пассажира" />
              <Input placeholder="Номер билета" />
              <Input placeholder="Итоговая сумма" />
            </div>
          </div>
        </div>
      </section>

      {/* Logic Section */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Логика разбора</h2>

        <div className={s.logicsList}>
          {logics.map((logic) => (
            <div key={logic.id} className={s.logicItem}>
              <div className={s.logicContent}>
                <h4>{logic.name}</h4>
                <p>{logic.desc}</p>
              </div>
              <label className={s.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={logic.enabled}
                  onChange={() => {
                    setLogics(
                      logics.map((l) =>
                        l.id === logic.id ? { ...l, enabled: !l.enabled } : l
                      )
                    );
                  }}
                />
                <span className={s.slider}></span>
              </label>
            </div>
          ))}
        </div>

        {/* <div className={s.behavior}>
          <h4>Поведение</h4>
          <div className={s.behaviorOptions}>
            <label className={s.radio}>
              <input type="radio" name="behavior" defaultChecked />
              Ошибка
            </label>
            <label className={s.radio}>
              <input type="radio" name="behavior" />
              Предупреждение
            </label>
            <label className={s.radio}>
              <input type="radio" name="behavior" />
              Игнорировать
            </label>
          </div>
        </div> */}
      </section>
    </div>
  );
}
