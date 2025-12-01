"use client";
import React, { useMemo, useState } from "react";
import { Button, Select } from "@/ui";
import {
  MdChat,
  MdLock,
  MdLockOpen,
  MdDelete,
  MdPayments,
} from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import GeneralInfoTab from "@/modules/operator/orders/components/OrderDetail/tabs/GeneralInfoTab";
import FinanceTab from "@/modules/operator/orders/components/OrderDetail/tabs/FinanceTab";
import VersionsTab from "@/modules/operator/orders/components/OrderDetail/tabs/VersionsTab";
import SupplierStatusTab from "@/modules/operator/orders/components/OrderDetail/tabs/SupplierStatusTab";
import RelatedOrdersTab from "@/modules/operator/orders/components/OrderDetail/tabs/RelatedOrdersTab";
import s from "../styles/OrderDetail.module.scss";

const TABS = [
  { id: "general", label: "Общая информация" },
  { id: "finance", label: "Финансовый блок" },
  { id: "versions", label: "Версии" },
  { id: "suppliers", label: "Статусы поставщика" },
  { id: "related", label: "Связанные заказы" },
  { id: "history", label: "История изменений" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Черновик" },
  { value: "in_progress", label: "В работе" },
  { value: "waiting_payment", label: "Ожидание оплаты" },
  { value: "completed", label: "Завершён" },
  { value: "closed", label: "Закрыт" },
  { value: "blocked", label: "Заблокирован" },
];

const MOCK_HISTORY = [
  {
    id: 1,
    date: "15.11.2025 18:40",
    user: "Админ Екатерина",
    action: "Статус изменён",
    details: "В работе → Ожидание оплаты",
  },
  {
    id: 2,
    date: "15.11.2025 16:22",
    user: "Финансовый контроль",
    action: "Добавлен платёж",
    details: "PAY-982, 1 200 USD, привязан к услуге SRV-001",
  },
  {
    id: 3,
    date: "14.11.2025 19:50",
    user: "Админ Екатерина",
    action: "Исправлена себестоимость",
    details: "SRV-002, было 1 000 USD → стало 950 USD",
  },
];

export default function AdminOrderDetail() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState("in_progress");
  const [locked, setLocked] = useState(false);
  const order = {
    id: params?.id || "ORD-145",
    status: "В работе",
    timeRemaining: "00:12:18",
    createdAt: "12.11.2025, 09:12",
    operator: "Айгерим М.",
    priorityTags: [
      { text: "VIP", color: "yellow" },
      { text: "Срочно", color: "red" },
    ],
  };

  const historyEntries = useMemo(() => MOCK_HISTORY, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralInfoTab order={order} />;
      case "finance":
        return <FinanceTab order={order} />;
      case "versions":
        return <VersionsTab order={order} />;
      case "suppliers":
        return <SupplierStatusTab order={order} />;
      case "related":
        return <RelatedOrdersTab order={order} />;
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
        return <GeneralInfoTab order={order} />;
    }
  };

  return (
    <div className={s.orderDetail}>
      <header className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.title}>Заказ {order.id}</h1>
          <div className={s.headerChips}>
            <span className={`${s.chip} ${s.chipGreen}`}>{order.status}</span>
            <span className={`${s.chip} ${s.chipOrange}`}>
              Осталось {order.timeRemaining}
            </span>
          </div>
          <div className={s.headerMeta}>
            <span>Дата создания: {order.createdAt}</span>
            <span>Ответственный оператор: {order.operator}</span>
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
            <Button variant="primary" size="sm" icon={MdPayments}>
              Добавить платёж
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={MdDelete}
              onClick={() => {}}
            >
              Удалить заказ
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
