"use client";
import React, { useState } from "react";
import { Button, Input } from "@/ui";
import {
  MdAdd,
  MdCheckCircle,
  MdWarning,
  MdEmail,
  MdSettings,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/ChatSidebar.module.scss";

export default function ChatSidebar({ className }) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Все" },
    { id: "unread", label: "Непрочитанные" },
    { id: "sla", label: "SLA", badge: 3 },
  ];

  const chats = [
    {
      id: "ORD-145",
      clientName: "Иван Петров",
      lastMessage: "Последнее: Нужно изменить дату вылета на 15",
      time: "14:33",
      status: "В работе",
      statusColor: "yellow",
      sla: "+2ч",
      slaColor: "red",
      unread: 2,
    },
    {
      id: "ORD-144",
      clientName: "Мария Сидорова",
      lastMessage: "Последнее: КП отправлено клиенту",
      time: "13:20",
      status: "КП отправлено",
      statusColor: "blue",
      sla: "В срок",
      slaColor: "green",
      unread: 0,
    },
    {
      id: "ORD-143",
      clientName: "Алексей Козлов",
      lastMessage: "Последнее: Подтверждение брони получено",
      time: "12:45",
      status: "Подтверждён",
      statusColor: "green",
      sla: "В срок",
      slaColor: "green",
      unread: 1,
    },
  ];

  return (
    <div className={`${s.sidebar} ${className || ""}`}>
      <div className={s.header}>
        <div className={s.headerTitle}>
          <h2 className={s.title}>Заявки</h2>
          <button className={s.addButton}>
            <MdAdd size={20} />
          </button>
        </div>
        <Input
          icon={IoSearchOutline}
          placeholder="Поиск по номеру, клиенту..."
          onChange={() => {}}
          className={s.search}
        />
      </div>

      <div className={s.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.badge && <span className={s.badge}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className={s.chatList}>
        {chats.map((chat) => (
          <div key={chat.id} className={s.chatItem}>
            <div className={s.chatHeader}>
              <div className={s.chatTitle}>
                <span className={s.orderId}>{chat.id}</span>
                <span className={s.clientName}>{chat.clientName}</span>
              </div>
              <div className={s.badges}>
                <span
                  className={`${s.statusBadge} ${
                    s[`status-${chat.statusColor}`]
                  }`}
                >
                  {chat.status}
                </span>
                <span className={`${s.slaBadge} ${s[`sla-${chat.slaColor}`]}`}>
                  {chat.sla}
                </span>
              </div>
            </div>
            <div className={s.chatFooter}>
              <span className={s.lastMessage}>{chat.lastMessage}</span>
              <div className={s.timeWrapper}>
                {chat.unread > 0 && (
                  <span className={s.unreadBadge}>{chat.unread}</span>
                )}
                <span className={s.time}>{chat.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
