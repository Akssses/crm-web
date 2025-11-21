"use client";
import React, { useState } from "react";
import s from "../styles/Analytics.module.scss";
import { Button, Input } from "@/ui";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import {
  OperatorsTable,
  SLAAnalyticsTable,
  SuppliersAnalyticsTable,
} from "./Table";
import StateGrid from "../../finance/components/StateGrid";
import State from "../../dashboard/components/State";
import Schedule from "../../dashboard/components/Schedule";
import ScheduleOrder from "../../dashboard/components/ScheduleOrder";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("operators");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "general", label: "Общая аналитика" },
    { id: "operators", label: "Операторы" },
    { id: "suppliers", label: "Поставщики" },
    { id: "sla", label: "SLA - Аналитика" },
  ];

  const statCards = {
    suppliers: [
      { label: "% подтверждений", value: "20%" },
      { label: "Средний чек", value: "$2,569.00" },
      { label: "Средняя маржа", value: "$269.00" },
      { label: "Скорость ответа (SLA)", value: "2 ч." },
    ],
    sla: [
      { label: "Средний SLA операторов", value: "20 мин." },
      { label: "Средний SLA поставщиков", value: "1 ч." },
      { label: "% просрочек", value: "4%" },
      { label: "Количество нарушений SLA", value: "222" },
    ],
  };

  const handleRowClick = (row) => {
    console.log("Клик на строку:", row);
  };

  return (
    <div className={s.analytics}>
      <div className={s.header}>
        <div className={s.tabs}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "bgblue" : "outline"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className={s.controls}>
          <Button variant="outline" icon={CiFilter}>
            Filter
          </Button>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>
      <div className={s.content}>
        {activeTab === "suppliers" && (
          <div className={s.statsGrid}>
            <StateGrid />
          </div>
        )}
        {activeTab === "sla" && (
          <div className={s.statsGrid}>
            <StateGrid />
          </div>
        )}
        {activeTab === "general" && (
          <div className={s.statsGrid}>
            <State />
          </div>
        )}

        {activeTab === "general" && (
          <div className={s.flex}>
            <Schedule />
            <ScheduleOrder />
          </div>
        )}
        {activeTab === "operators" && (
          <OperatorsTable onRowClick={handleRowClick} />
        )}
        {activeTab === "suppliers" && (
          <SuppliersAnalyticsTable onRowClick={handleRowClick} />
        )}
        {activeTab === "sla" && (
          <SLAAnalyticsTable onRowClick={handleRowClick} />
        )}
      </div>
    </div>
  );
}
