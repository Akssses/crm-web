"use client";
import React, { useState, useEffect } from "react";
import { Container, Button } from "@/ui";
import { FaSave } from "react-icons/fa";
import TelegramBots from "./blocks/TelegramBots";
import EmailInbox from "./blocks/EmailInbox";
import WhatsAppBusiness from "./blocks/WhatsAppBusiness";
import WebForm from "./blocks/WebForm";
import s from "../styles/CommunicationChannels.module.scss";

export default function CommunicationChannels() {
  const [activeTab, setActiveTab] = useState("telegram");

  const handleSave = () => {
    console.log("Сохранение настроек каналов связи");
  };

  const tabs = [
    { id: "telegram", label: "Telegram-боты" },
    { id: "email", label: "Email" },
    { id: "whatsapp", label: "WhatsApp Business" },
    { id: "webform", label: "Web-форма" },
  ];

  // Читаем hash из URL при загрузке
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && tabs.some((tab) => tab.id === hash)) {
        setActiveTab(hash);
      }
    }
  }, []);

  // Обновляем hash при изменении активной вкладки
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.hash = activeTab;
    }
  }, [activeTab]);

  // Обработчик изменения hash (для кнопок браузера назад/вперед)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && tabs.some((tab) => tab.id === hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "telegram":
        return <TelegramBots />;
      case "email":
        return <EmailInbox />;
      case "whatsapp":
        return <WhatsAppBusiness />;
      case "webform":
        return <WebForm />;
      default:
        return <TelegramBots />;
    }
  };

  return (
    <div className={s.main}>
      <Container size="full">
        <div className={s.header}>
          <h4>Каналы связи</h4>
          <Button variant="primary" icon={FaSave} onClick={handleSave}>
            Сохранить изменения
          </Button>
        </div>
      </Container>

      <div className={s.navigation}>
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={`${s.navItem} ${activeTab === tab.id ? s.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(tab.id);
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className={s.content}>
        {renderContent()}
      </div>
    </div>
  );
}


