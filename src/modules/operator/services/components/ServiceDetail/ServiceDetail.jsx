"use client";
import React from "react";
import { Container } from "@/ui";
import GeneralInfo from "./GeneralInfo";
import ServiceParameters from "./ServiceParameters";
import CostAndFees from "./CostAndFees";
import ServiceDocuments from "./ServiceDocuments";
import History from "./History";
import s from "../../styles/ServiceDetail.module.scss";

export default function ServiceDetail() {
  return (
    <div className={s.serviceDetail}>
      <GeneralInfo />
      <ServiceParameters />
      <CostAndFees />
      <ServiceDocuments />
      <History />
    </div>
  );
}
