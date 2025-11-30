"use client";
import React, { useState } from "react";
import { Modal, Button, Input, Textarea, Select } from "@/ui";
import {
  MdEdit,
  MdClose,
  MdAttachFile,
  MdSave,
  MdDelete,
  MdChatBubbleOutline,
  MdHistory,
} from "react-icons/md";
import s from "../styles/ServiceDrawer.module.scss";

const TABS = [
  { id: "general", label: "Общая информация" },
  { id: "parameters", label: "Параметры" },
  { id: "passengers", label: "Пассажиры" },
  { id: "documents", label: "Документы" },
  { id: "route", label: "Маршрут" },
  { id: "baggage", label: "Багаж" },
  { id: "conditions", label: "Условия" },
  { id: "history", label: "История" },
];

export default function ServiceDrawer({ isOpen, onClose, service }) {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(service || {});

  if (!service) return null;

  const handleSave = () => {
    // TODO: Save service
    console.log("Save service", formData);
    onClose();
  };

  const handleDelete = () => {
    if (confirm("Удалить услугу?")) {
      // TODO: Delete service
      console.log("Delete service", service.id);
      onClose();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className={s.tabContent}>
            <div className={s.formGroup}>
              <label>Название услуги</label>
              <Input
                value={formData.title || ""}
                onChange={(value) => setFormData({ ...formData, title: value })}
                placeholder="Название услуги"
              />
            </div>
            <div className={s.formGroup}>
              <label>Тип услуги</label>
              <Select
                value={formData.type || "avia"}
                onChange={(value) => setFormData({ ...formData, type: value })}
                options={[
                  { value: "avia", label: "Авиа" },
                  { value: "hotel", label: "Отель" },
                  { value: "transfer", label: "Трансфер" },
                  { value: "train", label: "ЖД" },
                  { value: "visa", label: "Визы" },
                  { value: "insurance", label: "Страховка" },
                  { value: "tour", label: "Экскурсия" },
                ]}
              />
            </div>
            <div className={s.formGroup}>
              <label>Стоимость</label>
              <Input
                value={formData.price || ""}
                onChange={(value) => setFormData({ ...formData, price: value })}
                placeholder="Стоимость"
              />
            </div>
            <div className={s.formGroup}>
              <label>Поставщик</label>
              <Input
                value={formData.supplier || ""}
                onChange={(value) =>
                  setFormData({ ...formData, supplier: value })
                }
                placeholder="Поставщик"
              />
            </div>
            <div className={s.formGroup}>
              <label>Статус поставщика</label>
              <Select
                value={formData.supplierStatus || "pending"}
                onChange={(value) =>
                  setFormData({ ...formData, supplierStatus: value })
                }
                options={[
                  { value: "pending", label: "Ожидает подтверждения" },
                  { value: "confirmed", label: "Подтверждено" },
                  { value: "rejected", label: "Отклонено" },
                  { value: "action_required", label: "Требуется действие" },
                ]}
              />
            </div>
            <div className={s.formGroup}>
              <label>Статус оплаты</label>
              <Select
                value={formData.paymentStatus || "unpaid"}
                onChange={(value) =>
                  setFormData({ ...formData, paymentStatus: value })
                }
                options={[
                  { value: "paid", label: "Оплачено" },
                  { value: "partial", label: "Частично оплачено" },
                  { value: "unpaid", label: "Не оплачено" },
                ]}
              />
            </div>
            <div className={s.formGroup}>
              <label>Дедлайн</label>
              <Input
                type="date"
                value={formData.deadline || ""}
                onChange={(value) =>
                  setFormData({ ...formData, deadline: value })
                }
              />
            </div>
            <div className={s.formGroup}>
              <label>Комментарий</label>
              <Textarea
                value={formData.comment || ""}
                onChange={(value) =>
                  setFormData({ ...formData, comment: value })
                }
                placeholder="Комментарий к услуге"
                rows={4}
              />
            </div>
          </div>
        );
      case "parameters":
        return (
          <div className={s.tabContent}>
            <div className={s.formGroup}>
              <label>Параметры услуги</label>
              <Textarea
                value={formData.parameters || ""}
                onChange={(value) =>
                  setFormData({ ...formData, parameters: value })
                }
                placeholder="Детальные параметры услуги"
                rows={6}
              />
            </div>
            <div className={s.infoNote}>
              Здесь отображаются специфичные параметры в зависимости от типа
              услуги: для авиа - сегменты, класс, тарифы; для отеля - тип
              номера, питание, звездность и т.д.
            </div>
          </div>
        );
      case "passengers":
        return (
          <div className={s.tabContent}>
            <div className={s.passengersList}>
              <div className={s.passengerItem}>
                <span>Петров Иван Сергеевич</span>
                <Button variant="outline" size="sm">
                  Редактировать
                </Button>
              </div>
            </div>
            <Button variant="primary" size="sm">
              Добавить пассажира
            </Button>
          </div>
        );
      case "documents":
        return (
          <div className={s.tabContent}>
            <div className={s.documentsList}>
              <div className={s.documentItem}>
                <span>Авиабилет.pdf</span>
                <span className={s.documentStatus}>Загружен</span>
                <Button variant="outline" size="sm">
                  Скачать
                </Button>
              </div>
            </div>
            <Button variant="primary" size="sm" icon={MdAttachFile}>
              Загрузить документ
            </Button>
          </div>
        );
      case "route":
        return (
          <div className={s.tabContent}>
            <div className={s.formGroup}>
              <label>Маршрут</label>
              <Input
                value={formData.route || ""}
                onChange={(value) => setFormData({ ...formData, route: value })}
                placeholder="Маршрут"
              />
            </div>
            <div className={s.infoNote}>
              Для авиа: сегменты перелёта, пересадки. Для трансфера: точки
              отправления и назначения.
            </div>
          </div>
        );
      case "baggage":
        return (
          <div className={s.tabContent}>
            <div className={s.formGroup}>
              <label>Багаж</label>
              <Input
                value={formData.baggage || ""}
                onChange={(value) =>
                  setFormData({ ...formData, baggage: value })
                }
                placeholder="Информация о багаже"
              />
            </div>
          </div>
        );
      case "conditions":
        return (
          <div className={s.tabContent}>
            <div className={s.formGroup}>
              <label>Условия отмены</label>
              <Textarea
                value={formData.cancellationConditions || ""}
                onChange={(value) =>
                  setFormData({ ...formData, cancellationConditions: value })
                }
                placeholder="Условия отмены"
                rows={4}
              />
            </div>
            <div className={s.formGroup}>
              <label>Дополнительные условия</label>
              <Textarea
                value={formData.additionalConditions || ""}
                onChange={(value) =>
                  setFormData({ ...formData, additionalConditions: value })
                }
                placeholder="Дополнительные условия"
                rows={4}
              />
            </div>
          </div>
        );
      case "history":
        return (
          <div className={s.tabContent}>
            <div className={s.historyList}>
              <div className={s.historyItem}>
                <div className={s.historyHeader}>
                  <span>15.03.2024 14:30</span>
                  <span>Оператор Айгерим М.</span>
                </div>
                <div className={s.historyText}>Изменена стоимость услуги</div>
              </div>
              <div className={s.historyItem}>
                <div className={s.historyHeader}>
                  <span>15.03.2024 10:15</span>
                  <span>Система</span>
                </div>
                <div className={s.historyText}>Услуга создана</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      width="800px"
      title={`Редактирование услуги: ${service.title}`}
    >
      <div className={s.drawer}>
        {/* Tabs */}
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

        {/* Tab Content */}
        <div className={s.content}>{renderTabContent()}</div>

        {/* Footer Actions */}
        <div className={s.footer}>
          <Button variant="outline" size="md" icon={MdChatBubbleOutline}>
            Чат
          </Button>
          <Button variant="outline" size="md" icon={MdHistory}>
            История
          </Button>
          <div className={s.footerRight}>
            <Button
              variant="outline"
              size="md"
              icon={MdDelete}
              onClick={handleDelete}
            >
              Удалить
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={MdSave}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
