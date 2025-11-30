"use client";
import React, { useState } from "react";
import { Container, Button } from "@/ui";
import { MdUpload, MdHistory, MdDownload, MdCheckCircle, MdExpandMore, MdExpandLess } from "react-icons/md";
import s from "../../styles/Documents.module.scss";

export default function Documents() {
  const [expandedDocs, setExpandedDocs] = useState({});

  const documents = [
    {
      id: 1,
      name: "Договор оказания услуг",
      type: "PDF",
      size: "2.1 MB",
      color: "#ef4444",
      currentVersion: 3,
      uploadedBy: "Арман Ц.",
      uploadDate: "15.11.2024",
      versions: [
        { version: 3, size: "2.1 MB", uploadedBy: "Арман Ц.", uploadDate: "15.11.2024", isCurrent: true },
        { version: 2, size: "2.0 MB", uploadedBy: "Илия Т.", uploadDate: "10.11.2024" },
        { version: 1, size: "1.9 MB", uploadedBy: "Арман Ц.", uploadDate: "01.11.2024" },
      ],
    },
    {
      id: 2,
      name: "Скан паспорта",
      type: "JPG",
      size: "1.5 MB",
      color: "#10b981",
      currentVersion: 1,
      uploadedBy: "Илия Т.",
      uploadDate: "05.11.2024",
      versions: [
        { version: 1, size: "1.5 MB", uploadedBy: "Илия Т.", uploadDate: "05.11.2024", isCurrent: true },
      ],
    },
    {
      id: 3,
      name: "Счет на оплату №123",
      type: "PDF",
      size: "890 KB",
      color: "#ef4444",
      currentVersion: 2,
      uploadedBy: "Арман Ц.",
      uploadDate: "20.11.2024",
      versions: [
        { version: 2, size: "890 KB", uploadedBy: "Арман Ц.", uploadDate: "20.11.2024", isCurrent: true },
        { version: 1, size: "850 KB", uploadedBy: "Илия Т.", uploadDate: "18.11.2024" },
      ],
    },
  ];

  const toggleVersionHistory = (docId, e) => {
    e.stopPropagation();
    setExpandedDocs(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  return (
    <Container size="full" className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>Документы</h3>
        <Button variant="primary" icon={MdUpload}>
          Загрузить
        </Button>
      </div>
      <div className={s.documents}>
        {documents.map((doc) => {
          const isExpanded = expandedDocs[doc.id];
          const hasMultipleVersions = doc.versions.length > 1;

          return (
            <div key={doc.id} className={s.documentWrapper}>
              <div className={s.documentCard} onClick={(e) => hasMultipleVersions && toggleVersionHistory(doc.id, e)}>
                <div
                  className={s.iconWrapper}
                  style={{ 
                    background: `${doc.color}15`,
                    color: doc.color
                  }}
                >
                  {doc.type}
                </div>
                <div className={s.content}>
                  <div className={s.mainInfo}>
                    <span className={s.documentName}>{doc.name}</span>
                    <div className={s.meta}>
                      <span className={s.versionBadge}>v{doc.currentVersion}</span>
                      <span className={s.dot} />
                      <span>{doc.size}</span>
                      <span className={s.dot} />
                      <span>{doc.uploadDate}</span>
                      <span className={s.dot} />
                      <span>{doc.uploadedBy}</span>
                    </div>
                  </div>
                  <div className={s.actions}>
                    <button 
                      className={s.actionBtn} 
                      title="Скачать"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MdDownload size={20} />
                    </button>
                    {hasMultipleVersions && (
                      <button
                        className={`${s.actionBtn} ${isExpanded ? s.activeActionBtn : ''}`}
                        onClick={(e) => toggleVersionHistory(doc.id, e)}
                        title="История версий"
                      >
                        <MdExpandMore size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Version History */}
              {isExpanded && hasMultipleVersions && (
                <div className={s.versionHistory}>
                  <div className={s.versionHistoryTitle}>
                    История версий
                  </div>
                  {doc.versions.map((version, idx) => (
                    <div key={idx} className={s.versionItem}>
                      <div className={s.versionInfo}>
                        <div className={s.versionHeader}>
                          <span className={s.versionNumber}>Версия {version.version}</span>
                          {version.isCurrent && (
                            <span className={s.currentLabel}>
                              Текущая
                            </span>
                          )}
                        </div>
                        <span className={s.versionMeta}>
                          {version.uploadDate} • {version.size} • {version.uploadedBy}
                        </span>
                      </div>
                      <button className={s.actionBtn} title="Скачать версию">
                        <MdDownload size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}



