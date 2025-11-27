"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Container, Button } from "@/ui";
import { FaSave } from "react-icons/fa";
import TelegramBots from "./blocks/TelegramBots";
import EmailInbox from "./blocks/EmailInbox";
import WhatsAppBusiness from "./blocks/WhatsAppBusiness";
import WebForm from "./blocks/WebForm";
import s from "../styles/CommunicationChannels.module.scss";

export default function CommunicationChannels() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = () => {
    console.log("Сохранение настроек каналов связи");
  };

  const tabs = [
    { id: "telegram", label: "Telegram-боты", path: "/admin/communication-channels/telegram" },
    { id: "email", label: "Email", path: "/admin/communication-channels/email" },
    { id: "whatsapp", label: "WhatsApp Business", path: "/admin/communication-channels/whatsapp" },
    { id: "webform", label: "Web-форма", path: "/admin/communication-channels/webform" },
  ];

  // Определяем активную вкладку из URL
  const getActiveTab = () => {
    if (!pathname) return "telegram";
    if (pathname.includes("/telegram")) return "telegram";
    if (pathname.includes("/email")) return "email";
    if (pathname.includes("/whatsapp")) return "whatsapp";
    if (pathname.includes("/webform")) return "webform";
    return "telegram"; // По умолчанию
  };

  const activeTab = getActiveTab();

  const handleNavigate = (path) => {
    router.push(path);
  };

  const isActive = (tabId) => {
    return activeTab === tabId;
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
          <button
            key={tab.id}
            className={`${s.navItem} ${isActive(tab.id) ? s.active : ""}`}
            onClick={() => handleNavigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={s.content}>
        {renderContent()}
      </div>
    </div>
  );
}


