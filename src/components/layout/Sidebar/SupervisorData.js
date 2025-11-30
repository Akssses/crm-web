import { 
  MdDashboard, 
  MdAssignment, 
  MdShoppingCart, 
  MdPeople, 
  MdBarChart, 
  MdNotifications 
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
];



