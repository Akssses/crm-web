"use client";
import React, { useState } from "react";
import { Container, Input } from "@/ui";
import { UITable } from "@/ui";
import s from "../../../styles/tabs/AuditBlocks.module.scss";

export default function AuditBlocks() {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
  });

  const auditData = [
    {
      id: 1,
      date: "25.10.2025, 14:30",
      action: "Блокировка",
      reason: "Нарушение правил безопасности",
      admin: "Иван Иванов",
      status: "Активна",
      unblockDate: "—",
    },
    {
      id: 2,
      date: "20.10.2025, 10:15",
      action: "Ограничение доступа",
      reason: "Ограничение доступа к модулю отчетов",
      admin: "Петр Петров",
      status: "Снято",
      unblockDate: "22.10.2025, 15:00",
    },
    {
      id: 3,
      date: "15.10.2025, 09:00",
      action: "Блокировка",
      reason: "Подозрительная активность",
      admin: "Мария Сидорова",
      status: "Снято",
      unblockDate: "16.10.2025, 12:30",
    },
  ];

  const columns = [
    { key: "date", label: "Дата и время" },
    { key: "action", label: "Действие" },
    { key: "reason", label: "Причина" },
    { key: "admin", label: "Администратор" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <span
          style={{
            color: value === "Активна" ? "#ef4444" : "#10b981",
            fontWeight: "600",
          }}
        >
          {value}
        </span>
      ),
    },
    { key: "unblockDate", label: "Дата снятия" },
  ];

  return (
    <div className={s.auditBlocks}>
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Аудит блокировок и ограничений</h5>
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
          </div>
          <UITable columns={columns} rows={auditData} showCheckbox={false} />
        </div>
      </Container>
    </div>
  );
}

