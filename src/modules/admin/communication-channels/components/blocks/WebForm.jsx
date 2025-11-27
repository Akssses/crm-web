"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Switch, Textarea } from "@/ui";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { UITable } from "@/ui";
import s from "../../styles/blocks/WebForm.module.scss";

export default function WebForm() {
  const [settings, setSettings] = useState({
    formUrl: "",
    fields: {
      name: { enabled: true, required: true },
      phone: { enabled: true, required: true },
      email: { enabled: true, required: false },
      text: { enabled: true, required: true },
      files: { enabled: true, required: false },
    },
    welcomeMessage: "",
    routing: "incoming",
    autoAssignOrg: true,
    autoDetectTopic: true,
    autoAssignOperator: true,
    callbackUrl: "",
    requestSignature: "",
    verifySource: true,
  });

  const [status, setStatus] = useState("none"); // connected, warning, disconnected, none

  const getStatusIndicator = () => {
    switch (status) {
      case "connected":
        return { icon: FaCheckCircle, color: "green", text: "Подключено" };
      case "warning":
        return { icon: FaExclamationTriangle, color: "yellow", text: "Внимание: требуется проверка" };
      case "disconnected":
        return { icon: FaTimesCircle, color: "red", text: "Не подключено" };
      default:
        return { icon: FaTimesCircle, color: "gray", text: "Нет настроек" };
    }
  };

  const statusInfo = getStatusIndicator();

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    // Автогенерация callback URL
    if (field === "formUrl" && value) {
      const callbackUrl = `${window.location.origin}/api/webhooks/webform/${Date.now()}`;
      setSettings((prev) => ({ ...prev, callbackUrl }));
    }
  };

  const handleFieldChange = (field, prop, value) => {
    setSettings((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: {
          ...prev.fields[field],
          [prop]: value,
        },
      },
    }));
  };

  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "25.10.2025, 14:30",
      type: "Успешная подача",
      details: "Заявка #12345 создана",
      status: "Успешно",
    },
    {
      id: 2,
      date: "25.10.2025, 14:25",
      type: "Ошибка",
      details: "Неверный формат данных",
      status: "Ошибка",
    },
    {
      id: 3,
      date: "25.10.2025, 14:20",
      type: "Попытка отправки",
      details: "Заявка от user@example.com",
      status: "Обработано",
    },
  ]);

  const logColumns = [
    { key: "date", label: "Дата" },
    { key: "type", label: "Тип" },
    { key: "details", label: "Детали" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <span style={{ color: value === "Успешно" || value === "Обработано" ? "#10b981" : "#ef4444" }}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <Container size="full">
      <div className={s.section}>
        <h5 className={s.sectionTitle}>Web-форма (входящие заявки)</h5>

        {/* Статусный индикатор */}
        <div className={`${s.statusIndicator} ${s[statusInfo.color]}`}>
          <statusInfo.icon size={24} />
          <span>{statusInfo.text}</span>
        </div>

        {/* URL формы */}
        <div className={s.subsection}>
          <Input
            label="URL формы"
            placeholder="https://example.com/form"
            value={settings.formUrl}
            onChange={(val) => handleChange("formUrl", val)}
          />
        </div>

        {/* Настройки полей */}
        <div className={s.subsection}>
          <h6>Поля формы</h6>
          <div className={s.fieldsList}>
            {Object.entries(settings.fields).map(([field, config]) => (
              <div key={field} className={s.fieldItem}>
                <div className={s.fieldHeader}>
                  <span className={s.fieldName}>
                    {field === "name" && "ФИО"}
                    {field === "phone" && "Телефон"}
                    {field === "email" && "Email"}
                    {field === "text" && "Текст заявки"}
                    {field === "files" && "Файлы"}
                  </span>
                  <div className={s.fieldControls}>
                    <Switch
                      label="Включено"
                      checked={config.enabled}
                      onChange={(checked) => handleFieldChange(field, "enabled", checked)}
                    />
                    <Switch
                      label="Обязательное"
                      checked={config.required}
                      onChange={(checked) => handleFieldChange(field, "required", checked)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Приветственное сообщение */}
        <div className={s.subsection}>
          <h6>Настройка приветственного ответа</h6>
          <Textarea
            label="Текст ответа"
            placeholder="Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время."
            value={settings.welcomeMessage}
            onChange={(val) => handleChange("welcomeMessage", val)}
            minRows={3}
          />
        </div>

        {/* Обработка */}
        <div className={s.subsection}>
          <h6>Обработка</h6>
          <div className={s.settingsGrid}>
            <Select
              label="Куда складывать заявки"
              value={settings.routing}
              onChange={(val) => handleChange("routing", val)}
              options={[
                { value: "incoming", label: "В CRM → раздел «Входящие»" },
                { value: "requests", label: "Сразу в «Заявки»" },
              ]}
            />
          </div>
          <div className={s.switches}>
            <div className={s.switchItem}>
              <Switch
                label="Привязка организации"
                checked={settings.autoAssignOrg}
                onChange={(checked) => handleChange("autoAssignOrg", checked)}
              />
            </div>
            <div className={s.switchItem}>
              <Switch
                label="Автоопределение темы заявки"
                checked={settings.autoDetectTopic}
                onChange={(checked) => handleChange("autoDetectTopic", checked)}
              />
            </div>
            <div className={s.switchItem}>
              <Switch
                label="Автоматическое назначение оператора"
                checked={settings.autoAssignOperator}
                onChange={(checked) => handleChange("autoAssignOperator", checked)}
              />
            </div>
          </div>
        </div>

        {/* Webhook-и */}
        <div className={s.subsection}>
          <h6>Webhook-и</h6>
          <div className={s.settingsGrid}>
            <Input
              label="Callback URL"
              value={settings.callbackUrl}
              onChange={(val) => handleChange("callbackUrl", val)}
              disabled
            />
            <Input
              label="Подпись запроса"
              placeholder="Введите ключ подписи"
              value={settings.requestSignature}
              onChange={(val) => handleChange("requestSignature", val)}
            />
          </div>
          <div className={s.switchItem}>
            <Switch
              label="Проверка источника"
              checked={settings.verifySource}
              onChange={(checked) => handleChange("verifySource", checked)}
            />
          </div>
        </div>

        {/* Логи */}
        <div className={s.logsSection}>
          <h6>Логи</h6>
          <UITable columns={logColumns} rows={logs} showCheckbox={false} />
        </div>
      </div>
    </Container>
  );
}


