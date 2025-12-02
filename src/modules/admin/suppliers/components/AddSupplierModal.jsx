"use client";
import React, { useState } from "react";
import { Modal, Input, Select, Button, Textarea } from "@/ui";
import { MdStorefront } from "react-icons/md";
import s from "../styles/AddSupplierModal.module.scss";

const TYPE_OPTIONS = [
  { value: "airline", label: "Авиакомпания" },
  { value: "hotel", label: "Отель / агрегатор" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визовый центр" },
  { value: "insurance", label: "Страховая" },
  { value: "railway", label: "ЖД оператор" },
  { value: "api", label: "API-поставщик" },
  { value: "local", label: "Локальный партнёр" },
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
];

const SERVICE_OPTIONS = [
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отель" },
  { value: "transfer", label: "Трансфер" },
  { value: "visa", label: "Виза" },
  { value: "insurance", label: "Страховка" },
  { value: "railway", label: "ЖД" },
  { value: "other", label: "Другое" },
];

export default function AddSupplierModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    internalCode: "",
    type: "",
    shortDescription: "",
    currency: "",
    services: [],
    regions: "",
    timeZone: "GMT+3",
    contactPerson: "",
    managerEmail: "",
    techSupportEmail: "",
    phoneMain: "",
    phoneDuty: "",
    website: "",
    portalUrl: "",
    workingHours: "",
    commissionSupplier: "",
    commissionAgency: "",
    clientMarkup: "",
    paymentTerms: "",
    closingTerms: "",
    penalties: "",
    creditLimit: "",
    minPayment: "",
    apiEnabled: false,
    baseUrl: "",
    authType: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value],
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      internalCode: "",
      type: "",
      shortDescription: "",
      currency: "",
      services: [],
      regions: "",
      timeZone: "GMT+3",
      contactPerson: "",
      managerEmail: "",
      techSupportEmail: "",
      phoneMain: "",
      phoneDuty: "",
      website: "",
      portalUrl: "",
      workingHours: "",
      commissionSupplier: "",
      commissionAgency: "",
      clientMarkup: "",
      paymentTerms: "",
      closingTerms: "",
      penalties: "",
      creditLimit: "",
      minPayment: "",
      apiEnabled: false,
      baseUrl: "",
      authType: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Добавить поставщика"
      position="right"
      size="lg"
      width="45%"
      icon={MdStorefront}
    >
      <div className={s.modalContent}>
        <div className={s.section}>
          <h3 className={s.sectionTitle}>Основная информация</h3>
          <div className={s.twoColumns}>
            <Input
              label="Название поставщика"
              placeholder="Turkish Airlines"
              value={formData.name}
              onChange={(val) => handleChange("name", val)}
              required
            />
            <Input
              label="Внутренний код"
              placeholder="THY-AGENCY-01"
              value={formData.internalCode}
              onChange={(val) => handleChange("internalCode", val)}
            />
            <Select
              label="Тип поставщика"
              options={TYPE_OPTIONS}
              value={formData.type}
              onChange={(val) => handleChange("type", val)}
              placeholder="Выберите тип"
              required
            />
            <Select
              label="Валюта расчётов"
              options={CURRENCY_OPTIONS}
              value={formData.currency}
              onChange={(val) => handleChange("currency", val)}
              placeholder="Выберите валюту"
              required
            />
          </div>
          <Textarea
            label="Краткое описание"
            placeholder="Национальный авиаперевозчик..."
            value={formData.shortDescription}
            onChange={(val) => handleChange("shortDescription", val)}
            rows={3}
          />
          <div className={s.twoColumns}>
            <Input
              label="Регионы работы"
              placeholder="Европа, Ближний Восток"
              value={formData.regions}
              onChange={(val) => handleChange("regions", val)}
            />
            <Input
              label="Часовой пояс"
              placeholder="GMT+3"
              value={formData.timeZone}
              onChange={(val) => handleChange("timeZone", val)}
            />
          </div>
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>Контакты</h3>
          <div className={s.twoColumns}>
            <Input
              label="Контактное лицо"
              placeholder="Ahmet Yılmaz"
              value={formData.contactPerson}
              onChange={(val) => handleChange("contactPerson", val)}
            />
            <Input
              label="Email менеджера"
              type="email"
              placeholder="agency-support@thy.com"
              value={formData.managerEmail}
              onChange={(val) => handleChange("managerEmail", val)}
            />
            <Input
              label="Email техподдержки"
              type="email"
              placeholder="api-support@thy.com"
              value={formData.techSupportEmail}
              onChange={(val) => handleChange("techSupportEmail", val)}
            />
            <Input
              label="Телефон (общий)"
              type="tel"
              placeholder="+90 555 123 45 67"
              value={formData.phoneMain}
              onChange={(val) => handleChange("phoneMain", val)}
            />
            <Input
              label="Телефон (дежурный)"
              type="tel"
              placeholder="+90 555 987 65 43"
              value={formData.phoneDuty}
              onChange={(val) => handleChange("phoneDuty", val)}
            />
            <Input
              label="Рабочие часы"
              placeholder="Пн–Пт 09:00–19:00 (GMT+3)"
              value={formData.workingHours}
              onChange={(val) => handleChange("workingHours", val)}
            />
          </div>
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>Онлайн-сервисы</h3>
          <div className={s.twoColumns}>
            <Input
              label="Сайт"
              type="url"
              placeholder="https://www.turkishairlines.com"
              value={formData.website}
              onChange={(val) => handleChange("website", val)}
            />
            <Input
              label="Личный кабинет"
              type="url"
              placeholder="https://agency.thy.com"
              value={formData.portalUrl}
              onChange={(val) => handleChange("portalUrl", val)}
            />
          </div>
          <div className={s.servicesGroup}>
            <label className={s.servicesLabel}>Сферы услуг</label>
            <div className={s.servicesCheckboxes}>
              {SERVICE_OPTIONS.map((service) => (
                <label key={service.value} className={s.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service.value)}
                    onChange={() => handleServiceChange(service.value)}
                  />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>Финансовые условия</h3>
          <div className={s.twoColumns}>
            <Input
              label="Комиссия поставщика"
              placeholder="3% + 10 USD"
              value={formData.commissionSupplier}
              onChange={(val) => handleChange("commissionSupplier", val)}
            />
            <Input
              label="Комиссия агентства"
              placeholder="2%"
              value={formData.commissionAgency}
              onChange={(val) => handleChange("commissionAgency", val)}
            />
            <Input
              label="Наценка для клиента"
              placeholder="+5%"
              value={formData.clientMarkup}
              onChange={(val) => handleChange("clientMarkup", val)}
            />
            <Input
              label="Условия оплаты"
              placeholder="Предоплата 100% / 3 дня"
              value={formData.paymentTerms}
              onChange={(val) => handleChange("paymentTerms", val)}
            />
            <Input
              label="Сроки закрытия услуг"
              placeholder="Закрытие услуг до 3 дней после вылета"
              value={formData.closingTerms}
              onChange={(val) => handleChange("closingTerms", val)}
            />
            <Input
              label="Кредитный лимит"
              placeholder="50 000 USD"
              value={formData.creditLimit}
              onChange={(val) => handleChange("creditLimit", val)}
            />
            <Input
              label="Минимальный платёж"
              placeholder="5 000 USD"
              value={formData.minPayment}
              onChange={(val) => handleChange("minPayment", val)}
            />
          </div>
          <Textarea
            label="Штрафы и условия"
            placeholder="Изменения билета по правилам тарифа..."
            value={formData.penalties}
            onChange={(val) => handleChange("penalties", val)}
            rows={2}
          />
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>Интеграция / API</h3>
          <div className={s.twoColumns}>
            <Select
              label="Тип авторизации"
              options={[
                { value: "OAuth2", label: "OAuth2" },
                { value: "API Key", label: "API Key" },
                { value: "Basic Auth", label: "Basic Auth" },
              ]}
              value={formData.authType}
              onChange={(val) => handleChange("authType", val)}
              placeholder="Выберите тип"
            />
            <Input
              label="Базовый URL"
              type="url"
              placeholder="https://api.turkishairlines.com/v1"
              value={formData.baseUrl}
              onChange={(val) => handleChange("baseUrl", val)}
            />
          </div>
        </div>

        <div className={s.actions}>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Создать поставщика
          </Button>
        </div>
      </div>
    </Modal>
  );
}
