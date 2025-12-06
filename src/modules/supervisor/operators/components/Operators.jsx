"use client";

import React, { useState } from "react";
import { Container, Select, Statcard, Chart, Button, UITable } from "@/ui";
import { OperatorsTable } from "@/modules/admin/reports/components/Table";
import { MdSwapHoriz, MdPeople, MdWarning, MdSpeed } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import s from "@/modules/admin/reports/styles/Analytics.module.scss";

const PERIOD_OPTIONS = [
  { value: "today", label: "Сегодня" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "online", label: "Онлайн" },
  { value: "offline", label: "Оффлайн" },
  { value: "break", label: "Перерыв" },
];

const operatorStatuses = [
  { id: 1, name: "Анна Смирнова", status: "online", activeRequests: 14 },
  { id: 2, name: "Иван Петров", status: "afk", activeRequests: 6 },
  { id: 3, name: "Мария Иванова", status: "offline", activeRequests: 0 },
];

const kpiHistory = [
  { id: 1, label: "SLA соблюдено", value: "94%", delta: "+4%" },
  { id: 2, label: "Ошибка интеграции", value: "2", delta: "-1 (лучше)" },
  { id: 3, label: "Перераспределено заявок", value: "15", delta: "+5" },
];

const reassignmentLogColumns = [
  { key: "date", label: "Дата" },
  { key: "from", label: "От" },
  { key: "to", label: "К" },
  { key: "requests", label: "Заявок" },
  { key: "reason", label: "Причина" },
];

const reassignmentLogRows = [
  { id: 1, date: "04.12 11:40", from: "Мария", to: "Анна", requests: 4, reason: "AFK > 30 мин" },
  { id: 2, date: "03.12 19:05", from: "Олег", to: "Иван", requests: 7, reason: "Смена завершена" },
];

const requestsForReassign = [
  // Заявки Марии Ивановой (offline, 0 активных - но в истории есть)
  { id: "REQ-1205", client: "Asia Travel", service: "Отель", status: "Срочно", owner: "Мария Иванова" },
  { id: "REQ-1211", client: "ООО Техно", service: "Авиа", status: "Просрочка", owner: "Мария Иванова" },
  { id: "REQ-1198", client: "Глобал Тур", service: "Виза + Авиа", status: "В работе", owner: "Мария Иванова" },
  
  // Заявки Ивана Петрова (afk, 6 активных)
  { id: "REQ-1188", client: "Корп. Клиент А", service: "Виза", status: "В работе", owner: "Иван Петров" },
  { id: "REQ-1192", client: "ИП Сидоров", service: "Трансфер", status: "Ожидание", owner: "Иван Петров" },
  { id: "REQ-1199", client: "Эксплорер Групп", service: "Отель", status: "Просрочка", owner: "Иван Петров" },
  { id: "REQ-1203", client: "Бизнес Тревел", service: "Авиа", status: "Срочно", owner: "Иван Петров" },
  { id: "REQ-1207", client: "Тревел Агенси", service: "Пакет", status: "В работе", owner: "Иван Петров" },
  { id: "REQ-1209", client: "Стар Турс", service: "Авиа + Отель", status: "Новая", owner: "Иван Петров" },
  
  // Заявки Анны Смирновой (online, 14 активных)
  { id: "REQ-1201", client: "Мега Корп", service: "Авиа", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1202", client: "ООО Прогресс", service: "Виза", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1204", client: "Технолоджи Инк", service: "Отель", status: "Новая", owner: "Анна Смирнова" },
  { id: "REQ-1206", client: "Консалтинг Групп", service: "Трансфер", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1208", client: "Дизайн Студио", service: "Авиа + Отель", status: "Ожидание", owner: "Анна Смирнова" },
  { id: "REQ-1210", client: "Ритейл Маркет", service: "Виза", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1212", client: "Фуд Компани", service: "Пакет тур", status: "Новая", owner: "Анна Смирнова" },
  { id: "REQ-1213", client: "Инжиниринг Про", service: "Авиа", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1214", client: "Медиа Центр", service: "Отель", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1215", client: "Креатив Лаб", service: "Виза + Авиа", status: "Срочно", owner: "Анна Смирнова" },
  { id: "REQ-1216", client: "Лоджистик Солюшнс", service: "Трансфер", status: "Новая", owner: "Анна Смирнова" },
  { id: "REQ-1217", client: "Финанс Групп", service: "Авиа", status: "В работе", owner: "Анна Смирнова" },
  { id: "REQ-1218", client: "Строй Холдинг", service: "Отель", status: "Ожидание", owner: "Анна Смирнова" },
  { id: "REQ-1219", client: "Авто Трейд", service: "Пакет", status: "В работе", owner: "Анна Смирнова" },
];

export default function SupervisorOperators() {
  const [period, setPeriod] = useState("today");
  const [status, setStatus] = useState("all");
  const [fromOperator, setFromOperator] = useState("");
  const [toOperator, setToOperator] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredRequests = fromOperator 
    ? requestsForReassign.filter((req) => req.owner === fromOperator)
    : [];

  const handleMassReassign = () => {
    const selectedRequestIds = selectedRows.map(idx => filteredRequests[idx].id);
    console.log("Reassign requests", selectedRequestIds, "from", fromOperator, "to", toOperator);
  };

  const requestsColumns = [
    { key: "id", label: "ID", width: "100px" },
    { key: "client", label: "Клиент", flex: 1.5 },
    { key: "service", label: "Услуга", flex: 1 },
    { 
      key: "status", 
      label: "Статус",
      width: "120px",
      render: (value) => (
        <span style={{ 
          color: value === "Срочно" || value === "Просрочка" ? "#dc2626" : "#6b7280",
          fontWeight: value === "Срочно" || value === "Просрочка" ? 600 : 400
        }}>
          {value}
        </span>
      )
    },
    { key: "owner", label: "Оператор", flex: 1 },
  ];

  return (
    <div className={s.analytics}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
          <Statcard 
            icon={MdPeople}
            title="Операторов онлайн" 
            unit="12" 
            trend="up" 
            change={1.2}
            color="#22c55e"
          />
          <Statcard 
            icon={FaClock}
            title="Средний SLA" 
            unit="1ч 25м" 
            trend="down" 
            change={5.1}
            color="#f59e0b"
          />
          <Statcard 
            icon={MdWarning}
            title="Просроченных заявок" 
            unit="7" 
            trend="up" 
            change={0.9}
            color="#ef4444"
          />
          <Statcard 
            icon={MdSpeed}
            title="Средняя загрузка" 
            unit="78%" 
            trend="up" 
            change={2.4}
            color="#3b82f6"
          />
        </div>

        <OperatorsTable />

        <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
          <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            {operatorStatuses.map((op) => (
              <div
                key={op.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 16,
                  background: "#fff",
                }}
              >
                <p style={{ fontWeight: 600 }}>{op.name}</p>
                <p
                  style={{
                    color: op.status === "online" ? "#16a34a" : op.status === "afk" ? "#d97706" : "#6b7280",
                    fontSize: 14,
                    margin: "6px 0",
                  }}
                >
                  {op.status === "online" ? "Онлайн" : op.status === "afk" ? "AFK" : "Оффлайн"}
                </p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>
                  Активных заявок: <strong>{op.activeRequests}</strong>
                </p>
              </div>
            ))}
          </section>

          <section
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: 12 }}>История KPI</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {kpiHistory.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: 12,
                    minWidth: 180,
                  }}
                >
                  <p style={{ fontSize: 13, color: "#6b7280" }}>{item.label}</p>
                  <p style={{ fontWeight: 600 }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: "#10b981" }}>{item.delta}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: 12 }}>Массовое перераспределение заявок</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Select
                value={fromOperator}
                onChange={setFromOperator}
                options={[
                  { value: "", label: "От оператора" },
                  ...operatorStatuses.map((o) => ({ value: o.name, label: o.name })),
                ]}
              />
              <Select
                value={toOperator}
                onChange={setToOperator}
                options={[
                  { value: "", label: "К оператору" },
                  ...operatorStatuses.map((o) => ({ value: o.name, label: o.name })),
                ]}
              />
            </div>
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
              Используйте инструмент, чтобы быстро забрать заявки у неактивного оператора и передать активным.
            </p>
            
            {!fromOperator ? (
              <div style={{ 
                marginTop: 16, 
                padding: 24, 
                textAlign: "center",
                background: "#f9fafb",
                borderRadius: 8,
                border: "1px dashed #d1d5db"
              }}>
                <p style={{ color: "#6b7280", fontSize: 14 }}>
                  👆 Выберите оператора, от которого хотите переназначить заявки
                </p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div style={{ 
                marginTop: 16, 
                padding: 24, 
                textAlign: "center",
                background: "#f9fafb",
                borderRadius: 8,
                border: "1px dashed #d1d5db"
              }}>
                <p style={{ color: "#6b7280", fontSize: 14 }}>
                  У оператора "{fromOperator}" нет активных заявок для переназначения
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginTop: 12 }}>
                  <UITable
                    columns={requestsColumns}
                    rows={filteredRequests}
                    showCheckbox={true}
                    enableCardView={false}
                    onSelectionChange={setSelectedRows}
                  />
                </div>
                <Button
                  icon={MdSwapHoriz}
                  onClick={handleMassReassign}
                  disabled={!fromOperator || !toOperator || selectedRows.length === 0}
                  style={{ marginTop: 12 }}
                >
                  Переназначить выбранные заявки ({selectedRows.length})
                </Button>
              </>
            )}
          </section>

          <section
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: 12 }}>Журнал перераспределений</h3>
            <UITable columns={reassignmentLogColumns} rows={reassignmentLogRows} showCheckbox={false} />
          </section>
        </div>
    </div>
  );
}


