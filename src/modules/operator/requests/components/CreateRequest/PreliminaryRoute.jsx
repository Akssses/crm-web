import React from "react";
import { Button } from "@/ui";
import s from "../../styles/PreliminaryRoute.module.scss";
import {
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdTour,
  MdArrowForward,
  MdWarning,
  MdCheckCircle,
  MdKeyboardArrowDown,
  MdLuggage,
  MdRestaurant,
  MdAirlineSeatReclineNormal,
  MdFlashOn,
  MdSecurity,
  MdSchedule,
  MdFreeBreakfast,
  MdLightbulbOutline,
} from "react-icons/md";
import { FaTaxi } from "react-icons/fa";
import { BsTrainFront } from "react-icons/bs";

export default function PreliminaryRoute({ services, onBack }) {
  // Calculate totals
  const totalServices = services.length;
  const totalPrice = services.reduce((sum, s) => {
    return sum + parseInt(s.price.replace(/\D/g, ""), 10);
  }, 0);

  // State for collapsible recommendations
  const [expandedRecs, setExpandedRecs] = React.useState({});

  const toggleRec = (id) => {
    setExpandedRecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock recommendations
  const recommendations = [
    {
      id: "rec_transfer",
      title: "Рекомендуем добавить трансфер",
      icon: MdDirectionsCar,
      content: {
        title: "Аэропорт Стамбул → Hilton Istanbul",
        details: "Расстояние: 42 км • Время в пути: ~45 минут",
        class: "Класс: Комфорт • Вместимость: до 4 пассажиров",
      },
      action: "Рассчитать",
    },
    {
      id: "rec_taxi",
      title: "Заказать Яндекс.Такси заранее",
      icon: FaTaxi,
      content: {
        title: "Трансфер из аэропорта",
        details: "2 пассажира • Оплата по безналу (B2B)",
        price: "от 2 800 ₽",
      },
      action: "Добавить такси",
    },
    {
      id: "rec_aero",
      title: "Рекомендуем добавить Аэроэкспресс",
      icon: BsTrainFront,
      content: {
        title: "Москва (SVO) → Белорусский вокзал",
        details: "Время в пути: 35 минут • Отправление каждые 30 минут",
        price: "1 500 ₽",
      },
      action: "Добавить в маршрут",
    },
  ];

  return (
    <div className={s.container}>
      {/* Main Content */}
      <div className={s.mainContent}>
        {/* Page Header */}
        <div className={s.header}>
          <div className={s.headerLeft}>
            <Button variant="text" onClick={onBack} icon={MdArrowForward} style={{ transform: 'rotate(180deg)', padding: 0, marginRight: 8 }} />
            <h1>Предварительный маршрут</h1>
          </div>
          <div className={s.headerInfo}>
            <span>👤 Клиент: Анна Смирнова</span>
            <span>📅 15–22 июня 2024</span>
            <span>👥 2 взрослых, 1 ребёнок</span>
          </div>
        </div>

        {/* Client Card */}
        <div className={s.card}>
          <div className={s.clientCardContent}>
            <div className={s.avatarCircle}>AC</div>
            <div>
              <div className={s.clientName}>Анна Смирнова</div>
              <div className={s.clientDetails}>📅 15–22 июня 2024 • 👥 2 взрослых, 1 ребёнок</div>
            </div>
          </div>
        </div>

        {/* First Service (Outbound Flight) */}
        {services.length > 0 && (
          <div className={s.card}>
            <div className={s.cardRow}>
              <div className={`${s.iconBox} ${
                services[0].type === "Авиабилет" ? s.blue :
                services[0].type === "Отель" ? s.purple :
                services[0].type === "Экскурсия" ? s.orange : s.green
              }`}>
                {services[0].icon ? React.createElement(services[0].icon) : <MdCheckCircle />}
              </div>
              <div style={{ flex: 1 }}>
                <div className={s.cardHeader}>
                  <div className={s.serviceTitle}>
                    {services[0].type === "Авиабилет" ? `Перелёт ${services[0].details}` : services[0].details}
                    <span className={`${s.badge} ${s.green}`}>Подтверждена</span>
                  </div>
                  <div className={s.servicePrice}>
                    <span className={s.price}>{services[0].price}</span>
                    <span className={s.note}>за {services[0].pax || "3 пассажиров"}</span>
                  </div>
                </div>
                <div className={s.cardContent}>
                  <div className={s.serviceMeta}>{services[0].time}</div>
                  <div className={s.serviceDesc}>{services[0].description}</div>
                  <a href="#" className={s.link}>Подробнее →</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Warning Block (Mock) */}
        <div className={`${s.card} ${s.warning}`}>
          <div className={s.cardHeader} style={{ marginBottom: 8 }}>
            <div className={s.serviceTitle} style={{ color: "#92400e" }}>
              <MdWarning size={20} />
              Предупреждение — короткая стыковка
            </div>
          </div>
          <div className={s.cardContent} style={{ color: "#92400e" }}>
            Между прилётом и следующим сегментом всего 45 минут. Есть риск опоздания. Рекомендуем увеличить время пересадки или добавить Fast Track.
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.map((rec) => (
          <div key={rec.id} className={s.recommendation}>
            <div className={s.recHeader} onClick={() => toggleRec(rec.id)}>
              <div className={s.recTitle}>
                <rec.icon size={20} />
                {rec.title}
              </div>
              <MdKeyboardArrowDown
                size={24}
                style={{
                  transform: expandedRecs[rec.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: '#9ca3af',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
            {expandedRecs[rec.id] && (
              <div className={s.recContent}>
                <div style={{ flex: 1 }}>
                  <div className={s.recItemTitle}>{rec.content.title}</div>
                  <div className={s.recText}>{rec.content.details}</div>
                  {rec.content.class && <div className={s.recText}>{rec.content.class}</div>}
                </div>
                <div className={s.recActions}>
                  {rec.content.price && <span className={s.recPrice}>{rec.content.price}</span>}
                  <Button variant="primary" size="sm">{rec.action}</Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Remaining Services */}
        {services.slice(1).map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className={s.card}>
              <div className={s.cardRow}>
                <div className={`${s.iconBox} ${
                  service.type === "Авиабилет" ? s.blue :
                  service.type === "Отель" ? s.purple :
                  service.type === "Экскурсия" ? s.orange : s.green
                }`}>
                  {Icon ? <Icon /> : <MdCheckCircle />}
                </div>
                <div style={{ flex: 1 }}>
                  <div className={s.cardHeader}>
                    <div className={s.serviceTitle}>
                      {service.type === "Авиабилет" ? `Перелёт ${service.details}` : service.details}
                      <span className={`${s.badge} ${s.green}`}>Подтверждена</span>
                    </div>
                    <div className={s.servicePrice}>
                      <span className={s.price}>{service.price}</span>
                      <span className={s.note}>за {service.pax || "3 пассажиров"}</span>
                    </div>
                  </div>
                  <div className={s.cardContent}>
                    <div className={s.serviceMeta}>{service.time}</div>
                    <div className={s.serviceDesc}>{service.description}</div>
                    <a href="#" className={s.link}>Подробнее →</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arrival Block */}
        <div className={`${s.card} ${s.success}`}>
          <div className={s.cardRow}>
            <div className={`${s.iconBox} ${s.green}`}>
              <MdCheckCircle />
            </div>
            <div>
              <div className={s.successTitle}>Прибытие в Москву</div>
              <div className={s.successDetails}>22 июня 2024, 20:35 • Аэропорт Шереметьево (SVO)</div>
            </div>
          </div>
        </div>
        
        {/* Bottom Collapsible */}
        <div className={s.recommendation} style={{ background: '#eff6ff', border: 'none' }}>
           <div className={s.recHeader} style={{ background: 'none' }} onClick={() => toggleRec('rec_flight_services')}>
              <div className={s.recTitle} style={{ color: '#1e40af', fontSize: '16px' }}>
                Рекомендуемые услуги к перелёту
              </div>
              <MdKeyboardArrowDown
                size={24}
                style={{
                  color: '#1e40af',
                  transform: expandedRecs['rec_flight_services'] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
            {expandedRecs['rec_flight_services'] && (
              <div style={{ padding: '0 20px 20px' }}>
                {/* Flight Services */}
                <div style={{ marginBottom: 24 }}>
                  <div className={s.recCategoryTitle}>
                    <MdLightbulbOutline /> Рекомендуемые услуги к перелёту
                  </div>
                  <div className={s.recItems}>
                    {[
                      { icon: MdLuggage, title: "Дополнительный багаж", subtitle: "23 кг на пассажира", price: "2 850 ₽" },
                      { icon: MdRestaurant, title: "Питание на борту", subtitle: "Горячее питание", price: "1 200 ₽" },
                      { icon: MdAirlineSeatReclineNormal, title: "Выбор места", subtitle: "У окна или прохода", price: "900 ₽" },
                      { icon: MdFlashOn, title: "Fast Track", subtitle: "Ускоренный проход через контроль", price: "3 500 ₽" },
                      { icon: MdSecurity, title: "Страховка на перелёт", subtitle: "Покрытие до 50 000 €", price: "1 800 ₽" },
                    ].map((item, i) => (
                      <div key={i} className={s.recItemCard}>
                        <div className={s.recItemLeft}>
                          <div className={s.recItemIcon} style={{ color: '#2563eb' }}>
                            <item.icon />
                          </div>
                          <div>
                            <div className={s.recItemName}>{item.title}</div>
                            <div className={s.recItemSub}>{item.subtitle}</div>
                          </div>
                        </div>
                        <div className={s.recItemRight}>
                          <div className={s.recItemPrice}>{item.price}</div>
                          <Button variant="primary" size="sm">Добавить</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodation Services */}
                <div style={{ marginBottom: 24 }}>
                  <div className={s.recCategoryTitle}>
                    <MdLightbulbOutline /> Рекомендуемые услуги к проживанию
                  </div>
                  <div className={s.recItems}>
                    {[
                      { icon: MdSchedule, title: "Ранний заезд", subtitle: "С 10:00 вместо 14:00", price: "3 200 ₽" },
                      { icon: MdSchedule, title: "Поздний выезд", subtitle: "До 18:00 вместо 12:00", price: "2 800 ₽" },
                      { icon: MdFreeBreakfast, title: "Завтраки", subtitle: "Шведский стол • 3 персоны", price: "8 400 ₽" },
                      { icon: MdSecurity, title: "Страховка проживания", subtitle: "Возврат при отмене", price: "2 400 ₽" },
                    ].map((item, i) => (
                      <div key={i} className={s.recItemCard}>
                        <div className={s.recItemLeft}>
                          <div className={s.recItemIcon} style={{ color: '#2563eb' }}>
                            <item.icon />
                          </div>
                          <div>
                            <div className={s.recItemName}>{item.title}</div>
                            <div className={s.recItemSub}>{item.subtitle}</div>
                          </div>
                        </div>
                        <div className={s.recItemRight}>
                          <div className={s.recItemPrice}>{item.price}</div>
                          <Button variant="primary" size="sm">Добавить</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Return Flight Services */}
                <div>
                  <div className={s.recCategoryTitle}>
                    <MdLightbulbOutline /> Рекомендуемые услуги к обратному перелёту
                  </div>
                  <div className={s.recItems}>
                    {[
                      { icon: MdLuggage, title: "Дополнительный багаж", subtitle: "23 кг на пассажира", price: "2 850 ₽" },
                      { icon: MdRestaurant, title: "Питание на борту", subtitle: "Горячее питание", price: "1 200 ₽" },
                    ].map((item, i) => (
                      <div key={i} className={s.recItemCard}>
                        <div className={s.recItemLeft}>
                          <div className={s.recItemIcon} style={{ color: '#2563eb' }}>
                            <item.icon />
                          </div>
                          <div>
                            <div className={s.recItemName}>{item.title}</div>
                            <div className={s.recItemSub}>{item.subtitle}</div>
                          </div>
                        </div>
                        <div className={s.recItemRight}>
                          <div className={s.recItemPrice}>{item.price}</div>
                          <Button variant="primary" size="sm">Добавить</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={s.sidebar}>
        <div className={s.summaryCard}>
          <h3 className={s.summaryTitle}>Сводка маршрута</h3>
          
          <div className={s.summaryRow}>
            <span>Общая длительность</span>
            <span>7 дней</span>
          </div>
          <div className={s.summaryRow}>
            <span>Количество услуг</span>
            <span>{totalServices + 2}</span>
          </div>
          <div className={s.summaryRow}>
            <span>Количество пересадок</span>
            <span>0</span>
          </div>
          <div className={s.summaryRow}>
            <span>Выбранные допы</span>
            <span>0</span>
          </div>
          <div className={s.summaryRow}>
            <span>Стоимость допов</span>
            <span>0 ₽</span>
          </div>

          <div className={s.totalBlock}>
            <span className={s.totalLabel}>Общая стоимость</span>
            <div className={s.totalValue}>
              {totalPrice.toLocaleString()} ₽
              <span>за 3 пассажиров</span>
            </div>
          </div>

          <Button variant="primary" size="lg" className={s.confirmBtn}>
            Подтвердить маршрут
          </Button>
        </div>
      </div>
    </div>
  );
}
