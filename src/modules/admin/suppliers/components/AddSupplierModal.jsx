"use client";
import React, { useState } from "react";
import s from "../styles/Addsuppliermodal.module.scss";
import { Modal, Input, Select, Button, Tabs } from "@/ui";
import { FaRegUser } from "react-icons/fa";
import {
  tabs,
  supplierTypes,
  currencies,
  serviceTypes,
  channels,
  priorities,
} from "../hooks/Data";

export default function AddSupplierModal({ isOpen, onClose, onSubmit }) {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    // Общие данные
    name: "",
    supplierType: "",
    accountingCurrency: "",
    commission: "",
    serviceType: "",
    serviceAccountingCurrency: "",
    serviceCommissionPercent: "",

    // Контакты
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    communicationChannel: "",
    chatId: "",

    // Интеграция / API
    apiEndpoint: "",
    apiKey: "",
    apiSecret: "",

    // SLA
    responseTime: "",
    uptime: "",
    notificationChannel: "",
    supplierPriority: "",
    commissionAccountType: "",
    paymentTerms: "",

    // Аналитика
    averageResponseSpeed: "",
    confirmationPercent: "",
    cancellationPercent: "",
    averageCheck: "",
    markup: "",
    lastSynchronization: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      supplierType: "",
      accountingCurrency: "",
      commission: "",
      serviceType: "",
      serviceAccountingCurrency: "",
      serviceCommissionPercent: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      communicationChannel: "",
      chatId: "",
      apiEndpoint: "",
      apiKey: "",
      apiSecret: "",
      responseTime: "",
      uptime: "",
      notificationChannel: "",
      supplierPriority: "",
      commissionAccountType: "",
      paymentTerms: "",
      averageResponseSpeed: "",
      confirmationPercent: "",
      cancellationPercent: "",
      averageCheck: "",
      markup: "",
      lastSynchronization: "",
    });
    setActiveTab("general");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Новый поставщик"
      position="right"
      width="40%"
      icon={FaRegUser}
    >
      <div className={s.modalContent}>
        <div className={s.tabs}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={`${activeTab === tab.id ? "bgblue" : "outline"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className={s.tabContent}>
          {/* ОБЩИЕ ДАННЫЕ */}
          {activeTab === "general" && (
            <>
              <div className={s.twoColumns}>
                <Input
                  label="Название поставщика"
                  placeholder="Введите поставщика"
                  value={formData.name}
                  onChange={(val) => handleChange("name", val)}
                />
                <Select
                  label="Тип поставщика"
                  options={supplierTypes}
                  value={formData.supplierType}
                  onChange={(val) => handleChange("supplierType", val)}
                  placeholder="Выберите тип"
                />
              </div>

              <div className={s.twoColumns}>
                <Select
                  label="Валюта расчета"
                  options={currencies}
                  value={formData.accountingCurrency}
                  onChange={(val) => handleChange("accountingCurrency", val)}
                  placeholder="Выберите валюту"
                />
                <Input
                  label="Комиссия (%)"
                  placeholder="Введите значение"
                  value={formData.commission}
                  onChange={(val) => handleChange("commission", val)}
                />
              </div>

              <div className={s.twoColumns}>
                <Select
                  label="Типы услуг"
                  options={serviceTypes}
                  value={formData.serviceType}
                  onChange={(val) => handleChange("serviceType", val)}
                  placeholder="Выберите тип"
                />
                <Select
                  label="Организация"
                  options={serviceTypes}
                  value={formData.serviceType}
                  onChange={(val) => handleChange("serviceType", val)}
                  placeholder="Выберите тип"
                />
              </div>

              <div className={s.twoColumns}>
                <Select
                  label="Валюта расчета"
                  options={currencies}
                  value={formData.serviceAccountingCurrency}
                  onChange={(val) =>
                    handleChange("serviceAccountingCurrency", val)
                  }
                  placeholder="Выберите валюту"
                />
                <Input
                  label="Комиссия (%)"
                  placeholder="%"
                  value={formData.serviceCommissionPercent}
                  onChange={(val) =>
                    handleChange("serviceCommissionPercent", val)
                  }
                />
              </div>
            </>
          )}

          {/* КОНТАКТЫ */}
          {activeTab === "contacts" && (
            <>
              <div className={s.twoColumns}>
                <Input
                  label="Контактное лицо"
                  placeholder="ФИО"
                  value={formData.contactPerson}
                  onChange={(val) => handleChange("contactPerson", val)}
                />
                <Input
                  label="Email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(val) => handleChange("email", val)}
                />
              </div>

              <div className={s.twoColumns}>
                <Input
                  label="Телефон"
                  placeholder="Введите телефон"
                  type="tel"
                  value={formData.phone}
                  onChange={(val) => handleChange("phone", val)}
                />
                <Input
                  label="Адрес"
                  placeholder="Введите адрес"
                  value={formData.address}
                  onChange={(val) => handleChange("address", val)}
                />
              </div>

              <div className={s.twoColumns}>
                <Select
                  label="Канал связи"
                  options={channels}
                  value={formData.communicationChannel}
                  onChange={(val) => handleChange("communicationChannel", val)}
                  placeholder="Выберите канал"
                />
                <Input
                  label="Чат ID / Email"
                  placeholder="@User_name"
                  value={formData.chatId}
                  onChange={(val) => handleChange("chatId", val)}
                />
              </div>
            </>
          )}

          {/* ИНТЕГРАЦИЯ / API */}
          {activeTab === "integration" && (
            <>
              <div className={s.twoColumns}>
                <Input
                  label="API Endpoint"
                  placeholder="Введите значение"
                  value={formData.apiEndpoint}
                  onChange={(val) => handleChange("apiEndpoint", val)}
                />
                <Input
                  label="API Key"
                  placeholder="Введите значение"
                  value={formData.apiKey}
                  onChange={(val) => handleChange("apiKey", val)}
                />
              </div>

              <Input
                label="API Secret"
                placeholder="•••••••••"
                type="password"
                value={formData.apiSecret}
                onChange={(val) => handleChange("apiSecret", val)}
              />
            </>
          )}

          {/* SLA */}
          {activeTab === "sla" && (
            <>
              <div className={s.twoColumns}>
                <Input
                  label="Время ответа (мин)"
                  placeholder="Введите значение"
                  value={formData.responseTime}
                  onChange={(val) => handleChange("responseTime", val)}
                />
                <Input
                  label="Дедлайн подтверждения (часы)"
                  placeholder="Введите значение"
                  value={formData.uptime}
                  onChange={(val) => handleChange("uptime", val)}
                />
              </div>

              <div className={s.twoColumns}>
                <Select
                  label="Канал уведомления"
                  options={channels}
                  value={formData.notificationChannel}
                  onChange={(val) => handleChange("notificationChannel", val)}
                  placeholder="Выберите канал"
                />
                <Select
                  label="Приоритет поставщика"
                  options={priorities}
                  value={formData.supplierPriority}
                  onChange={(val) => handleChange("supplierPriority", val)}
                  placeholder="Выберите приоритет"
                />
              </div>

              <div className={s.twoColumns}>
                <Select
                  label="Тип комиссионного расчета"
                  options={[
                    { label: "Процент", value: "percent" },
                    { label: "Фиксированный", value: "fixed" },
                  ]}
                  value={formData.commissionAccountType}
                  onChange={(val) => handleChange("commissionAccountType", val)}
                  placeholder="Выберите тип"
                />
                <Input
                  label="Условия оплаты"
                  placeholder="Введите условия"
                  value={formData.paymentTerms}
                  onChange={(val) => handleChange("paymentTerms", val)}
                />
              </div>
            </>
          )}

          {/* АНАЛИТИКА */}
          {activeTab === "analytics" && (
            <>
              <div className={s.twoColumns}>
                <Input
                  label="Средняя скорость ответа"
                  placeholder="Введите значение"
                  value={formData.averageResponseSpeed}
                  onChange={(val) => handleChange("averageResponseSpeed", val)}
                />
                <Input
                  label="Процент подтверждений"
                  placeholder="Введите значение"
                  value={formData.confirmationPercent}
                  onChange={(val) => handleChange("confirmationPercent", val)}
                />
              </div>

              <div className={s.twoColumns}>
                <Input
                  label="Процент аннуляций"
                  placeholder="Введите значение"
                  value={formData.cancellationPercent}
                  onChange={(val) => handleChange("cancellationPercent", val)}
                />
                <Input
                  label="Средний чек"
                  placeholder="Введите значение"
                  value={formData.averageCheck}
                  onChange={(val) => handleChange("averageCheck", val)}
                />
              </div>

              <div className={s.twoColumns}>
                <Input
                  label="Маржа"
                  placeholder="Введите значение"
                  value={formData.markup}
                  onChange={(val) => handleChange("markup", val)}
                />
                <Input
                  label="Последняя синхронизация"
                  placeholder="Введите значение"
                  value={formData.lastSynchronization}
                  onChange={(val) => handleChange("lastSynchronization", val)}
                />
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className={s.actions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Далее</Button>
        </div>
      </div>
    </Modal>
  );
}
