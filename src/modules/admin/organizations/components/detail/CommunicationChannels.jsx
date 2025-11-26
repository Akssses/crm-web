"use client";
import React, { useState } from "react";
import { Container, Button, Input } from "@/ui";
import { FaSave, FaPaperPlane } from "react-icons/fa";
import s from "../../styles/CommunicationChannels.module.scss";

export default function CommunicationChannels() {
  const [channels, setChannels] = useState({
    telegram: {
      id: "",
      botName: "",
      webhookStatus: "disconnected",
      botConnected: false,
    },
    email: {
      documents: "",
      accounting: "",
      orders: "",
    },
    whatsapp: {
      phone: "",
      link: "",
      messageTemplate: "",
    },
  });

  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "25.10.2025 14:30",
      channel: "Telegram",
      status: "success",
      message: "Уведомление отправлено клиенту",
    },
    {
      id: 2,
      date: "25.10.2025 14:25",
      channel: "Email",
      status: "error",
      message: "Ошибка отправки: неверный адрес",
    },
    {
      id: 3,
      date: "25.10.2025 14:20",
      channel: "WhatsApp",
      status: "success",
      message: "Сообщение доставлено",
    },
  ]);

  const handleChange = (channel, field, value) => {
    setChannels((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [field]: value,
      },
    }));
  };

  const handleTestMessage = (channel) => {
    console.log(`Отправка тестового сообщения через ${channel}`);
    // Здесь будет логика отправки тестового сообщения
  };

  const handleSave = () => {
    console.log("Сохранение каналов связи:", channels);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className={s.main}>
      <Container size="full">
        <div className={s.header}>
          <h4>Каналы связи</h4>
          <Button variant="primary" icon={FaSave} onClick={handleSave}>
            Сохранить изменения
          </Button>
        </div>
      </Container>

      {/* Telegram */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Telegram</h5>
          <div className={s.grid}>
            <Input
              label="ID"
              placeholder="Введите ID бота"
              value={channels.telegram.id}
              onChange={(value) => handleChange("telegram", "id", value)}
            />
            <Input
              label="Привязанный бот"
              placeholder="Название бота"
              value={channels.telegram.botName}
              onChange={(value) => handleChange("telegram", "botName", value)}
            />
            <div className={s.statusRow}>
              <span className={s.label}>Webhook-статус бота:</span>
              <span
                className={`${s.statusBadge} ${
                  channels.telegram.webhookStatus === "connected"
                    ? s.connected
                    : s.disconnected
                }`}
              >
                {channels.telegram.webhookStatus === "connected"
                  ? "Подключен"
                  : "Не подключен"}
              </span>
            </div>
            <Button
              variant="bgblue"
              icon={FaPaperPlane}
              onClick={() => handleTestMessage("telegram")}
            >
              Отправить тестовое сообщение
            </Button>
          </div>
        </div>
      </Container>

      {/* Email */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Email</h5>
          <div className={s.grid}>
            <Input
              label="Email для отправки документов"
              type="email"
              placeholder="documents@example.com"
              value={channels.email.documents}
              onChange={(value) => handleChange("email", "documents", value)}
            />
            <Input
              label="Email бухгалтерии"
              type="email"
              placeholder="accounting@example.com"
              value={channels.email.accounting}
              onChange={(value) => handleChange("email", "accounting", value)}
            />
            <Input
              label="Email заказов"
              type="email"
              placeholder="orders@example.com"
              value={channels.email.orders}
              onChange={(value) => handleChange("email", "orders", value)}
            />
          </div>
        </div>
      </Container>

      {/* WhatsApp */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>WhatsApp</h5>
          <div className={s.grid}>
            <Input
              label="Телефон WA"
              placeholder="+996 555 123 456"
              value={channels.whatsapp.phone}
              onChange={(value) => handleChange("whatsapp", "phone", value)}
            />
            <Input
              label="Ссылка формата https://wa.me/"
              placeholder="https://wa.me/996555123456"
              value={channels.whatsapp.link}
              onChange={(value) => handleChange("whatsapp", "link", value)}
            />
            <div className={s.fullWidth}>
              <Input
                label="Шаблон сообщений"
                placeholder="Введите шаблон сообщения..."
                value={channels.whatsapp.messageTemplate}
                onChange={(value) =>
                  handleChange("whatsapp", "messageTemplate", value)
                }
              />
            </div>
            <Button
              variant="bgblue"
              icon={FaPaperPlane}
              onClick={() => handleTestMessage("whatsapp")}
            >
              Отправить тестовое сообщение
            </Button>
          </div>
        </div>
      </Container>

      {/* Логи уведомлений */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Логи уведомлений</h5>
          <div className={s.logsTable}>
            <div className={s.tableHeader}>
              <span>Дата</span>
              <span>Канал</span>
              <span>Статус</span>
              <span>Сообщение</span>
            </div>
            {logs.map((log) => (
              <div key={log.id} className={s.tableRow}>
                <span>{log.date}</span>
                <span>{log.channel}</span>
                <span
                  className={`${s.statusBadge} ${s[getStatusColor(log.status)]}`}
                >
                  {log.status === "success" ? "Успешно" : "Ошибка"}
                </span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

