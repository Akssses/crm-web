"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Textarea, Button } from "@/ui";
import { CiSearch } from "react-icons/ci";

export default function AddChannelModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    channelType: "",
    identifier: "",
    responsible: "",
    status: "",
    comment: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      channelType: "",
      identifier: "",
      responsible: "",
      status: "",
      comment: "",
    });
    onClose();
  };

  const channelTypes = [
    { label: "Telegram", value: "telegram" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Email", value: "email" },
    { label: "Веб-форма", value: "webform" },
    { label: "SMS", value: "sms" },
  ];

  const statuses = [
    { label: "Активен", value: "active" },
    { label: "Неактивен", value: "inactive" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить канал"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Select
            label="Выберите тип канала"
            options={channelTypes}
            value={formData.channelType}
            onChange={(val) => handleChange("channelType", val)}
            placeholder="Выбрать тип"
          />
          <Input
            label="Идентификатор"
            placeholder="Введите значение"
            value={formData.identifier}
            onChange={(val) => handleChange("identifier", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Ответственный"
            placeholder="Поиск..."
            icon={CiSearch}
            value={formData.responsible}
            onChange={(val) => handleChange("responsible", val)}
          />
          <Select
            label="Статус"
            options={statuses}
            value={formData.status}
            onChange={(val) => handleChange("status", val)}
            placeholder="Активен"
          />
        </div>

        <Textarea
          label="Примечание"
          placeholder="Descriptions..."
          value={formData.comment}
          onChange={(val) => handleChange("comment", val)}
          minRows={4}
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
