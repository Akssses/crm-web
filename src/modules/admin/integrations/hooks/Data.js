import { IoDocumentText, IoSearchOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { MdCheckCircle, MdError, MdWarning } from "react-icons/md";
import { FaCalculator, FaPlus, FaShieldAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuFilePenLine } from "react-icons/lu";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { BsBank2 } from "react-icons/bs";

export const services = [
  {
    icon: IoDocumentText,
    iconColor: "#DC2626",
    bgColor: "#FEE2E2",
    title: "1С",
    code: "1C v8.3 FTP",
    status: "Активен",
    statusColor: "green",
    fields: [
      { label: "Endpoint", value: "iq-1c.local:v1" },
      { label: "Последняя выгрузка", value: "14:28" },
      { label: "Ошибок", value: "0" },
    ],
  },
  {
    icon: FaCalculator,
    iconColor: "#2563EB",
    bgColor: "#DBEAFE",
    title: "Эльба",
    code: "Илько ООО",
    status: "Активен",
    statusColor: "green",
    fields: [
      { label: "Статус", value: "Подключено" },
      { label: "Ошибки интеграции", value: "2" },
    ],
  },
  {
    icon: LuFilePenLine,
    iconColor: "#9333EA",
    bgColor: "#F3E8FF",
    title: "Диадок",
    code: "ООО",
    status: "Активен",
    statusColor: "green",
    fields: [
      { label: "Отправлено за месяц", value: "247" },
      { label: "Подписки клиентов", value: "189" },
      { label: "Ошибки", value: "1" },
    ],
  },
  {
    icon: FaShieldAlt,
    iconColor: "#4F46E5",
    bgColor: "#E0E7FF",
    title: "ЭЦП проверяемы",
    code: "КремлиБро ООС",
    status: "Истекает",
    statusColor: "yellow",
    fields: [
      { label: "Хранение ключей", value: "Защищено" },
      { label: "Статус ключей", value: "Активен" },
      { label: "Дата истечения", value: "12.12.2024" },
    ],
  },
  {
    icon: BiSolidSpreadsheet,
    iconColor: "#DC2626",
    bgColor: "#FEE2E2",
    title: "ОФД",
    code: "Оператор ФД",
    status: "Активен",
    statusColor: "green",
    fields: [
      { label: "URL", value: "" },
      { label: "Статус отправки чеков", value: "Норме" },
      { label: "Чеков за сутки", value: "1,243" },
    ],
  },
  {
    icon: BsBank2,
    iconColor: "#DC2626",
    bgColor: "#FEE2E2",
    title: "НПД / ФНС",
    code: "АП ФНС",
    status: "Выключено",
    statusColor: "red",
    fields: [
      { label: "API статус", value: "Не поддерживаны" },
      { label: "Лимиты", value: "" },
      { label: "Ошибки передачи", value: "" },
    ],
  },
];

export const scenarios = [
  {
    title: "Выставление счета → отправка в бухгалтерию",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
  {
    title: "Формирование PDF документов",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
  {
    title: "Подписание ЭЦП (одной или двух сторон)",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Требует настройки",
    statusColor: "yellow",
  },
  {
    title: "Передача актов / УПД",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
  {
    title: "Импорт статуса оплаты",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
  {
    title: "Отправка чеков ОФД",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
  {
    title: "Передача данных по НПД",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Выключено",
    statusColor: "red",
  },
  {
    title: "Ежедневная сверка",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
  {
    title: "Хранение электронных оригиналов",
    icon: IoDocumentText,
    color: "#2563EB",
    status: "Работает",
    statusColor: "green",
  },
];
