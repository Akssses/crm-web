"use client";
import React from "react";
import { UITable } from "@/ui";
import s from "../../styles/SystemAdmin.module.scss";

const ROLES = ["Администратор системы", "Суперадмин", "Супервизор", "Оператор"];

const PERMISSIONS = [
  { key: "clients", label: "Клиенты" },
  { key: "requests", label: "Заявки" },
  { key: "orders", label: "Заказы" },
  { key: "services", label: "Услуги" },
  { key: "finance", label: "Финансы" },
  { key: "documents", label: "Документы" },
  { key: "reports", label: "Отчёты" },
  { key: "integrations", label: "Интеграции" },
  { key: "settings", label: "Настройки" },
  { key: "apiLogs", label: "API-логи" },
  { key: "config", label: "Конфигурация" },
];

export default function RBAC() {
  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <h2>Роли и разграничение прав (RBAC)</h2>
      </div>
      <p className={s.muted}>
        Здесь будет настраиваться матрица прав по ролям и сущностям. Сейчас отображается демонстрационная
        таблица без сохранения.
      </p>

      <div className={s.rbacMatrix}>
        <table className={s.rbacTable}>
          <thead>
            <tr>
              <th>Сущность</th>
              {ROLES.map((role) => (
                <th key={role}>{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((perm) => (
              <tr key={perm.key}>
                <td>{perm.label}</td>
                {ROLES.map((role) => (
                  <td key={role}>
                    <input type="checkbox" defaultChecked={role === "Администратор системы"} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={s.card}>
        <h3>Журнал изменения ролей</h3>
        <UITable
          columns={[
            { key: "date", label: "Дата" },
            { key: "user", label: "Пользователь" },
            { key: "ip", label: "IP" },
            { key: "changes", label: "Изменения" },
          ]}
          data={[
            {
              id: 1,
              date: "2025-11-30 10:15",
              user: "admin@crm.local",
              ip: "192.168.0.10",
              changes: "Роль «Оператор» — добавлено право просмотра отчётов",
            },
          ]}
        />
      </div>
    </div>
  );
}


