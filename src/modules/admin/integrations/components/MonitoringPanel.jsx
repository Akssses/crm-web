"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Modal, Select, UITable } from "@/ui";
import {
  MdRefresh,
  MdError,
  MdCheckCircle,
  MdWarning,
  MdInfoOutline,
  MdVisibility,
  MdReplay,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/MonitoringPanel.module.scss";

const MOCK_LOGS = [
  {
    id: "LOG-001",
    timestamp: "2025-01-15 14:32:15",
    organization: "Asia Travel",
    service: "1С",
    scenario: "Выставление счета",
    status: "success",
    error: null,
    payload: { type: "invoice", id: "INV-145" },
    responseTime: 245,
  },
  {
    id: "LOG-002",
    timestamp: "2025-01-15 14:28:42",
    organization: "Техносервис",
    service: "Диадок",
    scenario: "Передача актов",
    status: "error",
    error: "API timeout: превышено время ожидания ответа",
    payload: { type: "act", id: "ACT-144" },
    responseTime: 5000,
    field: "amount",
    data: { amount: 12500, currency: "USD" },
  },
  {
    id: "LOG-003",
    timestamp: "2025-01-15 14:25:10",
    organization: "Asia Travel",
    service: "Эльба",
    scenario: "Импорт статуса оплаты",
    status: "success",
    error: null,
    payload: { type: "payment", id: "PAY-143" },
    responseTime: 180,
  },
];

export default function MonitoringPanel() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    organization: "all",
    service: "all",
    status: "all",
  });
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter((log) => {
      const matchesSearch =
        !search ||
        log.id.toLowerCase().includes(search.toLowerCase()) ||
        log.scenario.toLowerCase().includes(search.toLowerCase());
      const matchesOrg =
        filters.organization === "all" ||
        log.organization === filters.organization;
      const matchesService =
        filters.service === "all" || log.service === filters.service;
      const matchesStatus =
        filters.status === "all" || log.status === filters.status;

      return matchesSearch && matchesOrg && matchesService && matchesStatus;
    });
  }, [search, filters]);

  const handleRetry = (log) => {
    console.log("Retrying log:", log.id);
  };

  const handleViewPayload = (log) => {
    setSelectedLog(log);
  };

  const columns = [
    {
      key: "timestamp",
      label: "Время",
      flex: 1,
      render: (value) => <div className={s.timestampCell}>{value}</div>,
    },
    {
      key: "organization",
      label: "Организация",
      flex: 1,
    },
    {
      key: "service",
      label: "Сервис",
      flex: 1,
    },
    {
      key: "scenario",
      label: "Сценарий",
      flex: 1.2,
    },
    {
      key: "status",
      label: "Статус",
      flex: 0.8,
      render: (value) => {
        const config = {
          success: { icon: MdCheckCircle, color: "green", label: "Успешно" },
          error: { icon: MdError, color: "red", label: "Ошибка" },
          warning: {
            icon: MdWarning,
            color: "yellow",
            label: "Предупреждение",
          },
        }[value] || { icon: MdInfoOutline, color: "gray", label: value };
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
      key: "responseTime",
      label: "Время ответа",
      flex: 0.8,
      render: (value) => <div className={s.responseTimeCell}>{value}ms</div>,
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button
            variant="outline"
            size="sm"
            icon={MdVisibility}
            onClick={() => handleViewPayload(row)}
          >
            Payload
          </Button>
          {row.status === "error" && (
            <Button
              variant="primary"
              size="sm"
              icon={MdReplay}
              onClick={() => handleRetry(row)}
            >
              Повторить
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={s.monitoringPanel}>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, сценарию..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
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
          <Select
            value={filters.service}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, service: value }))
            }
            options={[
              { value: "all", label: "Все сервисы" },
              { value: "1С", label: "1С" },
              { value: "Диадок", label: "Диадок" },
              { value: "Эльба", label: "Эльба" },
            ]}
            size="sm"
          />
          <Select
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            options={[
              { value: "all", label: "Все статусы" },
              { value: "success", label: "Успешно" },
              { value: "error", label: "Ошибка" },
              { value: "warning", label: "Предупреждение" },
            ]}
            size="sm"
          />
        </div>
        <Button variant="outline" icon={MdRefresh}>
          Обновить
        </Button>
      </div>

      <div className={s.tableBlock}>
        <UITable columns={columns} rows={filteredLogs} showCheckbox={false} />
      </div>

      {selectedLog && (
        <PayloadModal
          log={selectedLog}
          isOpen={!!selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
}

function PayloadModal({ log, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="500px"
      title={`Payload: ${log.id}`}
    >
      <div className={s.payloadModal}>
        <div className={s.payloadSection}>
          <h3 className={s.sectionTitle}>Исходящий запрос</h3>
          <pre className={s.payloadCode}>
            {JSON.stringify(log.payload, null, 2)}
          </pre>
        </div>
        {log.error && (
          <div className={s.payloadSection}>
            <h3 className={s.sectionTitle}>Ошибка</h3>
            <div className={s.errorDetails}>
              <p className={s.errorMessage}>{log.error}</p>
              {log.field && (
                <div className={s.errorField}>
                  <span className={s.errorLabel}>Проблемное поле:</span>
                  <span className={s.errorValue}>{log.field}</span>
                </div>
              )}
              {log.data && (
                <div className={s.errorData}>
                  <span className={s.errorLabel}>Данные:</span>
                  <pre className={s.errorDataCode}>
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
        <div className={s.payloadSection}>
          <h3 className={s.sectionTitle}>Диагностика</h3>
          <div className={s.diagnostics}>
            <p className={s.diagnosticText}>
              Рекомендация: Проверьте формат данных в поле "amount". Ожидается
              числовое значение без пробелов.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
