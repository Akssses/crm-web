"use client";

import React, { useState } from "react";
import { Container, Button, Textarea } from "@/ui";
import { MdModeEditOutline, MdChat } from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import GeneralInfoTab from "./tabs/GeneralInfoTab";
import FinanceTab from "./tabs/FinanceTab";
import VersionsTab from "./tabs/VersionsTab";
import SupplierStatusTab from "./tabs/SupplierStatusTab";
import RelatedOrdersTab from "./tabs/RelatedOrdersTab";
import s from "../../styles/RequestDetail.module.scss";

const TABS = [
  { id: "general", label: "Общая информация" },
  { id: "finance", label: "Финансовый блок" },
  { id: "versions", label: "Версии" },
  { id: "suppliers", label: "Статусы поставщика" },
  { id: "related", label: "Связанные заказы" },
];

export default function RequestDetail({ context = "operator" }) {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const isCustomerContext = context === "customer";
  const request = {
    id: "A-213-321",
    status: "Новая",
    timeRemaining: "00:23:14",
    createdAt: "24.10.2025, 10:47",
    operator: "Айсулуу М.",
    priorityTags: [
      { text: "Высокий", color: "pink" },
      { text: "VIP", color: "yellow" },
      { text: "Срочно", color: "red" },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralInfoTab
            request={request}
            showDocumentUploads={isCustomerContext}
          />
        );
      case "finance":
        return <FinanceTab request={request} />;
      case "versions":
        return <VersionsTab request={request} />;
      case "suppliers":
        return <SupplierStatusTab request={request} />;
      case "related":
        return <RelatedOrdersTab request={request} />;
      default:
        return <GeneralInfoTab request={request} />;
    }
  };

  return (
    <div className={s.requestDetail}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.headerChips}>
            <span className={`${s.chip} ${s.chipBlue}`}>{request.status}</span>
            <span className={`${s.chip} ${s.chipOrange}`}>
              Осталось {request.timeRemaining}
            </span>
          </div>
          <div className={s.headerMeta}>
            <span>Дата создания: {request.createdAt}</span>
            <span>Ответственный: {request.operator}</span>
          </div>
        </div>
        <div className={s.headerRight}>
          <div className={s.headerButtons}>
            <Button variant="primary" size="sm" icon={MdModeEditOutline}>
              Редактировать
            </Button>
            <Button variant="primary" size="sm">
              Конвертировать в заказ
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                router.push(`/operator/requests/${params.id}/offer`)
              }
            >
              Ком. предложение
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={MdChat}
              onClick={() => router.push(`/operator/chat/${params.id}`)}
            >
              Чат
            </Button>
          </div>
          <div className={s.priorityTags}>
            {request.priorityTags.map((tag, idx) => (
              <span
                key={idx}
                className={`${s.priorityTag} ${s[`priorityTag-${tag.color}`]}`}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Tabs */}
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

      {/* Tab Content */}
      <div className={s.tabContent}>{renderTabContent()}</div>
    </div>
  );
}
