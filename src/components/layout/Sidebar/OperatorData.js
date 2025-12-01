import { BiSolidDashboard } from "react-icons/bi";
import {
  MdDashboard,
  MdAssignment,
  MdShoppingCart,
  MdPeople,
  MdMiscellaneousServices,
  MdDescription,
  MdAttachMoney,
  MdNotifications,
  MdChat,
} from "react-icons/md";

export const operatorMenuItems = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: BiSolidDashboard,
    href: "/operator/dashboard",
  },
  {
    id: "requests",
    label: "Заявки",
    icon: MdAssignment,
    href: "/operator/requests",
  },
  {
    id: "orders",
    label: "Заказы",
    icon: MdShoppingCart,
    href: "/operator/orders",
  },
  {
    id: "clients",
    label: "Клиенты",
    icon: MdPeople,
    href: "/operator/clients",
  },
  {
    id: "services",
    label: "Услуги",
    icon: MdMiscellaneousServices,
    href: "/operator/services",
  },
  {
    id: "documents",
    label: "Документы",
    icon: MdDescription,
    href: "/operator/documents",
  },
  {
    id: "finance",
    label: "Финансы",
    icon: MdAttachMoney,
    href: "/operator/finance",
  },
  {
    id: "notifications",
    label: "Уведомления",
    icon: MdNotifications,
    href: "/operator/notifications",
  },
  {
    id: "chat",
    label: "Чат",
    icon: MdChat,
    href: "/operator/chat",
  },
];
