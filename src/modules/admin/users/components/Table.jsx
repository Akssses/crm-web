"use client";
import { UITable } from "@/ui";
import React, { useState } from "react";

// Badge компонент
function Badge({ text, color = "blue" }) {
  const colors = {
    blue: "#3b82f6",
    red: "#ef4444",
    green: "#10b981",
    yellow: "#fbbf24",
    pink: "#ec4899",
    cyan: "#06b6d4",
  };

  return (
    <span
      style={{
        backgroundColor: `${colors[color]}20`,
        color: colors[color],
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
      }}
    >
      • {text}
    </span>
  );
}

// Avatar компонент
function Avatar({ src, name }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={src}
        alt={name}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <span style={{ fontWeight: "600", color: "#1f2937" }}>{name}</span>
    </div>
  );
}

// Таблица с пользователями
export function UsersTable() {
  const usersData = [
    {
      id: 1,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=1",
      email: "lesliealx01@mail.com",
      phone: "(702) 555-0122",
      organization: "Asia Travel",
      role: "Админ",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://i.pravatar.cc/32?img=2",
      email: "floydmiles@mail.com",
      phone: "(219) 555-0114",
      organization: "Турбай",
      role: "Оператор",
    },
    {
      id: 3,
      name: "Jerome Bell",
      avatar: "https://i.pravatar.cc/32?img=3",
      email: "jromebell@mail.com",
      phone: "(217) 555-0113",
      organization: "Best Travel",
      role: "Бухгалтер",
    },
    {
      id: 4,
      name: "Savannah Nguyen",
      avatar: "https://i.pravatar.cc/32?img=4",
      email: "nguyensav@mail.com",
      phone: "(205) 555-0100",
      organization: "Asia Travel",
      role: "Супервайзор",
    },
    {
      id: 5,
      name: "Savannah Nguyen",
      avatar: "https://i.pravatar.cc/32?img=5",
      email: "nguyensav@mail.com",
      phone: "(205) 555-0100",
      organization: "Asia Travel",
      role: "Закупщик",
    },
  ];

  const usersColumns = [
    {
      key: "name",
      label: "ФИО",
      render: (value, row) => <Avatar src={row.avatar} name={value} />,
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Номер телефона" },
    { key: "organization", label: "Организация" },
    {
      key: "role",
      label: "Роль",
      render: (value) => {
        const roleColors = {
          Админ: "blue",
          Оператор: "red",
          Бухгалтер: "cyan",
          Супервайзор: "pink",
          Закупщик: "green",
        };
        return <Badge text={value} color={roleColors[value]} />;
      },
    },
  ];

  return (
    <UITable
      title="Пользователи"
      columns={usersColumns}
      rows={usersData}
      showCheckbox={true}
      onAddClick={() => alert("Добавить пользователя")}
      addButtonText="Добавить пользователя"
      onRowAction={(row) => alert(`Action for ${row.name}`)}
    />
  );
}

// Таблица с поставщиками
export function SuppliersTable() {
  const suppliersData = [
    {
      id: 1,
      name: "Поставщик 1",
      avatar: "https://i.pravatar.cc/32?img=10",
      type: "Локальный",
      services: "Авиабилеты",
      organization: "Asia Travel",
      status: "Подключен",
    },
    {
      id: 2,
      name: "Поставщик 4",
      avatar: "https://i.pravatar.cc/32?img=11",
      type: "API",
      services: "Отели",
      organization: "Asia Travel",
      status: "Не активен",
    },
  ];

  const suppliersColumns = [
    {
      key: "name",
      label: "ФИО",
      render: (value, row) => <Avatar src={row.avatar} name={value} />,
    },
    { key: "type", label: "Тип" },
    { key: "services", label: "Услуги" },
    { key: "organization", label: "Организация" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <Badge text={value} color={value === "Подключен" ? "green" : "pink"} />
      ),
    },
  ];

  return (
    <UITable
      title="Поставщики"
      columns={suppliersColumns}
      rows={suppliersData}
      showCheckbox={true}
      onAddClick={() => alert("Добавить поставщика")}
      addButtonText="Добавить поставщика"
      onRowAction={(row) => alert(`Action for ${row.name}`)}
    />
  );
}

// Таблица с заказами
export function OrdersTable() {
  const ordersData = [
    {
      id: "ORD-123",
      client: "Иван Иванов",
      services: "Авиа+Отель",
      sales: "52 000 ₽",
      commission: "2 600 ₽",
      total: "2 600 ₽",
      note: "—",
    },
    {
      id: "ORD-125",
      client: "ООО 'Бета Тревел'",
      services: "Виза",
      sales: "18 000 ₽",
      commission: "900 ₽",
      total: "900 ₽",
      note: "—",
    },
    {
      id: "ORD-130",
      client: "Алмаз-Тур",
      services: "Трансфер",
      sales: "4 000 ₽",
      commission: "200 ₽",
      total: "200 ₽",
      note: "—",
    },
  ];

  const ordersColumns = [
    {
      key: "id",
      label: "Заказ",
      render: (value) => (
        <span style={{ color: "#3b82f6", fontWeight: "600" }}>{value}</span>
      ),
    },
    { key: "client", label: "Клиент" },
    { key: "services", label: "Услуги" },
    { key: "sales", label: "Продажи" },
    { key: "commission", label: "Комиссия" },
    {
      key: "total",
      label: "Начислено",
      render: (value) => (
        <span style={{ color: "#10b981", fontWeight: "600" }}>{value}</span>
      ),
    },
    { key: "note", label: "Примечание" },
  ];

  return (
    <UITable
      title="Детализация заказов (по данным из CRM)"
      columns={ordersColumns}
      rows={ordersData}
      showCheckbox={false}
    />
  );
}
