"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Textarea, Button } from "@/ui";

export default function AddGroupModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    responsible: "",
    serviceType: "",
    comment: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      responsible: "",
      serviceType: "",
      comment: "",
    });
    onClose();
  };

  const serviceTypes = [
    { label: "Авиа", value: "avro" },
    { label: "Отель", value: "hotel" },
    { label: "Виза", value: "visa" },
    { label: "Трансфер", value: "transfer" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить группу"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Input
            label="Название группы"
            placeholder="Введите название"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
          <Select
            label="Ответственный"
            options={[
              { label: "Выберите ответственного", value: "" },
              { label: "Азгарим Т.", value: "azgrim" },
              { label: "Азамат А.", value: "azamat" },
              { label: "Руслан Р.", value: "ruslan" },
            ]}
            value={formData.responsible}
            onChange={(val) => handleChange("responsible", val)}
            placeholder="Выберите ответственного"
          />
        </div>

        <Select
          label="Тип услуг"
          options={serviceTypes}
          value={formData.serviceType}
          onChange={(val) => handleChange("serviceType", val)}
          placeholder="Выберите тип"
        />

        <Textarea
          label="Комментарий"
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
