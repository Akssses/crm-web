"use client";
import React, { useState } from "react";
import { Button, Input, UITable, Modal } from "@/ui";
import {
  MdUpload,
  MdDownload,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdHistory,
  MdEdit,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import s from "../styles/CertificatesManagement.module.scss";

const MOCK_CERTIFICATES = [
  {
    id: "CERT-001",
    name: "ЭЦП для 1С",
    organization: "Asia Travel",
    type: "ЭЦП",
    status: "active",
    expiresAt: "2025-12-31",
    daysLeft: 351,
    lastUpdated: "2024-01-15 10:30",
    updatedBy: "Администратор",
  },
  {
    id: "CERT-002",
    name: "Сертификат Диадок",
    organization: "Техносервис",
    type: "Сертификат",
    status: "expiring",
    expiresAt: "2025-02-15",
    daysLeft: 31,
    lastUpdated: "2024-12-01 14:20",
    updatedBy: "Бухгалтер",
  },
  {
    id: "CERT-003",
    name: "Токен API Эльба",
    organization: "Asia Travel",
    type: "Токен",
    status: "expired",
    expiresAt: "2024-12-01",
    daysLeft: -45,
    lastUpdated: "2024-11-01 09:15",
    updatedBy: "Система",
  },
];

export default function CertificatesManagement() {
  const [search, setSearch] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const getStatusConfig = (cert) => {
    if (cert.daysLeft < 0) {
      return { icon: MdError, color: "red", label: "Истёк" };
    }
    if (cert.daysLeft <= 30) {
      return { icon: MdWarning, color: "yellow", label: "Истекает" };
    }
    return { icon: MdCheckCircle, color: "green", label: "Активен" };
  };

  const columns = [
    {
      key: "name",
      label: "Название",
      flex: 1.5,
    },
    {
      key: "organization",
      label: "Организация",
      flex: 1,
    },
    {
      key: "type",
      label: "Тип",
      flex: 0.8,
    },
    {
      key: "expiresAt",
      label: "Срок действия",
      flex: 1,
      render: (value, row) => (
        <div className={s.expiresCell}>
          <span>{new Date(value).toLocaleDateString("ru-RU")}</span>
          <span className={s.daysLeft}>
            {row.daysLeft > 0
              ? `Осталось ${row.daysLeft} дней`
              : `Истёк ${Math.abs(row.daysLeft)} дней назад`}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Статус",
      flex: 1,
      render: (value, row) => {
        const config = getStatusConfig(row);
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
      key: "lastUpdated",
      label: "Обновлён",
      flex: 1,
      render: (value, row) => (
        <div className={s.updatedCell}>
          <span>{value}</span>
          <span className={s.updatedBy}>by {row.updatedBy}</span>
        </div>
      ),
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
            icon={MdHistory}
            onClick={() => setSelectedCert(row)}
          >
            История
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={MdUpload}
            onClick={() => {
              setSelectedCert(row);
              setIsUploadModalOpen(true);
            }}
          >
            Обновить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.certificatesManagement}>
      <div className={s.toolbar}>
        <Input
          icon={IoSearchOutline}
          placeholder="Поиск по названию, организации..."
          value={search}
          onChange={setSearch}
          className={s.searchInput}
        />
        <Button variant="primary" icon={MdUpload}>
          Загрузить сертификат
        </Button>
      </div>

      <div className={s.tableBlock}>
        <UITable
          columns={columns}
          rows={MOCK_CERTIFICATES.filter(
            (cert) =>
              !search ||
              cert.name.toLowerCase().includes(search.toLowerCase()) ||
              cert.organization.toLowerCase().includes(search.toLowerCase())
          )}
          showCheckbox={false}
        />
      </div>

      {isUploadModalOpen && selectedCert && (
        <UploadCertificateModal
          certificate={selectedCert}
          isOpen={isUploadModalOpen}
          onClose={() => {
            setIsUploadModalOpen(false);
            setSelectedCert(null);
          }}
        />
      )}

      {selectedCert && !isUploadModalOpen && (
        <CertificateHistoryModal
          certificate={selectedCert}
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}

function UploadCertificateModal({ certificate, isOpen, onClose }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    console.log("Uploading certificate:", certificate.id, file);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="600px"
      title={`Обновить: ${certificate.name}`}
    >
      <div className={s.uploadModal}>
        <div className={s.uploadSection}>
          <label className={s.fileLabel}>
            <input
              type="file"
              onChange={handleFileChange}
              className={s.fileInput}
              accept=".p12,.pfx,.cer,.crt"
            />
            <div className={s.fileUploadArea}>
              {file ? (
                <span>{file.name}</span>
              ) : (
                <span>Выберите файл сертификата</span>
              )}
            </div>
          </label>
        </div>
        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleUpload} disabled={!file}>
            Загрузить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function CertificateHistoryModal({ certificate, isOpen, onClose }) {
  const history = [
    {
      date: "2024-01-15 10:30",
      action: "Обновлён",
      user: "Администратор",
      ip: "192.168.1.100",
      value: "***masked***",
    },
    {
      date: "2023-12-01 14:20",
      action: "Создан",
      user: "Система",
      ip: "192.168.1.50",
      value: "***masked***",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="800px"
      title={`История: ${certificate.name}`}
    >
      <div className={s.historyModal}>
        <div className={s.historyList}>
          {history.map((item, idx) => (
            <div key={idx} className={s.historyItem}>
              <div className={s.historyDate}>{item.date}</div>
              <div className={s.historyAction}>{item.action}</div>
              <div className={s.historyUser}>
                {item.user} ({item.ip})
              </div>
              <div className={s.historyValue}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

