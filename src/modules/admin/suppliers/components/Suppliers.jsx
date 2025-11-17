"use client";
import React, { useState } from "react";
import s from "../styles/Suppliers.module.scss";
import { CiFilter } from "react-icons/ci";
import { Button, Input } from "@/ui";
import { TiPlus } from "react-icons/ti";
// import { SuppliersTable } from "../../organizations/components/Table"; // ← Таблица поставщиков
import AddSupplierModal from "./AddSupplierModal";
import SupplierInfoModal from "./Supplierinfomodal";
import { IoSearchOutline } from "react-icons/io5";
import { SuppliersTable } from "../../users/components/Table";

export default function Suppliers() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [search, setSearch] = useState("");

  // Добавление нового поставщика
  const handleAddSupplier = (formData) => {
    console.log("Новый поставщик:", formData);
    setIsAddModalOpen(false);
    // Отправь на API
  };

  // Клик на строку таблицы - открывает информационный модал
  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsInfoModalOpen(true);
  };

  // Редактировать поставщика
  const handleEditSupplier = (supplier) => {
    console.log("Редактировать:", supplier);
    setIsInfoModalOpen(false);
    setSelectedSupplier(supplier);
    setIsAddModalOpen(true);
  };

  // Удалить поставщика
  const handleDeleteSupplier = (supplierId) => {
    console.log("Удалить:", supplierId);
    setIsInfoModalOpen(false);
    // Удали через API
  };

  // Поделиться поставщиком
  const handleShareSupplier = (supplier) => {
    console.log("Поделиться:", supplier);
    const url = `${window.location.origin}/suppliers/${supplier.id}`;
    navigator.clipboard.writeText(url);
    alert("Ссылка скопирована!");
  };

  return (
    <div className={s.users}>
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
          <Button icon={TiPlus} onClick={() => setIsAddModalOpen(true)}>
            Добавить поставщика
          </Button>
        </div>
      </div>

      {/* Таблица поставщиков */}
      <SuppliersTable onRowClick={handleViewSupplier} />

      {/* Модальное окно добавления */}
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSupplier}
      />

      {/* Модальное окно информации (открывается при клике на строку) */}
      <SupplierInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        supplier={selectedSupplier}
        onEdit={handleEditSupplier}
        onDelete={handleDeleteSupplier}
        onShare={handleShareSupplier}
      />
    </div>
  );
}
