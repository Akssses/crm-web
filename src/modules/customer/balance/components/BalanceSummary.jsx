"use client";
import React, { useState } from "react";
import { Button, Modal } from "@/ui";
import { MdAdd, MdPayment, MdInfoOutline, MdWarning } from "react-icons/md";
import TopUpModal from "./TopUpModal";
import PaymentFromBalanceModal from "./PaymentFromBalanceModal";
import s from "../styles/BalanceSummary.module.scss";

const MOCK_BALANCE = {
  available: 125000,
  frozen: 50000,
  pending: 30000,
  overpayment: 15000,
  debt: 0,
  currency: "KGS",
  creditLimit: null, // Для B2B клиентов
  creditUsed: null,
  creditOverdue: null,
  isB2B: false,
};

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "info",
    message: "Ожидается зачисление платежа на сумму 30 000 KGS",
    date: "2025-01-15",
  },
  {
    id: 2,
    type: "warning",
    message: "Приближение к кредитному лимиту: использовано 85%",
    date: "2025-01-14",
  },
];

export default function BalanceSummary() {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className={s.balanceSummary}>
      <div className={s.balanceCards}>
        <div className={s.balanceCard}>
          <div className={s.cardHeader}>
            <h3 className={s.cardTitle}>Доступный баланс</h3>
            <span className={s.cardCurrency}>{MOCK_BALANCE.currency}</span>
          </div>
          <div className={s.cardAmount}>
            {MOCK_BALANCE.available.toLocaleString()}
          </div>
          <div className={s.cardActions}>
            <Button
              variant="primary"
              icon={MdAdd}
              onClick={() => setIsTopUpModalOpen(true)}
            >
              Пополнить
            </Button>
            <Button
              variant="outline"
              icon={MdPayment}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Оплатить заказ
            </Button>
          </div>
        </div>

        <div className={s.balanceCard}>
          <div className={s.cardHeader}>
            <h3 className={s.cardTitle}>Замороженные средства</h3>
          </div>
          <div className={`${s.cardAmount} ${s.cardAmountFrozen}`}>
            {MOCK_BALANCE.frozen.toLocaleString()} {MOCK_BALANCE.currency}
          </div>
          <p className={s.cardDescription}>
            Средства зарезервированы для оплаты заказов
          </p>
        </div>

        <div className={s.balanceCard}>
          <div className={s.cardHeader}>
            <h3 className={s.cardTitle}>Ожидающие зачисления</h3>
          </div>
          <div className={`${s.cardAmount} ${s.cardAmountPending}`}>
            {MOCK_BALANCE.pending.toLocaleString()} {MOCK_BALANCE.currency}
          </div>
          <p className={s.cardDescription}>
            Платежи находятся на проверке
          </p>
        </div>

        {MOCK_BALANCE.overpayment > 0 && (
          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>Переплата</h3>
            </div>
            <div className={`${s.cardAmount} ${s.cardAmountOverpayment}`}>
              {MOCK_BALANCE.overpayment.toLocaleString()}{" "}
              {MOCK_BALANCE.currency}
            </div>
            <p className={s.cardDescription}>
              Излишне уплаченные средства
            </p>
          </div>
        )}

        {MOCK_BALANCE.debt > 0 && (
          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>Задолженность</h3>
            </div>
            <div className={`${s.cardAmount} ${s.cardAmountDebt}`}>
              {MOCK_BALANCE.debt.toLocaleString()} {MOCK_BALANCE.currency}
            </div>
            <p className={s.cardDescription}>
              Требуется погашение задолженности
            </p>
          </div>
        )}

        {MOCK_BALANCE.isB2B && MOCK_BALANCE.creditLimit && (
          <div className={s.balanceCard}>
            <div className={s.cardHeader}>
              <h3 className={s.cardTitle}>Кредитный лимит</h3>
            </div>
            <div className={s.creditInfo}>
              <div className={s.creditRow}>
                <span className={s.creditLabel}>Лимит:</span>
                <span className={s.creditValue}>
                  {MOCK_BALANCE.creditLimit.toLocaleString()}{" "}
                  {MOCK_BALANCE.currency}
                </span>
              </div>
              <div className={s.creditRow}>
                <span className={s.creditLabel}>Использовано:</span>
                <span className={s.creditValue}>
                  {MOCK_BALANCE.creditUsed?.toLocaleString() || 0}{" "}
                  {MOCK_BALANCE.currency}
                </span>
              </div>
              <div className={s.creditRow}>
                <span className={s.creditLabel}>Доступно:</span>
                <span className={s.creditValue}>
                  {(
                    MOCK_BALANCE.creditLimit - (MOCK_BALANCE.creditUsed || 0)
                  ).toLocaleString()}{" "}
                  {MOCK_BALANCE.currency}
                </span>
              </div>
              {MOCK_BALANCE.creditOverdue && MOCK_BALANCE.creditOverdue > 0 && (
                <div className={s.creditRow}>
                  <span className={s.creditLabel}>Просрочка:</span>
                  <span className={`${s.creditValue} ${s.creditValueDanger}`}>
                    {MOCK_BALANCE.creditOverdue.toLocaleString()}{" "}
                    {MOCK_BALANCE.currency}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {MOCK_NOTIFICATIONS.length > 0 && (
        <div className={s.notifications}>
          <h3 className={s.notificationsTitle}>Уведомления</h3>
          <div className={s.notificationsList}>
            {MOCK_NOTIFICATIONS.map((notification) => (
              <div
                key={notification.id}
                className={`${s.notification} ${s[`notification-${notification.type}`]}`}
              >
                {notification.type === "warning" ? (
                  <MdWarning size={20} />
                ) : (
                  <MdInfoOutline size={20} />
                )}
                <div className={s.notificationContent}>
                  <p className={s.notificationMessage}>
                    {notification.message}
                  </p>
                  <span className={s.notificationDate}>
                    {notification.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
      />
      <PaymentFromBalanceModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
}

