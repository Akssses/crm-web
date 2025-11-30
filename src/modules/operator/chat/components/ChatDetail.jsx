"use client";
import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatDetails from "./ChatDetails";
import s from "../styles/ChatDetail.module.scss";

export default function ChatDetail() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  return (
    <div className={s.chatDetail}>
      <ChatSidebar className={s.sidebar} />
      <ChatMessages
        className={s.messages}
        isDetailsOpen={isDetailsOpen}
        onOpenDetails={() => setIsDetailsOpen(true)}
      />
      {isDetailsOpen && (
        <ChatDetails
          className={s.details}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
}
