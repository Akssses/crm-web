"use client";
import React, { useState } from "react";
import { Button, Input, Select, UITable } from "@/ui";
import {
  MdRefresh,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdSync,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/DiagnosticsPanel.module.scss";

const MOCK_SERVICES = [
  {
    name: "1С",
    status: "online",
    responseTime: 245,
    lastCheck: "2025-01-15 15:30",
    uptime: "99.9%",
  },
  {
    name: "Диадок",
    status: "online",
    responseTime: 180,
    lastCheck: "2025-01-15 15:30",
    uptime: "99.5%",
  },
  {
    name: "Эльба",
    status: "slow",
    responseTime: 3500,
    lastCheck: "2025-01-15 15:30",
    uptime: "98.2%",
  },
];

const MOCK_DISCREPANCIES = [
  {
    id: "DISC-001",
    type: "Сумма не совпадает",
    document: "INV-145",
    organization: "Asia Travel",
    crmValue: "12,500 USD",
    externalValue: "12,000 USD",
    difference: "-500 USD",
    detectedAt: "2025-01-15 14:30",
    status: "pending",
  },
  {
    id: "DISC-002",
    type: "Отсутствует акт",
    document: "ACT-144",
    organization: "Техносервис",
    crmValue: "Есть",
    externalValue: "Отсутствует",
    difference: "—",
    detectedAt: "2025-01-15 14:25",
    status: "resolved",
  },
  {
    id: "DISC-003",
    type: "Статус оплаты",
    document: "PAY-143",
    organization: "Asia Travel",
    crmValue: "Не оплачен",
    externalValue: "Оплачен",
    difference: "—",
    detectedAt: "2025-01-15 14:20",
    status: "pending",
  },
];

export default function DiagnosticsPanel() {
  const [activeTab, setActiveTab] = useState("services");
  const [search, setSearch] = useState("");

  return (
    <div className={s.diagnosticsPanel}>
      <div className={s.tabs}>
        <button
          className={`${s.tab} ${activeTab === "services" ? s.active : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Состояние сервисов
        </button>
        <button
          className={`${s.tab} ${activeTab === "discrepancies" ? s.active : ""}`}
          onClick={() => setActiveTab("discrepancies")}
        >
          Расхождения данных
        </button>
        <button
          className={`${s.tab} ${activeTab === "metrics" ? s.active : ""}`}
          onClick={() => setActiveTab("metrics")}
        >
          Метрики
        </button>
      </div>

      <div className={s.content}>
        {activeTab === "services" && <ServicesStatus services={MOCK_SERVICES} />}
        {activeTab === "discrepancies" && (
          <DiscrepanciesList discrepancies={MOCK_DISCREPANCIES} search={search} />
        )}
        {activeTab === "metrics" && <MetricsView />}
      </div>
    </div>
  );
}

function ServicesStatus({ services }) {
  const getStatusConfig = (status) => {
    const configs = {
      online: { icon: MdCheckCircle, color: "green", label: "Онлайн" },
      offline: { icon: MdError, color: "red", label: "Офлайн" },
      slow: { icon: MdWarning, color: "yellow", label: "Медленно" },
    };
    return configs[status] || { icon: MdError, color: "gray", label: status };
  };

  return (
    <div className={s.servicesStatus}>
      <div className={s.servicesList}>
        {services.map((service, idx) => {
          const config = getStatusConfig(service.status);
          const Icon = config.icon;
          return (
            <div key={idx} className={s.serviceCard}>
              <div className={s.serviceHeader}>
                <h4 className={s.serviceName}>{service.name}</h4>
                <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
                  <Icon size={12} />
                  {config.label}
                </span>
              </div>
              <div className={s.serviceMetrics}>
                <div className={s.metric}>
                  <span className={s.metricLabel}>Время ответа:</span>
                  <span className={s.metricValue}>
                    {service.responseTime}ms
                  </span>
                </div>
                <div className={s.metric}>
                  <span className={s.metricLabel}>Uptime:</span>
                  <span className={s.metricValue}>{service.uptime}</span>
                </div>
                <div className={s.metric}>
                  <span className={s.metricLabel}>Последняя проверка:</span>
                  <span className={s.metricValue}>{service.lastCheck}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={s.actions}>
        <Button variant="primary" icon={MdRefresh}>
          Проверить все сервисы
        </Button>
      </div>
    </div>
  );
}

function DiscrepanciesList({ discrepancies, search }) {
  const filtered = discrepancies.filter(
    (d) =>
      !search ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.document.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusConfig = (status) => {
    return status === "resolved"
      ? { icon: MdCheckCircle, color: "green", label: "Исправлено" }
      : { icon: MdWarning, color: "yellow", label: "Ожидает" };
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      flex: 0.8,
    },
    {
      key: "type",
      label: "Тип расхождения",
      flex: 1.2,
    },
    {
      key: "document",
      label: "Документ",
      flex: 0.8,
    },
    {
      key: "organization",
      label: "Организация",
      flex: 1,
    },
    {
      key: "crmValue",
      label: "Значение в CRM",
      flex: 1,
    },
    {
      key: "externalValue",
      label: "Значение во внешней системе",
      flex: 1.2,
    },
    {
      key: "difference",
      label: "Разница",
      flex: 0.8,
    },
    {
      key: "status",
      label: "Статус",
      flex: 0.8,
      render: (value) => {
        const config = getStatusConfig(value);
        const Icon = config.icon;
        return (
          <div className={s.statusCell}>
            <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
              <Icon size={16} />
              {config.label}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className={s.discrepanciesList}>
      <div className={s.toolbar}>
        <Input
          icon={IoSearchOutline}
          placeholder="Поиск по ID, документу..."
          value={search}
          onChange={() => {}}
          className={s.searchInput}
        />
        <Button variant="primary" icon={MdSync}>
          Запустить сверку
        </Button>
      </div>
      <div className={s.tableBlock}>
        <UITable columns={columns} rows={filtered} showCheckbox={false} />
      </div>
    </div>
  );
}

function MetricsView() {
  return (
    <div className={s.metricsView}>
      <div className={s.metricsGrid}>
        <div className={s.metricCard}>
          <h4 className={s.metricTitle}>Скорость обработки</h4>
          <p className={s.metricValue}>245 мс</p>
          <p className={s.metricSublabel}>Среднее время ответа</p>
        </div>
        <div className={s.metricCard}>
          <h4 className={s.metricTitle}>Ошибок за период</h4>
          <p className={s.metricValue}>3</p>
          <p className={s.metricSublabel}>За последние 24 часа</p>
        </div>
        <div className={s.metricCard}>
          <h4 className={s.metricTitle}>SLA интеграции</h4>
          <p className={s.metricValue}>99.2%</p>
          <p className={s.metricSublabel}>За последний месяц</p>
        </div>
        <div className={s.metricCard}>
          <h4 className={s.metricTitle}>Обработано документов</h4>
          <p className={s.metricValue}>1,243</p>
          <p className={s.metricSublabel}>За сегодня</p>
        </div>
      </div>
    </div>
  );
}

