"use client";
import React, { useState, useEffect, useMemo } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatDetails from "./ChatDetails";
import s from "../styles/ChatDetail.module.scss";
import { CHAT_ROLES, getRoleConfig } from "../constants/roleConfigs";

export default function ChatDetail({ role = CHAT_ROLES.OPERATOR }) {
  const roleConfig = getRoleConfig(role);
  const sidebar = roleConfig.sidebar || {};
  const chats = sidebar.chats || [];
  const conversation = roleConfig.conversation || {};
  const sidebarTitle = sidebar.title || "Заявки";
  const sidebarSearchPlaceholder = sidebar.searchPlaceholder || "Поиск...";
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [activeMobileView, setActiveMobileView] = useState("sidebar"); // sidebar, messages
  const [isMobile, setIsMobile] = useState(false);
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setActiveChatId(chats[0]?.id || null);
    setIsDetailsOpen(role !== CHAT_ROLES.CUSTOMER);
  }, [role, chats]);

  const activeChat = useMemo(() => {
    return chats.find((chat) => chat.id === activeChatId) || chats[0] || null;
  }, [chats, activeChatId]);

  const conversationContext = useMemo(() => {
    if (!conversation) return {};
    return {
      ...conversation.context,
      clientName: activeChat?.clientName || conversation.context?.clientName,
      orderId: activeChat?.id || conversation.context?.orderId,
      title: activeChat?.location || activeChat?.title || conversation.context?.title,
      status: activeChat?.status
        ? { label: activeChat.status, tone: activeChat.statusColor }
        : conversation.context?.status,
      sla: activeChat?.sla
        ? { label: activeChat.sla, tone: activeChat.slaColor }
        : conversation.context?.sla,
    };
  }, [conversation, activeChat]);

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    if (isMobile) {
      setActiveMobileView("messages");
    }
  };

  const handleBackToSidebar = () => {
    if (isMobile) {
      setActiveMobileView("sidebar");
    }
  };

  return (
    <div className={s.chatDetail}>
      <ChatSidebar
        className={`${s.sidebar} ${
          isMobile && activeMobileView === "sidebar" ? s.active : ""
        } ${isMobile && activeMobileView !== "sidebar" ? s.hidden : ""}`}
        onChatSelect={handleChatSelect}
        title={sidebarTitle}
        tabs={sidebar.tabs || []}
        filters={sidebar.filters || []}
        chats={chats}
        searchPlaceholder={sidebarSearchPlaceholder}
        canCreateChat={sidebar.canCreateChat}
        selectedChatId={activeChatId}
      />
      <ChatMessages
        className={`${s.messages} ${
          isMobile && activeMobileView === "messages" ? s.active : ""
        } ${isMobile && activeMobileView !== "messages" ? s.hidden : ""}`}
        isDetailsOpen={isDetailsOpen}
        onOpenDetails={() => setIsDetailsOpen(true)}
        onBack={handleBackToSidebar}
        isMobile={isMobile}
        context={conversationContext}
        messages={conversation.messages}
        messageTypes={conversation.messageTypes}
        visibleChannels={conversation.visibleChannels}
        permissions={roleConfig.permissions}
        headerActions={conversation.headerActions}
      />
      {isDetailsOpen && isMobile && (
        <div
          className={`${s.backdrop} ${isDetailsOpen ? s.active : ""}`}
          onClick={() => setIsDetailsOpen(false)}
        />
      )}
      {isDetailsOpen && (
      <ChatDetails
        className={`${s.details} ${isDetailsOpen ? s.open : ""}`}
        onClose={() => setIsDetailsOpen(false)}
          details={conversation.details || roleConfig.details}
      />
      )}
    </div>
  );
}
