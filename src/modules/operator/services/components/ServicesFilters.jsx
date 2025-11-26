"use client";
import React from "react";
import { Button, Input } from "@/ui";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/ServicesFilters.module.scss";

export default function ServicesFilters({ onAddClick }) {
  return (
    <div className={s.filters}>
      <Button variant="outline" icon={CiFilter}>
        Filter
      </Button>
      <Input
        icon={IoSearchOutline}
        placeholder="Поиск.."
        onChange={() => {}}
        className={s.search}
      />
    </div>
  );
}

