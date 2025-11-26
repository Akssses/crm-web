"use client";
import React, { useState } from "react";
import { Container, Input } from "@/ui";
import { UITable } from "@/ui";
import s from "../../../styles/tabs/AuthHistory.module.scss";

export default function AuthHistory() {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
  });

  const authData = [
    {
      id: 1,
      date: "25.10.2025, 14:30",
      status: "Успешно",
      ip: "192.168.1.1",
      device: "Chrome 118.0 (Windows)",
      location: "Бишкек, Кыргызстан",
    },
    {
      id: 2,
      date: "24.10.2025, 09:15",
      status: "Успешно",
      ip: "192.168.1.1",
      device: "Safari 17.0 (macOS)",
      location: "Бишкек, Кыргызстан",
    },
    {
      id: 3,
      date: "23.10.2025, 18:20",
      status: "Неудачно",
      ip: "192.168.1.2",
      device: "Chrome 118.0 (Windows)",
      location: "Алматы, Казахстан",
      reason: "Неверный пароль",
    },
    {
      id: 4,
      date: "22.10.2025, 12:00",
      status: "Успешно",
      ip: "192.168.1.1",
      device: "Firefox 119.0 (Linux)",
      location: "Бишкек, Кыргызстан",
    },
  ];

  const columns = [
    { key: "date", label: "Дата и время" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <span
          style={{
            color: value === "Успешно" ? "#10b981" : "#ef4444",
            fontWeight: "600",
          }}
        >
          {value}
        </span>
      ),
    },
    { key: "ip", label: "IP адрес" },
    { key: "device", label: "Устройство" },
    { key: "location", label: "Местоположение" },
    {
      key: "reason",
      label: "Причина",
      render: (value) => value || "—",
    },
  ];

  return (
    <div className={s.authHistory}>
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>История авторизаций</h5>
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
          <UITable columns={columns} rows={authData} showCheckbox={false} />
        </div>
      </Container>
    </div>
  );
}

