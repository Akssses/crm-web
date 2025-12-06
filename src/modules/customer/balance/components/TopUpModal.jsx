"use client";
import React, { useState } from "react";
import { Modal, Button, Input, Select } from "@/ui";
import { MdAttachFile, MdCheckCircle } from "react-icons/md";
import s from "../styles/TopUpModal.module.scss";

const PAYMENT_METHODS = [
  { value: "card", label: "Банковская карта" },
  { value: "bank", label: "Банковский перевод" },
  { value: "legal", label: "Юридическое лицо" },
];

export default function TopUpModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: "",
    currency: "KGS",
    method: "card",
    paymentProof: null,
  });

  const handleSubmit = () => {
    // Логика пополнения
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      amount: "",
      currency: "KGS",
      method: "card",
      paymentProof: null,
    });
  };

  if (step === 2) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleReset();
        }}
        size="md"
        width="500px"
        title="Пополнение баланса"
      >
        <div className={s.successModal}>
          <MdCheckCircle size={48} className={s.successIcon} />
          <h3 className={s.successTitle}>Запрос на пополнение отправлен</h3>
          <p className={s.successText}>
            После проверки платежа средства будут зачислены на ваш баланс. Счёт
            и чек будут отправлены на вашу почту.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
              handleReset();
            }}
          >
            Закрыть
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      width="600px"
      title="Пополнение баланса"
    >
      <div className={s.topUpModal}>
        <div className={s.formSection}>
          <div className={s.formField}>
            <label className={s.fieldLabel}>Сумма пополнения</label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, amount: value }))
              }
              placeholder="Введите сумму"
            />
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Валюта</label>
            <Select
              value={formData.currency}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, currency: value }))
              }
              options={[
                { value: "KGS", label: "KGS" },
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
              ]}
            />
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Способ оплаты</label>
            <Select
              value={formData.method}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, method: value }))
              }
              options={PAYMENT_METHODS}
            />
          </div>

          {formData.method === "bank" && (
            <div className={s.bankInfo}>
              <h4 className={s.bankInfoTitle}>Реквизиты для перевода:</h4>
              <div className={s.bankDetails}>
                <div className={s.bankRow}>
                  <span className={s.bankLabel}>Банк:</span>
                  <span className={s.bankValue}>ОАО "Банк"</span>
                </div>
                <div className={s.bankRow}>
                  <span className={s.bankLabel}>Счёт:</span>
                  <span className={s.bankValue}>12345678901234567890</span>
                </div>
                <div className={s.bankRow}>
                  <span className={s.bankLabel}>БИК:</span>
                  <span className={s.bankValue}>123456789</span>
                </div>
                <div className={s.bankRow}>
                  <span className={s.bankLabel}>Назначение:</span>
                  <span className={s.bankValue}>
                    Пополнение баланса клиента
                  </span>
                </div>
              </div>
            </div>
          )}

          {formData.method === "bank" && (
            <div className={s.formField}>
              <label className={s.fieldLabel}>
                Подтверждение платежа (платёжка)
              </label>
              <Button variant="outline" icon={MdAttachFile}>
                Загрузить файл
              </Button>
              {formData.paymentProof && (
                <span className={s.fileName}>
                  {formData.paymentProof.name}
                </span>
              )}
            </div>
          )}

          {formData.method === "legal" && (
            <div className={s.legalNotice}>
              <p>
                Для юридических лиц будет сформирован счёт на оплату. Документы
                будут отправлены на указанную почту.
              </p>
            </div>
          )}
        </div>

        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Пополнить {formData.amount && `${formData.amount} ${formData.currency}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

