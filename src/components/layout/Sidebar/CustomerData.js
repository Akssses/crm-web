import { 
  MdDashboard, 
  MdAssignment, 
  MdShoppingCart, 
  MdPeople, 
  MdPayment, 
  MdAccountBalance,
  MdDescription, 
  MdNotifications, 
  MdChat 
} from "react-icons/md";

export const customerMenuItems = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: MdDashboard,
    href: "/customer/dashboard",
  },
  {
    id: "requests",
    label: "Заявки",
    icon: MdAssignment,
    href: "/customer/requests",
  },
  {
    id: "orders",
    label: "Заказы",
    icon: MdShoppingCart,
    href: "/customer/orders",
  },
  {
    id: "employees",
    label: "Сотрудники",
    icon: MdPeople,
    href: "/customer/employees",
  },
  {
    id: "payments",
    label: "Оплаты",
    icon: MdPayment,
    href: "/customer/payments",
  },
  {
    id: "balance",
    label: "Баланс",
    icon: MdAccountBalance,
    href: "/customer/balance",
  },
  {
    id: "documents",
    label: "Документы",
    icon: MdDescription,
    href: "/customer/documents",
  },
  {
    id: "notifications",
    label: "Уведомления",
    icon: MdNotifications,
    href: "/customer/notifications",
  },
  {
    id: "chat",
    label: "Чат",
    icon: MdChat,
    href: "/customer/chat",
  },
];

