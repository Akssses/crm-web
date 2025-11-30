"use client";
import React, { useState } from "react";
import { Button, Textarea } from "@/ui";
import {
  MdSettings,
  MdMoreVert,
  MdAttachFile,
  MdSend,
  MdCheckCircle,
  MdWarning,
  MdInfoOutline,
} from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import s from "../styles/ChatMessages.module.scss";

export default function ChatMessages({
  className,
  isDetailsOpen,
  onOpenDetails,
}) {
  const [activeMessageType, setActiveMessageType] = useState("client");
  const [message, setMessage] = useState("");

  const messageTypes = [
    { id: "client", label: "Клиент" },
    { id: "supplier", label: "Поставщик" },
    { id: "internal", label: "Внутреннее" },
  ];

  const messages = [
    {
      type: "system",
      text: "Заявка создана оператором • 04.11.25 09:15",
      time: "09:15",
    },
    {
      type: "client",
      author: "Иван Петров клиент",
      text: "Здравствуйте! Хочу забронировать тур в Турцию...",
      time: "09:20",
      actions: ["Создать корректировку", "Ответить"],
    },
    {
      type: "operator",
      author: "оператор Айгерим",
      text: "Добро пожаловать! Подготовлю для вас варианты...",
      time: "09:25",
    },
    {
      type: "supplier",
      author: "Booking Support поставщик",
      text: "Бронирование подтверждено. Отель Club Hotel Sera 5*...",
      time: "10:30",
    },
    {
      type: "internal",
      author: "Айгерим внутреннее",
      text: "@Марат проверь, пожалуйста, тариф на трансфер...",
      time: "11:00",
    },
  ];

  return (
    <div className={`${s.messages} ${className || ""}`}>
      {/* Chat Header */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.chatInfo}>
            <h3 className={s.clientName}>Иван Петров</h3>
            <span className={s.orderInfo}>ORD-145 • Тур в Турцию</span>
          </div>
        </div>
        <div className={s.headerRight}>
          <div className={s.badges}>
            <span className={`${s.statusBadge} ${s.statusYellow}`}>
              В работе
            </span>
            <span className={`${s.slaBadge} ${s.slaRed}`}>SLA +2ч</span>
          </div>
          {!isDetailsOpen && (
            <button
              className={s.detailsButton}
              onClick={onOpenDetails}
              title="Открыть детали заявки"
            >
              <MdInfoOutline size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div className={s.messagesList}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${s.message} ${s[`message-${msg.type}`]}`}>
            {msg.type === "system" && (
              <div className={s.systemMessage}>{msg.text}</div>
            )}

            {msg.type === "client" && (
              <>
                <div className={s.messageHeader}>
                  <span className={s.author}>{msg.author}</span>
                  <span className={s.time}>{msg.time}</span>
                </div>
                <div className={s.messageBubble}>
                  <p>{msg.text}</p>
                </div>
                {msg.actions && (
                  <div className={s.messageActions}>
                    {msg.actions.map((action, i) => (
                      <button key={i} className={s.actionLink}>
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {msg.type === "operator" && (
              <>
                <div className={s.messageHeader}>
                  <span className={s.author}>{msg.author}</span>
                  <span className={s.time}>{msg.time}</span>
                </div>
                <div className={s.messageBubble}>{msg.text}</div>
              </>
            )}

            {msg.type === "supplier" && (
              <>
                <div className={s.messageHeader}>
                  <span className={s.author}>{msg.author}</span>
                  <span className={s.time}>{msg.time}</span>
                </div>
                <div className={s.messageBubble}>{msg.text}</div>
              </>
            )}

            {msg.type === "internal" && (
              <>
                <div className={s.messageHeader}>
                  <span className={s.author}>{msg.author}</span>
                  <span className={s.time}>{msg.time}</span>
                </div>
                <div className={s.messageBubble}>{msg.text}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className={s.inputSection}>
        <div className={s.messageTypeTabs}>
          {messageTypes.map((type) => (
            <button
              key={type.id}
              className={`${s.typeTab} ${
                activeMessageType === type.id ? s.active : ""
              }`}
              onClick={() => setActiveMessageType(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>
        <div className={s.inputWrapper}>
          <Textarea
            placeholder={`Написать сообщение ${
              activeMessageType === "client"
                ? "клиенту"
                : activeMessageType === "supplier"
                ? "поставщику"
                : "внутреннее"
            }...`}
            value={message}
            onChange={setMessage}
            className={s.textarea}
            minRows={2}
            maxRows={6}
          />
          <div className={s.inputActions}>
            <button className={s.actionIconButton}>
              <MdAttachFile size={20} />
            </button>

            <Button
              variant="primary"
              icon={MdSend}
              onClick={() => {}}
              className={s.sendButton}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
