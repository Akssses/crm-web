"use client";
import React, { useState } from "react";
import { Button, Container, Input, Modal } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdCheckCircle,
  MdNotifications,
  MdError,
  MdWarning,
} from "react-icons/md";
import ScenariosManagement from "./ScenariosManagement";
import MonitoringPanel from "./MonitoringPanel";
import CertificatesManagement from "./CertificatesManagement";
import DocumentsRegistry from "./DocumentsRegistry";
import ReverseExchange from "./ReverseExchange";
import OrganizationsIntegration from "./OrganizationsIntegration";
import QueueManagement from "./QueueManagement";
import DiagnosticsPanel from "./DiagnosticsPanel";
import { services } from "../hooks/Data";
import s from "../styles/Integrations.module.scss";

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
    useState(false);

  const tabs = [
    { id: "overview", label: "Обзор" },
    { id: "scenarios", label: "Сценарии обмена" },
    { id: "monitoring", label: "Мониторинг" },
    { id: "certificates", label: "Ключи и сертификаты" },
    { id: "documents", label: "Реестр документов" },
    { id: "reverse", label: "Обратный обмен" },
    { id: "organizations", label: "Организации" },
    { id: "queue", label: "Очередь задач" },
    { id: "diagnostics", label: "Диагностика" },
  ];

  return (
    <div className={s.integrations}>
      <div className={s.header}>
        <div className={s.headerTop}>
          <div className={s.headerInfo}>
            <div className={s.headerMeta}>
              <h4>Статус FinanceHub</h4>
              <span className={s.metaLabel}>• Активен</span>
            </div>
          </div>
          <div className={s.headerActions}>
            <Button
              variant="bggray100"
              icon={MdNotifications}
              onClick={() => setIsNotificationsModalOpen(true)}
            >
              Уведомления
            </Button>
          </div>
        </div>

        <div className={s.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.content}>
        {activeTab === "overview" && (
          <div className={s.overview}>
            <div className={s.toolbar}>
              <Input
                icon={IoSearchOutline}
                placeholder="Поиск по интеграциям..."
                value={search}
                onChange={setSearch}
                className={s.searchInput}
              />
            </div>

            <Container size="full">
              <div className={s.statsGrid}>
                <div className={s.statCard}>
                  <p className={s.statLabel}>Последняя синхронизация</p>
                  <p className={s.statValue}>14:32:15</p>
                  <p className={s.statSublabel}>15.11.2024</p>
                </div>
                <div className={s.statCard}>
                  <p className={s.statLabel}>В обработке</p>
                  <p className={s.statValue}>12</p>
                  <p className={s.statSublabel}>ошибок</p>
                </div>
                <div className={s.statCard}>
                  <p className={s.statLabel}>Ожидают</p>
                  <p className={s.statValue}>8</p>
                  <p className={s.statSublabel}>ошибок</p>
                </div>
                <div className={s.statCard}>
                  <p className={s.statLabel}>Ошибки за сутки</p>
                  <p className={s.statValue}>3</p>
                  <p className={s.statSublabel}>Посмотреть лог →</p>
                </div>
              </div>
            </Container>

            <div className={s.integrationsSection}>
              <h3 className={s.sectionTitle}>Интегрированные сервисы</h3>
              <div className={s.servicesGrid}>
                {services
                  .filter(
                    (service) =>
                      !search ||
                      service.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      service.code.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((service, idx) => {
                    const Icon = service.icon;
                    return (
                      <div key={idx} className={s.serviceCard}>
                        <div className={s.serviceHeader}>
                          <div
                            className={s.serviceNumber}
                            style={{ background: service.bgColor }}
                          >
                            <Icon size={24} color={service.iconColor} />
                          </div>
                          <div className={s.serviceInfo}>
                            <h4>{service.title}</h4>
                            <p>{service.code}</p>
                          </div>
                          <div className={s.serviceStatus}>
                            <span
                              className={`${s.statusBadge} ${
                                s[`status-${service.statusColor}`]
                              }`}
                            >
                              {service.status}
                            </span>
                          </div>
                        </div>
                        <div className={s.serviceFields}>
                          {service.fields.map((field, fieldIdx) => (
                            <div key={fieldIdx} className={s.fieldRow}>
                              <span className={s.fieldLabel}>
                                {field.label}:
                              </span>
                              <span className={s.fieldValue}>
                                {field.value || "—"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "scenarios" && <ScenariosManagement />}
        {activeTab === "monitoring" && <MonitoringPanel />}
        {activeTab === "certificates" && <CertificatesManagement />}
        {activeTab === "documents" && <DocumentsRegistry />}
        {activeTab === "reverse" && <ReverseExchange />}
        {activeTab === "organizations" && <OrganizationsIntegration />}
        {activeTab === "queue" && <QueueManagement />}
        {activeTab === "diagnostics" && <DiagnosticsPanel />}
      </div>

      {isNotificationsModalOpen && (
        <NotificationsModal
          isOpen={isNotificationsModalOpen}
          onClose={() => setIsNotificationsModalOpen(false)}
        />
      )}
    </div>
  );
}

function NotificationsModal({ isOpen, onClose }) {
  const notifications = [
    {
      id: "NOTIF-001",
      type: "error",
      title: "Ошибка интеграции с 1С",
      message: "Превышено время ожидания ответа от сервера 1С",
      time: "2025-01-15 15:30",
      read: false,
    },
    {
      id: "NOTIF-002",
      type: "warning",
      title: "Истекает срок сертификата",
      message: "Сертификат Диадок истечёт через 31 день",
      time: "2025-01-15 14:20",
      read: false,
    },
    {
      id: "NOTIF-003",
      type: "info",
      title: "Завершена синхронизация",
      message: "Успешно синхронизировано 1243 документа за последние 24 часа",
      time: "2025-01-15 13:15",
      read: true,
    },
    {
      id: "NOTIF-004",
      type: "error",
      title: "Остановлена очередь задач",
      message: "Обнаружена критическая ошибка в обработке очереди",
      time: "2025-01-15 12:00",
      read: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "error":
        return MdError;
      case "warning":
        return MdWarning;
      default:
        return MdCheckCircle;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "error":
        return "red";
      case "warning":
        return "yellow";
      default:
        return "blue";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="600px"
      title="Уведомления"
    >
      <div className={s.notificationsModal}>
        <div className={s.notificationsList}>
          {notifications.map((notif) => {
            const Icon = getNotificationIcon(notif.type);
            const color = getNotificationColor(notif.type);
            return (
              <div
                key={notif.id}
                className={`${s.notificationItem} ${
                  !notif.read ? s.unread : ""
                }`}
              >
                <div className={`${s.notificationIcon} ${s[`icon-${color}`]}`}>
                  <Icon size={20} />
                </div>
                <div className={s.notificationContent}>
                  <h4 className={s.notificationTitle}>{notif.title}</h4>
                  <p className={s.notificationMessage}>{notif.message}</p>
                  <span className={s.notificationTime}>{notif.time}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="primary">Отметить все как прочитанные</Button>
        </div>
      </div>
    </Modal>
  );
}
