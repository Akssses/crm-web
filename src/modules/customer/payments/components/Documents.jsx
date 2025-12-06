"use client";
import React, { useState, useMemo } from "react";
import { Button, Select, Input, UITable } from "@/ui";
import { MdDownload, MdEmail, MdVisibility, MdRefresh } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/Documents.module.scss";

const DOCUMENT_TYPES = [
  { value: "all", label: "Все документы" },
  { value: "invoice", label: "Счёт" },
  { value: "receipt", label: "Чек" },
  { value: "act", label: "Акт" },
  { value: "upd", label: "УПД" },
  { value: "contract", label: "Договор" },
  { value: "bank_confirmation", label: "Подтверждение банка" },
  { value: "refund_application", label: "Заявление на возврат" },
  { value: "refund_act", label: "Акт возврата" },
];

const MOCK_DOCUMENTS = [
  {
    id: "DOC-001",
    type: "receipt",
    typeLabel: "Чек",
    order: "ORD-145",
    payment: "PAY-001",
    date: "2025-01-15 14:30",
    status: "available",
  },
  {
    id: "DOC-002",
    type: "invoice",
    typeLabel: "Счёт",
    order: "ORD-145",
    payment: "PAY-001",
    date: "2025-01-15 14:25",
    status: "available",
  },
  {
    id: "DOC-003",
    type: "act",
    typeLabel: "Акт",
    order: "ORD-145",
    payment: null,
    date: "2025-01-15 14:20",
    status: "available",
  },
  {
    id: "DOC-004",
    type: "refund_application",
    typeLabel: "Заявление на возврат",
    order: "ORD-144",
    payment: null,
    refund: "REF-001",
    date: "2025-01-15 10:30",
    status: "available",
  },
];

export default function Documents() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDocuments = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchesSearch =
        !search ||
        doc.id.toLowerCase().includes(search.toLowerCase()) ||
        doc.order.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || doc.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const columns = [
    {
      key: "id",
      label: "ID документа",
      flex: 1,
    },
    {
      key: "type",
      label: "Тип",
      flex: 1,
      render: (value, row) => <span>{row.typeLabel}</span>,
    },
    {
      key: "order",
      label: "Заказ",
      flex: 0.8,
    },
    {
      key: "payment",
      label: "Платеж / Возврат",
      flex: 1,
      render: (value, row) => <span>{row.payment || row.refund || "—"}</span>,
    },
    {
      key: "date",
      label: "Дата",
      flex: 1,
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button
            variant="outline"
            size="sm"
            icon={MdDownload}
            onClick={() => console.log("Download:", row.id)}
          >
            Скачать
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdVisibility}
            onClick={() => console.log("View:", row.id)}
          >
            Просмотр
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdEmail}
            onClick={() => console.log("Email:", row.id)}
          >
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdRefresh}
            onClick={() => console.log("Refresh:", row.id)}
          >
            Обновить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.documents}>
      <div className={s.header}>
        <h3 className={s.sectionTitle}>Документы</h3>
        <p className={s.sectionDescription}>
          Все документы по оплатам и возвратам: чеки, счета, акты, УПД
        </p>
      </div>

      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, заказу..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            options={DOCUMENT_TYPES}
            size="sm"
          />
        </div>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredDocuments}
          showCheckbox={false}
        />
      </div>
    </div>
  );
}
