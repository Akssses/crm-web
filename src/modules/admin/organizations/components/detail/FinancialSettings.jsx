"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Switch } from "@/ui";
import { FaSave } from "react-icons/fa";
import s from "../../styles/FinancialSettings.module.scss";

export default function FinancialSettings() {
  const [settings, setSettings] = useState({
    // Тип расчёта
    calculationType: "percentage", // "fixed" или "percentage"
    fixedAmount: "",
    percentageAmount: "5",

    // Надбавки
    markupType: "percentage", // "fixed" или "percentage"
    markupFixed: "",
    markupPercentage: "0",

    // Правила округления
    roundingMethod: "up", // "up", "down", "nearest"
    roundingValue: "1",

    // Валюта расчётов
    calculationCurrency: "KGS",

    // Единые сборы по услугам
    unifiedFees: true,
    fees: [
      {
        id: 1,
        service: "Авиабилеты",
        type: "percentage",
        value: "3",
        currency: "KGS",
      },
      { id: 2, service: "Отели", type: "fixed", value: "500", currency: "KGS" },
      {
        id: 3,
        service: "Трансферы",
        type: "percentage",
        value: "5",
        currency: "KGS",
      },
    ],
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, subField, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Сохранение настроек:", settings);
    // Здесь будет логика сохранения
  };

  return (
    <div className={s.main}>
      <Container size="full">
        <div className={s.header}>
          <h4>Финансовые настройки организации</h4>
          <Button variant="primary" icon={FaSave} onClick={handleSave}>
            Сохранить изменения
          </Button>
        </div>
      </Container>

      {/* Тип расчёта */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Тип расчёта комиссий</h5>
          <div className={s.grid}>
            <div className={s.radioGroup}>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="calculationType"
                  value="percentage"
                  checked={settings.calculationType === "percentage"}
                  onChange={(e) =>
                    handleChange("calculationType", e.target.value)
                  }
                />
                <span>Процент (%)</span>
              </label>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="calculationType"
                  value="fixed"
                  checked={settings.calculationType === "fixed"}
                  onChange={(e) =>
                    handleChange("calculationType", e.target.value)
                  }
                />
                <span>Фиксированная сумма</span>
              </label>
            </div>
            {settings.calculationType === "percentage" ? (
              <div className={s.inputWrapper}>
                <Input
                  label="Процент комиссии"
                  type="number"
                  placeholder="5"
                  value={settings.percentageAmount}
                  onChange={(value) => handleChange("percentageAmount", value)}
                />
                <span className={s.unit}>%</span>
              </div>
            ) : (
              <div className={s.inputGroup}>
                <Input
                  label="Фиксированная сумма"
                  type="number"
                  placeholder="1000"
                  value={settings.fixedAmount}
                  onChange={(value) => handleChange("fixedAmount", value)}
                />
                <Select
                  label="Валюта"
                  options={[
                    { value: "KGS", label: "KGS" },
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                  ]}
                  value={settings.calculationCurrency}
                  onChange={(value) =>
                    handleChange("calculationCurrency", value)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Надбавки */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Надбавки</h5>
          <div className={s.grid}>
            <div className={s.radioGroup}>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="markupType"
                  value="percentage"
                  checked={settings.markupType === "percentage"}
                  onChange={(e) => handleChange("markupType", e.target.value)}
                />
                <span>Процент (%)</span>
              </label>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="markupType"
                  value="fixed"
                  checked={settings.markupType === "fixed"}
                  onChange={(e) => handleChange("markupType", e.target.value)}
                />
                <span>Фиксированная сумма</span>
              </label>
            </div>
            {settings.markupType === "percentage" ? (
              <div className={s.inputWrapper}>
                <Input
                  label="Процент надбавки"
                  type="number"
                  placeholder="0"
                  value={settings.markupPercentage}
                  onChange={(value) => handleChange("markupPercentage", value)}
                />
                <span className={s.unit}>%</span>
              </div>
            ) : (
              <div className={s.inputGroup}>
                <Input
                  label="Фиксированная надбавка"
                  type="number"
                  placeholder="0"
                  value={settings.markupFixed}
                  onChange={(value) => handleChange("markupFixed", value)}
                />
                <Select
                  label="Валюта"
                  options={[
                    { value: "KGS", label: "KGS" },
                    { value: "USD", label: "USD" },
                    { value: "EUR", label: "EUR" },
                  ]}
                  value={settings.calculationCurrency}
                  onChange={(value) =>
                    handleChange("calculationCurrency", value)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Правила округления */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Правила округления</h5>
          <div className={s.grid}>
            <Select
              label="Метод округления"
              options={[
                { value: "up", label: "Вверх" },
                { value: "down", label: "Вниз" },
                { value: "nearest", label: "До ближайшего" },
              ]}
              value={settings.roundingMethod}
              onChange={(value) => handleChange("roundingMethod", value)}
            />
            <div className={s.inputGroup}>
              <Input
                label="Значение округления"
                type="number"
                placeholder="1"
                value={settings.roundingValue}
                onChange={(value) => handleChange("roundingValue", value)}
              />
              <Select
                label="Валюта"
                options={[
                  { value: "KGS", label: "KGS" },
                  { value: "USD", label: "USD" },
                  { value: "EUR", label: "EUR" },
                ]}
                value={settings.calculationCurrency}
                onChange={(value) => handleChange("calculationCurrency", value)}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Валюта расчётов */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Валюта расчётов</h5>
          <div className={s.grid}>
            <Select
              label="Основная валюта расчётов"
              options={[
                { value: "KGS", label: "KGS - Кыргызский сом" },
                { value: "USD", label: "USD - Доллар США" },
                { value: "EUR", label: "EUR - Евро" },
                { value: "RUB", label: "RUB - Российский рубль" },
              ]}
              value={settings.calculationCurrency}
              onChange={(value) => handleChange("calculationCurrency", value)}
            />
          </div>
        </div>
      </Container>

      {/* Единые сборы по услугам */}
      <Container size="full">
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h5 className={s.sectionTitle}>Единые сборы по услугам</h5>
            <div className={s.switchContainer}>
              <Switch
                label="Включить единые сборы"
                checked={settings.unifiedFees}
                onChange={(checked) => handleChange("unifiedFees", checked)}
              />
            </div>
          </div>

          {settings.unifiedFees && (
            <div className={s.feesTable}>
              <div className={s.tableHeader}>
                <span>Услуга</span>
                <span>Тип</span>
                <span>Значение</span>
                <span>Валюта</span>
                <span>Действия</span>
              </div>
              {settings.fees.map((fee) => (
                <div key={fee.id} className={s.tableRow}>
                  <span>{fee.service}</span>
                  <span>{fee.type === "percentage" ? "%" : "Фикс"}</span>
                  <span>{fee.value}</span>
                  <span>{fee.currency}</span>
                  <div className={s.actions}>
                    <Button variant="blue" size="sm">
                      Изменить
                    </Button>
                    <Button variant="red" size="sm">
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="bggreen" size="sm" style={{ marginTop: "12px" }}>
                Добавить сбор
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
