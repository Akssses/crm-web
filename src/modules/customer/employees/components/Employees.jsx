"use client";

import React, { useState, useMemo } from "react";
import s from "../styles/Employees.module.scss";
import { Input, Button, FilterButton } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import EmployeesTable from "./EmployeesTable";
import AddEmployeeModal from "./AddEmployeeModal";

const INITIAL_EMPLOYEES = [
  {
    id: "EMP-001",
    fullName: "Алина Максим",
    position: "Менеджер",
    phone: "+999 999 999 999",
    email: "example@gmail.com",
    birthday: "15.11.2024",
    citizenship: "RUS",
  },
  {
    id: "EMP-002",
    fullName: "Михаил Иванов",
    position: "Директор",
    phone: "+999 999 999 999",
    email: "example@gmail.com",
    birthday: "15.11.2024",
    citizenship: "KGZ",
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const filteredEmployees = useMemo(() => {
    if (!search) return employees;
    const q = search.toLowerCase();
    return employees.filter(
      (e) =>
        e.fullName.toLowerCase().includes(q) ||
        e.position?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q)
    );
  }, [employees, search]);

  return (
    <div className={s.employees}>
      <div className={s.header}>
        <div className={s.left}>
          <FilterButton
            tableData={employees}
            columns={[
              { key: "fullName", label: "ФИО" },
              { key: "position", label: "Должность" },
              { key: "citizenship", label: "Гражданство" },
            ]}
          />
        </div>
        <div className={s.actions}>
          <Input
            placeholder="Поиск..."
            icon={IoSearchOutline}
            className={s.search}
            value={search}
            onChange={setSearch}
          />
          <Button
            variant="bgblue"
            size="md"
            icon={MdAdd}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить сотрудника
          </Button>
        </div>
      </div>

      <EmployeesTable rows={filteredEmployees} />

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
}


