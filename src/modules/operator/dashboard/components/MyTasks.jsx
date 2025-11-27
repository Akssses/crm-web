"use client";

import React, { useMemo, useState } from "react";
import { Container, Checkbox, Button } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import s from "../styles/MyTasks.module.scss";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Доработать маршрут №982",
    description: "Добавить багаж и проверить тарифы",
    due: "2025-10-25T13:00:00Z",
    category: "Заявки",
    status: "assigned",
    critical: true,
  },
  {
    id: 2,
    title: "Ответить в чате SkyJet",
    description: "Клиент ожидает детали по ваучерам",
    due: "2025-10-25T11:30:00Z",
    category: "Чаты",
    status: "in-progress",
    critical: true,
  },
  {
    id: 3,
    title: "Отправить документы по ORD-9821",
    description: "Подгрузить акт и счет в систему",
    due: "2025-10-26T09:00:00Z",
    category: "Документы",
    status: "assigned",
    critical: false,
  },
  {
    id: 4,
    title: "Проверить отчёт о расходах",
    description: "Передать бухгалтерии до вечера",
    due: "2025-10-26T18:00:00Z",
    category: "Финансы",
    status: "awaiting",
    critical: false,
  },
];

const PANEL_TABS = [
  { value: "all", label: "Все" },
  { value: "assigned", label: "Назначено" },
  { value: "in-progress", label: "В работе" },
  { value: "critical", label: "Критично" },
  { value: "completed", label: "Готово" },
];

const formatDueDate = (isoDate) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));

export default function MyTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [activeTab, setActiveTab] = useState("all");

  const summary = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        const isCompleted = completedTasks.has(task.id) || task.status === "completed";
        if (!isCompleted) {
          acc.total += 1;
        } else {
          acc.completed += 1;
        }
        if (task.critical && !isCompleted) acc.critical += 1;
        if (task.status === "assigned" && !isCompleted) acc.assigned += 1;
        if (task.status === "in-progress" && !isCompleted) acc.inProgress += 1;
        return acc;
      },
      { total: 0, critical: 0, assigned: 0, inProgress: 0, completed: 0 }
    );
  }, [tasks, completedTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const isCompleted = completedTasks.has(task.id) || task.status === "completed";
      if (activeTab === "all") return !isCompleted;
      if (activeTab === "completed") return isCompleted;
      if (activeTab === "critical") return task.critical && !isCompleted;
      return task.status === activeTab && !isCompleted;
    });
  }, [activeTab, tasks, completedTasks]);

  const handleToggleTask = (taskId, checked) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(taskId);
      } else {
        next.delete(taskId);
      }
      return next;
    });
  };

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <div>
          <h3 className={s.title}>Мои задачи</h3>
          <p className={s.subtitle}>
            {summary.total} активных • {summary.critical} критичных
          </p>
        </div>
        <Button variant="outline" size="sm">
          Панель задач
        </Button>
      </div>

      <div className={s.panel}>
        {PANEL_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`${s.panelItem} ${activeTab === tab.value ? s.active : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            <span className={s.panelLabel}>{tab.label}</span>
            {tab.value === "critical" && summary.critical > 0 && (
              <span className={s.count}>{summary.critical}</span>
            )}
            {tab.value === "assigned" && summary.assigned > 0 && (
              <span className={s.count}>{summary.assigned}</span>
            )}
            {tab.value === "in-progress" && summary.inProgress > 0 && (
              <span className={s.count}>{summary.inProgress}</span>
            )}
            {tab.value === "completed" && summary.completed > 0 && (
              <span className={s.count}>{summary.completed}</span>
            )}
          </button>
        ))}
      </div>

      <div className={s.list}>
        {filteredTasks.map((task) => {
          const isCompleted = completedTasks.has(task.id) || task.status === "completed";
          return (
            <div
              key={task.id}
              className={`${s.item} ${task.critical ? s.critical : ""} ${
                isCompleted ? s.completed : ""
              }`}
            >
              <div className={s.checkboxWrapper}>
                <Checkbox
                  checked={isCompleted}
                  id={`task-${task.id}`}
                  onChange={(checked) => handleToggleTask(task.id, checked)}
                />
              </div>
              <div className={s.content}>
                <div className={s.taskHeader}>
                  <p className={s.taskTitle}>{task.title}</p>
                  {task.critical && <span className={s.flag}>SLA</span>}
                </div>
                <p className={s.description}>{task.description}</p>
                <div className={s.bottom}>
                  <span className={s.date}>
                    <CiCalendar size={16} />
                    {formatDueDate(task.due)}
                  </span>
                  <span className={s.category}>{task.category}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className={s.empty}>Все задачи выполнены. Отличная работа!</div>
        )}
      </div>
    </Container>
  );
}
