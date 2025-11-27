"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Modal } from "@/ui";
import {
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { UITable } from "@/ui";
import s from "../../styles/blocks/TelegramBots.module.scss";

export default function TelegramBots() {
  const [bots, setBots] = useState([
    {
      id: 1,
      name: "ПСЦ Тур Бот",
      username: "@psctour_bot",
      status: "connected",
      lastActivity: "25.10.2025, 14:30",
      type: "client",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [newBot, setNewBot] = useState({
    token: "",
    webhookUrl: "",
    callbackUrl: "",
  });

  const [logs, setLogs] = useState([
    {
      id: 1,
      date: "25.10.2025, 14:30",
      type: "Текст",
      user: "@user123",
      status: "Успех",
    },
    {
      id: 2,
      date: "25.10.2025, 14:25",
      type: "Документ",
      user: "@user456",
      status: "Ошибка",
    },
  ]);

  const getStatusIndicator = (status) => {
    switch (status) {
      case "connected":
        return { icon: FaCheckCircle, color: "green", text: "Подключено" };
      case "error":
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

  const status = bots.length > 0 ? bots[0].status : "none";
  const statusInfo = getStatusIndicator(status);

  const handleAddBot = () => {
    // Генерируем webhook URL автоматически
    const webhookUrl = `${
      window.location.origin
    }/api/webhooks/telegram/${Date.now()}`;
    setNewBot({ ...newBot, webhookUrl, callbackUrl: webhookUrl });
    setIsAddModalOpen(true);
  };

  const handleSaveBot = () => {
    // Логика сохранения бота
    setIsAddModalOpen(false);
    setNewBot({ token: "", webhookUrl: "", callbackUrl: "" });
  };

  const handleTestMessage = () => {
    setIsTestModalOpen(true);
  };

  const handleUpdateWebhook = (botId) => {
    console.log("Обновление webhook для бота:", botId);
  };

  const handleCheckConnection = (botId) => {
    console.log("Проверка подключения бота:", botId);
  };

  const handleDeleteBot = (botId) => {
    setBots(bots.filter((bot) => bot.id !== botId));
  };

  const botColumns = [
    { key: "name", label: "Название бота", style: { minWidth: "150px" } },
    { key: "username", label: "@username", style: { minWidth: "120px" } },
    {
      key: "status",
      label: "Статус",
      style: { minWidth: "200px" },
      render: (value) => {
        const statusInfo = getStatusIndicator(value);
        const StatusIcon = statusInfo.icon;
        return (
          <div className={s.statusCell}>
            <StatusIcon color={statusInfo.color} size={16} />
            <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>
          </div>
        );
      },
    },
    {
      key: "lastActivity",
      label: "Дата последней активности",
      style: { minWidth: "180px" },
    },
    {
      key: "type",
      label: "Тип канала",
      style: { minWidth: "120px" },
      render: (value) => (value === "client" ? "Клиентский" : "Внутренний"),
    },
    {
      key: "actions",
      label: "Действия",
      style: { minWidth: "280px", flexShrink: 0 },
      render: (_, row) => (
        <div className={s.actions}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleUpdateWebhook(row.id)}
          >
            Обновить Webhook
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteBot(row.id)}
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  const logColumns = [
    { key: "date", label: "Дата" },
    { key: "type", label: "Тип сообщения" },
    { key: "user", label: "Пользователь" },
    {
      key: "status",
      label: "Статус обработки",
      render: (value) => (
        <span style={{ color: value === "Успех" ? "#10b981" : "#ef4444" }}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <Container size="full">
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h5 className={s.sectionTitle}>Telegram-боты</h5>
          <Button variant="bgblue" icon={FaPlus} onClick={handleAddBot}>
            Подключить бота
          </Button>
        </div>

        {/* Статусный индикатор */}
        <div className={`${s.statusIndicator} ${s[statusInfo.color]}`}>
          <statusInfo.icon size={24} />
          <span>{statusInfo.text}</span>
        </div>

        {/* Список ботов */}
        {bots.length > 0 && (
          <div className={s.botsList}>
            <UITable columns={botColumns} rows={bots} showCheckbox={false} />
          </div>
        )}

        {/* Логи входящих сообщений */}
        <div className={s.logsSection}>
          <div className={s.logsHeader}>
            <h6>Логи входящих сообщений</h6>
            <Button size="sm" variant="outline" onClick={handleTestMessage}>
              Тестовое сообщение
            </Button>
          </div>
          <UITable columns={logColumns} rows={logs} showCheckbox={false} />
        </div>
      </div>

      {/* Модальное окно подключения бота */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Подключение Telegram-бота"
          position="right"
          width="40%"
        >
          <div className={s.modalContent}>
            <Input
              label="Token (BotFather)"
              placeholder="Введите токен бота"
              value={newBot.token}
              onChange={(val) => setNewBot({ ...newBot, token: val })}
            />
            <Input
              label="URL Webhook-а"
              value={newBot.webhookUrl}
              onChange={(val) => setNewBot({ ...newBot, webhookUrl: val })}
              disabled
            />
            <Input
              label="Callback URL"
              value={newBot.callbackUrl}
              onChange={(val) => setNewBot({ ...newBot, callbackUrl: val })}
              disabled
            />
            <div className={s.commandsList}>
              <h6>Поддерживаемые команды бота:</h6>
              <ul>
                <li>/start - Начать работу</li>
                <li>/help - Помощь</li>
                <li>/status - Статус заказа</li>
                <li>/documents - Получить документы</li>
              </ul>
            </div>
            <div className={s.modalActions}>
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
              >
                Отмена
              </Button>
              <Button variant="primary" onClick={handleSaveBot}>
                Сохранить
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Модальное окно тестового сообщения */}
      {isTestModalOpen && (
        <Modal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          title="Тестовое сообщение"
          position="center"
          width="400px"
        >
          <div className={s.modalContent}>
            <p>Тестовое сообщение отправлено администратору</p>
            <Button variant="primary" onClick={() => setIsTestModalOpen(false)}>
              Закрыть
            </Button>
          </div>
        </Modal>
      )}
    </Container>
  );
}
