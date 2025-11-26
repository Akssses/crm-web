"use client";
import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button } from "@/ui";
import { CiFilter } from "react-icons/ci";
import s from "./FilterModal.module.scss";

export default function FilterModal({ 
  isOpen, 
  onClose, 
  onApply, 
  tableData = [], 
  columns = [] 
}) {
  const [filters, setFilters] = useState({});

  // Анализируем данные таблицы и создаем фильтры
  useEffect(() => {
    if (!tableData || tableData.length === 0) return;

    const newFilters = {};
    
    columns.forEach((column) => {
      const key = column.key;
      
      // Пропускаем служебные поля
      if (
        key === "id" || 
        key === "avatar" || 
        key === "actions" || 
        key === "Действия"
      ) {
        return;
      }

      // Получаем уникальные значения для этого поля
      const uniqueValues = [...new Set(
        tableData
          .map((row) => row[key])
          .filter((val) => val !== null && val !== undefined && val !== "")
      )];

      // Определяем тип поля
      const firstValue = uniqueValues[0];
      const isNumber = typeof firstValue === "number";
      const isBoolean = typeof firstValue === "boolean";
      const hasFewValues = uniqueValues.length <= 10; // Если уникальных значений мало, делаем Select

      if (isBoolean) {
        // Для булевых значений - Select
        newFilters[key] = {
          type: "select",
          label: column.label || key,
          value: "",
          options: [
            { value: "", label: "Все" },
            { value: "true", label: "Да" },
            { value: "false", label: "Нет" },
          ],
        };
      } else if (hasFewValues && !isNumber) {
        // Для полей с небольшим количеством уникальных значений - Select
        newFilters[key] = {
          type: "select",
          label: column.label || key,
          value: "",
          options: [
            { value: "", label: "Все" },
            ...uniqueValues.map((val) => ({
              value: String(val),
              label: String(val),
            })),
          ],
        };
      } else {
        // Для остальных - Input
        newFilters[key] = {
          type: "input",
          label: column.label || key,
          value: "",
          inputType: isNumber ? "number" : "text",
        };
      }
    });

    setFilters(newFilters);
  }, [tableData, columns]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  const handleApply = () => {
    const appliedFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key].value !== "") {
        appliedFilters[key] = filters[key].value;
      }
    });
    onApply?.(appliedFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {};
    Object.keys(filters).forEach((key) => {
      resetFilters[key] = {
        ...filters[key],
        value: "",
      };
    });
    setFilters(resetFilters);
  };

  const filterEntries = Object.entries(filters);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Фильтры"
      position="center"
      width="600px"
      icon={CiFilter}
    >
      <div className={s.filterContent}>
        {filterEntries.length === 0 ? (
          <p className={s.emptyMessage}>Нет доступных фильтров</p>
        ) : (
          <div className={s.filtersGrid}>
            {filterEntries.map(([key, filter]) => (
              <div key={key} className={s.filterItem}>
                {filter.type === "select" ? (
                  <Select
                    label={filter.label}
                    options={filter.options}
                    value={filter.value}
                    onChange={(value) => handleFilterChange(key, value)}
                    placeholder={`Выберите ${filter.label.toLowerCase()}`}
                  />
                ) : (
                  <Input
                    label={filter.label}
                    type={filter.inputType || "text"}
                    placeholder={`Введите ${filter.label.toLowerCase()}`}
                    value={filter.value}
                    onChange={(value) => handleFilterChange(key, value)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className={s.actions}>
          <Button variant="outline" onClick={handleReset}>
            Сбросить
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Применить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

