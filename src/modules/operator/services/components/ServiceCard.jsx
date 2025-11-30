"use client";
import React from "react";
import {
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdTrain,
  MdDescription,
  MdLocalHospital,
  MdTour,
  MdWarning,
  MdCheckCircle,
  MdAccessTime,
  MdCancel,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import s from "../styles/ServiceCard.module.scss";

const SERVICE_ICONS = {
  avia: MdFlight,
  hotel: MdHotel,
  transfer: MdDirectionsCar,
  train: MdTrain,
  visa: MdDescription,
  insurance: MdLocalHospital,
  tour: MdTour,
};

const STATUS_CONFIG = {
  pending: {
    label: "Ожидает подтверждения",
    color: "yellow",
    icon: MdAccessTime,
  },
  confirmed: { label: "Подтверждено", color: "green", icon: MdCheckCircle },
  rejected: { label: "Отклонено", color: "red", icon: MdCancel },
  action_required: {
    label: "Требуется действие",
    color: "orange",
    icon: MdWarning,
  },
};

const PAYMENT_STATUS_CONFIG = {
  paid: { label: "Оплачено", color: "green" },
  partial: { label: "Частично оплачено", color: "yellow" },
  unpaid: { label: "Не оплачено", color: "red" },
};

export default function ServiceCard({ service }) {
  const router = useRouter();
  const Icon = SERVICE_ICONS[service.type] || MdDescription;
  const statusConfig =
    STATUS_CONFIG[service.supplierStatus] || STATUS_CONFIG.pending;
  const paymentConfig =
    PAYMENT_STATUS_CONFIG[service.paymentStatus] ||
    PAYMENT_STATUS_CONFIG.unpaid;
  const StatusIcon = statusConfig.icon;

  const hasProblems =
    service.hasProblems || service.slaViolated || !service.documentsReceived;

  const handleCardClick = () => {
    router.push(`/operator/services/${service.id}`);
  };

  return (
    <div
      className={`${s.serviceCard} ${hasProblems ? s.hasProblems : ""}`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className={s.cardHeader}>
        <div className={s.headerLeft}>
          <div className={s.serviceTypeBadge}>
            <Icon size={20} />
            <span>{service.typeLabel}</span>
          </div>
          {hasProblems && (
            <div className={s.problemIndicator}>
              <MdWarning size={16} />
              <span>Проблемы</span>
            </div>
          )}
        </div>
        <div className={s.headerRight}>
          <div className={s.statusBadge}>
            <StatusIcon size={16} />
            <span className={s[`status-${statusConfig.color}`]}>
              {statusConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className={s.cardBody}>
        <div className={s.serviceTitle}>{service.title}</div>
        <div className={s.serviceSubtitle}>{service.subtitle}</div>

        {/* Route/Details */}
        {service.route && (
          <div className={s.routeInfo}>
            <span className={s.routeLabel}>Маршрут:</span>
            <span className={s.routeValue}>{service.route}</span>
          </div>
        )}

        {/* Dates */}
        {service.dates && (
          <div className={s.datesInfo}>
            <span className={s.datesLabel}>Даты:</span>
            <span className={s.datesValue}>{service.dates}</span>
          </div>
        )}

        {/* Grid Info */}
        <div className={s.infoGrid}>
          {service.passenger && (
            <div className={s.infoItem}>
              <span className={s.infoLabel}>Пассажир:</span>
              <span className={s.infoValue}>{service.passenger}</span>
            </div>
          )}
          {service.supplier && (
            <div className={s.infoItem}>
              <span className={s.infoLabel}>Поставщик:</span>
              <span className={s.infoValue}>{service.supplier}</span>
            </div>
          )}
          {service.orderId && (
            <div className={s.infoItem}>
              <span className={s.infoLabel}>Заказ:</span>
              <span
                className={s.orderLink}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/operator/orders/${service.orderId}`);
                }}
                title="Перейти к заказу"
              >
                {service.orderId}
              </span>
            </div>
          )}
          {service.deadline && (
            <div className={s.infoItem}>
              <span className={s.infoLabel}>Дедлайн:</span>
              <span className={s.infoValue}>{service.deadline}</span>
            </div>
          )}
        </div>

        {/* Status Row */}
        <div className={s.statusRow}>
          <div className={s.statusItem}>
            <span className={s.statusLabel}>Статус поставщика:</span>
            <span
              className={`${s.statusValue} ${
                s[`status-${statusConfig.color}`]
              }`}
            >
              {statusConfig.label}
            </span>
          </div>
          <div className={s.statusItem}>
            <span className={s.statusLabel}>Оплата:</span>
            <span
              className={`${s.statusValue} ${
                s[`payment-${paymentConfig.color}`]
              }`}
            >
              {paymentConfig.label}
            </span>
          </div>
          {service.sla && (
            <div className={s.statusItem}>
              <span className={s.statusLabel}>SLA:</span>
              <span
                className={`${s.statusValue} ${
                  service.slaViolated ? s.slaViolated : s.slaOk
                }`}
              >
                {service.sla}
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        {service.price && (
          <div className={s.priceInfo}>
            <span className={s.priceLabel}>Стоимость:</span>
            <span className={s.priceValue}>{service.price}</span>
          </div>
        )}
      </div>
    </div>
  );
}
