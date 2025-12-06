"use client";
import React, { useState } from "react";
import BalanceSummary from "./BalanceSummary";
import TransactionsHistory from "./TransactionsHistory";
import s from "../styles/Balance.module.scss";

export default function Balance() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Обзор" },
    { id: "history", label: "История операций" },
  ];

  return (
    <div className={s.balance}>
      <div className={s.header}>
        <h2 className={s.title}>Баланс заказчика</h2>
        <p className={s.description}>
          Полная картина финансового состояния и все связанные операции
        </p>
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

      <div className={s.content}>
        {activeTab === "overview" && (
          <>
            <BalanceSummary />
          </>
        )}
        {activeTab === "history" && <TransactionsHistory />}
      </div>
    </div>
  );
}

