"use client";

import React, { useState } from "react";
import s from "../styles/Document.module.scss";
import { UITable, Button, Input, Select, Container } from "@/ui";
import { MdFileUpload, MdFileDownload } from "react-icons/md";

const IMPORT_TYPES = [
  { value: "payments", label: "Платежи поставщикам" },
  { value: "reconciliation", label: "Сверки с поставщиками" },
];

const EXPORT_FORMATS = [
  { value: "excel", label: "Excel (.xlsx)" },
  { value: "xml", label: "XML для бухгалтерии" },
];

export default function DataImportExport() {
  const [importType, setImportType] = useState("payments");
  const [exportFormat, setExportFormat] = useState("excel");
  const [fileName, setFileName] = useState("");

  const historyColumns = [
    { key: "date", label: "Дата и время" },
    { key: "direction", label: "Направление" },
    { key: "type", label: "Тип данных" },
    { key: "file", label: "Файл" },
    { key: "status", label: "Статус" },
    { key: "details", label: "Детали" },
  ];

  const historyRows = [
    {
      id: 1,
      date: "25.10.2025, 14:20",
      direction: "Импорт",
      type: "Платежи поставщикам",
      file: "supplier_payments_25_10.xlsx",
      status: "Успешно",
      details: "Загружено 124 операции, 3 предупреждения",
    },
    {
      id: 2,
      date: "24.10.2025, 19:05",
      direction: "Экспорт",
      type: "Сверки с поставщиками",
      file: "reconciliation_10_24.xml",
      status: "Успешно",
      details: "Выгружено 48 записей",
    },
    {
      id: 3,
      date: "23.10.2025, 11:40",
      direction: "Импорт",
      type: "Сверки с поставщиками",
      file: "supplier_match_23_10.xlsx",
      status: "Ошибка",
      details: "Неверный формат колонок в строке 12",
    },
  ];

  const handleImport = () => {
    // Здесь будет логика загрузки файла и отправки на сервер
    console.log("Импорт файла", fileName, "тип", importType);
  };

  const handleExport = () => {
    // Здесь будет логика генерации и скачивания файла
    console.log("Экспорт в формате", exportFormat);
  };

  return (
    <div className={s.documents}>
      <Container size="full">
        <div className={s.header}>
          <div>
            <h2>Импорт и экспорт данных</h2>
            <p style={{ color: "#6b7280", marginTop: 4 }}>
              Загрузка платежей и сверок с поставщиками, экспорт данных для
              бухгалтерских систем.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Импорт */}
          <section
            style={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              padding: 20,
              backgroundColor: "#ffffff",
            }}
          >
            <h3 style={{ marginBottom: 12 }}>Импорт данных</h3>
            <p style={{ color: "#6b7280", marginBottom: 16 }}>
              Загрузите файлы с платежами или актами сверки для автоматического
              создания и обновления операций.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Select
                label="Тип загружаемых данных"
                value={importType}
                onChange={setImportType}
                options={IMPORT_TYPES}
              />

              <Input
                label="Файл для загрузки"
                placeholder="Выберите файл или перетащите его сюда"
                value={fileName}
                onChange={setFileName}
              />

              <Button
                variant="primary"
                size="md"
                icon={MdFileUpload}
                onClick={handleImport}
              >
                Импортировать
              </Button>

              <p style={{ fontSize: 12, color: "#9ca3af" }}>
                Поддерживаются форматы: Excel (.xlsx), CSV (.csv), XML (по
                согласованному шаблону).
              </p>
            </div>
          </section>

          {/* Экспорт */}
          <section
            style={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              padding: 20,
              backgroundColor: "#ffffff",
            }}
          >
            <h3 style={{ marginBottom: 12 }}>Экспорт данных</h3>
            <p style={{ color: "#6b7280", marginBottom: 16 }}>
              Выгрузите платежи и сверки в формат, поддерживаемый вашей
              бухгалтерской системой.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Select
                label="Формат выгрузки"
                value={exportFormat}
                onChange={setExportFormat}
                options={EXPORT_FORMATS}
              />

              <Button
                variant="outline"
                size="md"
                icon={MdFileDownload}
                onClick={handleExport}
              >
                Экспортировать
              </Button>

              <p style={{ fontSize: 12, color: "#9ca3af" }}>
                Курсы валют на момент операции сохраняются и учитываются при
                формировании выгрузки.
              </p>
            </div>
          </section>
        </div>

        <div className={s.tableContainer}>
          <h3 style={{ marginBottom: 12 }}>История импорта и экспорта</h3>
          <UITable
            columns={historyColumns}
            rows={historyRows}
            showCheckbox={false}
          />
        </div>
      </Container>
    </div>
  );
}


