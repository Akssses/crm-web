"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Container, Button, Select, UITable } from "@/ui";
import { 
  FaUser, 
  FaPhone, 
  FaKey, 
  FaEdit, 
  FaSyncAlt, 
  FaStar,
  FaCheckCircle,
  FaLockOpen,
  FaLock
} from "react-icons/fa";
import { 
  MdEmail, 
  MdAssessment, 
  MdClose, 
  MdBlock 
} from "react-icons/md";
import { 
  BsBriefcase, 
  BsBuilding, 
  BsTelegram, 
  BsCalendar, 
  BsGear 
} from "react-icons/bs";
import s from "../styles/EmployeeDetail.module.scss";

const TABS = [
  { id: "main", label: "Основная информация" },
  { id: "docs", label: "Документы сотрудника" },
  { id: "trips", label: "Командировки и заявки" },
  { id: "access", label: "Настройки доступа" },
];

const MOCK_EMPLOYEE = {
  id: "EMP-001",
  fullName: "Алина Максим",
  email: "example@gmail.com",
  phone: "+999 999 999 999",
  position: "Менеджер",
  department: "Отдел продаж",
  role: "manager",
  roleLabel: "Менеджер",
  telegramLinked: false,
  telegramCode: "X8F2-9KQ1",
  registeredAt: "15.11.2024",
  status: "active",
};

const DOCS = [
  {
    id: 1,
    type: "Паспорт РФ",
    category: "Паспорт",
    status: "требуется загрузка",
    statusTone: "required",
    expiresAt: "-",
  },
  {
    id: 2,
    type: "Загранпаспорт",
    category: "Паспорт",
    status: "актуален",
    statusTone: "actual",
    expiresAt: "12.08.2028",
  },
  {
    id: 3,
    type: "Виза Шенген, мульти",
    category: "Виза",
    status: "срок истёк",
    statusTone: "expired",
    expiresAt: "01.09.2024",
  },
  {
    id: 4,
    type: "Медицинская страховка",
    category: "Страховка",
    status: "ожидает проверки",
    statusTone: "pending",
    expiresAt: "01.01.2026",
  },
];

const TRIPS = [
  {
    id: "REQ-2101",
    dates: "20.12.2025 — 24.12.2025",
    services: "Авиа + отель",
    status: "В работе",
    operator: "Айсулуу А.",
    docs: "Билеты, ваучер отеля",
  },
  {
    id: "REQ-2083",
    dates: "01.11.2025 — 05.11.2025",
    services: "Авиа",
    status: "Завершена",
    operator: "Бахыт К.",
    docs: "Билеты",
  },
];

export default function EmployeeDetail() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("main");

  const employee = MOCK_EMPLOYEE;

  const renderStatusPill = () => {
    if (employee.status === "blocked") {
      return (
        <span className={`${s.statusPill} ${s.statusBlocked}`}>
          Доступ заблокирован
        </span>
      );
    }
    if (employee.status === "fired") {
      return <span className={`${s.statusPill} ${s.statusFired}`}>Уволен</span>;
    }
    return (
      <span className={`${s.statusPill} ${s.statusActive}`}>
        Доступ активен
      </span>
    );
  };

  const docsColumns = [
    { key: "category", label: "Тип" },
    { key: "type", label: "Документ" },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => {
        let cls = s.docsStatusActual;
        if (row.statusTone === "expired") cls = s.docsStatusExpired;
        else if (row.statusTone === "required") cls = s.docsStatusRequired;
        else if (row.statusTone === "pending") cls = s.docsStatusPending;
        return <span className={`${s.docsStatusPill} ${cls}`}>{value}</span>;
      },
    },
    { key: "expiresAt", label: "Срок действия" },
  ];

  const tripsColumns = [
    { key: "id", label: "Номер заявки" },
    { key: "dates", label: "Даты поездки" },
    { key: "services", label: "Услуги" },
    { key: "status", label: "Статус заявки" },
    { key: "operator", label: "Оператор" },
    { key: "docs", label: "Документы" },
  ];

  const renderMainTab = () => (
    <div size="full">
      <div className={s.gridTwo}>
        <div className={s.section}>
          <div>
            <div className={s.sectionTitle}>
             Основные данные
            </div>
            <div className={s.sectionDescription}>
              Персональная информация и контактные данные сотрудника
            </div>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Полное имя</span>
            <span className={s.infoValue}>{employee.fullName}</span>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>
              <MdEmail className={s.labelIcon} /> Email адрес
            </span>
            <span className={s.infoValue}>{employee.email}</span>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>
              <FaPhone className={s.labelIcon} /> Номер телефона
            </span>
            <span className={s.infoValue}>{employee.phone}</span>
          </div>
          
          <div className={s.gridTwo}>
            <div className={s.infoRow}>
              <span className={s.infoLabel}>
                <BsBriefcase className={s.labelIcon} /> Должность
              </span>
              <span className={s.infoValue}>{employee.position}</span>
            </div>
            <div className={s.infoRow}>
              <span className={s.infoLabel}>
                <BsBuilding className={s.labelIcon} /> Отдел
              </span>
              <span className={s.infoValue}>{employee.department}</span>
            </div>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>
              <FaKey className={s.labelIcon} /> Роль в системе
            </span>
            <span className={s.infoValue}>{employee.roleLabel}</span>
          </div>
          
          <div className={s.chips}>
            <span className={`${s.chip} ${s.chipPrimary}`}>
              <FaStar className={s.chipIcon} /> {employee.roleLabel}
            </span>
            <span className={s.chip}>
              <BsBuilding className={s.chipIcon} /> {employee.department}
            </span>
          </div>
        </div>

        <div className={s.section}>
          <div>
            <div className={s.sectionTitle}>
              Telegram интеграция
            </div>
            <div className={s.sectionDescription}>
              Подключение к корпоративному боту для уведомлений
            </div>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Статус привязки</span>
            <span className={s.infoValue}>
              {employee.telegramLinked ? (
                <span style={{ color: "#22c55e", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FaCheckCircle /> Привязан
                </span>
              ) : (
                <span style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "6px" }}>
                  <MdClose /> Не привязан
                </span>
              )}
            </span>
          </div>
          
          <div className={s.infoRow}>
            <span className={s.infoLabel}>
              <FaLock className={s.labelIcon} /> Код активации
            </span>
            <span className={s.infoValue} style={{ 
              fontFamily: "monospace", 
              fontSize: "16px",
              letterSpacing: "2px",
              color: "#3b82f6"
            }}>
              {employee.telegramCode}
            </span>
          </div>
          
          <div className={s.actionsRow}>
            <Button variant="primary" size="sm">
              <FaSyncAlt style={{ marginRight: "6px" }} /> Новый код
            </Button>
            <Button variant="outline" size="sm">
              <MdClose style={{ marginRight: "6px" }} /> Сбросить
            </Button>
          </div>
        </div>
      </div>

      
    </div>
  );

  const renderDocsTab = () => (
    <UITable columns={docsColumns} rows={DOCS} showCheckbox={false} />
  );

  const renderTripsTab = () => (
    <div>
      <div className={s.tripsFilters}>
        <Select
          value="all"
          onChange={() => {}}
          options={[
            { value: "all", label: "Все статусы" },
            { value: "active", label: "В работе" },
            { value: "finished", label: "Завершены" },
          ]}
          size="sm"
        />
        <Select
          value="year"
          onChange={() => {}}
          options={[
            { value: "month", label: "За месяц" },
            { value: "quarter", label: "За квартал" },
            { value: "year", label: "За год" },
          ]}
          size="sm"
        />
      </div>
      <UITable columns={tripsColumns} rows={TRIPS} showCheckbox={false} />
    </div>
  );

  const renderAccessTab = () => (
      <div className={s.accessGrid}>
        <div className={s.section}>
          <div>
            <div className={s.sectionTitle}>
              <FaKey className={s.titleIcon} /> Права и разрешения
            </div>
            <div className={s.sectionDescription}>
              Управление доступом к функциям системы
            </div>
          </div>
          
          <div className={s.permissionsList}>
            <div className={s.permissionCard}>
              <div className={s.permissionIcon}>
                <FaEdit />
              </div>
              <div className={s.permissionContent}>
                <div className={s.permissionTitle}>Создание заявок</div>
                <div className={s.permissionDescription}>
                  Доступ к созданию командировок и отдельных услуг
                </div>
              </div>
              <div className={s.toggleSwitch}>
                <div className={`${s.toggle} ${s.toggleActive}`}>
                  <div className={s.toggleKnob}></div>
                </div>
                <span className={s.toggleLabel}>Включено</span>
              </div>
            </div>

            <div className={s.permissionCard}>
              <div className={s.permissionIcon}>
                <FaCheckCircle />
              </div>
              <div className={s.permissionContent}>
                <div className={s.permissionTitle}>Согласование заявок</div>
                <div className={s.permissionDescription}>
                  Получает уведомления и может утверждать заявки коллег
                </div>
              </div>
              <div className={s.toggleSwitch}>
                <div className={`${s.toggle} ${s.toggleActive}`}>
                  <div className={s.toggleKnob}></div>
                </div>
                <span className={s.toggleLabel}>Включено</span>
              </div>
            </div>

            <div className={s.permissionCard}>
              <div className={s.permissionIcon}>
                <FaLock />
              </div>
              <div className={s.permissionContent}>
                <div className={s.permissionTitle}>Просмотр документов</div>
                <div className={s.permissionDescription}>
                  Доступ к документам других сотрудников (только для администраторов)
                </div>
              </div>
              <div className={s.toggleSwitch}>
                <div className={s.toggle}>
                  <div className={s.toggleKnob}></div>
                </div>
                <span className={s.toggleLabel}>Выключено</span>
              </div>
            </div>
          </div>
        </div>

        <div className={s.section}>
          <div>
            <div className={s.sectionTitle}>
              <MdAssessment className={s.titleIcon} /> Лимиты и сегменты
            </div>
            <div className={s.sectionDescription}>
              Ограничения и распределение по отделам
            </div>
          </div>
          
          <div className={s.limitCard}>
            <div className={s.limitItem}>
              <div className={s.limitIcon}>
                <BsBuilding />
              </div>
              <div>
                <div className={s.limitLabel}>Сегмент компании</div>
                <div className={s.limitValue}>Отдел продаж / Офис Москва</div>
              </div>
            </div>
          </div>

          <div className={s.limitCard}>
            <div className={s.limitItem}>
              <div className={s.limitIcon}>
                <FaStar />
              </div>
              <div>
                <div className={s.limitLabel}>Лимит по командировкам</div>
                <div className={s.limitValue}>до 500 000 ₽ в квартал</div>
                <div className={s.limitProgress}>
                  <div className={s.limitProgressBar} style={{ width: '35%' }}></div>
                </div>
                <div className={s.limitStats}>
                  <span>Использовано: 175 000 ₽</span>
                  <span>Осталось: 325 000 ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "docs":
        return renderDocsTab();
      case "trips":
        return renderTripsTab();
      case "access":
        return renderAccessTab();
      case "main":
      default:
        return renderMainTab();
    }
  };

  return (
    <div className={s.employeeDetail}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <div className={s.title}>{employee.fullName}</div>
          <div className={s.subtitle}>
            Сотрудник компании • ID {params.id || employee.id}
          </div>
        </div>
        <div className={s.headerRight}>
          <div className={s.headerActions}>
            <Button variant="primary" size="sm">
              <FaEdit style={{ marginRight: "6px" }} /> Редактировать
            </Button>
            <Button variant="outline" size="sm">
              <FaKey style={{ marginRight: "6px" }} /> Сброс пароля
            </Button>
            <Button variant="outline" size="sm" style={{ 
              borderColor: "#ef4444", 
              color: "#ef4444" 
            }}>
              <MdBlock style={{ marginRight: "6px" }} /> Заблокировать
            </Button>
          </div>
          {renderStatusPill()}
        </div>
      </div>

      <div className={s.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id ? s.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
