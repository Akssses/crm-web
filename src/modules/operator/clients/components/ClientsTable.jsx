"use client";
import React from "react";
import { Container, UITable, Button } from "@/ui";
import { MdMoreVert, MdWarning, MdCheckCircle } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import s from "../styles/ClientsTable.module.scss";

export default function ClientsTable({ onAddClick, onRowClick }) {
  const clients = [
    {
      id: 1,
      name: "Анна Петрова",
      type: "Физ. лицо",
      email: "anna.petrova@gmail.com",
      phone: "+7 (999) 123-45-67",
      orders: 12,
      requests: 18,
      lastActivity: "2024-11-25",
      operator: "Арман Ц.",
      status: "vip",
      tags: ["VIP", "Частые поездки"],
      warnings: [],
    },
    {
      id: 2,
      name: 'ООО "Asia Travel"',
      type: "Юр. лицо",
      email: "info@asiatravel.ru",
      phone: "+7 (495) 555-00-00",
      orders: 45,
      requests: 67,
      lastActivity: "2024-11-28",
      operator: "Илия Т.",
      status: "active",
      tags: ["Корпоративный", "Индивидуальные требования"],
      warnings: [],
    },
    {
      id: 3,
      name: "Иван Сидоров",
      type: "Физ. лицо",
      email: "ivan.sidorov@mail.ru",
      phone: "+7 (999) 888-77-66",
      orders: 2,
      requests: 5,
      lastActivity: "2024-10-15",
      operator: "Арман Ц.",
      status: "blacklist",
      tags: ["Проблемный клиент"],
      warnings: [{ type: "debt", message: "Есть долг по оплатам" }],
    },
    {
      id: 4,
      name: "Мария Иванова",
      type: "Физ. лицо",
      email: "maria.ivanova@gmail.com",
      phone: "+7 (999) 111-22-33",
      orders: 0,
      requests: 3,
      lastActivity: "2024-09-10",
      operator: "Илия Т.",
      status: "inactive",
      tags: [],
      warnings: [
        { type: "duplicate", message: "Потенциальный дубликат" },
      ],
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      active: { label: "Активный", color: "green" },
      inactive: { label: "Не активный", color: "gray" },
      blacklist: { label: "Чёрный список", color: "red" },
      vip: { label: "VIP", color: "purple" },
    };
    return configs[status] || configs.active;
  };

  const columns = [
    {
      key: "name",
      label: "Клиент",
      width: "180px",
    },
    {
      key: "type",
      label: "Тип",
      width: "130px",
    },
    {
      key: "email",
      label: "Email",
      width: "250px",
    },

    {
      key: "orders",
      label: "Заказы",
      width: "80px",
      render: (value) => <span className={s.metric}>{value}</span>,
    },
    {
      key: "requests",
      label: "Заявки",
      width: "80px",
      render: (value) => <span className={s.metric}>{value}</span>,
    },
    {
      key: "lastActivity",
      label: "Активность",
      width: "120px",
      render: (value) => <span className={s.dateText}>{value}</span>,
    },
    {
      key: "status",
      label: "Статус",
      width: "140px",
      render: (value) => {
        const config = getStatusConfig(value);
        return (
          <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
            {config.label}
          </span>
        );
      },
    },
    {
      key: "tags",
      label: "Теги",
      flex: 1,
      render: (value) => (
        <div className={s.tagsCell}>
          {value && value.length > 0 ? (
            value.slice(0, 2).map((tag, idx) => (
              <span key={idx} className={s.tag}>
                {tag}
              </span>
            ))
          ) : (
            <span className={s.noTags}>—</span>
          )}
          {value && value.length > 2 && (
            <span className={s.moreTags}>+{value.length - 2}</span>
          )}
        </div>
      ),
    },

    {
      key: "actions",
      label: "Действия",
      width: "60px",
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
        onRowClick={onRowClick}
      />
    </div>
  );
}
