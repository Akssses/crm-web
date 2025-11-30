"use client";

import React from "react";
import { Textarea } from "@/ui";
import {
  MdFlight,
  MdHotel,
  MdCheckCircle,
  MdAccessTime,
  MdAttachFile,
} from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/ui";
import s from "../../../styles/RequestDetail.module.scss";

export default function GeneralInfoTab({ request }) {
  return (
    <>
      {/* Info blocks */}
      <section className={s.infoGrid}>
        <div className={s.infoCard}>
          <div className={s.sectionTitle}>Информация о клиенте</div>
          <div className={s.infoRows}>
            <InfoRow label="ФИО" value="Петров Иван Сергеевич" />
            <InfoRow
              label="Телефон"
              value="+996 555 123 456"
              isLink
              href="tel:+996555123456"
            />
            <InfoRow
              label="Email"
              value="petrov@email.com"
              isLink
              href="mailto:petrov@email.com"
            />
            <InfoRow
              label="Канал"
              value="Telegram"
              isLink
              icon={FaTelegramPlane}
            />
            <InfoRow label="Гражданство" value="Кыргызстан" />
          </div>
          <div className={s.commentBlock}>
            <div className={s.commentLabel}>Комментарий оператора</div>
            <Textarea
              value="Клиент просит подтвердить бронь до 17:00. Предпочитает утренние рейсы."
              readOnly
              className={s.commentTextarea}
            />
          </div>
        </div>

        <div className={s.infoCard}>
          <div className={s.sectionTitle}>Информация об организации</div>
          <div className={s.infoRows}>
            <InfoRow label="Компания" value='ООО "Бизнес Тревел"' />
            <InfoRow label="ИНН" value="1234567890123" />
            <InfoRow
              label="Договор"
              value="№ДГ-2024-045"
              isLink
              href="/operator/contracts/1"
            />
            <div className={s.responsiblePersons}>
              <span className={s.infoLabel}>Ответственные лица</span>
              <div className={s.responsibleList}>
                <div className={s.responsibleItem}>
                  Сидоров П.А.{" "}
                  <span className={s.responsibleRole}>(Директор)</span>
                </div>
                <div className={s.responsibleItem}>
                  Козлова М.И.{" "}
                  <span className={s.responsibleRole}>(Бухгалтер)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in order */}
      <section className={s.servicesSection}>
        <h3 className={s.servicesTitle}>Услуги в заказе</h3>

        <ServiceCard
          icon={MdFlight}
          title="Авиаперелёт (туда)"
          subtitle="18 марта 2024 • Рейс КС-123"
          price="$450"
          status="Выписано"
          statusColor="blue"
          params={[
            { label: "Маршрут", value: "Бишкек (FRU) → Дубай (DXB)" },
            { label: "Вылет / Прилёт", value: "08:30 → 12:45" },
            { label: "Класс", value: "Эконом" },
            { label: "Авиакомпания", value: "Air Manas" },
          ]}
          documents={[
            {
              id: 1,
              type: "Авиабилет",
              status: "Подтверждён",
              statusColor: "green",
              date: "15.03.2024",
            },
          ]}
        />

        <ServiceCard
          icon={MdHotel}
          title="Отель"
          subtitle="18 марта - 25 марта 2024 • 7 ночей"
          price="$1,890"
          status="Подтверждено"
          statusColor="green"
          params={[
            {
              label: "Название отеля",
              value: "Jumeirah Beach Hotel",
              stars: 5,
            },
            { label: "Даты проживания", value: "18.03 - 25.03.2024" },
            { label: "Питание", value: "Завтрак включён" },
            { label: "Тип номера", value: "Deluxe Sea View" },
          ]}
          documents={[
            {
              id: 1,
              type: "Ваучер отеля",
              status: "В ожидании",
              statusColor: "yellow",
              date: "16.03.2024",
            },
          ]}
        />
      </section>
    </>
  );
}

function InfoRow({ label, value, isLink = false, href, icon: Icon }) {
  return (
    <div className={s.infoRow}>
      <span className={s.infoLabel}>{label}</span>
      {isLink ? (
        <Link href={href || "#"} className={s.infoLink}>
          {Icon && <Icon size={16} className={s.infoLinkIcon} />}
          {value}
        </Link>
      ) : (
        <span className={s.infoValue}>{value}</span>
      )}
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  subtitle,
  price,
  status,
  statusColor,
  params,
  documents,
}) {
  return (
    <div className={s.serviceCard}>
      <div className={s.serviceHeader}>
        <div className={s.serviceHeaderLeft}>
          <Icon className={s.serviceIcon} />
          <div>
            <div className={s.serviceType}>{title}</div>
            <div className={s.serviceSub}>{subtitle}</div>
          </div>
        </div>
        <div className={s.serviceHeaderRight}>
          <div className={s.servicePrice}>{price}</div>
          <span
            className={`${s.serviceStatus} ${
              s[`serviceStatus-${statusColor}`]
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className={s.serviceGrid}>
        {params.map((param, idx) => (
          <div key={idx} className={s.serviceParam}>
            <span className={s.serviceParamLabel}>{param.label}:</span>
            <span className={s.serviceParamValue}>
              {param.value}
              {param.stars && (
                <span className={s.hotelStars}>
                  {Array.from({ length: param.stars }).map((_, i) => (
                    <span key={i} className={s.star}>
                      ★
                    </span>
                  ))}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className={s.docsSection}>
        <div className={s.docsHeader}>Документы по услуге</div>
        <div className={s.docsTable}>
          <div className={`${s.docsRow} ${s.docsHeaderRow}`}>
            <span>№</span>
            <span>Тип документа</span>
            <span>Статус</span>
            <span>Дата</span>
            <span className={s.docsActionsCol}>Действия</span>
          </div>
          {documents.map((doc) => (
            <div key={doc.id} className={s.docsRow}>
              <span>{doc.id}</span>
              <span>{doc.type}</span>
              <span>
                <StatusBadge status={doc.status} color={doc.statusColor} />
              </span>
              <span>{doc.date}</span>
              <span className={s.docsActions}>
                <Button variant="primary" size="sm" icon={MdAttachFile}>
                  Сформировать бланк
                </Button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, color }) {
  const StatusIcon =
    color === "green"
      ? MdCheckCircle
      : color === "yellow" || color === "orange"
      ? MdAccessTime
      : null;

  return (
    <span className={`${s.statusBadge} ${s[`statusBadge-${color}`]}`}>
      {StatusIcon && <StatusIcon size={16} className={s.statusBadgeIcon} />}
      {status}
    </span>
  );
}
