"use client";
import React from "react";
import { Container } from "@/ui";
import s from "../../styles/ServiceDetail.module.scss";

export default function ServiceMainInfo({ service }) {
  // Mock data для разных типов услуг
  const serviceData = {
    avia: {
      route: "Бишкек (FRU) → Дубай (DXB)",
      segments: [
        {
          from: "Бишкек (FRU)",
          to: "Дубай (DXB)",
          date: "18.03.2024",
          time: "08:30 → 12:45",
          flight: "КС-123",
          class: "Эконом",
          airline: "Air Manas",
        },
      ],
      baggage: "20 кг багаж + 5 кг ручная кладь",
      tariff: "Эконом",
      conditions: "Без возврата",
    },
    hotel: {
      name: "Jumeirah Beach Hotel",
      stars: 5,
      dates: "18.03 - 25.03.2024",
      nights: 7,
      roomType: "Deluxe Sea View",
      meal: "Завтрак включён",
      cancellation: "Бесплатная отмена до 15.03.2024",
    },
    transfer: {
      route: "DXB → Jumeirah Beach Hotel",
      date: "18.03.2024, 12:45",
      vehicleType: "VIP",
      capacity: "4 пассажира",
    },
  };

  const data = serviceData[service.type] || {};

  return (
    <Container size="full" className={s.section}>
      <h3 className={s.sectionTitle}>Основная информация</h3>

      {service.type === "avia" && (
        <div className={s.infoCard}>
          <div className={s.cardTitle}>Маршрут</div>
          <div className={s.routeInfo}>
            <div className={s.routeMain}>{data.route}</div>
            {data.segments && (
              <div className={s.segments}>
                {data.segments.map((segment, idx) => (
                  <div key={idx} className={s.segment}>
                    <div className={s.segmentHeader}>
                      <span className={s.segmentRoute}>
                        {segment.from} → {segment.to}
                      </span>
                      <span className={s.segmentDate}>{segment.date}</span>
                    </div>
                    <div className={s.segmentDetails}>
                      <div className={s.detailItem}>
                        <span className={s.detailLabel}>Рейс:</span>
                        <span className={s.detailValue}>{segment.flight}</span>
                      </div>
                      <div className={s.detailItem}>
                        <span className={s.detailLabel}>Время:</span>
                        <span className={s.detailValue}>{segment.time}</span>
                      </div>
                      <div className={s.detailItem}>
                        <span className={s.detailLabel}>Класс:</span>
                        <span className={s.detailValue}>{segment.class}</span>
                      </div>
                      <div className={s.detailItem}>
                        <span className={s.detailLabel}>Авиакомпания:</span>
                        <span className={s.detailValue}>{segment.airline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={s.infoRow}>
            <span className={s.infoLabel}>Багаж:</span>
            <span className={s.infoValue}>{data.baggage}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Тариф:</span>
            <span className={s.infoValue}>{data.tariff}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Условия:</span>
            <span className={s.infoValue}>{data.conditions}</span>
          </div>
        </div>
      )}

      {service.type === "hotel" && (
        <div className={s.infoCard}>
          <div className={s.cardTitle}>Отель</div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Название:</span>
            <span className={s.infoValue}>
              {data.name}
              {data.stars && (
                <span className={s.stars}>
                  {Array.from({ length: data.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
              )}
            </span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Даты проживания:</span>
            <span className={s.infoValue}>{data.dates}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Количество ночей:</span>
            <span className={s.infoValue}>{data.nights}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Тип номера:</span>
            <span className={s.infoValue}>{data.roomType}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Питание:</span>
            <span className={s.infoValue}>{data.meal}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Условия отмены:</span>
            <span className={s.infoValue}>{data.cancellation}</span>
          </div>
        </div>
      )}

      {service.type === "transfer" && (
        <div className={s.infoCard}>
          <div className={s.cardTitle}>Трансфер</div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Маршрут:</span>
            <span className={s.infoValue}>{data.route}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Дата и время:</span>
            <span className={s.infoValue}>{data.date}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Тип транспорта:</span>
            <span className={s.infoValue}>{data.vehicleType}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Вместимость:</span>
            <span className={s.infoValue}>{data.capacity}</span>
          </div>
        </div>
      )}

      <div className={s.infoCard}>
        <div className={s.cardTitle}>Дополнительная информация</div>
        <div className={s.infoRow}>
          <span className={s.infoLabel}>Поставщик:</span>
          <span className={s.infoValue}>{service.supplier}</span>
        </div>
        <div className={s.infoRow}>
          <span className={s.infoLabel}>Оператор:</span>
          <span className={s.infoValue}>{service.operator}</span>
        </div>
        <div className={s.infoRow}>
          <span className={s.infoLabel}>Дата создания:</span>
          <span className={s.infoValue}>{service.createdAt}</span>
        </div>
      </div>
    </Container>
  );
}
