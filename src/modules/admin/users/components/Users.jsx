"use client";
import React, { useState, useMemo } from "react";
import { UsersTable, getUsersTableData } from "./Table";
import s from "../styles/Users.module.scss";
import { Button, Select, Input } from "@/ui";
import { TiPlus } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import AddUserModal from "./AddUserModal";
import AddTaskModal from "./AddTaskModal";

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTask, SetIsTask] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(""); // "active" | "inactive" | ""

  const usersData = useMemo(() => getUsersTableData(), []);

  const handleAddUser = (userData) => {
    setIsModalOpen(false);
  };

  const handleAddTask = (userData) => {
    SetIsTask(false);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Применяем сортировку по активности
  const sortedAndFilteredData = useMemo(() => {
    let data = [...usersData];

    // Применяем фильтры
    if (Object.keys(filters).length > 0) {
      data = data.filter((row) => {
        return Object.keys(filters).every((key) => {
          const filterValue = filters[key];
          if (!filterValue) return true;

          // Для поиска проверяем все поля
          if (key === "search") {
            const searchLower = String(filterValue).toLowerCase();
            return (
              String(row.name || "").toLowerCase().includes(searchLower) ||
              String(row.email || "").toLowerCase().includes(searchLower) ||
              String(row.phone || "").toLowerCase().includes(searchLower) ||
              String(row.organization || "").toLowerCase().includes(searchLower) ||
              String(row.role || "").toLowerCase().includes(searchLower)
            );
          }

          const rowValue = String(row[key] || "").toLowerCase();
          const filterValueLower = String(filterValue).toLowerCase();

          if (filterValue === "true" || filterValue === "false") {
            return String(row[key]) === filterValue;
          }

          return rowValue.includes(filterValueLower);
        });
      });
    }

    // Применяем сортировку по активности
    if (sortBy === "active") {
      data = data.sort((a, b) => {
        if (a.status === "Активен" && b.status !== "Активен") return -1;
        if (a.status !== "Активен" && b.status === "Активен") return 1;
        return 0;
      });
    } else if (sortBy === "inactive") {
      data = data.sort((a, b) => {
        if (a.status !== "Активен" && b.status === "Активен") return -1;
        if (a.status === "Активен" && b.status !== "Активен") return 1;
        return 0;
      });
    }

    return data;
  }, [usersData, filters, sortBy]);

  return (
    <div className={s.users}>
      <div className={s.justi}>
        <div className={s.filtersGroup}>
          <div className={s.searchWrapper}>
            <Input
              icon={CiSearch}
              label=""
              placeholder="Поиск..."
              value={filters.search || ""}
              onChange={(val) => setFilters({ ...filters, search: val })}
            />
          </div>
          <div className={s.selectWrapper}>
            <Select
              label=""
              placeholder="Сортировка по активности"
              value={sortBy}
              onChange={handleSortChange}
              options={[
                { value: "", label: "Все" },
                { value: "active", label: "Активные" },
                { value: "inactive", label: "Неактивные" },
              ]}
            />
          </div>
        </div>
        <div className={s.flex}>
          <Button
            icon={TiPlus}
            onClick={() => SetIsTask(true)}
            variant="bgyellow"
          >
            Добавить задачу
          </Button>
          <Button icon={TiPlus} onClick={() => setIsModalOpen(true)}>
            Добавить пользователя
          </Button>
        </div>
      </div>
      <UsersTable data={sortedAndFilteredData} onFilterApply={filters} />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
      <AddTaskModal
        isOpen={isTask}
        onClose={() => SetIsTask(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
}
