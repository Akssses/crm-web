"use client";

import React from "react";
import s from "../styles/Dashboard.module.scss";
import { Container, Statcard, Chart, UITable } from "@/ui";
import {
  MdWarning,
  MdPeople,
  MdError,
  MdAssignment,
  MdTimer,
  MdOutlinePendingActions,
  MdBugReport,
} from "react-icons/md";
import { TbBolt, TbClockExclamation } from "react-icons/tb";

const TEAM_KPI_CARDS = [
  {
    id: "activeRequests",
    title: "Активные заявки команды",
    value: "86",
    trend: "up",
    change: 5.2,
    icon: MdAssignment,
  },
  {
    id: "unassignedRequests",
    title: "Заявки без оператора",
    value: "9",
    trend: "up",
    change: 2.1,
    color: "#f97316",
    icon: MdPeople,
  },
  {
    id: "overdueRequests",
    title: "Просроченные заявки",
    value: "14",
    trend: "up",
    change: 1.7,
    color: "#ef4444",
    icon: MdWarning,
  },
  {
    id: "onSupplier",
    title: "Услуги на поставщике",
    value: "27",
    trend: "down",
    change: 3.4,
    icon: MdAssignment,
  },
  {
    id: "needApproval",
    title: "Требуют согласования",
    value: "11",
    trend: "up",
    change: 4.1,
    icon: MdOutlinePendingActions,
  },
  {
    id: "slaRisk",
    title: "SLA на грани срыва",
    value: "6",
    trend: "up",
    change: 1.2,
    color: "#facc15",
    icon: MdTimer,
  },
  {
    id: "slaFailedPercent",
    title: "Невыполненные SLA",
    value: "8.5%",
    trend: "down",
    change: 0.8,
    icon: MdTimer,
  },
  {
    id: "integrationErrors",
    title: "Ошибки интеграций",
    value: "4",
    trend: "up",
    change: 0.5,
    color: "#dc2626",
    icon: MdBugReport,
  },
];

const HEATMAP_COLUMNS = [
  { key: "operator", label: "Оператор" },
  { key: "status", label: "Статус" },
  { key: "active", label: "Активных заявок" },
  { key: "sla", label: "SLA" },
  { key: "load", label: "Нагрузка" },
];

const HEATMAP_ROWS = [
  {
    id: 1,
    operator: "Анна Смирнова",
    status: "Онлайн",
    statusColor: "green",
    active: 18,
    sla: "96%",
    loadLevel: "high",
  },
  {
    id: 2,
    operator: "Иван Петров",
    status: "В смене",
    statusColor: "blue",
    active: 12,
    sla: "91%",
    loadLevel: "medium",
  },
  {
    id: 3,
    operator: "Мария Иванова",
    status: "Перерыв",
    statusColor: "yellow",
    active: 4,
    sla: "89%",
    loadLevel: "low",
  },
  {
    id: 4,
    operator: "Олег Кузнецов",
    status: "Оффлайн",
    statusColor: "gray",
    active: 0,
    sla: "—",
    loadLevel: "idle",
  },
];

const CRITICAL_TASKS_COLUMNS = [
  { key: "type", label: "Тип" },
  { key: "title", label: "Задача" },
  { key: "owner", label: "Ответственный" },
  { key: "deadline", label: "Дедлайн" },
  { key: "priority", label: "Приоритет" },
];

const CRITICAL_TASKS_ROWS = [
  {
    id: 1,
    type: "SLA",
    title: "SLA по заказу ORD-120 на грани срыва",
    owner: "Анна Смирнова",
    deadline: "Сегодня, 15:30",
    priority: "Критично",
  },
  {
    id: 2,
    type: "Интеграция",
    title: "Ошибка синхронизации с Booking API",
    owner: "Техподдержка / дежурный",
    deadline: "Сегодня, 16:00",
    priority: "Высокий",
  },
  {
    id: 3,
    type: "Поставщик",
    title: "Нет подтверждения по туру в Дубай",
    owner: "Иван Петров",
    deadline: "Сегодня, 17:15",
    priority: "Высокий",
  },
];

export default function SupervisorDashboard() {
  return (
    <div className={s.supervisorDashboard}>
      <section className={s.kpiSection}>
        <div className={s.kpiGrid}>
          {TEAM_KPI_CARDS.map((card) => (
            <Statcard
              key={card.id}
              icon={card.icon}
              title={card.title}
              unit={card.value}
              trend={card.trend}
              change={card.change}
              color={card.color}
            />
          ))}
        </div>
      </section>

      <section className={s.loadSection}>
        <Container size="full">
          <div className={s.loadHeader}>
            <h2 className={s.sectionTitle}>Мониторинг нагрузки команды</h2>
            <div className={s.loadBadges}>
              <span className={s.badge}>
                <MdPeople /> Всего заявок за день: 124
              </span>
              <span className={s.badge}>
                <TbClockExclamation /> В просрочке: 14
              </span>
              <span className={s.badge}>
                <MdError /> Ошибки интеграций: 4
              </span>
            </div>
          </div>
          <div className={s.loadContent}>
            <div className={s.chartCard}>
              <h3>Динамика входящих и обработанных заявок</h3>
              <Chart />
            </div>
            <div className={s.chartCard}>
              <h3>Загрузка операторов по времени (heatmap)</h3>
              <Chart />
            </div>
          </div>
        </Container>
      </section>

      <section className={s.operatorsSection}>
        <Container size="full">
          <h2 className={s.sectionTitle}>
            Состояние операторов и heatmap нагрузки
          </h2>
          <UITable
            columns={HEATMAP_COLUMNS}
            rows={HEATMAP_ROWS.map((row) => ({
              ...row,
              status: (
                <span className={s[`status-${row.statusColor}`]}>
                  {row.status}
                </span>
              ),
              load: (
                <span className={s[`load-${row.loadLevel}`]}>
                  {row.loadLevel === "high"
                    ? "Высокая"
                    : row.loadLevel === "medium"
                    ? "Средняя"
                    : row.loadLevel === "low"
                    ? "Низкая"
                    : "Нет нагрузки"}
                </span>
              ),
            }))}
            showCheckbox={false}
          />
        </Container>
      </section>

      <section className={s.criticalSection}>
        <Container size="full">
          <h2 className={s.sectionTitle}>
            <TbBolt /> Критические задачи и риски
          </h2>
          <UITable
            columns={CRITICAL_TASKS_COLUMNS}
            rows={CRITICAL_TASKS_ROWS}
            showCheckbox={false}
          />
        </Container>
      </section>
    </div>
  );
}
