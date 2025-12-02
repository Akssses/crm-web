 "use client";
import React, { useState } from "react";
import { Button, Select, Input, UITable } from "@/ui";
import s from "../../styles/SystemAdmin.module.scss";

const MOCK_AUTH_LOGS = [
  {
    id: 1,
    date: "2025-12-01 09:15",
    user: "operator@crm.local",
    status: "Успешный вход",
    ip: "192.168.0.21",
    device: "Chrome / macOS",
    geo: "Moscow, RU",
  },
  {
    id: 2,
    date: "2025-12-01 09:18",
    user: "operator@crm.local",
    status: "Неуспешный вход (неверный пароль)",
    ip: "192.168.0.21",
    device: "Chrome / macOS",
    geo: "Moscow, RU",
  },
];

const MOCK_ACTION_LOGS = [
  {
    id: 1,
    date: "2025-12-01 10:05",
    user: "supervisor@crm.local",
    action: "Изменение статуса заявки",
    object: "Заявка #1542",
    oldValue: "Новая",
    newValue: "В работе",
    ip: "192.168.0.33",
  },
  {
    id: 2,
    date: "2025-12-01 10:20",
    user: "admin@crm.local",
    action: "Удаление документа",
    object: "Документ #9821",
    oldValue: "Файл прикреплён",
    newValue: "Файл удалён",
    ip: "192.168.0.10",
  },
];

const MOCK_API_LOGS = [
  {
    id: 1,
    date: "2025-12-01 11:00",
    direction: "Входящий",
    endpoint: "POST /api/requests",
    status: "201",
    duration: "180 мс",
    error: "",
  },
  {
    id: 2,
    date: "2025-12-01 11:02",
    direction: "Исходящий",
    endpoint: "GET https://supplier-api.com/orders/123",
    status: "504",
    duration: "30 000 мс",
    error: "Timeout",
  },
];

const MOCK_ERROR_LOGS = [
  {
    id: 1,
    date: "2025-12-01 11:05",
    type: "Интеграция",
    source: "Amadeus API",
    status: "Новая",
    message: "Ошибка авторизации при запросе тарифа",
  },
  {
    id: 2,
    date: "2025-12-01 11:10",
    type: "Платёжный шлюз",
    source: "Stripe",
    status: "В работе",
    message: "Платёж отклонён банком клиента",
  },
];

export default function Logs() {
  const [tab, setTab] = useState("auth"); // auth | actions | api | errors

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2>Логирование и аудит</h2>
        <div className={s.sectionTabs}>
          <button
            className={tab === "auth" ? s.subTabActive : s.subTab}
            onClick={() => setTab("auth")}
          >
            Авторизации
          </button>
          <button
            className={tab === "actions" ? s.subTabActive : s.subTab}
            onClick={() => setTab("actions")}
          >
            Действия пользователей
          </button>
          <button
            className={tab === "api" ? s.subTabActive : s.subTab}
            onClick={() => setTab("api")}
          >
            API-логи
          </button>
          <button
            className={tab === "errors" ? s.subTabActive : s.subTab}
            onClick={() => setTab("errors")}
          >
            Журнал ошибок
          </button>
        </div>
      </div>

      <div className={s.card}>
        {tab === "auth" && (
          <>
            <h3>Лог авторизаций</h3>
            <div className={s.filtersRow}>
              <Input label="Пользователь" />
              <Input label="IP" />
              <Input label="Дата с" type="date" />
              <Input label="Дата по" type="date" />
            </div>
            <UITable
              columns={[
                { key: "date", label: "Дата/время" },
                { key: "user", label: "Пользователь" },
                { key: "status", label: "Статус" },
                { key: "ip", label: "IP" },
                { key: "device", label: "Устройство" },
                { key: "geo", label: "Геолокация" },
              ]}
              data={MOCK_AUTH_LOGS}
            />
          </>
        )}

        {tab === "actions" && (
          <>
            <h3>Лог действий пользователей</h3>
            <div className={s.filtersRow}>
              <Input label="Пользователь" />
              <Input label="Объект (ID)" />
              <Input label="Дата с" type="date" />
              <Input label="Дата по" type="date" />
            </div>
            <UITable
              columns={[
                { key: "date", label: "Дата/время" },
                { key: "user", label: "Пользователь" },
                { key: "action", label: "Действие" },
                { key: "object", label: "Объект" },
                { key: "oldValue", label: "Старое значение" },
                { key: "newValue", label: "Новое значение" },
                { key: "ip", label: "IP" },
              ]}
              data={MOCK_ACTION_LOGS}
            />
          </>
        )}

        {tab === "api" && (
          <>
            <h3>Лог API</h3>
            <div className={s.filtersRow}>
              <Input label="Эндпоинт" />
              <Select
                label="Статус"
                value=""
                onChange={() => {}}
                options={[
                  { value: "", label: "Все" },
                  { value: "2xx", label: "Успешные (2xx)" },
                  { value: "4xx", label: "Ошибки клиента (4xx)" },
                  { value: "5xx", label: "Ошибки сервера (5xx)" },
                ]}
              />
            </div>
            <UITable
              columns={[
                { key: "date", label: "Дата/время" },
                { key: "direction", label: "Тип" },
                { key: "endpoint", label: "Эндпоинт" },
                { key: "status", label: "Статус" },
                { key: "duration", label: "Время" },
                { key: "error", label: "Ошибка" },
              ]}
              data={MOCK_API_LOGS}
            />
          </>
        )}

        {tab === "errors" && (
          <>
            <h3>Журнал ошибок</h3>
            <div className={s.filtersRow}>
              <Select
                label="Статус"
                value=""
                onChange={() => {}}
                options={[
                  { value: "", label: "Все" },
                  { value: "new", label: "Новая" },
                  { value: "in_progress", label: "В работе" },
                  { value: "resolved", label: "Решена" },
                ]}
              />
            </div>
            <UITable
              columns={[
                { key: "date", label: "Дата/время" },
                { key: "type", label: "Тип" },
                { key: "source", label: "Источник" },
                { key: "status", label: "Статус" },
                { key: "message", label: "Сообщение" },
              ]}
              data={MOCK_ERROR_LOGS}
            />
          </>
        )}
      </div>
    </div>
  );
}


