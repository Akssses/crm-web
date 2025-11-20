"use client";
import React, { useState } from "react";
import s from "../styles/Finance.module.scss";
import { CiFilter } from "react-icons/ci";
import { Button, Input } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { TransactionsTable } from "../../users/components/Table";
import TransactionInfoModal from "./Transactioninfomodal";
import StateGrid from "./StateGrid";

export default function Transactions() {
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

  return (
    <div className={s.transactions}>
      <div className={s.justi}>
        <Button variant="outline" icon={CiFilter}>
          Filter
        </Button>
        <div className={s.flex}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
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
    </div>
  );
}
