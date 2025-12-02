"use client";
import React from "react";
import { Input, UITable } from "@/ui";
import s from "../../styles/SystemAdmin.module.scss";

const MOCK_CONFIG_LOG = [
  {
    id: 1,
    date: "2025-11-29 14:20",
    user: "admin@crm.local",
    type: "Роли",
    description: "Изменены права роли «Супервизор»",
    ip: "192.168.0.10",
  },
];

export default function ConfigJournal() {
  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2>Журнал конфигурации</h2>
      </div>

      <div className={s.filtersRow}>
        <Input label="Пользователь" />
        <Input label="Тип изменения (роли, шаблоны, финансы...)" />
        <Input label="Дата с" type="date" />
        <Input label="Дата по" type="date" />
      </div>

      <div className={s.card}>
        <UITable
          columns={[
            { key: "date", label: "Дата/время" },
            { key: "user", label: "Пользователь" },
            { key: "type", label: "Тип изменения" },
            { key: "description", label: "Описание" },
            { key: "ip", label: "IP" },
          ]}
          data={MOCK_CONFIG_LOG}
        />
      </div>
    </div>
  );
}


