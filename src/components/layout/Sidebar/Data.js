import { CiHome, CiBank, CiUser, CiCalendar, CiBookmark } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { BiBarChartSquare } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi2";
import { TbDownload } from "react-icons/tb";

export const menuItems = [
  { id: "dashboard", label: "Дашборд", icon: CiHome, href: "#" },
  { id: "organizations", label: "Организации", icon: CiBank, href: "#" },
  { id: "users", label: "Пользователи и роли", icon: CiUser, href: "#" },
  { id: "suppliers", label: "Поставщики", icon: HiOutlineUsers, href: "#" },
  { id: "documents", label: "Документы", icon: CiCalendar, href: "#" },
  { id: "finance", label: "Финансы", icon: BiBarChartSquare, href: "#" },
  {
    id: "analytics",
    label: "Отчёты и аналитика",
    icon: HiOutlineChartBar,
    href: "#",
  },
  { id: "handbook", label: "Справочник", icon: CiBookmark, href: "#" },
  {
    id: "integration",
    label: "CMS Интеграции",
    icon: TbDownload,
    href: "#",
  },
];
