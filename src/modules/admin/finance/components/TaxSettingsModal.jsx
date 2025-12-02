"use client";
import React, { useState } from "react";
import { Modal, Input, Select, Button } from "@/ui";
import s from "../styles/Finance.module.scss";

const TAX_REGIME_OPTIONS = [
  { value: "osn", label: "Общая система (ОСН)" },
  { value: "usn_income", label: "УСН Доходы" },
  { value: "usn_income_expense", label: "УСН Доходы минус расходы" },
  { value: "patent", label: "Патентная система" },
  { value: "eshn", label: "ЕСХН" },
];

export default function TaxSettingsModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    vatRate: "20",
    serviceFee: "2",
    taxRegime: "osn",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const validatePercent = (value, field, label, max = 100) => {
      if (value === "" || value === null || value === undefined) {
        newErrors[field] = `${label} обязательна`;
        return;
      }
      const num = parseFloat(value);
      if (isNaN(num) || num < 0 || num > max) {
        newErrors[field] = `${label} должна быть от 0 до ${max}%`;
      }
    };

    validatePercent(formData.vatRate, "vatRate", "Ставка НДС");
    validatePercent(formData.serviceFee, "serviceFee", "Сервисный сбор", 50);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Налоговые параметры" width="550px">
      <div className={s.modalForm}>
        <div className={s.formGrid}>
          <div className={s.formRow}>
            <label className={s.formLabel}>
              Ставка НДС (%) <span className={s.required}>*</span>
            </label>
            <Input
              type="number"
              value={formData.vatRate}
              onChange={(value) => handleChange("vatRate", value)}
              placeholder="20"
              error={errors.vatRate}
            />
            <p className={s.formHint}>
              Основная ставка налога на добавленную стоимость для расчёта налогооблагаемой базы
            </p>
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>
              Сервисный сбор (%) <span className={s.required}>*</span>
            </label>
            <Input
              type="number"
              value={formData.serviceFee}
              onChange={(value) => handleChange("serviceFee", value)}
              placeholder="2"
              error={errors.serviceFee}
            />
            <p className={s.formHint}>
              Дополнительный процент сервисного сбора, добавляемый к стоимости услуг
            </p>
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Налоговый режим</label>
            <Select
              value={formData.taxRegime}
              onChange={(value) => handleChange("taxRegime", value)}
              options={TAX_REGIME_OPTIONS}
            />
            <p className={s.formHint}>
              Специальный налоговый режим для организации
            </p>
          </div>
        </div>

        <div className={s.modalActions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
}
