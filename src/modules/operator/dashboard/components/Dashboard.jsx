"use client";

import React, { useMemo, useState } from "react";
import s from "../styles/Dashboard.module.scss";
import Header from "./Header";
import State from "./State";
import MyRequests from "./MyRequests";
import MyOrders from "./MyOrders";
import Efficiency from "./Efficiency";
import Notifications from "./Notifications";
import MyTasks from "./MyTasks";

const ORGANIZATIONS = [
  { value: "all", label: "Все организации" },
  { value: "psc", label: "ПСЦ Тревел Хаб" },
  { value: "techno", label: 'ООО "Техносервис"' },
  { value: "rom", label: 'ООО "Ром"' },
];

export default function Dashboard() {
  const [filters, setFilters] = useState({
    period: "quarter",
    organization: "all",
  });

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  const handleFiltersChange = (nextValues) => {
    setFilters((prev) => ({ ...prev, ...nextValues }));
  };

  const handleResetFilters = () => {
    setFilters({ period: "week", organization: "all" });
  };

  return (
    <div className={s.dashboard}>
      <Header
        date={formattedDate}
        filters={filters}
        organizations={ORGANIZATIONS}
        onFiltersChange={handleFiltersChange}
        onResetFilters={handleResetFilters}
      />
      <State filters={filters} />
      <div className={s.firstBlock}>
        <div className={s.firstBlockChildMain}>
          <MyRequests filters={filters} />
          <MyOrders filters={filters} />
        </div>

        <div className={s.secondBlock}>
          <Notifications />
          <MyTasks />
          <Efficiency />
        </div>
      </div>
    </div>
  );
}
