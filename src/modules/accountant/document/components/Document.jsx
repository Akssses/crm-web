"use client";
import React, { useState } from "react";
import s from "../styles/Document.module.scss";
import { UITable, Button, Input } from "@/ui";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { MdMoreVert } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import AddUserModal from "./AddUserModal";

// Badge компонент
function Badge({ text, color = "blue" }) {
  const colors = {
    green: "#10b981",
    red: "#ef4444",
    blue: "#3b82f6",
    pink: "#ec4899",
    orange: "#f97316",
  };

  return (
    <span
      style={{
        backgroundColor: `${colors[color]}20`,
        color: colors[color],
        padding: "6px 12px",
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

// ActionMenu компонент
function ActionMenu() {
  return (
    <button
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#6b7280",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 8px",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#1f2937")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
    >
      <MdMoreVert size={20} />
    </button>
  );
}

export default function Document() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTask, SetIsTask] = useState(false);

  const handleAddUser = (userData) => {
    setIsModalOpen(false);
  };

  const handleAddTask = (userData) => {
    SetIsTask(false);
  };

  const documentsData = [
    {
      id: 1,
      client: "Иван Петров",
      organization: "Asia Travel",
      documentType: "Счет",
      orderId: "#10234",
      sum: "54,000 RUB",
      status: "Оплачено",
      statusColor: "green",
    },
    {
      id: 2,
      client: "Мария Иванова",
      organization: "Asia Travel",
      documentType: "Договор",
      orderId: "#13244",
      sum: "34,450 RUB",
      status: "Подписано",
      statusColor: "pink",
    },
    {
      id: 3,
      client: "Гарри Поттер",
      organization: "Asia Travel",
      documentType: "Ваучер",
      orderId: "#43241",
      sum: "12,500 RUB",
      status: "Отправлен",
      statusColor: "orange",
    },
  ];

  // Колонки таблицы
  const columns = [
    {
      key: "client",
      label: "Клиент",
      render: (value) => (
        <span style={{ fontWeight: "600", color: "#1f2937" }}>{value}</span>
      ),
    },
    { key: "organization", label: "Организация" },
    {
      key: "documentType",
      label: "Тип документа",
      render: (value) => <span style={{ color: "#6b7280" }}>{value}</span>,
    },
    {
      key: "orderId",
      label: "ID Заказа",
      render: (value) => (
        <a
          href="#"
          style={{
            color: "#3b82f6",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          {value}
        </a>
      ),
    },
    {
      key: "sum",
      label: "Сумма",
      render: (value) => (
        <span style={{ fontWeight: "600", color: "#1f2937" }}>{value}</span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => <Badge text={value} color={row.statusColor} />,
    },
  ];

  return (
    <div className={s.documents}>
      <div className={s.header}>
        <div>
          <Button variant="outline" icon={CiFilter}>
            Filter
          </Button>
        </div>
        <div className={s.searchArea}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            value={search}
            onChange={setSearch}
            className={s.search}
          />
          <Button icon={FaPlus} onClick={() => setIsModalOpen(true)}>
            Добавить документ
          </Button>
        </div>
      </div>
      <div className={s.tableContainer}>
        <UITable columns={columns} rows={documentsData} showCheckbox={true} />
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}
