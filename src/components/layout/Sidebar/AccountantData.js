import {
  MdDashboard,
  MdDescription,
  MdPayment,
  MdAssignmentReturn,
  MdPeople,
} from "react-icons/md";

export const accountantMenuItems = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: MdDashboard,
    href: "/accountant",
  },
  {
    id: "documents",
    label: "Документы",
    icon: MdDescription,
    href: "/accountant/document",
  },
  {
    id: "payments",
    label: "Платежи",
    icon: MdPayment,
    href: "/accountant/payments",
  },
  {
    id: "returns",
    label: "Возвраты",
    icon: MdAssignmentReturn,
    href: "/accountant/refunds",
  },
  {
    id: "employees",
    label: "Операторы",
    icon: MdPeople,
    href: "/accountant/employees",
  },
];
