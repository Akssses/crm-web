"use client";
import React, { useState } from "react";
import s from "../styles/AddTaskModal.module.scss";
import { Modal, Input, Select, Button, Textarea } from "@/ui";
import { FaRegUser } from "react-icons/fa";
import { roles } from "../hooks/Data";

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
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
      title="Новая задача"
      position="right"
      width="40%"
      size="lg"
      icon={FaRegUser}
    >
      <div className={s.modalContent}>
        <Select
          label="Выберите оператора"
          options={roles}
          value={formData.role}
          onChange={(val) => handleChange("role", val)}
          placeholder="Оператор"
        />
        <div className={s.twoColumns}>
          <Input
            label="Начало задачи"
            placeholder="dd/mm/yyyy"
            value={formData.fio}
            onChange={(val) => handleChange("fio", val)}
          />

          <Input
            label="Конец задачи"
            placeholder="dd/mm/yyyy"
            value={formData.organization}
            onChange={(val) => handleChange("organization", val)}
          />
        </div>
        <Textarea
          value={formData.phone}
          onChange={(val) => handleChange("phone", val)}
          label="Описание задачи"
          placeholder="Descriptions..."
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
