"use client";
import React, { useState } from "react";
import { Container, Input, Button } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import {
  MdEmail,
  MdSettings,
  MdCheckCircle,
  MdChatBubbleOutline,
  MdWifiOff,
  MdFolder,
  MdFlight,
  MdWarning,
  MdAccessTime,
  MdStar,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/Chat.module.scss";

export default function Chat() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Все" },
    { id: "my", label: "Мои" },
    { id: "no-connection", label: "Без связи" },
    { id: "archive", label: "Архив" },
  ];

  const chats = [
    {
      id: "ORD-145",
      clientName: "Иван Петров",
      location: "Турция, Анталья",
      message: "Нужно изменить дату вылета",
      messageIcon: MdEmail,
      time: "14:33",
      status: "Просрочено",
      statusColor: "red",
      sla: "-24ч",
      slaColor: "red",
    },
    {
      id: "ORD-144",
      clientName: "Мария Сидорова",
      location: "Италия, Рим",
      message: "КП отправлено клиенту",
      messageIcon: MdSettings,
      time: "13:07",
      status: "В работе",
      statusColor: "yellow",
    },
    {
      id: "ORD-143",
      clientName: "Алексей Козлов",
      location: "Египет, Хургада",
      message: "Подтверждение брони получено",
      messageIcon: MdCheckCircle,
      time: "12:45",
      status: "В срок",
      statusColor: "green",
    },
    {
      id: "ORD-142",
      clientName: "Елена Васильева",
      location: "Греция, Крит",
      message: "Добрый день! Хочу уточнить по туру...",
      messageIcon: MdChatBubbleOutline,
      time: "11:28",
      status: "Новое",
      statusColor: "blue",
    },
    {
      id: "ORD-141",
      clientName: "Дмитрий Смирнов",
      location: "Таиланд, Пхукет",
      message: "Нет связи",
      messageIcon: MdWifiOff,
      time: "10:15",
      status: "Нет связи",
      statusColor: "orange",
    },
    {
      id: "ORD-140",
      clientName: "Анна Кузнецова",
      location: "Испания, Барселона",
      message: "Заявка закрыта успешно",
      messageIcon: MdFolder,
      time: "09:42",
      status: "Архив",
      statusColor: "gray",
    },
    {
      id: "ORD-139",
      clientName: "Павел Морозов",
      location: "ОАЭ, Дубай",
      message: "Вопрос по трансферу из аэропорта",
      messageIcon: MdFlight,
      time: "08:55",
      status: "В срок",
      statusColor: "green",
    },
  ];

  const getStatusIcon = (statusColor) => {
    switch (statusColor) {
      case "red":
        return MdWarning;
      case "yellow":
        return MdAccessTime;
      case "green":
        return MdCheckCircle;
      case "blue":
        return MdStar;
      case "orange":
        return MdWifiOff;
      case "gray":
        return MdFolder;
      default:
        return null;
    }
  };

  return (
    <div className={s.chat}>
      {/* Header with Tabs and Search */}
      <div className={s.header}>
        <div className={s.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={s.headerRight}>
          <div className={s.datePicker}>
            <CiCalendar size={20} />
            <span>Feb 28, 2024</span>
          </div>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            onChange={() => {}}
            className={s.searchInput}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className={s.chatList}>
        {chats.map((chat) => {
          const StatusIcon = getStatusIcon(chat.statusColor);
          const MessageIcon = chat.messageIcon;

          return (
            <div key={chat.id} className={s.chatItem}>
              <div className={s.chatLeft}>
                <div className={s.chatHeader}>
                  <span className={s.orderId}>{chat.id}</span>
                  <span className={s.clientName}>{chat.clientName}</span>
                  {chat.sla && (
                    <span
                      className={`${s.slaBadge} ${s[`sla-${chat.slaColor}`]}`}
                    >
                      SLA {chat.sla}
                    </span>
                  )}
                </div>
                <div className={s.location}>{chat.location}</div>
                <div className={s.message}>
                  <MessageIcon className={s.messageIcon} size={16} />
                  <span>{chat.message}</span>
                </div>
              </div>
              <div className={s.chatRight}>
                <div className={s.time}>{chat.time}</div>
                <div
                  className={`${s.statusBadge} ${s[`status-${chat.statusColor}`]}`}
                >
                  {StatusIcon && (
                    <StatusIcon className={s.statusIcon} size={16} />
                  )}
                  <span>{chat.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

