"use client";
import React, { useState } from "react";
import s from "../styles/TaxEdit.module.scss";
import { Input, Select, Button } from "@/ui";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiPlus } from "react-icons/ti";

export default function TaxEdit() {
  const [taxCode, setTaxCode] = useState("YQ");
  const [taxName, setTaxName] = useState("Топливный сбор");
  const [taxType, setTaxType] = useState("taxi-provider");
  const [currency, setCurrency] = useState("USD");
  const [nominalAmount, setNominalAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [lastModified, setLastModified] = useState("15.11.2024");
  const [lastChanged, setLastChanged] = useState("20.11.2024");

  const [orgRules, setOrgRules] = useState([
    {
      org: "ООО 'Глобал Тревел'",
      direction: "BBL",
      value: "175.00 USD",
      id: 1,
    },
    { org: "ЗАО 'Волк Сервис'", direction: "MBL", value: "120.00 USD", id: 2 },
    { org: "ИП Сидоров П.К.", direction: "Любое", value: "140.00 USD", id: 3 },
  ]);

  const taxTypeOptions = [
    { value: "taxi-provider", label: "Такса поставщика" },
    { value: "our-tax", label: "Наш сбор" },
    { value: "margin", label: "Маржа" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "RUB", label: "RUB" },
  ];

  const handleDeleteRule = (id) => {
    setOrgRules(orgRules.filter((rule) => rule.id !== id));
  };

  const handleAddRule = () => {
    setOrgRules([
      ...orgRules,
      {
        org: "",
        direction: "",
        value: "",
        id: Math.max(...orgRules.map((r) => r.id), 0) + 1,
      },
    ]);
  };

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Основные параметры</h2>

        <div className={s.grid2}>
          <Input
            label="Код такса"
            value={taxCode}
            onChange={setTaxCode}
            placeholder="YQ"
          />
          <Input
            label="Название"
            value={taxName}
            onChange={setTaxName}
            placeholder="Топливный сбор"
          />
        </div>

        <div className={s.grid2}>
          <Select
            label="Тип такса"
            options={taxTypeOptions}
            value={taxType}
            onChange={setTaxType}
          />
          <Select
            label="Валюта"
            options={currencyOptions}
            value={currency}
            onChange={setCurrency}
          />
        </div>

        <div className={s.fullWidth}>
          <Input
            label="Номиналь сбора"
            value={nominalAmount}
            onChange={setNominalAmount}
            placeholder="Сумма"
          />
        </div>

        <div className={s.fullWidth}>
          <label className={s.label}>Описание</label>
          <textarea
            className={s.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Топливный сбор взимается авиакомпаниями для покрытия расходов на топливо. Применяется к большинству международных рейсов."
          />
        </div>

        <div className={s.checkboxArea}>
          <label className={s.checkbox}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Активна
          </label>
          <p className={s.meta}>
            Создано: {lastModified}, Изменено: {lastChanged}
          </p>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          Индивидуальные значения для организаций
        </h2>
        <p className={s.subtitle}>
          Если у организации есть собственная стоимость такса, она заменет
          значение по умолчанию
        </p>

        <div className={s.tableHeader}>
          <span>Организация</span>
          <span>Направление</span>
          <span>Значение</span>
          <span>Действия</span>
        </div>

        <div className={s.tableBody}>
          {orgRules.map((rule) => (
            <div key={rule.id} className={s.tableRow}>
              <span className={s.cell}>{rule.org}</span>
              <span className={s.cell}>{rule.direction}</span>
              <span className={s.cell}>{rule.value}</span>
              <div className={s.actions}>
                <button className={s.iconBtn} title="Редактировать">
                  <MdEdit size={18} />
                </button>
                <button
                  className={s.iconBtn}
                  onClick={() => handleDeleteRule(rule.id)}
                  title="Удалить"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button icon={TiPlus} onClick={handleAddRule}>
          Добавить правило
        </Button>
      </section>
    </div>
  );
}
