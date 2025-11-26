"use client";
import React, { useState } from "react";
import { Container, Button } from "@/ui";
import { HiDocumentText } from "react-icons/hi2";
import { UITable } from "@/ui";
import s from "../../styles/BalanceAndDebts.module.scss";

export default function BalanceAndDebts() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Данные баланса
  const balanceData = {
    debt: -125000,
    prepayments: 450000,
    availableBalance: 325000,
    limit: 1000000,
    limitUsed: 32.5,
  };

  // История взаиморасчётов
  const historyData = [
    {
      id: 1,
      date: "15.10.2025",
      type: "Оплата",
      amount: 50000,
      currency: "KGS",
      status: "Завершено",
      statusColor: "green",
      description: "Оплата заказа #ORD-145",
    },
    {
      id: 2,
      date: "14.10.2025",
      type: "Предоплата",
      amount: 100000,
      currency: "KGS",
      status: "Завершено",
      statusColor: "green",
      description: "Предоплата за услуги",
    },
    {
      id: 3,
      date: "13.10.2025",
      type: "Долг",
      amount: -75000,
      currency: "KGS",
      status: "Ожидает оплаты",
      statusColor: "red",
      description: "Задолженность по заказу #ORD-142",
    },
    {
      id: 4,
      date: "12.10.2025",
      type: "Возврат",
      amount: -25000,
      currency: "KGS",
      status: "Завершено",
      statusColor: "green",
      description: "Возврат средств за отменённый заказ",
    },
    {
      id: 5,
      date: "10.10.2025",
      type: "Оплата",
      amount: 200000,
      currency: "KGS",
      status: "Завершено",
      statusColor: "green",
      description: "Оплата заказа #ORD-140",
    },
  ];

  const historyColumns = [
    {
      key: "date",
      label: "Дата",
      render: (value) => <span>{value}</span>,
    },
    {
      key: "type",
      label: "Тип операции",
    },
    {
      key: "description",
      label: "Описание",
    },
    {
      key: "amount",
      label: "Сумма",
      render: (value, row) => (
        <span className={value >= 0 ? s.positiveAmount : s.negativeAmount}>
          {value >= 0 ? "+" : ""}
          {value.toLocaleString("ru-RU")} {row.currency}
        </span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span className={s[`status-${row.statusColor}`]}>{value}</span>
      ),
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ru-RU").format(amount);
  };

  return (
    <div className={s.main}>
      {/* Заголовок */}
      <Container size="full">
        <div className={s.header}>
          <h4>Баланс компании</h4>
          <div className={s.headerActions}>
            <Button variant="bgblue" icon={HiDocumentText}>
              Экспортировать отчёт
            </Button>
          </div>
        </div>
      </Container>

      {/* Карточки баланса */}
      <div className={s.balanceCards}>
        <div className={s.cardsGrid}>
          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <span className={s.cardLabel}>Долг</span>
              <span className={`${s.cardValue} ${s.negative}`}>
                {formatCurrency(Math.abs(balanceData.debt))} KGS
              </span>
            </div>
            <p className={s.cardDescription}>
              Текущая задолженность организации
            </p>
          </div>

          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <span className={s.cardLabel}>Предоплаты</span>
              <span className={`${s.cardValue} ${s.positive}`}>
                {formatCurrency(balanceData.prepayments)} KGS
              </span>
            </div>
            <p className={s.cardDescription}>Сумма внесённых предоплат</p>
          </div>

          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <span className={s.cardLabel}>Доступный остаток</span>
              <span className={`${s.cardValue} ${s.positive}`}>
                {formatCurrency(balanceData.availableBalance)} KGS
              </span>
            </div>
            <p className={s.cardDescription}>
              Баланс доступный для использования
            </p>
          </div>

          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <span className={s.cardLabel}>Лимит</span>
              <span className={s.cardValue}>
                {formatCurrency(balanceData.limit)} KGS
              </span>
            </div>
            <div className={s.limitProgress}>
              <div className={s.progressBar}>
                <div
                  className={s.progressFill}
                  style={{ width: `${balanceData.limitUsed}%` }}
                />
              </div>
              <span className={s.progressText}>
                Использовано {balanceData.limitUsed}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* История взаиморасчётов */}
      <Container size="full">
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h5 className={s.sectionTitle}>История взаиморасчётов</h5>
            <div className={s.periodSelector}>
              <Button
                variant={selectedPeriod === "week" ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("week")}
              >
                Неделя
              </Button>
              <Button
                variant={selectedPeriod === "month" ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("month")}
              >
                Месяц
              </Button>
              <Button
                variant={selectedPeriod === "year" ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod("year")}
              >
                Год
              </Button>
            </div>
          </div>
          <UITable
            columns={historyColumns}
            rows={historyData}
            showCheckbox={false}
          />
        </div>
      </Container>
    </div>
  );
}
