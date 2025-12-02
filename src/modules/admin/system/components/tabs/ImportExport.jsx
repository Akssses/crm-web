"use client";
import React, { useState } from "react";
import { Button, Select, Input, UITable } from "@/ui";
import s from "../../styles/SystemAdmin.module.scss";
import {
  TbFileExport,
  TbFileImport,
  TbHistory,
  TbCloudUpload,
  TbFileSpreadsheet,
  TbDownload,
  TbFilter,
  TbCheck,
  TbAlertCircle,
} from "react-icons/tb";

const ENTITY_OPTIONS = [
  { value: "clients", label: "Клиенты" },
  { value: "requests", label: "Заявки" },
  { value: "orders", label: "Заказы" },
  { value: "services", label: "Услуги" },
  { value: "payments", label: "Платежи" },
  { value: "organizations", label: "Организации" },
  { value: "suppliers", label: "Поставщики" },
  { value: "employees", label: "Справочник сотрудников" },
  { value: "documents", label: "Документы (метаданные)" },
];

const MOCK_IMPORT_LOG = [
  {
    id: 1,
    date: "2025-12-01 12:30",
    user: "admin@crm.local",
    entity: "Клиенты",
    rows: 150,
    success: 140,
    failed: 10,
    status: "warning", // success, warning, error
    statusText: "Завершено с ошибками",
  },
  {
    id: 2,
    date: "2025-11-30 10:15",
    user: "manager@crm.local",
    entity: "Заявки",
    rows: 45,
    success: 45,
    failed: 0,
    status: "success",
    statusText: "Успешно",
  },
];

export default function ImportExport() {
  const [mode, setMode] = useState("export"); // export | import | journal
  const [filters, setFilters] = useState({});
  const [selectedEntity, setSelectedEntity] = useState("clients");
  const [dragActive, setDragActive] = useState(false); // оставлен на будущее, сейчас не используется

  const handleDrag = () => {};

  const columns = [
    { key: "date", label: "Дата операции" },
    { key: "user", label: "Пользователь" },
    { key: "entity", label: "Сущность" },
    { key: "rows", label: "Строк" },
    {
      key: "success",
      label: "Успешно",
      render: (row) => <span className={s.textSuccess}>{row.success}</span>,
    },
    {
      key: "failed",
      label: "Ошибки",
      render: (row) =>
        row.failed > 0 ? (
          <span className={s.textError}>{row.failed}</span>
        ) : (
          "0"
        ),
    },
    {
      key: "status",
      label: "Статус",
      render: (row) => (
        <span className={`${s.statusBadge} ${s[row.status]}`}>
          {row.statusText}
        </span>
      ),
    },
  ];

  const filteredLog = MOCK_IMPORT_LOG.filter((row) => {
    const search = (filters.search || "").toLowerCase();
    if (!search) return true;
    return (
      row.user.toLowerCase().includes(search) ||
      row.entity.toLowerCase().includes(search)
    );
  });

  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <div>
          <h2>Экспорт и журнал операций</h2>
          <p className={s.headerSubtitle}>
            Массовый экспорт данных и история операций импорта/экспорта
          </p>
        </div>

        <div className={s.segmentedControl}>
          <button
            className={mode === "export" ? s.segmentActive : s.segment}
            onClick={() => setMode("export")}
          >
            <TbFileExport size={18} />
            <span>Экспорт</span>
          </button>
          <button
            className={mode === "journal" ? s.segmentActive : s.segment}
            onClick={() => setMode("journal")}
          >
            <TbHistory size={18} />
            <span>Журнал</span>
          </button>
        </div>
      </div>

      {mode === "export" && (
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h3>Экспорт данных</h3>
            <p>Выгрузка данных из системы в удобном формате</p>
          </div>

          <div className={s.exportLayout}>
            <div className={s.formGrid}>
              <Select
                label="Сущность для выгрузки"
                value={selectedEntity}
                onChange={setSelectedEntity}
                options={ENTITY_OPTIONS}
              />
              <Select
                label="Формат файла"
                value={filters.format || "xlsx"}
                onChange={(val) => setFilters({ ...filters, format: val })}
                options={[
                  { value: "xlsx", label: "Excel (XLSX)" },
                  { value: "csv", label: "CSV (UTF-8)" },
                  { value: "json", label: "JSON" },
                  { value: "zip", label: "ZIP (архив вложений)" },
                ]}
              />
              <Input
                label="Период с"
                type="date"
                value={filters.dateFrom || ""}
                onChange={(val) => setFilters({ ...filters, dateFrom: val })}
              />
              <Input
                label="Период по"
                type="date"
                value={filters.dateTo || ""}
                onChange={(val) => setFilters({ ...filters, dateTo: val })}
              />
            </div>

            <div className={s.infoBox}>
              <TbAlertCircle size={20} className={s.infoIcon} />
              <div>
                <h4>Обратите внимание</h4>
                <p>
                  При выборе большого периода формирование файла может занять
                  некоторое время. Ссылка на скачивание придет в уведомлениях.
                </p>
              </div>
            </div>
          </div>

          <div className={s.cardFooter}>
            <Button variant="secondary">Сбросить фильтры</Button>
            <Button icon={TbDownload}>Начать экспорт</Button>
          </div>
        </div>
      )}

      {mode === "journal" && (
        <div className={s.card}>
          <div className={s.journalHeader}>
            <h3>История операций</h3>
            <div className={s.searchBox}>
              <TbFilter size={16} className={s.searchIcon} />
              <input
                type="text"
                placeholder="Поиск по пользователю..."
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
          </div>
          <UITable columns={columns} rows={filteredLog} />
        </div>
      )}
    </div>
  );
}
