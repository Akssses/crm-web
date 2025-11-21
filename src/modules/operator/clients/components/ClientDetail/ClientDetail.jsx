import React from "react";
import ClientHeader from "./ClientHeader";
import BasicInfo from "./BasicInfo";
import FinancialSummary from "./FinancialSummary";
import OrderHistory from "./OrderHistory";
import Applications from "./Applications";
import Documents from "./Documents";
import RelatedContacts from "./RelatedContacts";
import ChangeHistory from "./ChangeHistory";
import s from "../../styles/ClientDetail.module.scss";

export default function ClientDetail() {
  return (
    <div className={s.clientDetail}>
      <ClientHeader />
      <BasicInfo />
      <FinancialSummary />
      <OrderHistory />
      <Applications />
      <Documents />
      <RelatedContacts />
      <ChangeHistory />
    </div>
  );
}

