"use client";
import React, { useState } from "react";
import { Container, Input, Select } from "@/ui";
import { UITable } from "@/ui";
import s from "../../../styles/tabs/ActivityLog.module.scss";

export default function ActivityLog() {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    action: "",
    module: "",
  });

  const activityData = [
    {
      id: 1,
      date: "25.10.2025, 14:30",
      action: "Создание заказа",
      module: "Заказы",
      details: "Создан заказ #ORD-123",
      ip: "192.168.1.1",
    },
    {
      id: 2,
      date: "25.10.2025, 13:15",
      action: "Редактирование пользователя",
      module: "Пользователи",
      details: "Изменен статус пользователя ID: 5",
      ip: "192.168.1.1",
    },
    {
      id: 3,
      date: "25.10.2025, 12:00",
      action: "Просмотр отчета",
      module: "Отчеты",
      details: "Открыт отчет по продажам за октябрь",
      ip: "192.168.1.1",
    },
    {
      id: 4,
      date: "24.10.2025, 18:45",
      action: "Удаление документа",
      module: "Документы",
      details: "Удален документ DOC-0123",
      ip: "192.168.1.1",
    },
  ];

  const columns = [
    { key: "date", label: "Дата и время" },
    { key: "action", label: "Действие" },
    { key: "module", label: "Модуль" },
    { key: "details", label: "Детали" },
    { key: "ip", label: "IP адрес" },
  ];

  return (
    <div className={s.activityLog}>
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Журнал действий</h5>
          <div className={s.filters}>
            <Input
              label="Дата от"
              type="date"
              value={filters.dateFrom}
              onChange={(val) => setFilters({ ...filters, dateFrom: val })}
            />
            <Input
              label="Дата до"
              type="date"
              value={filters.dateTo}
              onChange={(val) => setFilters({ ...filters, dateTo: val })}
            />
            <Select
              label="Действие"
              value={filters.action}
              onChange={(val) => setFilters({ ...filters, action: val })}
              options={[
                { value: "", label: "Все" },
                { value: "create", label: "Создание" },
                { value: "edit", label: "Редактирование" },
                { value: "delete", label: "Удаление" },
                { value: "view", label: "Просмотр" },
              ]}
            />
            <Select
              label="Модуль"
              value={filters.module}
              onChange={(val) => setFilters({ ...filters, module: val })}
              options={[
                { value: "", label: "Все" },
                { value: "orders", label: "Заказы" },
                { value: "users", label: "Пользователи" },
                { value: "reports", label: "Отчеты" },
                { value: "documents", label: "Документы" },
              ]}
            />
          </div>
          <UITable columns={columns} rows={activityData} showCheckbox={false} />
        </div>
      </Container>
    </div>
  );
}

