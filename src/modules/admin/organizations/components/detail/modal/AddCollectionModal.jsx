"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Textarea, Button } from "@/ui";

export default function AddCollectionModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    serviceType: "",
    collectionType: "",
    value: "",
    rate: "",
    currency: "",
    comment: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      serviceType: "",
      collectionType: "",
      value: "",
      rate: "",
      currency: "",
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

  const collectionTypes = [
    { label: "Сумма", value: "sum" },
    { label: "Процент", value: "percent" },
    { label: "Фиксированный", value: "fixed" },
  ];

  const currencies = [
    { label: "KGS", value: "kgs" },
    { label: "USD", value: "usd" },
    { label: "EUR", value: "eur" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создание сбора"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <div>
            <Select
              label="Тип услуги"
              options={serviceTypes}
              value={formData.serviceType}
              onChange={(val) => handleChange("serviceType", val)}
              placeholder="Выберите тип"
            />
          </div>
          <div>
            <Select
              label="Тип сбора"
              options={collectionTypes}
              value={formData.collectionType}
              onChange={(val) => handleChange("collectionType", val)}
              placeholder="Выберите тип"
            />
          </div>
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Значение"
            placeholder="Введите значение"
            value={formData.value}
            onChange={(val) => handleChange("value", val)}
          />
          <Input
            label="Такса"
            placeholder="Введите таксу"
            value={formData.rate}
            onChange={(val) => handleChange("rate", val)}
          />
        </div>

        <Select
          label="Валюта"
          options={currencies}
          value={formData.currency}
          onChange={(val) => handleChange("currency", val)}
          placeholder="Выберите валюту"
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
          <Button onClick={handleSubmit}>Создать</Button>
        </div>
      </div>
    </Modal>
  );
}
