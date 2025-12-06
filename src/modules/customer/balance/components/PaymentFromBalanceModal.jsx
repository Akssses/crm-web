"use client";
import React, { useState } from "react";
import { Modal, Button, Select, Input } from "@/ui";
import { MdCheckCircle } from "react-icons/md";
import s from "../styles/PaymentFromBalanceModal.module.scss";

const MOCK_ORDERS = [
  { value: "ORD-145", label: "ORD-145 - Тур в Турцию (175 000 KGS)" },
  { value: "ORD-144", label: "ORD-144 - Отель в Дубае (95 000 KGS)" },
  { value: "ORD-143", label: "ORD-143 - Перелёт в Москву (45 000 KGS)" },
];

const PAYMENT_METHODS = [
  { value: "balance", label: "С баланса" },
  { value: "external", label: "Внешний платёж" },
  { value: "combined", label: "Комбинированный" },
];

export default function PaymentFromBalanceModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    order: "",
    amount: "",
    method: "balance",
    balanceAmount: "",
    externalAmount: "",
  });

  const MOCK_BALANCE = 125000;
  const selectedOrder = MOCK_ORDERS.find((o) => o.value === formData.order);
  const orderTotal = selectedOrder
    ? parseInt(selectedOrder.label.match(/\d+/g)?.[1] || "0")
    : 0;

  const handleAmountChange = (value) => {
    const amount = parseFloat(value) || 0;
    setFormData((prev) => {
      if (prev.method === "combined") {
        const balanceAmount = Math.min(amount, MOCK_BALANCE);
        const externalAmount = amount - balanceAmount;
        return {
          ...prev,
          amount: value,
          balanceAmount: balanceAmount.toString(),
          externalAmount: externalAmount.toString(),
        };
      }
      return { ...prev, amount: value };
    });
  };

  const handleMethodChange = (value) => {
    setFormData((prev) => {
      if (value === "combined") {
        const amount = parseFloat(prev.amount) || 0;
        const balanceAmount = Math.min(amount, MOCK_BALANCE);
        const externalAmount = amount - balanceAmount;
        return {
          ...prev,
          method: value,
          balanceAmount: balanceAmount.toString(),
          externalAmount: externalAmount.toString(),
        };
      }
      return { ...prev, method: value, balanceAmount: "", externalAmount: "" };
    });
  };

  const handlePayFull = () => {
    if (formData.method === "combined") {
      const balanceAmount = Math.min(orderTotal, MOCK_BALANCE);
      const externalAmount = orderTotal - balanceAmount;
      setFormData((prev) => ({
        ...prev,
        amount: orderTotal.toString(),
        balanceAmount: balanceAmount.toString(),
        externalAmount: externalAmount.toString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        amount: orderTotal.toString(),
      }));
    }
  };

  const handleSubmit = () => {
    // Логика оплаты
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      order: "",
      amount: "",
      method: "balance",
      balanceAmount: "",
      externalAmount: "",
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
        title="Оплата заказа"
      >
        <div className={s.successModal}>
          <MdCheckCircle size={48} className={s.successIcon} />
          <h3 className={s.successTitle}>Оплата успешно выполнена</h3>
          <p className={s.successText}>
            {formData.method === "combined" ? (
              <>
                С баланса списано: {formData.balanceAmount} KGS
                <br />
                Внешний платёж: {formData.externalAmount} KGS
              </>
            ) : (
              <>С баланса списано: {formData.amount} KGS</>
            )}
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
      width="700px"
      title="Оплата заказа с баланса"
    >
      <div className={s.paymentModal}>
        <div className={s.balanceInfo}>
          <div className={s.balanceRow}>
            <span className={s.balanceLabel}>Доступный баланс:</span>
            <span className={s.balanceValue}>
              {MOCK_BALANCE.toLocaleString()} KGS
            </span>
          </div>
        </div>

        <div className={s.formSection}>
          <div className={s.formField}>
            <label className={s.fieldLabel}>Заказ</label>
            <Select
              value={formData.order}
              onChange={(value) => setFormData((prev) => ({ ...prev, order: value }))}
              options={MOCK_ORDERS}
              placeholder="Выберите заказ"
            />
            {selectedOrder && (
              <div className={s.orderInfo}>
                <span className={s.orderTotal}>
                  Сумма заказа: {orderTotal.toLocaleString()} KGS
                </span>
                <Button variant="outline" size="sm" onClick={handlePayFull}>
                  Оплатить полностью
                </Button>
              </div>
            )}
          </div>

          <div className={s.formField}>
            <label className={s.fieldLabel}>Способ оплаты</label>
            <Select
              value={formData.method}
              onChange={handleMethodChange}
              options={PAYMENT_METHODS}
            />
          </div>

          {formData.method === "balance" && (
            <div className={s.formField}>
              <label className={s.fieldLabel}>Сумма к списанию</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="Введите сумму"
              />
              <span className={s.hint}>
                Максимум: {MOCK_BALANCE.toLocaleString()} KGS
              </span>
            </div>
          )}

          {formData.method === "external" && (
            <div className={s.formField}>
              <label className={s.fieldLabel}>Сумма внешнего платежа</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="Введите сумму"
              />
            </div>
          )}

          {formData.method === "combined" && (
            <>
              <div className={s.formField}>
                <label className={s.fieldLabel}>Общая сумма оплаты</label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  placeholder="Введите сумму"
                />
              </div>
              <div className={s.combinedPayment}>
                <div className={s.combinedRow}>
                  <span className={s.combinedLabel}>С баланса:</span>
                  <span className={s.combinedValue}>
                    {formData.balanceAmount || "0"} KGS
                  </span>
                </div>
                <div className={s.combinedRow}>
                  <span className={s.combinedLabel}>Внешний платёж:</span>
                  <span className={s.combinedValue}>
                    {formData.externalAmount || "0"} KGS
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.order || !formData.amount}
          >
            Оплатить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

