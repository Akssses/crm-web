"use client";
import React, { useState } from "react";
import Header from "../../dashboard/components/Header";
import FinanceStats from "./FinanceStats";
import FinanceTabs from "./FinanceTabs";
import PaymentsTable from "./PaymentsTable";
import ReturnsTable from "./ReturnsTable";
import Report from "./Report";
import SalaryCalculation from "./SalaryCalculation";
import PaymentHistory from "./PaymentHistory";
import s from "../styles/Finance.module.scss";

export default function Finance() {
  const [activeTab, setActiveTab] = useState("payments");

  return (
    <div className={s.finance}>
      <Header />
      <FinanceStats />
      <FinanceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "payments" && (
        <>
          <PaymentsTable />
          <div className={s.bottomSection}>
            <SalaryCalculation />
            <PaymentHistory />
          </div>
        </>
      )}
      {activeTab === "returns" && (
        <>
          <ReturnsTable />
          <div className={s.bottomSection}>
            <SalaryCalculation />
            <PaymentHistory />
          </div>
        </>
      )}
      {activeTab === "report" && <Report />}
    </div>
  );
}
