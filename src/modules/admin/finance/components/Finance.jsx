"use client";
import React, { useState } from "react";
import s from "../styles/Finance.module.scss";
import { CiFilter } from "react-icons/ci";
import { Button, Input } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { TransactionsTable } from "../../users/components/Table";
import TransactionInfoModal from "./Transactioninfomodal";
import StateGrid from "./StateGrid";
import FinanceSuppliers from "./FinanceSuppliers";
import FinanceConfiguration from "./FinanceConfiguration";


const TABS = [
  { id: "overview", label: "Операции и сводка" },
  { id: "suppliers", label: "Поставщики и задолженность" },
  { id: "configuration", label: "Конфигурация и правила" },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [search, setSearch] = useState("");

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className={s.toolbar}>
              <Button variant="outline" icon={CiFilter}>
                Фильтры
              </Button>
              <div className={s.searchWrapper}>
                <Input
                  icon={IoSearchOutline}
                  placeholder="Поиск по операциям, заказам, клиентам..."
                  value={search}
                  onChange={setSearch}
                />
              </div>
            </div>
            <StateGrid />
            <TransactionsTable onRowClick={handleViewTransaction} />
            <TransactionInfoModal
              isOpen={isInfoModalOpen}
              onClose={() => setIsInfoModalOpen(false)}
              transaction={selectedTransaction}
              onEdit={handleEditTransaction}
              onArchive={handleArchiveTransaction}
            />
          </>
        );
      case "suppliers":
        return <FinanceSuppliers />;
      case "configuration":
        return <FinanceConfiguration />;
      default:
        return null;
    }
  };

  return (
    <div className={s.finance}>
      <div className={s.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className={s.content}>{renderTabContent()}</section>
    </div>
  );
}
