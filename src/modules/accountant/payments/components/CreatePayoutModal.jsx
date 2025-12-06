"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Select, Textarea, Modal } from "@/ui";
import { MdAttachFile, MdDelete } from "react-icons/md";
import s from "../styles/CreatePayoutModal.module.scss";

const PAYMENT_METHODS = [
  { value: "bank", label: "Банк" },
  { value: "cash", label: "Касса" },
  { value: "pos", label: "Эквайринг" },
];

const CURRENCIES = [
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const MOCK_SUPPLIERS = [
  { value: 1, label: "Turkish Airlines" },
  { value: 2, label: "Booking.com" },
  { value: 3, label: "Local DMC Dubai" },
];

const MOCK_SERVICES = [
  { value: "ORD-145", label: "ORD-145 - Турция, Анталья (1200 USD)" },
  { value: "ORD-144", label: "ORD-144 - Италия, Рим (800 USD)" },
  { value: "ORD-143", label: "ORD-143 - Египет, Хургада (1200 USD)" },
  { value: "ORD-142", label: "ORD-142 - Греция, Крит (1500 EUR)" },
];

export default function CreatePayoutModal({ supplier, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    supplierId: supplier?.id || "",
    services: [],
    amount: "",
    currency: supplier?.currency || "USD",
    exchangeRate: "",
    paymentMethod: "bank",
    source: "bank",
    comment: "",
    documents: [],
  });

  const [errors, setErrors] = useState({});

  const selectedServices = useMemo(() => {
    return MOCK_SERVICES.filter((service) =>
      formData.services.includes(service.value)
    );
  }, [formData.services]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const handleFileRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.supplierId) {
      newErrors.supplierId = "Выберите поставщика";
    }
    if (formData.services.length === 0) {
      newErrors.services = "Выберите хотя бы одну услугу";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Укажите корректную сумму";
    }
    if (!formData.currency) {
      newErrors.currency = "Выберите валюту";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Выберите метод оплаты";
    }
    if (!formData.source) {
      newErrors.source = "Выберите источник списания";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Здесь будет логика создания выплаты
    console.log("Creating payout:", formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      supplierId: supplier?.id || "",
      services: [],
      amount: "",
      currency: supplier?.currency || "USD",
      exchangeRate: "",
      paymentMethod: "bank",
      source: "bank",
      comment: "",
      documents: [],
    });
    setErrors({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="800px"
      title="Создать выплату"
    >
      <div className={s.modalContent}>

        <div className={s.modalBody}>
          <div className={s.formSection}>
            <h3 className={s.sectionTitle}>Основная информация</h3>
            <div className={s.formGrid}>
              <div className={s.formField}>
                <label className={s.label}>
                  Поставщик <span className={s.required}>*</span>
                </label>
                <Select
                  value={formData.supplierId}
                  onChange={(value) => handleInputChange("supplierId", value)}
                  options={MOCK_SUPPLIERS}
                  disabled={!!supplier}
                  error={errors.supplierId}
                />
              </div>

              <div className={s.formField}>
                <label className={s.label}>
                  Валюта <span className={s.required}>*</span>
                </label>
                <Select
                  value={formData.currency}
                  onChange={(value) => handleInputChange("currency", value)}
                  options={CURRENCIES}
                  error={errors.currency}
                />
              </div>

              <div className={s.formField}>
                <label className={s.label}>
                  Сумма <span className={s.required}>*</span>
                </label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(value) => handleInputChange("amount", value)}
                  placeholder="0.00"
                  error={errors.amount}
                />
              </div>

              <div className={s.formField}>
                <label className={s.label}>Курс обмена</label>
                <Input
                  type="number"
                  value={formData.exchangeRate}
                  onChange={(value) =>
                    handleInputChange("exchangeRate", value)
                  }
                  placeholder="Автоматически"
                />
              </div>
            </div>
          </div>

          <div className={s.formSection}>
            <h3 className={s.sectionTitle}>
              Услуги/Заказы <span className={s.required}>*</span>
            </h3>
            {errors.services && (
              <div className={s.errorMessage}>{errors.services}</div>
            )}
            <div className={s.servicesList}>
              {MOCK_SERVICES.map((service) => (
                <label key={service.value} className={s.serviceCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.value)}
                    onChange={() => handleServiceToggle(service.value)}
                  />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
            {selectedServices.length > 0 && (
              <div className={s.selectedServices}>
                <div className={s.selectedLabel}>Выбрано услуг: {selectedServices.length}</div>
              </div>
            )}
          </div>

          <div className={s.formSection}>
            <h3 className={s.sectionTitle}>Параметры выплаты</h3>
            <div className={s.formGrid}>
              <div className={s.formField}>
                <label className={s.label}>
                  Метод оплаты <span className={s.required}>*</span>
                </label>
                <Select
                  value={formData.paymentMethod}
                  onChange={(value) =>
                    handleInputChange("paymentMethod", value)
                  }
                  options={PAYMENT_METHODS}
                  error={errors.paymentMethod}
                />
              </div>

              <div className={s.formField}>
                <label className={s.label}>
                  Источник списания <span className={s.required}>*</span>
                </label>
                <Select
                  value={formData.source}
                  onChange={(value) => handleInputChange("source", value)}
                  options={PAYMENT_METHODS}
                  error={errors.source}
                />
              </div>
            </div>
          </div>

          <div className={s.formSection}>
            <h3 className={s.sectionTitle}>Документы</h3>
            <div className={s.documentsSection}>
              <label className={s.fileUploadLabel}>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className={s.fileInput}
                />
                <MdAttachFile size={20} />
                Прикрепить документы
              </label>
              {formData.documents.length > 0 && (
                <div className={s.documentsList}>
                  {formData.documents.map((file, index) => (
                    <div key={index} className={s.documentItem}>
                      <span className={s.documentName}>{file.name}</span>
                      <button
                        className={s.removeDocument}
                        onClick={() => handleFileRemove(index)}
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={s.formSection}>
            <h3 className={s.sectionTitle}>Комментарий</h3>
            <Textarea
              value={formData.comment}
              onChange={(value) => handleInputChange("comment", value)}
              placeholder="Дополнительная информация о выплате..."
              minRows={3}
            />
          </div>
        </div>

        <div className={s.modalFooter}>
          <Button variant="outline" onClick={handleReset}>
            Сбросить
          </Button>
          <div className={s.footerActions}>
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Создать выплату
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

