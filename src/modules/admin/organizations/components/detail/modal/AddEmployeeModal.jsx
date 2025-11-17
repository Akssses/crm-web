"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Button } from "@/ui";

export default function AddEmployeeModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fio: "",
    position: "",
    email: "",
    phone: "",
    status: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      fio: "",
      position: "",
      email: "",
      phone: "",
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
      title="Добавить сотрудника"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Input
            label="ФИО"
            placeholder="Введите ФИО"
            value={formData.fio}
            onChange={(val) => handleChange("fio", val)}
          />
          <Input
            label="Должность"
            placeholder="Введите должность"
            value={formData.position}
            onChange={(val) => handleChange("position", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Контактный e-mail"
            placeholder="johndoe@mail.com"
            type="email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />
          <Input
            label="Контактный номер телефона"
            placeholder="+1 (303) 555-0105"
            type="tel"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />
        </div>

        <Select
          label="Статус"
          options={statuses}
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
          placeholder="Выберите статус"
        />

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
