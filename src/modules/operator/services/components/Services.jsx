"use client";
import React from "react";
import { Container } from "@/ui";
import ServicesFilters from "./ServicesFilters";
import ServicesTable from "./ServicesTable";
import s from "../styles/Services.module.scss";

export default function Services() {
  const handleAddService = () => {
    // TODO: Open add service modal
  };

  return (
    <div className={s.services}>
      <ServicesFilters onAddClick={handleAddService} />
      <ServicesTable />
    </div>
  );
}
