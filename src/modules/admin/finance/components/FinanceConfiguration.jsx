"use client";
import React, { useState } from "react";
import { Select, Button, UITable, Switch } from "@/ui";
import s from "../styles/Finance.module.scss";
import FinanceRuleModal from "./FinanceRuleModal";
import TransactionTypeModal from "./TransactionTypeModal";
import CommissionSettingsModal from "./CommissionSettingsModal";
import TaxSettingsModal from "./TaxSettingsModal";

const SUB_TABS = [
  { id: "rules", label: "Финансовые правила" },
  { id: "commissions", label: "Комиссии и маркап" },
  { id: "transactions", label: "Типы операций" },
  { id: "taxes", label: "Налоговые параметры" },
];

const ORDER_TYPE_OPTIONS = [
  { value: "all", label: "Все типы заказов" },
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "partner", label: "Партнёрский" },
  { value: "group", label: "Групповой" },
];

const SERVICE_TYPE_OPTIONS = [
  { value: "all", label: "Все услуги" },
  { value: "avia", label: "Авиа" },
  { value: "hotel", label: "Отели" },
  { value: "transfer", label: "Трансферы" },
  { value: "visa", label: "Визы" },
];

const MOCK_RULES = [
  {
    id: 1,
    priority: 1,
    scope: "B2B · Авиа · Корп. клиенты",
    orderType: "b2b",
    serviceType: "avia",
    organization: "Все корпоративные",
    supplier: "Любой",
    agencyCommission: "5%",
    supplierCommission: "0%",
    markup: "+7%",
    rounding: "до 10 ₽ в пользу агентства",
    active: true,
  },
  {
    id: 2,
    priority: 2,
    scope: "B2C · Отели",
    orderType: "b2c",
    serviceType: "hotel",
    organization: "Физ. лица",
    supplier: "Booking.com",
    agencyCommission: "3%",
    supplierCommission: "2%",
    markup: "+10%",
    rounding: "до 1 ₽ обычное",
    active: true,
  },
  {
    id: 3,
    priority: 5,
    scope: "Партнёрка · Все услуги",
    orderType: "partner",
    serviceType: "all",
    organization: "Партнёры",
    supplier: "Любой",
    agencyCommission: "2%",
    supplierCommission: "0%",
    markup: "0%",
    rounding: "до 1 ₽ обычное",
    active: false,
  },
];

const MOCK_TRANSACTION_TYPES = [
  {
    id: 1,
    name: "Оплата от клиента",
    code: "CLIENT_PAYMENT",
    category: "Доход",
    active: true,
  },
  {
    id: 2,
    name: "Оплата поставщику",
    code: "SUPPLIER_PAYMENT",
    category: "Расход",
    active: true,
  },
  {
    id: 3,
    name: "Депозит клиента",
    code: "CLIENT_DEPOSIT",
    category: "Доход",
    active: true,
  },
  {
    id: 4,
    name: "Возврат клиенту",
    code: "CLIENT_REFUND",
    category: "Расход",
    active: true,
  },
  {
    id: 5,
    name: "Штраф",
    code: "PENALTY",
    category: "Расход",
    active: false,
  },
];

export default function FinanceConfiguration() {
  const [activeSubTab, setActiveSubTab] = useState("rules");
  const [filters, setFilters] = useState({
    orderType: "all",
    serviceType: "all",
  });
  
  // Modal states
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filteredRules = MOCK_RULES.filter((rule) => {
    if (filters.orderType !== "all" && rule.orderType !== filters.orderType) {
      return false;
    }
    if (
      filters.serviceType !== "all" &&
      rule.serviceType !== filters.serviceType &&
      rule.serviceType !== "all"
    ) {
      return false;
    }
    return true;
  });

  const rulesColumns = [
    {
      key: "priority",
      label: "Приоритет",
      width: "90px",
      render: (value) => <span className={s.rulePriority}>#{value}</span>,
    },
    {
      key: "scope",
      label: "Область действия",
      flex: 1.6,
      render: (value, row) => (
        <div className={s.ruleScopeCell}>
          <div className={s.ruleScopeTitle}>{value}</div>
          <div className={s.ruleScopeMeta}>
            <span>{row.organization}</span>
            <span>{row.supplier}</span>
          </div>
        </div>
      ),
    },
    {
      key: "agencyCommission",
      label: "Комиссия агентства",
      flex: 1,
    },
    {
      key: "supplierCommission",
      label: "Комиссия поставщика",
      flex: 1,
    },
    {
      key: "markup",
      label: "Маркап",
      flex: 0.8,
    },
    {
      key: "rounding",
      label: "Округление",
      flex: 1.2,
    },
    {
      key: "active",
      label: "Статус",
      width: "120px",
      render: (value) => (
        <span className={value ? s.ruleActive : s.ruleInactive}>
          {value ? "Активно" : "Отключено"}
        </span>
      ),
    },
  ];

  const transactionTypesColumns = [
    {
      key: "name",
      label: "Название",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.templateNameCell}>
          <div className={s.templateName}>{value}</div>
          <div className={s.templateCode}>{row.code}</div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Категория",
      flex: 1,
    },
    {
      key: "active",
      label: "Статус",
      width: "120px",
      render: (value) => (
        <span className={value ? s.ruleActive : s.ruleInactive}>
          {value ? "Активно" : "Отключено"}
        </span>
      ),
    },
  ];

  const handleAddRule = () => {
    setEditingItem(null);
    setIsRuleModalOpen(true);
  };

  const handleAddTransactionType = () => {
    setEditingItem(null);
    setIsTransactionModalOpen(true);
  };

  const handleSaveRule = (ruleData) => {
    // TODO: Save to backend
    console.log("Saving rule:", ruleData);
    setIsRuleModalOpen(false);
  };

  const handleSaveTransactionType = (typeData) => {
    // TODO: Save to backend
    console.log("Saving transaction type:", typeData);
    setIsTransactionModalOpen(false);
  };

  const handleSaveCommissionSettings = (commissionData) => {
    // TODO: Save to backend
    console.log("Saving commission settings:", commissionData);
    setIsCommissionModalOpen(false);
  };

  const handleSaveTaxSettings = (taxData) => {
    // TODO: Save to backend
    console.log("Saving tax settings:", taxData);
    setIsTaxModalOpen(false);
  };

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "rules":
        return (
          <>
            <div className={s.toolbar}>
              <div className={s.filterGroup}>
                <div className={s.selectWrapper}>
                  <Select
                    value={filters.orderType}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, orderType: value }))
                    }
                    options={ORDER_TYPE_OPTIONS}
                  />
                </div>
                <div className={s.selectWrapper}>
                  <Select
                    value={filters.serviceType}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, serviceType: value }))
                    }
                    options={SERVICE_TYPE_OPTIONS}
                  />
                </div>
              </div>
              <Button variant="primary" onClick={handleAddRule}>
                Добавить правило
              </Button>
            </div>
            <div className={s.tableBlock}>
              <UITable columns={rulesColumns} rows={filteredRules} showCheckbox={false} />
            </div>
          </>
        );

      case "commissions":
        return (
          <>
            <p className={s.sectionDescription}>
              Глобальные комиссии агентства и поставщиков, индивидуальные правила
              по организациям, поставщикам и типам услуг. Приоритеты правил,
              распределение комиссий между операторами и правила округления.
            </p>
            <div className={s.settingsGrid}>
              <div className={s.settingsCard}>
                <h3>Глобальная комиссия агентства</h3>
                <p style={{ marginBottom: "12px" }}>
                  Базовый процент комиссии агентства, применяется если не задано
                  специфичное правило.
                </p>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--color-primary)", marginBottom: "8px" }}>
                  5%
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsCommissionModalOpen(true)}>
                  Изменить
                </Button>
              </div>
              <div className={s.settingsCard}>
                <h3>Правила округления</h3>
                <p style={{ marginBottom: "12px" }}>
                  Стандартное правило округления итоговых сумм в заказах и
                  транзакциях.
                </p>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-gray-900)", marginBottom: "8px" }}>
                  До 1 ₽ обычное
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsCommissionModalOpen(true)}>
                  Изменить
                </Button>
              </div>
              <div className={s.settingsCard}>
                <h3>Распределение комиссий</h3>
                <p>
                  Правила распределения комиссий между операторами, менеджерами и
                  подразделениями. Приоритеты применения правил.
                </p>
              </div>
            </div>
          </>
        );

      case "transactions":
        return (
          <>
            <p className={s.sectionDescription}>
              Справочник типов финансовых операций: оплаты клиентов, оплаты
              поставщикам, депозиты, корректировки, комиссии, штрафы и возвраты.
            </p>
            <div className={s.toolbar}>
              <div></div>
              <Button variant="primary" onClick={handleAddTransactionType}>
                Добавить тип операции
              </Button>
            </div>
            <div className={s.tableBlock}>
              <UITable
                columns={transactionTypesColumns}
                rows={MOCK_TRANSACTION_TYPES}
                showCheckbox={false}
              />
            </div>
          </>
        );

      case "taxes":
        return (
          <>
            <p className={s.sectionDescription}>
              НДС, сервисные сборы, спецрежимы, признак облагаемых услуг, правила
              по организациям и типам услуг.
            </p>
            <div className={s.settingsGrid}>
              <div className={s.settingsCard}>
                <h3>Ставка НДС</h3>
                <p style={{ marginBottom: "12px" }}>
                  Основная ставка налога на добавленную стоимость для расчёта
                  налогооблагаемой базы.
                </p>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--color-primary)", marginBottom: "8px" }}>
                  20%
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsTaxModalOpen(true)}>
                  Изменить
                </Button>
              </div>
              <div className={s.settingsCard}>
                <h3>Сервисный сбор</h3>
                <p style={{ marginBottom: "12px" }}>
                  Дополнительный процент сервисного сбора, добавляемый к стоимости
                  услуг.
                </p>
                <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--color-primary)", marginBottom: "8px" }}>
                  2%
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsTaxModalOpen(true)}>
                  Изменить
                </Button>
              </div>
              <div className={s.settingsCard}>
                <h3>Налоговый режим</h3>
                <p style={{ marginBottom: "12px" }}>
                  Специальный налоговый режим для организации: общий, УСН,
                  патентная система.
                </p>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-gray-900)", marginBottom: "8px" }}>
                  Общая система (ОСН)
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsTaxModalOpen(true)}>
                  Изменить
                </Button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={s.configSection}>
      <h2 className={s.sectionTitle}>Конфигурация и правила</h2>
      
      <div className={s.configSubTabs}>
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${s.configSubTab} ${activeSubTab === tab.id ? s.active : ""}`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={s.configContent}>
        {renderSubTabContent()}
      </div>

      {/* Modals */}
      <FinanceRuleModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
        onSave={handleSaveRule}
        editingRule={editingItem}
      />
      <TransactionTypeModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSave={handleSaveTransactionType}
        editingType={editingItem}
      />
      <CommissionSettingsModal
        isOpen={isCommissionModalOpen}
        onClose={() => setIsCommissionModalOpen(false)}
        onSave={handleSaveCommissionSettings}
      />
      <TaxSettingsModal
        isOpen={isTaxModalOpen}
        onClose={() => setIsTaxModalOpen(false)}
        onSave={handleSaveTaxSettings}
      />
    </div>
  );
}
