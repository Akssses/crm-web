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
        <div className={s.avatarSection}>
          <div className={s.avatarPlaceholder}>
            <FaRegUser size={24} />
          </div>
          <Button icon={HiOutlineDownload} variant="outline" size="sm">
            Аватарка
          </Button>
        </div>
        <div className={s.twoColumns}>
          <Input
            label="ФИО"
            placeholder="John"
            value={formData.fio}
            onChange={(val) => handleChange("fio", val)}
          />

          <Input
            label="Организация"
            placeholder="ООО Турбай"
            value={formData.organization}
            onChange={(val) => handleChange("organization", val)}
          />

          <Input
            label="Контактный e-mail"
            type="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />

          <Input
            label="Контактный номер телефона"
            type="tel"
            placeholder="+1 (303) 555-0105"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />
        </div>

        <Select
          label="Роль"
          options={roles}
          value={formData.role}
          onChange={(val) => handleChange("role", val)}
          placeholder="Оператор"
        />

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
