"use client";

import React, { useState } from "react";
import { Button } from "@/ui";
import {
  MdFlight,
  MdDirectionsCar,
  MdHotel,
  MdTour,
  MdAccessTime,
  MdDescription,
  MdAdd,
} from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { IoDocumentTextOutline, IoChatbubbleOutline } from "react-icons/io5";
import { BsShieldCheck, BsTrainFront } from "react-icons/bs";
import s from "../../styles/CommercialOffer.module.scss";

const TABS = [
  { id: "avia", label: "Авиа", icon: MdFlight },
  { id: "train", label: "Ж/Д", icon: BsTrainFront },
  { id: "hotels", label: "Отели", icon: MdHotel },
  { id: "transfers", label: "Трансферы", icon: MdDirectionsCar },
  { id: "visas", label: "Визы", icon: IoDocumentTextOutline },
  { id: "insurance", label: "Страховки", icon: BsShieldCheck },
];

const SERVICES = [
  {
    id: 1,
    type: "flight",
    icon: MdFlight,
    iconBg: "#3B82F6",
    status: "Подтверждён",
    statusColor: "green",
    date: "15 июня, 10:30",
    title: "Авиаперелёт Москва → Стамбул",
    subtitle: "Аэрофлот SU 215 • Эконом класс",
    price: "₽28,450",
    priceNote: "за 3 пассажиров",
    departure: {
      label: "Отправление",
      city: "Москва (SVO)",
      time: "10:30, Терминал D",
    },
    arrival: {
      label: "Прибытие",
      city: "Стамбул (IST)",
      time: "14:15, Терминал 1",
    },
    features: ["3ч 45мин", "23 кг багаж", "Питание включено"],
  },
  {
    id: 2,
    type: "transfer",
    icon: MdDirectionsCar,
    iconBg: "#F59E0B",
    status: "Задержан",
    statusColor: "orange",
    date: "15 июня, 14:45 → 15:30",
    title: "Трансфер из аэропорта",
    subtitle: "Istanbul VIP Transfer • Mercedes V-Class",
    price: "₽4,200",
    departure: {
      label: "Откуда",
      city: "Аэропорт Стамбул (IST)",
      time: "Терминал 1, зона прилёта",
    },
    arrival: {
      label: "Куда",
      city: "Отель Hilton Istanbul",
      time: "Район Таксим",
    },
    features: ["45 минут", "До 6 пассажиров", "Встреча с табличкой"],
  },
  {
    id: 3,
    type: "hotel",
    icon: MdHotel,
    iconBg: "#8B5CF6",
    status: "Подтверждён",
    statusColor: "green",
    date: "15-20 июня",
    title: "Отель Hilton Istanbul Bosphorus",
    subtitle: "5 звёзд • Номер Deluxe с видом на Босфор",
    price: "₽67,500",
    priceNote: "5 ночей",
    departure: { label: "Заезд", city: "", time: "15 июня, 15:00" },
    arrival: { label: "Выезд", city: "", time: "20 июня, 12:00" },
    features: ["Завтрак включён", "Wi-Fi", "Бассейн"],
  },
  {
    id: 4,
    type: "excursion",
    icon: MdTour,
    iconBg: "#F59E0B",
    status: "В ожидании",
    statusColor: "yellow",
    date: "17 июня, 09:00",
    title: 'Экскурсия "Стамбул классический"',
    subtitle: "Istanbul Tours • Групповая экскурсия",
    price: "₽8,900",
    priceNote: "за 3 человек",
    route: "Айя-София → Голубая мечеть → Топкапы → Гранд-Базар",
    features: ["8 часов", "Обед включён", "Русский гид"],
  },
  {
    id: 5,
    type: "flight",
    icon: MdFlight,
    iconBg: "#3B82F6",
    status: "Подтверждён",
    statusColor: "green",
    date: "20 июня, 16:30",
    title: "Обратный рейс Стамбул → Москва",
    subtitle: "Turkish Airlines TK 414 • Эконом класс",
    price: "₽31,200",
    priceNote: "за 3 пассажиров",
    departure: {
      label: "Отправление",
      city: "Стамбул (IST)",
      time: "16:30, Терминал 1",
    },
    arrival: {
      label: "Прибытие",
      city: "Москва (SVO)",
      time: "20:45, Терминал F",
    },
    features: ["3ч 15мин", "23 кг багаж", "Питание включено"],
  },
];

const VERSIONS = [
  { id: "standard", name: "Стандарт", price: "287 450 ₽", active: true },
  { id: "comfort", name: "Комфорт", price: "342 890 ₽", active: false },
  { id: "premium", name: "Премиум", price: "456 120 ₽", active: false },
];

export default function CommercialOffer() {
  const [activeTab, setActiveTab] = useState("avia");

  return (
    <div className={s.page}>
      {/* Top Header */}
      <header className={s.topHeader}>
        <h1 className={s.pageTitle}>КП - Заявка - #А-213-321</h1>
        <div className={s.topActions}>
          <div className={s.timerBadge}>
            <MdAccessTime size={18} />
            Истекает через 4ч 12мин
          </div>
          <Button variant="outline" size="sm" icon={IoDocumentTextOutline}>
            Превью
          </Button>
          <Button variant="primary" size="sm">
            Отправить клиенту
          </Button>
        </div>
      </header>

      <div className={s.content}>
        {/* Left Sidebar */}
        <aside className={s.leftSidebar}>
          <div className={s.requestCard}>
            <h2 className={s.requestNumber}>Заявка №1234</h2>
            <p className={s.clientName}>Иван Петров</p>

            <div className={s.infoBlock}>
              <div className={s.infoLabel}>Даты поездки</div>
              <div className={s.infoValue}>
                <span>📅</span> 15–22 декабря 2024
              </div>
              <div className={s.infoSub}>7 ночей</div>
            </div>

            <div className={s.infoBlock}>
              <div className={s.infoLabel}>Пассажиры</div>
              <div className={s.infoValue}>👤 2 взрослых</div>
              <div className={s.infoValue}>👦 1 ребёнок (8 лет)</div>
            </div>

            <div className={s.infoBlock}>
              <div className={s.infoLabel}>Бюджет</div>
              <div className={s.budgetValue}>350 000 ₽</div>
              <div className={s.infoSub}>~4 700 USD</div>
            </div>

            <div className={s.infoBlock}>
              <div className={s.infoLabel}>Комментарий клиента</div>
              <p className={s.comment}>
                Хотелось бы отель с аквапарком, прямой перелет, желательно
                утренний рейс
              </p>
            </div>

            <div className={s.infoBlock}>
              <div className={s.infoLabel}>Услуги в заявке</div>
              <ul className={s.servicesList}>
                <li>
                  <span className={s.dot} style={{ background: "#22C55E" }} />{" "}
                  Авиаперелёт
                </li>
                <li>
                  <span className={s.dot} style={{ background: "#22C55E" }} />{" "}
                  Отель
                </li>
                <li>
                  <span className={s.dot} style={{ background: "#22C55E" }} />{" "}
                  Трансфер
                </li>
                <li>
                  <span className={s.dot} style={{ background: "#22C55E" }} />{" "}
                  Страховка
                </li>
                <li>
                  <span className={s.dot} style={{ background: "#9CA3AF" }} />{" "}
                  Экскурсии (опционально)
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={MdAdd}
              className={s.createVersionBtn}
            >
              Создать версию КП
            </Button>

            <div className={s.versionsBlock}>
              <div className={s.versionsLabel}>Версии КП</div>
              {VERSIONS.map((v) => (
                <div
                  key={v.id}
                  className={`${s.versionItem} ${v.active ? s.active : ""}`}
                >
                  <div className={s.versionInfo}>
                    <span className={s.versionName}>{v.name}</span>
                    <span className={s.versionPrice}>{v.price}</span>
                  </div>
                  {v.active && <span className={s.activeBadge}>Активная</span>}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Content */}
        <main className={s.mainContent}>
          <div className={s.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className={s.routeSection}>
            <h3 className={s.routeTitle}>Маршрут поездки</h3>

            <div className={s.timeline}>
              {SERVICES.map((service, idx) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isLast={idx === SERVICES.length - 1}
                />
              ))}

              {/* Final destination */}
              <div className={s.finalDestination}>
                <div
                  className={s.timelineIcon}
                  style={{ background: "#22C55E" }}
                >
                  <MdFlight size={20} style={{ transform: "rotate(90deg)" }} />
                </div>
                <div className={s.finalInfo}>
                  <div className={s.finalTitle}>Прибытие в Москву</div>
                  <div className={s.finalSub}>
                    Аэропорт Шереметьево (SVO), Терминал F
                  </div>
                  <div className={s.finalDate}>20 июня 2024, 20:45</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className={s.rightSidebar}>
          <div className={s.summaryCard}>
            <h3 className={s.summaryTitle}>Итоги предложения</h3>

            <div className={s.versionHeader}>
              <div className={s.versionLabel}>Версия: Стандарт</div>
              <div className={s.versionExpiry}>
                Актуально до 23:59 12.12.2024
              </div>
            </div>

            <div className={s.summaryItems}>
              <div className={s.summaryRow}>
                <span>
                  <MdFlight size={18} /> Авиаперелёт
                </span>
                <span>124 500 ₽</span>
              </div>
              <div className={s.summaryRow}>
                <span>
                  <MdHotel size={18} /> Отель (7 ночей)
                </span>
                <span>142 300 ₽</span>
              </div>
              <div className={s.summaryRow}>
                <span>
                  <MdDirectionsCar size={18} /> Трансфер
                </span>
                <span>8 450 ₽</span>
              </div>
              <div className={s.summaryRow}>
                <span>
                  <BsShieldCheck size={18} /> Страховка
                </span>
                <span>4 200 ₽</span>
              </div>
              <div className={s.summaryRow + " " + s.muted}>
                <span>
                  <MdTour size={18} /> Экскурсии
                </span>
                <span>Не включено</span>
              </div>
            </div>

            <div className={s.summaryTotals}>
              <div className={s.totalRow}>
                <span>Сумма услуг</span>
                <span>279 450 ₽</span>
              </div>
              <div className={s.totalRow}>
                <span>Комиссия агентства</span>
                <span>8 000 ₽</span>
              </div>
              <div className={s.totalRow + " " + s.grandTotal}>
                <span>Итого</span>
                <span>287 450 ₽</span>
              </div>
            </div>

            <div className={s.timerCard}>
              <div className={s.timerHeader}>
                <MdAccessTime size={18} />
                Тайм-лимит цен
              </div>
              <div className={s.timerValue}>4 ч 12 мин</div>
              <div className={s.timerNote}>
                Цены актуальны до 18:00 (сегодня)
              </div>
              <div className={s.timerProgress}>
                <div className={s.timerProgressBar} style={{ width: "70%" }} />
              </div>
            </div>

            <div className={s.actionButtons}>
              <Button
                variant="outline"
                size="md"
                icon={IoDocumentTextOutline}
                className={s.fullWidth}
              >
                Сформировать документ
              </Button>
              <Button variant="primary" size="md" className={s.fullWidth}>
                Отправить клиенту в Telegram
              </Button>
              <Button variant="primary" size="md" className={s.fullWidth}>
                Отправить клиенту в Чат
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ServiceCard({ service, isLast }) {
  const statusClasses = {
    green: s.statusGreen,
    orange: s.statusOrange,
    yellow: s.statusYellow,
  };

  return (
    <div className={s.serviceCard}>
      <div className={s.timelineIcon} style={{ background: service.iconBg }}>
        <service.icon size={20} />
      </div>
      {!isLast && <div className={s.timelineLine} />}

      <div className={s.cardContent}>
        <div className={s.cardHeader}>
          <div className={s.cardMeta}>
            <span
              className={`${s.statusBadge} ${
                statusClasses[service.statusColor]
              }`}
            >
              {service.status}
            </span>
            <span className={s.cardDate}>{service.date}</span>
          </div>
          <div className={s.cardPrice}>
            <span className={s.priceValue}>{service.price}</span>
            {service.priceNote && (
              <span className={s.priceNote}>{service.priceNote}</span>
            )}
          </div>
        </div>

        <h4 className={s.cardTitle}>{service.title}</h4>
        <p className={s.cardSubtitle}>{service.subtitle}</p>

        {service.departure && service.arrival && (
          <div className={s.routeInfo}>
            <div className={s.routePoint}>
              <span className={s.routeLabel}>{service.departure.label}</span>
              <span className={s.routeCity}>{service.departure.city}</span>
              <span className={s.routeTime}>{service.departure.time}</span>
            </div>
            <div className={s.routePoint}>
              <span className={s.routeLabel}>{service.arrival.label}</span>
              <span className={s.routeCity}>{service.arrival.city}</span>
              <span className={s.routeTime}>{service.arrival.time}</span>
            </div>
          </div>
        )}

        {service.route && (
          <div className={s.excursionRoute}>
            <span className={s.routeLabel}>Маршрут</span>
            <span className={s.routePath}>{service.route}</span>
          </div>
        )}

        <div className={s.cardFeatures}>
          {service.features.map((f, idx) => (
            <span key={idx} className={s.feature}>
              ● {f}
            </span>
          ))}
          <button className={s.detailsBtn}>Детали →</button>
        </div>
      </div>
    </div>
  );
}
