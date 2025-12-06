"use client";
import React, { useState } from "react";
import { Button, Modal } from "@/ui";
import {
  MdAdd,
  MdWarning,
  MdCheckCircle,
  MdInfoOutline,
  MdAttachMoney,
  MdHistory,
  MdDescription,
} from "react-icons/md";
import s from "../styles/SupplierDetailModal.module.scss";

const SERVICE_STATUS_LABELS = {
  to_pay: "К оплате",
  pending: "Ожидает подтверждения",
  partially_paid: "Частично оплачено",
  disputed: "Спорная позиция",
  overdue: "Просрочено",
};

const SERVICE_STATUS_COLORS = {
  to_pay: "blue",
  pending: "yellow",
  partially_paid: "orange",
  disputed: "red",
  overdue: "red",
};

export default function SupplierDetailModal({
  supplier,
  isOpen,
  onClose,
  onCreatePayout,
}) {
  const [activeTab, setActiveTab] = useState("overview"); // overview, services, history, finance

  if (!supplier) return null;

  const formatAmount = (amount, currency) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const getStatusBadgeClass = (status) => {
    return s[`status-${SERVICE_STATUS_COLORS[status] || "gray"}`];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      width="900px"
      title={supplier.name}
    >
      <div className={s.modalContent}>
        <div className={s.modalSubtitle}>
          <span>Валюта: {supplier.currency}</span>
          <span>•</span>
          <span>Услуг: {supplier.servicesCount}</span>
          <span>•</span>
          <span>SLA: {supplier.slaLevel}</span>
        </div>

        <div className={s.tabs}>
          <button
            className={`${s.tab} ${activeTab === "overview" ? s.active : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Обзор
          </button>
          <button
            className={`${s.tab} ${activeTab === "services" ? s.active : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Услуги
          </button>
          <button
            className={`${s.tab} ${activeTab === "finance" ? s.active : ""}`}
            onClick={() => setActiveTab("finance")}
          >
            Финансы
          </button>
          <button
            className={`${s.tab} ${activeTab === "history" ? s.active : ""}`}
            onClick={() => setActiveTab("history")}
          >
            История
          </button>
        </div>

        <div className={s.modalBody}>
          {activeTab === "overview" && (
            <div className={s.overviewTab}>
              <div className={s.statsGrid}>
                <div className={s.statCard}>
                  <div className={s.statLabel}>Текущая задолженность</div>
                  <div className={s.statValue}>
                    {formatAmount(supplier.totalDebt, supplier.currency)}
                  </div>
                </div>
                <div className={s.statCard}>
                  <div className={s.statLabel}>К выплате сегодня</div>
                  <div className={`${s.statValue} ${s.statValueUrgent}`}>
                    {formatAmount(supplier.toPayToday, supplier.currency)}
                  </div>
                </div>
                <div className={s.statCard}>
                  <div className={s.statLabel}>Просрочено</div>
                  <div className={`${s.statValue} ${s.statValueDanger}`}>
                    {formatAmount(supplier.overdue, supplier.currency)}
                  </div>
                </div>
                <div className={s.statCard}>
                  <div className={s.statLabel}>Будущие обязательства</div>
                  <div className={s.statValue}>
                    {formatAmount(supplier.future, supplier.currency)}
                  </div>
                </div>
                <div className={s.statCard}>
                  <div className={s.statLabel}>Выплачено за месяц</div>
                  <div className={s.statValue}>
                    {formatAmount(supplier.paidThisMonth, supplier.currency)}
                  </div>
                </div>
                <div className={s.statCard}>
                  <div className={s.statLabel}>Маржа за месяц</div>
                  <div className={`${s.statValue} ${s.statValueSuccess}`}>
                    {formatAmount(supplier.margin, supplier.currency)}
                  </div>
                </div>
              </div>

              <div className={s.financialInfo}>
                <h3 className={s.sectionTitle}>Финансовые условия</h3>
                <div className={s.infoGrid}>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Условия оплаты:</span>
                    <span className={s.infoValue}>{supplier.paymentTerms}</span>
                  </div>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Валюта договора:</span>
                    <span className={s.infoValue}>
                      {supplier.contractCurrency}
                    </span>
                  </div>
                  <div className={s.infoItem}>
                    <span className={s.infoLabel}>Курс обмена:</span>
                    <span className={s.infoValue}>
                      {supplier.exchangeRate} {supplier.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className={s.servicesTab}>
              <div className={s.servicesHeader}>
                <h3 className={s.sectionTitle}>Услуги к оплате</h3>
                <Button
                  variant="primary"
                  icon={MdAdd}
                  onClick={onCreatePayout}
                >
                  Создать выплату
                </Button>
              </div>
              <div className={s.servicesList}>
                {supplier.services?.map((service) => (
                  <div key={service.id} className={s.serviceItem}>
                    <div className={s.serviceInfo}>
                      <div className={s.serviceId}>{service.id}</div>
                      <div className={s.serviceAmount}>
                        {formatAmount(service.amount, supplier.currency)}
                      </div>
                      <div className={s.serviceDate}>
                        Срок: {new Date(service.dueDate).toLocaleDateString("ru-RU")}
                      </div>
                    </div>
                    <div className={s.serviceStatus}>
                      <span
                        className={`${s.statusBadge} ${getStatusBadgeClass(
                          service.status
                        )}`}
                      >
                        {SERVICE_STATUS_LABELS[service.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className={s.financeTab}>
              <h3 className={s.sectionTitle}>Детальная финансовая информация</h3>
              <div className={s.financeDetails}>
                <div className={s.financeSection}>
                  <h4 className={s.subsectionTitle}>Баланс</h4>
                  <div className={s.balanceGrid}>
                    <div className={s.balanceItem}>
                      <span className={s.balanceLabel}>Задолженность:</span>
                      <span className={s.balanceValue}>
                        {formatAmount(supplier.totalDebt, supplier.currency)}
                      </span>
                    </div>
                    <div className={s.balanceItem}>
                      <span className={s.balanceLabel}>Выплачено:</span>
                      <span className={s.balanceValue}>
                        {formatAmount(supplier.paidThisMonth, supplier.currency)}
                      </span>
                    </div>
                    <div className={s.balanceItem}>
                      <span className={s.balanceLabel}>
                        Ожидает списания:
                      </span>
                      <span className={s.balanceValue}>
                        {formatAmount(supplier.toPayToday, supplier.currency)}
                      </span>
                    </div>
                    <div className={s.balanceItem}>
                      <span className={s.balanceLabel}>
                        Прогнозируемые обязательства:
                      </span>
                      <span className={s.balanceValue}>
                        {formatAmount(supplier.future, supplier.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={s.financeSection}>
                  <h4 className={s.subsectionTitle}>Условия договора</h4>
                  <div className={s.contractInfo}>
                    <div className={s.contractItem}>
                      <span>Комиссии:</span>
                      <span>3% от суммы услуги</span>
                    </div>
                    <div className={s.contractItem}>
                      <span>Предоплаты:</span>
                      <span>30% при бронировании</span>
                    </div>
                    <div className={s.contractItem}>
                      <span>Удержания:</span>
                      <span>5% гарантийный депозит</span>
                    </div>
                    <div className={s.contractItem}>
                      <span>Штрафы:</span>
                      <span>1% за каждый день просрочки</span>
                    </div>
                    <div className={s.contractItem}>
                      <span>Сроки оплаты:</span>
                      <span>{supplier.paymentTerms}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className={s.historyTab}>
              <h3 className={s.sectionTitle}>История операций</h3>
              <div className={s.historyList}>
                <div className={s.historyItem}>
                  <div className={s.historyDate}>15.01.2025 14:30</div>
                  <div className={s.historyAction}>
                    Выплата {formatAmount(5000, supplier.currency)}
                  </div>
                  <div className={s.historyStatus}>
                    <MdCheckCircle className={s.statusIcon} />
                    Выплачено
                  </div>
                </div>
                <div className={s.historyItem}>
                  <div className={s.historyDate}>10.01.2025 10:15</div>
                  <div className={s.historyAction}>
                    Корректировка {formatAmount(-500, supplier.currency)}
                  </div>
                  <div className={s.historyStatus}>
                    <MdInfoOutline className={s.statusIcon} />
                    Применено
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={s.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button variant="primary" icon={MdAdd} onClick={onCreatePayout}>
            Создать выплату
          </Button>
        </div>
      </div>
    </Modal>
  );
}

