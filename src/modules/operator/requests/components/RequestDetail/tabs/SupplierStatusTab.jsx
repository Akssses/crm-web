"use client";

import React from "react";
import s from "../../../styles/RequestDetail.module.scss";

export default function SupplierStatusTab({ request }) {
  return (
    <section className={s.supplierStatusSection}>
      <div className={s.sectionTitle}>Статусы поставщиков</div>
      <div className={s.suppliersList}>
        <div className={s.supplierCard}>
          <div className={s.supplierHeader}>
            <span className={s.supplierName}>Air Manas</span>
            <span className={s.supplierStatus}>Подтверждено</span>
          </div>
          <div className={s.supplierInfo}>
            <div className={s.supplierRow}>
              <span className={s.label}>Услуга:</span>
              <span className={s.value}>Авиаперелёт (туда)</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>Статус оплаты:</span>
              <span className={s.value}>Оплачено</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>SLA:</span>
              <span className={s.value}>В срок</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>Документы:</span>
              <span className={s.value}>Загружены</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>Дедлайн:</span>
              <span className={s.value}>25.10.2025</span>
            </div>
          </div>
        </div>
        <div className={s.supplierCard}>
          <div className={s.supplierHeader}>
            <span className={s.supplierName}>Booking.com</span>
            <span className={s.supplierStatus}>В обработке</span>
          </div>
          <div className={s.supplierInfo}>
            <div className={s.supplierRow}>
              <span className={s.label}>Услуга:</span>
              <span className={s.value}>Отель</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>Статус оплаты:</span>
              <span className={s.value}>Ожидает оплаты</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>SLA:</span>
              <span className={s.value}>В срок</span>
            </div>
            <div className={s.supplierRow}>
              <span className={s.label}>Документы:</span>
              <span className={s.value}>В ожидании</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
