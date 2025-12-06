"use client";
import React, { useState, useMemo } from "react";
import { Modal, Button, Select, UITable, Input } from "@/ui";
import {
  MdWarning,
  MdError,
  MdAccessTime,
  MdCheckCircle,
  MdEscalator,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/ProblematicServices.module.scss";

const PROBLEM_TYPES = [
  { value: "all", label: "Все проблемы" },
  { value: "overdue", label: "Просроченные подтверждения" },
  { value: "no_response", label: "Отсутствие ответа" },
  { value: "tariff_error", label: "Ошибки тарифа" },
  { value: "wrong_docs", label: "Неверные документы" },
  { value: "price_error", label: "Некорректная стоимость" },
  { value: "cancellation", label: "Отмены без причины" },
  { value: "voucher_delay", label: "Задержка ваучеров" },
  { value: "wrong_pnr", label: "Неверные PNR" },
  { value: "duplicate", label: "Дубли бронирований" },
];

const MOCK_PROBLEMATIC_SERVICES = [
  {
    id: "PS-001",
    supplier: "Local DMC Dubai",
    service: "SRV-001",
    order: "ORD-145",
    client: "Иван Петров",
    problemType: "overdue",
    problemLabel: "Просроченное подтверждение",
    severity: "high",
    createdAt: "2025-01-15 10:00",
    overdueBy: "2ч 30м",
    reason: "Нет ответа от поставщика",
    operatorActions: "Отправлено 3 запроса",
    recommended: "Эскалировать поставщику",
  },
  {
    id: "PS-002",
    supplier: "Turkish Airlines",
    service: "SRV-002",
    order: "ORD-144",
    client: "Мария Сидорова",
    problemType: "tariff_error",
    problemLabel: "Ошибка тарифа",
    severity: "critical",
    createdAt: "2025-01-15 09:30",
    overdueBy: null,
    reason: "Неверный тариф в ответе API",
    operatorActions: "Создана корректировка",
    recommended: "Проверить интеграцию",
  },
  {
    id: "PS-003",
    supplier: "Booking.com",
    service: "SRV-003",
    order: "ORD-143",
    client: "Петр Козлов",
    problemType: "wrong_docs",
    problemLabel: "Неверные документы",
    severity: "medium",
    createdAt: "2025-01-15 08:15",
    overdueBy: null,
    reason: "Неверные даты в ваучере",
    operatorActions: "Запрошена корректировка",
    recommended: "Требовать исправление",
  },
];

export default function ProblematicServices({ isOpen, onClose, suppliers }) {
  const [problemFilter, setProblemFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    return MOCK_PROBLEMATIC_SERVICES.filter((service) => {
      const matchesSearch =
        !search ||
        service.supplier.toLowerCase().includes(search.toLowerCase()) ||
        service.order.toLowerCase().includes(search.toLowerCase()) ||
        service.client.toLowerCase().includes(search.toLowerCase());
      const matchesProblem =
        problemFilter === "all" || service.problemType === problemFilter;
      const matchesSeverity =
        severityFilter === "all" || service.severity === severityFilter;

      return matchesSearch && matchesProblem && matchesSeverity;
    });
  }, [search, problemFilter, severityFilter]);

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: { icon: MdError, color: "red", label: "Критично" },
      high: { icon: MdWarning, color: "yellow", label: "Высокий" },
      medium: { icon: MdAccessTime, color: "orange", label: "Средний" },
    };
    return configs[severity] || { icon: MdWarning, color: "gray", label: severity };
  };

  const columns = [
    {
      key: "supplier",
      label: "Поставщик",
      flex: 1.2,
    },
    {
      key: "service",
      label: "Услуга",
      flex: 0.8,
    },
    {
      key: "order",
      label: "Заявка",
      flex: 0.8,
    },
    {
      key: "client",
      label: "Клиент",
      flex: 1,
    },
    {
      key: "problemType",
      label: "Проблема",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.problemCell}>
          <span className={s.problemLabel}>{row.problemLabel}</span>
        </div>
      ),
    },
    {
      key: "severity",
      label: "Критичность",
      flex: 1,
      render: (value) => {
        const config = getSeverityConfig(value);
        const Icon = config.icon;
        return (
          <div className={s.severityCell}>
            <span className={`${s.severityBadge} ${s[`severity-${config.color}`]}`}>
              <Icon size={16} />
              {config.label}
            </span>
          </div>
        );
      },
    },
    {
      key: "reason",
      label: "Причина",
      flex: 1.5,
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button variant="primary" size="sm" icon={MdEscalator}>
            Эскалировать
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      width="1400px"
      title="Проблемные услуги"
    >
      <div className={s.problematicServices}>
        <div className={s.toolbar}>
          <div className={s.filterGroup}>
            <Input
              icon={IoSearchOutline}
              placeholder="Поиск по поставщику, заявке..."
              value={search}
              onChange={setSearch}
              className={s.searchInput}
            />
            <Select
              value={problemFilter}
              onChange={setProblemFilter}
              options={PROBLEM_TYPES}
              size="sm"
            />
            <Select
              value={severityFilter}
              onChange={setSeverityFilter}
              options={[
                { value: "all", label: "Вся критичность" },
                { value: "critical", label: "Критично" },
                { value: "high", label: "Высокий" },
                { value: "medium", label: "Средний" },
              ]}
              size="sm"
            />
          </div>
        </div>

        <div className={s.tableBlock}>
          <UITable
            columns={columns}
            rows={filteredServices}
            showCheckbox={false}
          />
        </div>

        <div className={s.footer}>
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="primary">Экспорт в Excel</Button>
        </div>
      </div>
    </Modal>
  );
}

