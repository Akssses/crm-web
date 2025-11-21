"use client";
import React, { useState } from "react";
import s from "../styles/Operatordetail.module.scss";
import { UITable, Button, Container } from "@/ui";
import { FaEdit, FaDownload, FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

// Badge компонент
function Badge({ text, color = "blue" }) {
  const colors = {
    green: "#10b981",
    red: "#ef4444",
    blue: "#3b82f6",
  };

  return (
    <span
      style={{
        color: colors[color],
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      {text}
    </span>
  );
}

// InfoRow компонент
function InfoRow({ label, value, isHighlight = false }) {
  return (
    <div className={s.infoRow}>
      <span className={s.label}>{label}</span>
      <span className={`${s.value} ${isHighlight ? s.highlight : ""}`}>
        {value}
      </span>
    </div>
  );
}

export default function OperatorDetail() {
  const operator = {
    name: "Азамат",
    period: "Октябрь 2025",
    organization: "Туроператор 'XDEY'",
    ordersCount: 18,
    totalRevenue: "512 000 ₽",
    agentCommission: "42 000 ₽",
    commissionPercent: 5,
    profitAmount: "22 800 ₽",
    expenses: "-10 000 ₽",
    losses: "-2 000 ₽",
    totalPayable: "50 800 ₽",
    skladCount: 40000,
    advances: 14,
  };

  const ordersData = [
    {
      id: "ORD-123",
      client: "Иван Иванов",
      services: "Авиа+Отель",
      sales: "52 000 ₽",
      commission: "2 600 ₽",
      total: "2 600 ₽",
      note: "—",
    },
    {
      id: "ORD-125",
      client: "ООО 'Бета Тревел'",
      services: "Виза",
      sales: "18 000 ₽",
      commission: "900 ₽",
      total: "900 ₽",
      note: "—",
    },
    {
      id: "ORD-130",
      client: "Алмаз-Тур",
      services: "Трансфер",
      sales: "4 000 ₽",
      commission: "200 ₽",
      total: "200 ₽",
      note: "—",
    },
  ];

  const paymentsData = [
    {
      id: 1,
      date: "25.10",
      type: "Склад",
      sum: "40 000 ₽",
      comment: "—",
      status: "Выполнено",
      statusColor: "green",
    },
    {
      id: 2,
      date: "26.10",
      type: "Процент",
      sum: "22 800 ₽",
      comment: "За октябрь",
      status: "Утверждено",
      statusColor: "blue",
    },
    {
      id: 3,
      date: "28.10",
      type: "Авнас",
      sum: "-10 000 ₽",
      comment: "По заявке",
      status: "Уточно",
      statusColor: "red",
    },
    {
      id: 4,
      date: "29.10",
      type: "Удержание",
      sum: "-2 000 ₽",
      comment: "Невозвратный билет",
      status: "Уточно",
      statusColor: "red",
    },
  ];

  const historyData = [
    {
      id: 1,
      date: "25.10",
      user: "CRM",
      action: "Создан расчёт",
    },
    {
      id: 2,
      date: "26.10",
      user: "Азгарим (бухгалтер)",
      action: "Подтверждено начисление",
    },
    {
      id: 3,
      date: "27.10",
      user: "CRM",
      action: "Добавлен авнас – 10 000 ₽",
    },
  ];

  const ordersColumns = [
    {
      key: "id",
      label: "Заказ",
      render: (value) => (
        <a href="#" style={{ color: "#3b82f6", fontWeight: "600" }}>
          {value}
        </a>
      ),
    },
    { key: "client", label: "Клиент" },
    { key: "services", label: "Услуги" },
    { key: "sales", label: "Продажи" },
    { key: "commission", label: "Комиссия" },
    {
      key: "total",
      label: "Начислено",
      render: (value) => (
        <span style={{ color: "#10b981", fontWeight: "600" }}>{value}</span>
      ),
    },
    { key: "note", label: "Примечание" },
  ];

  const paymentsColumns = [
    { key: "date", label: "Дата" },
    { key: "type", label: "Тип" },
    { key: "sum", label: "Сумма" },
    { key: "comment", label: "Комментарий" },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => <Badge text={value} color={row.statusColor} />,
    },
  ];

  const historyColumns = [
    { key: "date", label: "Дата" },
    {
      key: "user",
      label: "Пользователь",
      render: (value) => (
        <a href="#" style={{ color: "#3b82f6", fontWeight: "600" }}>
          {value}
        </a>
      ),
    },
    { key: "action", label: "Действие" },
  ];

  return (
    <div className={s.detail}>
      <div className={s.headerTop}>
        <h2>Расчёт ЗП — Азамат (Октябрь 2025)</h2>
        <div className={s.headerActions}>
          <Button variant="bgblue" icon={FaEdit}>
            Редактировать
          </Button>
          <Button variant="bggreen" icon={FaCheck}>
            Подтвердить
          </Button>
          <Button variant="bgred" icon={IoCloseSharp}>
            Отклонить
          </Button>
        </div>
      </div>

      <div className={s.mainContent}>
        <Container size="full">
          <section className={s.section}>
            <h2 className={s.sectionTitle}>Основные данные</h2>
            <div className={s.infoGrid}>
              <div className={s.infoColumn}>
                <InfoRow label="Оператор" value={operator.name} />
                <InfoRow label="Период" value={operator.period} />
                <InfoRow label="Организация" value={operator.organization} />
                <InfoRow label="Кол-во заказов" value={operator.ordersCount} />
              </div>
              <div className={s.infoColumn}>
                <InfoRow
                  label="Общая сумма продаж"
                  value={operator.totalRevenue}
                />
                <InfoRow
                  label="Комиссия (агентская + маржа)"
                  value={operator.agentCommission}
                />
                <InfoRow
                  label="% от комиссий"
                  value={operator.commissionPercent + "%"}
                />
                <InfoRow
                  label="Начислено по процентру"
                  value={operator.profitAmount}
                  isHighlight={true}
                />
              </div>
              <div className={s.infoColumn}>
                <InfoRow label="Склад" value={operator.skladCount + " ₽"} />
                <InfoRow label="Авансы" value={operator.advances} />
                <InfoRow label="Авансы" value={operator.expenses} />
                <InfoRow label="Удержания" value={operator.losses} />
              </div>
            </div>
            <div className={s.totalSection}>
              <h3>Итого к выплате</h3>
              <span className={s.totalAmount}>{operator.totalPayable} ₽</span>
            </div>
          </section>
        </Container>

        <Container size="full" className={s.section}>
          <h2 className={s.sectionTitle}>
            Детализация заказов (по данным из CRM)
          </h2>
          <UITable
            columns={ordersColumns}
            rows={ordersData}
            showCheckbox={false}
          />
        </Container>
        <Container size="full" className={s.section}>
          <h2 className={s.sectionTitle}>Выплаты и удержания</h2>
          <UITable
            columns={paymentsColumns}
            rows={paymentsData}
            showCheckbox={false}
          />
        </Container>
        <Container size="full" className={s.section}>
          <h2 className={s.sectionTitle}>История расчёта</h2>
          <UITable
            columns={historyColumns}
            rows={historyData}
            showCheckbox={false}
          />
        </Container>
      </div>
    </div>
  );
}
