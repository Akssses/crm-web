"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Textarea, Button } from "@/ui";

export default function AddAccountModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    currency: "",
    status: "",
    comment: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      bank: "",
      accountNumber: "",
      currency: "",
      status: "",
      comment: "",
    });
    onClose();
  };

  const currencies = [
    { label: "KGS", value: "kgs" },
    { label: "USD", value: "usd" },
    { label: "EUR", value: "eur" },
  ];

  const statuses = [
    { label: "Активен", value: "active" },
    { label: "Неактивен", value: "inactive" },
    { label: "Заблокирован", value: "blocked" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить счёт"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Input
            label="Банк"
            placeholder="Введите банк"
            value={formData.bank}
            onChange={(val) => handleChange("bank", val)}
          />
          <Input
            label="Расчётный счёт"
            placeholder="Расчётный счёт"
            value={formData.accountNumber}
            onChange={(val) => handleChange("accountNumber", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Select
            label="Валюта"
            options={currencies}
            value={formData.currency}
            onChange={(val) => handleChange("currency", val)}
            placeholder="Выберите валюту"
          />
          <Select
            label="Статус"
            options={statuses}
            value={formData.status}
            onChange={(val) => handleChange("status", val)}
            placeholder="Выберите статус"
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
