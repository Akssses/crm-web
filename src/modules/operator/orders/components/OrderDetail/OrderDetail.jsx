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
import s from "../../styles/OrderDetail.module.scss";

const TABS = [
  { id: "general", label: "Общая информация" },
  { id: "finance", label: "Финансовый блок" },
  { id: "versions", label: "Версии" },
  { id: "suppliers", label: "Статусы поставщика" },
  { id: "related", label: "Связанные заказы" },
];

export default function OrderDetail({ context = "operator" }) {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const isCustomerContext = context === "customer";
  const order = {
    id: params.id || "ORD-001",
    status: "В работе",
    timeRemaining: "00:23:14",
    createdAt: "15.11.2024, 10:47",
    operator: "Айгерим М.",
    priorityTags: [
      { text: "VIP", color: "yellow" },
      { text: "Срочно", color: "red" },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralInfoTab order={order} context={context} />;
      case "finance":
        return <FinanceTab order={order} />;
      case "versions":
        return <VersionsTab order={order} />;
      case "suppliers":
        return <SupplierStatusTab order={order} />;
      case "related":
        return <RelatedOrdersTab order={order} />;
      default:
        return <GeneralInfoTab order={order} context={context} />;
    }
  };

  return (
    <div className={s.orderDetail}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.headerChips}>
            <span className={`${s.chip} ${s.chipGreen}`}>{order.status}</span>
            <span className={`${s.chip} ${s.chipOrange}`}>
              Осталось {order.timeRemaining}
            </span>
          </div>
          <div className={s.headerMeta}>
            <span>Дата создания: {order.createdAt}</span>
            <span>Ответственный: {order.operator}</span>
          </div>
        </div>
        {!isCustomerContext && (
        <div className={s.headerRight}>
          <div className={s.headerButtons}>
            <Button variant="primary" size="sm" icon={MdModeEditOutline}>
              Редактировать
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push(`/operator/orders/${params.id}/offer`)}
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
            {order.priorityTags.map((tag, idx) => (
              <span
                key={idx}
                className={`${s.priorityTag} ${s[`priorityTag-${tag.color}`]}`}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
        )}
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
