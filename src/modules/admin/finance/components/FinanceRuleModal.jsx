"use client";
import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Switch, Button } from "@/ui";
import s from "../styles/Finance.module.scss";

const ORDER_TYPE_OPTIONS = [
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "partner", label: "Партнёрский" },
  { value: "group", label: "Групповой" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отели" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визы" },
];

const ROUNDING_OPTIONS = [
  { value: "normal_1", label: "до 1 ₽ обычное" },
  { value: "normal_10", label: "до 10 ₽ обычное" },
  { value: "normal_100", label: "до 100 ₽ обычное" },
  { value: "favor_agency_10", label: "до 10 ₽ в пользу агентства" },
  { value: "favor_agency_100", label: "до 100 ₽ в пользу агентства" },
];

export default function FinanceRuleModal({ isOpen, onClose, onSave, editingRule }) {
  const [formData, setFormData] = useState({
    priority: "",
    orderType: "b2b",
    serviceType: "all",
    organization: "",
    supplier: "",
    agencyCommission: "",
    supplierCommission: "",
    markup: "",
    rounding: "normal_1",
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRule) {
      setFormData({
        priority: editingRule.priority || "",
        orderType: editingRule.orderType || "b2b",
        serviceType: editingRule.serviceType || "all",
        organization: editingRule.organization || "",
        supplier: editingRule.supplier || "",
        agencyCommission: editingRule.agencyCommission?.replace("%", "") || "",
        supplierCommission: editingRule.supplierCommission?.replace("%", "") || "",
        markup: editingRule.markup?.replace("+", "").replace("%", "") || "",
        rounding: "normal_1",
        active: editingRule.active ?? true,
      });
    } else {
      setFormData({
        priority: "",
        orderType: "b2b",
        serviceType: "all",
        organization: "",
        supplier: "",
        agencyCommission: "",
        supplierCommission: "",
        markup: "",
        rounding: "normal_1",
        active: true,
      });
    }
    setErrors({});
  }, [editingRule, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.priority || formData.priority < 1) {
      newErrors.priority = "Укажите приоритет (число >= 1)";
    }

    if (!formData.organization?.trim()) {
      newErrors.organization = "Укажите организацию";
    }

    if (!formData.supplier?.trim()) {
      newErrors.supplier = "Укажите поставщика";
    }

    const validatePercent = (value, field, label) => {
      if (value === "" || value === null || value === undefined) return;
      const num = parseFloat(value);
      if (isNaN(num) || num < 0 || num > 100) {
        newErrors[field] = `${label} должна быть от 0 до 100%`;
      }
    };

    validatePercent(formData.agencyCommission, "agencyCommission", "Комиссия агентства");
    validatePercent(formData.supplierCommission, "supplierCommission", "Комиссия поставщика");
    
    if (formData.markup !== "" && formData.markup !== null && formData.markup !== undefined) {
      const num = parseFloat(formData.markup);
      if (isNaN(num) || num < -100 || num > 1000) {
        newErrors.markup = "Маркап должен быть от -100 до 1000%";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const ruleData = {
      ...formData,
      agencyCommission: formData.agencyCommission ? `${formData.agencyCommission}%` : "0%",
      supplierCommission: formData.supplierCommission ? `${formData.supplierCommission}%` : "0%",
      markup: formData.markup ? `+${formData.markup}%` : "0%",
    };

    onSave(ruleData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingRule ? "Редактировать правило" : "Добавить правило"} width="700px">
      <div className={s.modalForm}>
        <div className={s.formGrid}>
          <div className={s.formRow}>
            <label className={s.formLabel}>
              Приоритет <span className={s.required}>*</span>
            </label>
            <Input
              type="number"
              value={formData.priority}
              onChange={(value) => handleChange("priority", value)}
              placeholder="1"
              error={errors.priority}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Тип заказа</label>
            <Select
              value={formData.orderType}
              onChange={(value) => handleChange("orderType", value)}
              options={ORDER_TYPE_OPTIONS}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Тип услуги</label>
            <Select
              value={formData.serviceType}
              onChange={(value) => handleChange("serviceType", value)}
              options={SERVICE_TYPE_OPTIONS}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>
              Организация <span className={s.required}>*</span>
            </label>
            <Input
              value={formData.organization}
              onChange={(value) => handleChange("organization", value)}
              placeholder="Например: Все корпоративные"
              error={errors.organization}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>
              Поставщик <span className={s.required}>*</span>
            </label>
            <Input
              value={formData.supplier}
              onChange={(value) => handleChange("supplier", value)}
              placeholder="Например: Любой"
              error={errors.supplier}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Комиссия агентства (%)</label>
            <Input
              type="number"
              value={formData.agencyCommission}
              onChange={(value) => handleChange("agencyCommission", value)}
              placeholder="5"
              error={errors.agencyCommission}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Комиссия поставщика (%)</label>
            <Input
              type="number"
              value={formData.supplierCommission}
              onChange={(value) => handleChange("supplierCommission", value)}
              placeholder="0"
              error={errors.supplierCommission}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Маркап (%)</label>
            <Input
              type="number"
              value={formData.markup}
              onChange={(value) => handleChange("markup", value)}
              placeholder="7"
              error={errors.markup}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Правило округления</label>
            <Select
              value={formData.rounding}
              onChange={(value) => handleChange("rounding", value)}
              options={ROUNDING_OPTIONS}
            />
          </div>

          <div className={s.formRow}>
            <Switch
              checked={formData.active}
              onChange={(value) => handleChange("active", value)}
              label="Правило активно"
              description="Неактивные правила не применяются при расчётах"
            />
          </div>
        </div>

        <div className={s.modalActions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingRule ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
