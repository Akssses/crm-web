"use client";
import React, { useState } from "react";
import { Modal, Button, UITable, Switch } from "@/ui";
import {
  MdEdit,
  MdPhone,
  MdEmail,
  MdAccessTime,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdChat,
  MdAttachFile,
  MdHistory,
  MdAttachMoney,
} from "react-icons/md";
import s from "../styles/SupplierDetailModal.module.scss";

export default function SupplierDetailModal({ supplier, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Обзор" },
    { id: "services", label: "Услуги" },
    { id: "contacts", label: "Контакты" },
    { id: "conditions", label: "Условия" },
    { id: "api", label: "API и интеграции" },
    { id: "documents", label: "Документы" },
    { id: "finance", label: "Финансы" },
    { id: "audit", label: "Аудит" },
  ];

  if (!supplier) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      width="800px"
      title={`Поставщик: ${supplier.name}`}
    >
      <div className={s.supplierDetailModal}>
        <div className={s.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={s.content}>
          {activeTab === "overview" && <OverviewTab supplier={supplier} />}
          {activeTab === "services" && <ServicesTab supplier={supplier} />}
          {activeTab === "contacts" && <ContactsTab supplier={supplier} />}
          {activeTab === "conditions" && <ConditionsTab supplier={supplier} />}
          {activeTab === "api" && <ApiTab supplier={supplier} />}
          {activeTab === "documents" && <DocumentsTab supplier={supplier} />}
          {activeTab === "finance" && <FinanceTab supplier={supplier} />}
          {activeTab === "audit" && <AuditTab supplier={supplier} />}
        </div>

        <div className={s.footer}>
          <Button variant="outline" icon={MdChat}>
            Чат с поставщиком
          </Button>
          <Button variant="primary" icon={MdEdit}>
            Редактировать
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function OverviewTab({ supplier }) {
  return (
    <div className={s.overviewTab}>
      <div className={s.statsGrid}>
        <div className={s.statCard}>
          <div className={s.statLabel}>Рейтинг</div>
          <div className={s.statValue}>{supplier.rating.toFixed(1)} / 5</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Активных услуг</div>
          <div className={s.statValue}>{supplier.activeServices}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Просрочено</div>
          <div className={`${s.statValue} ${s.statValueDanger}`}>
            {supplier.overdueServices}
          </div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Ожидают подтверждения</div>
          <div className={`${s.statValue} ${s.statValueWarning}`}>
            {supplier.pendingConfirmations}
          </div>
        </div>
      </div>

      <div className={s.section}>
        <h3 className={s.sectionTitle}>Текущее состояние</h3>
        <div className={s.statusInfo}>
          <span className={s.statusLabel}>Статус:</span>
          <span className={s.statusValue}>{supplier.statusLabel}</span>
        </div>
        <div className={s.statusInfo}>
          <span className={s.statusLabel}>Последняя синхронизация:</span>
          <span className={s.statusValue}>{supplier.lastSync}</span>
        </div>
      </div>
    </div>
  );
}

function ServicesTab({ supplier }) {
  const services = [
    {
      id: "SRV-001",
      order: "ORD-145",
      client: "Иван Петров",
      type: "Отель",
      status: "pending",
      statusLabel: "Ожидает подтверждения",
      sla: "2ч 15м",
      createdAt: "2025-01-15 12:00",
      risk: "high",
    },
    {
      id: "SRV-002",
      order: "ORD-144",
      client: "Мария Сидорова",
      type: "Авиабилет",
      status: "overdue",
      statusLabel: "Просрочено",
      sla: "Просрочено на 1ч",
      createdAt: "2025-01-15 10:00",
      risk: "critical",
    },
  ];

  const columns = [
    { key: "id", label: "ID услуги", flex: 0.8 },
    { key: "order", label: "Заявка", flex: 0.8 },
    { key: "client", label: "Клиент", flex: 1 },
    { key: "type", label: "Тип", flex: 0.8 },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value, row) => (
        <span
          className={`${s.serviceStatus} ${
            value === "overdue" ? s.serviceStatusDanger : s.serviceStatusWarning
          }`}
        >
          {row.statusLabel}
        </span>
      ),
    },
    { key: "sla", label: "SLA", flex: 1 },
    {
      key: "actions",
      label: "Действия",
      flex: 1,
      render: (value, row) => (
        <Button variant="outline" size="sm">
          Детали
        </Button>
      ),
    },
  ];

  return (
    <div className={s.servicesTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Открытые услуги</h3>
        <UITable columns={columns} rows={services} showCheckbox={false} />
      </div>
    </div>
  );
}

function ContactsTab({ supplier }) {
  const contacts = {
    phone: "+996 555 123 456",
    email: "booking@supplier.com",
    workingHours: "Пн-Пт: 09:00 - 18:00",
    manager: "Иван Иванов",
    channels: ["Email", "Telegram", "WhatsApp"],
  };

  return (
    <div className={s.contactsTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Контактная информация</h3>
        <div className={s.contactList}>
          <div className={s.contactItem}>
            <MdPhone size={20} />
            <span>{contacts.phone}</span>
          </div>
          <div className={s.contactItem}>
            <MdEmail size={20} />
            <span>{contacts.email}</span>
          </div>
          <div className={s.contactItem}>
            <MdAccessTime size={20} />
            <span>{contacts.workingHours}</span>
          </div>
          <div className={s.contactItem}>
            <span className={s.contactLabel}>Ответственный менеджер:</span>
            <span>{contacts.manager}</span>
          </div>
          <div className={s.contactItem}>
            <span className={s.contactLabel}>Каналы связи:</span>
            <div className={s.channelsList}>
              {contacts.channels.map((channel, idx) => (
                <span key={idx} className={s.channelTag}>
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConditionsTab({ supplier }) {
  return (
    <div className={s.conditionsTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Условия сотрудничества</h3>
        <div className={s.conditionsList}>
          <div className={s.conditionItem}>
            <span className={s.conditionLabel}>Комиссия:</span>
            <span className={s.conditionValue}>12%</span>
          </div>
          <div className={s.conditionItem}>
            <span className={s.conditionLabel}>Штраф за SLA:</span>
            <span className={s.conditionValue}>5% от суммы</span>
          </div>
          <div className={s.conditionItem}>
            <span className={s.conditionLabel}>Срок закрытия услуг:</span>
            <span className={s.conditionValue}>3 рабочих дня</span>
          </div>
          <div className={s.conditionItem}>
            <span className={s.conditionLabel}>Доступные направления:</span>
            <div className={s.directionsList}>
              <span className={s.directionTag}>Турция</span>
              <span className={s.directionTag}>ОАЭ</span>
              <span className={s.directionTag}>Египет</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiTab({ supplier }) {
  const getApiStatusConfig = (status) => {
    const configs = {
      online: { icon: MdCheckCircle, color: "green", label: "Онлайн" },
      slow: { icon: MdWarning, color: "yellow", label: "Медленно" },
      offline: { icon: MdError, color: "red", label: "Офлайн" },
    };
    return configs[status] || { icon: MdError, color: "gray", label: status };
  };

  const config = getApiStatusConfig(supplier.apiStatus);
  const Icon = config.icon;

  return (
    <div className={s.apiTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Статус API</h3>
        <div className={s.apiStatus}>
          <span
            className={`${s.apiStatusBadge} ${s[`status-${config.color}`]}`}
          >
            <Icon size={16} />
            {config.label}
          </span>
        </div>
        <div className={s.apiInfo}>
          <div className={s.apiInfoItem}>
            <span>Последняя синхронизация:</span>
            <span>{supplier.lastSync}</span>
          </div>
          <div className={s.apiInfoItem}>
            <span>Endpoint:</span>
            <span>api.supplier.com/v1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ supplier }) {
  const documents = [
    {
      id: "DOC-001",
      type: "Ваучер",
      order: "ORD-145",
      status: "pending",
      statusLabel: "Ожидает",
      uploadedAt: "2025-01-15 14:00",
    },
    {
      id: "DOC-002",
      type: "Подтверждение",
      order: "ORD-144",
      status: "overdue",
      statusLabel: "Просрочено",
      uploadedAt: null,
    },
  ];

  const columns = [
    { key: "id", label: "ID", flex: 0.8 },
    { key: "type", label: "Тип", flex: 1 },
    { key: "order", label: "Заявка", flex: 0.8 },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value, row) => (
        <span
          className={`${s.docStatus} ${
            value === "overdue" ? s.docStatusDanger : s.docStatusWarning
          }`}
        >
          {row.statusLabel}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1,
      render: (value, row) => (
        <div className={s.docActions}>
          <Button variant="outline" size="sm" icon={MdAttachFile}>
            Просмотр
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.documentsTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Документы от поставщика</h3>
        <UITable columns={columns} rows={documents} showCheckbox={false} />
      </div>
    </div>
  );
}

function FinanceTab({ supplier }) {
  return (
    <div className={s.financeTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>Финансовая информация</h3>
        <div className={s.financeList}>
          <div className={s.financeItem}>
            <span className={s.financeLabel}>Задолженность:</span>
            <span className={s.financeValue}>125,000 KGS</span>
          </div>
          <div className={s.financeItem}>
            <span className={s.financeLabel}>К выплате:</span>
            <span className={s.financeValue}>45,000 KGS</span>
          </div>
          <div className={s.financeItem}>
            <span className={s.financeLabel}>Просрочено:</span>
            <span className={`${s.financeValue} ${s.financeValueDanger}`}>
              12,000 KGS
            </span>
          </div>
          <div className={s.financeItem}>
            <span className={s.financeLabel}>Штрафы за SLA:</span>
            <span className={s.financeValue}>3,500 KGS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditTab({ supplier }) {
  const auditLog = [
    {
      id: "AUDIT-001",
      action: "Изменён статус услуги",
      user: "Оператор Иванов",
      timestamp: "2025-01-15 14:30",
      details: "SRV-001 → Подтверждено",
    },
    {
      id: "AUDIT-002",
      action: "Отправлено сообщение поставщику",
      user: "Супервизор Петров",
      timestamp: "2025-01-15 13:15",
      details: "Запрос подтверждения",
    },
  ];

  const columns = [
    { key: "timestamp", label: "Время", flex: 1 },
    { key: "action", label: "Действие", flex: 1.5 },
    { key: "user", label: "Пользователь", flex: 1 },
    { key: "details", label: "Детали", flex: 1.5 },
  ];

  return (
    <div className={s.auditTab}>
      <div className={s.section}>
        <h3 className={s.sectionTitle}>История действий</h3>
        <UITable columns={columns} rows={auditLog} showCheckbox={false} />
      </div>
    </div>
  );
}
