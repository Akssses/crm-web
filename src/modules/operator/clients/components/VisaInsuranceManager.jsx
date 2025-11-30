"use client";
import React, { useState } from "react";
import { Button } from "@/ui";
import { MdAdd, MdHistory, MdDescription, MdDateRange, MdAttachFile, MdCheckCircle, MdWarning } from "react-icons/md";
import s from "../styles/VisaInsuranceManager.module.scss";

export default function VisaInsuranceManager() {
  const [activeTab, setActiveTab] = useState("visas");

  const visas = [
    {
      id: 1,
      country: "Шенген (Италия)",
      type: "Туристическая (C)",
      number: "123456789",
      issueDate: "10.01.2024",
      expiryDate: "10.01.2025",
      status: "active",
      file: "visa_italy.pdf"
    },
    {
      id: 2,
      country: "США",
      type: "B1/B2",
      number: "987654321",
      issueDate: "15.05.2019",
      expiryDate: "14.05.2029",
      status: "active",
      file: "visa_usa.pdf"
    },
    {
      id: 3,
      country: "Китай",
      type: "Бизнес (M)",
      number: "456123789",
      issueDate: "01.02.2023",
      expiryDate: "01.05.2023",
      status: "expired",
      file: "visa_china.jpg"
    }
  ];

  const insurances = [
    {
      id: 1,
      company: "Ингосстрах",
      type: "Медицинская",
      number: "POL-123456",
      issueDate: "01.01.2024",
      expiryDate: "31.12.2024",
      status: "active",
      coverage: "50,000 EUR",
      file: "policy_ingos.pdf"
    },
    {
      id: 2,
      company: "АльфаСтрахование",
      type: "Отмена поездки",
      number: "TRV-987654",
      issueDate: "10.06.2023",
      expiryDate: "20.06.2023",
      status: "expired",
      coverage: "2,000 USD",
      file: "policy_alfa.pdf"
    }
  ];

  const getStatusBadge = (status) => {
    if (status === "active") {
      return <span className={`${s.badge} ${s.active}`}><MdCheckCircle size={12} /> Активна</span>;
    }
    return <span className={`${s.badge} ${s.expired}`}><MdWarning size={12} /> Истекла</span>;
  };

  const renderCard = (item, type) => (
    <div key={item.id} className={`${s.card} ${item.status === 'expired' ? s.cardExpired : ''}`}>
      <div className={s.cardHeader}>
        <div className={s.mainInfo}>
          <h4 className={s.cardTitle}>{type === 'visa' ? item.country : item.company}</h4>
          <span className={s.cardSubtitle}>{type === 'visa' ? item.type : item.type}</span>
        </div>
        {getStatusBadge(item.status)}
      </div>
      
      <div className={s.cardDetails}>
        <div className={s.detailRow}>
          <MdDescription size={14} className={s.icon} />
          <span>{item.number}</span>
        </div>
        <div className={s.detailRow}>
          <MdDateRange size={14} className={s.icon} />
          <span>{item.issueDate} — {item.expiryDate}</span>
        </div>
        {item.coverage && (
          <div className={s.detailRow}>
            <span className={s.label}>Покрытие:</span>
            <span>{item.coverage}</span>
          </div>
        )}
      </div>

      {item.file && (
        <div className={s.fileAttachment}>
          <MdAttachFile size={14} />
          <span className={s.fileName}>{item.file}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className={s.container}>
      <div className={s.tabs}>
        <button 
          className={`${s.tab} ${activeTab === 'visas' ? s.activeTab : ''}`}
          onClick={() => setActiveTab('visas')}
        >
          История виз
        </button>
        <button 
          className={`${s.tab} ${activeTab === 'insurance' ? s.activeTab : ''}`}
          onClick={() => setActiveTab('insurance')}
        >
          История страховок
        </button>
      </div>

      <div className={s.content}>
        <div className={s.actions}>
          <Button variant="outline" size="sm" icon={MdAdd}>
            Добавить {activeTab === 'visas' ? 'визу' : 'страховку'}
          </Button>
        </div>

        <div className={s.grid}>
          {activeTab === 'visas' 
            ? visas.map(visa => renderCard(visa, 'visa'))
            : insurances.map(ins => renderCard(ins, 'insurance'))
          }
        </div>
      </div>
    </div>
  );
}
