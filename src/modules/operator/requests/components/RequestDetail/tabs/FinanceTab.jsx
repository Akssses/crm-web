"use client";

import React from "react";
import s from "../../../styles/RequestDetail.module.scss";

export default function FinanceTab({ request }) {
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
          amount="$450"
          currency="USD"
          commission="$45 (10%)"
          total="$495"
          comment="Комиссия агентства"
        />
        <FinanceRow
          service="Отель (7 ночей)"
          amount="$1,890"
          currency="USD"
          commission="$189 (10%)"
          total="$2,079"
          comment="Включено питание"
        />
        <FinanceRow
          service="Авиаперелёт (обратно)"
          amount="$470"
          currency="USD"
          commission="$47 (10%)"
          total="$517"
          comment="Ожидание выписки"
        />

        <div className={`${s.financeRow} ${s.financeTotalRow}`}>
          <span>Общая сумма</span>
          <span />
          <span />
          <span />
          <span className={s.financeTotalValue}>$3,091</span>
          <span />
        </div>
      </div>

      {/* Financial Summary */}
      <div className={s.financeSummary}>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Маржа</span>
          <span className={s.summaryValue}>$281</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Комиссия агентства</span>
          <span className={s.summaryValue}>$281</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Комиссия поставщика</span>
          <span className={s.summaryValue}>$0</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Статус оплаты</span>
          <span className={s.summaryValue}>Не оплачено</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>Задолженность клиента</span>
          <span className={s.summaryValue}>$3,091</span>
        </div>
        <div className={s.summaryCard}>
          <span className={s.summaryLabel}>
            Задолженность перед поставщиками
          </span>
          <span className={s.summaryValue}>$0</span>
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
