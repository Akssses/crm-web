"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Switch } from "@/ui";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { UITable } from "@/ui";
import s from "../../styles/blocks/EmailInbox.module.scss";

export default function EmailInbox() {
  const [settings, setSettings] = useState({
    email: "",
    smtpHost: "",
    smtpPort: "",
    smtpLogin: "",
    smtpPassword: "",
    imapHost: "",
    imapPort: "",
    imapLogin: "",
    imapPassword: "",
    security: "SSL",
    mode: "incoming",
    routing: "requests",
    autoAttachOrg: true,
    autoExtractAttachments: true,
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
  };

  const handleTestSMTP = () => {
    console.log("Проверка SMTP подключения");
  };

  const handleTestIMAP = () => {
    console.log("Проверка IMAP подключения");
  };

  const handleTestEmail = () => {
    console.log("Получение тестового письма");
  };

  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "25.10.2025, 14:30",
      type: "Авторизация",
      status: "Успешно",
      details: "SMTP подключение установлено",
    },
    {
      id: 2,
      date: "25.10.2025, 14:25",
      type: "Входящее письмо",
      status: "Обработано",
      details: "Письмо от client@example.com",
    },
    {
      id: 3,
      date: "25.10.2025, 14:20",
      type: "Ошибка",
      status: "Ошибка",
      details: "Не удалось разобрать вложение",
    },
  ]);

  const logColumns = [
    { key: "date", label: "Дата" },
    { key: "type", label: "Тип" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <span
          style={{
            color:
              value === "Успешно" || value === "Обработано"
                ? "#10b981"
                : "#ef4444",
          }}
        >
          {value}
        </span>
      ),
    },
    { key: "details", label: "Детали" },
  ];

  return (
    <Container size="full">
      <div className={s.section}>
        <h5 className={s.sectionTitle}>Email-инбокс (входящая почта)</h5>

        {/* Статусный индикатор */}
        <div className={`${s.statusIndicator} ${s[statusInfo.color]}`}>
          <statusInfo.icon size={24} />
          <span>{statusInfo.text}</span>
        </div>

        {/* Основные настройки */}
        <div className={s.settingsGrid}>
          <Input
            label="Email-адрес (корпоративный)"
            type="email"
            placeholder="mail@example.com"
            value={settings.email}
            onChange={(val) => handleChange("email", val)}
          />
        </div>

        {/* SMTP настройки */}
        <div className={s.subsection}>
          <h6>SMTP настройки</h6>
          <div className={s.settingsGrid}>
            <Input
              label="SMTP host"
              placeholder="smtp.example.com"
              value={settings.smtpHost}
              onChange={(val) => handleChange("smtpHost", val)}
            />
            <Input
              label="SMTP port"
              type="number"
              placeholder="587"
              value={settings.smtpPort}
              onChange={(val) => handleChange("smtpPort", val)}
            />
            <Input
              label="SMTP логин"
              placeholder="mail@example.com"
              value={settings.smtpLogin}
              onChange={(val) => handleChange("smtpLogin", val)}
            />
            <Input
              label="SMTP пароль"
              type="password"
              placeholder="••••••••"
              value={settings.smtpPassword}
              onChange={(val) => handleChange("smtpPassword", val)}
            />
          </div>
          <div className={s.buttons}>
            <Button variant="outline" onClick={handleTestSMTP}>
              Проверить подключение SMTP
            </Button>
          </div>
        </div>

        {/* IMAP настройки */}
        <div className={s.subsection}>
          <h6>IMAP настройки</h6>
          <div className={s.settingsGrid}>
            <Input
              label="IMAP host"
              placeholder="imap.example.com"
              value={settings.imapHost}
              onChange={(val) => handleChange("imapHost", val)}
            />
            <Input
              label="IMAP port"
              type="number"
              placeholder="993"
              value={settings.imapPort}
              onChange={(val) => handleChange("imapPort", val)}
            />
            <Input
              label="IMAP логин"
              placeholder="mail@example.com"
              value={settings.imapLogin}
              onChange={(val) => handleChange("imapLogin", val)}
            />
            <Input
              label="IMAP пароль"
              type="password"
              placeholder="••••••••"
              value={settings.imapPassword}
              onChange={(val) => handleChange("imapPassword", val)}
            />
          </div>
          <div className={s.buttons}>
            <Button variant="outline" onClick={handleTestIMAP}>
              Проверить подключение IMAP
            </Button>
          </div>
        </div>

        {/* Защита */}
        <div className={s.subsection}>
          <h6>Защита</h6>
          <Select
            label="Тип защиты"
            value={settings.security}
            onChange={(val) => handleChange("security", val)}
            options={[
              { value: "SSL", label: "SSL" },
              { value: "TLS", label: "TLS" },
            ]}
          />
        </div>

        {/* Режим работы */}
        <div className={s.subsection}>
          <h6>Режим работы</h6>
          <Select
            label="Режим"
            value={settings.mode}
            onChange={(val) => handleChange("mode", val)}
            options={[
              { value: "incoming", label: "Только входящие" },
              { value: "both", label: "Входящие + Исходящие" },
            ]}
          />
        </div>

        {/* Настройки рутинга */}
        <div className={s.subsection}>
          <h6>Настройки рутинга</h6>
          <div className={s.settingsGrid}>
            <Select
              label="Куда складывать входящие письма"
              value={settings.routing}
              onChange={(val) => handleChange("routing", val)}
              options={[
                { value: "requests", label: "В заявки" },
                { value: "orders", label: "В заказы" },
                { value: "inbox", label: "В отдельный inbox" },
              ]}
            />
          </div>
          <div className={s.switches}>
            <div className={s.switchItem}>
              <Switch
                label="Автоматическая привязка к организации по домену"
                checked={settings.autoAttachOrg}
                onChange={(checked) => handleChange("autoAttachOrg", checked)}
              />
            </div>
            <div className={s.switchItem}>
              <Switch
                label="Автоматическое извлечение вложений"
                checked={settings.autoExtractAttachments}
                onChange={(checked) =>
                  handleChange("autoExtractAttachments", checked)
                }
              />
            </div>
          </div>
          <div className={s.buttons}>
            <Button variant="outline" onClick={handleTestEmail}>
              Получить тестовое письмо
            </Button>
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
