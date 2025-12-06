"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Select, UITable } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd, MdWarning, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import SupplierDetailModal from "./SupplierDetailModal";
import CreatePayoutModal from "./CreatePayoutModal";
import PayoutsRegistry from "./PayoutsRegistry";
import s from "../styles/SuppliersPayouts.module.scss";

const CURRENCY_OPTIONS = [
  { value: "all", label: "Все валюты" },
  { value: "KGS", label: "KGS" },
  { value: "RUB", label: "RUB" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Все статусы" },
  { value: "overdue", label: "Есть просрочка" },
  { value: "pending", label: "К выплате" },
  { value: "normal", label: "В норме" },
];

const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "Turkish Airlines",
    currency: "USD",
    totalDebt: 12500,
    toPayToday: 3200,
    overdue: 2300,
    future: 8000,
    paidThisMonth: 25000,
    margin: 4200,
    servicesCount: 45,
    slaLevel: "95%",
    paymentTerms: "30 дней",
    contractCurrency: "USD",
    exchangeRate: 89.5,
    status: "overdue",
    services: [
      { id: "ORD-145", status: "to_pay", amount: 1200, dueDate: "2025-01-15" },
      { id: "ORD-144", status: "overdue", amount: 800, dueDate: "2025-01-10" },
      { id: "ORD-143", status: "pending", amount: 1200, dueDate: "2025-01-20" },
    ],
  },
  {
    id: 2,
    name: "Booking.com",
    currency: "EUR",
    totalDebt: 8700,
    toPayToday: 0,
    overdue: 0,
    future: 3200,
    paidThisMonth: 18000,
    margin: 2100,
    servicesCount: 32,
    slaLevel: "98%",
    paymentTerms: "14 дней",
    contractCurrency: "EUR",
    exchangeRate: 97.2,
    status: "normal",
    services: [
      { id: "ORD-142", status: "pending", amount: 1500, dueDate: "2025-01-18" },
      { id: "ORD-141", status: "pending", amount: 1700, dueDate: "2025-01-19" },
    ],
  },
  {
    id: 3,
    name: "Local DMC Dubai",
    currency: "USD",
    totalDebt: 5200,
    toPayToday: 1500,
    overdue: 1000,
    future: 4500,
    paidThisMonth: 9000,
    margin: 1800,
    servicesCount: 18,
    slaLevel: "92%",
    paymentTerms: "45 дней",
    contractCurrency: "USD",
    exchangeRate: 89.5,
    status: "overdue",
    services: [
      { id: "ORD-140", status: "overdue", amount: 1000, dueDate: "2025-01-08" },
      { id: "ORD-139", status: "to_pay", amount: 1500, dueDate: "2025-01-15" },
    ],
  },
];

export default function SuppliersPayouts() {
  const [activeTab, setActiveTab] = useState("suppliers"); // suppliers, registry
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreatePayoutModalOpen, setIsCreatePayoutModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    currency: "all",
    status: "all",
  });

  const filteredSuppliers = useMemo(() => {
    return MOCK_SUPPLIERS.filter((supplier) => {
      const matchesSearch =
        !search || supplier.name.toLowerCase().includes(search.toLowerCase());
      const matchesCurrency =
        filters.currency === "all" || supplier.currency === filters.currency;
      const matchesStatus =
        filters.status === "all" || supplier.status === filters.status;

      return matchesSearch && matchesCurrency && matchesStatus;
    });
  }, [search, filters]);

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailModalOpen(true);
  };

  const handleCreatePayout = (supplier = null) => {
    if (supplier) {
      setSelectedSupplier(supplier);
    }
    setIsCreatePayoutModalOpen(true);
  };

  const columns = [
    {
      key: "name",
      label: "Поставщик",
      flex: 2,
      render: (value, row) => (
        <div className={s.supplierNameCell}>
          <div className={s.supplierName}>{value}</div>
          <div className={s.supplierMeta}>
            <span className={s.currency}>Валюта: {row.currency}</span>
            <span className={s.servicesCount}>Услуг: {row.servicesCount}</span>
            <span className={s.sla}>SLA: {row.slaLevel}</span>
          </div>
        </div>
      ),
    },
    {
      key: "totalDebt",
      label: "Текущая задолженность",
      flex: 1.3,
      render: (value, row) => (
        <div className={s.amountCell}>
          <span className={s.amount}>
            {value.toLocaleString()} {row.currency}
          </span>
        </div>
      ),
    },
    {
      key: "toPayToday",
      label: "К выплате сегодня",
      flex: 1.3,
      render: (value, row) => (
        <div className={s.amountCell}>
          <span className={`${s.amount} ${value > 0 ? s.amountUrgent : ""}`}>
            {value.toLocaleString()} {row.currency}
          </span>
        </div>
      ),
    },
    {
      key: "overdue",
      label: "Просрочено",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.amountCell}>
          {value > 0 ? (
            <span className={`${s.amount} ${s.amountDanger}`}>
              {value.toLocaleString()} {row.currency}
            </span>
          ) : (
            <span className={s.amount}>—</span>
          )}
        </div>
      ),
    },
    {
      key: "paidThisMonth",
      label: "Выплачено за месяц",
      flex: 1.3,
      render: (value, row) => (
        <div className={s.amountCell}>
          <span className={s.amount}>
            {value.toLocaleString()} {row.currency}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.5,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSupplierClick(row);
            }}
          >
            Детали
          </Button>
          <Button
            variant="success"
            size="sm"
            icon={MdAdd}
            onClick={(e) => {
              e.stopPropagation();
              handleCreatePayout(row);
            }}
          >
            Выплата
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.suppliersPayouts}>
      <div className={s.header}>
        <div className={s.headerActions}>
          <Button
            variant="primary"
            icon={MdAdd}
            onClick={() => handleCreatePayout()}
          >
            Создать выплату
          </Button>
        </div>
      </div>

      <div className={s.tabs}>
        <button
          className={`${s.tab} ${activeTab === "suppliers" ? s.active : ""}`}
          onClick={() => setActiveTab("suppliers")}
        >
          Поставщики
        </button>
        <button
          className={`${s.tab} ${activeTab === "registry" ? s.active : ""}`}
          onClick={() => setActiveTab("registry")}
        >
          Реестр выплат
        </button>
      </div>

      {activeTab === "suppliers" && (
        <>
          <div className={s.toolbar}>
            <div className={s.filterGroup}>
              <Input
                icon={IoSearchOutline}
                placeholder="Поиск по поставщику..."
                value={search}
                onChange={setSearch}
                className={s.searchInput}
              />
              <Select
                value={filters.currency}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, currency: value }))
                }
                options={CURRENCY_OPTIONS}
                size="sm"
              />
              <Select
                value={filters.status}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
                options={STATUS_OPTIONS}
                size="sm"
              />
            </div>
          </div>

          <div className={s.tableBlock}>
            <UITable
              columns={columns}
              rows={filteredSuppliers}
              showCheckbox={false}
              onRowClick={handleSupplierClick}
            />
          </div>

          {filteredSuppliers.length === 0 && (
            <div className={s.emptyState}>
              <MdInfoOutline size={48} />
              <p>Поставщики не найдены</p>
            </div>
          )}
        </>
      )}

      {activeTab === "registry" && (
        <PayoutsRegistry onCreatePayout={() => handleCreatePayout()} />
      )}

      {isDetailModalOpen && selectedSupplier && (
        <SupplierDetailModal
          supplier={selectedSupplier}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedSupplier(null);
          }}
          onCreatePayout={() => {
            setIsDetailModalOpen(false);
            handleCreatePayout(selectedSupplier);
          }}
        />
      )}

      {isCreatePayoutModalOpen && (
        <CreatePayoutModal
          supplier={selectedSupplier}
          isOpen={isCreatePayoutModalOpen}
          onClose={() => {
            setIsCreatePayoutModalOpen(false);
            setSelectedSupplier(null);
          }}
        />
      )}
    </div>
  );
}
