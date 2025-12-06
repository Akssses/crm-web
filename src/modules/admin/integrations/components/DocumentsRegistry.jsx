"use client";
import React, { useState, useMemo } from "react";
import { Button, Input, Select, UITable, Modal } from "@/ui";
import {
  MdDownload,
  MdVisibility,
  MdHistory,
  MdCheckCircle,
  MdError,
  MdAccessTime,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/DocumentsRegistry.module.scss";

const MOCK_DOCUMENTS = [
  {
    id: "DOC-001",
    type: "Счёт",
    number: "INV-145",
    organization: "Asia Travel",
    service: "1С",
    status: "sent",
    createdAt: "2025-01-15 14:32",
    sentAt: "2025-01-15 14:33",
    signed: true,
    versions: 1,
  },
  {
    id: "DOC-002",
    type: "Акт",
    number: "ACT-144",
    organization: "Техносервис",
    service: "Диадок",
    status: "error",
    createdAt: "2025-01-15 14:28",
    sentAt: null,
    signed: false,
    versions: 2,
    error: "Ошибка отправки",
  },
  {
    id: "DOC-003",
    type: "УПД",
    number: "UPD-143",
    organization: "Asia Travel",
    service: "1С",
    status: "pending",
    createdAt: "2025-01-15 14:25",
    sentAt: null,
    signed: false,
    versions: 1,
  },
];

export default function DocumentsRegistry() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    organization: "all",
  });
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocs = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchesSearch =
        !search ||
        doc.id.toLowerCase().includes(search.toLowerCase()) ||
        doc.number.toLowerCase().includes(search.toLowerCase());
      const matchesType = filters.type === "all" || doc.type === filters.type;
      const matchesStatus =
        filters.status === "all" || doc.status === filters.status;
      const matchesOrg =
        filters.organization === "all" || doc.organization === filters.organization;

      return matchesSearch && matchesType && matchesStatus && matchesOrg;
    });
  }, [search, filters]);

  const getStatusConfig = (status) => {
    const configs = {
      sent: { icon: MdCheckCircle, color: "green", label: "Отправлен" },
      error: { icon: MdError, color: "red", label: "Ошибка" },
      pending: { icon: MdAccessTime, color: "yellow", label: "Ожидает" },
    };
    return configs[status] || { icon: MdAccessTime, color: "gray", label: status };
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      flex: 0.8,
    },
    {
      key: "type",
      label: "Тип",
      flex: 0.8,
    },
    {
      key: "number",
      label: "Номер",
      flex: 1,
    },
    {
      key: "organization",
      label: "Организация",
      flex: 1,
    },
    {
      key: "service",
      label: "Сервис",
      flex: 0.8,
    },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value) => {
        const config = getStatusConfig(value);
        const Icon = config.icon;
        return (
          <div className={s.statusCell}>
            <span className={`${s.statusBadge} ${s[`status-${config.color}`]}`}>
              <Icon size={16} />
              {config.label}
            </span>
          </div>
        );
      },
    },
    {
      key: "signed",
      label: "Подпись",
      flex: 0.8,
      render: (value) => (
        <div className={s.signedCell}>
          {value ? (
            <MdCheckCircle size={20} className={s.signedIcon} />
          ) : (
            <span className={s.notSigned}>—</span>
          )}
        </div>
      ),
    },
    {
      key: "versions",
      label: "Версии",
      flex: 0.6,
    },
    {
      key: "actions",
      label: "Действия",
      flex: 1.2,
      render: (value, row) => (
        <div className={s.actionsCell}>
          <Button
            variant="outline"
            size="sm"
            icon={MdVisibility}
            onClick={() => setSelectedDoc(row)}
          >
            Просмотр
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdDownload}
            onClick={() => console.log("Download:", row.id)}
          >
            Скачать
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={MdHistory}
            onClick={() => setSelectedDoc({ ...row, view: "history" })}
          >
            История
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.documentsRegistry}>
      <div className={s.toolbar}>
        <div className={s.filterGroup}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск по ID, номеру..."
            value={search}
            onChange={setSearch}
            className={s.searchInput}
          />
          <Select
            value={filters.type}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, type: value }))
            }
            options={[
              { value: "all", label: "Все типы" },
              { value: "Счёт", label: "Счёт" },
              { value: "Акт", label: "Акт" },
              { value: "УПД", label: "УПД" },
            ]}
            size="sm"
          />
          <Select
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            options={[
              { value: "all", label: "Все статусы" },
              { value: "sent", label: "Отправлен" },
              { value: "error", label: "Ошибка" },
              { value: "pending", label: "Ожидает" },
            ]}
            size="sm"
          />
          <Select
            value={filters.organization}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, organization: value }))
            }
            options={[
              { value: "all", label: "Все организации" },
              { value: "Asia Travel", label: "Asia Travel" },
              { value: "Техносервис", label: "Техносервис" },
            ]}
            size="sm"
          />
        </div>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={filteredDocs}
          showCheckbox={false}
        />
      </div>

      {selectedDoc && (
        <DocumentDetailModal
          document={selectedDoc}
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}

function DocumentDetailModal({ document, isOpen, onClose }) {
  if (document.view === "history") {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        width="800px"
        title={`История версий: ${document.number}`}
      >
        <div className={s.historyModal}>
          <div className={s.historyList}>
            <div className={s.historyItem}>
              <div className={s.historyVersion}>Версия 2</div>
              <div className={s.historyDate}>2025-01-15 14:30</div>
              <div className={s.historyAction}>Восстановлена</div>
              <Button variant="outline" size="sm" icon={MdDownload}>
                Скачать
              </Button>
            </div>
            <div className={s.historyItem}>
              <div className={s.historyVersion}>Версия 1</div>
              <div className={s.historyDate}>2025-01-15 14:28</div>
              <div className={s.historyAction}>Создана</div>
              <Button variant="outline" size="sm" icon={MdDownload}>
                Скачать
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="900px"
      title={`Документ: ${document.number}`}
    >
      <div className={s.documentModal}>
        <div className={s.documentInfo}>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Тип:</span>
            <span className={s.infoValue}>{document.type}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Номер:</span>
            <span className={s.infoValue}>{document.number}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Организация:</span>
            <span className={s.infoValue}>{document.organization}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Сервис:</span>
            <span className={s.infoValue}>{document.service}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Статус:</span>
            <span className={s.infoValue}>{document.status}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Подпись:</span>
            <span className={s.infoValue}>
              {document.signed ? "Подписан" : "Не подписан"}
            </span>
          </div>
        </div>
        <div className={s.documentContent}>
          <h3 className={s.contentTitle}>Содержимое документа</h3>
          <div className={s.contentPreview}>
            <pre>{JSON.stringify({ type: document.type, number: document.number }, null, 2)}</pre>
          </div>
        </div>
        <div className={s.modalFooter}>
          <Button variant="outline" icon={MdDownload}>
            Скачать XML
          </Button>
          <Button variant="outline" icon={MdDownload}>
            Скачать PDF
          </Button>
          <Button variant="primary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
}

