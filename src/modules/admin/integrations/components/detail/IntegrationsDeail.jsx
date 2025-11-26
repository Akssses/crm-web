"use client";
import React, { useState } from "react";
import s from "../../styles/IntegrationsDetail.module.scss";
import { Input, Button, Select, Container } from "@/ui";
import { GrUpdate } from "react-icons/gr";
import {
  IoCloseSharp,
  IoDocumentText,
  IoEyeSharp,
  IoSearchOutline,
} from "react-icons/io5";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { MdEmail, MdMoreVert, MdWatchLater } from "react-icons/md";
import {
  FaCheck,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaUser,
} from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import { LuFilePenLine } from "react-icons/lu";

// Badge компонент
function Badge({ text, color = "green", icon: Icon }) {
  const colors = {
    green: { bg: "#d1fae5", color: "#10b981" },
    red: { bg: "#fee2e2", color: "#ef4444" },
    blue: { bg: "#dbeafe", color: "#3b82f6" },
    yellow: { bg: "#fef3c7", color: "#f59e0b" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: colors[color].bg,
        color: colors[color].color,
        padding: "6px 12px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {Icon && <Icon size={16} />}
      {text}
    </span>
  );
}

// TextField компонент
function TextField({ label, value, helpText, showPassword = false }) {
  const [show, setShow] = useState(false);

  return (
    <div className={s.fieldGroup}>
      <label className={s.fieldLabel}>{label}</label>
      <div className={s.fieldInputWrapper}>
        <Input
          type={showPassword && !show ? "password" : "text"}
          value={value}
          readOnly
          className={s.fieldInput}
        />
        {showPassword && (
          <button className={s.togglePassword} onClick={() => setShow(!show)}>
            {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {helpText && <p className={s.fieldHelpText}>{helpText}</p>}
    </div>
  );
}

// LogRow компонент
function LogRow({
  time,
  docType,
  service,
  status,
  statusColor,
  message,
  actions: Actions,
  icon: Icon,
  check: Check,
}) {
  const statusColors = {
    success: { bg: "#d1fae5", color: "#10b981" },
    error: { bg: "#fee2e2", color: "#ef4444" },
    processing: { bg: "#dbeafe", color: "#3b82f6" },
  };

  const rowStyle =
    statusColor === "error" ? { backgroundColor: "#fef2f2" } : {};

  return (
    <div className={s.logRow} style={rowStyle}>
      <span className={s.logTime}>{time}</span>
      <span className={s.logDocType}>{docType}</span>
      <span className={s.logService}>{service}</span>
      <div>
        <span
          className={s.logStatus}
          style={{
            backgroundColor: statusColors[statusColor].bg,
            color: statusColors[statusColor].color,
          }}
        >
          {Check && <Check size={12} />}
          {status}
        </span>
      </div>
      <span
        className={s.logMessage}
        style={{
          color: statusColor === "error" ? "#ef4444" : "#6b7280",
        }}
      >
        {message}
      </span>
      <div className={s.logActions}>
        {Actions && <Actions size={18} color={"#EA580C"} />}
        {Icon && <Icon size={18} color={"#2563EB"} />}
      </div>
    </div>
  );
}

// TaskCard компонент
function TaskCard({
  title,
  subtitle,
  actions: Actions,
  status,
  statusColor,
  icon: Icon,
}) {
  const colors = {
    processing: {
      bg: "#DBEAFE",
      bgColor: "#fff",
      color: "#3b82f6",
      textColor: "#1e40af",
      border: "#E5E7EB",
    },
    waiting: {
      bg: "#fef3c7",
      bgColor: "#fff",
      color: "#f59e0b",
      textColor: "#b45309",
      border: "#E5E7EB",
    },
    completed: {
      bg: "#d1fae5",
      bgColor: "#F0FDF4",
      color: "#10b981",
      textColor: "#065f46",
      border: "#BBF7D0",
    },
  };

  return (
    <div
      className={s.taskCard}
      style={{
        backgroundColor: colors[statusColor].bgColor,
        borderColor: colors[statusColor].border,
      }}
    >
      <div
        className={s.taskIcon}
        style={{
          color: colors[statusColor].color,
          backgroundColor: colors[statusColor].bg,
        }}
      >
        <Icon size={28} />
      </div>
      <div className={s.taskContent}>
        <h4 className={s.taskTitle}>{title}</h4>
        <p className={s.taskSubtitle}>{subtitle}</p>
      </div>
      <span
        className={s.taskStatus}
        style={{
          color: colors[statusColor].textColor,
          backgroundColor: colors[statusColor].bg,
        }}
      >
        <Actions size={18} /> {status}
      </span>
    </div>
  );
}

// NotificationItem компонент
function NotificationItem({ title, description, toggle = true, role, email }) {
  const [enabled, setEnabled] = useState(toggle);

  return (
    <div className={s.notificationItem}>
      <div className={s.notificationContent}>
        <h4 className={s.notificationTitle}>{title}</h4>
        <p className={s.notificationDescription}>{description}</p>
        <div className={s.notificationRole}>
          <span className={s.roleIcon}>
            <FaUser size={14} />
          </span>
          <span className={s.roleName}>{role}</span>
          <span className={s.roleEmail}>{email}</span>
        </div>
      </div>
      <label className={s.toggle}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <span className={s.toggleSlider}></span>
      </label>
    </div>
  );
}

// AlertItem компонент
function AlertItem({ title, description, role, email, enabled = true }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className={s.alertItem}>
      <div className={s.alertContent}>
        <h4 className={s.alertTitle}>{title}</h4>
        <p className={s.alertDescription}>{description}</p>
        <div className={s.alertRole}>
          <span>
            <FaUser size={14} /> {role}
          </span>
          <div className={s.alertRole}>
            <span>
              <MdEmail size={14} /> {email}
            </span>
          </div>
        </div>
      </div>
      <label className={s.toggle}>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
        <span className={s.toggleSlider}></span>
      </label>
    </div>
  );
}

export default function IntegrationsDetail() {
  const [search, setSearch] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Опции для селектов
  const docTypeOptions = [
    { value: "all", label: "Все типы документов" },
    { value: "invoice", label: "Счет-фактура" },
    { value: "invoice_detail", label: "Счёт" },
    { value: "bill", label: "Накладная" },
    { value: "act", label: "Акт" },
    { value: "upd", label: "УПД" },
  ];

  const serviceOptions = [
    { value: "all", label: "Все сервисы" },
    { value: "edo", label: "ЭДО" },
    { value: "accounting", label: "Бухгалтерия" },
    { value: "bank", label: "Банк" },
    { value: "1c", label: "1С" },
    { value: "ofd", label: "ОФД" },
  ];

  const statusOptions = [
    { value: "all", label: "Все статусы" },
    { value: "success", label: "Успешно" },
    { value: "error", label: "Ошибка" },
    { value: "processing", label: "В процессе" },
    { value: "pending", label: "Ожидание" },
  ];

  return (
    <div className={s.container}>
      <Container size="full">
        <section className={s.section}>
          <h2>Основные параметры</h2>
          <div className={s.fieldsGrid}>
            <div style={{ gridColumn: "1 / -1" }}>
              <TextField
                label="URL шлюза"
                value="https://api.financehub.ru/gateway/v2"
                helpText="Основной адрес API для интеграции"
              />
            </div>

            <div style={{ gridColumn: "1 / 2" }}>
              <TextField
                label="API ключ"
                value="sk_live_••••••••••••••••"
                helpText=""
                showPassword={true}
              />
            </div>
            <div style={{ gridColumn: "2 / -1" }}>
              <TextField
                label="Секретный ключ"
                value="sk_secret_••••••••••••••••"
                helpText=""
                showPassword={true}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <TextField
                label="Callback URL"
                value="https://app.financehub.ru/webhook/callback"
                helpText=""
              />
            </div>
          </div>
        </section>
      </Container>

      <Container size="full">
        <section className={s.section}>
          <h2>Логи и мониторинг</h2>

          <div className={s.flex}>
            <Select
              label=""
              options={docTypeOptions}
              value={selectedDocType}
              onChange={(value) => setSelectedDocType(value)}
              placeholder="Выберите тип"
            />

            <Select
              label=""
              options={serviceOptions}
              value={selectedService}
              onChange={(value) => setSelectedService(value)}
              placeholder="Выберите сервис"
            />

            <Select
              label=""
              options={statusOptions}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
              placeholder="Выберите статус"
            />

            <Input
              label=""
              icon={IoSearchOutline}
              placeholder="Поиск..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className={s.logsTable}>
            <div className={s.logsHeader}>
              <span className={s.colTime}>Время</span>
              <span className={s.colDocType}>Тип документа</span>
              <span className={s.colService}>Сервис</span>
              <span className={s.colStatus}>Статус</span>
              <span className={s.colMessage}>Сообщение</span>
              <span className={s.colActions}>Действия</span>
            </div>

            <div className={s.logsBody}>
              <LogRow
                time="14:32:15"
                docType="Счет-фактура"
                service="ЭДО"
                status="Успешно"
                statusColor="success"
                message="Документ отправлен"
                icon={IoEyeSharp}
                check={FaCheck}
              />
              <LogRow
                time="14:28:42"
                docType="Накладная"
                service="Бухгалтерия"
                status="Ошибка"
                statusColor="error"
                message="Ошибка подключения к API"
                actions={GrUpdate}
                icon={IoEyeSharp}
                check={IoCloseSharp}
              />
              <LogRow
                time="14:25:18"
                docType="Акт"
                service="ЭДО"
                status="Успешно"
                statusColor="success"
                message="Документ подписан"
                actions={GrUpdate}
                icon={IoEyeSharp}
                check={FaCheck}
              />
              <LogRow
                time="14:22:05"
                docType="Счет-фактура"
                service="Банк"
                status="В процессе"
                statusColor="processing"
                message="Ожидание ответа"
                icon={IoEyeSharp}
                check={FiLoader}
              />
              <LogRow
                time="14:18:33"
                docType="Накладная"
                service="ЭДО"
                status="Ошибка"
                statusColor="error"
                message="Истек срок действия ключа ЭЦП"
                actions={GrUpdate}
                icon={IoEyeSharp}
                check={IoCloseSharp}
              />
            </div>
          </div>

          <div className={s.pagination}>
            <span className={s.paginationInfo}>Показано 5 из 50 записей</span>
            <div className={s.paginationButtons}>
              <button className={s.paginationBtn}>
                <FaChevronLeft />
              </button>
              <button className={`${s.paginationBtn} ${s.active}`}>1</button>
              <button className={s.paginationBtn}>2</button>
              <button className={s.paginationBtn}>3</button>
              <button className={s.paginationBtn}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>
      </Container>

      {/* 3. Tasks Section */}
      <Container size="full">
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Очередь задач</h2>

          <div className={s.statsCards}>
            <div
              className={s.statItem}
              style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}
            >
              <div className={s.statLabel}>
                <p style={{ color: "#2563EB" }}>В обработке</p>
                <RiLoader2Fill size={18} color="#2563EB" />
              </div>
              <h3 style={{ color: "#2563EB" }}>12</h3>
            </div>
            <div
              className={s.statItem}
              style={{ backgroundColor: "#FEFCE8", borderColor: "#FEF08A" }}
            >
              <div className={s.statLabel}>
                <p style={{ color: "#713F12" }}>Ожидают</p>
                <MdWatchLater size={18} color="#CA8A04" />
              </div>
              <h3 style={{ color: "#CA8A04" }}>8</h3>
            </div>
            <div
              className={s.statItem}
              style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }}
            >
              <div className={s.statLabel}>
                <p style={{ color: "#14532D" }}>Завершены</p>
                <FaCheckCircle size={18} color="#14532D" />
              </div>
              <h3 style={{ color: "#14532D" }}>247</h3>
            </div>
          </div>

          <div className={s.tasksGrid}>
            <TaskCard
              title="Отправка счета-фактуры #SF-2024-1523"
              subtitle="Контрагент: ООО Альфа Торг • Запущена: 14:35:22"
              status="В обработке"
              statusColor="processing"
              icon={IoDocumentText}
              actions={FiLoader}
            />
            <TaskCard
              title="Отправка накладной #TORG-12-0845"
              subtitle="Контрагент: ИП Сидоров А.В. • Запланирована: 15:00:00"
              status="Ожидает"
              statusColor="waiting"
              icon={FaTruck}
              actions={MdWatchLater}
            />
            <TaskCard
              title="Сверка с бухгалтерией за 13.11.2024"
              subtitle="Автоматическая задача • Запущена: 14:30:15"
              status="В обработке"
              statusColor="processing"
              icon={LuFilePenLine}
              actions={FiLoader}
            />
            <TaskCard
              title="Отправка акта #ACT-2024-0329"
              subtitle="Контрагент: ЗАО Бета Системс • Завершена: 14:25:08"
              status="Завершена"
              statusColor="completed"
              icon={IoDocumentText}
              actions={FaCheck}
            />
          </div>
        </section>
      </Container>

      {/* 4. Critical Alerts Section */}
      <Container size="full">
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Критические уведомления</h2>

          <div className={s.alertsList}>
            <AlertItem
              title="Ошибки интеграции"
              description="Уведомления при критических ошибках в работе с внешними системами"
              role="Бухгалтер"
              email="accountant@company.ru"
              enabled={true}
            />
            <AlertItem
              title="Истечение срока ключа ЭЦП"
              description="Предупреждение за 30 дней до истечения срока действия электронной подписи"
              role="Администратор"
              email="admin@company.ru"
              enabled={true}
            />
            <AlertItem
              title="Разрыв соединения с ЭДО"
              description="Немедленное уведомление при потере связи с системой электронного документооборота"
              role="Супервизор"
              email="supervisor@company.ru"
              enabled={true}
            />
          </div>
        </section>
      </Container>

      {/* 5. Informational Alerts Section */}
      <Container size="full">
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Информационные уведомления</h2>

          <div className={s.notificationsList}>
            <NotificationItem
              title="Завершение задач"
              description="Уведомление о успешном завершении запланированных задач"
              toggle={false}
              role="Все пользователи"
              email=""
            />
            <NotificationItem
              title="Обновления системы"
              description="Уведомления о доступных обновлениях и новых функциях"
              toggle={true}
              role="Администратор"
              email=""
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
