"use client";
import React, { useState } from "react";
import s from "../styles/CurrencySettings.module.scss";
import { Select, Button, Switch } from "@/ui";

export default function CurrencySettings() {
  const [currency, setCurrency] = useState("RUB");
  const [rounding, setRounding] = useState("1");
  const [requireTaxes, setRequireTaxes] = useState(true);
  const [useTemplates, setUseTemplates] = useState(true);
  const [closeTariff, setCloseTariff] = useState(false);
  const [autoApplyCommission, setAutoApplyCommission] = useState(true);

  const currencyOptions = [
    { value: "RUB", label: "RUB - Российский рубль" },
    { value: "USD", label: "USD - Доллар США" },
    { value: "EUR", label: "EUR - Евро" },
    { value: "KGS", label: "KGS - Сом" },
  ];

  const roundingOptions = [
    { value: "1", label: "до 1" },
    { value: "10", label: "до 10" },
    { value: "100", label: "до 100" },
  ];

  return (
    <div className={s.container}>
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Основные параметры</h2>

        <div className={s.grid2}>
          <Select
            label="Валюта по умолчанию"
            options={currencyOptions}
            value={currency}
            onChange={setCurrency}
          />
          <Select
            label="Метод округления"
            options={roundingOptions}
            value={rounding}
            onChange={setRounding}
          />
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Настройки функционала</h2>

        <div className={s.settingItem}>
          <div className={s.settingContent}>
            <h3>Требуются таксы</h3>
            <p>Обязательное указание такс при создании операции</p>
          </div>
          <div>
            <Switch
              checked={autoApplyCommission}
              onChange={setAutoApplyCommission}
            />
          </div>
        </div>

        <div className={s.settingItem}>
          <div className={s.settingContent}>
            <h3>Используются шаблоны бланков</h3>
            <p>Автоматическая генерация документов по шаблонам</p>
          </div>
          <div>
            <Switch
              checked={autoApplyCommission}
              onChange={setAutoApplyCommission}
            />
          </div>
        </div>

        <div className={s.settingItem}>
          <div className={s.settingContent}>
            <h3>Разрешить закрытие тарифа (IT)</h3>
            <p>Возможность закрытия тарифа в системе IT</p>
          </div>
          <div>
            <Switch
              checked={autoApplyCommission}
              onChange={setAutoApplyCommission}
            />
          </div>
        </div>

        <div className={s.settingItem}>
          <div className={s.settingContent}>
            <h3>Автоматически применить комиссии</h3>
            <p>Расчет комиссий при создании операции</p>
          </div>
          <div>
            <Switch
              checked={autoApplyCommission}
              onChange={setAutoApplyCommission}
            />
          </div>
        </div>
      </section>
      <div className={s.buttonArea}>
        <Button variant="primary" size="lg">
          Сохранить
        </Button>
      </div>
    </div>
  );
}
