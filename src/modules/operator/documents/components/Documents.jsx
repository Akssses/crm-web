"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Input, Select, Textarea, Switch, Checkbox } from "@/ui";
import {
  MdAdd,
  MdContentCopy,
  MdDownload,
  MdHistory,
  MdOutlineWaterDrop,
  MdPreview,
  MdRefresh,
  MdSave,
} from "react-icons/md";
import { FaPlay, FaUserShield } from "react-icons/fa";
import s from "../styles/Documents.module.scss";

const TABS = [
  { id: "templates", label: "Шаблоны" },
  { id: "autogen", label: "Автогенерация" },
  { id: "massRegeneration", label: "Массовая регенерация" },
  { id: "signatures", label: "Подписи" },
  { id: "watermarks", label: "Водяные знаки" },
  { id: "logs", label: "Журнал" },
];

const DOCUMENT_TYPES = [
  { value: "all", label: "Все документы" },
  { value: "invoice", label: "Счет" },
  { value: "act", label: "Акт" },
  { value: "contract", label: "Договор" },
  { value: "voucher", label: "Ваучер" },
  { value: "insurance", label: "Страховка" },
  { value: "ticket", label: "Билет" },
];

const ORDER_TYPES = [
  { value: "all", label: "Все типы заказов" },
  { value: "b2c", label: "B2C" },
  { value: "b2b", label: "B2B" },
  { value: "group", label: "Групповой" },
  { value: "partner", label: "Партнёрский" },
  { value: "internal", label: "Внутренний" },
  { value: "package", label: "Пакетный тур" },
];

const ORGANIZATION_OPTIONS = [
  { value: "all", label: "Все организации" },
  { value: "globex", label: "Globex LLC" },
  { value: "infinity", label: "Infinity Travel" },
  { value: "sunny", label: "Sunny Corp" },
];

const MOCK_TEMPLATES = [
  {
    id: "TPL-001",
    name: "Счёт для B2B",
    documentType: "invoice",
    orderType: "b2b",
    organization: "globex",
    activeVersion: "v3",
    createdBy: "Айгерим М.",
    updatedAt: "28.11.2025 11:45",
    status: "active",
    content: "<h1>Счет {{order_number}}</h1><p>Клиент: {{client_name}}</p>",
    versions: [
      {
        id: "v3",
        label: "Версия 3",
        author: "Айгерим М.",
        date: "28.11.2025",
        changes: "Добавлен QR-код оплаты",
        isActive: true,
      },
      {
        id: "v2",
        label: "Версия 2",
        author: "Бекзат Ж.",
        date: "12.11.2025",
        changes: "Новый блок юр. адреса",
      },
      {
        id: "v1",
        label: "Версия 1",
        author: "Айгерим М.",
        date: "02.11.2025",
        changes: "Первая версия",
      },
    ],
  },
  {
    id: "TPL-002",
    name: "Акт выполненных работ",
    documentType: "act",
    orderType: "b2c",
    organization: "all",
    activeVersion: "v1",
    createdBy: "Роман С.",
    updatedAt: "22.11.2025 09:20",
    status: "draft",
    content: "<h2>Акт №{{document_number}}</h2><p>Услуги: {{service_list}}</p>",
    versions: [
      {
        id: "v1",
        label: "Версия 1",
        author: "Роман С.",
        date: "22.11.2025",
        changes: "Базовый шаблон",
        isActive: true,
      },
    ],
  },
];

const VARIABLE_GROUPS = [
  {
    label: "Основные",
    variables: [
      "{{client_name}}",
      "{{client_phone}}",
      "{{order_number}}",
      "{{order_date}}",
      "{{operator_name}}",
      "{{total_price}}",
      "{{total_due}}",
    ],
  },
  {
    label: "Услуги",
    variables: [
      "{{service.type}}",
      "{{service.price}}",
      "{{service.details}}",
      "{{ticket_number}}",
      "{{hotel_name}}",
      "{{check_in}}",
    ],
  },
  {
    label: "Финансы",
    variables: [
      "{{payment_status}}",
      "{{currency_rate}}",
      "{{commission}}",
      "{{margin}}",
    ],
  },
  {
    label: "Подписи",
    variables: ["{{signature}}", "{{signature_position}}", "{{stamp}}"],
  },
];

const BLOCKS = [
  { id: "services", label: "Таблица услуг" },
  { id: "payments", label: "Таблица платежей" },
  { id: "legal", label: "Юридический блок" },
  { id: "address", label: "Адресный блок" },
];

const TRIGGERS = [
  { id: "service_create", label: "Создание услуги" },
  { id: "service_confirmed", label: "Подтверждение услуги поставщиком" },
  { id: "supplier_document", label: "Загрузка документа поставщиком" },
  { id: "service_ready", label: "Статус услуги «готово»" },
  { id: "order_create", label: "Создание заказа" },
  { id: "order_close", label: "Закрытие заказа" },
  { id: "payment_received", label: "Получение оплаты" },
  { id: "proposal_version", label: "Изменение версии КП" },
];

const CHANNELS = [
  { id: "email", label: "Email клиенту" },
  { id: "telegram", label: "Telegram-бот" },
  { id: "operator_chat", label: "Чат оператора" },
  { id: "order_documents", label: "Документы заказа" },
  { id: "service_documents", label: "Документы услуги" },
  { id: "supplier_api", label: "FTP/API поставщика" },
];

const MASS_ORDER_STATUS = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "pending", label: "В работе" },
  { value: "ready", label: "Готов" },
  { value: "closed", label: "Закрыт" },
];

const SIGNATURES = [
  {
    id: "sign-001",
    name: "Руководитель — B2B",
    role: "Руководитель",
    organization: "Globex LLC",
    documentTypes: ["invoice", "contract"],
    orderTypes: ["b2b"],
    updatedAt: "14.11.2025",
  },
  {
    id: "sign-002",
    name: "Бухгалтер — Акт",
    role: "Бухгалтер",
    organization: "Infinity Travel",
    documentTypes: ["act"],
    orderTypes: ["b2b", "b2c"],
    updatedAt: "05.11.2025",
  },
  {
    id: "sign-003",
    name: "Партнёр TravelPro",
    role: "Партнёр",
    organization: "TravelPro",
    documentTypes: ["voucher", "contract"],
    orderTypes: ["partner"],
    updatedAt: "21.10.2025",
  },
];

const WATERMARK_RULES = [
  {
    id: "wmk-001",
    documentType: "invoice",
    title: "Счета до оплаты",
    text: "НЕ ОПЛАЧЕНО",
    condition: "Документ не оплачен",
  },
  {
    id: "wmk-002",
    documentType: "contract",
    title: "Черновики договоров",
    text: "ЧЕРНОВИК",
    condition: "Документ в статусе «черновик»",
  },
];

const ACTIVITY_LOG = [
  {
    id: "log-001",
    type: "template",
    actor: "Айгерим М.",
    description: "Обновлена версия шаблона TPL-001 до v3",
    datetime: "28.11.2025 11:45",
  },
  {
    id: "log-002",
    type: "regeneration",
    actor: "Бекзат Ж.",
    description: "Запущена массовая регенерация счетов (48 документов)",
    datetime: "27.11.2025 19:12",
  },
  {
    id: "log-003",
    type: "signature",
    actor: "Роман С.",
    description: "Загружена новая подпись бухгалтера Infinity Travel",
    datetime: "24.11.2025 09:05",
  },
];

export default function Documents() {
  const [activeTab, setActiveTab] = useState("templates");
  const [templates, setTemplates] = useState(MOCK_TEMPLATES);
  const [templateFilters, setTemplateFilters] = useState({
    documentType: "all",
    orderType: "all",
    organization: "all",
    status: "all",
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    MOCK_TEMPLATES[0]?.id || null
  );
  const [editorMode, setEditorMode] = useState("wysiwyg");
  const [templateContent, setTemplateContent] = useState(
    MOCK_TEMPLATES[0]?.content || ""
  );
  const [autogenSettings, setAutogenSettings] = useState({
    triggers: {
      service_create: true,
      service_confirmed: true,
      supplier_document: false,
      service_ready: true,
      order_create: false,
      order_close: false,
      payment_received: true,
      proposal_version: false,
    },
    channels: {
      email: true,
      telegram: false,
      operator_chat: true,
      order_documents: true,
      service_documents: false,
      supplier_api: false,
    },
    fileMask: "{{order_number}}_invoice.pdf",
    destination: "/orders/{{order_number}}/documents",
    recipients: "client, operator",
    includeQr: true,
    includeSignature: true,
    includeWatermark: false,
    publishToOrder: true,
  });
  const [massRegeneration, setMassRegeneration] = useState({
    documentType: "invoice",
    dateFrom: "",
    dateTo: "",
    orderStatus: "ready",
    organization: "all",
    includeServices: true,
    replaceExisting: false,
    autoSend: false,
  });
  const [watermarkSettings, setWatermarkSettings] = useState({
    text: "КОПИЯ",
    opacity: 0.25,
    angle: 45,
    size: 48,
    repeat: true,
    includeLogo: false,
    autoRules: {
      unpaid: true,
      draft: true,
      outdated: false,
      approval: true,
    },
  });

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      if (
        templateFilters.documentType !== "all" &&
        template.documentType !== templateFilters.documentType
      ) {
        return false;
      }
      if (
        templateFilters.orderType !== "all" &&
        template.orderType !== templateFilters.orderType
      ) {
        return false;
      }
      if (
        templateFilters.organization !== "all" &&
        template.organization !== templateFilters.organization
      ) {
        return false;
      }
      if (
        templateFilters.status !== "all" &&
        template.status !== templateFilters.status
      ) {
        return false;
      }
      return true;
    });
  }, [templates, templateFilters]);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId),
    [selectedTemplateId, templates]
  );

  useEffect(() => {
    if (selectedTemplate) {
      setTemplateContent(selectedTemplate.content);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (!selectedTemplateId && filteredTemplates.length > 0) {
      setSelectedTemplateId(filteredTemplates[0].id);
    }
  }, [filteredTemplates, selectedTemplateId]);

  const handleTemplateFilterChange = (key, value) => {
    setTemplateFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
    setEditorMode("wysiwyg");
  };

  const handleInsertVariable = (variable) => {
    setTemplateContent((prev) => `${prev}\n${variable}`);
  };

  const handleInsertBlock = (blockId) => {
    setTemplateContent((prev) => `${prev}\n<!-- ${blockId} -->\n`);
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;

    setTemplates((prev) =>
      prev.map((template) =>
        template.id === selectedTemplate.id
          ? {
              ...template,
              content: templateContent,
              updatedAt: new Date().toLocaleString("ru-RU"),
            }
          : template
      )
    );
  };

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: `TPL-${String(templates.length + 1).padStart(3, "0")}`,
      name: "Новый шаблон",
      documentType: "invoice",
      orderType: "b2c",
      organization: "all",
      activeVersion: "v1",
      createdBy: "Вы",
      updatedAt: new Date().toLocaleString("ru-RU"),
      status: "draft",
      content: "<h1>Новый документ</h1>",
      versions: [
        {
          id: "v1",
          label: "Версия 1",
          author: "Вы",
          date: new Date().toLocaleDateString("ru-RU"),
          changes: "Создана базовая версия",
          isActive: true,
        },
      ],
    };

    setTemplates((prev) => [newTemplate, ...prev]);
    setSelectedTemplateId(newTemplate.id);
    setActiveTab("templates");
  };

  const handleAutogenToggle = (group, key) => {
    setAutogenSettings((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: !prev[group][key] },
    }));
  };

  const handleAutogenFieldChange = (key, value) => {
    setAutogenSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleMassRegenerationChange = (key, value) => {
    setMassRegeneration((prev) => ({ ...prev, [key]: value }));
  };

  const handleWatermarkChange = (key, value) => {
    setWatermarkSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleWatermarkRuleToggle = (key) => {
    setWatermarkSettings((prev) => ({
      ...prev,
      autoRules: { ...prev.autoRules, [key]: !prev.autoRules[key] },
    }));
  };

  const renderTemplatesTab = () => (
    <div className={s.templatesTab}>
      <div className={s.templateFilters}>
        <Select
          label="Тип документа"
          value={templateFilters.documentType}
          onChange={(value) =>
            handleTemplateFilterChange("documentType", value)
          }
          options={DOCUMENT_TYPES}
        />
        <Select
          label="Тип заказа"
          value={templateFilters.orderType}
          onChange={(value) => handleTemplateFilterChange("orderType", value)}
          options={ORDER_TYPES}
        />
        <Select
          label="Организация"
          value={templateFilters.organization}
          onChange={(value) =>
            handleTemplateFilterChange("organization", value)
          }
          options={ORGANIZATION_OPTIONS}
        />
        <Select
          label="Статус"
          value={templateFilters.status}
          onChange={(value) => handleTemplateFilterChange("status", value)}
          options={[
            { value: "all", label: "Все статусы" },
            { value: "active", label: "Активный" },
            { value: "draft", label: "Черновик" },
          ]}
        />
      </div>

      <div className={s.templatesLayout}>
        <div className={s.templateList}>
          <div className={s.listHeader}>
            <h3>Шаблоны</h3>
            <span>{filteredTemplates.length} шт.</span>
          </div>

          <div className={s.templates}>
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                className={`${s.templateCard} ${
                  template.id === selectedTemplateId ? s.active : ""
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className={s.templateCardHeader}>
                  <div>
                    <p className={s.templateName}>{template.name}</p>
                    <span className={s.templateMeta}>
                      {template.id} • {template.activeVersion}
                    </span>
                  </div>
                  <span
                    className={`${s.statusBadge} ${
                      template.status === "active"
                        ? s.statusActive
                        : s.statusDraft
                    }`}
                  >
                    {template.status === "active" ? "Активный" : "Черновик"}
                  </span>
                </div>
                <div className={s.templateInfo}>
                  <span className={s.templateTag}>
                    {
                      DOCUMENT_TYPES.find(
                        (d) => d.value === template.documentType
                      )?.label
                    }
                  </span>
                  <span className={s.templateTag}>
                    {
                      ORDER_TYPES.find((o) => o.value === template.orderType)
                        ?.label
                    }
                  </span>
                </div>
                <div className={s.templateFooter}>
                  <span>Изм. {template.updatedAt}</span>
                  <span>{template.createdBy}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedTemplate && (
          <div className={s.templateEditor}>
            <div className={s.editorHeader}>
              <div>
                <h3>{selectedTemplate.name}</h3>
                <p>
                  Активная версия: {selectedTemplate.activeVersion} • Последнее
                  обновление {selectedTemplate.updatedAt}
                </p>
              </div>
              <div className={s.editorActions}>
                <Button variant="outline" icon={MdContentCopy}>
                  Дублировать
                </Button>
                <Button
                  variant="primary"
                  icon={MdSave}
                  onClick={handleSaveTemplate}
                >
                  Сохранить
                </Button>
              </div>
            </div>

            <div className={s.editorToolbar}>
              <div className={s.modeSwitch}>
                <button
                  className={editorMode === "wysiwyg" ? s.active : ""}
                  onClick={() => setEditorMode("wysiwyg")}
                >
                  Визуальный
                </button>
                <button
                  className={editorMode === "html" ? s.active : ""}
                  onClick={() => setEditorMode("html")}
                >
                  HTML/Markdown
                </button>
              </div>
              <div className={s.previewActions}>
                <Button variant="outline" icon={MdPreview}>
                  Предпросмотр PDF
                </Button>
                <Button variant="outline" icon={MdRefresh}>
                  Проверить переменные
                </Button>
              </div>
            </div>

            {editorMode === "wysiwyg" ? (
              <div
                className={s.wysiwyg}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setTemplateContent(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: templateContent }}
              />
            ) : (
              <Textarea
                value={templateContent}
                onChange={setTemplateContent}
                minRows={12}
                maxRows={24}
              />
            )}

            <div className={s.editorPanels}>
              <div className={s.panel}>
                <h4>Переменные</h4>
                <div className={s.variableGroups}>
                  {VARIABLE_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className={s.groupLabel}>{group.label}</p>
                      <div className={s.chips}>
                        {group.variables.map((variable) => (
                          <button
                            key={variable}
                            className={s.chip}
                            onClick={() => handleInsertVariable(variable)}
                          >
                            {variable}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={s.panel}>
                <h4>Блоки</h4>
                <div className={s.blocks}>
                  {BLOCKS.map((block) => (
                    <button
                      key={block.id}
                      className={s.blockButton}
                      onClick={() => handleInsertBlock(block.id)}
                    >
                      {block.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={s.panel}>
                <h4>Версии</h4>
                <div className={s.versions}>
                  {selectedTemplate.versions.map((version) => (
                    <div
                      key={version.id}
                      className={`${s.versionCard} ${
                        version.isActive ? s.activeVersion : ""
                      }`}
                    >
                      <div>
                        <p className={s.versionLabel}>{version.label}</p>
                        <span className={s.versionMeta}>
                          {version.author} • {version.date}
                        </span>
                        <p className={s.versionChanges}>{version.changes}</p>
                      </div>
                      <div className={s.versionActions}>
                        <Button variant="outline">Сравнить</Button>
                        <Button variant="outline">Откатить</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAutogenTab = () => (
    <div className={s.tabContent}>
      <div className={s.panel}>
        <h3>Триггеры автогенерации</h3>
        <div className={s.checkGrid}>
          {TRIGGERS.map((trigger) => (
            <Checkbox
              key={trigger.id}
              id={`trigger-${trigger.id}`}
              label={trigger.label}
              checked={autogenSettings.triggers[trigger.id]}
              onChange={() => handleAutogenToggle("triggers", trigger.id)}
            />
          ))}
        </div>
      </div>

      <div className={s.panel}>
        <h3>Каналы отправки</h3>
        <div className={s.checkGrid}>
          {CHANNELS.map((channel) => (
            <Checkbox
              key={channel.id}
              id={`channel-${channel.id}`}
              label={channel.label}
              checked={autogenSettings.channels[channel.id]}
              onChange={() => handleAutogenToggle("channels", channel.id)}
            />
          ))}
        </div>
      </div>

      <div className={s.panel}>
        <h3>Настройки генерации</h3>
        <div className={s.formGrid}>
          <Input
            label="Имя файла"
            value={autogenSettings.fileMask}
            onChange={(value) => handleAutogenFieldChange("fileMask", value)}
            placeholder="{{order_number}}_invoice.pdf"
          />
          <Input
            label="Папка назначения"
            value={autogenSettings.destination}
            onChange={(value) => handleAutogenFieldChange("destination", value)}
            placeholder="/orders/{{order_number}}/documents"
          />
          <Input
            label="Кому отправлять"
            value={autogenSettings.recipients}
            onChange={(value) => handleAutogenFieldChange("recipients", value)}
            placeholder="client@example.com"
          />
        </div>

        <div className={s.switchGrid}>
          <Switch
            id="qr-code"
            label="Добавлять QR-код оплаты"
            checked={autogenSettings.includeQr}
            onChange={() =>
              handleAutogenFieldChange("includeQr", !autogenSettings.includeQr)
            }
          />
          <Switch
            id="signature"
            label="Добавлять подпись"
            checked={autogenSettings.includeSignature}
            onChange={() =>
              handleAutogenFieldChange(
                "includeSignature",
                !autogenSettings.includeSignature
              )
            }
          />
          <Switch
            id="watermark"
            label="Добавлять водяной знак"
            checked={autogenSettings.includeWatermark}
            onChange={() =>
              handleAutogenFieldChange(
                "includeWatermark",
                !autogenSettings.includeWatermark
              )
            }
          />
          <Switch
            id="publish"
            label="Публиковать документ в заказ автоматически"
            checked={autogenSettings.publishToOrder}
            onChange={() =>
              handleAutogenFieldChange(
                "publishToOrder",
                !autogenSettings.publishToOrder
              )
            }
          />
        </div>
      </div>
    </div>
  );

  const renderMassRegenerationTab = () => (
    <div className={s.tabContent}>
      <div className={s.panel}>
        <h3>Массовая регенерация документов</h3>
        <div className={s.formGrid}>
          <Select
            label="Тип документа"
            value={massRegeneration.documentType}
            onChange={(value) =>
              handleMassRegenerationChange("documentType", value)
            }
            options={DOCUMENT_TYPES.filter((option) => option.value !== "all")}
          />
          <Select
            label="Статус заказов"
            value={massRegeneration.orderStatus}
            onChange={(value) =>
              handleMassRegenerationChange("orderStatus", value)
            }
            options={MASS_ORDER_STATUS}
          />
          <Select
            label="Организация"
            value={massRegeneration.organization}
            onChange={(value) =>
              handleMassRegenerationChange("organization", value)
            }
            options={ORGANIZATION_OPTIONS}
          />
          <Input
            type="date"
            label="Дата от"
            value={massRegeneration.dateFrom}
            onChange={(value) =>
              handleMassRegenerationChange("dateFrom", value)
            }
          />
          <Input
            type="date"
            label="Дата до"
            value={massRegeneration.dateTo}
            onChange={(value) => handleMassRegenerationChange("dateTo", value)}
          />
        </div>

        <div className={s.switchGrid}>
          <Switch
            id="include-services"
            label="Перегенерировать документы услуг"
            checked={massRegeneration.includeServices}
            onChange={() =>
              handleMassRegenerationChange(
                "includeServices",
                !massRegeneration.includeServices
              )
            }
          />
          <Switch
            id="replace-existing"
            label="Заменять существующие версии"
            checked={massRegeneration.replaceExisting}
            onChange={() =>
              handleMassRegenerationChange(
                "replaceExisting",
                !massRegeneration.replaceExisting
              )
            }
          />
          <Switch
            id="auto-send"
            label="Отправлять клиенту автоматически"
            checked={massRegeneration.autoSend}
            onChange={() =>
              handleMassRegenerationChange(
                "autoSend",
                !massRegeneration.autoSend
              )
            }
          />
        </div>

        <div className={s.regenerationActions}>
          <Button variant="outline" icon={MdHistory}>
            История запусков
          </Button>
          <Button variant="primary" icon={FaPlay}>
            Запустить регенерацию
          </Button>
        </div>
      </div>

      <div className={s.panel}>
        <h4>Лог последнего запуска</h4>
        <ul className={s.logList}>
          <li>
            <strong>48</strong> документов пересоздано успешно
          </li>
          <li>
            <strong>3</strong> документа с ошибками (см. журнал)
          </li>
          <li>Шаблон: TPL-001 • Версия v3</li>
          <li>Время выполнения: 2 мин 14 сек</li>
        </ul>
      </div>
    </div>
  );

  const renderSignaturesTab = () => (
    <div className={s.tabContent}>
      <div className={s.panel}>
        <div className={s.panelHeader}>
          <div>
            <h3>Подписи</h3>
            <p>Используются шаблонами в зависимости от правил</p>
          </div>
          <Button variant="primary" icon={MdAdd}>
            Добавить подпись
          </Button>
        </div>

        <div className={s.signatureList}>
          {SIGNATURES.map((signature) => (
            <div key={signature.id} className={s.signatureCard}>
              <div className={s.signatureIcon}>
                <FaUserShield size={20} />
              </div>
              <div className={s.signatureInfo}>
                <p className={s.signatureName}>{signature.name}</p>
                <span>{signature.role}</span>
                <p className={s.signatureMeta}>
                  {signature.organization} • {signature.updatedAt}
                </p>
                <div className={s.signatureTags}>
                  {signature.documentTypes.map((type) => (
                    <span key={type}>{type}</span>
                  ))}
                </div>
              </div>
              <div className={s.signatureActions}>
                <Button variant="outline">Редактировать</Button>
                <Button variant="outline">Привязать</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWatermarksTab = () => (
    <div className={s.tabContent}>
      <div className={s.panel}>
        <div className={s.panelHeader}>
          <div>
            <h3>Настройки водяного знака</h3>
            <p>Добавляется на этапе генерации PDF</p>
          </div>
          <Button variant="outline" icon={MdOutlineWaterDrop}>
            Предпросмотр
          </Button>
        </div>

        <div className={s.formGrid}>
          <Input
            label="Текст"
            value={watermarkSettings.text}
            onChange={(value) => handleWatermarkChange("text", value)}
          />
          <Input
            label="Прозрачность"
            type="number"
            value={watermarkSettings.opacity}
            onChange={(value) =>
              handleWatermarkChange("opacity", Number(value))
            }
          />
          <Input
            label="Угол"
            type="number"
            value={watermarkSettings.angle}
            onChange={(value) => handleWatermarkChange("angle", Number(value))}
          />
          <Input
            label="Размер шрифта"
            type="number"
            value={watermarkSettings.size}
            onChange={(value) => handleWatermarkChange("size", Number(value))}
          />
        </div>

        <div className={s.switchGrid}>
          <Switch
            id="wm-repeat"
            label="Повторять на странице"
            checked={watermarkSettings.repeat}
            onChange={() =>
              handleWatermarkChange("repeat", !watermarkSettings.repeat)
            }
          />
          <Switch
            id="wm-logo"
            label="Использовать логотип"
            checked={watermarkSettings.includeLogo}
            onChange={() =>
              handleWatermarkChange(
                "includeLogo",
                !watermarkSettings.includeLogo
              )
            }
          />
        </div>
      </div>

      <div className={s.panel}>
        <h4>Правила автоматического применения</h4>
        <div className={s.checkGrid}>
          <Checkbox
            id="rule-unpaid"
            label="Документ не оплачен"
            checked={watermarkSettings.autoRules.unpaid}
            onChange={() => handleWatermarkRuleToggle("unpaid")}
          />
          <Checkbox
            id="rule-draft"
            label="Документ в статусе «черновик»"
            checked={watermarkSettings.autoRules.draft}
            onChange={() => handleWatermarkRuleToggle("draft")}
          />
          <Checkbox
            id="rule-outdated"
            label="Версия неактуальная"
            checked={watermarkSettings.autoRules.outdated}
            onChange={() => handleWatermarkRuleToggle("outdated")}
          />
          <Checkbox
            id="rule-approval"
            label="Документ для согласования"
            checked={watermarkSettings.autoRules.approval}
            onChange={() => handleWatermarkRuleToggle("approval")}
          />
        </div>
      </div>

      <div className={s.panel}>
        <h4>Настроенные правила</h4>
        <div className={s.watermarkRules}>
          {WATERMARK_RULES.map((rule) => (
            <div key={rule.id} className={s.watermarkCard}>
              <div>
                <p className={s.watermarkTitle}>{rule.title}</p>
                <span className={s.watermarkMeta}>
                  Документ: {rule.documentType}
                </span>
                <p className={s.watermarkText}>{rule.text}</p>
                <p className={s.watermarkCondition}>{rule.condition}</p>
              </div>
              <Button variant="outline">Изменить</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLogsTab = () => (
    <div className={s.tabContent}>
      <div className={s.panel}>
        <div className={s.panelHeader}>
          <div>
            <h3>Журнал действий</h3>
            <p>Отслеживайте изменения шаблонов, запусков и подписей</p>
          </div>
          <Button variant="outline" icon={MdDownload}>
            Экспорт
          </Button>
        </div>

        <div className={s.logTable}>
          {ACTIVITY_LOG.map((entry) => (
            <div key={entry.id} className={s.logRow}>
              <div className={s.logType}>{entry.type}</div>
              <div className={s.logDescription}>
                <p>{entry.description}</p>
                <span>{entry.actor}</span>
              </div>
              <div className={s.logDate}>{entry.datetime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={s.documents}>
      <div className={s.inner}>
        <div className={s.header}>
          <div>
            <h1>Редактор шаблонов документов</h1>
          </div>
          <div className={s.headerActions}>
            <Button variant="outline" icon={MdHistory}>
              Журнал изменений
            </Button>
            <Button
              variant="primary"
              icon={MdAdd}
              onClick={handleCreateTemplate}
            >
              Новый шаблон
            </Button>
          </div>
        </div>

        <div className={s.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={s.tabContainer}>
          {activeTab === "templates" && renderTemplatesTab()}
          {activeTab === "autogen" && renderAutogenTab()}
          {activeTab === "massRegeneration" && renderMassRegenerationTab()}
          {activeTab === "signatures" && renderSignaturesTab()}
          {activeTab === "watermarks" && renderWatermarksTab()}
          {activeTab === "logs" && renderLogsTab()}
        </div>
      </div>
    </div>
  );
}
