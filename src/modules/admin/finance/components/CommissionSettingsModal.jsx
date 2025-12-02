"use client";
import React, { useState } from "react";
import { Modal, Input, Select, Button } from "@/ui";
import s from "../styles/Finance.module.scss";

const ROUNDING_OPTIONS = [
  { value: "normal_1", label: "до 1 ₽ обычное" },
  { value: "normal_10", label: "до 10 ₽ обычное" },
  { value: "normal_100", label: "до 100 ₽ обычное" },
  { value: "favor_agency_10", label: "до 10 ₽ в пользу агентства" },
  { value: "favor_agency_100", label: "до 100 ₽ в пользу агентства" },
];

export default function CommissionSettingsModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    globalAgencyCommission: "5",
    globalSupplierCommission: "0",
    rounding: "normal_1",
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

    const validatePercent = (value, field, label) => {
      if (value === "" || value === null || value === undefined) {
        newErrors[field] = `${label} обязательна`;
        return;
      }
      const num = parseFloat(value);
      if (isNaN(num) || num < 0 || num > 100) {
        newErrors[field] = `${label} должна быть от 0 до 100%`;
      }
    };

    validatePercent(formData.globalAgencyCommission, "globalAgencyCommission", "Комиссия агентства");
    validatePercent(formData.globalSupplierCommission, "globalSupplierCommission", "Комиссия поставщика");

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
    <Modal isOpen={isOpen} onClose={onClose} title="Настройки комиссий" width="550px">
      <div className={s.modalForm}>
        <div className={s.formGrid}>
          <div className={s.formRow}>
            <label className={s.formLabel}>
              Глобальная комиссия агентства (%) <span className={s.required}>*</span>
            </label>
            <Input
              type="number"
              value={formData.globalAgencyCommission}
              onChange={(value) => handleChange("globalAgencyCommission", value)}
              placeholder="5"
              error={errors.globalAgencyCommission}
            />
            <p className={s.formHint}>
              Базовый процент комиссии агентства, применяется если не задано специфичное правило
            </p>
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>
              Комиссия поставщика по умолчанию (%) <span className={s.required}>*</span>
            </label>
            <Input
              type="number"
              value={formData.globalSupplierCommission}
              onChange={(value) => handleChange("globalSupplierCommission", value)}
              placeholder="0"
              error={errors.globalSupplierCommission}
            />
            <p className={s.formHint}>
              Стандартная комиссия поставщика, если не указана в правиле
            </p>
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Правило округления</label>
            <Select
              value={formData.rounding}
              onChange={(value) => handleChange("rounding", value)}
              options={ROUNDING_OPTIONS}
            />
            <p className={s.formHint}>
              Стандартное правило округления итоговых сумм в заказах и транзакциях
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
