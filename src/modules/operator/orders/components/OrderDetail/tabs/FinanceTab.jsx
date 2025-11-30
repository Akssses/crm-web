"use client";

import React from "react";
import s from "../../../styles/OrderDetail.module.scss";

export default function FinanceTab({ order }) {
  return (
    <section className={s.financeSection}>
      <div className={s.sectionTitle}>Финансовый блок</div>

      <div className={s.financeTable}>
        <div className={`${s.financeRow} ${s.financeHeaderRow}`}>
          <span>Услуга</span>
          <span>Сумма</span>
          <span>Валюта</span>
          <span>Комиссия</span>
          <span>Итого</span>
          <span>Комментарий</span>
        </div>

        <FinanceRow
          service="Авиаперелёт (туда)"
          amount="72.000"
          currency="RUB"
          commission="7.200 (10%)"
          total="79.200"
          comment="Комиссия агентства"
        />
        <FinanceRow
          service="Отель (5 ночей)"
          amount="72.000"
          currency="RUB"
          commission="7.200 (10%)"
          total="79.200"
          comment="Включено питание"
        />

        <div className={`${s.financeRow} ${s.financeTotalRow}`}>
          <span>Общая сумма</span>
          <span />
          <span />
          <span />
          <span className={s.financeTotalValue}>144.000 RUB</span>
          <span />
        </div>
      </div>

      {/* Financial Summary */}
      <div className={s.financeSummary}>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Маржа</span>
          <span className={s.summaryValue}>14.400 RUB</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Комиссия агентства</span>
          <span className={s.summaryValue}>14.400 RUB</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Комиссия поставщика</span>
          <span className={s.summaryValue}>0 RUB</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Статус оплаты</span>
          <span className={s.summaryValue}>Частично оплачено</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Задолженность клиента</span>
          <span className={s.summaryValue}>72.000 RUB</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>
            Задолженность перед поставщиками
          </span>
          <span className={s.summaryValue}>0 RUB</span>
        </div>
      </div>
    </section>
  );
}

function FinanceRow({ service, amount, currency, commission, total, comment }) {
  return (
    <div className={s.financeRow}>
      <span>{service}</span>
      <span>{amount}</span>
      <span>{currency}</span>
      <span className={s.financeCommission}>{commission}</span>
      <span>{total}</span>
      <span>{comment}</span>
    </div>
  );
}
