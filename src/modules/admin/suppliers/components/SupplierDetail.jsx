"use client";
import React, { useState, useMemo } from "react";
import { Button, Select, UITable } from "@/ui";
import {
  MdChat,
  MdEdit,
  MdPowerSettingsNew,
  MdBugReport,
  MdEmail,
  MdPhone,
  MdLanguage,
  MdCloud,
  MdDescription,
  MdAccessTime,
} from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import s from "../styles/SupplierDetail.module.scss";

const TABS = [
  { id: "general", label: "Общее" },
  { id: "finance", label: "Финансы" },
  { id: "sla", label: "SLA" },
  { id: "integration", label: "Интеграция / API" },
  { id: "documents", label: "Документы" },
  { id: "history", label: "История" },
];

export default function SupplierDetail() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState("active");

  const supplier = useMemo(
    () => ({
      id: params?.id || "SUP-001",
      internalCode: "THY-AGENCY-01",
      name: "Turkish Airlines",
      typeLabel: "Авиакомпания",
      status: "active",
      statusLabel: "Активен",
      statusColor: "green",
      shortDescription:
        "Национальный авиаперевозчик. Используется для регулярных рейсов, групповых блоков и премиальных клиентов.",
      services: ["Авиа"],
      regions: "Европа, Ближний Восток",
      currency: "USD",
      timeZone: "GMT+3",
      contacts: {
        contactPerson: "Ahmet Yılmaz",
        manager: "agency-support@thy.com",
        techSupport: "api-support@thy.com",
        phoneMain: "+90 555 123 45 67",
        phoneDuty: "+90 555 987 65 43",
        website: "https://www.turkishairlines.com",
        portalUrl: "https://agency.thy.com",
        workingHours: "Пн–Пт 09:00–19:00 (GMT+3)",
      },
      finance: {
        currency: "USD",
        commissionSupplier: "3% + 10 USD",
        commissionAgency: "2%",
        clientMarkup: "+5%",
        paymentTerms: "Предоплата 100% / 3 дня",
        closingTerms: "Закрытие услуг до 3 дней после вылета",
        penalties:
          "Изменения билета по правилам тарифа, no-show штраф до 100% стоимости.",
        creditLimit: "50 000 USD",
        minPayment: "5 000 USD",
        balance: {
          totalDebt: "12 500 USD",
          dueDate: "20.11.2025",
          overdue: "2 300 USD",
          toBePaid: "10 200 USD",
          prepaidBalance: "3 000 USD",
          paidServices: 124,
          unpaidServices: 18,
        },
      },
      integration: {
        enabled: true,
        baseUrl: "https://api.turkishairlines.com/v1",
        lastSync: "15.11.2025 12:03",
        status: "ok",
        authType: "OAuth2",
        tokenMask: "eyJhbGci...2fk8",
        environment: "Production",
        errorCount24h: 0,
      },
      sla: {
        confirmTime: "до 2 ч. на подтверждение",
        docsTime: "билеты до 2 ч., обмен до 4 ч.",
        avgProcessing: "1 ч. 15 мин.",
        confirmRate: "96% подтверждений",
        errorRate: "1.2% ошибок",
        servicesMonth: 382,
        problemServicesMonth: 7,
        openServices: [
          {
            id: "SRV-001",
            type: "Авиа",
            orderId: "ORD-145",
            status: "Ожидает подтверждения",
            statusColor: "yellow",
            createdAt: "15.11.2025 11:20",
          },
          {
            id: "SRV-004",
            type: "Авиа",
            orderId: "ORD-140",
            status: "Просрочено по SLA",
            statusColor: "red",
            createdAt: "14.11.2025 09:10",
          },
        ],
      },
      products: [
        {
          type: "avia",
          label: "Перелёты",
          groups: true,
          documentsRequired: "Паспорт, виза при необходимости",
          params: "PNR, тариф, багаж, тарифные правила",
          tariffs: "Регулярные тарифы, спецпредложения, групповые блоки",
        },
      ],
      documents: [
        {
          id: 1,
          name: "Договор поставки услуг.pdf",
          type: "Договор",
          updatedAt: "10.11.2025",
        },
        {
          id: 2,
          name: "SLA и регламент.pdf",
          type: "SLA",
          updatedAt: "01.11.2025",
        },
        {
          id: 3,
          name: "Техническое описание API.pdf",
          type: "ТЗ / API",
          updatedAt: "05.11.2025",
        },
      ],
      history: [
        {
          id: 1,
          date: "15.11.2025 18:40",
          user: "Админ Екатерина",
          action: "Изменена комиссия агентства",
          details: "2% → 2.5%",
        },
        {
          id: 2,
          date: "14.11.2025 12:15",
          user: "Техподдержка",
          action: "Обновлён API токен",
          details: "NDC v3, срок действия до 14.02.2026",
        },
        {
          id: 3,
          date: "10.11.2025 09:00",
          user: "Юрист",
          action: "Загружен новый договор",
          details: "Договор №2025-THY-01",
        },
      ],
    }),
    [params]
  );

  const statusClass =
    supplier.statusColor === "green"
      ? s.statusGreen
      : supplier.statusColor === "red"
      ? s.statusRed
      : s.statusGray;

  const headerStats = [
    {
      label: "Открытых услуг",
      value: supplier.sla.openServices.length,
    },
    {
      label: "Общая задолженность",
      value: supplier.finance.balance.totalDebt,
    },
    {
      label: "Просрочено",
      value: supplier.finance.balance.overdue,
    },
    {
      label: "API статус",
      value: supplier.integration.status === "ok" ? "Online" : "Attention",
    },
  ];

  const parseAmount = (value) => {
    if (typeof value !== "string") return 0;
    const normalized = value.replace(/\s/g, "").replace(/[^\d.,]/g, "");
    if (!normalized) return 0;
    const number = Number(normalized.replace(",", "."));
    return Number.isFinite(number) ? number : 0;
  };

  const extractPercent = (value) => {
    if (typeof value !== "string") return 0;
    const match = value.match(/[\d.,]+/);
    if (!match) return 0;
    return Number(match[0].replace(",", "."));
  };

  const confirmPercent = extractPercent(supplier.sla.confirmRate);
  const errorPercent = extractPercent(supplier.sla.errorRate);

  const slaPrimaryMetrics = [
    {
      icon: MdAccessTime,
      label: "Подтверждение",
      value: supplier.sla.confirmTime,
      meta: supplier.sla.confirmRate,
    },
    {
      icon: MdDescription,
      label: "Документы / ваучеры",
      value: supplier.sla.docsTime,
      meta: "Средний SLA по документам",
    },
    {
      icon: MdAccessTime,
      label: "Среднее время обработки",
      value: supplier.sla.avgProcessing,
      meta: "Последние 30 дней",
    },
  ];

  const slaSecondaryMetrics = [
    {
      label: "Услуг за месяц",
      value: supplier.sla.servicesMonth,
    },
    {
      label: "Проблемных услуг",
      value: supplier.sla.problemServicesMonth,
    },
    {
      label: "Открытые услуги",
      value: supplier.sla.openServices.length,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className={s.tabStack}>
            <section className={s.blockFullWidth}>
              <div className={s.sectionHeader}>
                <h3 className={s.blockTitle}>Оперативные показатели</h3>
                <p className={s.sectionCaption}>
                  Текущий объём услуг, задолженность и состояние API
                </p>
              </div>
              <div className={s.overviewStats}>
                {headerStats.map((stat) => (
                  <div key={stat.label} className={s.overviewStatCard}>
                    <span className={s.overviewStatLabel}>{stat.label}</span>
                    <span className={s.overviewStatValue}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className={s.twoColumnGrid}>
              <section className={s.block}>
                <div className={s.sectionHeader}>
                  <h3 className={s.blockTitle}>Общие сведения</h3>
                  <p className={s.sectionCaption}>
                    Ключевые параметры и идентификаторы поставщика
                  </p>
                </div>
                <dl className={s.definitionList}>
                  <div className={s.definitionRow}>
                    <dt>ID поставщика</dt>
                    <dd>{supplier.id}</dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Внутренний код</dt>
                    <dd>{supplier.internalCode}</dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Тип поставщика</dt>
                    <dd>{supplier.typeLabel}</dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Регионы</dt>
                    <dd>{supplier.regions}</dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Часовой пояс</dt>
                    <dd>{supplier.timeZone}</dd>
                  </div>
                </dl>
              </section>

              <section className={s.block}>
                <div className={s.sectionHeader}>
                  <h3 className={s.blockTitle}>Контакты</h3>
                  <p className={s.sectionCaption}>
                    Быстрые точки входа и ответственные лица
                  </p>
                </div>
                <dl className={s.definitionList}>
                  <div className={s.definitionRow}>
                    <dt>Контактное лицо</dt>
                    <dd>{supplier.contacts.contactPerson}</dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Email менеджера</dt>
                    <dd>
                      <span className={s.withIcon}>
                        <MdEmail /> {supplier.contacts.manager}
                      </span>
                    </dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Техподдержка</dt>
                    <dd>
                      <span className={s.withIcon}>
                        <MdEmail /> {supplier.contacts.techSupport}
                      </span>
                    </dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Телефон (общий)</dt>
                    <dd>
                      <span className={s.withIcon}>
                        <MdPhone /> {supplier.contacts.phoneMain}
                      </span>
                    </dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Телефон (дежурный)</dt>
                    <dd>
                      <span className={s.withIcon}>
                        <MdPhone /> {supplier.contacts.phoneDuty}
                      </span>
                    </dd>
                  </div>
                  <div className={s.definitionRow}>
                    <dt>Рабочие часы</dt>
                    <dd>{supplier.contacts.workingHours}</dd>
                  </div>
                </dl>
              </section>
            </div>

            <section className={s.blockFullWidth}>
              <div className={s.sectionHeader}>
                <h3 className={s.blockTitle}>Онлайн‑сервисы</h3>
                <p className={s.sectionCaption}>
                  Ссылки на публичные и партнёрские ресурсы
                </p>
              </div>
              <dl className={s.definitionList}>
                <div className={s.definitionRow}>
                  <dt>Сайт</dt>
                  <dd>
                    <span className={s.withIcon}>
                      <MdLanguage />
                      <a
                        href={supplier.contacts.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {supplier.contacts.website}
                      </a>
                    </span>
                  </dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Личный кабинет</dt>
                  <dd>
                    <span className={s.withIcon}>
                      <MdLanguage />
                      <a
                        href={supplier.contacts.portalUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {supplier.contacts.portalUrl}
                      </a>
                    </span>
                  </dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Сферы услуг</dt>
                  <dd>{supplier.services.join(", ")}</dd>
                </div>
              </dl>
            </section>
          </div>
        );

      case "finance": {
        const financeHighlights = [
          { label: "Валюта расчётов", value: supplier.finance.currency },
          {
            label: "Комиссия поставщика",
            value: supplier.finance.commissionSupplier,
          },
          {
            label: "Комиссия агентства",
            value: supplier.finance.commissionAgency,
          },
          {
            label: "Наценка для клиента",
            value: supplier.finance.clientMarkup,
          },
        ];

        const paymentDetails = [
          { label: "Условия оплаты", value: supplier.finance.paymentTerms },
          {
            label: "Сроки закрытия услуг",
            value: supplier.finance.closingTerms,
          },
        ];

        const limitDetails = [
          { label: "Штрафы / условия", value: supplier.finance.penalties },
          { label: "Кредитный лимит", value: supplier.finance.creditLimit },
          { label: "Минимальный платёж", value: supplier.finance.minPayment },
        ];

        const balanceMetrics = [
          {
            label: "Общая задолженность",
            value: supplier.finance.balance.totalDebt,
          },
          { label: "Просрочено", value: supplier.finance.balance.overdue },
          { label: "Ожидает оплаты", value: supplier.finance.balance.toBePaid },
          {
            label: "Предоплата / депозит",
            value: supplier.finance.balance.prepaidBalance,
          },
        ];

        const timelineEntries = [
          {
            label: "Дата обязательного платежа",
            value: supplier.finance.balance.dueDate,
          },
          {
            label: "Услуг оплачено",
            value: supplier.finance.balance.paidServices,
          },
          {
            label: "Услуг в работе",
            value: supplier.finance.balance.unpaidServices,
          },
        ];

        const creditLimitValue = parseAmount(supplier.finance.creditLimit);
        const totalDebtValue = parseAmount(supplier.finance.balance.totalDebt);
        const debtPercent =
          creditLimitValue > 0
            ? Math.min(
                Math.round((totalDebtValue / creditLimitValue) * 100),
                100
              )
            : 0;

        return (
          <div className={s.blockStack}>
            <section className={s.block}>
              <div className={s.sectionHeader}>
                <h3 className={s.blockTitle}>Финансовое резюме</h3>
                <p className={s.sectionCaption}>
                  Ключевые показатели расчётов и комиссий по поставщику
                </p>
              </div>
              <div className={s.financeHighlights}>
                {financeHighlights.map((item) => (
                  <div key={item.label} className={s.financeHighlightCard}>
                    <span className={s.financeHighlightLabel}>
                      {item.label}
                    </span>
                    <span className={s.financeHighlightValue}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className={s.financeSplit}>
              <section className={s.block}>
                <div className={s.sectionHeader}>
                  <h3 className={s.blockTitle}>Оплата и закрытие услуг</h3>
                  <p className={s.sectionCaption}>
                    Стандартные сроки и сценарии расчётов
                  </p>
                </div>
                <dl className={`${s.definitionList} ${s.financeList}`}>
                  {paymentDetails.map((detail) => (
                    <div key={detail.label} className={s.definitionRow}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className={s.block}>
                <div className={s.sectionHeader}>
                  <h3 className={s.blockTitle}>Лимиты и условия</h3>
                  <p className={s.sectionCaption}>
                    Требования к оплате и дополнительные ограничения
                  </p>
                </div>
                <dl className={`${s.definitionList} ${s.financeList}`}>
                  {limitDetails.map((detail) => (
                    <div key={detail.label} className={s.definitionRow}>
                      <dt>{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <section className={s.block}>
              <div className={s.sectionHeader}>
                <h3 className={s.blockTitle}>Задолженность и депозит</h3>
                <p className={s.sectionCaption}>
                  Текущая нагрузка на кредитный лимит и движение средств
                </p>
              </div>
              <div className={s.financeMetrics}>
                {balanceMetrics.map((metric) => (
                  <div key={metric.label} className={s.financeMetricCard}>
                    <span className={s.financeMetricLabel}>{metric.label}</span>
                    <span className={s.financeMetricValue}>{metric.value}</span>
                  </div>
                ))}
              </div>
              <div className={s.financeProgress}>
                <div className={s.financeProgressLabel}>
                  <span>Использовано кредитного лимита</span>
                  <span>{debtPercent}%</span>
                </div>
                <div className={s.progressTrack}>
                  <div
                    className={s.progressValue}
                    style={{ width: `${debtPercent}%` }}
                  />
                </div>
              </div>
              <div className={s.financeTimeline}>
                {timelineEntries.map((entry) => (
                  <div key={entry.label} className={s.financePill}>
                    <span className={s.financePillLabel}>{entry.label}</span>
                    <span className={s.financePillValue}>{entry.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      }

      case "sla": {
        const slaColumns = [
          {
            key: "id",
            label: "ID услуги",
            width: "120px",
            render: (value) => <span className={s.tableId}>{value}</span>,
          },
          { key: "type", label: "Тип", width: "120px" },
          { key: "orderId", label: "Заказ", width: "140px" },
          {
            key: "status",
            label: "Статус",
            flex: 1.2,
            render: (_, row) => (
              <span
                className={`${s.statusPill} ${
                  row.statusColor === "red"
                    ? s.statusRed
                    : row.statusColor === "yellow"
                    ? s.statusYellow
                    : s.statusGray
                }`}
              >
                {row.status}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Создана",
            flex: 1,
            render: (value) => <span className={s.muted}>{value}</span>,
          },
          {
            key: "actions",
            label: "",
            width: "160px",
            render: (_, row) => (
              <div className={s.tableActions}>
                <Button variant="outline" size="xs">
                  Изменить статус
                </Button>
              </div>
            ),
          },
        ];

        const slaRows = supplier.sla.openServices.map((srv) => ({
          id: srv.id,
          type: srv.type,
          orderId: srv.orderId,
          status: srv.status,
          statusColor: srv.statusColor,
          createdAt: srv.createdAt,
        }));

        return (
          <div className={s.blockStack}>
            <section className={s.block}>
              <div className={s.sectionHeader}>
                <h3 className={s.blockTitle}>SLA показатели</h3>
                <p className={s.sectionCaption}>
                  Скорость обработки запросов и качество исполнения
                </p>
              </div>
              <div className={s.slaPrimaryGrid}>
                {slaPrimaryMetrics.map(({ icon: Icon, label, value, meta }) => (
                  <div key={label} className={s.slaCard}>
                    <div className={s.slaCardIcon}>
                      <Icon />
                    </div>
                    <div className={s.slaCardMeta}>
                      <span className={s.slaCardLabel}>{label}</span>
                      <span className={s.slaCardValue}>{value}</span>
                      {meta && <span className={s.slaCardHint}>{meta}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className={s.slaProgressRow}>
                <div className={s.progressCard}>
                  <div className={s.progressCardHeader}>
                    <span>Процент подтверждений</span>
                    <strong>{supplier.sla.confirmRate}</strong>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={s.progressValue}
                      style={{ width: `${Math.min(confirmPercent, 100)}%` }}
                    />
                  </div>
                </div>
                <div className={s.progressCard}>
                  <div className={s.progressCardHeader}>
                    <span>Ошибки / сбои</span>
                    <strong>{supplier.sla.errorRate}</strong>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={`${s.progressValue} ${s.progressDanger}`}
                      style={{ width: `${Math.min(errorPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className={s.slaSecondaryGrid}>
                {slaSecondaryMetrics.map((metric) => (
                  <div key={metric.label} className={s.slaStat}>
                    <span className={s.slaStatLabel}>{metric.label}</span>
                    <span className={s.slaStatValue}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={s.tableBlock}>
              <div className={s.blockTitleRow}>
                <h3 className={s.blockTitle}>Открытые услуги на поставщике</h3>
              </div>
              <UITable
                columns={slaColumns}
                rows={slaRows}
                showCheckbox={false}
              />
            </section>
          </div>
        );
      }

      case "integration":
        return (
          <div className={s.blockStack}>
            <section className={s.block}>
              <h3 className={s.blockTitle}>API параметры</h3>
              <dl className={s.definitionList}>
                <div className={s.definitionRow}>
                  <dt>Статус API</dt>
                  <dd>
                    <span className={s.withIcon}>
                      <MdCloud />
                      {supplier.integration.status === "ok"
                        ? "Подключен"
                        : "Проблемы"}
                    </span>
                  </dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Среда</dt>
                  <dd>{supplier.integration.environment}</dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Базовый URL</dt>
                  <dd>{supplier.integration.baseUrl}</dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Тип авторизации</dt>
                  <dd>{supplier.integration.authType}</dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Токен (маска)</dt>
                  <dd>{supplier.integration.tokenMask}</dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Последняя синхронизация</dt>
                  <dd>{supplier.integration.lastSync}</dd>
                </div>
                <div className={s.definitionRow}>
                  <dt>Ошибок за 24 часа</dt>
                  <dd>{supplier.integration.errorCount24h}</dd>
                </div>
              </dl>
              <div className={s.actionsRow}>
                <Button variant="primary" size="sm" icon={MdBugReport}>
                  Проверить подключение
                </Button>
                <Button variant="outline" size="sm">
                  Обновить токен
                </Button>
                <Button variant="outline" size="sm">
                  Открыть логи
                </Button>
              </div>
            </section>
          </div>
        );

      case "documents": {
        const documentsColumns = [
          { key: "type", label: "Тип" },
          {
            key: "name",
            label: "Название",
            flex: 2,
            render: (value) => (
              <span className={s.docNameCell} title={value}>
                {value}
              </span>
            ),
          },
          {
            key: "updatedAt",
            label: "Обновлён",
            render: (value) => <span className={s.muted}>{value}</span>,
          },
          {
            key: "actions",
            label: "",
            render: (_, row) => (
              <div className={s.tableActions}>
                <Button variant="outline" size="xs">
                  Скачать
                </Button>
                <Button variant="outline" size="xs">
                  Архивировать
                </Button>
              </div>
            ),
          },
        ];

        const documentRows = supplier.documents.map((doc) => ({
          id: doc.id,
          type: doc.type,
          name: doc.name,
          updatedAt: doc.updatedAt,
        }));

        return (
          <section className={s.tableBlock}>
            <div className={s.blockTitleRow}>
              <h3 className={s.blockTitle}>Документы поставщика</h3>
            </div>
            <UITable
              columns={documentsColumns}
              rows={documentRows}
              showCheckbox={false}
            />
          </section>
        );
      }

      case "history":
        const historyColumns = [
          {
            key: "date",
            label: "Дата и время",
            render: (value) => <span className={s.muted}>{value}</span>,
          },
          {
            key: "user",
            label: "Пользователь",
            render: (value) => <span className={s.historyUser}>{value}</span>,
          },
          {
            key: "action",
            label: "Действие",
            flex: 1.5,
            render: (value) => <span className={s.historyAction}>{value}</span>,
          },
          {
            key: "details",
            label: "Описание",
            flex: 2,
            render: (value) => (
              <span className={s.historyDetails}>{value}</span>
            ),
          },
        ];

        const historyRows = supplier.history.map((entry) => ({
          id: entry.id,
          date: entry.date,
          user: entry.user,
          action: entry.action,
          details: entry.details,
        }));

        return (
          <section>
            <UITable
              columns={historyColumns}
              rows={historyRows}
              showCheckbox={false}
            />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={s.supplierDetail}>
      <header className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.title}>{supplier.name}</h1>
          <div className={s.headerMeta}>
            <span>{supplier.typeLabel}</span>
            <span className={`${s.statusBadge} ${statusClass}`}>
              {supplier.statusLabel}
            </span>
            <span>Валюта: {supplier.currency}</span>
          </div>
        </div>
        <div className={s.headerRight}>
          <div className={s.headerButtons}>
            <Button variant="outline" size="sm" icon={MdEdit}>
              Редактировать
            </Button>

            <Button variant="outline" size="sm" icon={MdPowerSettingsNew}>
              Деактивировать
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={MdBugReport}
              onClick={() => {}}
            >
              Тестировать API
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={MdChat}
              onClick={() => router.push(`/operator/chat/${supplier.id}`)}
            >
              Чат
            </Button>
          </div>
        </div>
      </header>

      <div className={s.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={s.tabContent}>{renderTabContent()}</div>
    </div>
  );
}
