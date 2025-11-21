"use client";
import React, { useState } from "react";
import { Container, UITable, Select, Button } from "@/ui";
import { MdAdd, MdDownload, MdVisibility } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import s from "../styles/PaymentsTable.module.scss";

export default function PaymentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 3;

  const payments = [
    {
      id: "PAY-001",
      order: "ORD-123",
      client: "Иван Иванов",
      type: "Оплата",
      amount: "32 000 KGS",
      status: "Подтверждено",
      statusColor: "green",
      date: "10.10.25",
    },
    {
      id: "PAY-002",
      order: "ORD-125",
      client: 'ООО "Бета Трэвел"',
      type: "Предоплата",
      amount: "20 000 USD",
      status: "В ожидании",
      statusColor: "yellow",
      date: "11.10.25",
    },
    {
      id: "PAY-003",
      order: "ORD-120",
      client: 'ООО "Алмаз-Тур"',
      type: "Оплата",
      amount: "52 000 KGS",
      status: "Возврат частичный",
      statusColor: "red",
      date: "09.10.25",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "№",
      render: (value) => (
        <span className={s.paymentId}>{value}</span>
      ),
    },
    {
      key: "order",
      label: "Заказ",
      render: (value) => (
        <span className={s.orderLink}>{value}</span>
      ),
    },
    { key: "client", label: "Клиент" },
    { key: "type", label: "Тип" },
    {
      key: "amount",
      label: "Сумма",
      render: (value) => (
        <span className={s.amount}>{value}</span>
      ),
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => (
        <span
          className={`${s.statusBadge} ${s[`status-${row.statusColor}`]}`}
        >
          {value}
        </span>
      ),
    },
    { key: "date", label: "Дата" },
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

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Container size="full" className={s.container}>
      <div className={s.filters}>
        <div className={s.filterGroup}>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Все статусы" },
                { value: "confirmed", label: "Подтверждено" },
                { value: "pending", label: "В ожидании" },
                { value: "refund", label: "Возврат" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              value="all"
              options={[
                { value: "all", label: "Все валюты" },
                { value: "kgs", label: "KGS" },
                { value: "usd", label: "USD" },
                { value: "rub", label: "RUB" },
              ]}
              onChange={() => {}}
            />
          </div>
          <div className={s.datePicker}>
            <CiCalendar size={20} />
            <span>Feb 28, 2024</span>
          </div>
        </div>
        <div className={s.actions}>
          <Button variant="primary" icon={MdAdd}>
            Добавить платёж
          </Button>
          <Button variant="secondary" icon={MdDownload}>
            Экспорт
          </Button>
        </div>
      </div>

      <UITable
        columns={columns}
        rows={payments}
        showCheckbox={true}
        type="default"
      />

      <div className={s.footer}>
        <span className={s.paginationInfo}>
          Показано {startItem}-{endItem} из {totalItems} записей
        </span>
        <div className={s.pagination}>
          <button
            className={s.pageButton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Предыдущая
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${s.pageButton} ${
                currentPage === page ? s.pageButtonActive : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={s.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Следующая
          </button>
        </div>
      </div>
    </Container>
  );
}

