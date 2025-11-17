"use client";
import React, { useState } from "react";
import s from "../styles/SupplierInfoModal.module.scss";
import { Modal, Button } from "@/ui";
import {
  FaRegBuilding,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function SupplierInfoModal({
  isOpen,
  onClose,
  supplier = {},
  onEdit,
  onDelete,
  onShare,
}) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "Общие данные" },
    { id: "contacts", label: "Контакты" },
    { id: "integration", label: "Интеграция / API" },
    { id: "sla", label: "SLA" },
    { id: "analytics", label: "Аналитика" },
  ];

  const InfoRow = ({ label, value, isBold = false }) => (
    <div className={s.infoRow}>
      <span className={s.label}>{label}</span>
      <span className={`${s.value} ${isBold ? s.bold : ""}`}>{value}</span>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Информация поставщика"
      position="right"
      width="600px"
      icon={FaRegBuilding}
    >
      <div className={s.modalContent}>
        <div>
          {" "}
          <div className={s.header}>
            <div className={s.avatar}></div>
            <div className={s.headerInfo}>
              <h3>{supplier?.name || "Поставщик 1"}</h3>
              <p className={s.organization}>
                {supplier?.organization
                  ? `Организация - ${supplier?.organization}`
                  : "Организация"}
              </p>
            </div>
            <div className={s.status}>
              <span className={s.badge}>• Активен</span>
            </div>
          </div>
          {/* Tabs */}
          <div className={s.tabs}>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={`${activeTab === tab.id ? "bgblue" : "outline"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          {/* Tab Content */}
          <div className={s.tabContent}>
            {/* ОБЩИЕ ДАННЫЕ */}
            {activeTab === "general" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="Название поставщика"
                  value={supplier?.name || "Amadeus"}
                />
                <InfoRow
                  label="Тип поставщика"
                  value={supplier?.supplierType || "Локальный"}
                />
                <InfoRow
                  label="Типы услуг"
                  value={
                    supplier?.services || "Авиапереселеты, Отели, Трансферы"
                  }
                />
                <InfoRow
                  label="Организация"
                  value={supplier?.organization || "Asia Travel"}
                />
                <InfoRow
                  label="Валюта расчета"
                  value={supplier?.currency || "USD"}
                />
                <InfoRow
                  label="Комиссия (%)"
                  value={supplier?.commission || "12%"}
                  isBold
                />
              </div>
            )}

            {/* КОНТАКТЫ */}
            {activeTab === "contacts" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="Контактное лицо"
                  value={supplier?.contactPerson || "Алина Исмаилова"}
                />
                <InfoRow
                  label="Email"
                  value={supplier?.email || "partner@hotel.kg"}
                />
                <InfoRow
                  label="Телефон"
                  value={supplier?.phone || "+996 555 123 456"}
                />
                <InfoRow
                  label="Адрес"
                  value={supplier?.address || "г. Бишкек, пр. Чуй 250, офис 3"}
                />
                <InfoRow
                  label="Канал связи"
                  value={supplier?.channel || "Telegram"}
                />
                <InfoRow
                  label="Чат ID / Email"
                  value={supplier?.chatId || "@alina_partner"}
                />
              </div>
            )}

            {/* ИНТЕГРАЦИЯ / API */}
            {activeTab === "integration" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="API Endpoint"
                  value={
                    supplier?.apiEndpoint ||
                    "https://api.amadeus.com/v2/bookings"
                  }
                />
                <InfoRow
                  label="API Key"
                  value={supplier?.apiKey || "api_12345abcdef"}
                />
                <InfoRow
                  label="API Secret"
                  value={supplier?.apiSecret ? "•••••••••" : "Not set"}
                />
              </div>
            )}

            {/* SLA */}
            {activeTab === "sla" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="Время ответа (мин)"
                  value={supplier?.responseTime || "30 мин."}
                />
                <InfoRow
                  label="Дедлайн подтверждения (часы)"
                  value={supplier?.deadline || "6 ч."}
                />
                <InfoRow
                  label="Канал уведомлений"
                  value={supplier?.notificationChannel || "Telegram"}
                />
                <InfoRow
                  label="Приоритет поставщика"
                  value={supplier?.priority || "Высокий"}
                />
                <InfoRow
                  label="Тип комиссионного расчета"
                  value={supplier?.commissionType || "Фикс"}
                />
                <InfoRow
                  label="Условия оплаты"
                  value={
                    supplier?.paymentTerms ||
                    "Предоплата 50%, остальное по факту"
                  }
                />
              </div>
            )}

            {/* АНАЛИТИКА */}
            {activeTab === "analytics" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="Средняя скорость ответа"
                  value={supplier?.avgResponseSpeed || "24 мин"}
                />
                <InfoRow
                  label="Процент подтверждений"
                  value={supplier?.confirmationRate || "89%"}
                  isBold
                />
                <InfoRow
                  label="Процент аннуляций"
                  value={supplier?.cancellationRate || "6%"}
                />
                <InfoRow
                  label="Средний чек"
                  value={supplier?.avgCheck || "$245"}
                />
                <InfoRow label="Маржа" value={supplier?.margin || "15%"} />
                <InfoRow
                  label="Последняя синхронизация"
                  value={supplier?.lastSync || "23.10.2025, 16:30"}
                />
              </div>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className={s.actions}>
          <Button
            variant="outline"
            icon={FaEdit}
            onClick={() => {
              onEdit?.(supplier);
              onClose();
            }}
          >
            Редактировать
          </Button>
          <Button
            variant="outline"
            icon={FaTrash}
            onClick={() => {
              onDelete?.(supplier?.id);
              onClose();
            }}
          >
            Удалить
          </Button>
          <Button
            variant="outline"
            icon={FaExternalLinkAlt}
            onClick={() => onShare?.(supplier)}
          >
            Поделиться
          </Button>
        </div>
      </div>
    </Modal>
  );
}
