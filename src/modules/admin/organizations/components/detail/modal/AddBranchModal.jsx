"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Button } from "@/ui";

export default function AddBranchModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    manager: "",
    employees: "0",
    status: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      city: "",
      phone: "",
      manager: "",
      employees: "0",
      status: "",
    });
    onClose();
  };

  const statuses = [
    { label: "Активен", value: "active" },
    { label: "Неактивен", value: "inactive" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить филиал"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Input
            label="Название филиала"
            placeholder="Введите название"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
          <Input
            label="Город"
            placeholder="Город"
            value={formData.city}
            onChange={(val) => handleChange("city", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Телефон"
            placeholder="Введите номер телефона"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />
          <Input
            label="Руководитель"
            placeholder="Руководитель"
            value={formData.manager}
            onChange={(val) => handleChange("manager", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Количество сотрудников"
            placeholder="0"
            type="number"
            value={formData.employees}
            onChange={(val) => handleChange("employees", val)}
          />
          <Select
            label="Статус"
            options={statuses}
            value={formData.status}
            onChange={(val) => handleChange("status", val)}
            placeholder="Выберите статус"
          />
        </div>

        <div className={s.actions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Добавить</Button>
        </div>
      </div>
    </Modal>
  );
}
