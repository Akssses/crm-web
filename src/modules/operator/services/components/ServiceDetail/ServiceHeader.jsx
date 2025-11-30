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

  return (
    <div className={s.generalInfo}>
      <h3 className={s.sectionTitle}>Общие данные</h3>
      <div className={s.infoGrid}>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>ID услуги</span>
          <span className={s.fieldValue}>{service.id}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Тип услуги</span>
          <span className={s.fieldValue}>{service.typeLabel}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Заказ</span>
          <Link
            href={`/operator/orders/${service.orderId}`}
            className={s.fieldLink}
          >
            {service.orderId}
          </Link>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Клиент</span>
          <span className={s.fieldValue}>{service.client}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Заявка</span>
          <Link
            href={`/operator/requests/${service.requestId}`}
            className={s.fieldLink}
          >
            {service.requestId}
          </Link>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Пассажир</span>
          <span className={s.fieldValue}>{service.passenger}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Поставщик</span>
          <span className={s.fieldValue}>{service.supplier}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Ответственный оператор</span>
          <span className={s.fieldValue}>{service.operator}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Дата создания</span>
          <span className={s.fieldValue}>{service.createdAt}</span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Статус услуги</span>
          <span
            className={`${s.fieldValue} ${s[`status-${statusConfig.color}`]}`}
          >
            {statusConfig.label}
          </span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Статус поставщика</span>
          <span
            className={`${s.fieldValue} ${s[`status-${statusConfig.color}`]}`}
          >
            {service.supplierStatusLabel}
          </span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Оплата</span>
          <span
            className={`${s.fieldValue} ${s[`payment-${paymentConfig.color}`]}`}
          >
            {paymentConfig.label}
          </span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>SLA</span>
          <span
            className={`${s.fieldValue} ${
              service.slaViolated ? s.slaViolated : s.slaOk
            }`}
          >
            {service.sla}
          </span>
        </div>
        <div className={s.infoField}>
          <span className={s.fieldLabel}>Дедлайн</span>
          <span className={s.fieldValue}>{service.deadline}</span>
        </div>
      </div>
    </div>
  );
}
