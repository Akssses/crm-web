"use client";
import React, { useState } from "react";
import s from "../../../styles/Modal.module.scss";
import { Modal, Input, Select, Button, Switch, Checkbox } from "@/ui";

export default function AddBranchModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    manager: "",
    employees: "0",
    status: "",
    // Лимиты филиалов
    limit: "",
    limitCurrency: "KGS",
    // Сборы по филиалам
    feeType: "percentage", // "percentage" или "fixed"
    feePercentage: "",
    feeFixed: "",
    feeCurrency: "KGS",
    // Права по услугам
    serviceRights: {
      flights: false,
      hotels: false,
      transfers: false,
      visas: false,
      insurance: false,
      tours: false,
    },
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceRightChange = (service, checked) => {
    setFormData((prev) => ({
      ...prev,
      serviceRights: {
        ...prev.serviceRights,
        [service]: checked,
      },
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      name: "",
      city: "",
      phone: "",
      manager: "",
      employees: "0",
      status: "",
      limit: "",
      limitCurrency: "KGS",
      feeType: "percentage",
      feePercentage: "",
      feeFixed: "",
      feeCurrency: "KGS",
      serviceRights: {
        flights: false,
        hotels: false,
        transfers: false,
        visas: false,
        insurance: false,
        tours: false,
      },
    });
    onClose();
  };

  const statuses = [
    { label: "Активен", value: "active" },
    { label: "Неактивен", value: "inactive" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить филиал"
      position="right"
      width="40%"
    >
      <div className={s.modalContent}>
        <div className={s.twoColumns}>
          <Input
            label="Название филиала"
            placeholder="Введите название"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
          />
          <Input
            label="Город"
            placeholder="Город"
            value={formData.city}
            onChange={(val) => handleChange("city", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Телефон"
            placeholder="Введите номер телефона"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />
          <Input
            label="Руководитель"
            placeholder="Руководитель"
            value={formData.manager}
            onChange={(val) => handleChange("manager", val)}
          />
        </div>

        <div className={s.twoColumns}>
          <Input
            label="Количество сотрудников"
            placeholder="0"
            type="number"
            value={formData.employees}
            onChange={(val) => handleChange("employees", val)}
          />
          <Select
            label="Статус"
            options={statuses}
            value={formData.status}
            onChange={(val) => handleChange("status", val)}
            placeholder="Выберите статус"
          />
        </div>

        {/* Лимиты филиалов */}
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Лимиты филиалов</h5>
          <div className={s.twoColumns}>
            <Input
              label="Лимит"
              placeholder="Введите лимит"
              type="number"
              value={formData.limit}
              onChange={(val) => handleChange("limit", val)}
            />
            <Select
              label="Валюта"
              options={[
                { value: "KGS", label: "KGS" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "RUB", label: "RUB" },
              ]}
              value={formData.limitCurrency}
              onChange={(val) => handleChange("limitCurrency", val)}
            />
          </div>
        </div>

        {/* Сборы по филиалам */}
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Сборы по филиалам</h5>
          <div className={s.radioGroup}>
            <label className={s.radioLabel}>
              <input
                type="radio"
                name="feeType"
                value="percentage"
                checked={formData.feeType === "percentage"}
                onChange={(e) => handleChange("feeType", e.target.value)}
              />
              <span>Процент (%)</span>
            </label>
            <label className={s.radioLabel}>
              <input
                type="radio"
                name="feeType"
                value="fixed"
                checked={formData.feeType === "fixed"}
                onChange={(e) => handleChange("feeType", e.target.value)}
              />
              <span>Фиксированная сумма</span>
            </label>
          </div>
          <div className={s.twoColumns}>
            {formData.feeType === "percentage" ? (
              <Input
                label="Процент сбора"
                placeholder="0"
                type="number"
                value={formData.feePercentage}
                onChange={(val) => handleChange("feePercentage", val)}
              />
            ) : (
              <Input
                label="Фиксированная сумма"
                placeholder="0"
                type="number"
                value={formData.feeFixed}
                onChange={(val) => handleChange("feeFixed", val)}
              />
            )}
            <Select
              label="Валюта"
              options={[
                { value: "KGS", label: "KGS" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
                { value: "RUB", label: "RUB" },
              ]}
              value={formData.feeCurrency}
              onChange={(val) => handleChange("feeCurrency", val)}
            />
          </div>
        </div>

        {/* Права по услугам */}
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Права по услугам</h5>
          <div className={s.servicesGrid}>
            <label className={s.checkboxLabel}>
              <Checkbox
                checked={formData.serviceRights.flights}
                onChange={(checked) => handleServiceRightChange("flights", checked)}
              />
              <span>Авиабилеты</span>
            </label>
            <label className={s.checkboxLabel}>
              <Checkbox
                checked={formData.serviceRights.hotels}
                onChange={(checked) => handleServiceRightChange("hotels", checked)}
              />
              <span>Отели</span>
            </label>
            <label className={s.checkboxLabel}>
              <Checkbox
                checked={formData.serviceRights.transfers}
                onChange={(checked) => handleServiceRightChange("transfers", checked)}
              />
              <span>Трансферы</span>
            </label>
            <label className={s.checkboxLabel}>
              <Checkbox
                checked={formData.serviceRights.visas}
                onChange={(checked) => handleServiceRightChange("visas", checked)}
              />
              <span>Визы</span>
            </label>
            <label className={s.checkboxLabel}>
              <Checkbox
                checked={formData.serviceRights.insurance}
                onChange={(checked) => handleServiceRightChange("insurance", checked)}
              />
              <span>Страхование</span>
            </label>
            <label className={s.checkboxLabel}>
              <Checkbox
                checked={formData.serviceRights.tours}
                onChange={(checked) => handleServiceRightChange("tours", checked)}
              />
              <span>Туры</span>
            </label>
          </div>
        </div>

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
