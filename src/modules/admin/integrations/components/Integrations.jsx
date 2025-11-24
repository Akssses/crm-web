"use client";
import React, { useState } from "react";
import s from "../styles/Integrations.module.scss";
import { Button, Container, Input } from "@/ui";
import { IoSearchOutline } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { scenarios, services } from "../hooks/Data";

function Badge({ text, color = "green", icon: Icon = MdCheckCircle }) {
  const colors = {
    green: "#10b981",
    red: "#ef4444",
    yellow: "#fbbf24",
    blue: "#3b82f6",
    orange: "#f97316",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: colors[color],
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      <Icon size={16} />
      {text}
    </div>
  );
}
function Badge1({ text, color = "green", icon: Icon = MdCheckCircle }) {
  const colors = {
    blue: "#2563EB",
    yellow: "#D97706",
    purple: "#000",
    pink: "#DC2626",
    green: "#166534",
    red: "#991B1B",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: colors[color],
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      <Icon size={16} />
      {text}
    </div>
  );
}

function StatCard({ label, value, sublabel, color = "blue" }) {
  const colors = {
    blue: "#EFF6FF",
    yellow: "#FFFBEB",
    purple: "#F9FAFB",
    pink: "#FEF2F2",
  };
  const colorstext = {
    blue: "#2563EB",
    yellow: "#D97706",
    purple: "#000",
    pink: "#DC2626",
  };

  return (
    <div className={s.statCard} style={{ backgroundColor: colors[color] }}>
      <p className={s.statLabel}>{label}</p>
      <p className={s.statValue} style={{ color: colorstext[color] }}>
        {value}
      </p>
      {sublabel && <p className={s.statSublabel}>{sublabel}</p>}
    </div>
  );
}

function ScenarioCard({ title, icon: Icon, status, statusColor, color }) {
  return (
    <div className={s.scenarioCard}>
      <div className={s.scenarioHeader}>
        <div className={s.scenarioIcon}>
          <Icon size={24} color={color} />
        </div>
        <div className={s.scenarioTitle}>
          <h4>{title}</h4>
        </div>
      </div>
      <div className={s.scenarioStatus}>
        <Badge text={status} color={statusColor} />
      </div>
    </div>
  );
}

// ServiceCard компонент
function ServiceCard({
  title,
  code,
  status,
  icon: Icon,
  iconColor,
  bgColor,
  statusColor,
  fields,
}) {
  const colors = {
    blue: "#EFF6FF",
    yellow: "#FFFBEB",
    purple: "#F9FAFB",
    pink: "#FEF2F2",
    green: "#DCFCE7",
    red: "#FEE2E2",
  };
  const colorstext = {
    blue: "#2563EB",
    yellow: "#D97706",
    purple: "#000",
    pink: "#DC2626",
    green: "#166534",
    red: "#991B1B",
  };

  return (
    <Container className={s.serviceCard}>
      <div className={s.serviceHeader}>
        <div className={s.serviceNumber} style={{ background: bgColor }}>
          <Icon size={24} color={iconColor} />
        </div>
        <div className={s.serviceInfo}>
          <h4>{title}</h4>
          <p>{code}</p>
        </div>
        <div
          className={s.serviceStatus}
          style={{ background: colors[statusColor] }}
        >
          <Badge1 text={status} color={statusColor} />
        </div>
      </div>
      <div className={s.serviceFields}>
        {fields.map((field, idx) => (
          <div key={idx} className={s.fieldRow}>
            <span className={s.fieldLabel}>{field.label}:</span>
            <span className={s.fieldValue}>{field.value}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default function Integrations() {
  const [search, setSearch] = useState("");

  return (
    <div className={s.integrations}>
      <div className={s.justi}>
        <div></div>
        <div className={s.flex}>
          <Input
            icon={IoSearchOutline}
            placeholder="Поиск..."
            value={search}
            onChange={setSearch}
          />
          <Button variant="bgblue" icon={FaPlus}>
            Добавить
          </Button>
        </div>
      </div>
      <Container size="full">
        <div className={s.headerTop}>
          <div className={s.headerInfo}>
            <div className={s.statusBadge}>
              <MdCheckCircle size={20} style={{ color: "#10b981" }} />
            </div>
            <div className={s.headerMeta}>
              <h4>Статус FinanceHub</h4>
              <span className={s.metaLabel}>• Активен</span>
            </div>
          </div>
          <Button variant="bggray100" icon={IoMdSettings}>
            Настройки FinanceHub
          </Button>
        </div>

        <div className={s.statsGrid}>
          <StatCard
            label="Последняя синхронизация"
            value="14:32:15"
            sublabel="15.11.2024"
            color="purple"
          />
          <StatCard
            label="В обработке"
            value="12"
            sublabel="ошибок"
            color="blue"
          />
          <StatCard
            label="Ожидают"
            value="8"
            sublabel="ошибок"
            color="yellow"
          />
          <StatCard
            label="Ошибки за сутки"
            value="3"
            sublabel="Посмотреть лог →"
            color="pink"
          />
        </div>
      </Container>

      {/* Scenarios Section */}
      <Container size="full">
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Поддерживаемые сценарии обмена</h2>
          <div className={s.scenariosGrid}>
            {scenarios.map((scenario, idx) => (
              <ScenarioCard
                key={idx}
                title={scenario.title}
                icon={scenario.icon}
                status={scenario.status}
                statusColor={scenario.statusColor}
                color={scenario.color}
              />
            ))}
          </div>
        </section>
      </Container>

      {/* Services Section */}
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Интегрированные сервисы</h2>
        <div className={s.servicesGrid}>
          {services.map((service, idx) => (
            <ServiceCard
              icon={service.icon}
              key={idx}
              iconColor={service.iconColor}
              bgColor={service.bgColor}
              title={service.title}
              code={service.code}
              status={service.status}
              statusColor={service.statusColor}
              fields={service.fields}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
