"use client";
import React, { useState } from "react";
import { Container } from "@/ui";
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

export default function ServiceDetail() {
  const [activeSection, setActiveSection] = useState("main");

  // Mock data
  const service = {
    id: "SRV-001",
    type: "avia",
    typeLabel: "Авиаперелёт",
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
        <button
          className={`${s.navButton} ${
            activeSection === "main" ? s.active : ""
          }`}
          onClick={() => setActiveSection("main")}
        >
          Основная информация
        </button>
        <button
          className={`${s.navButton} ${
            activeSection === "finance" ? s.active : ""
          }`}
          onClick={() => setActiveSection("finance")}
        >
          Финансы
        </button>
        <button
          className={`${s.navButton} ${
            activeSection === "documents" ? s.active : ""
          }`}
          onClick={() => setActiveSection("documents")}
        >
          Документы
        </button>
        <button
          className={`${s.navButton} ${
            activeSection === "history" ? s.active : ""
          }`}
          onClick={() => setActiveSection("history")}
        >
          История
        </button>
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
