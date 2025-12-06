"use client";
import React, { useMemo, useState } from "react";
import { Input } from "@/ui";
import { MdAdd, MdOutlineBugReport } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/ChatSidebar.module.scss";

export default function ChatSidebar({
  className,
  onChatSelect,
  title = "Заявки",
  tabs = [],
  filters = [],
  chats = [],
  searchPlaceholder = "Поиск...",
  canCreateChat = false,
  selectedChatId = null,
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "all");
  const [activeFilters, setActiveFilters] = useState([]);

  const handleChatClick = (chatId) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    }
  };

  const handleFilterToggle = (filterId) => {
    setActiveFilters((prev) => {
      const exists = prev.includes(filterId);
      const next = exists ? prev.filter((id) => id !== filterId) : [...prev, filterId];
      return next;
    });
  };

  const filteredChats = useMemo(() => {
    const byTab = (chat) => {
      switch (activeTab) {
        case "unread":
          return chat.unread > 0;
        case "sla":
          return chat.slaColor === "red" || chat.statusColor === "red";
        case "errors":
          return chat.status?.includes("Ошибка") || chat.statusColor === "orange";
        case "my":
          return chat.handler?.toLowerCase().includes("айгерим") ?? true;
        case "archive":
          return chat.status === "Архив";
        default:
          return true;
      }
    };

    const byFilters = (chat) => {
      if (!activeFilters.length) return true;
      const tags = chat.tags || [];
      return activeFilters.every((filterId) => {
        const normalizedFilter = filterId.toLowerCase();
        return tags.some((tag) => {
          const normalizedTag = tag.toLowerCase();
          return (
            normalizedTag.includes(normalizedFilter) ||
            normalizedFilter.includes(normalizedTag)
          );
        });
      });
    };

    return chats.filter((chat) => byTab(chat) && byFilters(chat));
  }, [activeTab, activeFilters, chats]);

  return (
    <div className={`${s.sidebar} ${className || ""}`}>
      <div className={s.header}>
        <div className={s.headerTitle}>
          <h2 className={s.title}>{title}</h2>
          {canCreateChat && (
            <button className={s.addButton}>
              <MdAdd size={20} />
            </button>
          )}
        </div>
        <Input
          icon={IoSearchOutline}
          placeholder={searchPlaceholder}
          onChange={() => {}}
          className={s.search}
        />
      </div>

      {!!tabs.length && (
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
      )}

      {!!filters.length && (
        <div className={s.filters}>
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

      <div className={s.chatList}>
        {filteredChats.map((chat) => {
          const lastMessage = chat.lastMessage || chat.message;
          return (
            <div
              key={chat.id}
              className={`${s.chatItem} ${
                selectedChatId === chat.id ? s.chatItemActive : ""
              }`}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className={s.chatHeader}>
                <div className={s.chatTitle}>
                  <span className={s.orderId}>{chat.id}</span>
                  <span className={s.clientName}>{chat.clientName}</span>
                  {chat.location && <span className={s.location}>{chat.location}</span>}
                  {chat.handler && <span className={s.handler}>{chat.handler}</span>}
                </div>
                <div className={s.badges}>
                  <span
                    className={`${s.statusBadge} ${
                      chat.statusColor ? s[`status-${chat.statusColor}`] : ""
                    }`}
                  >
                    {chat.status}
                  </span>
                  {chat.sla && (
                    <span className={`${s.slaBadge} ${chat.slaColor ? s[`sla-${chat.slaColor}`] : ""}`}>
                      {chat.sla}
                    </span>
                  )}
                </div>
              </div>
              <div className={s.chatFooter}>
                <span className={s.lastMessage}>{lastMessage}</span>
                <div className={s.timeWrapper}>
                  {chat.unread > 0 && (
                    <span className={s.unreadBadge}>{chat.unread}</span>
                  )}
                  <span className={s.time}>{chat.time}</span>
                </div>
              </div>
              {chat.tags?.length > 0 && (
                <div className={s.tagList}>
                  {chat.tags.map((tag) => (
                    <span key={tag} className={s.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {!filteredChats.length && (
          <div className={s.emptyState}>
            <MdOutlineBugReport size={20} />
            <p>Нет чатов под выбранные фильтры</p>
          </div>
        )}
      </div>
    </div>
  );
}
