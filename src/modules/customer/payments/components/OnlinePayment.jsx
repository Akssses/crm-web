"use client";
import React, { useState } from "react";
import { Button, Input, Select, Modal } from "@/ui";
import { MdPayment, MdCheckCircle } from "react-icons/md";
import s from "../styles/OnlinePayment.module.scss";

const PAYMENT_METHODS = [
  { value: "card", label: "Банковская карта" },
  { value: "bank", label: "Банковский перевод" },
  { value: "legal", label: "Юридическое лицо" },
];

export default function OnlinePayment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    order: "ORD-145",
    amount: 0,
    method: "card",
    partial: false,
  });

  const remainingAmount = 0; // Из контекста заказа

  const handleAmountChange = (value) => {
    setPaymentData((prev) => ({
      ...prev,
      amount: parseFloat(value) || 0,
    }));
  };

  const handlePayFull = () => {
    setPaymentData((prev) => ({
      ...prev,
      amount: remainingAmount,
      partial: false,
    }));
    setIsModalOpen(true);
  };

  const handlePayPartial = () => {
    setPaymentData((prev) => ({
      ...prev,
      partial: true,
    }));
    setIsModalOpen(true);
  };

  return (
    <div className={s.onlinePayment}>
      <div className={s.paymentCard}>
        <h3 className={s.cardTitle}>Онлайн-оплата</h3>
        <div className={s.paymentInfo}>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Заказ:</span>
            <span className={s.infoValue}>{paymentData.order}</span>
          </div>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>Остаток к оплате:</span>
            <span className={s.infoValue}>
              {remainingAmount.toLocaleString()} KGS
            </span>
          </div>
        </div>
        <div className={s.paymentActions}>
          <Button variant="primary" icon={MdPayment} onClick={handlePayFull}>
            Оплатить полностью
          </Button>
          <Button variant="outline" onClick={handlePayPartial}>
            Оплатить частично
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
        />
      )}
    </div>
  );
}

function PaymentModal({ isOpen, onClose, paymentData, setPaymentData }) {
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    holder: "",
  });

  const handleSubmit = () => {
    // Логика оплаты
    setStep(2);
  };

  if (step === 2) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        width="500px"
        title="Оплата успешна"
      >
        <div className={s.successModal}>
          <MdCheckCircle size={48} className={s.successIcon} />
          <h3 className={s.successTitle}>Оплата успешно выполнена</h3>
          <p className={s.successText}>
            Сумма {paymentData.amount.toLocaleString()} KGS успешно списана с
            вашей карты
          </p>
          <Button variant="primary" onClick={onClose}>
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
      title="Онлайн-оплата"
    >
      <div className={s.paymentModal}>
        <div className={s.modalSection}>
          <div className={s.formField}>
            <label className={s.fieldLabel}>Сумма оплаты</label>
            <Input
              type="number"
              value={paymentData.amount}
              onChange={(value) =>
                setPaymentData((prev) => ({
                  ...prev,
                  amount: parseFloat(value) || 0,
                }))
              }
              placeholder="Введите сумму"
            />
            {paymentData.partial && (
              <span className={s.hint}>
                Остаток к оплате: {paymentData.amount.toLocaleString()} KGS
              </span>
            )}
          </div>
          <div className={s.formField}>
            <label className={s.fieldLabel}>Метод оплаты</label>
            <Select
              value={paymentData.method}
              onChange={(value) =>
                setPaymentData((prev) => ({ ...prev, method: value }))
              }
              options={PAYMENT_METHODS}
            />
          </div>
          {paymentData.method === "card" && (
            <>
              <div className={s.formField}>
                <label className={s.fieldLabel}>Номер карты</label>
                <Input
                  value={cardData.number}
                  onChange={(value) =>
                    setCardData((prev) => ({ ...prev, number: value }))
                  }
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                />
              </div>
              <div className={s.cardRow}>
                <div className={s.formField}>
                  <label className={s.fieldLabel}>Срок действия</label>
                  <Input
                    value={cardData.expiry}
                    onChange={(value) =>
                      setCardData((prev) => ({ ...prev, expiry: value }))
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className={s.formField}>
                  <label className={s.fieldLabel}>CVV</label>
                  <Input
                    type="password"
                    value={cardData.cvv}
                    onChange={(value) =>
                      setCardData((prev) => ({ ...prev, cvv: value }))
                    }
                    placeholder="000"
                    maxLength={3}
                  />
                </div>
              </div>
              <div className={s.formField}>
                <label className={s.fieldLabel}>Имя держателя</label>
                <Input
                  value={cardData.holder}
                  onChange={(value) =>
                    setCardData((prev) => ({ ...prev, holder: value }))
                  }
                  placeholder="IVAN PETROV"
                />
              </div>
            </>
          )}
          {paymentData.method === "legal" && (
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
            Оплатить {paymentData.amount.toLocaleString()} KGS
          </Button>
        </div>
      </div>
    </Modal>
  );
}
