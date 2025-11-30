"use client";
import React, { useState } from "react";
import { Container, Button, Select } from "@/ui";
import { MdDownload } from "react-icons/md";
import ShiftInfo from "./ShiftInfo";
import ShiftOrdersTable from "./ShiftOrdersTable";
import s from "../styles/Report.module.scss";

const EXPORT_OPTIONS = [
  { value: "excel", label: "Excel" },
  { value: "pdf", label: "PDF" },
  { value: "csv", label: "CSV" },
];

export default function Report() {
  const [exportFormat, setExportFormat] = useState("excel");

  const handleExport = () => {
    // TODO: Export report
    console.log("Export report as", exportFormat);
  };

  const stats = {
    totalPayments: "125 000 KGS",
    totalReturns: "15 000 KGS",
    totalCommissions: "12 500 KGS",
    totalMargin: "45 000 KGS",
    clientDebt: "25 000 KGS",
    supplierDebt: "10 000 USD",
    operatorPayout: "42 900 RUB",
  };

  return (
    <div className={s.report}>
      {/* <Container size="full">
        <div className={s.reportHeader}>
          <h3 className={s.reportTitle}>Финансовый отчёт</h3>
          <div className={s.reportActions}>
            <Select
              value={exportFormat}
              onChange={setExportFormat}
              options={EXPORT_OPTIONS}
              className={s.exportSelect}
            />
            <Button variant="primary" icon={MdDownload} onClick={handleExport}>
              Экспорт
            </Button>
          </div>
        </div>

        <div className={s.reportStats}>
          <div className={s.statCard}>
            <div className={s.statLabel}>Всего платежей</div>
            <div className={s.statValue}>{stats.totalPayments}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Всего возвратов</div>
            <div className={s.statValue}>{stats.totalReturns}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Комиссии</div>
            <div className={s.statValue}>{stats.totalCommissions}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Итоговая маржа</div>
            <div className={s.statValue}>{stats.totalMargin}</div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Задолженность клиентов</div>
            <div className={`${s.statValue} ${s.statValueDanger}`}>
              {stats.clientDebt}
            </div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>Задолженность перед поставщиками</div>
            <div className={`${s.statValue} ${s.statValueWarning}`}>
              {stats.supplierDebt}
            </div>
          </div>
          <div className={s.statCard}>
            <div className={s.statLabel}>К выплате оператору</div>
            <div className={`${s.statValue} ${s.statValueSuccess}`}>
              {stats.operatorPayout}
            </div>
          </div>
        </div>
      </Container> */}

      <ShiftInfo />
      <ShiftOrdersTable />
    </div>
  );
}
