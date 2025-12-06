"use client";
import React, { useState } from "react";
import { Container, Input } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import {
  MdWarning,
  MdAccessTime,
  MdStar,
  MdWifiOff,
  MdFolder,
  MdCheckCircle,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import s from "../styles/Chat.module.scss";
import { CHAT_ROLES, getRoleConfig } from "../constants/roleConfigs";

const roleRoutePrefix = {
  [CHAT_ROLES.OPERATOR]: "/operator/chat",
  [CHAT_ROLES.SUPERVISOR]: "/supervisor/chat",
  [CHAT_ROLES.ADMIN]: "/admin/chat",
  [CHAT_ROLES.CUSTOMER]: "/customer/chat",
  [CHAT_ROLES.ACCOUNTANT]: "/accountant/chat",
};

export default function Chat({ role = CHAT_ROLES.OPERATOR }) {
  const router = useRouter();
  const roleConfig = getRoleConfig(role);
  const sidebar = roleConfig.sidebar || {};
  const tabs = sidebar.tabs || [];
  const filters = sidebar.filters || [];
  const chats = sidebar.chats || [];
  const meta = roleConfig.meta || {};
  const routePrefix = roleRoutePrefix[role] || roleRoutePrefix[CHAT_ROLES.OPERATOR];

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "all");
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  const handleFilterToggle = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const normalizedSearch = searchValue.toLowerCase();

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      !normalizedSearch ||
      chat.id.toLowerCase().includes(normalizedSearch) ||
      chat.clientName?.toLowerCase().includes(normalizedSearch) ||
      chat.location?.toLowerCase().includes(normalizedSearch);

    const matchesTab = (() => {
      switch (activeTab) {
        case "unread":
          return chat.unread > 0;
        case "sla":
          return chat.slaColor === "red" || chat.statusColor === "red";
        case "archive":
          return chat.status === "Архив";
        case "my":
          return chat.handler?.toLowerCase().includes("айгерим") ?? true;
        default:
          return true;
      }
    })();

    const matchesFilters =
      !activeFilters.length ||
      activeFilters.every((filterId) => {
        const normalizedFilter = filterId.toLowerCase();
        return (chat.tags || []).some((tag) => {
          const normalizedTag = tag.toLowerCase();
          return (
            normalizedTag.includes(normalizedFilter) ||
            normalizedFilter.includes(normalizedTag)
          );
        });
      });

    return matchesSearch && matchesTab && matchesFilters;
  });

  const DateIcon = meta.dateIcon || CiCalendar;

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
            <DateIcon size={20} />
            <div className={s.dateCol}>
              {meta.dateLabel && <span className={s.dateLabel}>{meta.dateLabel}</span>}
              <span>{meta.dateValue || "Сегодня"}</span>
            </div>
          </div>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            className={s.searchInput}
          />
        </div>
      </div>
      {!!filters.length && (
        <div className={s.filterRow}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${s.filterChip} ${
                activeFilters.includes(filter.id) ? s.active : ""
              }`}
              onClick={() => handleFilterToggle(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* Chat List */}
      <div className={s.chatList}>
        {filteredChats.map((chat) => {
          const StatusIcon = getStatusIcon(chat.statusColor);
          const MessageIcon = chat.messageIcon;

          return (
            <div
              key={chat.id}
              className={s.chatItem}
              onClick={() => router.push(`${routePrefix}/${chat.id}`)}
            >
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
                  {MessageIcon && <MessageIcon className={s.messageIcon} size={16} />}
                  <span>{chat.message}</span>
                </div>
              </div>
              <div className={s.chatRight}>
                <div className={s.time}>{chat.time}</div>
                <div
                  className={`${s.statusBadge} ${
                    s[`status-${chat.statusColor}`]
                  }`}
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
        {!filteredChats.length && (
          <div className={s.emptyState}>Нет заявок по текущим фильтрам</div>
        )}
      </div>
    </div>
  );
}
