"use client";

import React from "react";
import { Button, Select } from "@/ui";
import { CiCalendar } from "react-icons/ci";
import { MdAdd, MdRestore } from "react-icons/md";
import s from "../styles/Header.module.scss";

const PERIOD_OPTIONS = [
  { value: "today", label: "Сегодня" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "quarter", label: "Квартал" },
];

export default function Header({
  date = "",
  filters = { period: "quarter", organization: "all" },
  organizations = [],
  onFiltersChange = () => {},
  onResetFilters = () => {},
}) {
  return (
    <div className={s.header}>
      <div className={s.left}>
        {/* <span className={s.date}>
          <CiCalendar size={20} />
          {date}
        </span> */}

        <div className={s.filters}>
          <Select
            value={filters.period}
            onChange={(value) => onFiltersChange({ period: value })}
            options={PERIOD_OPTIONS}
            size="sm"
          />
          <Select
            value={filters.organization}
            onChange={(value) => onFiltersChange({ organization: value })}
            options={organizations}
            size="sm"
          />
        </div>
      </div>

      <div className={s.actions}>
        <Button variant="outline" icon={MdRestore} onClick={onResetFilters}>
          Сбросить
        </Button>
        <Button variant="primary" icon={MdAdd} size="md">
          Создать заявку
        </Button>
      </div>
    </div>
  );
}
