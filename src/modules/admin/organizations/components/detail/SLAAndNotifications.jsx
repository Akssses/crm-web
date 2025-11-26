"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Switch } from "@/ui";
import { FaSave, FaPlus } from "react-icons/fa";
import s from "../../styles/SLAAndNotifications.module.scss";

export default function SLAAndNotifications() {
  const [settings, setSettings] = useState({
    // SLA по заявкам
    requestSLA: {
      reactionTime: "",
      reactionUnit: "minutes", // "minutes" или "hours"
    },
    
    // SLA по услугам
    serviceSLA: [
      { id: 1, service: "Авиабилеты", time: "2", unit: "hours" },
      { id: 2, service: "Отели", time: "4", unit: "hours" },
      { id: 3, service: "Трансферы", time: "1", unit: "hours" },
    ],
    
    // SLA по документам
    documentSLA: {
      preparationTime: "",
      preparationUnit: "hours",
    },
    
    // SLA по поставщикам
    supplierSLA: {
      responseTime: "",
      responseUnit: "minutes",
    },
    
    // Цветовые статусы
    statusColors: {
      green: "В норме",
      yellow: "Предупреждение",
      red: "Критично",
    },
    
    // Каналы уведомлений
    notificationChannels: {
      email: true,
      telegram: true,
      whatsapp: false,
    },
    
    // Системные уведомления
    systemNotifications: {
      client: true,
      accounting: true,
      operators: true,
      slaOverdue: true,
      documents: true,
    },
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, subField, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Сохранение SLA и уведомлений:", settings);
  };

  return (
    <div className={s.main}>
      <Container size="full">
        <div className={s.header}>
          <h4>SLA и уведомления</h4>
          <Button variant="primary" icon={FaSave} onClick={handleSave}>
            Сохранить изменения
          </Button>
        </div>
      </Container>

      {/* SLA по заявкам */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>SLA по заявкам</h5>
          <div className={s.grid}>
            <div className={s.inputWrapper}>
              <Input
                label="Время реакции"
                type="number"
                placeholder="30"
                value={settings.requestSLA.reactionTime}
                onChange={(value) => handleNestedChange("requestSLA", "reactionTime", value)}
              />
              <Select
                label="Единица измерения"
                options={[
                  { value: "minutes", label: "Минуты" },
                  { value: "hours", label: "Часы" },
                ]}
                value={settings.requestSLA.reactionUnit}
                onChange={(value) => handleNestedChange("requestSLA", "reactionUnit", value)}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* SLA по услугам */}
      <Container size="full">
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h5 className={s.sectionTitle}>SLA по услугам</h5>
            <Button variant="bgblue" size="sm" icon={FaPlus}>
              Добавить услугу
            </Button>
          </div>
          <div className={s.slaTable}>
            <div className={s.tableHeader}>
              <span>Услуга</span>
              <span>Время обработки</span>
              <span>Единица</span>
              <span>Действия</span>
            </div>
            {settings.serviceSLA.map((item) => (
              <div key={item.id} className={s.tableRow}>
                <span>{item.service}</span>
                <span>{item.time}</span>
                <span>{item.unit === "hours" ? "Часы" : "Минуты"}</span>
                <div className={s.actions}>
                  <Button variant="blue" size="sm">Изменить</Button>
                  <Button variant="red" size="sm">Удалить</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* SLA по документам */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>SLA по документам</h5>
          <div className={s.grid}>
            <div className={s.inputWrapper}>
              <Input
                label="Срок подготовки документов"
                type="number"
                placeholder="24"
                value={settings.documentSLA.preparationTime}
                onChange={(value) => handleNestedChange("documentSLA", "preparationTime", value)}
              />
              <Select
                label="Единица измерения"
                options={[
                  { value: "hours", label: "Часы" },
                  { value: "days", label: "Дни" },
                ]}
                value={settings.documentSLA.preparationUnit}
                onChange={(value) => handleNestedChange("documentSLA", "preparationUnit", value)}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* SLA по поставщикам */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>SLA по поставщикам</h5>
          <div className={s.grid}>
            <div className={s.inputWrapper}>
              <Input
                label="Время реакции поставщика"
                type="number"
                placeholder="15"
                value={settings.supplierSLA.responseTime}
                onChange={(value) => handleNestedChange("supplierSLA", "responseTime", value)}
              />
              <Select
                label="Единица измерения"
                options={[
                  { value: "minutes", label: "Минуты" },
                  { value: "hours", label: "Часы" },
                ]}
                value={settings.supplierSLA.responseUnit}
                onChange={(value) => handleNestedChange("supplierSLA", "responseUnit", value)}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Цветовые статусы */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Цветовые статусы</h5>
          <div className={s.statusColors}>
            <div className={s.statusItem}>
              <div className={s.colorBox} style={{ backgroundColor: "#10b981" }}></div>
              <span>Зелёный - В норме</span>
            </div>
            <div className={s.statusItem}>
              <div className={s.colorBox} style={{ backgroundColor: "#fbbf24" }}></div>
              <span>Жёлтый - Предупреждение</span>
            </div>
            <div className={s.statusItem}>
              <div className={s.colorBox} style={{ backgroundColor: "#ef4444" }}></div>
              <span>Красный - Критично</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Каналы уведомлений */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Каналы уведомлений</h5>
          <div className={s.grid}>
            <div className={s.switchContainer}>
              <Switch
                label="Email"
                checked={settings.notificationChannels.email}
                onChange={(checked) =>
                  handleNestedChange("notificationChannels", "email", checked)
                }
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Telegram"
                checked={settings.notificationChannels.telegram}
                onChange={(checked) =>
                  handleNestedChange("notificationChannels", "telegram", checked)
                }
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="WhatsApp"
                checked={settings.notificationChannels.whatsapp}
                onChange={(checked) =>
                  handleNestedChange("notificationChannels", "whatsapp", checked)
                }
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Системные уведомления */}
      <Container size="full">
        <div className={s.section}>
          <h5 className={s.sectionTitle}>Системные уведомления</h5>
          <div className={s.grid}>
            <div className={s.switchContainer}>
              <Switch
                label="Уведомления клиенту"
                checked={settings.systemNotifications.client}
                onChange={(checked) =>
                  handleNestedChange("systemNotifications", "client", checked)
                }
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Уведомления бухгалтерии"
                checked={settings.systemNotifications.accounting}
                onChange={(checked) =>
                  handleNestedChange("systemNotifications", "accounting", checked)
                }
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Уведомления операторам"
                checked={settings.systemNotifications.operators}
                onChange={(checked) =>
                  handleNestedChange("systemNotifications", "operators", checked)
                }
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Уведомления при просрочке SLA"
                checked={settings.systemNotifications.slaOverdue}
                onChange={(checked) =>
                  handleNestedChange("systemNotifications", "slaOverdue", checked)
                }
              />
            </div>
            <div className={s.switchContainer}>
              <Switch
                label="Уведомления по документам"
                checked={settings.systemNotifications.documents}
                onChange={(checked) =>
                  handleNestedChange("systemNotifications", "documents", checked)
                }
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Шаблоны уведомлений */}
      <Container size="full">
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h5 className={s.sectionTitle}>Шаблоны уведомлений</h5>
            <Button variant="bgblue" size="sm" icon={FaPlus}>
              Добавить шаблон
            </Button>
          </div>
          <div className={s.templatesList}>
            <div className={s.templateItem}>
              <span className={s.templateName}>Email: Заказ готов</span>
              <Button variant="blue" size="sm">Редактировать</Button>
            </div>
            <div className={s.templateItem}>
              <span className={s.templateName}>Telegram: Документ получен</span>
              <Button variant="blue" size="sm">Редактировать</Button>
            </div>
            <div className={s.templateItem}>
              <span className={s.templateName}>WhatsApp: Оплата получена</span>
              <Button variant="blue" size="sm">Редактировать</Button>
            </div>
          </div>
          <div className={s.variablesInfo}>
            <p>Доступные переменные: {"{{client_name}}"} {"{{order_number}}"} {"{{date}}"} {"{{org_name}}"} {"{{price}}"}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

