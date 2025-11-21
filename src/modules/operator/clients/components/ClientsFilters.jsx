"use client";
import React from "react";
import { Button, Input } from "@/ui";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import s from "../styles/ClientsFilters.module.scss";

export default function ClientsFilters({ onAddClick }) {
  return (
    <div className={s.filters}>
      <Button variant="outline" icon={CiFilter}>
        Filter
      </Button>
      <div className={s.searchWrapper}>
        <Input
          icon={IoSearchOutline}
          placeholder="Поиск..."
          onChange={() => {}}
        />
      </div>
      <Button variant="primary" icon={MdAdd} onClick={onAddClick}>
        Добавить клиента
      </Button>
    </div>
  );
}

