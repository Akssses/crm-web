"use client";
import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatDetails from "./ChatDetails";
import s from "../styles/ChatDetail.module.scss";

export default function ChatDetail() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [activeMobileView, setActiveMobileView] = useState("sidebar"); // sidebar, messages
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChatSelect = () => {
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
      />
      <ChatMessages
        className={`${s.messages} ${
          isMobile && activeMobileView === "messages" ? s.active : ""
        } ${isMobile && activeMobileView !== "messages" ? s.hidden : ""}`}
        isDetailsOpen={isDetailsOpen}
        onOpenDetails={() => setIsDetailsOpen(true)}
        onBack={handleBackToSidebar}
        isMobile={isMobile}
      />
      {isDetailsOpen && isMobile && (
        <div
          className={`${s.backdrop} ${isDetailsOpen ? s.active : ""}`}
          onClick={() => setIsDetailsOpen(false)}
        />
      )}
      <ChatDetails
        className={`${s.details} ${isDetailsOpen ? s.open : ""}`}
        onClose={() => setIsDetailsOpen(false)}
        isOpen={isDetailsOpen}
      />
    </div>
  );
}
