"use client";
import React from "react";
import { Button } from "@/ui";
import {
  MdClose,
  MdEdit,
  MdCheckCircle,
  MdNotifications,
  MdDownload,
} from "react-icons/md";
import s from "../styles/ChatDetails.module.scss";

export default function ChatDetails({ className, onClose, isOpen }) {
  const files = [
    { name: "Паспорт_Иван.pdf", size: "124 KB" },
    { name: "Ваучер_отель.pdf", size: "89 KB" },
  ];

  return (
    <div className={`${s.details} ${className || ""}`}>
      <div className={s.header}>
        <h3 className={s.title}>Детали заявки</h3>
        <button className={s.closeButton} onClick={onClose}>
          <MdClose size={20} />
        </button>
      </div>

      <div className={s.content}>
        {/* Request Overview */}
        <div className={s.section}>
          <div className={s.field}>
            <span className={s.label}>Номер заявки</span>
            <span className={s.value}>ORD-145</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Статус</span>
            <span className={`${s.statusBadge} ${s.statusYellow}`}>
              В работе
            </span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Оператор</span>
            <span className={s.value}>А Айгерим</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>SLA</span>
            <span className={`${s.slaText} ${s.slaRed}`}>Просрочено на 2ч</span>
          </div>
        </div>

        {/* Client Information */}
        <div className={s.section}>
          <h4 className={s.sectionTitle}>Клиент</h4>
          <div className={s.clientInfo}>
            <span className={s.clientName}>Иван Петров</span>
            <span className={s.clientType}>Постоянный клиент</span>
          </div>
          <div className={s.contactInfo}>
            <div className={s.contactItem}>
              <span className={s.contactLabel}>Телефон:</span>
              <span className={s.contactValue}>+996 700 123 456</span>
            </div>
            <div className={s.contactItem}>
              <span className={s.contactLabel}>Email:</span>
              <span className={s.contactValue}>ivan@example.com</span>
            </div>
            <div className={s.contactItem}>
              <span className={s.contactLabel}>Telegram:</span>
              <span className={s.contactValue}>@ivan_petrov</span>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className={s.section}>
          <h4 className={s.sectionTitle}>Услуга</h4>
          <div className={s.field}>
            <span className={s.label}>Направление</span>
            <span className={s.value}>Турция, Анталья</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Даты</span>
            <span className={s.value}>15-25 мая 2025</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Туристы</span>
            <span className={s.value}>2 взрослых</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Отель</span>
            <span className={s.value}>Club Hotel Sera 5*</span>
          </div>
          <div className={s.field}>
            <span className={s.label}>Стоимость</span>
            <span className={s.value}>$2,450</span>
          </div>
        </div>

        {/* Files */}
        <div className={s.section}>
          <h4 className={s.sectionTitle}>Файлы</h4>
          <div className={s.filesList}>
            {files.map((file, idx) => (
              <div key={idx} className={s.fileItem}>
                <span className={s.fileName}>{file.name}</span>
                <span className={s.fileSize}>{file.size}</span>
                <button className={s.downloadButton}>
                  <MdDownload size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={s.actions}>
          <Button
            variant="primary"
            icon={MdEdit}
            className={s.actionButton}
            onClick={() => {}}
          >
            Создать корректировку
          </Button>
          <Button
            variant="success"
            icon={MdCheckCircle}
            className={s.actionButton}
            onClick={() => {}}
          >
            Подтвердить заказ
          </Button>
          <Button
            variant="yellow"
            icon={MdNotifications}
            className={s.actionButton}
            onClick={() => {}}
          >
            Напомнить клиенту
          </Button>
        </div>
      </div>
    </div>
  );
}
