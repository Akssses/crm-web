"use client";
import React from "react";
import StatCard from "@/ui/StatCard/StatCard";
import {
  TbChartLine,
  TbChartArcs,
  TbClock,
  TbUsers,
  TbCurrencyDollar,
  TbBuildingStore,
  TbTarget,
} from "react-icons/tb";
import {
  IoCheckmarkCircle,
  IoTimeOutline,
  IoTrendingUp,
  IoWallet,
} from "react-icons/io5";
import s from "../styles/KPIDashboard.module.scss";

const MOCK_KPI_DATA = {
  conversions: {
    kpToOrder: { value: 68.5, trend: 5.2, previous: 63.3 },
    serviceConfirmation: { value: 92.3, trend: -1.5, previous: 93.8 },
    leadToClient: { value: 45.8, trend: 8.1, previous: 37.7 },
  },
  performance: {
    avgProcessingTime: {
      value: "2ч 15м",
      numeric: 135,
      trend: -12,
      previous: 147,
    },
    slaComplianceOperators: { value: 94.2, trend: 3.1, previous: 91.1 },
    slaComplianceSuppliers: { value: 87.6, trend: -2.4, previous: 90.0 },
    confirmationSpeed: { value: "45м", numeric: 45, trend: -8, previous: 53 },
  },
  financial: {
    totalRevenue: {
      value: "2 450 000 ₽",
      numeric: 2450000,
      trend: 12.5,
      previous: 2178571,
    },
    avgMargin: { value: 18.5, trend: 2.3, previous: 16.2 },
    revenuePerOperator: {
      value: "185 000 ₽",
      numeric: 185000,
      trend: 7.8,
      previous: 171711,
    },
    revenuePerOrg: {
      value: "320 000 ₽",
      numeric: 320000,
      trend: 15.2,
      previous: 277778,
    },
    outstandingDebts: {
      value: "125 000 ₽",
      numeric: 125000,
      trend: -18.5,
      previous: 153374,
    },
  },
  team: {
    avgOrdersPerOperator: { value: 24.5, trend: 4.2, previous: 23.5 },
    teamEfficiency: { value: 88.3, trend: 6.1, previous: 82.2 },
    workloadDistribution: { value: "Сбалансирована", status: "good" },
  },
  suppliers: {
    successRate: { value: 94.8, trend: 2.5, previous: 92.3 },
    avgConfirmationTime: {
      value: "1ч 20м",
      numeric: 80,
      trend: -15,
      previous: 95,
    },
    rejectionRate: { value: 5.2, trend: -1.2, previous: 6.4 },
  },
};

function KPISection({ title, children }) {
  return (
    <div className={s.kpiSection}>
      <h3 className={s.sectionTitle}>{title}</h3>
      <div className={s.kpiGrid}>{children}</div>
    </div>
  );
}

export default function KPIDashboard({ period = "this_month" }) {
  const data = MOCK_KPI_DATA;

  const handleKPIClick = (kpi) => {
    console.log("KPI clicked:", kpi);
    // TODO: Open drill-down modal or navigate to detailed view
  };

  return (
    <div className={s.kpiDashboard}>
      {/* Conversion Metrics */}
      <KPISection title="Метрики конверсии">
        <StatCard
          icon={TbChartArcs}
          title={`${data.conversions.kpToOrder.value}%`}
          unit="КП → Заказ"
          change={data.conversions.kpToOrder.trend}
          trend={data.conversions.kpToOrder.trend > 0 ? "up" : "down"}
          color="#3b82f6"
          onClick={() => handleKPIClick("kpToOrder")}
          ariaLabel="Конверсия коммерческих предложений в заказы"
        />
        <StatCard
          icon={IoCheckmarkCircle}
          title={`${data.conversions.serviceConfirmation.value}%`}
          unit="Услуга → Подтверждение"
          change={Math.abs(data.conversions.serviceConfirmation.trend)}
          trend={data.conversions.serviceConfirmation.trend > 0 ? "up" : "down"}
          color="#10b981"
          onClick={() => handleKPIClick("serviceConfirmation")}
          ariaLabel="Конверсия услуг в подтверждения"
        />
        <StatCard
          icon={TbUsers}
          title={`${data.conversions.leadToClient.value}%`}
          unit="Lead → Клиент"
          change={data.conversions.leadToClient.trend}
          trend={data.conversions.leadToClient.trend > 0 ? "up" : "down"}
          color="#8b5cf6"
          onClick={() => handleKPIClick("leadToClient")}
          ariaLabel="Конверсия лидов в клиентов"
        />
      </KPISection>

      {/* Performance Metrics */}
      <KPISection title="Метрики производительности">
        <StatCard
          icon={TbClock}
          title={data.performance.avgProcessingTime.value}
          unit="Среднее время обработки"
          change={Math.abs(data.performance.avgProcessingTime.trend)}
          trend="down" // Down is good for time
          color="#f59e0b"
          onClick={() => handleKPIClick("avgProcessingTime")}
          ariaLabel="Среднее время обработки заявок"
        />
        <StatCard
          icon={TbTarget}
          title={`${data.performance.slaComplianceOperators.value}%`}
          unit="SLA Операторы"
          change={data.performance.slaComplianceOperators.trend}
          trend={
            data.performance.slaComplianceOperators.trend > 0 ? "up" : "down"
          }
          color="#06b6d4"
          onClick={() => handleKPIClick("slaOperators")}
          ariaLabel="Соблюдение SLA операторами"
        />
        <StatCard
          icon={TbTarget}
          title={`${data.performance.slaComplianceSuppliers.value}%`}
          unit="SLA Поставщики"
          change={Math.abs(data.performance.slaComplianceSuppliers.trend)}
          trend={
            data.performance.slaComplianceSuppliers.trend > 0 ? "up" : "down"
          }
          color="#ec4899"
          onClick={() => handleKPIClick("slaSuppliers")}
          ariaLabel="Соблюдение SLA поставщиками"
        />
        <StatCard
          icon={IoTimeOutline}
          title={data.performance.confirmationSpeed.value}
          unit="Скорость подтверждения"
          change={Math.abs(data.performance.confirmationSpeed.trend)}
          trend="down" // Down is good for time
          color="#14b8a6"
        />
      </KPISection>

      {/* Financial Metrics */}
      <KPISection title="Финансовые метрики">
        <StatCard
          icon={TbCurrencyDollar}
          title={data.financial.totalRevenue.value}
          unit="Общая выручка"
          change={data.financial.totalRevenue.trend}
          trend={data.financial.totalRevenue.trend > 0 ? "up" : "down"}
          color="#10b981"
          onClick={() => handleKPIClick("totalRevenue")}
          ariaLabel="Общая выручка за период"
        />
        <StatCard
          icon={TbChartLine}
          title={`${data.financial.avgMargin.value}%`}
          unit="Средняя маржа"
          change={data.financial.avgMargin.trend}
          trend={data.financial.avgMargin.trend > 0 ? "up" : "down"}
          color="#3b82f6"
          onClick={() => handleKPIClick("avgMargin")}
          ariaLabel="Средняя маржинальность"
        />
        <StatCard
          icon={TbUsers}
          title={data.financial.revenuePerOperator.value}
          unit="Выручка на оператора"
          change={data.financial.revenuePerOperator.trend}
          trend={data.financial.revenuePerOperator.trend > 0 ? "up" : "down"}
          color="#8b5cf6"
        />
        <StatCard
          icon={TbBuildingStore}
          title={data.financial.revenuePerOrg.value}
          unit="Выручка на организацию"
          change={data.financial.revenuePerOrg.trend}
          trend={data.financial.revenuePerOrg.trend > 0 ? "up" : "down"}
          color="#06b6d4"
        />
        <StatCard
          icon={IoWallet}
          title={data.financial.outstandingDebts.value}
          unit="Задолженность"
          change={Math.abs(data.financial.outstandingDebts.trend)}
          trend="down" // Down is good for debts
          color="#ef4444"
          onClick={() => handleKPIClick("debts")}
          ariaLabel="Текущие задолженности"
        />
      </KPISection>

      {/* Team Metrics */}
      <KPISection title="Метрики команды">
        <StatCard
          icon={TbUsers}
          title={data.team.avgOrdersPerOperator.value}
          unit="Заказов на оператора"
          change={data.team.avgOrdersPerOperator.trend}
          trend={data.team.avgOrdersPerOperator.trend > 0 ? "up" : "down"}
          color="#3b82f6"
        />
        <StatCard
          icon={IoTrendingUp}
          title={`${data.team.teamEfficiency.value}%`}
          unit="Эффективность команды"
          change={data.team.teamEfficiency.trend}
          trend={data.team.teamEfficiency.trend > 0 ? "up" : "down"}
          color="#10b981"
          onClick={() => handleKPIClick("teamEfficiency")}
          ariaLabel="Общая эффективность команды"
        />
        <StatCard
          icon={TbTarget}
          title={data.team.workloadDistribution.value}
          unit="Распределение нагрузки"
          change={0}
          trend="up"
          color="#06b6d4"
        />
      </KPISection>

      {/* Supplier Metrics */}
      <KPISection title="Метрики поставщиков">
        <StatCard
          icon={IoCheckmarkCircle}
          title={`${data.suppliers.successRate.value}%`}
          unit="Процент успешности"
          change={data.suppliers.successRate.trend}
          trend={data.suppliers.successRate.trend > 0 ? "up" : "down"}
          color="#10b981"
          onClick={() => handleKPIClick("supplierSuccess")}
          ariaLabel="Процент успешных подтверждений от поставщиков"
        />
        <StatCard
          icon={TbClock}
          title={data.suppliers.avgConfirmationTime.value}
          unit="Время подтверждения"
          change={Math.abs(data.suppliers.avgConfirmationTime.trend)}
          trend="down" // Down is good for time
          color="#f59e0b"
        />
        <StatCard
          icon={TbChartLine}
          title={`${data.suppliers.rejectionRate.value}%`}
          unit="Процент отказов"
          change={Math.abs(data.suppliers.rejectionRate.trend)}
          trend="down" // Down is good for rejections
          color="#ef4444"
        />
      </KPISection>
    </div>
  );
}
