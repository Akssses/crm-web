"use client";
import React, { useState } from "react";
import PaymentsList from "./PaymentsList";
import OnlinePayment from "./OnlinePayment";
import RefundsList from "./RefundsList";
import Documents from "./Documents";
import s from "../styles/Payments.module.scss";

export default function Payments() {
  const [activeTab, setActiveTab] = useState("payments");

  const tabs = [
    { id: "payments", label: "Оплаты" },
    { id: "refunds", label: "Возвраты и корректировки" },
    { id: "documents", label: "Документы" },
  ];

  return (
    <div className={s.payments}>
      <div className={s.header}>
        <h2 className={s.title}>Оплаты и возвраты</h2>
        <p className={s.description}>
          Контроль финансовых операций по вашим заказам: оплаты, возвраты,
          документы
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
        {activeTab === "payments" && (
          <div className={s.paymentsContent}>
            <PaymentsList />
            <OnlinePayment />
          </div>
        )}
        {activeTab === "refunds" && <RefundsList />}
        {activeTab === "documents" && <Documents />}
      </div>
    </div>
  );
}
