import {
  MdAccessTime,
  MdAttachMoney,
  MdCheckCircle,
  MdEmail,
  MdError,
  MdFolder,
  MdFlight,
  MdInfo,
  MdInventory,
  MdOutlineAssessment,
  MdOutlineLock,
  MdOutlinePeople,
  MdOutlineQuestionAnswer,
  MdOutlineSupport,
  MdPeople,
  MdWarning,
  MdWifiOff,
} from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

export const CHAT_ROLES = {
  OPERATOR: "operator",
  SUPERVISOR: "supervisor",
  ADMIN: "admin",
  CUSTOMER: "customer",
  ACCOUNTANT: "accountant",
};

export const MESSAGE_CHANNELS = {
  CLIENT: "client",
  SUPPLIER: "supplier",
  INTERNAL: "internal",
  SYSTEM: "system",
  FINANCIAL: "financial",
};

export const channelMeta = {
  [MESSAGE_CHANNELS.CLIENT]: {
    id: MESSAGE_CHANNELS.CLIENT,
    label: "Клиент",
    placeholder: "Написать сообщение клиенту...",
  },
  [MESSAGE_CHANNELS.SUPPLIER]: {
    id: MESSAGE_CHANNELS.SUPPLIER,
    label: "Поставщик",
    placeholder: "Написать поставщику...",
  },
  [MESSAGE_CHANNELS.INTERNAL]: {
    id: MESSAGE_CHANNELS.INTERNAL,
    label: "Внутреннее",
    placeholder: "Внутренний комментарий...",
  },
  [MESSAGE_CHANNELS.SYSTEM]: {
    id: MESSAGE_CHANNELS.SYSTEM,
    label: "Система",
    placeholder: "Системные уведомления",
  },
  [MESSAGE_CHANNELS.FINANCIAL]: {
    id: MESSAGE_CHANNELS.FINANCIAL,
    label: "Финансы",
    placeholder: "Сообщение в бухгалтерию...",
  },
};

const baseChats = [
  {
    id: "ORD-145",
    clientName: "Иван Петров",
    location: "Турция, Анталья",
    message: "Нужно изменить дату вылета",
    messageIcon: MdEmail,
    time: "14:33",
    status: "Просрочено",
    statusColor: "red",
    sla: "-24ч",
    slaColor: "red",
    unread: 3,
    tags: ["SLA", "Эскалация"],
  },
  {
    id: "ORD-144",
    clientName: "Мария Сидорова",
    location: "Италия, Рим",
    message: "КП отправлено клиенту",
    messageIcon: MdFolder,
    time: "13:07",
    status: "В работе",
    statusColor: "yellow",
    sla: "В срок",
    slaColor: "green",
    unread: 0,
  },
  {
    id: "ORD-143",
    clientName: "Алексей Козлов",
    location: "Египет, Хургада",
    message: "Подтверждение брони получено",
    messageIcon: MdCheckCircle,
    time: "12:45",
    status: "В срок",
    statusColor: "green",
    sla: "В срок",
    slaColor: "green",
    unread: 1,
  },
  {
    id: "ORD-142",
    clientName: "Елена Васильева",
    location: "Греция, Крит",
    message: "Добрый день! Хочу уточнить по туру...",
    messageIcon: MdOutlineQuestionAnswer,
    time: "11:28",
    status: "Новое",
    statusColor: "blue",
    sla: "+4ч",
    slaColor: "yellow",
    unread: 2,
  },
  {
    id: "ORD-141",
    clientName: "Дмитрий Смирнов",
    location: "Таиланд, Пхукет",
    message: "Нет связи",
    messageIcon: MdWifiOff,
    time: "10:15",
    status: "Нет связи",
    statusColor: "orange",
    sla: "+8ч",
    slaColor: "orange",
    unread: 0,
  },
];

const operatorConversation = {
  context: {
    clientName: "Иван Петров",
    orderId: "ORD-145",
    title: "Тур в Турцию",
    status: { label: "В работе", tone: "yellow" },
    sla: { label: "SLA +2ч", tone: "red" },
    channelSummary: "Клиент + Поставщик + Внутреннее",
  },
  messages: [
    {
      id: "m1",
      channel: MESSAGE_CHANNELS.SYSTEM,
      text: "Заявка создана оператором • 04.11.25 09:15",
      time: "09:15",
      status: "delivered",
    },
    {
      id: "m2",
      channel: MESSAGE_CHANNELS.CLIENT,
      author: "Иван Петров • клиент",
      text: "Здравствуйте! Хочу забронировать тур в Турцию...",
      time: "09:20",
      actions: ["Создать корректировку", "Ответить"],
      status: "read",
    },
    {
      id: "m3",
      channel: MESSAGE_CHANNELS.CLIENT,
      variant: "operator",
      author: "Оператор Айгерим",
      text: "Добро пожаловать! Подготовлю для вас варианты...",
      time: "09:25",
      status: "sent",
    },
    {
      id: "m4",
      channel: MESSAGE_CHANNELS.SUPPLIER,
      author: "Booking Support • поставщик",
      text: "Бронирование подтверждено. Отель Club Hotel Sera 5*...",
      time: "10:30",
      attachments: [{ name: "Voucher_ClubHotel.pdf", size: "210 KB" }],
      status: "read",
    },
    {
      id: "m5",
      channel: MESSAGE_CHANNELS.INTERNAL,
      author: "Айгерим • внутреннее",
      text: "@Марат проверь, пожалуйста, тариф на трансфер...",
      time: "11:00",
      status: "sent",
    },
  ],
  details: {
    request: {
      number: "ORD-145",
      status: { label: "В работе", tone: "yellow" },
      owner: "А Айгерим",
      sla: { label: "Просрочено на 2ч", tone: "red" },
    },
    client: {
      name: "Иван Петров",
      type: "Постоянный клиент",
      contacts: [
        { label: "Телефон", value: "+996 700 123 456" },
        { label: "Email", value: "ivan@example.com" },
        { label: "Telegram", value: "@ivan_petrov" },
      ],
    },
    service: [
      { label: "Направление", value: "Турция, Анталья" },
      { label: "Даты", value: "15-25 мая 2025" },
      { label: "Туристы", value: "2 взрослых" },
      { label: "Отель", value: "Club Hotel Sera 5*" },
      { label: "Стоимость", value: "$2,450" },
    ],
    files: [
      { name: "Паспорт_Иван.pdf", size: "124 KB" },
      { name: "Ваучер_отель.pdf", size: "89 KB" },
    ],
    actions: [
      {
        id: "adjustment",
        label: "Создать корректировку",
        icon: MdOutlineAssessment,
        variant: "primary",
      },
      {
        id: "confirm",
        label: "Подтвердить заказ",
        icon: MdCheckCircle,
        variant: "success",
      },
      {
        id: "remind",
        label: "Напомнить клиенту",
        icon: MdInfo,
        variant: "yellow",
      },
    ],
  },
};

const supervisorConversation = {
  context: {
    clientName: "Team • наблюдение",
    orderId: "ORD-145",
    title: "Обзор чатов операторов",
    status: { label: "Мониторинг", tone: "blue" },
    sla: { label: "5 проблем", tone: "red" },
    channelSummary: "Видит все каналы • пишет только внутренние",
  },
  messages: [
    operatorConversation.messages[0],
    operatorConversation.messages[1],
    {
      id: "sup1",
      channel: MESSAGE_CHANNELS.INTERNAL,
      author: "Супервизор Аман",
      text: "Коллеги, подключаюсь — проверяю SLA и переназначу при необходимости.",
      time: "10:40",
      status: "read",
    },
    {
      id: "sup2",
      channel: MESSAGE_CHANNELS.SYSTEM,
      text: "SLA просрочено 02:15. Требуется реакция супервизора.",
      time: "10:41",
      status: "delivered",
    },
  ],
  details: {
    request: {
      number: "ORD-145",
      status: { label: "Нужна поддержка", tone: "yellow" },
      owner: "А Айгерим",
      sla: { label: "SLA +2ч", tone: "red" },
    },
    client: operatorConversation.details.client,
    service: operatorConversation.details.service,
    files: operatorConversation.details.files,
    actions: [
      {
        id: "assign",
        label: "Назначить оператора",
        icon: MdPeople,
        variant: "primary",
      },
      {
        id: "escalate",
        label: "Эскалировать в администратора",
        icon: MdOutlineSupport,
        variant: "yellow",
      },
    ],
  },
};

const adminConversation = {
  context: {
    clientName: "Админ • аудит",
    orderId: "ORD-145",
    title: "Аудит коммуникаций",
    status: { label: "Режим аудита", tone: "gray" },
    sla: { label: "Доступно всё", tone: "blue" },
    channelSummary: "Полные логи, только чтение",
  },
  messages: [
    operatorConversation.messages[0],
    operatorConversation.messages[1],
    operatorConversation.messages[2],
    operatorConversation.messages[3],
    {
      id: "adm1",
      channel: MESSAGE_CHANNELS.SYSTEM,
      text: "API • Ошибка доставки письма клиенту. Код 503.",
      time: "10:32",
      status: "error",
    },
    {
      id: "adm2",
      channel: MESSAGE_CHANNELS.INTERNAL,
      author: "Админ • журнал",
      text: "Журнал: оператор приложил документ • Паспорт_Иван.pdf",
      time: "10:33",
      status: "delivered",
    },
  ],
  details: {
    request: {
      number: "ORD-145",
      status: { label: "Аудит", tone: "gray" },
      owner: "А Айгерим",
      sla: { label: "Без ограничений", tone: "blue" },
    },
    client: operatorConversation.details.client,
    service: operatorConversation.details.service,
    files: operatorConversation.details.files,
    actions: [
      {
        id: "delete",
        label: "Удалить сообщение",
        icon: MdWarning,
        variant: "danger",
      },
      {
        id: "block",
        label: "Блокировать пользователя",
        icon: MdOutlineLock,
        variant: "yellow",
      },
    ],
  },
};

const customerConversation = {
  context: {
    clientName: "Иван Петров",
    orderId: "ORD-145",
    title: "Тур в Турцию",
    status: { label: "В работе", tone: "green" },
    sla: null,
    channelSummary: "Общение с оператором + системные уведомления",
  },
  messages: [
    {
      id: "cust1",
      channel: MESSAGE_CHANNELS.SYSTEM,
      text: "Оператор загрузил новый договор. Требуется подтверждение.",
      time: "09:10",
      status: "delivered",
    },
    {
      id: "cust2",
      channel: MESSAGE_CHANNELS.CLIENT,
      author: "Иван Петров",
      text: "Получил ли вы мой паспорт? нужно подтвердить даты.",
      time: "09:12",
      status: "sent",
    },
    {
      id: "cust3",
      channel: MESSAGE_CHANNELS.CLIENT,
      variant: "operator",
      author: "Оператор Айгерим",
      text: "Да, документы получили. Озвучу окончательную сумму сегодня.",
      time: "09:20",
      status: "read",
    },
  ],
  details: {
    request: {
      number: "ORD-145",
      status: { label: "Подготовка", tone: "green" },
      owner: "Ваш оператор: Айгерим",
      sla: null,
    },
    client: {
      name: "Вы",
      type: "Клиент",
      contacts: [
        { label: "Ваш менеджер", value: "Айгерим • +996 700 222 111" },
      ],
    },
    service: [
      { label: "Услуга", value: "Пакетный тур" },
      { label: "Статус документов", value: "Договор готов, ждёт подписи" },
    ],
    files: [
      { name: "Договор_v3.pdf", size: "320 KB" },
      { name: "Инструкции по вылету.pdf", size: "180 KB" },
    ],
    actions: [
      {
        id: "approve",
        label: "Подтвердить услугу",
        icon: MdCheckCircle,
        variant: "success",
      },
      {
        id: "decline",
        label: "Отменить услугу",
        icon: MdWarning,
        variant: "danger",
      },
      {
        id: "question",
        label: "Задать вопрос оператору",
        icon: MdOutlineQuestionAnswer,
        variant: "primary",
      },
    ],
  },
};

const accountantConversation = {
  context: {
    clientName: "Финансовый канал",
    orderId: "PAY-578",
    title: "Оплата по заявке ORD-145",
    status: { label: "Нужна проверка", tone: "orange" },
    sla: { label: "Оплата 4ч", tone: "yellow" },
    channelSummary: "Только финансовые события",
  },
  messages: [
    {
      id: "acc1",
      channel: MESSAGE_CHANNELS.FINANCIAL,
      author: "Оператор Айгерим",
      text: "Просьба подтвердить оплату по счёту INV-985. Клиент отправил платёж 15 минут назад.",
      time: "11:15",
      status: "delivered",
    },
    {
      id: "acc2",
      channel: MESSAGE_CHANNELS.SYSTEM,
      text: "Система: ошибка API банка. Невозможно подтвердить оплату.",
      time: "11:16",
      status: "error",
    },
    {
      id: "acc3",
      channel: MESSAGE_CHANNELS.FINANCIAL,
      author: "Бухгалтер Алина",
      text: "Платёж не найден. Запросила выписку, уточните у клиента скрин оплаты.",
      time: "11:20",
      status: "sent",
    },
  ],
  details: {
    request: {
      number: "PAY-578",
      status: { label: "Ожидает оплату", tone: "orange" },
      owner: "Бухгалтер Алина",
      sla: { label: "Ответ до 1ч", tone: "yellow" },
    },
    finance: [
      { label: "Счёт", value: "INV-985" },
      { label: "Сумма", value: "$2,450" },
      { label: "Оплата", value: "Ожидает подтверждения" },
      { label: "Задолженность", value: "$150" },
    ],
    files: [
      { name: "Invoice_INV-985.pdf", size: "240 KB" },
      { name: "Refund_policy.pdf", size: "90 KB" },
    ],
    actions: [
      {
        id: "markPaid",
        label: "Отметить как оплачено",
        icon: MdAttachMoney,
        variant: "success",
      },
      {
        id: "markError",
        label: "Ошибка платежа",
        icon: MdError,
        variant: "danger",
      },
      {
        id: "requestDoc",
        label: "Запросить документ",
        icon: MdInventory,
        variant: "yellow",
      },
    ],
  },
};

export const roleConfigs = {
  [CHAT_ROLES.OPERATOR]: {
    label: "Оператор",
    sidebar: {
      title: "Заявки",
      tabs: [
        { id: "all", label: "Все" },
        { id: "unread", label: "Непрочитанные", badge: 4 },
        { id: "sla", label: "SLA", badge: 3 },
        { id: "my", label: "Мои" },
        { id: "archive", label: "Архив" },
      ],
      filters: [],
      searchPlaceholder: "Поиск по номеру, клиенту...",
      chats: baseChats,
      canCreateChat: true,
    },
    conversation: {
      ...operatorConversation,
      messageTypes: [
        channelMeta[MESSAGE_CHANNELS.CLIENT],
        channelMeta[MESSAGE_CHANNELS.SUPPLIER],
        channelMeta[MESSAGE_CHANNELS.INTERNAL],
      ],
      visibleChannels: [
        MESSAGE_CHANNELS.CLIENT,
        MESSAGE_CHANNELS.SUPPLIER,
        MESSAGE_CHANNELS.INTERNAL,
        MESSAGE_CHANNELS.SYSTEM,
      ],
      headerActions: [],
    },
    permissions: {
      canSend: true,
      canUploadFiles: true,
      canCreateAdjustment: true,
      canEscalate: true,
      canAssign: true,
      canDeleteMessages: false,
    },
    details: operatorConversation.details,
    meta: {
      dateLabel: "Выбери период",
      dateValue: "Feb 28, 2024",
      dateIcon: CiCalendar,
    },
  },
  [CHAT_ROLES.SUPERVISOR]: {
    label: "Супервизор",
    sidebar: {
      title: "Мониторинг чатов",
      tabs: [
        { id: "all", label: "Все" },
        { id: "operators", label: "Операторы" },
        { id: "escalations", label: "Эскалации", badge: 2 },
      ],
      filters: [
        { id: "problems", label: "Проблемные" },
        { id: "slaOverdue", label: "SLA просрочено" },
        { id: "noConnection", label: "Нет связи" },
        { id: "apiErrors", label: "Ошибки API" },
        { id: "escalated", label: "Эскалации" },
        { id: "noOwner", label: "Без оператора" },
      ],
      searchPlaceholder: "Поиск по оператору или статусу...",
      chats: baseChats.map((chat, idx) =>
        idx === 0
          ? { ...chat, handler: "Айгерим • в работе" }
          : { ...chat, handler: "Автоназначение" }
      ),
      canCreateChat: false,
    },
    conversation: {
      ...supervisorConversation,
      messageTypes: [channelMeta[MESSAGE_CHANNELS.INTERNAL]],
      visibleChannels: [
        MESSAGE_CHANNELS.CLIENT,
        MESSAGE_CHANNELS.SUPPLIER,
        MESSAGE_CHANNELS.INTERNAL,
        MESSAGE_CHANNELS.SYSTEM,
      ],
      headerActions: [
        { id: "assign", label: "Назначить", icon: MdOutlinePeople },
        { id: "escalate", label: "Эскалировать", icon: MdOutlineSupport },
      ],
    },
    permissions: {
      canSend: true,
      canUploadFiles: false,
      note: "Супервизор может оставлять только внутренние комментарии.",
      canCreateAdjustment: false,
      canEscalate: true,
      canAssign: true,
    },
    details: supervisorConversation.details,
    meta: {
      dateLabel: "Фильтр SLA",
      dateValue: "Сегодня",
      dateIcon: MdAccessTime,
    },
  },
  [CHAT_ROLES.ADMIN]: {
    label: "Админ",
    sidebar: {
      title: "Аудит коммуникаций",
      tabs: [
        { id: "all", label: "Все чаты" },
        { id: "security", label: "Безопасность" },
        { id: "logs", label: "API журналы" },
      ],
      filters: [
        { id: "deleted", label: "Удалённые" },
        { id: "blocked", label: "Заблокированные" },
        { id: "errors", label: "Ошибки" },
      ],
      searchPlaceholder: "Поиск по клиенту, оператору или событию...",
      chats: baseChats.map((chat) => ({
        ...chat,
        status: "Аудит",
        statusColor: "gray",
        sla: "Полный доступ",
        slaColor: "blue",
      })),
      canCreateChat: false,
    },
    conversation: {
      ...adminConversation,
      messageTypes: [],
      visibleChannels: [
        MESSAGE_CHANNELS.CLIENT,
        MESSAGE_CHANNELS.SUPPLIER,
        MESSAGE_CHANNELS.INTERNAL,
        MESSAGE_CHANNELS.SYSTEM,
        MESSAGE_CHANNELS.FINANCIAL,
      ],
      headerActions: [
        { id: "delete", label: "Удалить", icon: MdWarning },
        { id: "block", label: "Блокировать", icon: MdOutlineLock },
      ],
    },
    permissions: {
      canSend: false,
      readOnly: true,
      note: "Режим аудита: внесение изменений недоступно.",
      canDeleteMessages: true,
      canBlockUsers: true,
    },
    details: adminConversation.details,
    meta: {
      dateLabel: "Период аудита",
      dateValue: "Последние 7 дней",
      dateIcon: MdOutlineAssessment,
    },
  },
  [CHAT_ROLES.CUSTOMER]: {
    label: "Заказчик",
    sidebar: {
      title: "Мои заявки",
      tabs: [
        { id: "all", label: "Все" },
        { id: "documents", label: "Документы" },
        { id: "payments", label: "Платежи" },
      ],
      filters: [],
      searchPlaceholder: "Поиск по номеру заявки...",
      chats: [
        {
          id: "ORD-145",
          clientName: "Тур в Турцию",
          location: "15-25 мая 2025",
          message: "Оператор: ждём подтверждения договора",
          messageIcon: MdInfo,
          time: "09:45",
          status: "В работе",
          statusColor: "green",
          unread: 1,
        },
        {
          id: "ORD-122",
          clientName: "Тур в Италию",
          location: "10-18 апр 2025",
          message: "Готовы билеты к загрузке",
          messageIcon: MdFolder,
          time: "Вчера",
          status: "Документы",
          statusColor: "blue",
        },
      ],
      canCreateChat: false,
    },
    conversation: {
      ...customerConversation,
      messageTypes: [channelMeta[MESSAGE_CHANNELS.CLIENT]],
      visibleChannels: [MESSAGE_CHANNELS.CLIENT, MESSAGE_CHANNELS.SYSTEM],
      headerActions: [{ id: "docs", label: "Документы", icon: MdFolder }],
    },
    permissions: {
      canSend: true,
      canUploadFiles: true,
      note: "Вы общаетесь только со своим оператором.",
      canCreateAdjustment: false,
      canEscalate: false,
    },
    details: customerConversation.details,
    meta: {
      dateLabel: "Период услуг",
      dateValue: "2025",
      dateIcon: MdFlight,
    },
  },
  [CHAT_ROLES.ACCOUNTANT]: {
    label: "Бухгалтер",
    sidebar: {
      title: "Финансовые кейсы",
      tabs: [
        { id: "all", label: "Все" },
        { id: "errors", label: "Ошибки" },
        { id: "refunds", label: "Возвраты" },
        { id: "debts", label: "Задолженности" },
      ],
      filters: [
        { id: "overpayment", label: "Переплаты" },
        { id: "chargeback", label: "Chargeback" },
      ],
      searchPlaceholder: "Поиск по счёту или платежу...",
      chats: [
        {
          id: "PAY-578",
          clientName: "ORD-145 • Иван Петров",
          location: "Счёт INV-985",
          message: "Оператор: подтвердите оплату",
          messageIcon: MdAttachMoney,
          time: "11:15",
          status: "Ожидает оплату",
          statusColor: "orange",
          sla: "1ч",
          slaColor: "yellow",
          unread: 2,
        },
        {
          id: "PAY-432",
          clientName: "ORD-120 • Павел Морозов",
          location: "Возврат $350",
          message: "Бухгалтер: выполнен возврат",
          messageIcon: MdCheckCircle,
          time: "09:02",
          status: "Готово",
          statusColor: "green",
          sla: "Закрыто",
          slaColor: "green",
        },
      ],
      canCreateChat: false,
    },
    conversation: {
      ...accountantConversation,
      messageTypes: [channelMeta[MESSAGE_CHANNELS.FINANCIAL]],
      visibleChannels: [MESSAGE_CHANNELS.FINANCIAL, MESSAGE_CHANNELS.SYSTEM],
      headerActions: [
        { id: "invoice", label: "Счёт", icon: MdAttachMoney },
        { id: "history", label: "История", icon: MdOutlineAssessment },
      ],
    },
    permissions: {
      canSend: true,
      canUploadFiles: true,
      note: "Только финансовые комментарии и документы.",
      canCreateAdjustment: true,
      canEscalate: false,
    },
    details: accountantConversation.details,
    meta: {
      dateLabel: "Финансовый день",
      dateValue: "Сегодня",
      dateIcon: MdAttachMoney,
    },
  },
};

export const getRoleConfig = (role) =>
  roleConfigs[role] || roleConfigs[CHAT_ROLES.OPERATOR];
