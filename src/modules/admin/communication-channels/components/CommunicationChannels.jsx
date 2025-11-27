"use client";
import React, { useState } from "react";
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
            className={`${s.navItem} ${activeTab === tab.id ? s.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
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


