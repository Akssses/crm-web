"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Container, Button } from "@/ui";
import { useRouter } from "next/navigation";
import { MdOutlineChat } from "react-icons/md";
import s from "../styles/MyRequests.module.scss";

const STATUS_TONES = {
  "Ожидает клиента": "warning",
  Черновик: "muted",
  Просрочено: "danger",
};

const REQUESTS = [
  {
    id: "REQ-1247",
    company: 'ООО "Техносервис"',
    status: "В работе",
    description: "Настройка сетевого оборудования",
    createdAt: "2025-10-25T08:00:00Z",
    slaDeadline: "2025-10-25T12:40:00Z",
    organizationId: "techno",
    priority: "critical",
    tags: ["VIP", "Сложный маршрут"],
  },
  {
    id: "REQ-1252",
    company: 'ООО "Ром"',
    status: "Ожидает клиента",
    description: "Подбор вариантов перелёта",
    createdAt: "2025-10-25T09:30:00Z",
    slaDeadline: "2025-10-25T14:00:00Z",
    organizationId: "rom",
    priority: "warning",
    tags: ["Документы"],
  },
  {
    id: "REQ-1260",
    company: "ПСЦ Тревел Хаб",
    status: "В работе",
    description: "Бронирование отеля для делегации",
    createdAt: "2025-10-24T17:10:00Z",
    slaDeadline: "2025-10-25T10:00:00Z",
    organizationId: "psc",
    priority: "danger",
    tags: ["Срочно", "Холд в отеле"],
  },
  {
    id: "REQ-1271",
    company: 'ООО "Техносервис"',
    status: "Черновик",
    description: "Запрос на корпоративный трансфер",
    createdAt: "2025-10-25T10:20:00Z",
    slaDeadline: "2025-10-26T08:00:00Z",
    organizationId: "techno",
    priority: "normal",
    tags: [],
  },
];

const STATUS_FILTERS = [
  { value: "all", label: "Все" },
  { value: "critical", label: "Критичные" },
  { value: "В работе", label: "В работе" },
  { value: "Ожидает клиента", label: "Ожидают" },
];

const getPeriodStart = (period) => {
  const now = new Date();
  const start = new Date(now);
  if (period === "today") {
    start.setHours(0, 0, 0, 0);
  } else if (period === "week") {
    start.setDate(now.getDate() - 7);
  } else if (period === "month") {
    start.setMonth(now.getMonth() - 1);
  } else if (period === "quarter") {
    start.setMonth(now.getMonth() - 3);
  } else {
    start.setFullYear(2020);
  }
  return start;
};

const formatRemaining = (ms) => {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours} ч ${minutes} м`;
  }
  return `${minutes} мин`;
};

export default function MyRequests({
  filters = { period: "week", organization: "all" },
}) {
  const router = useRouter();
  const [now, setNow] = useState(Date.now());
  const [activeStatus, setActiveStatus] = useState("all");

  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const periodStart = useMemo(
    () => getPeriodStart(filters.period),
    [filters.period]
  );

  const filteredRequests = useMemo(() => {
    return REQUESTS.filter((request) => {
      const matchesOrganization =
        filters.organization === "all" ||
        request.organizationId === filters.organization;
      const matchesPeriod = new Date(request.createdAt) >= periodStart;
      const matchesStatus =
        activeStatus === "all"
          ? true
          : activeStatus === "critical"
          ? request.priority === "critical" || request.priority === "danger"
          : request.status === activeStatus;

      return matchesOrganization && matchesPeriod && matchesStatus;
    });
  }, [filters.organization, periodStart, activeStatus]);

  const handleOpenRequest = (id) => {
    router.push(`/operator/requests/${id}`);
  };

  const handleOpenChat = (id) => {
    router.push(`/operator/chat?request=${id}`);
  };

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <div>
          <h3 className={s.title}>Мои заявки</h3>
          <p className={s.subtitle}>SLA обновляются в реальном времени</p>
        </div>
        <Button
          variant="bgblue"
          size="sm"
          onClick={() => router.push("/operator/requests")}
        >
          Открыть все заявки
        </Button>
      </div>

      <div className={s.filters}>
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`${s.filterChip} ${
              activeStatus === filter.value ? s.active : ""
            }`}
            onClick={() => setActiveStatus(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={s.list}>
        {filteredRequests.map((request) => {
          const deadline = new Date(request.slaDeadline).getTime();
          const created = new Date(request.createdAt).getTime();
          const totalSlaDuration = deadline - created;
          const remainingMs = deadline - now;
          const elapsed = Math.max(
            0,
            Math.min(totalSlaDuration, totalSlaDuration - remainingMs)
          );
          const progress = Math.min(
            100,
            Math.round((elapsed / totalSlaDuration) * 100)
          );
          const isOverdue = remainingMs <= 0;
          const isCritical =
            request.priority === "critical" || request.priority === "danger";

          const statusTone = STATUS_TONES[request.status];

          return (
            <div key={request.id} className={s.itemCard}>
              <button
                type="button"
                className={`${s.item} ${isCritical ? s.critical : ""} ${
                  isOverdue ? s.overdue : ""
                }`}
                onClick={() => handleOpenRequest(request.id)}
              >
                <div className={s.itemHeader}>
                  <div className={s.companyBlock}>
                    <span className={s.company}>{request.company}</span>
                    <span
                      className={`${s.status} ${
                        statusTone
                          ? s[
                              `status${
                                statusTone.charAt(0).toUpperCase() +
                                statusTone.slice(1)
                              }`
                            ]
                          : ""
                      }`}
                    >
                      {request.status}
                    </span>
                    {request.tags.length > 0 && (
                      <div className={s.tags}>
                        {request.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className={s.requestId}>{request.id}</span>
                </div>

                <p className={s.description}>{request.description}</p>

                <div className={s.slaRow}>
                  <div className={s.progress}>
                    <div className={s.progressTrack}>
                      <div
                        className={s.progressValue}
                        style={{ width: `${isOverdue ? 100 : progress}%` }}
                      />
                    </div>
                    <span className={s.progressLabel}>
                      {isOverdue
                        ? `Просрочено на ${formatRemaining(
                            Math.abs(remainingMs)
                          )}`
                        : `Осталось ${formatRemaining(remainingMs)}`}
                    </span>
                  </div>
                  <span className={s.createdAt}>
                    Создано{" "}
                    {new Date(request.createdAt).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </button>

              <div className={s.cardActions}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={MdOutlineChat}
                  onClick={() => handleOpenChat(request.id)}
                >
                  В чат
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenRequest(request.id)}
                >
                  В заявку
                </Button>
              </div>
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className={s.empty}>
            По текущим фильтрам нет заявок. Попробуйте изменить условия.
          </div>
        )}
      </div>
    </Container>
  );
}
