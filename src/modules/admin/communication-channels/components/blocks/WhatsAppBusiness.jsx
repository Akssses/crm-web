"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select } from "@/ui";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { UITable } from "@/ui";
import s from "../../styles/blocks/WhatsAppBusiness.module.scss";

export default function WhatsAppBusiness() {
  const [settings, setSettings] = useState({
    apiKey: "",
    businessNumber: "",
    webhookUrl: "",
    verifyToken: "",
    callbackUrl: "",
    platform: "Meta",
  });

  const [status, setStatus] = useState("none"); // connected, warning, disconnected, none

  const getStatusIndicator = () => {
    switch (status) {
      case "connected":
        return { icon: FaCheckCircle, color: "green", text: "Подключено" };
      case "warning":
        return {
          icon: FaExclamationTriangle,
          color: "yellow",
          text: "Внимание: требуется проверка",
        };
      case "disconnected":
        return { icon: FaTimesCircle, color: "red", text: "Не подключено" };
      default:
        return { icon: FaTimesCircle, color: "gray", text: "Нет настроек" };
    }
  };

  const statusInfo = getStatusIndicator();

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    // Автогенерация webhook URL
    if (field === "apiKey" && value) {
      const webhookUrl = `${
        window.location.origin
      }/api/webhooks/whatsapp/${Date.now()}`;
      setSettings((prev) => ({ ...prev, webhookUrl, callbackUrl: webhookUrl }));
    }
  };

  const handleTestMessage = () => {
    console.log("Отправка тестового сообщения WhatsApp");
  };

  const handleReconnect = () => {
    console.log("Переподключение API");
  };

  const handleCheckWebhook = () => {
    console.log("Проверка Webhook");
  };

  const [logs, setLogs] = useState([
    {
      id: 1,
      from: "+996 555 123 456",
      date: "25.10.2025, 14:30",
      type: "Текст",
      result: "Обработано",
    },
    {
      id: 2,
      from: "+996 700 111 222",
      date: "25.10.2025, 14:25",
      type: "Файл",
      result: "Ошибка",
    },
  ]);

  const logColumns = [
    { key: "from", label: "От кого" },
    { key: "date", label: "Дата" },
    { key: "type", label: "Тип" },
    {
      key: "result",
      label: "Результат обработки",
      render: (value) => (
        <span style={{ color: value === "Обработано" ? "#10b981" : "#ef4444" }}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <Container size="full">
      <div className={s.section}>
        <h5 className={s.sectionTitle}>WhatsApp Business API</h5>

        {/* Статусный индикатор */}
        <div className={`${s.statusIndicator} ${s[statusInfo.color]}`}>
          <statusInfo.icon size={24} />
          <span>{statusInfo.text}</span>
        </div>

        {/* Настройки подключения */}
        <div className={s.settingsGrid}>
          <Input
            label="API Key"
            placeholder="Введите API ключ"
            value={settings.apiKey}
            onChange={(val) => handleChange("apiKey", val)}
          />
          <Input
            label="Business Number"
            placeholder="+996 555 123 456"
            value={settings.businessNumber}
            onChange={(val) => handleChange("businessNumber", val)}
          />
          <Input
            label="Webhook URL"
            value={settings.webhookUrl}
            onChange={(val) => handleChange("webhookUrl", val)}
            disabled
          />
          <Input
            label="Verify Token"
            placeholder="Введите токен верификации"
            value={settings.verifyToken}
            onChange={(val) => handleChange("verifyToken", val)}
          />
          <Input
            label="Callback URL"
            value={settings.callbackUrl}
            onChange={(val) => handleChange("callbackUrl", val)}
            disabled
          />
          <Select
            label="Endpoint платформы"
            value={settings.platform}
            onChange={(val) => handleChange("platform", val)}
            options={[
              { value: "Meta", label: "Meta" },
              { value: "Gupshup", label: "Gupshup" },
              { value: "Ultramsg", label: "Ultramsg" },
            ]}
          />
        </div>

        {/* Кнопки действий */}
        <div className={s.buttons}>
          <Button
            variant="bgblue"
            icon={FaPaperPlane}
            onClick={handleTestMessage}
          >
            Отправить тестовое сообщение
          </Button>
          <Button variant="outline" onClick={handleReconnect}>
            Переподключить API
          </Button>
          <Button variant="outline" onClick={handleCheckWebhook}>
            Проверить Webhook
          </Button>
        </div>

        {/* Возможности */}
        <div className={s.capabilities}>
          <h6>Возможности:</h6>
          <ul>
            <li>Получение входящих сообщений</li>
            <li>Отправка уведомлений о статусе услуг</li>
            <li>Отправка документов</li>
            <li>Уведомления об изменениях в заказе</li>
          </ul>
        </div>

        {/* Логи сообщений */}
        <div className={s.logsSection}>
          <h6>Логи сообщений</h6>
          <UITable columns={logColumns} rows={logs} showCheckbox={false} />
        </div>
      </div>
    </Container>
  );
}
