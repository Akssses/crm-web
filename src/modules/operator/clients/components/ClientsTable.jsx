"use client";
import React from "react";
import { Container, UITable, Button } from "@/ui";
import { MdMoreVert } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import s from "../styles/ClientsTable.module.scss";

export default function ClientsTable({ onAddClick }) {
  const clients = [
    {
      id: 1,
      name: "Анна Петрова",
      type: "Физ. лицо",
      email: "example@gmail.com",
      orders: "3",
      operator: "Айсулуу И.",
      status: "Активен",
      statusColor: "green",
    },
    {
      id: 2,
      name: 'ООО "Asia Travel"',
      type: "Юр. лицо",
      email: "example@gmail.com",
      orders: "9",
      operator: "Айтурган Ж.",
      status: "VIP",
      statusColor: "orange",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Клиент",
    },
    {
      key: "type",
      label: "Тип",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "orders",
      label: "Заказы",
    },
    {
      key: "operator",
      label: "Оператор",
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <div className={s.statusCell}>
          <span
            className={`${s.statusDot} ${s[`statusDot-${row.statusColor}`]}`}
          ></span>
          <span
            className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}
          >
            {value}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      render: () => (
        <button className={s.actionButton}>
          <MdMoreVert size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className={s.container}>
      <UITable
        columns={columns}
        rows={clients}
        showCheckbox={true}
        type="default"
      />
      <div className={s.footer}>
        <Button variant="ghost" icon={MdAdd} onClick={onAddClick}>
          Добавить клиента
        </Button>
      </div>
    </div>
  );
}
