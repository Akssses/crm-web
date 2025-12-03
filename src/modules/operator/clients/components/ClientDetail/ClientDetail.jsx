import React from "react";
import ClientHeader from "./ClientHeader";
import BasicInfo from "./BasicInfo";
import FinancialSummary from "./FinancialSummary";
import OrderHistory from "./OrderHistory";
import Applications from "./Applications";
import Documents from "./Documents";
import RelatedContacts from "./RelatedContacts";
import ChangeHistory from "./ChangeHistory";
import ClientWarnings from "./ClientWarnings";
import RelatedDocuments from "./RelatedDocuments";
import s from "../../styles/ClientDetail.module.scss";

export default function ClientDetail() {
  // Mock warnings data - в реальности будет приходить с API
  const mockWarnings = [
    {
      type: "warning",
      message: "Потенциальный дубликат (2 совпадения)",
      details: "Найдены клиенты с похожими данными",
      date: "2024-11-28",
    },
    {
      type: "error",
      message: "Есть долг по оплатам",
      details: "Задолженность: 45,000 KGS",
      date: "2024-11-25",
    },
  ];

  return (
    <div className={s.clientDetail}>
      <ClientHeader />
      {/* <ClientWarnings warnings={mockWarnings} /> */}
      <BasicInfo />
      <FinancialSummary />
      <OrderHistory />
      <Applications />
      <Documents />
      <RelatedDocuments />
      <RelatedContacts />
      <ChangeHistory />
    </div>
  );
}
