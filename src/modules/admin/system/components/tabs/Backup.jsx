"use client";
import React, { useState } from "react";
import { Button, Select, Input, UITable } from "@/ui";
import s from "../../styles/SystemAdmin.module.scss";

const MOCK_BACKUPS = [
  {
    id: 1,
    date: "2025-12-01 03:00",
    type: "Полный бэкап БД",
    size: "2.4 GB",
    status: "Успешно",
    user: "Система (расписание)",
  },
];

export default function Backup() {
  const [mode, setMode] = useState("backups"); // backups | schedule | restore

  const columns = [
    { key: "date", label: "Дата создания" },
    { key: "type", label: "Тип" },
    { key: "size", label: "Размер" },
    { key: "status", label: "Статус" },
    { key: "user", label: "Пользователь" },
  ];

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2>Резервное копирование</h2>
        <div className={s.sectionTabs}>
          <button
            className={mode === "backups" ? s.subTabActive : s.subTab}
            onClick={() => setMode("backups")}
          >
            Бэкапы
          </button>
          <button
            className={mode === "schedule" ? s.subTabActive : s.subTab}
            onClick={() => setMode("schedule")}
          >
            Расписание
          </button>
          <button
            className={mode === "restore" ? s.subTabActive : s.subTab}
            onClick={() => setMode("restore")}
          >
            Восстановление
          </button>
        </div>
      </div>

      {mode === "backups" && (
        <div className={s.card}>
          <h3>Список бэкапов</h3>
          <div className={s.actionsRow}>
            <Button>Создать бэкап</Button>
          </div>
          <UITable columns={columns} rows={MOCK_BACKUPS} />
        </div>
      )}

      {mode === "schedule" && (
        <div className={s.card}>
          <h3>Расписание бэкапов</h3>
          <div className={s.formGrid}>
            <Select
              label="Периодичность"
              value="daily"
              onChange={() => {}}
              options={[
                { value: "daily", label: "Ежедневно" },
                { value: "weekly", label: "Еженедельно" },
                { value: "monthly", label: "Ежемесячно" },
              ]}
            />
            <Input label="Время выполнения" type="time" value="03:00" onChange={() => {}} />
            <Input label="Хранить копии (дней)" type="number" value="30" onChange={() => {}} />
            <Select
              label="Удалённое хранилище"
              value="local"
              onChange={() => {}}
              options={[
                { value: "local", label: "Локально" },
                { value: "s3", label: "S3" },
                { value: "gdrive", label: "Google Drive" },
                { value: "ftp", label: "FTP" },
              ]}
            />
          </div>
          <div className={s.actionsRow}>
            <Button>Сохранить расписание</Button>
          </div>
        </div>
      )}

      {mode === "restore" && (
        <div className={s.card}>
          <h3>Восстановление из бэкапа</h3>
          <p className={s.muted}>
            Для предотвращения случайного запуска требуется явное подтверждение. Перед восстановлением будет
            создан новый бэкап.
          </p>
          <div className={s.formGrid}>
            <Select
              label="Выберите бэкап"
              value={MOCK_BACKUPS[0].id}
              onChange={() => {}}
              options={MOCK_BACKUPS.map((b) => ({ value: b.id, label: `${b.date} — ${b.type}` }))}
            />
            <div className={s.checkboxRow}>
              <label>
                <input type="checkbox" defaultChecked /> Восстановить базу данных
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Восстановить файлы
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Восстановить конфигурацию
              </label>
            </div>
            <Input
              label='Введите "ВОССТАНОВИТЬ" для подтверждения'
              value=""
              onChange={() => {}}
              placeholder="ВОССТАНОВИТЬ"
            />
          </div>
          <div className={s.actionsRow}>
            <Button variant="danger">Запустить восстановление</Button>
          </div>
        </div>
      )}
    </div>
  );
}


