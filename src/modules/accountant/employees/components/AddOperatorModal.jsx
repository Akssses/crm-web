"use client";

import React, { useState } from "react";
import { Modal, Input, Select, Button } from "@/ui";
import s from "@/modules/admin/organizations/styles/Modal.module.scss";
import { FaUserPlus } from "react-icons/fa";

const POSITION_OPTIONS = [
  { value: "operator", label: "Оператор" },
  { value: "senior_operator", label: "Старший оператор" },
  { value: "team_lead", label: "Тимлид" },
];

const DEPARTMENT_OPTIONS = [
  { value: "sales", label: "Отдел продаж" },
  { value: "support", label: "Служба поддержки" },
  { value: "booking", label: "Отдел бронирования" },
];

export default function AddOperatorModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    baseSalary: "",
    commissionRate: "",
    startDate: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.({
      id: `OP-${Date.now()}`,
      ...form,
    });
    // Reset form
    setForm({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      baseSalary: "",
      commissionRate: "",
      startDate: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить оператора"
      position="right"
      size="sm"
      icon={FaUserPlus}
    >
      <div className={s.modalContent}>
        <div className={s.section}>
          <h4 className={s.sectionTitle}>Личные данные</h4>
          
          <Input
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            value={form.fullName}
            onChange={(val) => handleChange("fullName", val)}
          />

          <div className={s.twoColumns}>
            <Input
              label="Email"
              type="email"
              placeholder="ivanov@example.com"
              value={form.email}
              onChange={(val) => handleChange("email", val)}
            />
            <Input
              label="Телефон"
              placeholder="+7 999 999 99 99"
              value={form.phone}
              onChange={(val) => handleChange("phone", val)}
            />
          </div>
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Должность и отдел</h4>
          
          <div className={s.twoColumns}>
            <Select
              label="Должность"
              value={form.position}
              onChange={(val) => handleChange("position", val)}
              options={POSITION_OPTIONS}
              placeholder="Выберите должность"
            />
            <Select
              label="Отдел"
              value={form.department}
              onChange={(val) => handleChange("department", val)}
              options={DEPARTMENT_OPTIONS}
              placeholder="Выберите отдел"
            />
          </div>

          <Input
            label="Дата начала работы"
            type="date"
            value={form.startDate}
            onChange={(val) => handleChange("startDate", val)}
          />
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Оплата труда</h4>
          
          <div className={s.twoColumns}>
            <Input
              label="Оклад (₽)"
              type="number"
              placeholder="40000"
              value={form.baseSalary}
              onChange={(val) => handleChange("baseSalary", val)}
            />
            <Input
              label="Процент от продаж (%)"
              type="number"
              placeholder="5"
              value={form.commissionRate}
              onChange={(val) => handleChange("commissionRate", val)}
            />
          </div>
        </div>

        <div className={s.actions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Добавить</Button>
        </div>
      </div>
    </Modal>
  );
}
