"use client";

import React, { useState } from "react";
import { Modal, Input, Select, Button } from "@/ui";
import s from "@/modules/admin/organizations/styles/Modal.module.scss";

const GENDER_OPTIONS = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];

const COUNTRY_OPTIONS = [
  { value: "rus", label: "Россия" },
  { value: "kgz", label: "Киргизия" },
  { value: "kaz", label: "Казахстан" },
];

const DOC_TYPE_OPTIONS = [
  { value: "passport_rf", label: "Паспорт РФ" },
  { value: "foreign_passport", label: "Загранпаспорт" },
  { value: "id", label: "ID‑карта" },
];

const LOYALTY_PROGRAMS = [
  { value: "aeroflot", label: "Aeroflot Bonus" },
  { value: "s7", label: "S7 Priority" },
  { value: "utair", label: "UTair" },
];

export default function AddEmployeeModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneCode: "+7",
    phone: "",
    gender: "",
    citizenship: "",
    birthday: "",
    docType: "",
    docNumber: "",
    docIssueDate: "",
    docExpiryDate: "",
    docIssuer: "",
  });

  const [bonusCards, setBonusCards] = useState([
    { id: 1, program: "aeroflot", number: "" },
  ]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBonusChange = (id, field, value) => {
    setBonusCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const addBonusCard = () => {
    setBonusCards((prev) => [
      ...prev,
      { id: Date.now(), program: "aeroflot", number: "" },
    ]);
  };

  const handleSubmit = () => {
    onSubmit?.({
      id: `EMP-${Date.now()}`,
      fullName: form.fullName || "Новый сотрудник",
      position: "",
      phone: `${form.phoneCode} ${form.phone}`,
      email: form.email,
      birthday: form.birthday,
      citizenship: form.citizenship?.toUpperCase?.() || "RUS",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Новый сотрудник"
      position="right"
      size="sm"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Input
            label="ФИО"
            placeholder="John Doe"
            value={form.fullName}
            onChange={(val) => handleChange("fullName", val)}
          />
          <Input
            label="Дата рождения"
            type="date"
            value={form.birthday}
            onChange={(val) => handleChange("birthday", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Контактный e-mail"
            placeholder="johndoe@mail.com"
            type="email"
            value={form.email}
            onChange={(val) => handleChange("email", val)}
          />
          <Input
            label="Контактный номер телефона"
            placeholder="+7 999 999 99 99"
            value={form.phone}
            onChange={(val) => handleChange("phone", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Select
            label="Пол"
            value={form.gender}
            onChange={(val) => handleChange("gender", val)}
            options={GENDER_OPTIONS}
            placeholder="Выберите пол"
          />
          <Select
            label="Гражданство"
            value={form.citizenship}
            onChange={(val) => handleChange("citizenship", val)}
            options={COUNTRY_OPTIONS}
            placeholder="Выберите страну"
          />
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Документ</h4>
          <div className={s.twoColumns}>
            <Select
              label="Тип документа"
              value={form.docType}
              onChange={(val) => handleChange("docType", val)}
              options={DOC_TYPE_OPTIONS}
              placeholder="Выберите тип"
            />
            <Input
              label="Номер документа"
              value={form.docNumber}
              onChange={(val) => handleChange("docNumber", val)}
            />
          </div>

          <div className={s.twoColumns}>
            <Input
              label="Дата выдачи"
              type="date"
              value={form.docIssueDate}
              onChange={(val) => handleChange("docIssueDate", val)}
            />
            <Input
              label="Дата окончания"
              type="date"
              value={form.docExpiryDate}
              onChange={(val) => handleChange("docExpiryDate", val)}
            />
          </div>

          <Input
            label="Кем выдан"
            value={form.docIssuer}
            onChange={(val) => handleChange("docIssuer", val)}
          />
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Бонусные карты</h4>
          {bonusCards.map((card) => (
            <div key={card.id} className={s.twoColumns}>
              <Select
                label="Программа лояльности"
                value={card.program}
                onChange={(val) => handleBonusChange(card.id, "program", val)}
                options={LOYALTY_PROGRAMS}
              />
              <Input
                label="Номер карты"
                value={card.number}
                onChange={(val) => handleBonusChange(card.id, "number", val)}
              />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addBonusCard}>
            Добавить бонусную карту
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
