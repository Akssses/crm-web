"use client";
import React, { useState } from "react";
import s from "../styles/TransactionInfoModal.module.scss";
import { Modal, Button } from "@/ui";
import { FaEdit, FaDownload } from "react-icons/fa";
import { BsBank } from "react-icons/bs";

export default function TransactionInfoModal({
  isOpen,
  onClose,
  transaction = {},
  onEdit,
  onArchive,
}) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "Общие данные" },
    { id: "payments", label: "Расчёты и связи" },
    { id: "documents", label: "Документы" },
    { id: "history", label: "История изменений" },
    { id: "refunds", label: "Возвраты и корректировки" },
  ];

  const InfoRow = ({ label, value, isBold = false }) => (
    <div className={s.infoRow}>
      <span className={s.label}>{label}</span>
      <span className={`${s.value} ${isBold ? s.bold : ""}`}>{value}</span>
    </div>
  );

  const StatusBadge = ({ text, color }) => {
    const colors = {
      green: "#10b981",
      pink: "#ec4899",
      orange: "#f97316",
      purple: "#a855f7",
      blue: "#3b82f6",
    };

    return (
      <span
        style={{
          backgroundColor: `${colors[color]}20`,
          color: colors[color],
          padding: "6px 12px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "600",
          whiteSpace: "nowrap",
        }}
      >
        • {text}
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Информация транзакции"
      position="right"
      width="50%"
      icon={BsBank}
    >
      <div className={s.modalContent}>
        <div>
          <div className={s.header}>
            <div className={s.headerTitle}>
              <h3>{transaction?.id || "PAY-2025-101"}</h3>
              <p>{transaction?.orderId || "#ORD-145"}</p>
            </div>
            <div className={s.headerStatus}>
              <StatusBadge
                text={transaction?.status || "Оплачено"}
                color={transaction?.statusColor || "green"}
              />
            </div>
          </div>
          <div className={s.tabs}>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={`${activeTab === tab.id ? "bgblue" : "outline"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className={s.tabContent}>
            {activeTab === "general" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="Номер транзакции"
                  value={transaction?.id || "PAY-2025-101"}
                />
                <InfoRow
                  label="Дата операции"
                  value={transaction?.date || "23.10.2025"}
                />
                <InfoRow
                  label="Организация"
                  value={transaction?.organization || "Asia Travel"}
                />
                <InfoRow
                  label="Клиент"
                  value={transaction?.client || "Иван Петров"}
                />
                <InfoRow
                  label="Тип операции"
                  value={transaction?.operationType || "Оплата"}
                />
                <InfoRow
                  label="Сумма"
                  value={transaction?.sum || "45,200 KGS"}
                  isBold
                />
                <InfoRow
                  label="Валюта"
                  value={transaction?.currency || "KGS"}
                />
                <InfoRow
                  label="Комиссия"
                  value={transaction?.commission || "1500"}
                />
                <InfoRow
                  label="Метод оплаты"
                  value={transaction?.paymentMethod || "Банковская карта"}
                />
                <InfoRow
                  label="Курс валюты"
                  value={transaction?.exchangeRate || "1 USD = 89.5 KGS"}
                />
              </div>
            )}

            {/* РАСЧЁТЫ И СВЯЗИ */}
            {activeTab === "payments" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="Сумма заказа"
                  value={transaction?.orderSum || "50 000 RUB"}
                />
                <InfoRow
                  label="Оплачено"
                  value={transaction?.paidAmount || "45 200 RUB"}
                />
                <InfoRow
                  label="Задолженность"
                  value={transaction?.debtAmount || "4 800 RUB"}
                />
                <InfoRow
                  label="Переплата"
                  value={transaction?.overpayAmount || "0 RUB"}
                />
                <InfoRow
                  label="Комиссия платёжной системы"
                  value={transaction?.psCommission || "350 RUB"}
                />
                <InfoRow
                  label="Комиссия агента"
                  value={transaction?.agentCommission || "1 500 RUB"}
                />
                <InfoRow
                  label="Чистая сумма к зачислению"
                  value={transaction?.netSum || "43 700 RUB"}
                  isBold
                />
                <InfoRow
                  label="Статья учёта"
                  value={transaction?.glAccount || "Доходы по авиаперевозкам"}
                />
                <InfoRow
                  label="Источник платежа"
                  value={transaction?.sourceLabel || "Эквайринг (Tinkoff)"}
                />
                <InfoRow
                  label="Привязанные услуги"
                  value={transaction?.services || "Авиа, Отель"}
                />
              </div>
            )}

            {/* ДОКУМЕНТЫ */}
            {activeTab === "documents" && (
              <div className={s.infoGroup}>
                <p className={s.emptyMessage}>Документов нет</p>
              </div>
            )}

            {activeTab === "history" && (
              <div className={s.infoGroup}>
                <InfoRow
                  label="23.10.2025 12:45"
                  value="Платёж подтверждён банком, проведён в CRM"
                />
                <InfoRow
                  label="23.10.2025 12:20"
                  value="Получен callback от эквайринга, статус 'успешно'"
                />
                <InfoRow
                  label="23.10.2025 12:18"
                  value="Создан платёж по заказу ORD-145, инициатор — оператор"
                />
              </div>
            )}

            {/* ВОЗВРАТЫ И КОРРЕКТИРОВКИ */}
            {activeTab === "refunds" && (
              <div className={s.infoGroup}>
                <div style={{ padding: "20px", textAlign: "center" }}>
                  <p className={s.emptyMessage}>Возвратов нет.</p>
                </div>
                {transaction?.refundDetails && (
                  <>
                    <InfoRow
                      label="Сумма возврата"
                      value={transaction?.refundDetails.sum}
                    />
                    <InfoRow
                      label="Причина возврата"
                      value={transaction?.refundDetails.reason}
                    />
                    <InfoRow
                      label="Дата возврата"
                      value={transaction?.refundDetails.date}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={s.actions}>
          <Button
            variant="outline"
            icon={FaEdit}
            onClick={() => {
              onEdit?.(transaction);
              onClose();
            }}
          >
            Редактировать
          </Button>
          <Button
            variant="outline"
            icon={FaDownload}
            onClick={() => {
              onArchive?.(transaction?.id);
              onClose();
            }}
          >
            Архивировать
          </Button>
        </div>
      </div>
    </Modal>
  );
}
