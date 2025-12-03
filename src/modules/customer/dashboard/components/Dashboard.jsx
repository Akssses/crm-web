"use client";

import React, { useMemo, useState } from "react";
import s from "../styles/Dashboard.module.scss";
import { Button, Select, Statcard, Container } from "@/ui";
import {
  MdAdd,
  MdCalendarToday,
  MdWarningAmber,
  MdOutlineReceiptLong,
  MdOutlineFlightTakeoff,
  MdOutlinePersonSearch,
} from "react-icons/md";

const PERIOD_OPTIONS = [
  { value: "month", label: "Месяц" },
  { value: "quarter", label: "Квартал" },
  { value: "year", label: "Год" },
];

const MOCK_FILTERS = {
  employees: [
    { value: "all", label: "Все сотрудники" },
    { value: "you", label: "Только мои заявки" },
    { value: "top-risk", label: "С высоким риском" },
  ],
  services: [
    { value: "all", label: "Все услуги" },
    { value: "air", label: "Авиа" },
    { value: "hotel", label: "Отели" },
    { value: "rail", label: "Ж/д" },
    { value: "transfer", label: "Трансфер" },
    { value: "insurance", label: "Страхование" },
  ],
  statuses: [
    { value: "all", label: "Все статусы" },
    { value: "need-approval", label: "Требуют согласования" },
    { value: "in-progress", label: "В работе" },
    { value: "overdue", label: "Просроченные" },
  ],
};

const KPI_CARDS = [
  {
    id: "active-requests",
    title: "Активные заявки",
    unit: "24",
    change: 3.2,
    trend: "up",
    icon: MdOutlineReceiptLong,
  },
  {
    id: "awaiting-approval",
    title: "Ожидают согласования",
    unit: "7",
    change: 1.1,
    trend: "up",
    icon: MdOutlinePersonSearch,
    color: "#f59e0b",
  },
  {
    id: "in-progress",
    title: "В работе у оператора",
    unit: "12",
    change: -0.8,
    trend: "down",
    icon: MdOutlineFlightTakeoff,
  },
  {
    id: "overdue-docs",
    title: "Просроченные документы",
    unit: "3",
    change: 0.5,
    trend: "up",
    icon: MdWarningAmber,
    color: "#ef4444",
  },
];

const KPI_SECONDARY = [
  {
    id: "ready-docs",
    label: "Готовые документы",
    value: "32",
  },
  {
    id: "upcoming-trips",
    label: "Предстоящие поездки (30 дн.)",
    value: "18",
  },
  {
    id: "employees-on-trip",
    label: "Сотрудников в командировке сейчас",
    value: "6",
  },
];

const MOCK_TIMELINE = [
  {
    id: 1,
    employee: "Иванов Игорь",
    route: "Москва — Берлин",
    dates: "12–16 дек",
    status: "Все подтверждено",
    statusType: "success",
    details: "Билеты и отель подтверждены, страховка оформлена",
  },
  {
    id: 2,
    employee: "Петрова Анна",
    route: "Санкт‑Петербург — Париж",
    dates: "18–22 дек",
    status: "Нет визы",
    statusType: "danger",
    details: "Не загружены документы для визы",
  },
  {
    id: 3,
    employee: "Сидоров Максим",
    route: "Москва — Казань",
    dates: "20–21 дек",
    status: "Нет паспорта",
    statusType: "warning",
    details: "Не загружен паспорт, срок — до 15 дек",
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "document-ready",
    title: "Готовы билеты по заявке #1542",
    description: "Москва — Берлин, Иванов Игорь",
    badge: "Готово к поездке",
    severity: "success",
  },
  {
    id: 2,
    type: "need-upload",
    title: "Необходимо загрузить паспорт",
    description: "Заявка #1588, Петрова Анна",
    badge: "Документы",
    severity: "warning",
  },
  {
    id: 3,
    type: "need-approval",
    title: "Требуется согласование заявки",
    description: "Заявка #1601, бюджет выше лимита на 12%",
    badge: "Согласование",
    severity: "danger",
  },
];

const MOCK_REQUESTS = [
  {
    id: "REQ-1542",
    employee: "Иванов Игорь",
    dates: "12–16 дек",
    status: "Готово к поездке",
    statusType: "success",
    supplier: "Аэрофлот / Radisson",
  },
  {
    id: "REQ-1588",
    employee: "Петрова Анна",
    dates: "18–22 дек",
    status: "Ожидает загрузки документов",
    statusType: "warning",
    supplier: "Air France / Ibis",
  },
  {
    id: "REQ-1601",
    employee: "Сидоров Максим",
    dates: "20–21 дек",
    status: "Ждёт согласования",
    statusType: "info",
    supplier: "РЖД / Korston",
  },
];

export default function CustomerDashboard() {
  const [filters, setFilters] = useState({
    period: "month",
    employee: "all",
    service: "all",
    status: "all",
  });

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  const handleFilterChange = (next) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  return (
    <div className={s.dashboard}>
      {/* Верхняя строка: фильтры и CTA */}
      <div className={s.filtersRow}>
        <Select
          value={filters.period}
          onChange={(value) => handleFilterChange({ period: value })}
          options={PERIOD_OPTIONS}
          size="sm"
        />
        <Select
          value={filters.employee}
          onChange={(value) => handleFilterChange({ employee: value })}
          options={MOCK_FILTERS.employees}
          size="sm"
        />
        <Select
          value={filters.service}
          onChange={(value) => handleFilterChange({ service: value })}
          options={MOCK_FILTERS.services}
          size="sm"
        />
        <Select
          value={filters.status}
          onChange={(value) => handleFilterChange({ status: value })}
          options={MOCK_FILTERS.statuses}
          size="sm"
        />
        <Button variant="primary" icon={MdAdd} size="sm">
          Создать заявку
        </Button>
      </div>

      {/* Основные KPI компании — на всю ширину */}
      <div>
        <div className={s.kpiGrid}>
          {KPI_CARDS.map((item) => (
            <Statcard
              key={item.id}
              icon={item.icon}
              title={item.unit}
              unit={item.title}
              trend={item.trend}
              change={item.change}
              color={item.color}
            />
          ))}
        </div>
      </div>

      {/* Таймлайн + уведомления */}
      <div className={s.gridTwo}>
        <Container size="full">
          <div className={s.sectionHeaderInline}>
            <div>
              <div className={s.cardTitle}>Таймлайн предстоящих поездок</div>
              <div className={s.cardSubtitle}>
                Командировки, статусы оформления и дедлайны документов
              </div>
            </div>
          </div>
          <div className={s.section}>
            <div className={s.timelineList}>
              {MOCK_TIMELINE.map((item) => (
                <div key={item.id} className={s.timelineItem}>
                  <div
                    className={s.timelineDot}
                    style={{
                      backgroundColor:
                        item.statusType === "success"
                          ? "#22c55e"
                          : item.statusType === "danger"
                          ? "#ef4444"
                          : "#f59e0b",
                    }}
                  />
                  <div className={s.timelineContent}>
                    <div className={s.sectionTitleRow}>
                      <span className={s.highlight}>{item.employee}</span>
                      <span className={s.smallMuted}>{item.dates}</span>
                    </div>
                    <div className={s.timelineMeta}>{item.route}</div>
                    <div className={s.badgeRow}>
                      <span
                        className={`${s.badge} ${
                          item.statusType === "success"
                            ? s.badgeSuccess
                            : item.statusType === "danger"
                            ? s.badgeDanger
                            : s.badgeWarning
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className={s.smallMuted}>{item.details}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        <Container size="full">
          <div className={s.sectionHeaderInline}>
            <div>
              <div className={s.cardTitle}>Уведомления и центр событий</div>
              <div className={s.cardSubtitle}>
                Документы, согласования, просрочки и технические уведомления
              </div>
            </div>
          </div>
          <div className={s.section}>
            <div className={s.list}>
              {MOCK_NOTIFICATIONS.map((n) => (
                <div key={n.id} className={s.listItem}>
                  <div className={s.listMain}>
                    <span className={s.highlight}>{n.title}</span>
                    <span className={s.smallMuted}>{n.description}</span>
                    <div className={s.badgeRow}>
                      <span
                        className={`${s.badge} ${
                          n.severity === "success"
                            ? s.badgeSuccess
                            : n.severity === "danger"
                            ? s.badgeDanger
                            : s.badgeWarning
                        }`}
                      >
                        {n.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Мои заявки */}
      <Container size="full">
        <div className={s.sectionHeaderInline}>
          <div>
            <div className={s.cardTitle}>Мои заявки</div>
            <div className={s.cardSubtitle}>
              Последние 5–10 заявок с быстрым переходом в детализацию
            </div>
          </div>
          <span className={s.link}>Перейти ко всем заявкам</span>
        </div>
        <div className={s.section}>
          <div className={s.list}>
            {MOCK_REQUESTS.map((r) => (
              <div key={r.id} className={s.listItem}>
                <div className={s.listMain}>
                  <span className={s.highlight}>{r.id}</span>
                  <span className={s.smallMuted}>
                    {r.employee} • {r.dates}
                  </span>
                  <div className={s.badgeRow}>
                    <span
                      className={`${s.badge} ${
                        r.statusType === "success"
                          ? s.badgeSuccess
                          : r.statusType === "danger"
                          ? s.badgeDanger
                          : s.badgeWarning
                      }`}
                    >
                      {r.status}
                    </span>
                    <span className={s.smallMuted}>{r.supplier}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
