"use client";
import React, { useState } from "react";
import ClientsFilters from "./ClientsFilters";
import ClientsTable from "./ClientsTable";
import AddClientModal from "./AddClientModal";
import s from "../styles/Clients.module.scss";

export default function Clients() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClient = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    console.log("Клиент создан");
    setIsModalOpen(false);
  };

  return (
    <div className={s.clients}>
      <ClientsFilters onAddClick={handleAddClient} />
      <ClientsTable onAddClick={handleAddClient} />
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
