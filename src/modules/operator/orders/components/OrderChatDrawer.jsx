"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button } from "@/ui";
import {
  MdAttachFile,
  MdSend,
  MdChat,
  MdDone,
  MdDoneAll,
  MdClose,
} from "react-icons/md";
import s from "../styles/OrderChatDrawer.module.scss";

const MESSAGE_FILTERS = [
  { id: "all", label: "Все сообщения" },
  { id: "client", label: "Только клиент" },
  { id: "operator", label: "Только оператор" },
  { id: "supplier", label: "Только поставщик" },
  { id: "attachments", label: "Только вложения" },
];

const CHANNELS = [
  { id: "client", label: "Клиент" },
  { id: "internal", label: "Внутренний" },
  { id: "supplier", label: "Поставщик" },
  { id: "system", label: "Системный" },
];

export default function OrderChatDrawer({ isOpen, onClose, order }) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeChannel, setActiveChannel] = useState("client");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Mock messages data
  useEffect(() => {
    if (order) {
      setMessages([
        {
          id: 1,
          type: "system",
          text: `Заказ ${order.id} создан • ${order.date} 09:15`,
          time: "09:15",
          channel: "system",
        },
        {
          id: 2,
          type: "client",
          author: `${order.client} (клиент)`,
          text: "Здравствуйте! Хочу уточнить детали по заказу...",
          time: "09:20",
          channel: "client",
          read: true,
          delivered: true,
        },
        {
          id: 3,
          type: "operator",
          author: "Оператор Айгерим",
          text: "Добрый день! Конечно, помогу с уточнением деталей...",
          time: "09:25",
          channel: "internal",
          read: true,
          delivered: true,
        },
        {
          id: 4,
          type: "supplier",
          author: "Booking Support (поставщик)",
          text: "Бронирование подтверждено. Документы отправлены.",
          time: "10:30",
          channel: "supplier",
          read: true,
          delivered: true,
        },
        {
          id: 5,
          type: "operator",
          author: "Оператор Айгерим",
          text: "@Марат проверь, пожалуйста, тариф на трансфер...",
          time: "11:00",
          channel: "internal",
          read: false,
          delivered: true,
        },
        {
          id: 6,
          type: "client",
          author: `${order.client} (клиент)`,
          text: "Спасибо за помощь!",
          time: "11:15",
          channel: "client",
          read: true,
          delivered: true,
        },
      ]);
    }
  }, [order]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = messages.filter((msg) => {
    // Сначала фильтруем по каналу
    if (activeChannel !== "all" && msg.channel !== activeChannel) {
      return false;
    }

    // Затем фильтруем по типу сообщения
    if (activeFilter === "all") return true;
    if (activeFilter === "attachments")
      return msg.attachments && msg.attachments.length > 0;
    return msg.type === activeFilter;
  });

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      type: file.type,
      file,
    }));
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSend = () => {
    if (!message.trim() && attachedFiles.length === 0) return;

    const newMessage = {
      id: Date.now(),
      type:
        activeChannel === "client"
          ? "operator"
          : activeChannel === "supplier"
          ? "operator"
          : "operator",
      author: "Оператор Айгерим",
      text: message,
      time: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      channel: activeChannel,
      attachments: [...attachedFiles],
      read: false,
      delivered: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setAttachedFiles([]);
  };

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      width="600px"
      title={order.id}
      className={s.chatDrawer}
    >
      <div className={s.chatContent}>
        {/* Header */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <div className={s.chatInfo}>
              <div className={s.clientInfo}>
                <span className={s.clientName}>{order.client}</span>
                <span className={s.serviceName}>• {order.service}</span>
              </div>
              <div className={s.badges}>
                <span
                  className={`${s.statusBadge} ${
                    s[`status-${order.statusColor}`]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
          <div className={s.headerRight}>
            <button
              className={s.iconButton}
              title="Открыть в полном окне"
              onClick={() => {
                router.push(`/operator/chat/${order.id}`);
              }}
            >
              <MdChat size={20} />
            </button>
          </div>
        </div>

        {/* Channel Tabs */}
        <div className={s.channelTabs}>
          {CHANNELS.map((channel) => (
            <button
              key={channel.id}
              className={`${s.channelTab} ${
                activeChannel === channel.id ? s.active : ""
              }`}
              onClick={() => setActiveChannel(channel.id)}
            >
              {channel.label}
            </button>
          ))}
        </div>

        {/* Message Filters */}
        <div className={s.messageFilters}>
          {MESSAGE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              className={`${s.filterButton} ${
                activeFilter === filter.id ? s.active : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className={s.messagesList}>
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`${s.message} ${s[`message-${msg.type}`]}`}
            >
              {msg.type === "system" && (
                <div className={s.systemMessage}>{msg.text}</div>
              )}

              {(msg.type === "client" ||
                msg.type === "operator" ||
                msg.type === "supplier") && (
                <>
                  <div className={s.messageHeader}>
                    <span className={s.author}>{msg.author}</span>
                    <span className={s.time}>{msg.time}</span>
                  </div>
                  <div className={s.messageBubble}>
                    <p>{msg.text}</p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className={s.attachments}>
                        {msg.attachments.map((file, idx) => (
                          <div key={idx} className={s.attachmentItem}>
                            <MdAttachFile size={16} />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.type === "operator" && (
                    <div className={s.messageStatus}>
                      {msg.read ? (
                        <MdDoneAll className={s.readIcon} size={16} />
                      ) : msg.delivered ? (
                        <MdDoneAll className={s.deliveredIcon} size={16} />
                      ) : (
                        <MdDone className={s.sentIcon} size={16} />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div
          className={`${s.inputSection} ${isDragging ? s.dragging : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {attachedFiles.length > 0 && (
            <div className={s.attachedFiles}>
              {attachedFiles.map((file) => (
                <div key={file.id} className={s.attachedFile}>
                  <span>{file.name}</span>
                  <button onClick={() => removeFile(file.id)}>
                    <MdClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className={s.inputWrapper}>
            <div className={s.textareaWrapper}>
              <textarea
                className={s.textarea}
                placeholder={`Написать сообщение ${
                  activeChannel === "client"
                    ? "клиенту"
                    : activeChannel === "supplier"
                    ? "поставщику"
                    : activeChannel === "internal"
                    ? "внутреннее"
                    : "системное"
                }...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                style={{
                  minHeight: "60px",
                  maxHeight: "144px",
                  resize: "vertical",
                }}
              />
            </div>
            <div className={s.inputActions}>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileInput}
              />
              <button
                className={s.actionIconButton}
                onClick={() => fileInputRef.current?.click()}
                title="Прикрепить файл"
              >
                <MdAttachFile size={20} />
              </button>
              <Button
                variant="primary"
                icon={MdSend}
                onClick={handleSend}
                className={s.sendButton}
                disabled={!message.trim() && attachedFiles.length === 0}
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
