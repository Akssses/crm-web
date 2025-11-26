"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Switch } from "@/ui";
import { FaSave } from "react-icons/fa";
import s from "../../styles/TaxParameters.module.scss";

export default function TaxParameters() {
  const [settings, setSettings] = useState({
    // Статус НДС
    vatStatus: "payer", // "payer" или "non-payer"
    vatRate: "20", // "0", "10", "20", "custom"
    customVatRate: "",
    
    // Режим налогообложения
    taxRegime: "OSN", // "OSN", "USN", "patent", "agent"
    
    // Налоговые параметры для документов
    vatInInvoice: "with", // "with", "without", "separate"
    vatInAct: "with", // "with", "without", "separate"
    roundingRules: "up", // "up", "down", "nearest"
    
    // Налоговые удержания
    agentReward: "",
    agentRewardType: "percentage", // "percentage" или "fixed"
    intermediaryCommissions: false,
    commissions: [],
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Сохранение налоговых параметров:", settings);
  };

  return (
    <div className={s.main}>
      <Container size="full">
        <div className={s.header}>
          <h4>Налоговые параметры организации</h4>
          <Button variant="primary" icon={FaSave} onClick={handleSave}>
            Сохранить изменения
          </Button>
        </div>
      </Container>

      {/* Статус НДС */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Статус НДС</h5>
          <div className={s.grid}>
            <div className={s.radioGroup}>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="vatStatus"
                  value="payer"
                  checked={settings.vatStatus === "payer"}
                  onChange={(e) => handleChange("vatStatus", e.target.value)}
                />
                <span>Плательщик НДС</span>
              </label>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="vatStatus"
                  value="non-payer"
                  checked={settings.vatStatus === "non-payer"}
                  onChange={(e) => handleChange("vatStatus", e.target.value)}
                />
                <span>Не плательщик НДС</span>
              </label>
            </div>
            {settings.vatStatus === "payer" && (
              <div className={s.inputGroup}>
                <Select
                  label="Ставка НДС"
                  options={[
                    { value: "0", label: "0%" },
                    { value: "10", label: "10%" },
                    { value: "20", label: "20%" },
                    { value: "custom", label: "Ручная" },
                  ]}
                  value={settings.vatRate}
                  onChange={(value) => handleChange("vatRate", value)}
                />
                {settings.vatRate === "custom" && (
                  <div className={s.inputWrapper}>
                    <Input
                      label="Ставка НДС"
                      type="number"
                      placeholder="Введите ставку"
                      value={settings.customVatRate}
                      onChange={(value) => handleChange("customVatRate", value)}
                    />
                    <span className={s.unit}>%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Режим налогообложения */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Режим налогообложения</h5>
          <div className={s.grid}>
            <Select
              label="Режим налогообложения"
              options={[
                { value: "OSN", label: "ОСН (Общая система налогообложения)" },
                { value: "USN", label: "УСН (Упрощённая система налогообложения)" },
                { value: "patent", label: "Патент" },
                { value: "agent", label: "Агентская схема" },
              ]}
              value={settings.taxRegime}
              onChange={(value) => handleChange("taxRegime", value)}
            />
          </div>
        </div>
      </Container>

      {/* Налоговые параметры для документов */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Налоговые параметры для документов</h5>
          <div className={s.grid}>
            <Select
              label="Как отображать НДС в счётах"
              options={[
                { value: "with", label: "С НДС" },
                { value: "without", label: "Без НДС" },
                { value: "separate", label: "Отдельной строкой" },
              ]}
              value={settings.vatInInvoice}
              onChange={(value) => handleChange("vatInInvoice", value)}
            />
            <Select
              label="Как отображать НДС в актах"
              options={[
                { value: "with", label: "С НДС" },
                { value: "without", label: "Без НДС" },
                { value: "separate", label: "Отдельной строкой" },
              ]}
              value={settings.vatInAct}
              onChange={(value) => handleChange("vatInAct", value)}
            />
            <Select
              label="Правила округления"
              options={[
                { value: "up", label: "Вверх" },
                { value: "down", label: "Вниз" },
                { value: "nearest", label: "До ближайшего" },
              ]}
              value={settings.roundingRules}
              onChange={(value) => handleChange("roundingRules", value)}
            />
          </div>
        </div>
      </Container>

      {/* Налоговые удержания */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Налоговые удержания</h5>
          <div className={s.grid}>
            <div className={s.radioGroup}>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="agentRewardType"
                  value="percentage"
                  checked={settings.agentRewardType === "percentage"}
                  onChange={(e) => handleChange("agentRewardType", e.target.value)}
                />
                <span>Процент (%)</span>
              </label>
              <label className={s.radioLabel}>
                <input
                  type="radio"
                  name="agentRewardType"
                  value="fixed"
                  checked={settings.agentRewardType === "fixed"}
                  onChange={(e) => handleChange("agentRewardType", e.target.value)}
                />
                <span>Фиксированная сумма</span>
              </label>
            </div>
            <div className={s.inputWrapper}>
              <Input
                label="Агентское вознаграждение"
                type="number"
                placeholder="0"
                value={settings.agentReward}
                onChange={(value) => handleChange("agentReward", value)}
              />
              {settings.agentRewardType === "percentage" && (
                <span className={s.unit}>%</span>
              )}
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Комиссии посредников"
                checked={settings.intermediaryCommissions}
                onChange={(checked) => handleChange("intermediaryCommissions", checked)}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

