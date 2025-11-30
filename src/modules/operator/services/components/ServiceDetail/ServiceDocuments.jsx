"use client";
import React, { useState } from "react";
import { Container, Button } from "@/ui";
import {
  MdExpandMore,
  MdExpandLess,
  MdDescription,
  MdCloudUpload,
  MdVisibility,
  MdDownload,
  MdLink,
  MdCancel,
  MdCheckCircle,
  MdAccessTime,
} from "react-icons/md";
import { MdFlight, MdDirectionsCar } from "react-icons/md";
import s from "../../styles/ServiceDetail.module.scss";

export default function ServiceDocuments({ service }) {
  const [expandedServices, setExpandedServices] = useState(["hotel"]);

  const toggleService = (serviceId) => {
    setExpandedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const services = [
    {
      id: "hotel",
      name: "Отель - Hilton Istanbul Bosphorus",
      icon: null,
      documentCount: 3,
      documents: [
        {
          id: 1,
          type: "Ваучер",
          status: "Подтвержден",
          statusColor: "green",
          date: "10.10.25",
          actions: ["view", "download", "upload"],
        },
        {
          id: 2,
          type: "Счет",
          status: "В ожидании",
          statusColor: "yellow",
          date: "12.10.25",
          actions: ["link", "download"],
        },
        {
          id: 3,
          type: "Акт",
          status: "Отложено (через 3 дня)",
          statusColor: "gray",
          date: "",
          actions: ["cancel"],
        },
      ],
    },
    {
      id: "flight",
      name: "Авиа - Turkish Airlines TK214",
      icon: MdFlight,
      documentCount: 2,
      documents: [],
    },
    {
      id: "transfer",
      name: "Трансфер - Mercedes V-Class",
      icon: MdDirectionsCar,
      documentCount: 1,
      documents: [],
    },
  ];

  const getStatusIcon = (statusColor) => {
    switch (statusColor) {
      case "green":
        return MdCheckCircle;
      case "yellow":
        return MdAccessTime;
      case "gray":
        return MdAccessTime;
      default:
        return null;
    }
  };

  return (
    <Container size="full" className={s.section}>
      <h3 className={s.sectionTitle}>Документы по услуге</h3>
      {services.map((service) => {
        const isExpanded = expandedServices.includes(service.id);
        const StatusIcon = service.documents[0]?.statusColor
          ? getStatusIcon(service.documents[0].statusColor)
          : null;

        return (
          <div key={service.id} className={s.serviceDocuments}>
            <button
              className={s.serviceHeader}
              onClick={() => toggleService(service.id)}
            >
              <div className={s.serviceHeaderLeft}>
                {service.icon && (
                  <service.icon className={s.serviceIcon} size={20} />
                )}
                <span className={s.serviceName}>{service.name}</span>
                <span className={s.documentCount}>
                  {service.documentCount} документа
                </span>
              </div>
              {isExpanded ? (
                <MdExpandLess size={24} />
              ) : (
                <MdExpandMore size={24} />
              )}
            </button>

            {isExpanded && service.documents.length > 0 && (
              <div className={s.documentsContent}>
                <div className={s.documentsTable}>
                  <div className={s.tableHeader}>
                    <div className={s.tableHeaderCell}>№</div>
                    <div className={s.tableHeaderCell}>Тип документа</div>
                    <div className={s.tableHeaderCell}>Статус</div>
                    <div className={s.tableHeaderCell}>Дата</div>
                    <div className={s.tableHeaderCell}>Действия</div>
                  </div>
                  {service.documents.map((doc, idx) => {
                    const DocStatusIcon = getStatusIcon(doc.statusColor);
                    return (
                      <div key={doc.id} className={s.tableRow}>
                        <div className={s.tableCell}>{idx + 1}</div>
                        <div className={s.tableCell}>{doc.type}</div>
                        <div className={s.tableCell}>
                          <div className={s.statusCell}>
                            {DocStatusIcon && (
                              <DocStatusIcon
                                className={`${s.statusIcon} ${
                                  s[`statusIcon-${doc.statusColor}`]
                                }`}
                                size={16}
                              />
                            )}
                            <span
                              className={`${s.statusText} ${
                                s[`status-${doc.statusColor}`]
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                        </div>
                        <div className={s.tableCell}>{doc.date}</div>
                        <div className={s.tableCell}>
                          <div className={s.actions}>
                            {doc.actions.includes("view") && (
                              <button className={s.actionButton}>
                                <MdVisibility size={18} />
                              </button>
                            )}
                            {doc.actions.includes("download") && (
                              <button className={s.actionButton}>
                                <MdDownload size={18} />
                              </button>
                            )}
                            {doc.actions.includes("upload") && (
                              <button className={s.actionButton}>
                                <MdCloudUpload size={18} />
                              </button>
                            )}
                            {doc.actions.includes("link") && (
                              <button className={s.actionButton}>
                                <MdLink size={18} />
                              </button>
                            )}
                            {doc.actions.includes("cancel") && (
                              <button className={s.actionButton}>
                                <MdCancel size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={s.documentActions}>
                  <Button variant="outline" icon={MdDescription}>
                    Сформировать бланк
                  </Button>
                  <Button variant="outline" icon={MdCloudUpload}>
                    Загрузить документ
                  </Button>
                </div>
                <div className={s.uploadArea}>
                  <MdCloudUpload size={32} className={s.uploadIcon} />
                  <p className={s.uploadText}>
                    Перетащите шаблон бланка сюда или нажмите для выбора файла
                    (.docx, .pdf, .xlsx)
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </Container>
  );
}
