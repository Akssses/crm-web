"use client";
import React, { useMemo, useState } from "react";
import { Container, Button, Select } from "@/ui";
import { MdChat, MdLock, MdLockOpen, MdDelete } from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import GeneralInfoTab from "@/modules/operator/requests/components/RequestDetail/tabs/GeneralInfoTab";
import FinanceTab from "@/modules/operator/requests/components/RequestDetail/tabs/FinanceTab";
import VersionsTab from "@/modules/operator/requests/components/RequestDetail/tabs/VersionsTab";
import SupplierStatusTab from "@/modules/operator/requests/components/RequestDetail/tabs/SupplierStatusTab";
import RelatedOrdersTab from "@/modules/operator/requests/components/RequestDetail/tabs/RelatedOrdersTab";
import s from "../styles/RequestDetail.module.scss";

const TABS = [
  { id: "general", label: "Общая информация" },
  { id: "services", label: "Услуги" },
  { id: "finance", label: "Финансовый блок" },
  { id: "versions", label: "Версии" },
  { id: "suppliers", label: "Статусы поставщика" },
  { id: "related", label: "Связанные заказы" },
  { id: "history", label: "История изменений" },
];

const STATUS_OPTIONS = [
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "sla", label: "SLA" },
  { value: "approved", label: "Согласована" },
  { value: "converted", label: "Конвертирована" },
  { value: "blocked", label: "Заблокирована" },
];

const MOCK_HISTORY = [
  {
    id: 1,
    date: "15.11.2025 14:32",
    user: "Админ Екатерина",
    action: "Статус изменён",
    details: "В работе → Согласована",
  },
  {
    id: 2,
    date: "15.11.2025 13:05",
    user: "Админ Екатерина",
    action: "Назначен оператор",
    details: "Айгерим М.",
  },
  {
    id: 3,
    date: "14.11.2025 18:12",
    user: "Оператор Айгерим",
    action: "Добавлена услуга",
    details: "Отель Hilton Bosphorus",
  },
  {
    id: 4,
    date: "14.11.2025 09:47",
    user: "Админ Екатерина",
    action: "Документ загружен",
    details: "Счёт №145.pdf",
  },
];

export default function AdminRequestDetail() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState("in_progress");
  const [locked, setLocked] = useState(false);
  const request = {
    id: params?.id || "REQ-145",
    status: "В работе",
    timeRemaining: "00:23:14",
    createdAt: "24.10.2025, 10:47",
    operator: "Айсулуу М.",
    priorityTags: [
      { text: "Высокий", color: "pink" },
      { text: "VIP", color: "yellow" },
      { text: "Срочно", color: "red" },
    ],
  };

  const historyEntries = useMemo(() => MOCK_HISTORY, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralInfoTab request={request} />;
      case "finance":
        return <FinanceTab request={request} />;
      case "versions":
        return <VersionsTab request={request} />;
      case "suppliers":
        return <SupplierStatusTab request={request} />;
      case "related":
        return <RelatedOrdersTab request={request} />;
      case "services":
        return <GeneralInfoTab request={request} />;
      case "history":
        return (
          <div className={s.historySection}>
            <div className={s.historyList}>
              {historyEntries.map((entry) => (
                <div key={entry.id} className={s.historyItem}>
                  <div className={s.historyHeader}>
                    <span className={s.historyDate}>{entry.date}</span>
                    <span className={s.historyUser}>{entry.user}</span>
                  </div>
                  <div className={s.historyAction}>{entry.action}</div>
                  <div className={s.historyDetails}>{entry.details}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <GeneralInfoTab request={request} />;
    }
  };

  return (
    <div className={s.requestDetail}>
      <header className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.title}>Заявка {request.id}</h1>
          <div className={s.headerChips}>
            <span className={`${s.chip} ${s.chipBlue}`}>{request.status}</span>
            <span className={`${s.chip} ${s.chipOrange}`}>
              Осталось {request.timeRemaining}
            </span>
          </div>
          <div className={s.headerMeta}>
            <span>Дата создания: {request.createdAt}</span>
            <span>Ответственный оператор: {request.operator}</span>
          </div>
        </div>
        <div className={s.headerRight}>
          <div className={s.headerButtons}>
            <Button
              variant="outline"
              size="sm"
              icon={locked ? MdLockOpen : MdLock}
              onClick={() => setLocked((prev) => !prev)}
            >
              {locked ? "Разблокировать" : "Заблокировать"}
            </Button>
            <Button variant="primary" size="sm" onClick={() => {}}>
              Конвертировать в заказ
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={MdDelete}
              onClick={() => {}}
            >
              Удалить заявку
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={MdChat}
              onClick={() => router.push(`/operator/chat/${params.id}`)}
            >
              Перейти в чат
            </Button>
          </div>
        </div>
      </header>

      <div className={s.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={s.tabContent}>{renderTabContent()}</div>
    </div>
  );
}
