"use client";
import React, { useState } from "react";
import s from "../styles/Analytics.module.scss";
import { Button, Input } from "@/ui";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline, IoDownloadOutline } from "react-icons/io5";
import {
  OperatorsTable,
  SLAAnalyticsTable,
  SuppliersAnalyticsTable,
} from "./Table";
import KPIDashboard from "./KPIDashboard";
import AdvancedFilters from "./AdvancedFilters";
import ExportService from "../utils/ExportService";
import StateGrid from "../../finance/components/StateGrid";
import State from "../../dashboard/components/State";
import Schedule from "../../dashboard/components/Schedule";
import ScheduleOrder from "../../dashboard/components/ScheduleOrder";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("kpi");
  const [search, setSearch] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    datePreset: "this_month",
    dateFrom: "",
    dateTo: "",
    organizations: [],
    operators: [],
    suppliers: [],
    orderTypes: ["all"],
    serviceTypes: ["all"],
    currencies: ["all"],
    serviceStatus: ["all"],
    paymentStatus: ["all"],
  });

  const tabs = [
    { id: "kpi", label: "KPI-панель" },
    { id: "operators", label: "Операторы" },
    { id: "suppliers", label: "Поставщики" },
    { id: "sla", label: "SLA-аналитика" },
    { id: "general", label: "Общая аналитика" },
  ];

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    console.log("Filters applied:", newFilters);
    // TODO: Fetch data with new filters
  };

  const handleExport = () => {
    let data = [];
    let filename = "export";
    let columns = [];

    // Get data based on active tab
    switch (activeTab) {
      case "operators":
        // Mock export data - replace with actual data
        data = [
          { name: "Operator 1", orders: 53, clients: 42, revenue: "330000" },
          { name: "Operator 2", orders: 48, clients: 38, revenue: "290000" },
        ];
        filename = "operators_analytics";
        columns = [
          { key: "name", label: "Оператор" },
          { key: "orders", label: "Заявок" },
          { key: "clients", label: "Заказов" },
          { key: "revenue", label: "Выручка" },
        ];
        break;
        
      case "suppliers":
        data = [
          { name: "Booking", type: "API", orders: 42, confirmations: 10 },
          { name: "Supplier 2", type: "Email", orders: 35, confirmations: 8 },
        ];
        filename = "suppliers_analytics";
        columns = [
          { key: "name", label: "Поставщик" },
          { key: "type", label: "Тип" },
          { key: "orders", label: "Заявок" },
          { key: "confirmations", label: "Подтверждений" },
        ];
        break;
        
      case "sla":
        data = [
          { type: "Оператор", name: "Азгарим", avgSLA: "10 мин.", violations: 10 },
        ];
        filename = "sla_analytics";
        columns = [
          { key: "type", label: "Тип" },
          { key: "name", label: "Имя" },
          { key: "avgSLA", label: "Средний SLA" },
          { key: "violations", label: "Просрочки" },
        ];
        break;
        
      default:
        console.log("No data to export for this tab");
        return;
    }

    // Export to Excel
    const result = ExportService.toExcel(data, filename, { columns });
    
    if (result.success) {
      console.log(`Exported successfully: ${result.filename}`);
    } else {
      console.error(`Export failed: ${result.error}`);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.organizations?.length > 0) count++;
    if (filters.operators?.length > 0) count++;
    if (filters.suppliers?.length > 0) count++;
    if (!filters.orderTypes.includes("all")) count++;
    if (!filters.serviceTypes.includes("all")) count++;
    if (!filters.currencies.includes("all")) count++;
    if (!filters.serviceStatus.includes("all")) count++;
    if (!filters.paymentStatus.includes("all")) count++;
    return count;
  };

 const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    // TODO: Open detail modal
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
          <Button 
            variant="outline" 
            icon={CiFilter}
            onClick={() => setIsFilterModalOpen(true)}
          >
            Фильтры
            {getActiveFilterCount() > 0 && (
              <span className={s.filterBadge}>{getActiveFilterCount()}</span>
            )}
          </Button>
          {activeTab !== "kpi" && activeTab !== "general" && (
            <Button 
              variant="outline" 
              icon={IoDownloadOutline}
              onClick={handleExport}
            >
              Экспорт
            </Button>
          )}
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>

      <div className={s.content}>
        {activeTab === "kpi" && <KPIDashboard />}

        {activeTab === "suppliers" && (
          <>
            <div className={s.statsGrid}>
              <StateGrid />
            </div>
            <SuppliersAnalyticsTable onRowClick={handleRowClick} />
          </>
        )}

        {activeTab === "sla" && (
          <>
            <div className={s.statsGrid}>
              <StateGrid />
            </div>
            <SLAAnalyticsTable onRowClick={handleRowClick} />
          </>
        )}

        {activeTab === "general" && (
          <>
            <div className={s.statsGrid}>
              <State />
            </div>
            <div className={s.flex}>
              <Schedule />
              <ScheduleOrder />
            </div>
          </>
        )}

        {activeTab === "operators" && (
          <OperatorsTable onRowClick={handleRowClick} />
        )}
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
