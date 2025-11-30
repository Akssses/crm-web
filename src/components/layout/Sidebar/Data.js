import { 
  MdDashboard, 
  MdBusiness, 
  MdPeople, 
  MdStorefront, 
  MdDescription, 
  MdAttachMoney, 
  MdBarChart, 
  MdBook, 
  MdSettingsInputComponent, 
  MdChat 
} from "react-icons/md";

export const menuItems = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: MdDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "organizations",
    label: "Организации",
    icon: MdBusiness,
    href: "/admin/organizations",
  },
  {
    id: "users",
    label: "Пользователи и роли",
    icon: MdPeople,
    href: "/admin/users",
  },
  {
    id: "suppliers",
    label: "Поставщики",
    icon: MdStorefront,
    href: "/admin/suppliers",
  },
  {
    id: "documents",
    label: "Документы",
    icon: MdDescription,
    href: "/admin/documents",
  },
  {
    id: "finance",
    label: "Финансы",
    icon: MdAttachMoney,
    href: "/admin/finance",
  },
  {
    id: "analytics",
    label: "Отчёты и аналитика",
    icon: MdBarChart,
    href: "/admin/reports",
  },
  {
    id: "handbook",
    label: "Справочник",
    icon: MdBook,
    href: "/admin/directory",
  },
  {
    id: "integration",
    label: "CMS Интеграции",
    icon: MdSettingsInputComponent,
    href: "/admin/integrations",
  },
  {
    id: "communication-channels",
    label: "Каналы связи",
    icon: MdChat,
    href: "/admin/communication-channels",
  },
];

