"use client";
import React, { useState } from "react";
import { Container } from "@/ui";
import { UITable } from "@/ui";
import s from "../../../styles/tabs/PermissionsMatrix.module.scss";

export default function PermissionsMatrix() {
  const [permissions, setPermissions] = useState({
    orders: { view: true, create: true, edit: true, delete: false },
    users: { view: true, create: false, edit: false, delete: false },
    organizations: { view: true, create: true, edit: true, delete: true },
    reports: { view: true, create: false, edit: false, delete: false },
    documents: { view: true, create: true, edit: true, delete: false },
    suppliers: { view: true, create: true, edit: true, delete: false },
  });

  const handlePermissionChange = (module, permission, value) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: value,
      },
    }));
  };

  const modules = [
    { key: "orders", label: "Заказы" },
    { key: "users", label: "Пользователи" },
    { key: "organizations", label: "Организации" },
    { key: "reports", label: "Отчеты" },
    { key: "documents", label: "Документы" },
    { key: "suppliers", label: "Поставщики" },
  ];

  const permissionTypes = [
    { key: "view", label: "Просмотр" },
    { key: "create", label: "Создание" },
    { key: "edit", label: "Редактирование" },
    { key: "delete", label: "Удаление" },
  ];

  const matrixData = modules.map((module) => ({
    module: module.label,
    view: permissions[module.key].view,
    create: permissions[module.key].create,
    edit: permissions[module.key].edit,
    delete: permissions[module.key].delete,
    _moduleKey: module.key,
  }));

  const columns = [
    {
      key: "module",
      label: "Модуль",
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: "view",
      label: "Просмотр",
      render: (value, row) => (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) =>
            handlePermissionChange(row._moduleKey, "view", e.target.checked)
          }
        />
      ),
    },
    {
      key: "create",
      label: "Создание",
      render: (value, row) => (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) =>
            handlePermissionChange(row._moduleKey, "create", e.target.checked)
          }
        />
      ),
    },
    {
      key: "edit",
      label: "Редактирование",
      render: (value, row) => (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) =>
            handlePermissionChange(row._moduleKey, "edit", e.target.checked)
          }
        />
      ),
    },
    {
      key: "delete",
      label: "Удаление",
      render: (value, row) => (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) =>
            handlePermissionChange(row._moduleKey, "delete", e.target.checked)
          }
        />
      ),
    },
  ];

  return (
    <div className={s.permissionsMatrix}>
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Матрица прав доступа (RBAC)</h5>
          <p className={s.description}>
            Настройте детальные разрешения для пользователя по каждому модулю
            системы
          </p>
          <UITable columns={columns} rows={matrixData} showCheckbox={false} />
        </div>
      </Container>
    </div>
  );
}

