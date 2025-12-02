"use client";
import React, { useState } from "react";
import Header from "../../dashboard/components/Header";
import DocumentsFilters from "./DocumentsFilters";
import DocumentsList from "./DocumentsList";
import DocumentsJournal from "./DocumentsJournal";
import s from "../styles/Documents.module.scss";

export default function Documents() {
  const [filters, setFilters] = useState({
    serviceType: "all",
    documentType: "all",
    status: "all",
    service: "all",
  });
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className={s.documents}>
      <Header />
      <div className={s.content}>
        <div className={s.tabs}>
          <button
            className={`${s.tab} ${activeTab === "list" ? s.active : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Документы
          </button>
          <button
            className={`${s.tab} ${activeTab === "journal" ? s.active : ""}`}
            onClick={() => setActiveTab("journal")}
          >
            Журнал
          </button>
        </div>

        {activeTab === "list" && (
          <>
            <DocumentsFilters filters={filters} onFiltersChange={setFilters} />
            <DocumentsList filters={filters} />
          </>
        )}

        {activeTab === "journal" && <DocumentsJournal />}
      </div>
    </div>
  );
}
