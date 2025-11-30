"use client";
import React, { useState } from "react";
import { Container, Button, Input, Select, Textarea } from "@/ui";
import {
  MdEdit,
  MdSave,
  MdCancel,
  MdHistory,
  MdAttachFile,
} from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import s from "../styles/PaymentDetail.module.scss";

const PAYMENT_TYPES = [
  { value: "payment", label: "Оплата" },
  { value: "prepayment", label: "Предоплата" },
  { value: "refund", label: "Возврат" },
  { value: "withholding", label: "Удержание" },
  { value: "adjustment", label: "Корректировка" },
];

const STATUSES = [
  { value: "paid", label: "Оплачено" },
  { value: "partial", label: "Частично оплачено" },
  { value: "pending", label: "В ожидании" },
  { value: "cancelled", label: "Отменено" },
];

const SOURCES = [
  { value: "bank_transfer", label: "Банковский перевод" },
  { value: "card", label: "Карта" },
  { value: "cash", label: "Наличные" },
  { value: "other", label: "Другое" },
];

export default function PaymentDetail() {
  const router = useRouter();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: params.id || "PAY-001",
    orderId: "ORD-123",
    serviceId: "SRV-001",
    serviceName: "Авиаперелёт (туда)",
    client: "Иван Иванов",
    type: "payment",
    amount: 32000,
    currency: "KGS",
    exchangeRate: 1,
    status: "paid",
    date: "2025-10-10",
    source: "bank_transfer",
    paymentDate: "2025-10-10",
    comment: "",
  });

  const handleSave = () => {
    // TODO: Save payment
    console.log("Save payment", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form data
  };

  const historyItems = [
    {
      date: "10.10.2025 14:30",
      user: "Оператор Айсулуу М.",
      action: "Изменен статус",
      field: "Статус",
      was: "В ожидании",
      became: "Оплачено",
    },
    {
      date: "10.10.2025 10:15",
      user: "Система",
      action: "Платёж создан",
      field: null,
      was: null,
      became: null,
    },
  ];

  return (
    <div className={s.paymentDetail}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h2 className={s.title}>Платёж {formData.id}</h2>
          <div className={s.breadcrumbs}>
            <Link href="/operator/finance">Финансы</Link>
            <span>/</span>
            <Link href="/operator/finance?tab=payments">Платежи</Link>
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
                <label>Тип платежа</label>
                {isEditing ? (
                  <Select
                    value={formData.type}
                    onChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                    options={PAYMENT_TYPES}
                  />
                ) : (
                  <span>
                    {
                      PAYMENT_TYPES.find((t) => t.value === formData.type)
                        ?.label
                    }
                  </span>
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
                    options={STATUSES}
                  />
                ) : (
                  <span className={s.statusBadge}>
                    {STATUSES.find((s) => s.value === formData.status)?.label}
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Дата платежа</label>
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
              <div className={s.infoField}>
                <label>Источник</label>
                {isEditing ? (
                  <Select
                    value={formData.source}
                    onChange={(value) =>
                      setFormData({ ...formData, source: value })
                    }
                    options={SOURCES}
                  />
                ) : (
                  <span>
                    {SOURCES.find((s) => s.value === formData.source)?.label}
                  </span>
                )}
              </div>
              <div className={s.infoField}>
                <label>Дата поступления</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={formData.paymentDate || ""}
                    onChange={(value) =>
                      setFormData({ ...formData, paymentDate: value })
                    }
                  />
                ) : (
                  <span>{formData.paymentDate || "—"}</span>
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
                    placeholder="Комментарий к платежу"
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
