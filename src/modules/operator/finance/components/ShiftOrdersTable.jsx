"use client";
import React, { useState } from "react";
import { Container, UITable, Select, Button } from "@/ui";
import { MdSend, MdPrint, MdVisibility } from "react-icons/md";
import s from "../styles/ShiftOrdersTable.module.scss";

export default function ShiftOrdersTable() {
  const orders = [
    {
      id: 1,
      orderId: "ORD-120",
      client: "Иван Петров",
      organization: "Asia Travel",
      serviceType: "Авиа",
      serviceTypeColor: "blue",
      amount: "120 000 Р",
      commission: "6 000 Р",
      status: "Подтвержден",
      statusColor: "green",
    },
    {
      id: 2,
      orderId: "ORD-122",
      client: 'ООО "Бета Трэвел"',
      organization: "Корп. клиент",
      serviceType: "Отель",
      serviceTypeColor: "purple",
      amount: "98 000 Р",
      commission: "4 900 Р",
      status: "Закрыт",
      statusColor: "gray",
    },
    {
      id: 3,
      orderId: "ORD-125",
      client: "Гарри Поттер",
      organization: "Частное лицо",
      serviceType: "Трансфер",
      serviceTypeColor: "orange",
      amount: "14 000 Р",
      commission: "700 Р",
      status: "Возврат частичный",
      statusColor: "red",
    },
    {
      id: 4,
      orderId: "ORD-128",
      client: "Мария Иванова",
      organization: "Asia Travel",
      serviceType: "Авиа",
      serviceTypeColor: "blue",
      amount: "85 000 Р",
      commission: "4 250 Р",
      status: "Подтвержден",
      statusColor: "green",
    },
    {
      id: 5,
      orderId: "ORD-131",
      client: 'ООО "Альфа"',
      organization: "Корп. клиент",
      serviceType: "Отель",
      serviceTypeColor: "purple",
      amount: "163 000 Р",
      commission: "8 150 Р",
      status: "Закрыт",
      statusColor: "gray",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "№",
    },
    {
      key: "orderId",
      label: "ID Заказа",
      render: (value) => (
        <span className={s.orderLink}>{value}</span>
      ),
    },
    { key: "client", label: "Клиент" },
    { key: "organization", label: "Организация" },
    {
      key: "serviceType",
      label: "Тип услуги",
      render: (value, row) => (
        <span
          className={`${s.serviceTypeBadge} ${s[`serviceType-${row.serviceTypeColor}`]}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Сумма",
      render: (value) => (
        <span className={s.amount}>{value}</span>
      ),
    },
    {
      key: "commission",
      label: "Комиссия",
      render: (value) => (
        <span className={s.commission}>{value}</span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <div className={s.statusCell}>
          <span
            className={`${s.statusDot} ${s[`statusDot-${row.statusColor}`]}`}
          ></span>
          <span className={s.statusText}>{value}</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      render: () => (
        <button className={s.actionButton}>
          <MdVisibility size={20} />
        </button>
      ),
    },
  ];

  const totals = {
    ordersCount: 15,
    totalAmount: "480 000 Р",
    totalCommission: "24 000 Р",
    totalToPay: "50 800 Р",
  };

  return (
    <Container size="full" className={s.container}>
      <h3 className={s.title}>Список заказов за смену</h3>
      <div className={s.filters}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Дата" },
                { value: "today", label: "Сегодня" },
                { value: "week", label: "Неделя" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Клиент" },
                { value: "client1", label: "Иван Петров" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Тип услуги" },
                { value: "avia", label: "Авиа" },
                { value: "hotel", label: "Отель" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Статус" },
                { value: "confirmed", label: "Подтвержден" },
                { value: "closed", label: "Закрыт" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Все валюты" },
                { value: "rub", label: "RUB" },
                { value: "usd", label: "USD" },
              ]}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className={s.actions}>
          <Button variant="primary" icon={MdSend}>
            Отправить
          </Button>
          <Button variant="secondary" icon={MdPrint}>
            Печать
          </Button>
        </div>
      </div>

      <UITable
        columns={columns}
        rows={orders}
        showCheckbox={true}
        type="default"
      />

      <div className={s.footer}>
        <span className={s.footerLabel}>Всего по смене:</span>
        <span className={s.footerValue}>
          {totals.ordersCount} заказов
        </span>
        <span className={s.footerValue}>
          Общая сумма {totals.totalAmount}
        </span>
        <span className={s.footerValue}>
          Комиссия {totals.totalCommission}
        </span>
        <span className={s.footerValue}>
          К выплате {totals.totalToPay}
        </span>
      </div>
    </Container>
  );
}

