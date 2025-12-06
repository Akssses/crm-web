"use client";
import React, { useState } from "react";
import { Modal, Button, Select, Input, Textarea } from "@/ui";
import { MdAttachFile } from "react-icons/md";
import s from "../styles/RefundRequestModal.module.scss";

const REFUND_TYPES = [
  { value: "service", label: "По услуге (перелёт, отель, трансфер)" },
  { value: "order", label: "По всему заказу" },
  { value: "supplier_cancel", label: "Из-за отмены поставщика" },
  { value: "personal", label: "По личной причине" },
];

const REFUND_REASONS = [
  { value: "cancellation", label: "Отмена поездки" },
  { value: "supplier_error", label: "Ошибка поставщика" },
  { value: "price_change", label: "Изменение цены" },
  { value: "other", label: "Другое" },
];

export default function RefundRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    type: "",
    order: "",
    service: "",
    amount: "",
    partial: false,
    requisites: "",
    reason: "",
    comment: "",
    files: [],
  });

  const handleSubmit = () => {
    console.log("Requesting refund:", formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="700px"
      title="Запрос на возврат"
    >
      <div className={s.refundRequestModal}>
        <div className={s.formSection}>
          <div className={s.formField}>
            <label className={s.fieldLabel}>Тип возврата</label>
            <Select
              value={formData.type}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
              options={REFUND_TYPES}
              placeholder="Выберите тип возврата"
            />
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Заказ</label>
            <Select
              value={formData.order}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, order: value }))
              }
              options={[
                { value: "ORD-145", label: "ORD-145" },
                { value: "ORD-144", label: "ORD-144" },
              ]}
              placeholder="Выберите заказ"
            />
          </div>

          {formData.type === "service" && (
            <div className={s.formField}>
              <label className={s.fieldLabel}>Услуга</label>
              <Select
                value={formData.service}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, service: value }))
                }
                options={[
                  { value: "SRV-001", label: "SRV-001 - Отель" },
                  { value: "SRV-002", label: "SRV-002 - Перелёт" },
                ]}
                placeholder="Выберите услугу"
              />
            </div>
          )}

          <div className={s.formField}>
            <label className={s.fieldLabel}>Сумма возврата</label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, amount: value }))
              }
              placeholder="Введите сумму"
            />
            <span className={s.hint}>Оставьте пустым для полного возврата</span>
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Реквизиты для выплаты</label>
            <Input
              value={formData.requisites}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, requisites: value }))
              }
              placeholder="Номер карты или счёт"
            />
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Причина возврата</label>
            <Select
              value={formData.reason}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, reason: value }))
              }
              options={REFUND_REASONS}
              placeholder="Выберите причину"
            />
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Комментарий</label>
            <Textarea
              value={formData.comment}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, comment: value }))
              }
              placeholder="Дополнительная информация"
              minRows={3}
            />
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Дополнительные файлы</label>
            <Button variant="outline" icon={MdAttachFile}>
              Прикрепить файлы
            </Button>
            {formData.files.length > 0 && (
              <div className={s.filesList}>
                {formData.files.map((file, idx) => (
                  <div key={idx} className={s.fileItem}>
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Отправить запрос
          </Button>
        </div>
      </div>
    </Modal>
  );
}
