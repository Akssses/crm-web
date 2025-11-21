"use client";
import React, { useState } from "react";
import s from "../styles/FinanceTabs.module.scss";

export default function FinanceTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "payments", label: "Платежи" },
    { id: "returns", label: "Возвраты" },
    { id: "report", label: "Отчет" },
  ];

  return (
    <div className={s.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

