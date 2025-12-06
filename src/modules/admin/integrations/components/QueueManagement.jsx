"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Select, UITable } from "@/ui";
import {
  MdPlayArrow,
  MdPause,
  MdDelete,
  MdRefresh,
  MdWarning,
  MdCheckCircle,
  MdAccessTime,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/QueueManagement.module.scss";

const MOCK_QUEUE = [
  {
    id: "TASK-001",
    type: "Выгрузка счёта",
    document: "INV-145",
    organization: "Asia Travel",
    service: "1С",
    priority: "high",
    status: "pending",
    createdAt: "2025-01-15 14:30",
    attempts: 0,
    maxAttempts: 3,
    scheduledAt: "2025-01-15 14:35",
  },
  {
    id: "TASK-002",
    type: "Отправка акта",
    document: "ACT-144",
    organization: "Техносервис",
    service: "Диадок",
    priority: "medium",
    status: "processing",
    createdAt: "2025-01-15 14:28",
    attempts: 1,
    maxAttempts: 3,
    startedAt: "2025-01-15 14:32",
  },
  {
    id: "TASK-003",
    type: "Импорт статуса",
    document: "PAY-143",
    organization: "Asia Travel",
    service: "Эльба",
    priority: "low",
    status: "failed",
    createdAt: "2025-01-15 14:25",
    attempts: 3,
    maxAttempts: 3,
    error: "API timeout",
  },
  {
    id: "TASK-004",
    type: "Синхронизация",
    document: "SYNC-142",
    organization: "Asia Travel",
    service: "1С",
    priority: "high",
    status: "completed",
    createdAt: "2025-01-15 14:20",
    attempts: 1,
    maxAttempts: 3,
    completedAt: "2025-01-15 14:22",
  },
];

export default function QueueManagement() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    organization: "all",
  });

  const filteredTasks = useMemo(() => {
    return MOCK_QUEUE.filter((task) => {
      const matchesSearch =
        !search ||
        task.id.toLowerCase().includes(search.toLowerCase()) ||
        task.document.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;
      const matchesOrg =
        filters.organization === "all" ||
        task.organization === filters.organization;

      return matchesSearch && matchesStatus && matchesPriority && matchesOrg;
    });
  }, [search, filters]);

  const getStatusConfig = (status) => {
    const configs = {
      pending: { icon: MdAccessTime, color: "yellow", label: "Ожидает" },
      processing: { icon: MdRefresh, color: "blue", label: "В обработке" },
      completed: { icon: MdCheckCircle, color: "green", label: "Завершена" },
      failed: { icon: MdWarning, color: "red", label: "Ошибка" },
    };
    return configs[status] || { icon: MdAccessTime, color: "gray", label: status };
  };

  const handleRetry = (task) => {
    console.log("Retrying task:", task.id);
  };

  const handleDelete = (task) => {
    console.log("Deleting task:", task.id);
  };

  const columns = [
    {
      key: "id",
      label: "ID задачи",
      flex: 0.8,
    },
    {
      key: "type",
      label: "Тип",
      flex: 1,
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
      key: "service",
      label: "Сервис",
      flex: 0.8,
    },
    {
      key: "priority",
      label: "Приоритет",
      flex: 0.8,
      render: (value) => (
        <div className={s.priorityCell}>
          <span className={`${s.priorityBadge} ${s[`priority-${value}`]}`}>
            {value === "high" ? "Высокий" : value === "medium" ? "Средний" : "Низкий"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Статус",
      flex: 1,
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
    {
      key: "attempts",
      label: "Попытки",
      flex: 0.8,
      render: (value, row) => (
        <div className={s.attemptsCell}>
          {value}/{row.maxAttempts}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.actionsCell}>
          {row.status === "failed" && (
            <Button
              variant="primary"
              size="sm"
              icon={MdPlayArrow}
              onClick={() => handleRetry(row)}
            >
              Повторить
            </Button>
          )}
          {row.status === "pending" && (
            <Button
              variant="outline"
              size="sm"
              icon={MdPlayArrow}
              onClick={() => handleRetry(row)}
            >
              Запустить
            </Button>
          )}
          {(row.status === "failed" || row.status === "completed") && (
            <Button
              variant="outline"
              size="sm"
              icon={MdDelete}
              onClick={() => handleDelete(row)}
            >
              Удалить
            </Button>
          )}
        </div>
      ),
    },
  ];

  const stats = {
    total: MOCK_QUEUE.length,
    pending: MOCK_QUEUE.filter((t) => t.status === "pending").length,
    processing: MOCK_QUEUE.filter((t) => t.status === "processing").length,
    failed: MOCK_QUEUE.filter((t) => t.status === "failed").length,
  };

  return (
    <div className={s.queueManagement}>
      <div className={s.statsBar}>
        <div className={s.statItem}>
          <span className={s.statLabel}>Всего задач:</span>
          <span className={s.statValue}>{stats.total}</span>
        </div>
        <div className={s.statItem}>
          <span className={s.statLabel}>Ожидают:</span>
          <span className={s.statValue}>{stats.pending}</span>
        </div>
        <div className={s.statItem}>
          <span className={s.statLabel}>В обработке:</span>
          <span className={s.statValue}>{stats.processing}</span>
        </div>
        <div className={s.statItem}>
          <span className={s.statLabel}>Ошибки:</span>
          <span className={`${s.statValue} ${s.statValueError}`}>
            {stats.failed}
          </span>
        </div>
      </div>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, документу..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            options={[
              { value: "all", label: "Все статусы" },
              { value: "pending", label: "Ожидает" },
              { value: "processing", label: "В обработке" },
              { value: "completed", label: "Завершена" },
              { value: "failed", label: "Ошибка" },
            ]}
            size="sm"
          />
          <Select
            value={filters.priority}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, priority: value }))
            }
            options={[
              { value: "all", label: "Все приоритеты" },
              { value: "high", label: "Высокий" },
              { value: "medium", label: "Средний" },
              { value: "low", label: "Низкий" },
            ]}
            size="sm"
          />
          <Select
            value={filters.organization}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, organization: value }))
            }
            options={[
              { value: "all", label: "Все организации" },
              { value: "Asia Travel", label: "Asia Travel" },
              { value: "Техносервис", label: "Техносервис" },
            ]}
            size="sm"
          />
        </div>
        <Button variant="primary" icon={MdRefresh}>
          Обновить очередь
        </Button>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredTasks}
          showCheckbox={false}
        />
      </div>
    </div>
  );
}

