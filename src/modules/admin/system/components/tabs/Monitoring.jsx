"use client";
import React from "react";
import s from "../../styles/SystemAdmin.module.scss";
import { Statcard } from "@/ui";
import {
  TbDatabase,
  TbApi,
  TbChartBar,
  TbPlugConnected,
  TbActivity,
  TbClock,
  TbAlertTriangle,
} from "react-icons/tb";

export default function Monitoring() {
  return (
    <div className={s.section}>
      <div className={s.sectionHeader}>
        <div className={s.headerWithIcon}>
          <div>
            <h2>Мониторинг системы</h2>
            <p className={s.headerSubtitle}>
              Актуальное состояние всех сервисов в реальном времени
            </p>
          </div>
        </div>
        <div className={s.lastUpdate}>
          <TbClock size={14} />
          <span>
            Обновлено:{" "}
            {new Date().toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Ключевые метрики */}
      <div className={s.kpiGrid}>
        <Statcard
          icon={TbDatabase}
          title="2.4 GB"
          unit="Размер БД"
          change={5}
          trend="up"
          color="#3b82f6"
        />
        <Statcard
          icon={TbApi}
          title="320 мс"
          unit="Среднее время ответа API"
          change={-8}
          trend="down"
          color="#10b981"
        />
        <Statcard
          icon={TbChartBar}
          title="1.2%"
          unit="Ошибки API"
          change={-0.4}
          trend="down"
          color="#f59e0b"
        />
        <Statcard
          icon={TbPlugConnected}
          title="OK"
          unit="Интеграции"
          change={0}
          trend="up"
          color="#22c55e"
        />
      </div>

      {/* Детальные метрики */}
      <div className={s.gridTwo}>
        <div className={s.monitorCard}>
          <div className={s.monitorHeader}>
            <div className={s.monitorTitleGroup}>
              <div className={s.monitorIconWrapper}>
                <TbDatabase size={20} />
              </div>
              <h3 className={s.monitorTitle}>База данных</h3>
            </div>
            <span className={`${s.statusPill} ${s.statusOk}`}>Стабильно</span>
          </div>
          <div className={s.monitorMetricsGrid}>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Размер БД</span>
              <span className={s.metricValue}>2.4 GB</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Количество записей</span>
              <span className={s.metricValue}>1 250 000</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Средняя задержка</span>
              <span className={s.metricValue}>45 мс</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Ошибки индексов</span>
              <span className={`${s.metricValue} ${s.successText}`}>нет</span>
            </div>
            <div className={s.monitorMetricFull}>
              <span className={s.metricLabel}>VACUUM/ANALYZE</span>
              <span className={s.metricValueMuted}>30.11.2025 02:10</span>
            </div>
          </div>
        </div>

        <div className={s.monitorCard}>
          <div className={s.monitorHeader}>
            <div className={s.monitorTitleGroup}>
              <div className={s.monitorIconWrapper}>
                <TbApi size={20} />
              </div>
              <h3 className={s.monitorTitle}>API</h3>
            </div>
            <span className={`${s.statusPill} ${s.statusWarn}`}>
              <TbAlertTriangle size={12} />
              Есть предупреждения
            </span>
          </div>
          <div className={s.monitorMetricsGrid}>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Среднее время ответа</span>
              <span className={s.metricValue}>320 мс</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>95-й перцентиль</span>
              <span className={s.metricValue}>520 мс</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Процент ошибок</span>
              <span className={`${s.metricValue} ${s.warnText}`}>1.2%</span>
            </div>
            <div className={s.monitorMetricFull}>
              <span className={s.metricLabel}>Проблемные эндпоинты</span>
              <div className={s.endpointList}>
                <code>/api/orders/export</code>
                <code>/api/payments/report</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.gridTwo}>
        <div className={s.monitorCard}>
          <div className={s.monitorHeader}>
            <div className={s.monitorTitleGroup}>
              <div className={s.monitorIconWrapper}>
                <TbChartBar size={20} />
              </div>
              <h3 className={s.monitorTitle}>Очереди</h3>
            </div>
            <span className={`${s.statusPill} ${s.statusOk}`}>В норме</span>
          </div>
          <div className={s.monitorMetricsGrid}>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Задачи в очереди</span>
              <span className={s.metricValue}>12</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Ошибки</span>
              <span className={`${s.metricValue} ${s.successText}`}>0</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Макс. задержка</span>
              <span className={s.metricValue}>3 мин</span>
            </div>
          </div>
        </div>

        <div className={s.monitorCard}>
          <div className={s.monitorHeader}>
            <div className={s.monitorTitleGroup}>
              <div className={s.monitorIconWrapper}>
                <TbPlugConnected size={20} />
              </div>
              <h3 className={s.monitorTitle}>Интеграции</h3>
            </div>
            <span className={`${s.statusPill} ${s.statusWarn}`}>
              <TbAlertTriangle size={12} />
              Есть замечания
            </span>
          </div>
          <div className={s.monitorMetricsGrid}>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Amadeus</span>
              <span className={`${s.metricValue} ${s.successText}`}>● OK</span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Sirena</span>
              <span className={`${s.metricValue} ${s.successText}`}>● OK</span>
            </div>
            <div className={s.monitorMetricFull}>
              <span className={s.metricLabel}>Travelport</span>
              <span className={`${s.metricValue} ${s.warnText}`}>
                ● Warning — медленный отклик
              </span>
            </div>
            <div className={s.monitorMetric}>
              <span className={s.metricLabel}>Платёжные шлюзы</span>
              <span className={`${s.metricValue} ${s.successText}`}>● OK</span>
            </div>
            <div className={s.monitorMetricFull}>
              <span className={s.metricLabel}>SMS / email / Telegram</span>
              <span className={`${s.metricValue} ${s.successText}`}>● OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
