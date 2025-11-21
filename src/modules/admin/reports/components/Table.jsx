import s from "../styles/Analytics.module.scss";
import { UITable } from "@/ui";
import { MdInfoOutline } from "react-icons/md";

function Avatar({ src, name }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={src}
        alt={name}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <span style={{ fontWeight: "600", color: "#1f2937" }}>{name}</span>
    </div>
  );
}

function Badge({ text, color = "blue" }) {
  const colors = {
    blue: "#3b82f6",
    red: "#ef4444",
    green: "#10b981",
    yellow: "#fbbf24",
    pink: "#ec4899",
    cyan: "#06b6d4",
  };

  return (
    <span
      style={{
        backgroundColor: `${colors[color]}20`,
        color: colors[color],
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
      }}
    >
      • {text}
    </span>
  );
}

// StatCard компонент
function StatCard({ label, value, unit = "" }) {
  return (
    <div className={s.statCard}>
      <div className={s.statIcon}>👥</div>
      <div className={s.statContent}>
        <p className={s.statLabel}>{label}</p>
        <p className={s.statValue}>
          {value}
          <span className={s.statUnit}>{unit}</span>
        </p>
      </div>
      <button className={s.infoButton}>
        <MdInfoOutline size={16} />
      </button>
    </div>
  );
}

// ===== ТАБЛИЦА ОПЕРАТОРОВ =====
export function OperatorsTable({ onRowClick }) {
  const operatorsData = [
    {
      id: 1,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=1",
      orders: "53",
      clients: "42",
      refunds: "2",
      revenue: "330 000 RUB",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 2,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=2",
      orders: "53",
      clients: "42",
      refunds: "2",
      revenue: "330 000 RUB",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 3,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=3",
      orders: "53",
      clients: "42",
      refunds: "2",
      revenue: "330 000 RUB",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 4,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=4",
      orders: "53",
      clients: "42",
      refunds: "2",
      revenue: "330 000 RUB",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 5,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=5",
      orders: "53",
      clients: "42",
      refunds: "2",
      revenue: "330 000 RUB",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 6,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=6",
      orders: "53",
      clients: "42",
      refunds: "2",
      revenue: "330 000 RUB",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Оператор",
      render: (value, row) => <Avatar src={row.avatar} name={value} />,
    },
    { key: "orders", label: "Заявок" },
    { key: "clients", label: "Заказов" },
    { key: "refunds", label: "Возвраты" },
    { key: "revenue", label: "Выручка" },
    { key: "commission", label: "Средний чек" },
    { key: "sla", label: "SLA" },
    { key: "margin", label: "Маржа" },
  ];

  return (
    <UITable
      columns={columns}
      rows={operatorsData}
      showCheckbox={false}
      onRowClick={(row) => onRowClick?.(row)}
    />
  );
}

// ===== ТАБЛИЦА ПОСТАВЩИКОВ =====
export function SuppliersAnalyticsTable({ onRowClick }) {
  const suppliersData = [
    {
      id: 1,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 2,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 3,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 4,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 5,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 6,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
    {
      id: 7,
      name: "Booking",
      type: "API",
      orders: "42",
      refunds: "2",
      confirmations: "10",
      commission: "8 050 RUB",
      sla: "1ч 15м",
      margin: "15%",
    },
  ];

  const columns = [
    { key: "name", label: "Поставщик" },
    {
      key: "type",
      label: "Тип",
      render: (value) => <Badge text={value} color="blue" />,
    },
    { key: "orders", label: "Заявок" },
    { key: "refunds", label: "Отказов" },
    { key: "confirmations", label: "Подтверждений" },
    { key: "commission", label: "Средний чек" },
    { key: "sla", label: "SLA" },
    { key: "margin", label: "Маржа" },
  ];

  return (
    <UITable
      columns={columns}
      rows={suppliersData}
      showCheckbox={false}
      onRowClick={(row) => onRowClick?.(row)}
    />
  );
}

// ===== ТАБЛИЦА SLA =====
export function SLAAnalyticsTable({ onRowClick }) {
  const slaData = [
    {
      id: 1,
      type: "Оператор",
      name: "Азгарим",
      avgSLA: "10 мин.",
      violations: "10",
      margin: "15%",
    },
    {
      id: 2,
      type: "Оператор",
      name: "Азгарим",
      avgSLA: "10 мин.",
      violations: "10",
      margin: "15%",
    },
    {
      id: 3,
      type: "Оператор",
      name: "Азгарим",
      avgSLA: "10 мин.",
      violations: "10",
      margin: "15%",
    },
    {
      id: 4,
      type: "Оператор",
      name: "Азгарим",
      avgSLA: "10 мин.",
      violations: "10",
      margin: "15%",
    },
    {
      id: 5,
      type: "Оператор",
      name: "Азгарим",
      avgSLA: "10 мин.",
      violations: "10",
      margin: "15%",
    },
  ];

  const columns = [
    { key: "type", label: "Тип" },
    { key: "name", label: "Имя" },
    { key: "avgSLA", label: "Средний SLA" },
    { key: "violations", label: "Просрочки" },
    { key: "margin", label: "Верхний (%)" },
  ];

  return (
    <UITable
      columns={columns}
      rows={slaData}
      showCheckbox={false}
      onRowClick={(row) => onRowClick?.(row)}
    />
  );
}
