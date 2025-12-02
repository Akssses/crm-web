"use client";
import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Switch, Button } from "@/ui";
import s from "../styles/Finance.module.scss";

const CATEGORY_OPTIONS = [
  { value: "income", label: "Доход" },
  { value: "expense", label: "Расход" },
];

export default function TransactionTypeModal({ isOpen, onClose, onSave, editingType }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "income",
    description: "",
    active: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingType) {
      setFormData({
        name: editingType.name || "",
        code: editingType.code || "",
        category: editingType.category === "Доход" ? "income" : "expense",
        description: editingType.description || "",
        active: editingType.active ?? true,
      });
    } else {
      setFormData({
        name: "",
        code: "",
        category: "income",
        description: "",
        active: true,
      });
    }
    setErrors({});
  }, [editingType, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Укажите название типа операции";
    }

    if (!formData.code?.trim()) {
      newErrors.code = "Укажите код типа операции";
    } else if (!/^[A-Z_]+$/.test(formData.code)) {
      newErrors.code = "Код должен содержать только заглавные буквы и подчёркивания";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const typeData = {
      ...formData,
      category: formData.category === "income" ? "Доход" : "Расход",
    };

    onSave(typeData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingType ? "Редактировать тип операции" : "Добавить тип операции"}
      width="600px"
    >
      <div className={s.modalForm}>
        <div className={s.formGrid}>
          <div className={s.formRow}>
            <label className={s.formLabel}>
              Название <span className={s.required}>*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Например: Оплата от клиента"
              error={errors.name}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>
              Код <span className={s.required}>*</span>
            </label>
            <Input
              value={formData.code}
              onChange={(value) => handleChange("code", value.toUpperCase())}
              placeholder="Например: CLIENT_PAYMENT"
              error={errors.code}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Категория</label>
            <Select
              value={formData.category}
              onChange={(value) => handleChange("category", value)}
              options={CATEGORY_OPTIONS}
            />
          </div>

          <div className={s.formRow}>
            <label className={s.formLabel}>Описание</label>
            <Input
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Краткое описание типа операции"
            />
          </div>

          <div className={s.formRow}>
            <Switch
              checked={formData.active}
              onChange={(value) => handleChange("active", value)}
              label="Тип активен"
              description="Неактивные типы не доступны для выбора при создании операций"
            />
          </div>
        </div>

        <div className={s.modalActions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingType ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
