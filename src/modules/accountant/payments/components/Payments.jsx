"use client";
import React, { useState } from "react";
import s from "../styles/Finance.module.scss";
import { CiFilter } from "react-icons/ci";
import { Button, Input, Select } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdFileDownload } from "react-icons/md";
import { TransactionsTable } from "../../../admin/users/components/Table";
import TransactionInfoModal from "./Transactioninfomodal";
import StateGrid from "./StateGrid";

export default function Payments() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    organization: "all",
    service: "all",
    currency: "all",
    status: "all",
    source: "all",
  });

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsInfoModalOpen(true);
  };

  const handleEditTransaction = () => {
    setIsInfoModalOpen(false);
  };

  const handleArchiveTransaction = () => {
    setIsInfoModalOpen(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={s.transactions}>
      <StateGrid />

      <div className={s.justi}>
        <div className={s.filterGroup}>
          <Select
            value={filters.organization}
            onChange={(v) => handleFilterChange("organization", v)}
            options={[
              { value: "all", label: "Все организации" },
              { value: "asia", label: "Asia Travel" },
              { value: "techno", label: "Техносервис" },
            ]}
            size="sm"
          />
          <Select
            value={filters.service}
            onChange={(v) => handleFilterChange("service", v)}
            options={[
              { value: "all", label: "Все услуги" },
              { value: "avia", label: "Авиа" },
              { value: "hotel", label: "Отель" },
              { value: "package", label: "Командировка" },
            ]}
            size="sm"
          />
          <Select
            value={filters.currency}
            onChange={(v) => handleFilterChange("currency", v)}
            options={[
              { value: "all", label: "Все валюты" },
              { value: "RUB", label: "RUB" },
              { value: "KGS", label: "KGS" },
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ]}
            size="sm"
          />
          <Select
            value={filters.status}
            onChange={(v) => handleFilterChange("status", v)}
            options={[
              { value: "all", label: "Все статусы" },
              { value: "paid", label: "Оплачено" },
              { value: "partial", label: "Частично" },
              { value: "debt", label: "Задолженность" },
              { value: "error", label: "Ошибка платежа" },
              { value: "pending", label: "Ожидает подтверждения" },
            ]}
            size="sm"
          />
          <Select
            value={filters.source}
            onChange={(v) => handleFilterChange("source", v)}
            options={[
              { value: "all", label: "Все источники" },
              { value: "bank", label: "Банк" },
              { value: "pos", label: "Эквайринг" },
              { value: "cash", label: "Касса" },
            ]}
            size="sm"
          />
        </div>

        <div className={s.flex}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по номеру, заказу или клиенту..."
            value={search}
            onChange={setSearch}
          />
          <Button variant="outline" icon={MdFileDownload}>
            Экспорт
          </Button>
        </div>
      </div>

      <TransactionsTable
        onRowClick={handleViewTransaction}
        filters={{ ...filters, search }}
      />

      <TransactionInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        transaction={selectedTransaction}
        onEdit={handleEditTransaction}
        onArchive={handleArchiveTransaction}
      />
    </div>
  );
}
