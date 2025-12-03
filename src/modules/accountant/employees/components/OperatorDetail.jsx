"use client";

import React, { useState } from "react";
import s from "../styles/EmployeesReports.module.scss";
import { UITable, Button } from "@/ui";
import { useParams } from "next/navigation";
import AddOperatorModal from "./AddOperatorModal";
import SalarySettingsModal from "./SalarySettingsModal";

const ORDERS_COLUMNS = [
  { key: "id", label: "Заказ" },
  { key: "client", label: "Клиент" },
  { key: "service", label: "Услуга" },
  { key: "sales", label: "Продажи" },
  { key: "commission", label: "Комиссия" },
  { key: "accrual", label: "Начислено" },
  { key: "note", label: "Примечание" },
];

const ORDERS_ROWS = [
  {
    id: "ORD-123",
    client: "Иван Иванов",
    service: "Авиа+Отель",
    sales: "52 000 ₽",
    commission: "2 600 ₽",
    accrual: "2 600 ₽",
    note: "—",
  },
  {
    id: "ORD-125",
    client: "ООО «Бета Тревел»",
    service: "Виза",
    sales: "18 000 ₽",
    commission: "900 ₽",
    accrual: "900 ₽",
    note: "—",
  },
  {
    id: "ORD-130",
    client: "Алмаз-Тур",
    service: "Трансфер",
    sales: "4 000 ₽",
    commission: "200 ₽",
    accrual: "200 ₽",
    note: "—",
  },
];

const PAYMENTS_COLUMNS = [
  { key: "date", label: "Дата" },
  { key: "type", label: "Тип" },
  { key: "amount", label: "Сумма" },
  { key: "comment", label: "Комментарий" },
  { key: "status", label: "Статус" },
];

const PAYMENTS_ROWS = [
  {
    date: "25.10",
    type: "Оклад",
    amount: "40 000 ₽",
    comment: "—",
    status: "Выплачено",
  },
  {
    date: "26.10",
    type: "Процент",
    amount: "22 800 ₽",
    comment: "За октябрь",
    status: "Утверждено",
  },
  {
    date: "28.10",
    type: "Аванс",
    amount: "-10 000 ₽",
    comment: "По заявке",
    status: "Учтено",
  },
  {
    date: "29.10",
    type: "Удержание",
    amount: "-2 000 ₽",
    comment: "Невозвратный билет",
    status: "Учтено",
  },
];

const HISTORY_COLUMNS = [
  { key: "date", label: "Дата" },
  { key: "user", label: "Пользователь" },
  { key: "action", label: "Действие" },
];

const HISTORY_ROWS = [
  {
    date: "25.10",
    user: "CRM",
    action: "Создан расчёт",
  },
  {
    date: "26.10",
    user: "Айгерим (бухгалтер)",
    action: "Подтверждено начисление",
  },
  {
    date: "27.10",
    user: "CRM",
    action: "Добавлен аванс -10 000 ₽",
  },
];

export default function OperatorDetail() {
  const params = useParams();
  const operatorName = "Азамат Азаматов";
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);

  const handleAddOperator = (data) => {
    console.log("New operator:", data);
    // Handle adding new operator
  };

  const handleSaveSalarySettings = (data) => {
    console.log("Salary settings:", data);
    // Handle saving salary settings
  };

  return (
    <div className={s.detailLayout}>
      <div className={s.section}>
        <div className={s.sectionTitleRow}>
          <div>
            <div className={s.sectionTitle}>
              Расчёт ЗП — {operatorName}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              Октябрь 2025
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Button variant="primary" size="sm" onClick={() => setIsSalaryModalOpen(true)}>
              Настройки ЗП
            </Button>
            <Button variant="primary" size="sm">
              Редактировать
            </Button>
            <Button variant="primary" size="sm">
              Подтвердить
            </Button>
            <Button variant="outline" size="sm" style={{ borderColor: "#ef4444", color: "#ef4444" }}>
              Отклонить
            </Button>
          </div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitleRow}>
          <div className={s.sectionTitle}>Основные данные</div>
          <span className={s.pill}>Итого к выплате: 50 800 ₽</span>
        </div>
        <div className={s.statsGrid}>
          <div className={s.statItem}>
            <span className={s.statLabel}>Оператор</span>
            <span className={s.statValue}>Азамат</span>
            <span className={s.statMuted}>Смены: 14</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Период</span>
            <span className={s.statValue}>Октябрь 2025</span>
            <span className={s.statMuted}>Кол-во заказов: 18</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Общая сумма продаж</span>
            <span className={s.statValue}>512 000 ₽</span>
            <span className={s.statMuted}>Комиссия (агентская + маркап): 42 000 ₽</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Начислено по проценту</span>
            <span className={`${s.statValue} ${s.statHighlight}`}>22 800 ₽</span>
            <span className={s.statMuted}>5 % от комиссий</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Оклад</span>
            <span className={s.statValue}>40 000 ₽</span>
            <span className={s.statMuted}>Фиксированная часть</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Авансы</span>
            <span className={`${s.statValue} ${s.statDanger}`}>-10 000 ₽</span>
            <span className={s.statMuted}>Учитывается при выплате</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Удержания</span>
            <span className={`${s.statValue} ${s.statDanger}`}>-2 000 ₽</span>
            <span className={s.statMuted}>Невозвратный билет</span>
          </div>
          <div className={s.statItem}>
            <span className={s.statLabel}>Итого к выплате</span>
            <span className={`${s.statValue} ${s.statHighlight}`}>50 800 ₽</span>
            <span className={s.statMuted}>После всех удержаний и авансов</span>
          </div>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionTitleRow}>
          <div className={s.sectionTitle}>Детализация заказов (по данным из CRM)</div>
        </div>
        <UITable
          columns={ORDERS_COLUMNS}
          rows={ORDERS_ROWS}
          showCheckbox={false}
        />
      </div>

      <div className={s.section}>
        <div className={s.sectionTitleRow}>
          <div className={s.sectionTitle}>Выплаты и удержания</div>
        </div>
        <UITable
          columns={PAYMENTS_COLUMNS}
          rows={PAYMENTS_ROWS}
          showCheckbox={false}
        />
      </div>

      <div className={s.section}>
        <div className={s.sectionTitleRow}>
          <div className={s.sectionTitle}>История расчёта</div>
        </div>
        <UITable
          columns={HISTORY_COLUMNS}
          rows={HISTORY_ROWS}
          showCheckbox={false}
        />
      </div>

      {/* Modals */}
      <AddOperatorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOperator}
      />
      
      <SalarySettingsModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        onSubmit={handleSaveSalarySettings}
        operatorName={operatorName}
      />
    </div>
  );
}


