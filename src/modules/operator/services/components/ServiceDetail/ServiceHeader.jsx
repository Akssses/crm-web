"use client";
import React from "react";
import Link from "next/link";
import s from "../../styles/ServiceDetail.module.scss";

const STATUS_CONFIG = {
  confirmed: { label: "Подтверждено", color: "green" },
  pending: { label: "В работе", color: "yellow" },
  action_required: { label: "Требуется действие", color: "orange" },
  cancelled: { label: "Отменено", color: "red" },
};

const PAYMENT_STATUS_CONFIG = {
  paid: { label: "Оплачено", color: "green" },
  partial: { label: "Частично оплачено", color: "yellow" },
  unpaid: { label: "Не оплачено", color: "red" },
};

export default function ServiceHeader({ service }) {
  const statusConfig = STATUS_CONFIG[service.status] || STATUS_CONFIG.pending;
  const paymentConfig =
    PAYMENT_STATUS_CONFIG[service.paymentStatus] ||
    PAYMENT_STATUS_CONFIG.unpaid;

  const metaCards = [
    {
      label: "Заказ",
      value: service.orderId,
      link: `/operator/orders/${service.orderId}`,
    },
    {
      label: "Заявка",
      value: service.requestId,
      link: `/operator/requests/${service.requestId}`,
    },
    { label: "Клиент", value: service.client },
    { label: "Поставщик", value: service.supplier },
    { label: "Оператор", value: service.operator },
    { label: "Пассажир", value: service.passenger },
  ];

  const timeline = [
    { label: "Создано", value: service.createdAt },
    { label: "Дедлайн", value: service.deadline },
    { label: "SLA", value: service.sla },
  ];

  return (
    <div className={s.headerCard}>
      <div className={s.headerTop}>
        <div className={s.headerInfo}>
          <span className={s.typeBadge}>{service.typeLabel}</span>
          <h1 className={s.headerTitle}>
            {service.title || service.typeLabel}
          </h1>
          <p className={s.headerSubtitle}>
            <span>ID {service.id}</span>
            <span>Пассажир: {service.passenger}</span>
          </p>
        </div>
        <div className={s.statusStack}>
          <span
            className={`${s.statusChip} ${s[`status-${statusConfig.color}`]}`}
          >
            {statusConfig.label}
          </span>
          <span
            className={`${s.statusChip} ${s[`payment-${paymentConfig.color}`]}`}
          >
            {paymentConfig.label}
          </span>
          <span
            className={`${s.statusChip} ${
              service.slaViolated ? s.slaViolated : s.slaOk
            }`}
          >
            SLA: {service.sla}
          </span>
        </div>
      </div>

      <div className={s.timelineRow}>
        {timeline.map((item) => (
          <div key={item.label} className={s.timelineItem}>
            <span className={s.timelineLabel}>{item.label}</span>
            <span className={s.timelineValue}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className={s.metaGrid}>
        {metaCards.map((card) => (
          <div key={card.label} className={s.metaCard}>
            <span className={s.metaLabel}>{card.label}</span>
            {card.link ? (
              <Link href={card.link} className={s.metaLink}>
                {card.value}
              </Link>
            ) : (
              <span className={s.metaValue}>{card.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
