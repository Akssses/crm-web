"use client";
import React, { useState } from "react";
import { Button, Container, Input } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdCheckCircle, MdNotifications } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ScenariosManagement from "./ScenariosManagement";
import MonitoringPanel from "./MonitoringPanel";
import CertificatesManagement from "./CertificatesManagement";
import DocumentsRegistry from "./DocumentsRegistry";
import ReverseExchange from "./ReverseExchange";
import OrganizationsIntegration from "./OrganizationsIntegration";
import QueueManagement from "./QueueManagement";
import DiagnosticsPanel from "./DiagnosticsPanel";
import s from "../styles/Integrations.module.scss";

export default function Integrations() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

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
            <div className={s.statusBadge}>
              <MdCheckCircle size={20} style={{ color: "#10b981" }} />
            </div>
            <div className={s.headerMeta}>
              <h4>Статус FinanceHub</h4>
              <span className={s.metaLabel}>• Активен</span>
            </div>
          </div>
          <div className={s.headerActions}>
            <Button variant="bggray100" icon={MdNotifications}>
              Уведомления
            </Button>
            <Button variant="bggray100" icon={IoMdSettings}>
              Настройки FinanceHub
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
                placeholder="Поиск..."
                value={search}
                onChange={setSearch}
                className={s.searchInput}
              />
              <Button variant="bgblue" icon={FaPlus}>
                Добавить интеграцию
              </Button>
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
    </div>
  );
}
