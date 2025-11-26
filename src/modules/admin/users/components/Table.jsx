"use client";
import { UITable } from "@/ui";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { LuForward } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";

// Avatar компонент
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

// Таблица с пользователями
export function UsersTable({
  data,
  columns: customColumns,
  onFilterApply,
} = {}) {
  const defaultUsersData = [
    {
      id: 1,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=1",
      email: "lesliealx01@mail.com",
      phone: "(702) 555-0122",
      organization: "Asia Travel",
      role: "Админ",
      status: "Активен",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://i.pravatar.cc/32?img=2",
      email: "floydmiles@mail.com",
      phone: "(219) 555-0114",
      organization: "Турбай",
      role: "Оператор",
      status: "Активен",
    },
    {
      id: 3,
      name: "Jerome Bell",
      avatar: "https://i.pravatar.cc/32?img=3",
      email: "jromebell@mail.com",
      phone: "(217) 555-0113",
      organization: "Best Travel",
      role: "Бухгалтер",
      status: "Не активен",
    },
    {
      id: 4,
      name: "Savannah Nguyen",
      avatar: "https://i.pravatar.cc/32?img=4",
      email: "nguyensav@mail.com",
      phone: "(205) 555-0100",
      organization: "Asia Travel",
      role: "Супервайзор",
      status: "В архиве",
    },
    {
      id: 5,
      name: "Savannah Nguyen",
      avatar: "https://i.pravatar.cc/32?img=5",
      email: "nguyensav@mail.com",
      phone: "(205) 555-0100",
      organization: "Asia Travel",
      role: "Закупщик",
      status: "Активен",
    },
  ];

  const usersData = data || defaultUsersData;

  const defaultUsersColumns = [
    {
      key: "name",
      label: "ФИО",
      render: (value, row) => <Avatar src={row.avatar} name={value} />,
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Номер телефона" },
    { key: "organization", label: "Организация" },
    {
      key: "role",
      label: "Роль",
      render: (value) => {
        const roleColors = {
          Админ: "blue",
          Оператор: "red",
          Бухгалтер: "cyan",
          Супервайзор: "pink",
          Закупщик: "green",
        };
        return <Badge text={value} color={roleColors[value]} />;
      },
    },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const statusColors = {
          Активен: "green",
          "Не активен": "red",
          "В архиве": "gray",
        };
        return <Badge text={value} color={statusColors[value] || "blue"} />;
      },
    },
  ];

  const usersColumns = customColumns || defaultUsersColumns;

  // Если передан onFilterApply, применяем фильтры
  const filteredData = React.useMemo(() => {
    if (!onFilterApply || Object.keys(onFilterApply).length === 0) {
      return usersData;
    }

    return usersData.filter((row) => {
      return Object.keys(onFilterApply).every((key) => {
        const filterValue = onFilterApply[key];
        if (!filterValue) return true;

        const rowValue = String(row[key] || "").toLowerCase();
        const filterValueLower = String(filterValue).toLowerCase();

        // Для булевых значений
        if (filterValue === "true" || filterValue === "false") {
          return String(row[key]) === filterValue;
        }

        return rowValue.includes(filterValueLower);
      });
    });
  }, [usersData, onFilterApply]);

  return (
    <UITable
      title="Пользователи"
      columns={usersColumns}
      rows={filteredData}
      showCheckbox={true}
      onAddClick={() => alert("Добавить пользователя")}
      addButtonText="Добавить пользователя"
      onRowAction={(row) => alert(`Action for ${row.name}`)}
    />
  );
}

// Экспорт данных и колонок для использования в фильтрах
export const getUsersTableData = () => {
  return [
    {
      id: 1,
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/32?img=1",
      email: "lesliealx01@mail.com",
      phone: "(702) 555-0122",
      organization: "Asia Travel",
      role: "Админ",
      status: "Активен",
    },
    {
      id: 2,
      name: "Floyd Miles",
      avatar: "https://i.pravatar.cc/32?img=2",
      email: "floydmiles@mail.com",
      phone: "(219) 555-0114",
      organization: "Турбай",
      role: "Оператор",
      status: "Активен",
    },
    {
      id: 3,
      name: "Jerome Bell",
      avatar: "https://i.pravatar.cc/32?img=3",
      email: "jromebell@mail.com",
      phone: "(217) 555-0113",
      organization: "Best Travel",
      role: "Бухгалтер",
      status: "Не активен",
    },
    {
      id: 4,
      name: "Savannah Nguyen",
      avatar: "https://i.pravatar.cc/32?img=4",
      email: "nguyensav@mail.com",
      phone: "(205) 555-0100",
      organization: "Asia Travel",
      role: "Супервайзор",
      status: "В архиве",
    },
    {
      id: 5,
      name: "Savannah Nguyen",
      avatar: "https://i.pravatar.cc/32?img=5",
      email: "nguyensav@mail.com",
      phone: "(205) 555-0100",
      organization: "Asia Travel",
      role: "Закупщик",
      status: "Активен",
    },
  ];
};

export const getUsersTableColumns = () => {
  return [
    {
      key: "name",
      label: "ФИО",
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Номер телефона" },
    { key: "organization", label: "Организация" },
    {
      key: "role",
      label: "Роль",
    },
    {
      key: "status",
      label: "Статус",
    },
  ];
};

// Таблица с поставщиками
export function SuppliersTable({ onRowClick }) {
  const suppliersData = [
    {
      id: 1,
      name: "Поставщик 1",
      avatar: "https://i.pravatar.cc/32?img=10",
      type: "Локальный",
      services: "Авиабилеты",
      organization: "Asia Travel",
      status: "Подключен",
      // Дополнительные поля для информационного модала
      supplierType: "Локальный",
      commission: "12%",
      contactPerson: "Иван Иванов",
      email: "ivan@mail.com",
      phone: "+996 555 123 456",
      address: "г. Бишкек, пр. Чуй 250",
      channel: "Telegram",
      chatId: "@supplier1",
      apiEndpoint: "https://api.supplier1.com",
      apiKey: "api_key_123",
      apiSecret: "secret_123",
      responseTime: "30 мин",
      deadline: "6 ч",
      notificationChannel: "Telegram",
      priority: "Высокий",
      commissionType: "Фикс",
      paymentTerms: "Предоплата 50%",
      avgResponseSpeed: "25 мин",
      confirmationRate: "92%",
      cancellationRate: "5%",
      avgCheck: "$250",
      margin: "15%",
      lastSync: "23.10.2025, 16:30",
    },
    {
      id: 2,
      name: "Поставщик 4",
      avatar: "https://i.pravatar.cc/32?img=11",
      type: "API",
      services: "Отели",
      organization: "Asia Travel",
      status: "Не активен",
      // Дополнительные поля
      supplierType: "API",
      commission: "8%",
      contactPerson: "Алина Исмаилова",
      email: "alina@hotel.kg",
      phone: "+996 700 555 444",
      address: "г. Бишкек, пр. Чуй 250, офис 3",
      channel: "WhatsApp",
      chatId: "+996700555444",
      apiEndpoint: "https://api.amadeus.com/v2/bookings",
      apiKey: "api_12345abcdef",
      apiSecret: "secret_12345",
      responseTime: "15 мин",
      deadline: "4 ч",
      notificationChannel: "Email",
      priority: "Средний",
      commissionType: "Процент",
      paymentTerms: "По факту",
      avgResponseSpeed: "18 мин",
      confirmationRate: "88%",
      cancellationRate: "8%",
      avgCheck: "$300",
      margin: "12%",
      lastSync: "24.10.2025, 14:45",
    },
  ];

  const suppliersColumns = [
    {
      key: "name",
      label: "ФИО",
      render: (value, row) => <Avatar src={row.avatar} name={value} />,
    },
    { key: "type", label: "Тип" },
    { key: "services", label: "Услуги" },
    { key: "organization", label: "Организация" },
    {
      key: "status",
      label: "Статус",
      render: (value) => (
        <Badge text={value} color={value === "Подключен" ? "green" : "pink"} />
      ),
    },
  ];

  return (
    <UITable
      columns={suppliersColumns}
      rows={suppliersData}
      showCheckbox={false}
      onRowClick={(row) => onRowClick?.(row)}
    />
  );
}
// Таблица с заказами
export function OrdersTable() {
  const ordersData = [
    {
      id: "ORD-123",
      client: "Иван Иванов",
      services: "Авиа+Отель",
      sales: "52 000 ₽",
      commission: "2 600 ₽",
      total: "2 600 ₽",
      note: "—",
    },
    {
      id: "ORD-125",
      client: "ООО 'Бета Тревел'",
      services: "Виза",
      sales: "18 000 ₽",
      commission: "900 ₽",
      total: "900 ₽",
      note: "—",
    },
    {
      id: "ORD-130",
      client: "Алмаз-Тур",
      services: "Трансфер",
      sales: "4 000 ₽",
      commission: "200 ₽",
      total: "200 ₽",
      note: "—",
    },
  ];

  const ordersColumns = [
    {
      key: "id",
      label: "Заказ",
      render: (value) => (
        <span style={{ color: "#3b82f6", fontWeight: "600" }}>{value}</span>
      ),
    },
    { key: "client", label: "Клиент" },
    { key: "services", label: "Услуги" },
    { key: "sales", label: "Продажи" },
    { key: "commission", label: "Комиссия" },
    {
      key: "total",
      label: "Начислено",
      render: (value) => (
        <span style={{ color: "#10b981", fontWeight: "600" }}>{value}</span>
      ),
    },
    { key: "note", label: "Примечание" },
  ];

  return (
    <UITable
      title="Детализация заказов (по данным из CRM)"
      columns={ordersColumns}
      rows={ordersData}
      showCheckbox={false}
    />
  );
}

// Badge компонент
function Badge({ text, color = "blue" }) {
  const colors = {
    blue: "#3b82f6",
    red: "#ef4444",
    green: "#10b981",
    yellow: "#fbbf24",
    pink: "#ec4899",
    cyan: "#06b6d4",
    purple: "#a855f7",
    orange: "#f97316",
    gray: "#6b7280",
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

// ActionButtons компонент
function ActionButtons() {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <a href="#" style={{ color: "#3b82f6", cursor: "pointer" }}>
        <MdEdit size={18} />
      </a>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ef4444",
        }}
      >
        <MdDelete size={18} />
      </button>
    </div>
  );
}

// StatusIcon компонент
function StatusIcon({ active = true }) {
  return (
    // <div
    //   style={{
    //     width: "12px",
    //     height: "12px",
    //     borderRadius: "50%",
    //     backgroundColor: active ? "#10b981" : "#9ca3af",
    //     display: "inline-block",
    //   }}
    // />
    <>
      <FaCheckCircle size={16} color={active ? "#10b981" : "#9ca3af"} />
    </>
  );
}

// ===== ТАБЛИЦА СБОРОК И ТАКСИ =====
export function CollectionsTable() {
  const data = [
    {
      id: 1,
      service: "Авиа",
      type: "1",
      value: "5",
      rate: "800",
      currency: "KGS",
      comment: "сервисный сбор",
      active: true,
    },
    {
      id: 2,
      service: "Отель",
      type: "финс",
      value: "1 000",
      rate: "—",
      currency: "KGS",
      comment: "финс. комиссия",
      active: true,
    },
    {
      id: 3,
      service: "Виза",
      type: "К",
      value: "0",
      rate: "—",
      currency: "KGS",
      comment: "визовая комиссия",
      active: true,
    },
    {
      id: 4,
      service: "Трансфер",
      type: "финс",
      value: "500",
      rate: "—",
      currency: "KGS",
      comment: "логистика",
      active: true,
    },
  ];

  const columns = [
    { key: "service", label: "Услуга" },
    { key: "type", label: "Тип сбора" },
    { key: "value", label: "Значение" },
    { key: "rate", label: "Такса" },
    { key: "currency", label: "Валюта" },
    { key: "comment", label: "Комментарий" },
    {
      key: "active",
      label: "Действие",
      render: () => <ActionButtons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА БАНКОВСКИХ РЕКВИЗИТОВ =====
export function BankDetailsTable() {
  const data = [
    {
      id: 1,
      bank: "Демир Банк",
      account: "4070281030001",
      currency: "KGS",
      comment: "основной",
      active: true,
    },
    {
      id: 2,
      bank: "БТА Банк",
      account: "4070281061222",
      currency: "USD",
      comment: "международные платежи",
      active: false,
    },
  ];

  const columns = [
    { key: "bank", label: "Банк" },
    { key: "account", label: "Расчётный счёт" },
    { key: "currency", label: "Валюта" },
    { key: "comment", label: "Комментарий" },
    {
      key: "active",
      label: "Активный",
      render: (value) => <StatusIcon active={value} />,
    },
    {
      key: "id",
      label: "Действия",
      render: () => <ActionButtons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА ФИЛИАЛОВ =====
export function BranchesTable() {
  const data = [
    {
      id: 1,
      name: "ПСЦ Тур Бишкек",
      city: "Бишкек",
      address: "5",
      phone: "+996 700 555 444",
      manager: "Азгарим Т.",
      employees: "10",
    },
    {
      id: 2,
      name: "ПСЦ Тур Казахстан",
      city: "Алматы",
      address: "1000",
      phone: "+996 707 222 888",
      manager: "Айбек К.",
      employees: "45",
    },
  ];

  const columns = [
    { key: "name", label: "Название филиала" },
    { key: "city", label: "Город / Регион" },
    { key: "address", label: "Адрес" },
    { key: "phone", label: "Телефон" },
    { key: "manager", label: "Руководитель" },
    { key: "employees", label: "Кол-во сотрудников" },
    {
      key: "id",
      label: "Действия",
      render: () => <ActionButtons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА КАНАЛОВ СВЯЗЕЙ =====
export function CommunicationChannelsTable() {
  const data = [
    {
      id: 1,
      type: "Telegram",
      identifier: "@psctour_bot",
      responsible: "Азгарим",
      description: "бот для заявок",
      active: true,
    },
    {
      id: 2,
      type: "WhatsApp",
      identifier: "+996 700 111 222",
      responsible: "Азамат",
      description: "чат с клиентами",
      active: true,
    },
    {
      id: 3,
      type: "Email",
      identifier: "booking@psctour.kg",
      responsible: "Руслан",
      description: "документы и счета",
      active: true,
    },
    {
      id: 4,
      type: "Веб-форма",
      identifier: "crm.psctour.kg/form",
      responsible: "CRM",
      description: "заявки с сайта",
      active: true,
    },
  ];

  const columns = [
    { key: "type", label: "Тип канала" },
    { key: "identifier", label: "Идентификатор" },
    { key: "responsible", label: "Ответственный" },
    { key: "description", label: "Примечание" },
    {
      key: "active",
      label: "Активен",
      render: (value) => <StatusIcon active={value} />,
    },
    {
      key: "id",
      label: "Действия",
      render: () => <ActionButtons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА ИСТОРИИ ЗАКАЗОВ =====
export function OrdersHistoryTable() {
  const data = [
    {
      id: "#ORD-2357",
      service: "Авиа + Отель",
      sum: "141 700 KGS",
      status: "В работе",
      paid: "Частичный",
      date: "25.10.25",
    },
    {
      id: "#ORD-2210",
      service: "Виза",
      sum: "4,200 KGS",
      status: "Завершен",
      paid: "Оплачен",
      date: "12.09.25",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "№",
      render: (value) => (
        <span style={{ color: "#3b82f6", fontWeight: "600" }}>{value}</span>
      ),
    },
    { key: "service", label: "Услуга" },
    { key: "sum", label: "Сумма" },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const statusColors = {
          "В работе": "yellow",
          Завершен: "green",
          Отменен: "red",
        };
        return <Badge text={value} color={statusColors[value] || "blue"} />;
      },
    },
    {
      key: "paid",
      label: "Оплата",
      render: (value) => {
        const paidColors = {
          Оплачен: "green",
          Частичный: "orange",
          "Не оплачен": "red",
        };
        return <Badge text={value} color={paidColors[value] || "blue"} />;
      },
    },
    { key: "date", label: "Дата" },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА СОТРУДНИКОВ ОРГАНИЗАЦИИ =====
export function EmployeesTable() {
  const data = [
    {
      id: 1,
      name: "Азгарим Турсунбаева",
      position: "Менеджер",
      phone: "+996 555 555 123",
      email: "agerini@psctour.kg",
      active: true,
    },
    {
      id: 2,
      name: "Руслан Азаматов",
      position: "Бухгалтер",
      phone: "+996 700 444 888",
      email: "ruslan@psctour.kg",
      active: true,
    },
  ];

  const columns = [
    { key: "name", label: "ФИО" },
    { key: "position", label: "Должность" },
    { key: "phone", label: "Телефон" },
    { key: "email", label: "Email" },
    {
      key: "active",
      label: "Активен",
      render: (value) => <StatusIcon active={value} />,
    },
    {
      key: "id",
      label: "Действия",
      render: () => <ActionButtons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

/////////////////

// DocumentLink компонент
function DocumentLink({ value, isLink = true }) {
  return isLink ? (
    <Link
      href="#"
      style={{ color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}
    >
      {value}
    </Link>
  ) : (
    <span style={{ color: "#3b82f6", fontWeight: "600" }}>{value}</span>
  );
}

// ActionIcons компонент
function ActionIcons() {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Link href="#" style={{ color: "#3b82f6", cursor: "pointer" }}>
        <IoEyeSharp size={18} />
      </Link>
      <Link href="#" style={{ color: "#16A34A", cursor: "pointer" }}>
        <LuForward size={18} />
      </Link>
    </div>
  );
}

// ===== ТАБЛИЦА ЮРИДИЧЕСКИХ ДОКУМЕНТОВ ОРГАНИЗАЦИИ =====
export function LegalDocumentsTable() {
  const data = [
    {
      id: "DOC-0123",
      type: "Договор",
      order: "ORD-125",
      date: "10.10.25",
      validity: "бессрочно",
      status: "Подписан",
      sent: "Дидюк",
    },
    {
      id: "ACT-0154",
      type: "Тарифы",
      order: "ORD-126",
      date: "11.10.25",
      validity: "бессрочно",
      status: "Утверждены",
      sent: "Дидюк",
    },
  ];

  const columns = [
    { key: "id", label: "№" },
    { key: "type", label: "Тип" },
    {
      key: "order",
      label: "Заказ",
      render: (value) => <DocumentLink value={value} isLink={true} />,
    },
    { key: "date", label: "Дата" },
    { key: "validity", label: "Срок действия" },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const statusColors = {
          Подписан: "green",
          Утверждены: "cyan",
          "На подпись": "yellow",
          Отклонен: "red",
        };
        return <Badge text={value} color={statusColors[value] || "blue"} />;
      },
    },
    { key: "sent", label: "Отправлено в" },
    {
      key: "actions",
      label: "Действия",
      render: () => <ActionIcons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}
export function TransactionsTable({ onRowClick }) {
  const transactionsData = [
    {
      id: "PAY-2025-101",
      orderId: "#ORD-145",
      client: "Фио клиента",
      organization: "Asia Travel",
      operationType: "Оплата",
      sum: "54,000 RUB",
      status: "Оплачено",
      statusColor: "green",
      date: "23.10.2025",
      paymentMethod: "Банковская карта",
      currency: "RUB",
      commission: "1500",
      exchangeRate: "1 USD = 89.5 KGS",
    },
    {
      id: "PAY-2025-102",
      orderId: "#ORD-145",
      client: "Фио клиента",
      organization: "Asia Travel",
      operationType: "Задолженность",
      sum: "34,450 RUB",
      status: "Просрочено",
      statusColor: "pink",
      date: "22.10.2025",
      paymentMethod: "Кредит",
      currency: "RUB",
      commission: "1200",
      exchangeRate: "1 USD = 89.5 KGS",
    },
    {
      id: "PAY-2025-103",
      orderId: "#ORD-145",
      client: "Фио клиента",
      organization: "Asia Travel",
      operationType: "Оплата",
      sum: "12,500 RUB",
      status: "Возврат",
      statusColor: "orange",
      date: "21.10.2025",
      paymentMethod: "Банковская карта",
      currency: "RUB",
      commission: "500",
      exchangeRate: "1 USD = 89.5 KGS",
    },
    {
      id: "PAY-2025-104",
      orderId: "#ORD-145",
      client: "Фио клиента",
      organization: "Asia Travel",
      operationType: "Оплата",
      sum: "12,500 RUB",
      status: "Частично",
      statusColor: "purple",
      date: "20.10.2025",
      paymentMethod: "Банковская карта",
      currency: "RUB",
      commission: "500",
      exchangeRate: "1 USD = 89.5 KGS",
    },
  ];

  const columns = [
    {
      key: "orderId",
      label: "ID Заказа",
      render: (value) => <span>{value}</span>,
    },
    { key: "client", label: "Клиент" },
    { key: "organization", label: "Организация" },
    { key: "operationType", label: "Тип операции" },
    {
      key: "sum",
      label: "Сумма",
      render: (value) => <span style={{ fontWeight: "600" }}>{value}</span>,
    },
    {
      key: "status",
      label: "Статус",
      render: (value, row) => <Badge text={value} color={row.statusColor} />,
    },
  ];

  return (
    <UITable
      columns={columns}
      rows={transactionsData}
      showCheckbox={true}
      onRowClick={(row) => onRowClick?.(row)}
    />
  );
}
// ===== ТАБЛИЦА ДОКУМЕНТОВ =====
export function DocumentsTable() {
  const data = [
    {
      id: "DOC-0123",
      type: "Счет",
      order: "ORD-125",
      date: "10.10.25",
      sum: "52 000 ₽",
      status: "Оплачен",
      sent: "1С",
    },
    {
      id: "ACT-0154",
      type: "Акт",
      order: "ORD-126",
      date: "11.10.25",
      sum: "52 000 ₽",
      status: "Утверждён",
      sent: "Яндекс",
    },
  ];

  const columns = [
    { key: "id", label: "№" },
    { key: "type", label: "Тип" },
    {
      key: "order",
      label: "Заказ",
      render: (value) => <DocumentLink value={value} isLink={true} />,
    },
    { key: "date", label: "Дата" },
    { key: "sum", label: "Сумма" },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const statusColors = {
          Оплачен: "green",
          Утверждён: "cyan",
          Ожидает: "yellow",
          Отклонен: "red",
          Проверяется: "blue",
        };
        return <Badge text={value} color={statusColors[value] || "blue"} />;
      },
    },
    { key: "sent", label: "Отправлено в" },
    {
      key: "actions",
      label: "Действия",
      render: () => <ActionIcons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА ДОГОВОРОВ =====
export function ContractsTable() {
  const data = [
    {
      id: "CNT-0001",
      type: "Договор поставки",
      partner: "Asia Travel",
      date: "01.09.25",
      validity: "01.09.25 - 31.08.26",
      status: "Действует",
      responsible: "Азгарим Т.",
    },
    {
      id: "CNT-0002",
      type: "Договор услуг",
      partner: "Best Hotels",
      date: "15.08.25",
      validity: "15.08.25 - 14.08.26",
      status: "Действует",
      responsible: "Азамат А.",
    },
    {
      id: "CNT-0003",
      type: "Договор комиссии",
      partner: "Travel Pro",
      date: "10.10.25",
      validity: "10.10.25 - 30.11.25",
      status: "Истекает",
      responsible: "Руслан Р.",
    },
  ];

  const columns = [
    { key: "id", label: "№" },
    { key: "type", label: "Тип" },
    { key: "partner", label: "Партнер" },
    { key: "date", label: "Дата подписания" },
    { key: "validity", label: "Срок действия" },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const statusColors = {
          Действует: "green",
          Истекает: "yellow",
          Истек: "red",
          "На подпись": "blue",
        };
        return <Badge text={value} color={statusColors[value] || "blue"} />;
      },
    },
    { key: "responsible", label: "Ответственный" },
    {
      key: "actions",
      label: "Действия",
      render: () => <ActionIcons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА СЧЕТОВ-ФАКТУР =====
export function InvoicesTable() {
  const data = [
    {
      id: "INV-0001",
      number: "001",
      type: "Счет-фактура",
      order: "ORD-125",
      date: "10.10.25",
      sum: "52 000 ₽",
      paid: "Оплачен",
      dueDate: "20.10.25",
    },
    {
      id: "INV-0002",
      number: "002",
      type: "Счет-фактура",
      order: "ORD-126",
      date: "11.10.25",
      sum: "32 500 ₽",
      paid: "Ожидает",
      dueDate: "25.10.25",
    },
    {
      id: "INV-0003",
      number: "003",
      type: "Счет-фактура",
      order: "ORD-127",
      date: "12.10.25",
      sum: "18 000 ₽",
      paid: "Частичный",
      dueDate: "30.10.25",
    },
  ];

  const columns = [
    { key: "id", label: "№" },
    { key: "number", label: "Номер" },
    { key: "type", label: "Тип" },
    {
      key: "order",
      label: "Заказ",
      render: (value) => <DocumentLink value={value} isLink={true} />,
    },
    { key: "date", label: "Дата" },
    { key: "sum", label: "Сумма" },
    {
      key: "paid",
      label: "Статус оплаты",
      render: (value) => {
        const paidColors = {
          Оплачен: "green",
          Ожидает: "yellow",
          Частичный: "orange",
          "Не оплачен": "red",
        };
        return <Badge text={value} color={paidColors[value] || "blue"} />;
      },
    },
    { key: "dueDate", label: "Срок оплаты" },
    {
      key: "actions",
      label: "Действия",
      render: () => <ActionIcons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}

// ===== ТАБЛИЦА АКТОВ =====
export function ActsTable() {
  const data = [
    {
      id: "ACT-0001",
      number: "001",
      type: "Акт выполненных работ",
      order: "ORD-125",
      date: "10.10.25",
      sum: "52 000 ₽",
      status: "Подписан",
      sent: "1С",
    },
    {
      id: "ACT-0002",
      number: "002",
      type: "Акт сверки",
      order: "ORD-126",
      date: "11.10.25",
      sum: "32 500 ₽",
      status: "На подпись",
      sent: "Email",
    },
  ];

  const columns = [
    { key: "id", label: "№" },
    { key: "number", label: "Номер" },
    { key: "type", label: "Тип" },
    {
      key: "order",
      label: "Заказ",
      render: (value) => <DocumentLink value={value} isLink={true} />,
    },
    { key: "date", label: "Дата" },
    { key: "sum", label: "Сумма" },
    {
      key: "status",
      label: "Статус",
      render: (value) => {
        const statusColors = {
          Подписан: "green",
          "На подпись": "yellow",
          Отклонен: "red",
          Утверждён: "cyan",
        };
        return <Badge text={value} color={statusColors[value] || "blue"} />;
      },
    },
    { key: "sent", label: "Отправлено в" },
    {
      key: "actions",
      label: "Действия",
      render: () => <ActionIcons />,
    },
  ];

  return <UITable columns={columns} rows={data} showCheckbox={false} />;
}
