"use client";
import React, { useState } from "react";
import {
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdTrain,
  MdDescription,
  MdLocalHospital,
  MdTour,
} from "react-icons/md";
import ServiceHeader from "./ServiceHeader";
import ServiceMainInfo from "./ServiceMainInfo";
import ServiceFinance from "./ServiceFinance";
import ServiceDocuments from "./ServiceDocuments";
import ServiceHistory from "./ServiceHistory";
import s from "../../styles/ServiceDetail.module.scss";

const SERVICE_ICONS = {
  avia: MdFlight,
  hotel: MdHotel,
  transfer: MdDirectionsCar,
  train: MdTrain,
  visa: MdDescription,
  insurance: MdLocalHospital,
  tour: MdTour,
};

const SECTIONS = [
  { id: "main", label: "Основная информация" },
  { id: "finance", label: "Финансы" },
  { id: "documents", label: "Документы" },
  { id: "history", label: "История" },
];

export default function ServiceDetail() {
  const [activeSection, setActiveSection] = useState("main");

  // Mock data
  const service = {
    id: "SRV-001",
    type: "avia",
    typeLabel: "Авиаперелёт",
    title: "Бишкек — Дубай (КС-123)",
    requestId: "A-213-321",
    orderId: "ORD-001",
    client: "Петров Иван Сергеевич",
    passenger: "Петров Иван Сергеевич",
    status: "confirmed",
    statusLabel: "Подтверждено",
    supplierStatus: "confirmed",
    supplierStatusLabel: "Подтверждено",
    paymentStatus: "paid",
    paymentStatusLabel: "Оплачено",
    sla: "В срок",
    slaViolated: false,
    deadline: "20.03.2024",
    supplier: "Air Manas",
    operator: "Айсулуу М.",
    createdAt: "15.03.2024, 10:47",
  };

  return (
    <div className={s.serviceDetail}>
      {/* Header */}
      <ServiceHeader service={service} />

      {/* Navigation */}
      <div className={s.navigation}>
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            className={`${s.navButton} ${
              activeSection === section.id ? s.active : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={s.content}>
        {activeSection === "main" && <ServiceMainInfo service={service} />}
        {activeSection === "finance" && <ServiceFinance service={service} />}
        {activeSection === "documents" && (
          <ServiceDocuments service={service} />
        )}
        {activeSection === "history" && <ServiceHistory service={service} />}
      </div>
    </div>
  );
}
