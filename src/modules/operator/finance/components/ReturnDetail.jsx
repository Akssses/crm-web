"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Textarea } from "@/ui";
import {
  MdEdit,
  MdSave,
  MdCancel,
  MdPictureAsPdf,
  MdHistory,
} from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import s from "../styles/ReturnDetail.module.scss";

const RETURN_SOURCES = [
  { value: "to_client", label: "Клиенту" },
  { value: "from_supplier", label: "От поставщика" },
  { value: "internal", label: "Внутренний" },
];

const RETURN_STATUSES = [
  { value: "returned", label: "Возвращено" },
  { value: "partial", label: "Частичный возврат" },
  { value: "pending", label: "В ожидании" },
];

const RETURN_REASONS = [
  { value: "cancellation", label: "Отмена заказа клиентом" },
  { value: "order_change", label: "Изменение условий заказа" },
  { value: "service_mismatch", label: "Несоответствие услуги" },
  { value: "supplier_error", label: "Ошибка поставщика" },
  { value: "overpayment", label: "Переплата" },
  { value: "other", label: "Другое" },
];

export default function ReturnDetail() {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: params.id || "RET-001",
    orderId: "ORD-123",
    serviceId: "SRV-001",
    serviceName: "Авиаперелёт (туда)",
    client: "Иван Иванов",
    type: "full",
    typeLabel: "Полный возврат",
    amount: 32000,
    currency: "KGS",
    exchangeRate: 1,
    status: "returned",
    date: "2025-10-10",
    reason: "cancellation",
    source: "to_client",
    comment: "",
  });

  const handleSave = () => {
    // TODO: Save return
    console.log("Save return", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleGeneratePDF = () => {
    // TODO: Generate PDF document
    console.log("Generate PDF for return", formData.id);
  };

  const historyItems = [
    {
      date: "10.10.2025 14:30",
      user: "Оператор Айсулуу М.",
      action: "Изменен статус",
      field: "Статус",
      was: "В ожидании",
      became: "Возвращено",
    },
    {
      date: "10.10.2025 10:15",
      user: "Система",
      action: "Возврат создан",
      field: null,
      was: null,
      became: null,
    },
  ];

  return (
    <div className={s.returnDetail}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h2 className={s.title}>Возврат {formData.id}</h2>
          <div className={s.breadcrumbs}>
            <Link href="/operator/finance">Финансы</Link>
            <span>/</span>
            <Link href="/operator/finance?tab=returns">Возвраты</Link>
            <span>/</span>
            <span>{formData.id}</span>
          </div>
        </div>
        <div className={s.headerActions}>
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="md"
                icon={MdCancel}
                onClick={handleCancel}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={MdSave}
                onClick={handleSave}
              >
                Сохранить
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="md"
                icon={MdPictureAsPdf}
                onClick={handleGeneratePDF}
              >
                Скачать PDF
              </Button>
              <Button variant="outline" size="md" icon={MdHistory}>
                История
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={MdEdit}
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={s.content}>
        <div className={s.mainInfo}>
          <div className={s.infoCard}>
            <h3 className={s.cardTitle}>Основная информация</h3>
            <div className={s.infoGrid}>
              <div className={s.infoField}>
                <label>Заказ</label>
                <Link
                  href={`/operator/orders/${formData.orderId}`}
                  className={s.link}
                >
                  {formData.orderId}
                </Link>
              </div>
              <div className={s.infoField}>
                <label>Услуга</label>
                <div className={s.serviceInfo}>
                  <Link
                    href={`/operator/services/${formData.serviceId}`}
                    className={s.link}
                  >
                    {formData.serviceName}
                  </Link>
                  <span className={s.serviceId}>{formData.serviceId}</span>
                </div>
              </div>
              <div className={s.infoField}>
                <label>Клиент</label>
                <span>{formData.client}</span>
              </div>
              <div className={s.infoField}>
                <label>Тип возврата</label>
                {isEditing ? (
                  <Select
                    value={formData.type}
                    onChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                    options={[
                      { value: "full", label: "Полный возврат" },
                      { value: "partial", label: "Частичный возврат" },
                    ]}
                  />
                ) : (
                  <span>{formData.typeLabel}</span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Сумма</label>
                {isEditing ? (
                  <div className={s.amountInputs}>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          amount: parseFloat(value) || 0,
                        })
                      }
                      placeholder="Сумма"
                    />
                    <Select
                      value={formData.currency}
                      onChange={(value) =>
                        setFormData({ ...formData, currency: value })
                      }
                      options={[
                        { value: "KGS", label: "KGS" },
                        { value: "USD", label: "USD" },
                        { value: "RUB", label: "RUB" },
                        { value: "EUR", label: "EUR" },
                      ]}
                    />
                  </div>
                ) : (
                  <span className={s.amount}>
                    {formData.amount.toLocaleString()} {formData.currency}
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Курс валюты</label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.exchangeRate}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        exchangeRate: parseFloat(value) || 1,
                      })
                    }
                    placeholder="Курс"
                  />
                ) : (
                  <span>
                    1 {formData.currency} = {formData.exchangeRate} KGS
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Статус</label>
                {isEditing ? (
                  <Select
                    value={formData.status}
                    onChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                    options={RETURN_STATUSES}
                  />
                ) : (
                  <span className={s.statusBadge}>
                    {
                      RETURN_STATUSES.find((s) => s.value === formData.status)
                        ?.label
                    }
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Источник возврата</label>
                {isEditing ? (
                  <Select
                    value={formData.source}
                    onChange={(value) =>
                      setFormData({ ...formData, source: value })
                    }
                    options={RETURN_SOURCES}
                  />
                ) : (
                  <span>
                    {
                      RETURN_SOURCES.find((s) => s.value === formData.source)
                        ?.label
                    }
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Причина возврата</label>
                {isEditing ? (
                  <Select
                    value={formData.reason}
                    onChange={(value) =>
                      setFormData({ ...formData, reason: value })
                    }
                    options={RETURN_REASONS}
                  />
                ) : (
                  <span>
                    {
                      RETURN_REASONS.find((r) => r.value === formData.reason)
                        ?.label
                    }
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Дата возврата</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(value) =>
                      setFormData({ ...formData, date: value })
                    }
                  />
                ) : (
                  <span>{formData.date}</span>
                )}
              </div>
              <div className={s.infoFieldFull}>
                <label>Комментарий</label>
                {isEditing ? (
                  <Textarea
                    value={formData.comment}
                    onChange={(value) =>
                      setFormData({ ...formData, comment: value })
                    }
                    placeholder="Комментарий к возврату"
                    rows={3}
                  />
                ) : (
                  <span>{formData.comment || "—"}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={s.historySection}>
          <h3 className={s.sectionTitle}>История изменений</h3>
          <div className={s.historyList}>
            {historyItems.map((item, idx) => (
              <div key={idx} className={s.historyItem}>
                <div className={s.historyHeader}>
                  <span className={s.historyDate}>{item.date}</span>
                  <span className={s.historyUser}>{item.user}</span>
                </div>
                <div className={s.historyAction}>{item.action}</div>
                {item.field && (
                  <div className={s.historyChange}>
                    <span className={s.historyField}>{item.field}:</span>
                    {item.was && (
                      <span className={s.historyWas}>{item.was}</span>
                    )}
                    {item.was && <span className={s.historyArrow}>→</span>}
                    <span className={s.historyBecame}>{item.became}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
