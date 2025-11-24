"use client";
import React, { useState } from "react";
import s from "../styles/AddUserModal.module.scss";
import { Modal, Input, Select, Button } from "@/ui";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { roles } from "../hooks/Data";

export default function AddUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fio: "",
    organization: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ fio: "", organization: "", email: "", phone: "", role: "" });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить пользователя"
      position="right"
      size="lg"
      width="40%"
      icon={FaRegUser}
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Select
            label="Тип документа"
            options={roles}
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            placeholder="Выберите тип"
          />
          <Select
            label="Организация"
            options={roles}
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            placeholder="Выберите организацию"
          />
          <Select
            label="Заказ"
            options={roles}
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            placeholder="Выберите заказ"
          />
          <Input
            label="Клиент"
            placeholder="Поиск..."
            value={formData.fio}
            onChange={(val) => handleChange("fio", val)}
          />

          <Select
            label="Валюта"
            options={roles}
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            placeholder="Введите сумму"
          />
          <Select
            label="Роль"
            options={roles}
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            placeholder="Выберите валюту"
          />
        </div>
        <div className={s.twoColumns}>
          <Button icon={HiOutlineDownload} variant="outline" size="sm">
            Добавить файл
          </Button>
        </div>
        <div className={s.actions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Создать</Button>
        </div>
      </div>
    </Modal>
  );
}
