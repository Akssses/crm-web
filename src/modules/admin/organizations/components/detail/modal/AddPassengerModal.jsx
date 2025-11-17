"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Textarea, Button } from "@/ui";

export default function AddPassengerModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fio: "",
    birthDate: "",
    nationality: "",
    documentType: "",
    documentNumber: "",
    documentValidity: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      fio: "",
      birthDate: "",
      nationality: "",
      documentType: "",
      documentNumber: "",
      documentValidity: "",
      email: "",
      phone: "",
      comment: "",
    });
    onClose();
  };

  const documentTypes = [
    { label: "Паспорт", value: "passport" },
    { label: "Виза", value: "visa" },
    { label: "Водительское удостоверение", value: "license" },
  ];

  const nationalities = [
    { label: "Кыргызстан", value: "kg" },
    { label: "Россия", value: "ru" },
    { label: "Казахстан", value: "kz" },
    { label: "Узбекистан", value: "uz" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить пассажира"
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
            label="Дата рождения"
            placeholder="dd/mm/yyyy"
            type="date"
            value={formData.birthDate}
            onChange={(val) => handleChange("birthDate", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Select
            label="Гражданство"
            options={nationalities}
            value={formData.nationality}
            onChange={(val) => handleChange("nationality", val)}
            placeholder="Выберите страну"
          />
          <Select
            label="Тип документа"
            options={documentTypes}
            value={formData.documentType}
            onChange={(val) => handleChange("documentType", val)}
            placeholder="Выберите тип"
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Номер документа"
            placeholder="Введите номер"
            value={formData.documentNumber}
            onChange={(val) => handleChange("documentNumber", val)}
          />
          <Input
            label="Срок действия"
            placeholder="dd/mm/yyyy"
            type="date"
            value={formData.documentValidity}
            onChange={(val) => handleChange("documentValidity", val)}
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
