 "use client";
import React, { useState } from "react";
import s from "../styles/SystemAdmin.module.scss";
import { Button } from "@/ui";
import ImportExport from "./tabs/ImportExport";
import Backup from "./tabs/Backup";
import Logs from "./tabs/Logs";
import Monitoring from "./tabs/Monitoring";
import ConfigJournal from "./tabs/ConfigJournal";

const TABS = [
  { id: "monitoring", label: "Мониторинг" },
  { id: "import-export", label: "Импорт / экспорт" },
  { id: "backup", label: "Резервное копирование" },
  { id: "logs", label: "Логи и аудит" },
  { id: "config-journal", label: "Журнал конфигурации" },
];

export default function SystemAdmin({ defaultTab = "monitoring", currentUserRole }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Простейшая защита на фронте: модуль только для роли "Администратор системы"
  const hasAccess = !currentUserRole || currentUserRole === "Администратор системы";

  if (!hasAccess) {
    return (
      <div className={s.noAccess}>
        <h2>Нет доступа</h2>
        <p>Данный раздел доступен только пользователям с ролью «Администратор системы».</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "import-export":
        return <ImportExport />;
      case "backup":
        return <Backup />;
      case "logs":
        return <Logs />;
      case "monitoring":
        return <Monitoring />;
      case "config-journal":
        return <ConfigJournal />;
      default:
        return <ImportExport />;
    }
  };

  return (
    <div className={s.systemAdmin}>
      <div className={s.header}>
        <h1>Системное администрирование</h1>
        <span className={s.subtitle}>
          Импорт/экспорт, резервное копирование, логи, мониторинг и изменения конфигурации.
        </span>
      </div>
      <div className={s.layout}>
        <div className={s.tabs}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`${s.tab} ${isActive ? s.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <section className={s.content}>{renderContent()}</section>
      </div>
    </div>
  );
}


