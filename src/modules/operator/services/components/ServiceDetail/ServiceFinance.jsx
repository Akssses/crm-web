"use client";
import React from "react";
import { Container } from "@/ui";
import s from "../../styles/ServiceDetail.module.scss";

export default function ServiceFinance({ service }) {
  return (
    <Container size="full" className={s.section}>
      <h3 className={s.sectionTitle}>Финансовые параметры</h3>

      <div className={s.financeCard}>
        <div className={s.financeTable}>
          <div className={s.financeRow}>
            <span className={s.financeLabel}>Стоимость для клиента:</span>
            <span className={s.financeValue}>$450</span>
          </div>
          <div className={s.financeRow}>
            <span className={s.financeLabel}>Себестоимость:</span>
            <span className={s.financeValue}>$405</span>
          </div>
          <div className={s.financeRow}>
            <span className={s.financeLabel}>Комиссия поставщика:</span>
            <span className={s.financeValue}>$0</span>
          </div>
          <div className={s.financeRow}>
            <span className={s.financeLabel}>Комиссия агентства:</span>
            <span className={s.financeValue}>$45 (10%)</span>
          </div>
          <div className={`${s.financeRow} ${s.financeTotal}`}>
            <span className={s.financeLabel}>Итоговая маржа:</span>
            <span className={s.financeValue}>$45</span>
          </div>
        </div>

        <div className={s.financeSummary}>
          <div className={s.summaryCard}>
            <span className={s.summaryLabel}>Задолженность клиента:</span>
            <span className={s.summaryValue}>$0</span>
          </div>
          <div className={s.summaryCard}>
            <span className={s.summaryLabel}>
              Задолженность перед поставщиком:
            </span>
            <span className={s.summaryValue}>$0</span>
          </div>
          <div className={s.summaryCard}>
            <span className={s.summaryLabel}>Статус оплаты:</span>
            <span className={s.summaryValue}>Оплачено</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
