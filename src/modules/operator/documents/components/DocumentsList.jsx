"use client";
import React, { useState } from "react";
import { Container } from "@/ui";
import {
  MdExpandMore,
  MdExpandLess,
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdDescription,
  MdLocalHospital,
  MdTrain,
  MdTour,
  MdVisibility,
  MdDownload,
  MdEdit,
  MdDelete,
  MdSend,
  MdCheckCircle,
  MdAccessTime,
  MdWarning,
  MdCancel,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/DocumentsList.module.scss";

const SERVICE_ICONS = {
  avia: MdFlight,
  hotel: MdHotel,
  transfer: MdDirectionsCar,
  visa: MdDescription,
  insurance: MdLocalHospital,
  railway: MdTrain,
  other: MdTour,
};

const STATUS_CONFIG = {
  uploaded: { label: "Загружено", color: "green", icon: MdCheckCircle },
  pending: { label: "Ожидается", color: "yellow", icon: MdAccessTime },
  replacement_required: {
    label: "Требуется замена",
    color: "orange",
    icon: MdWarning,
  },
  overdue: { label: "Просрочено", color: "red", icon: MdWarning },
  not_required: { label: "Не требуется", color: "gray", icon: MdCancel },
};

export default function DocumentsList({ filters }) {
  const router = useRouter();
  const [expandedServices, setExpandedServices] = useState([
    "SRV-001",
    "SRV-002",
  ]);

  const services = [
    {
      id: "SRV-001",
      serviceType: "avia",
      name: "Авиаперелёт - Turkish Airlines TK214",
      orderId: "ORD-123",
      requestId: "REQ-001",
      documents: [
        {
          id: "DOC-001",
          type: "ticket",
          typeLabel: "Билет",
          name: "Авиабилет TK214.pdf",
          status: "uploaded",
          uploadDate: "10.10.2025",
          uploadedBy: "Оператор Айсулуу М.",
          size: "2.1 MB",
          fileType: "PDF",
        },
        {
          id: "DOC-002",
          type: "confirmation",
          typeLabel: "Подтверждение бронирования",
          name: "Подтверждение бронирования.pdf",
          status: "uploaded",
          uploadDate: "09.10.2025",
          uploadedBy: "Оператор Айсулуу М.",
          size: "890 KB",
          fileType: "PDF",
        },
        {
          id: "DOC-003",
          type: "invoice",
          typeLabel: "Счет",
          name: "Счет на оплату.pdf",
          status: "pending",
          uploadDate: null,
          uploadedBy: null,
          size: null,
          fileType: null,
        },
      ],
    },
    {
      id: "SRV-002",
      serviceType: "hotel",
      name: "Отель - Hilton Istanbul Bosphorus",
      orderId: "ORD-123",
      requestId: "REQ-001",
      documents: [
        {
          id: "DOC-004",
          type: "voucher",
          typeLabel: "Ваучер",
          name: "Ваучер отеля.pdf",
          status: "uploaded",
          uploadDate: "11.10.2025",
          uploadedBy: "Оператор Айсулуу М.",
          size: "1.5 MB",
          fileType: "PDF",
        },
        {
          id: "DOC-005",
          type: "act",
          typeLabel: "Акт",
          name: "Акт выполненных работ.pdf",
          status: "replacement_required",
          uploadDate: "08.10.2025",
          uploadedBy: "Оператор Айсулуу М.",
          size: "650 KB",
          fileType: "PDF",
        },
      ],
    },
    {
      id: "SRV-003",
      serviceType: "transfer",
      name: "Трансфер - Mercedes V-Class",
      orderId: "ORD-123",
      requestId: "REQ-001",
      documents: [
        {
          id: "DOC-006",
          type: "confirmation",
          typeLabel: "Подтверждение бронирования",
          name: "Подтверждение трансфера.pdf",
          status: "uploaded",
          uploadDate: "12.10.2025",
          uploadedBy: "Оператор Айсулуу М.",
          size: "420 KB",
          fileType: "PDF",
        },
      ],
    },
    {
      id: "SRV-004",
      serviceType: "visa",
      name: "Визовая поддержка",
      orderId: "ORD-125",
      requestId: "REQ-002",
      documents: [
        {
          id: "DOC-007",
          type: "visa",
          typeLabel: "Визовый документ",
          name: "Визовое приглашение.pdf",
          status: "overdue",
          uploadDate: null,
          uploadedBy: null,
          size: null,
          fileType: null,
        },
      ],
    },
    {
      id: "SRV-005",
      serviceType: "insurance",
      name: "Страховка - Travel Insurance",
      orderId: "ORD-125",
      requestId: "REQ-002",
      documents: [
        {
          id: "DOC-008",
          type: "insurance",
          typeLabel: "Страховка",
          name: "Полис страхования.pdf",
          status: "uploaded",
          uploadDate: "13.10.2025",
          uploadedBy: "Оператор Айсулуу М.",
          size: "1.2 MB",
          fileType: "PDF",
        },
      ],
    },
  ];

  const filteredServices = services.filter((service) => {
    if (
      filters.serviceType !== "all" &&
      service.serviceType !== filters.serviceType
    )
      return false;
    if (filters.service !== "all" && service.id !== filters.service)
      return false;
    return true;
  });

  const filteredDocuments = filteredServices.flatMap((service) =>
    service.documents
      .filter((doc) => {
        if (filters.documentType !== "all" && doc.type !== filters.documentType)
          return false;
        if (filters.status !== "all" && doc.status !== filters.status)
          return false;
        return true;
      })
      .map((doc) => ({ ...doc, service }))
  );

  const toggleService = (serviceId) => {
    setExpandedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleView = (doc, e) => {
    e.stopPropagation();
    // TODO: Open document viewer
    console.log("View document", doc.id);
  };

  const handleDownload = (doc, e) => {
    e.stopPropagation();
    // TODO: Download document
    console.log("Download document", doc.id);
  };

  const handleEdit = (doc, e) => {
    e.stopPropagation();
    // TODO: Open edit/replace modal
    console.log("Edit document", doc.id);
  };

  const handleDelete = (doc, e) => {
    e.stopPropagation();
    // TODO: Delete document
    console.log("Delete document", doc.id);
  };

  const handleSend = (doc, e) => {
    e.stopPropagation();
    // TODO: Open send modal (chat/email/telegram)
    console.log("Send document", doc.id);
  };

  const handleGoToService = (serviceId, e) => {
    e.stopPropagation();
    router.push(`/operator/services/${serviceId}`);
  };

  const handleGoToOrder = (orderId, e) => {
    e.stopPropagation();
    router.push(`/operator/orders/${orderId}`);
  };

  const handleGoToRequest = (requestId, e) => {
    e.stopPropagation();
    router.push(`/operator/requests/${requestId}`);
  };

  return (
    <div className={s.servicesList}>
      {filteredServices.map((service) => {
        const Icon = SERVICE_ICONS[service.serviceType] || SERVICE_ICONS.other;
        const isExpanded = expandedServices.includes(service.id);
        const serviceDocuments = service.documents.filter((doc) => {
          if (
            filters.documentType !== "all" &&
            doc.type !== filters.documentType
          )
            return false;
          if (filters.status !== "all" && doc.status !== filters.status)
            return false;
          return true;
        });

        if (serviceDocuments.length === 0) return null;

        return (
          <div key={service.id} className={s.serviceCard}>
            <div
              className={s.serviceHeader}
              onClick={() => toggleService(service.id)}
            >
              <div className={s.serviceHeaderLeft}>
                <div className={s.serviceIcon}>
                  <Icon size={24} />
                </div>
                <div className={s.serviceInfo}>
                  <div className={s.serviceName}>{service.name}</div>
                  <div className={s.serviceMeta}>
                    <span
                      className={s.serviceLink}
                      onClick={(e) => handleGoToService(service.id, e)}
                    >
                      {service.id}
                    </span>
                    <span className={s.separator}>•</span>
                    <span
                      className={s.serviceLink}
                      onClick={(e) => handleGoToOrder(service.orderId, e)}
                    >
                      {service.orderId}
                    </span>
                    <span className={s.separator}>•</span>
                    <span
                      className={s.serviceLink}
                      onClick={(e) => handleGoToRequest(service.requestId, e)}
                    >
                      {service.requestId}
                    </span>
                    <span className={s.separator}>•</span>
                    <span className={s.documentCount}>
                      {serviceDocuments.length} документов
                    </span>
                  </div>
                </div>
              </div>
              <div className={s.serviceHeaderRight}>
                {isExpanded ? (
                  <MdExpandLess size={24} />
                ) : (
                  <MdExpandMore size={24} />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className={s.documentsList}>
                {serviceDocuments.map((doc) => {
                  const statusConfig = STATUS_CONFIG[doc.status];
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div key={doc.id} className={s.documentItem}>
                      <div className={s.documentInfo}>
                        <div className={s.documentIcon}>
                          <MdDescription size={20} />
                        </div>
                        <div className={s.documentDetails}>
                          <div className={s.documentName}>{doc.name}</div>
                          <div className={s.documentMeta}>
                            <span className={s.documentType}>
                              {doc.typeLabel}
                            </span>
                            {doc.uploadDate && (
                              <>
                                <span className={s.separator}>•</span>
                                <span className={s.uploadDate}>
                                  {doc.uploadDate}
                                </span>
                              </>
                            )}
                            {doc.uploadedBy && (
                              <>
                                <span className={s.separator}>•</span>
                                <span className={s.uploadedBy}>
                                  {doc.uploadedBy}
                                </span>
                              </>
                            )}
                            {doc.size && (
                              <>
                                <span className={s.separator}>•</span>
                                <span className={s.fileSize}>{doc.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={s.documentStatus}>
                        <span
                          className={`${s.statusBadge} ${
                            s[`status-${statusConfig.color}`]
                          }`}
                        >
                          <StatusIcon size={16} />
                          {statusConfig.label}
                        </span>
                      </div>
                      <div className={s.documentActions}>
                        {doc.status === "uploaded" && (
                          <>
                            <button
                              className={s.actionButton}
                              onClick={(e) => handleView(doc, e)}
                              title="Просмотр"
                            >
                              <MdVisibility size={18} />
                            </button>
                            <button
                              className={s.actionButton}
                              onClick={(e) => handleDownload(doc, e)}
                              title="Скачать"
                            >
                              <MdDownload size={18} />
                            </button>
                            <button
                              className={s.actionButton}
                              onClick={(e) => handleSend(doc, e)}
                              title="Отправить клиенту"
                            >
                              <MdSend size={18} />
                            </button>
                          </>
                        )}
                        {doc.status === "uploaded" && (
                          <button
                            className={s.actionButton}
                            onClick={(e) => handleEdit(doc, e)}
                            title="Заменить"
                          >
                            <MdEdit size={18} />
                          </button>
                        )}
                        <button
                          className={s.actionButton}
                          onClick={(e) => handleDelete(doc, e)}
                          title="Удалить"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
