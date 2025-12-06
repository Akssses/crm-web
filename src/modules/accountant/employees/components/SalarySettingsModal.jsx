"use client";

import React, { useState } from "react";
import { Modal, Input, Select, Button } from "@/ui";
import s from "@/modules/admin/organizations/styles/Modal.module.scss";
import { FaCog } from "react-icons/fa";

const CALCULATION_TYPE_OPTIONS = [
  { value: "fixed_plus_percent", label: "Оклад + процент от продаж" },
  { value: "percent_only", label: "Только процент от продаж" },
  { value: "fixed_only", label: "Только оклад" },
];

const COMMISSION_BASE_OPTIONS = [
  { value: "total_commission", label: "От общей комиссии" },
  { value: "agency_commission", label: "От агентской комиссии" },
  { value: "markup", label: "От маркапа" },
];

export default function SalarySettingsModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  operatorName = "Оператор" 
}) {
  const [form, setForm] = useState({
    calculationType: "fixed_plus_percent",
    baseSalary: "40000",
    commissionRate: "5",
    commissionBase: "total_commission",
    minSalary: "30000",
    maxCommission: "",
    bonusForTarget: "5000",
    targetAmount: "500000",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.(form);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Настройки ЗП — ${operatorName}`}
      position="right"
      size="md"
      icon={FaCog}
    >
      <div className={s.modalContent}>
        <div className={s.section}>
          <h4 className={s.sectionTitle}>Тип расчёта</h4>
          
          <Select
            label="Схема оплаты"
            value={form.calculationType}
            onChange={(val) => handleChange("calculationType", val)}
            options={CALCULATION_TYPE_OPTIONS}
          />

          <div style={{ 
            padding: "12px", 
            backgroundColor: "#f3f4f6", 
            borderRadius: "8px",
            fontSize: "13px",
            lineHeight: "1.5",
            color: "#6b7280"
          }}>
            <strong>Текущая схема:</strong> Оператор получает фиксированный оклад 
            плюс процент от продаж. Процент рассчитывается от комиссии агентства.
          </div>
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Фиксированная часть</h4>
          
          <div className={s.twoColumns}>
            <Input
              label="Оклад (₽)"
              type="number"
              placeholder="40000"
              value={form.baseSalary}
              onChange={(val) => handleChange("baseSalary", val)}
            />
            <Input
              label="Минимальная ЗП (₽)"
              type="number"
              placeholder="30000"
              value={form.minSalary}
              onChange={(val) => handleChange("minSalary", val)}
            />
          </div>
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Процент от продаж</h4>
          
          <div className={s.twoColumns}>
            <Input
              label="Процент (%)"
              type="number"
              placeholder="5"
              value={form.commissionRate}
              onChange={(val) => handleChange("commissionRate", val)}
            />
            <Select
              label="База для расчёта"
              value={form.commissionBase}
              onChange={(val) => handleChange("commissionBase", val)}
              options={COMMISSION_BASE_OPTIONS}
            />
          </div>

          <Input
            label="Максимальная сумма процентов (₽, опционально)"
            type="number"
            placeholder="Без ограничений"
            value={form.maxCommission}
            onChange={(val) => handleChange("maxCommission", val)}
          />
        </div>

        <div className={s.section}>
          <h4 className={s.sectionTitle}>Бонусы и премии</h4>
          
          <div className={s.twoColumns}>
            <Input
              label="Бонус за выполнение плана (₽)"
              type="number"
              placeholder="5000"
              value={form.bonusForTarget}
              onChange={(val) => handleChange("bonusForTarget", val)}
            />
            <Input
              label="Целевой объём продаж (₽)"
              type="number"
              placeholder="500000"
              value={form.targetAmount}
              onChange={(val) => handleChange("targetAmount", val)}
            />
          </div>

          <div style={{ 
            padding: "12px", 
            backgroundColor: "#ecfdf5", 
            borderRadius: "8px",
            fontSize: "13px",
            lineHeight: "1.5",
            color: "#059669",
            border: "1px solid #a7f3d0"
          }}>
            💡 <strong>Совет:</strong> Бонусы начисляются автоматически при достижении 
            целевого объёма продаж в отчётном периоде.
          </div>
        </div>

        <div className={s.actions}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Сохранить настройки</Button>
        </div>
      </div>
    </Modal>
  );
}
