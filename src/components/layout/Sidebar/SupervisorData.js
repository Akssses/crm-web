import {
  MdDashboard,
  MdAssignment,
  MdShoppingCart,
  MdPeople,
  MdBarChart,
  MdNotifications,
  MdAutoMode,
  MdStorefront,
  MdHistory,
  MdChat,
} from "react-icons/md";

export const supervisorMenuItems = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: MdDashboard,
    href: "/supervisor/dashboard",
  },
  {
    id: "requests",
    label: "Заявки",
    icon: MdAssignment,
    href: "/supervisor/requests",
  },
  {
    id: "orders",
    label: "Заказы",
    icon: MdShoppingCart,
    href: "/supervisor/orders",
  },
  {
    id: "operators",
    label: "Операторы",
    icon: MdPeople,
    href: "/supervisor/operators",
  },
  {
    id: "suppliers",
    label: "Поставщики",
    icon: MdStorefront,
    href: "/supervisor/suppliers",
  },
  {
    id: "analytics",
    label: "Аналитика",
    icon: MdBarChart,
    href: "/supervisor/analytics",
  },
  {
    id: "notifications",
    label: "Уведомления",
    icon: MdNotifications,
    href: "/supervisor/notifications",
  },
  {
    id: "activity-log",
    label: "История действий",
    icon: MdHistory,
    href: "/supervisor/activity-log",
  },
  {
    id: "auto-routing",
    label: "Авто-распределение",
    icon: MdAutoMode,
    href: "/supervisor/auto-routing",
  },
  {
    id: "chat",
    label: "Чат",
    icon: MdChat,
    href: "/supervisor/chat",
  },
];



